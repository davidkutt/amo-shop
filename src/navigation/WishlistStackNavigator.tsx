import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WishlistScreen from 'screens/WishlistScreen.tsx';
import { Header } from 'components/organisms/Header';

const Stack = createStackNavigator();

/**
 * This Stack Navigator handles the flow for the Wishlist tab.
 */
const WishlistStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{ header: () => <Header back={false} /> }}
      />
      {/* If you ever add a screen accessible from the wishlist, it goes here */}
    </Stack.Navigator>
  );
};

export default WishlistStackNavigator;
