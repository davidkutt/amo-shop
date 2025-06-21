import React, { useState } from 'react';
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
import { Switch } from '../components/molecules/Switch';
import { Disclosure } from '../components/molecules/Disclosure';

// A reusable sub-component for displaying a setting with a switch
const SettingSwitch = ({ label, value, onValueChange }) => (
  <View className="flex-row items-center justify-between p-4 bg-white border-b-2 border-black">
    <Text className="text-black uppercase font-semibold text-base">{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

// A reusable sub-component for links on this screen
const SettingLink = ({ label, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between p-4 bg-white border-b-2 border-black"
  >
    <Text className="text-black uppercase font-semibold text-base">{label}</Text>
    <Icon name="chevron-right" size={24} color="black" />
  </TouchableOpacity>
);

/**
 * A screen for managing app settings and preferences.
 */
const SettingsScreen = () => {
  const navigation = useNavigation();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailPromotions, setEmailPromotions] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* The Header for this screen would be provided by its own Stack Navigator */}
      <ScrollView>
        {/* --- Notifications Section --- */}
        <View className="p-4 bg-gray-100 border-b-2 border-black">
          <Text className="text-black uppercase font-bold text-lg">Notifications</Text>
        </View>
        <SettingSwitch
          label="Push Notifications"
          value={pushNotifications}
          onValueChange={setPushNotifications}
        />

        {/* Using a Disclosure to group related email settings */}
        <Disclosure summary="Email Notifications">
          <View className="p-4 gap-y-4">
            <View className="flex-row items-center justify-between">
                <Text className="text-black text-base">Promotional Emails</Text>
                <Switch value={emailPromotions} onValueChange={setEmailPromotions} />
            </View>
             <View className="flex-row items-center justify-between">
                <Text className="text-black text-base">Order & Shipping Updates</Text>
                <Switch value={emailUpdates} onValueChange={setEmailUpdates} />
            </View>
          </View>
        </Disclosure>

         {/* --- Legal Section --- */}
        <View className="p-4 bg-gray-100 border-b-2 border-black mt-6">
          <Text className="text-black uppercase font-bold text-lg">Legal</Text>
        </View>
        <SettingLink label="Terms of Service" onPress={() => Alert.alert("Navigate", "To Terms of Service")} />
        <SettingLink label="Privacy Policy" onPress={() => Alert.alert("Navigate", "To Privacy Policy")} />

      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
