'use client';

import { Icon } from '@woozdesign/icons';
import { Button, Container, Flex, Typography } from '@woozdesign/ui';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Error - MZHackathon',
    description: 'Error',
  };
};

const Error = () => {
  const router = useRouter();
  return (
    <>
      <Container style={{ height: '30vh' }}>
        <Flex height={'100%'} width={'100%'} direction={'column'} align="center" justify={'center'}>
          <Icon type={'AlertTriangle'} />
          <Typography.Header size={'5'}>Something went wrong</Typography.Header>
          <Button variant={'ghost'} onClick={() => router.back()} style={{ marginTop: 'var(--space-4)' }}>
            Return
          </Button>
        </Flex>
      </Container>
    </>
  );
};

export default Error;
