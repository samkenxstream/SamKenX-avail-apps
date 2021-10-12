// Copyright 2017-2021 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OverrideBundleDefinition } from '@polkadot/types/types';

// structs need to be in order
/* eslint-disable sort-keys */

const definitions: OverrideBundleDefinition = {
  types: [
    {
      // on all versions
      minmax: [0, undefined],
      types: {
        AccountInfo: 'AccountInfoWithRefCount',
        ExtrinsicsRoot: {
          hash: 'Hash',
          commitment: 'Vec<u8>',
          rows: 'u16',
          cols: 'u16'
        },
        AppDataIndex: {
          size: 'u32',
          index: 'Vec<(u32, u32)>'
        },
        Header: {
          parentHash: 'Hash',
          number: 'Compact<BlockNumber>',
          stateRoot: 'Hash',
          extrinsicsRoot: 'ExtrinsicsRoot',
          digest: 'Digest',
          appDataLookup: 'AppDataIndex'
        }
      }
    }
  ]
};

export default definitions;
