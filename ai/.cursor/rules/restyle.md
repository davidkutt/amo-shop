
# Shopify Restyle: A Comprehensive Guide

This document provides a complete guide to using `@shopify/restyle`, a type-safe theming and styling library for React Native. It combines both practical tutorials and comprehensive documentation for maximum understanding.

---

## 1. What is Restyle?

Restyle is a system for building themed UI components in React Native with full TypeScript support. It enforces a design system, improves consistency, and supports responsive styles.

**Key Benefits:**
- **Type Safety**: Eliminates typos and guesswork.
- **Constraints**: Enforces your design system.
- **Responsive Props**: Clean, device-specific styles.
- **Great DX**: Autocomplete, fast iteration.

---

## 2. Project Setup with Expo

Use Expo to create a new app:

```bash
npx create-expo-app@latest
cd your-app-directory
npx expo install @shopify/restyle
```

Create a theme file:

```bash
touch theme.tsx
```

---

## 3. Defining Your Theme

```ts
// theme.tsx
import { createTheme } from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',
  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',
  black: '#0B0B0B',
  white: '#F0F2F3',
  darkGray: '#121212',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
    black: palette.black,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {},
  },
  cardVariants: {
    elevated: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderRadius: 'm',
    },
    defaults: {
      padding: 'm',
      borderRadius: 'm',
    },
  },
});

export type Theme = typeof theme;
export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
    cardPrimaryBackground: palette.purpleDark,
    greenPrimary: palette.purpleLight,
  },
  textVariants: {
    ...theme.textVariants,
    defaults: {
      ...theme.textVariants.header,
      color: palette.purpleDark,
    },
  },
};

export default theme;
```

---

## 4. Providing the Theme with Dark Mode

```tsx
// app/_layout.tsx
import { ThemeProvider } from '@shopify/restyle';
import theme, { darkTheme } from '@/theme';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : theme}>
      {/* Navigation and content */}
    </ThemeProvider>
  );
}
```

---

## 5. Creating a Reusable Text Component

```tsx
// components/Text.tsx
import { createText } from '@shopify/restyle';
import { Theme } from '../theme';

export const Text = createText<Theme>();
```

Usage:

```tsx
import { Text } from '@/components/Text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text margin="m" variant="header">
        This is the Home screen. Built using @shopify/restyle.
      </Text>
    </SafeAreaView>
  );
}
```

---

## 6. Skeleton Loader with Animation

```tsx
// components/SkeletonLoader.tsx
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import {
  BackgroundColorProps,
  createBox,
  createRestyleComponent,
  createVariant,
  spacing,
  SpacingProps,
  VariantProps,
} from '@shopify/restyle';
import { Theme } from '@/theme';
import { View } from 'react-native';

const Box = createBox<Theme>();

const ShimmerAnimation = () => {
  const shimmerTranslate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerTranslate, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerTranslate]);

  const translateX = shimmerTranslate.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 100,
        backgroundColor: 'rgba(255,255,255,0.2)',
        transform: [{ translateX }],
      }}
    />
  );
};

type Props = SpacingProps<Theme> &
  VariantProps<Theme, 'cardVariants'> &
  BackgroundColorProps<Theme> &
  React.ComponentProps<typeof View>;

const CardSkeleton = createRestyleComponent<Props, Theme>([
  spacing,
  createVariant({ themeKey: 'cardVariants' }),
]);

export const SkeletonLoader = () => {
  return (
    <CardSkeleton variant="elevated">
      <Box backgroundColor="cardPrimaryBackground" height={20} marginBottom="s" width="70%" overflow="hidden" borderRadius="m">
        <ShimmerAnimation />
      </Box>
      <Box backgroundColor="cardPrimaryBackground" height={100} marginBottom="s" width="90%" overflow="hidden" borderRadius="m">
        <ShimmerAnimation />
      </Box>
      <Box backgroundColor="cardPrimaryBackground" height={50} marginBottom="s" width="70%" overflow="hidden" borderRadius="m">
        <ShimmerAnimation />
      </Box>
    </CardSkeleton>
  );
};
```

---

## 7. Custom Restyle Functions

```ts
import { createRestyleFunction, createRestyleComponent } from '@shopify/restyle';

const transparency = createRestyleFunction({
  property: 'transparency',
  styleProperty: 'opacity',
  transform: ({ value }: { value: number }) => 1 - value,
});

const TransparentComponent = createRestyleComponent([transparency]);

// Usage:
<TransparentComponent transparency={0.5} />
```

---

## 8. Using Polaris Tokens (Shopify Design System)

```ts
import tokens from '@shopify/polaris-tokens';
import { createTheme } from '@shopify/restyle';

const pxToNumber = (px: string) => parseInt(px.replace('px', ''), 10);

const theme = createTheme({
  colors: {
    backgroundRegular: tokens.colorWhite,
    foregroundRegular: tokens.colorBlack,
    highlightPrimary: tokens.colorIndigo,
  },
  spacing: {
    s: pxToNumber(tokens.spacingBaseTight),
    m: pxToNumber(tokens.spacingBase),
    l: pxToNumber(tokens.spacingLoose),
  },
});
```

---

## 9. Running the Fixture App

```bash
yarn        # install dependencies
yarn start  # start metro bundler
yarn run-ios / yarn run-android  # run the app
yarn build  # recompile if you change /src
```

---

## 10. Summary

You now have a practical and deep understanding of how to use Restyle with React Native, including:
- Theming
- Type safety
- Responsive design
- Variants and animations 
- Dark mode
- Integration with Shopify tokens

More at: https://github.com/Shopify/restyle
