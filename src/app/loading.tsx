'use client';
import { ProgressCircular } from '@woozdesign/ui';
import React, { FC } from 'react';

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <div style={{ height: '100vh' }}>
      <div
        style={{
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          placeContent: 'center',
          flexDirection: 'column',
        }}
      >
        <ProgressCircular indeterminate size={'small'} />
      </div>
    </div>
  );
};

export default loading;
