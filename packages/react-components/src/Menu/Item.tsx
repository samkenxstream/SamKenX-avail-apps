// Copyright 2017-2023 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ItemProps } from './types';

import React, { useCallback } from 'react';
import styled from 'styled-components';

import Icon from '../Icon';

function Item ({ children, className = '', icon, isDisabled, label, onClick }: ItemProps): React.ReactElement<ItemProps> {
  const _onClick = useCallback(
    (): void => {
      !isDisabled && onClick && onClick();
    },
    [isDisabled, onClick]
  );

  return (
    <div
      className={`ui--Menu__Item ${className}${icon ? ' hasIcon' : ''}${isDisabled ? ' isDisabled' : ''}`}
      onClick={_onClick}
    >
      {icon && (
        <Icon
          color='darkGray'
          icon={icon}
        />
      )}
      {label}{children}
    </div>
  );
}

export default React.memo(styled(Item)`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: var(--font-size-small);
  line-height: 0.93rem;
  padding: 0.5rem 1rem;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  &.hasIcon {
    padding-left: 2.6rem;
  }

  .ui--Icon {
    position: absolute;
    left: 1rem;
  }

  &.isDisabled {
    cursor: default;
    opacity: 0.5;
  }
`);
