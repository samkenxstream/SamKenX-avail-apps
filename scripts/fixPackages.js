// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

const fs = require('fs');
const path = require('path');

const A_FIX = 'npptesttypes/build';
const TO_FIX = '@polkadot/types';

function copyFiles (source, dest) {
  fs.readdirSync(source).forEach((entry) => {
    const resourcePathSource = path.join(source, entry);
    const resourcePathDest = path.join(dest, entry);

    if (fs.lstatSync(resourcePathSource).isDirectory()) {
      copyFiles(resourcePathSource, resourcePathDest);
    } else {
      const sourceData = fs.readFileSync(resourcePathSource);

      fs.writeFileSync(resourcePathDest, sourceData);
    }
  });
}

function findPackages () {
  const nodeModulesRoot = path.join(__dirname, '..', 'node_modules');

  copyFiles(path.join(nodeModulesRoot, A_FIX), path.join(nodeModulesRoot, TO_FIX));
}

findPackages();
