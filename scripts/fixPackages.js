// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

const fs = require('fs');
const path = require('path');

const PACKAGE_NAME = 'npptesttypes';

const A_FIX = path.join(PACKAGE_NAME, 'build');
const TO_FIX = [
  '@polkadot/types',
  '@polkadot/metadata/node_modules/@polkadot/types',
  'moonbeam-types-bundle/node_modules/@polkadot/types',
  '@polkadot/types-known/node_modules/@polkadot/types'
];

const NODE_MODULES = path.join(__dirname, '..', 'node_modules');

function copyFiles (source, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.readdirSync(source).forEach((entry) => {
    const resourcePathSource = path.join(source, entry);
    const resourcePathDest = path.join(dest, entry);

    if (fs.lstatSync(resourcePathSource).isDirectory()) {
      if (!fs.existsSync(resourcePathDest)) {
        fs.mkdirSync(resourcePathDest, { recursive: true });
      }

      copyFiles(resourcePathSource, resourcePathDest);
    } else {
      const sourceData = fs.readFileSync(resourcePathSource);

      fs.writeFileSync(resourcePathDest, sourceData, { flag: 'wx' });
    }
  });
}

function findPackages () {
  for (const p of TO_FIX) {
    fs.rmdirSync(path.join(NODE_MODULES, p), { force: true, recursive: true });
    copyFiles(path.join(NODE_MODULES, A_FIX), path.join(NODE_MODULES, p));
  }
}

function foolPolkadot () {
  const files = ['packageInfo.js', 'packageInfo.cjs'];

  for (const fileName of files) {
    const packageInfoFile = path.join(NODE_MODULES, A_FIX, fileName);
    const fileContent = fs.readFileSync(packageInfoFile).toString();

    fs.writeFileSync(packageInfoFile, fileContent.replace(`'${PACKAGE_NAME}'`, `'@polkadot/${PACKAGE_NAME}'`));
  }
}

foolPolkadot();
findPackages();
