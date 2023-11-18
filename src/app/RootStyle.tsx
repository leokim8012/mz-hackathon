'use client';

import { getRandomAccentColor } from '@/utils/getRandomThemeColor';
import { ThemeProvider } from '@woozdesign/ui';
import { useRouter } from 'next/navigation';
import React from 'react';

export const RootStyleRegistry = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider appearance={'light'} accentColor={'gray'} translucent={'60%'} radius={'small'} scaling={'100%'}>
      {children}
    </ThemeProvider>
  );
};
