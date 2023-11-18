'use client';
import { SanJose_Sample, SanJose_Sample2 } from '@/utils/data/sampleData';
import { Area_Data } from '@/utils/data/areaData';
import { Button, Card, Flex, Tab, TextField } from '@woozdesign/ui';
import dynamic from 'next/dynamic';
import { FC } from 'react';

import styles from './HomeLayout.module.scss';
import { Icon } from '@woozdesign/icons';
import Pepper from '@/Assets/pepper.svg';
import { MapData } from '../Views/MapView';

interface HomeLayoutProps {}

// Dynamically import the MapView component with SSR disabled
const DynamicMapView = dynamic(() => import('../Views/MapView'), { ssr: false });

const HomeLayout: FC<HomeLayoutProps> = ({}) => {
  return (
    <Tab.Root defaultValue={'comments'}>
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
              <Tab.List variant={'ios'} highContrast>
                <Tab.Trigger value="comments">💬 Comment</Tab.Trigger>
                <Tab.Trigger value="pepper">🌶️ Pepper</Tab.Trigger>
                <Tab.Trigger value="school">🎓 School</Tab.Trigger>
                <Tab.Trigger value="office">👔 Office</Tab.Trigger>
                <Tab.Trigger value="kpop">🌟 k-pop</Tab.Trigger>
              </Tab.List>
            </Flex>
            <TextField iconPrepend={'🔍'} variant={'solid'} shadow="4" size={'xlarge'} placeholder={'San Jose'} radius={'full'} block />
          </Flex>
        </div>
        <Tab.Content value="comments" style={{ height: '100%' }}>
          <DynamicMapView data={SanJose_Sample as MapData} />
        </Tab.Content>
        <Tab.Content value="pepper" style={{ height: '100%' }}>
          <DynamicMapView data={SanJose_Sample2 as MapData} />
        </Tab.Content>
        <Tab.Content value="school" style={{ height: '100%' }}>
          <DynamicMapView data={SanJose_Sample2 as MapData} />
        </Tab.Content>
        <Tab.Content value="office" style={{ height: '100%' }}>
          <DynamicMapView data={SanJose_Sample2 as MapData} />
        </Tab.Content>
        <Tab.Content value="kpop" style={{ height: '100%' }}>
          <DynamicMapView data={SanJose_Sample2 as MapData} />
        </Tab.Content>
      </main>
    </Tab.Root>
  );
};

export default HomeLayout;
