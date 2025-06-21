import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import AccountScreen from '../screens/AccountScreen';
import AccountDetailsScreen from '../screens/AccountDetailsScreen';
import { Header } from '../components/organisms/Header';
import OrderHistoryScreen from '../screens/OrderHistoryScreen.tsx';
import SettingsScreen from '../screens/SettingsScreen.tsx';

const Stack = createStackNavigator();

/**
 * This Stack Navigator handles the flow within the user account section.
 */
const AccountStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ header: () => <Header back={false} /> }}
      />
      <Stack.Screen
        name="AccountDetails"
        component={AccountDetailsScreen}
        options={{ header: () => <Header back={true} /> }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{ header: () => <Header back={true} /> }}
        />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ header: () => <Header back={true} /> }}
        />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
