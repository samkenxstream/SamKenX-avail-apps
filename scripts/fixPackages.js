// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

const fs = require('fs');
const path = require('path');

const A_FIX = 'npptesttypes/build';
const TO_FIX = [
  '@polkadot/types',
  '@polkadot/metadata/node_modules/@polkadot/types',
  'moonbeam-types-bundle/node_modules/@polkadot/types',
  '@polkadot/types-known/node_modules/@polkadot/types'
];

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
  const nodeModulesRoot = path.join(__dirname, '..', 'node_modules');

  for (const p of TO_FIX) {
    fs.rmdirSync(path.join(nodeModulesRoot, p), { force: true, recursive: true });
    copyFiles(path.join(nodeModulesRoot, A_FIX), path.join(nodeModulesRoot, p));
  }
}

findPackages();
