'use client';

import { Metadata } from 'next';
import { useRouter } from 'next/navigation';

import { Icon } from '@woozdesign/icons';
import { Button, Container, Flex, Typography } from '@woozdesign/ui';
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: '404 - MZHackathon',
    description: 'Nothing is here',
  };
};

const NotFound = () => {
  const router = useRouter();
  return (
    <>
      <Container style={{ height: '100vh' }}>
        <Flex height={'100%'} width={'100%'} direction={'column'} align="center" justify={'center'}>
          <Icon type={'AlertTriangle'} />
          <Typography.Header size={'5'}>Nothing is here</Typography.Header>
          <Button variant={'ghost'} onClick={() => router.back()} style={{ marginTop: 'var(--space-4)' }}>
            Return
          </Button>
        </Flex>
      </Container>
    </>
  );
};

export default NotFound;
