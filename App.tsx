/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import AppNavigator from 'navigation/AppNavigator';
import { createBox, ThemeProvider } from '@shopify/restyle';
import theme, { Theme } from 'theme/index'; // <-- Go back to this

import { useTheme } from '@shopify/restyle';

const Box = createBox<Theme>();

function AppContent() {

  const insets = useSafeAreaInsets();

  return (
    <Box
      flex={1}
      backgroundColor="background"
      paddingTop={{
        phone: 'm',
        tablet: 'l',
      }}
      paddingLeft={{
        phone: insets.left > 0 ? 'm' : 's',
        tablet: 'l',
      }}
      paddingRight={{
        phone: insets.right > 0 ? 'm' : 's',
        tablet: 'l',
      }}
    >
      <AppNavigator />
    </Box>
  );
}

function App() {
  // const theme = useTheme<Theme>();
  return (
    <SafeAreaProvider>
      {/* Use the hardcoded testTheme here */}
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <AppContent />
        </GestureHandlerRootView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
