// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { IconName } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import styled from 'styled-components';

import { ThemeProps } from '@polkadot/react-components/types';

import Icon from '../Icon';

interface Props {
  className?: string;
  icon: IconName;
  text: string;
}

function CurrentSection ({ className = '', icon, text }: Props): React.ReactElement<Props> {
  return (
    <div className={`${className} active-tab`}>
      <Icon icon={icon} />
      <span>{text}</span>
    </div>
  );
}

export default React.memo(styled(CurrentSection)(({ theme }: ThemeProps) => `
  margin: 0 2.5rem 0 1.0rem;
  font-weight: 600;
  font-size: 1.14rem;
  line-height: 1.57rem;
  min-width: max-content;
  height: 100%;
  display: flex;
  align-items: center;
  color: ${theme.color};

  .ui--Icon {
    margin-right: 0.85rem;
    max-width: 1rem;
    max-height: 1rem;
  }

  @media only screen and (max-width: 900px) {
    margin: 0 1.5rem;
  }
`));
