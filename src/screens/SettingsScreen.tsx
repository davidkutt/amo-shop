import React, { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'components/atoms/Text';
import { Icon } from 'components/atoms/Icon';
import { Switch } from 'components/molecules/Switch';
import { Disclosure } from 'components/molecules/Disclosure';

// Eine wiederverwendbare Unterkomponente zur Anzeige einer Einstellung mit einem Schalter
const SettingSwitch = ({ label, value, onValueChange }) => (
  <View className="flex-row items-center justify-between p-4 bg-background border-b-2 border-text/20">
    <Text variant="body" className="font-semibold">{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

// Eine wiederverwendbare Unterkomponente für Links auf diesem Bildschirm
const SettingLink = ({ label, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between p-4 bg-background border-b-2 border-text/20"
  >
    <Text variant="body" className="font-semibold">{label}</Text>
    <Icon name="chevron-right" size={24} color="#334155" />
  </TouchableOpacity>
);

/**
 * Ein Bildschirm zur Verwaltung von App-Einstellungen und Präferenzen.
 */
const SettingsScreen = () => {
  const navigation = useNavigation();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailPromotions, setEmailPromotions] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Der Header für diesen Bildschirm würde von seinem eigenen Stack Navigator bereitgestellt */}
      <ScrollView>
        {/* --- Benachrichtigungen-Abschnitt --- */}
        <View className="p-4 bg-gray-100 border-b-2 border-black">
          <Text variant="subtitle" className="mb-4">Benachrichtigungen</Text>
          <View className="mb-6">
            <View className="flex-row items-center justify-between p-4 bg-background border-b border-text/20">
              <Text variant="body">Werbe-E-Mails</Text>
              <Switch value={emailPromotions} onValueChange={setEmailPromotions} />
            </View>
            <View className="flex-row items-center justify-between p-4 bg-background border-b border-text/20">
              <Text variant="body">Bestell- & Versandaktualisierungen</Text>
              <Switch value={emailUpdates} onValueChange={setEmailUpdates} />
            </View>
          </View>
        </View>

        {/* --- Rechtliches-Abschnitt --- */}
        <View className="p-4 bg-gray-100 border-b-2 border-black mt-6">
          <Text variant="subtitle" className="mb-4">Rechtliches</Text>
          <SettingLink label="Nutzungsbedingungen" onPress={() => {}} />
          <SettingLink label="Datenschutzerklärung" onPress={() => {}} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
