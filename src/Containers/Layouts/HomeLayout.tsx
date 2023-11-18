'use client';
import { SanJose_Sample } from '@/utils/data/sampleData';
import { Flex, TextField } from '@woozdesign/ui';
import dynamic from 'next/dynamic';
import { FC } from 'react';

import styles from './HomeLayout.module.scss';

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
