'use client';

import { getRandomAccentColor } from '@/utils/getRandomThemeColor';
import { ThemeProvider } from '@woozdesign/ui';
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react';

export const RootStyleRegistry = ({ children }: React.PropsWithChildren) => {
  const theme = useTheme();

  return (
    <NextThemeProvider disableTransitionOnChange attribute="class" value={{ light: 'light-theme', dark: 'dark-theme' }} defaultTheme="system">
      <ThemeProvider appearance={'inherit'} accentColor={'gray'} translucent={'60%'} radius={'small'} scaling={'100%'}>
        {children}
      </ThemeProvider>
    </NextThemeProvider>
  );
};
