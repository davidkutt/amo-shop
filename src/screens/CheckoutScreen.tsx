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
import { Button } from 'components/atoms/Button';
import { Icon } from 'components/atoms/Icon';
import { TextInputField } from 'components/molecules/TextInputField';

/**
 * Der Checkout-Bildschirm.
 */
const CheckoutScreen = () => {
  const navigation = useNavigation();

  // --- States für die Formularfelder ---
  const [email, setEmail] = useState('kutt.dev@gmail.com');
  const [firstName, setFirstName] = useState('David');
  const [lastName, setLastName] = useState('Kutt');
  const [address, setAddress] = useState('Hauptstr. 44');
  const [city, setCity] = useState('Baden-Baden');
  const [postalCode, setPostalCode] = useState('76530');
  const [country, setCountry] = useState('Deutschland');
  const [cardNumber, setCardNumber] = useState('xxxx xxxx xxxx xxxx');
  const [expiryDate, setExpiryDate] = useState('09/26');
  const [cvv, setCvv] = useState('049');


  // Diese Funktion kümmert sich um das Aufgeben der Bestellung und die Navigation
  const handlePlaceOrder = () => {
    // Hier könnten Sie die Formulardaten validieren
    console.log({
      email,
      firstName,
      lastName,
      address,
      city,
      postalCode,
      country,
      cardNumber,
      expiryDate,
      cvv,
    });

    // In einer echten App würden Sie hier die Zahlung abwickeln.
    // Bei Erfolg navigieren Sie zum Bestätigungsbildschirm.
    const mockOrderId = Math.floor(10000 + Math.random() * 90000).toString();
    navigation.navigate('OrderConfirmation', { orderId: mockOrderId });
  };

  return (
      <SafeAreaView className="flex-1 bg-background">
        {/* --- Bildschirm-Header --- */}
        <View className="flex-row items-center justify-between p-4 border-b-2 border-text/20">
          <Text variant="title" className="text-center flex-1">
            Kasse
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close" size={24} color="#334155" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {/* --- Versandadresse-Abschnitt --- */}
          <View className="p-4 border-b-2 border-text/20">
            <Text variant="subtitle" className="mb-4">
              Versandadresse
            </Text>
            <View>
              <View className="mb-3">
                <TextInputField
                    label="E-Mail"
                    placeholder="deine@email.com"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
              </View>
              <View className="flex-row gap-x-4 mb-4">
                <View className="flex-1">
                  <TextInputField
                      label="Vorname"
                      value={firstName}
                      onChangeText={setFirstName}
                  />
                </View>
                <View className="flex-1">
                  <TextInputField
                      label="Nachname"
                      value={lastName}
                      onChangeText={setLastName}
                  />
                </View>
              </View>
              <View className="mb-4">
                <TextInputField
                    label="Adresse"
                    value={address}
                    onChangeText={setAddress}
                />
              </View>
              <View className="mb-4">
                <TextInputField
                    label="Stadt"
                    value={city}
                    onChangeText={setCity}
                />
              </View>
              <View className="flex-row gap-x-4 mb-4">
                <View className="flex-1">
                  <TextInputField
                      label="Postleitzahl"
                      value={postalCode}
                      onChangeText={setPostalCode}
                  />
                </View>
                <View className="flex-1">
                  <TextInputField
                      label="Land"
                      value={country}
                      onChangeText={setCountry}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* --- Zahlungsmethode-Abschnitt --- */}
          <View className="p-4 border-b-2 border-text/20">
            <Text variant="subtitle" className="mb-4">
              Zahlungsmethode
            </Text>
            <View >
              <View className="mb-3">
                <TextInputField
                    label="Kartennummer"
                    placeholder="**** **** **** ****"
                    keyboardType="numeric"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                />
              </View>
              <View className="flex-row gap-x-4 mb-4">
                <View className="flex-1">
                  <TextInputField
                      label="Ablaufdatum"
                      placeholder="MM / JJ"
                      value={expiryDate}
                      onChangeText={setExpiryDate}
                  />
                </View>
                <View className="flex-1">
                  <TextInputField
                      label="CVV"
                      placeholder="123"
                      keyboardType="numeric"
                      value={cvv}
                      onChangeText={setCvv}
                  />
                </View>
              </View>
            </View>
          </View>

        </ScrollView>

        {/* --- Bestellung aufgeben CTA --- */}
        <View className="p-4 border-t-2 border-text/20 absolute bottom-0 w-full bg-background">
          <Button
              title="Bestellung aufgeben"
              onPress={handlePlaceOrder}
              className="bg-black border-black w-full"
              textClassName="text-white"
          />
        </View>
      </SafeAreaView>
  );
};

export default CheckoutScreen;
