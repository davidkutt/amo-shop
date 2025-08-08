import React from 'react';
import { createText, TextProps as RestyleTextProps } from '@shopify/restyle';
import { Theme } from 'theme/index';

export type TextProps = RestyleTextProps<Theme> & {
  children: React.ReactNode;
  variant?: 'title' | 'subtitle' | 'body' | 'small' | 'caption';
};

export const Text = createText<Theme>();

// Re-export for convenience
export default Text;
