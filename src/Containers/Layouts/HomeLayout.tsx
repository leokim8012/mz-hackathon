'use client';
import { Icon } from '@woozdesign/icons';
import { AppBar, Card, Col, Container, IconButton, Layout, Menu, Row } from '@woozdesign/ui';
import React, { FC } from 'react';
import D3Layout from './Graph/D3Layout';
import dynamic from 'next/dynamic';

interface HomeLayoutProps {}

// Dynamically import the MapView component with SSR disabled
const DynamicMapView = dynamic(() => import('../Views/MapView'), { ssr: false });

const position: L.LatLngExpression = [51.505, -0.09];
const bounds: L.LatLngBoundsExpression = [
  [51.49, -0.08],
  [51.5, -0.06],
];

const HomeLayout: FC<HomeLayoutProps> = ({}) => {
  return (
    <main style={{ height: '100vh' }}>
      <AppBar position={'fixed'} variant={'translucent'}>
        <AppBar.Header>
          <Icon type={'Wooz2'} />
        </AppBar.Header>

        <AppBar.Action>
          <IconButton variant={'transparent'} highContrast>
            <Icon type={'User'} />
          </IconButton>
        </AppBar.Action>
      </AppBar>
      <DynamicMapView position={position} bounds={bounds} />
    </main>
  );
};

export default HomeLayout;
