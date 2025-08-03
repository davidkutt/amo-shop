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
  <View className="flex-row items-center justify-between p-4 bg-white border-b-2 border-black">
    <Text className="text-black uppercase font-semibold text-base">{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

// Eine wiederverwendbare Unterkomponente für Links auf diesem Bildschirm
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
          <Text className="text-black uppercase font-bold text-lg">Benachrichtigungen</Text>
        </View>
        <SettingSwitch
          label="Push-Benachrichtigungen"
          value={pushNotifications}
          onValueChange={setPushNotifications}
        />

        {/* Verwendung einer Disclosure-Komponente, um verwandte E-Mail-Einstellungen zu gruppieren */}
        <Disclosure summary="E-Mail-Benachrichtigungen">
          <View className="p-4 gap-y-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-black text-base">Werbe-E-Mails</Text>
              <Switch value={emailPromotions} onValueChange={setEmailPromotions} />
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-black text-base">Bestell- & Versandaktualisierungen</Text>
              <Switch value={emailUpdates} onValueChange={setEmailUpdates} />
            </View>
          </View>
        </Disclosure>

        {/* --- Rechtliches-Abschnitt --- */}
        <View className="p-4 bg-gray-100 border-b-2 border-black mt-6">
          <Text className="text-black uppercase font-bold text-lg">Rechtliches</Text>
        </View>
        <SettingLink label="Nutzungsbedingungen" onPress={() => {}} />
        <SettingLink label="Datenschutzerklärung" onPress={() => {}} />

      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
