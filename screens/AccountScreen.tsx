import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../components/atoms/Text';
import { Icon } from '../components/atoms/Icon';

// A reusable sub-component for the links on this screen
const AccountLink = ({ label, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between p-4 bg-white border-b-2 border-black"
  >
    <Text className="text-black uppercase font-bold text-base">{label}</Text>
    {/* The chevron icon provides a clear affordance that this is a link */}
    <Icon name="chevron-right" size={24} color="black" />
  </TouchableOpacity>
);

/**
 * The main screen for user account management.
 */
const AccountScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* The Header for this screen would be provided by its own Stack Navigator */}
      <ScrollView>
        {/* --- List of Account Options --- */}
        <View>
          <AccountLink
            label="My Account Details"
            onPress={() => navigation.navigate('AccountDetails')}
          />
          <AccountLink
            label="Order History"
            onPress={() => navigation.navigate('OrderHistory')}
          />
          <AccountLink
            label="My Wishlist"
            onPress={() => navigation.navigate('Heart')} // Navigates to the Heart tab
          />
          <AccountLink
            label="Settings"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>

        {/* --- Log Out Button --- */}
        <View className="mt-8 px-4">
          <AccountLink
            label="Log Out"
            onPress={() => Alert.alert('Log Out', 'User has been logged out.')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;
