import React from 'react';
import { View, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'components/atoms/Text';
import { Button } from 'components/atoms/Button';
import { TextInputField } from 'components/molecules/TextInputField';

/**
 * A screen for users to view and edit their account details.
 */
const AccountDetailsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* This screen should be part of a stack navigator that provides a Header */}
      <ScrollView>
        {/* --- Personal Information Section --- */}
        <View className="p-4 border-b-2 border-black">
          <Text className="text-black uppercase font-bold text-lg mb-4">
            Personal Information
          </Text>
          <View className="gap-y-4">
            <TextInputField label="First Name" defaultValue="John" />
            <TextInputField label="Last Name" defaultValue="Doe" />
            <TextInputField
              label="Email Address"
              defaultValue="j.doe@example.com"
              keyboardType="email-address"
              editable={false} // Make email non-editable for this example
              className="opacity-70"
            />
          </View>
          <View className="mt-6">
            <Button
              title="Update Information"
              onPress={() => {}}
              className="bg-black border-black w-full"
              textClassName="text-white"
            />
          </View>
        </View>

        {/* --- Change Password Section --- */}
        <View className="p-4">
          <Text className="text-black uppercase font-bold text-lg mb-4">
            Change Password
          </Text>
          <View className="gap-y-4">
            <TextInputField
              label="Current Password"
              secureTextEntry
              placeholder="Enter your current password"
            />
            <TextInputField
              label="New Password"
              secureTextEntry
              placeholder="Enter a new password"
            />
            <TextInputField
              label="Confirm New Password"
              secureTextEntry
              placeholder="Confirm your new password"
            />
          </View>
          <View className="mt-6">
            <Button
              title="Change Password"
              onPress={() => {}}
              className="bg-black border-black w-full"
              textClassName="text-white"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountDetailsScreen;
