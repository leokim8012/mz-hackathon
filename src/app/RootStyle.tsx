'use client';

import { ThemeProvider } from '@woozdesign/ui';
import React from 'react';

export const RootStyleRegistry = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider appearance={'light'} accentColor={'gray'} translucent={'60%'} radius={'large'} scaling={'100%'}>
      {children}
    </ThemeProvider>
  );
};
