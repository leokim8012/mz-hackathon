'use client';
import { Icon } from '@woozdesign/icons';
import { AppBar, Button, Card, Col, Container, Flex, IconButton, Layout, Menu, Row, TextField } from '@woozdesign/ui';
import React, { FC } from 'react';
import D3Layout from './Graph/D3Layout';
import dynamic from 'next/dynamic';
import { SanJose_Sample } from '@/utils/data/sampleData';

import styles from './HomeLayout.module.scss';

interface HomeLayoutProps {}

// Dynamically import the MapView component with SSR disabled
const DynamicMapView = dynamic(() => import('../Views/MapView'), { ssr: false });

const position: L.LatLngExpression = [37.3382082, -121.8863286];
const bounds: L.LatLngBoundsExpression = [
  [37.3322082, -121.8663286],
  [37.3382082, -121.8963286],
];

const HomeLayout: FC<HomeLayoutProps> = ({}) => {
  return (
    <main style={{ height: '100vh' }}>
      {/* <AppBar position={'fixed'} variant={'translucent'}>
        <AppBar.Header>
          <Icon type={'Wooz2'} />
        </AppBar.Header>

        <AppBar.Action>
          <IconButton variant={'transparent'} highContrast>
            <Icon type={'User'} />
          </IconButton>
        </AppBar.Action>
      </AppBar> */}

      <div className={styles.leftPanel}>
        <Flex direction={'column'}>
          <TextField shadow="4" size={'xlarge'} placeholder={'San Jose'} block />
          {/* <Flex space="2">
            <Button highContrast>Tags</Button>
            <Button highContrast>Pepper</Button>
          </Flex> */}
        </Flex>
      </div>
      <DynamicMapView data={SanJose_Sample} />
    </main>
  );
};

export default HomeLayout;
