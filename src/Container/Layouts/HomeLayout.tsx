'use client';
import { Icon } from '@woozdesign/icons';
import { AppBar, Card, Col, Container, IconButton, Layout, Menu, Row } from '@woozdesign/ui';
import React, { FC } from 'react';
import D3Layout from './Graph/D3Layout';

interface HomeLayoutProps {}

const HomeLayout: FC<HomeLayoutProps> = ({}) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Header>
        <AppBar position={'block'}>
          <AppBar.Header>
            <Icon type={'Wooz2'} />
          </AppBar.Header>

          <AppBar.Action>
            <IconButton variant={'transparent'} highContrast>
              <Icon type={'User'} />
            </IconButton>
          </AppBar.Action>
        </AppBar>
      </Layout.Header>
      <Layout grow={'1'}>
        <Layout.Sider p={'2'}></Layout.Sider>
        <Layout.Content></Layout.Content>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;
