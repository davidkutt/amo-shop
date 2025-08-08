import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from 'navigation/types';
import { Icon } from 'components/atoms/Icon';
import { Text } from 'components/atoms/Text';
import { createRestyleComponent, spacing, SpacingProps, backgroundColor, BackgroundColorProps } from '@shopify/restyle';
import { Theme } from 'theme';

// Import screens (we'll create these next)
import HomeScreen from 'screens/HomeScreen';
import SearchScreen from 'screens/SearchScreen';
import WishlistScreen from 'screens/WishlistScreen';
import ProfileScreen from 'screens/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabContainer = createRestyleComponent<SpacingProps<Theme> & BackgroundColorProps<Theme>>([
  spacing,
  backgroundColor,
]);

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Search':
              iconName = 'search';
              break;
            case 'Wishlist':
              iconName = 'heart';
              break;
            case 'Profile':
              iconName = 'user';
              break;
            default:
              iconName = 'home';
          }

          return <Icon name={iconName} size={size} color={focused ? 'accent1' : 'textSecondary'} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabel: ({ focused, color }) => {
          let label: string;

          switch (route.name) {
            case 'Home':
              label = 'Start';
              break;
            case 'Search':
              label = 'Suche';
              break;
            case 'Wishlist':
              label = 'Merkliste';
              break;
            case 'Profile':
              label = 'Profil';
              break;
            default:
              label = 'Start';
          }

          return (
            <Text
              variant="small"
              color={focused ? 'accent1' : 'textSecondary'}
              fontWeight={focused ? '600' : '400'}
              textAlign="center"
            >
              {label}
            </Text>
          );
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
