'use client';
import { SanJose_Sample, SanJose_Sample2, SanJose_Sample_Empty } from '@/utils/data/sampleData';
import { Button, Card, Flex, Tab, TextField, useThemeContext } from '@woozdesign/ui';
import dynamic from 'next/dynamic';
import { FC } from 'react';

import styles from './HomeLayout.module.scss';
import { Icon } from '@woozdesign/icons';
import Pepper from '@/Assets/pepper.svg';
import { MapData } from '../Views/MapView';

interface HomeLayoutProps {}

// Dynamically import the MapView component with SSR disabled
const DynamicMapView = dynamic(() => import('../Views/MapView'), { ssr: false });
// Dynamically import the MapView component with SSR disabled
const DynamicPepperMapView = dynamic(() => import('../Views/PepperMapView'), { ssr: false });

const HomeLayout: FC<HomeLayoutProps> = ({}) => {
  const { onAccentColorChange } = useThemeContext();
  const handlePepperClick = () => {
    onAccentColorChange('red');
  };

  const handleCommentClick = () => {
    onAccentColorChange('gray');
  };
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
                <Tab.Trigger onClick={handleCommentClick} value="comments">
                  💬 Comment
                </Tab.Trigger>
                <Tab.Trigger onClick={handlePepperClick} value="pepper">
                  🌶️ Pepper
                </Tab.Trigger>
                <Tab.Trigger onClick={handleCommentClick} value="school">
                  🎓 School
                </Tab.Trigger>
                <Tab.Trigger onClick={handleCommentClick} value="office">
                  👔 Office
                </Tab.Trigger>
                <Tab.Trigger onClick={handleCommentClick} value="kpop">
                  🌟 k-pop
                </Tab.Trigger>
              </Tab.List>
            </Flex>
            <TextField iconPrepend={'🔍'} variant={'solid'} shadow="4" size={'xlarge'} placeholder={'San Jose'} radius={'full'} block />
          </Flex>
        </div>
        <Tab.Content value="comments" style={{ height: '100%' }}>
          <DynamicMapView data={SanJose_Sample as MapData} />
        </Tab.Content>
        <Tab.Content value="pepper" style={{ height: '100%' }}>
          <DynamicPepperMapView data={SanJose_Sample_Empty as MapData} />
        </Tab.Content>
        <Tab.Content value="school" style={{ height: '100%' }}>
          <DynamicMapView data={SanJose_Sample_Empty as MapData} />
        </Tab.Content>
        <Tab.Content value="office" style={{ height: '100%' }}>
          <DynamicMapView data={SanJose_Sample_Empty as MapData} />
        </Tab.Content>
        <Tab.Content value="kpop" style={{ height: '100%' }}>
          <DynamicMapView data={SanJose_Sample_Empty as MapData} />
        </Tab.Content>
      </main>
    </Tab.Root>
  );
};

export default HomeLayout;
