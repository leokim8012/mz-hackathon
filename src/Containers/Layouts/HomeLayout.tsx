'use client';
import { SanJose_Sample } from '@/utils/data/sampleData';
import { Button, Card, Flex, Tab, TextField } from '@woozdesign/ui';
import dynamic from 'next/dynamic';
import { FC } from 'react';

import styles from './HomeLayout.module.scss';
import { Icon } from '@woozdesign/icons';
import Pepper from '@/Assets/pepper.svg';

interface HomeLayoutProps {}

// Dynamically import the MapView component with SSR disabled
const DynamicMapView = dynamic(() => import('../Views/MapView'), { ssr: false });

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

      <div className={styles.panel}>
        <Flex direction={'column'}>
          <Flex space="2" width={'100%'} justify={'center'}>
            <Tab.Root defaultValue={'comments'}>
              <Tab.List variant={'ios'} highContrast>
                <Tab.Trigger value="comments">💬 Comment</Tab.Trigger>
                <Tab.Trigger value="pepper">🌶️ Pepper</Tab.Trigger>
                <Tab.Trigger value="pepper">🎓 School</Tab.Trigger>
                <Tab.Trigger value="pepper">👔 Office</Tab.Trigger>
                <Tab.Trigger value="pepper">🥩 Food</Tab.Trigger>
              </Tab.List>
            </Tab.Root>
          </Flex>
          <TextField iconPrepend={<Icon type={'Search'} />} variant={'solid'} shadow="4" size={'xlarge'} placeholder={'San Jose'} block />
        </Flex>
      </div>
      <DynamicMapView data={SanJose_Sample} />
    </main>
  );
};

export default HomeLayout;
