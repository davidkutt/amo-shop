import React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { createRestyleComponent, spacing, SpacingProps, backgroundColor, BackgroundColorProps } from '@shopify/restyle';
import { Theme } from 'theme';
import { Text } from 'components/atoms/Text';
import { Header } from 'components/organisms/Header';
import { Icon } from 'components/atoms/Icon';
import { NavigationProps } from 'navigation/types';

const ProfileContainer = createRestyleComponent<SpacingProps<Theme> & BackgroundColorProps<Theme>>([
  spacing,
  backgroundColor,
]);

const ProfileScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAccountPress = () => {
    navigation.navigate('Account');
  };

  const handleOrderHistoryPress = () => {
    navigation.navigate('OrderHistory');
  };

  const menuItems = [
    {
      id: 'account',
      title: 'Kontodetails',
      subtitle: 'Persönliche Informationen verwalten',
      icon: 'user',
      onPress: handleAccountPress,
    },
    {
      id: 'orders',
      title: 'Bestellverlauf',
      subtitle: 'Alle deine Bestellungen',
      icon: 'package',
      onPress: handleOrderHistoryPress,
    },
    {
      id: 'settings',
      title: 'Einstellungen',
      subtitle: 'App-Einstellungen anpassen',
      icon: 'settings',
      onPress: () => {},
    },
    {
      id: 'help',
      title: 'Hilfe & Support',
      subtitle: 'Häufige Fragen und Kontakt',
      icon: 'help-circle',
      onPress: () => {},
    },
  ];

  return (
    <ProfileContainer backgroundColor="background" flex={1}>
      <Header
        back
        title="Profil"
        onBackPress={handleBackPress}
        onCartPress={handleCartPress}
        cartItemCount={3}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View paddingHorizontal="l" paddingVertical="xl">
          {/* User Info Section */}
          <View 
            backgroundColor="cardBackground" 
            borderRadius="m" 
            padding="l" 
            marginBottom="xl"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <View flexDirection="row" alignItems="center" marginBottom="m">
              <View
                backgroundColor="accent1"
                borderRadius="full"
                width={60}
                height={60}
                justifyContent="center"
                alignItems="center"
                marginRight="m"
              >
                <Icon name="user" size={24} color="white" />
              </View>
              <View flex={1}>
                <Text variant="subtitle" fontWeight="600">
                  Willkommen zurück!
                </Text>
                <Text variant="body" color="textSecondary">
                  Melde dich an oder erstelle ein Konto
                </Text>
              </View>
            </View>
            <TouchableOpacity
              backgroundColor="accent1"
              borderRadius="m"
              paddingVertical="m"
              paddingHorizontal="l"
              alignItems="center"
              onPress={handleAccountPress}
            >
              <Text variant="button" color="white" fontWeight="600">
                Anmelden / Registrieren
              </Text>
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                backgroundColor="cardBackground"
                borderRadius="m"
                padding="l"
                marginBottom="m"
                flexDirection="row"
                alignItems="center"
                onPress={item.onPress}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <View
                  backgroundColor="accent2"
                  borderRadius="m"
                  width={40}
                  height={40}
                  justifyContent="center"
                  alignItems="center"
                  marginRight="m"
                >
                  <Icon name={item.icon} size={20} color="accent1" />
                </View>
                <View flex={1}>
                  <Text variant="subtitle" fontWeight="600" marginBottom="xs">
                    {item.title}
                  </Text>
                  <Text variant="small" color="textSecondary">
                    {item.subtitle}
                  </Text>
                </View>
                <Icon name="chevron-right" size={20} color="textSecondary" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ProfileContainer>
  );
};

export default ProfileScreen;
