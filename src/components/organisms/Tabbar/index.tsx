import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, IconName } from 'components/atoms/Icon';
import { Text } from 'components/atoms/Text'; // Make sure your Text atom is imported

/**
 * A custom Tabbar component with a clean, classic design.
 * Features a white background, a top border, and icon with text labels.
 */
export const Tabbar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    // UPDATED: Background is now white with a top border for separation.
    <View
      className="bg-white border-t border-gray-200"
      style={{ paddingBottom: insets.bottom }}
    >
      <View className="flex-row justify-around items-center h-16">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          let iconName: IconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Search':
              iconName = 'search';
              break;
            case 'Heart':
              iconName = 'heart';
              break;
            case 'User':
              iconName = 'user';
              break;
            default:
              iconName = 'home';
              break;
          }

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

          // --- UPDATED: New color logic for the classic design ---
          const activeColor = '#334155'; // Our 'text-text' color (slate-700)
          const inactiveColor = '#94a3b8'; // A lighter gray (slate-400)
          const color = isFocused ? activeColor : inactiveColor;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              // UPDATED: Layout container for icon and text
              className="flex-1 items-center justify-center h-full gap-y-1"
            >
              <Icon name={iconName} size={26} color={color} />

              {/* NEW: Text label added below the icon */}
              <Text
                className="text-xs font-semibold"
                style={{ color: color }} // Apply the dynamic color
              >
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
