import React from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text } from '../../atoms/Text';
import { Icon, IconName } from '../../atoms/Icon'; // Make sure to export IconName from your Icon component

/**
 * A custom Tabbar component styled in a stark, minimalist aesthetic.
 * Designed to be used with React Navigation's Bottom Tab Navigator.
 */
export const Tabbar = ({ state, descriptors, navigation }) => {
  return (
    // The main container for the tab bar
    <View className="bg-white border-t-2 border-black">
      <SafeAreaView>
        <View className="flex-row justify-around items-center h-16">
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            // Define the label for the tab. Fallback to the route name.
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            // Check if the current tab is focused (active)
            const isFocused = state.index === index;

            // Define the icon for the tab
            // This relies on a naming convention where the route name matches an icon name
            const iconName = route.name.toLowerCase() as IconName;

            // Handle press events
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

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                className="flex-1 items-center justify-center py-2"
              >
                <Icon
                  name={iconName}
                  size={24}
                  // Icon is black if focused, otherwise gray
                  color={isFocused ? 'black' : '#A1A1AA'}
                />
                <Text
                  className={`
                    mt-1 uppercase text-xs font-semibold
                    ${isFocused ? 'text-black' : 'text-gray-400'}
                  `}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
};
