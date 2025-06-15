import React from 'react';
import { View, Button } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export const ThemeSwitcher = () => {
  const { setThemeName } = useTheme();

  return (
    <View style={{ position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row', justifyContent: 'space-around', padding: 20, backgroundColor: 'rgba(200, 200, 200, 0.8)' }}>
      <Button title="Stark" onPress={() => setThemeName('stark')} />
      <Button title="Neubrutalism" onPress={() => setThemeName('neubrutalism')} />
      <Button title="Glass" onPress={() => setThemeName('glassmorphism')} />
    </View>
  );
};
