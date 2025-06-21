import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
};

export default function ScreenWrapper({ children }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        {children}
      </View>
    </SafeAreaView>
  );
} 