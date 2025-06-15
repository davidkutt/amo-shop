import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ProductGridScreen from './screens/ProductGridScreen';
import { ThemeSwitcher } from './components/molecules/ThemeSwitcher';
import { themes } from './theme/themes'
/**
 * This is the main content of our app. It uses the useTheme hook
 * to get the current theme and applies the styles to its root View.
 */
const AppContent = () => {
  const { themeName } = useTheme();
  const activeTheme = themes[themeName]; // Get the style object for the active theme

  return (
    // By applying the theme variables here, all child components using NativeWind's
    // semantic classes (e.g., bg-background) will update automatically.
    <View style={[{ flex: 1 }, activeTheme]}>
      <StatusBar barStyle={themeName === 'stark' ? 'dark-content' : 'light-content'} />
      <SafeAreaView style={{ flex: 1 }}>
        <ProductGridScreen />
        <ThemeSwitcher />
      </SafeAreaView>
    </View>
  );
};

function App() {
  return (
    // The ThemeProvider's only job is to manage the state (the theme name).
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
