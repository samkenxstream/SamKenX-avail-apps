// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeProps } from '@polkadot/react-components/types';
import type { Group } from './types';

import React from 'react';
import styled from 'styled-components';

import { Icon } from '@polkadot/react-components';

import Item from './Item';

interface Props extends Group {
  className?: string;
  isActive: boolean;
}

const SHA_COL = 'rgba(34, 36, 38, 0.12)';
const SHA_OFF = '5px';

function Grouping ({ className = '', isActive, name, routes }: Props): React.ReactElement<Props> {
  console.log(isActive, name);

  if (routes.length === 1) {
    return (
      <Item
        className={isActive ? 'isActive' : ''}
        isToplevel
        route={routes[0]}
      />
    );
  }

  return (
    <li className={`${className} ${isActive ? 'isActive' : ''}`}>
      <div className={`groupHdr ${!isActive ? 'highlight--color-contrast' : ''}`}>
        <span>{name}</span>
        <Icon icon='caret-down' />
      </div>
      <ul className='groupMenu highlight--bg-light'>
        {routes.map((route): React.ReactNode => (
          <Item
            key={route.name}
            route={route}
          />
        ))}
      </ul>
    </li>
  );
}

export default React.memo(styled(Grouping)(({ theme }: ThemeProps) => `
  cursor: pointer;
  position: relative;
  margin-bottom: -3px;

  .groupHdr {
    border-radius: 0.15rem 0.15rem 0 0;
    padding: 1.2rem 1.25rem 1.2rem 1.5rem;
    font-size: 1.15rem;
    font-weight: 600;
    line-height: 1.5rem;

    > .ui--Icon {
      margin-left: 0.75rem;
    }
  }

  &.isActive .groupHdr {
    background-color: ${theme.bgTabs};
    color: ${theme.color};
  }

  .groupMenu {
    border-radius: 0 0 0.25rem 0.25rem;
    box-shadow: 0 ${SHA_OFF} ${SHA_OFF} -${SHA_OFF} ${SHA_COL}, ${SHA_OFF} 0 ${SHA_OFF} -${SHA_OFF} ${SHA_COL}, -${SHA_OFF} 0 ${SHA_OFF} -${SHA_OFF} ${SHA_COL};
    display: none;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: absolute;
    z-index: 250;

    > li {
      z-index: 1;

      a {
        padding-right: 4rem;
      }
    }
  }

  &:hover {
    .groupHdr,
    .groupMenu li {
      background: ${theme.bgMenu};
      color: ${theme.color};
    }

    .groupHdr {
      box-shadow: 0 -${SHA_OFF} ${SHA_OFF} -${SHA_OFF} ${SHA_COL}, ${SHA_OFF} 0 ${SHA_OFF} -${SHA_OFF} ${SHA_COL}, -${SHA_OFF} 0 ${SHA_OFF} -${SHA_OFF} ${SHA_COL};
    }

    .groupMenu {
      display: block;

      > li:hover {
        background: ${theme.bgMenuHover};
      }
    }
  }
`));
