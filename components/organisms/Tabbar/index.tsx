import React from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text } from '../../atoms/Text';
import { Icon, IconName } from '../../atoms/Icon'; // Make sure to export IconName from your Icon component

/**
 * A custom Tabbar component with enhanced styling for the active tab.
 */
export const Tabbar = ({ state, descriptors, navigation }) => {
  return (
    // The main container for the tab bar
    <View className="bg-white border-t-2 border-black">
      <SafeAreaView>
        <View className="mb-2 flex-row justify-around items-center h-16">
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;

            const isFocused = state.index === index;
            const iconName = route.name.toLowerCase() as IconName;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            // --- THIS IS THE CHANGE ---
            // We'll use more distinct styles for the focused state.
            const iconColor = isFocused ? 'black' : '#A1A1AA';
            const textColor = isFocused ? 'text-black' : 'text-gray-400';
            const fontWeight = isFocused ? 'font-bold' : 'font-semibold';

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                className="flex-1 items-center justify-center py-2 h-full"
              >
                <Icon
                  name={iconName}
                  size={24}
                  color={iconColor}
                />
                <Text
                  className={`
                    mt-1 uppercase text-xs
                    ${textColor}
                    ${fontWeight}
                  `}
                >
                  {label}
                </Text>

                {/* --- THIS IS THE NEW INDICATOR --- */}
                {/* A small black view that only appears if the tab is focused */}
                {isFocused && (
                  <View className="absolute bottom-0 h-1 w-8 bg-black" />
                )}

              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
};
