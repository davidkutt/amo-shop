import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { createBox } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Header } from 'components/organisms/Header';
import { Icon } from 'components/atoms/Icon';
import { NavigationProps } from 'navigation/types';

const Box = createBox<Theme>();

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
      icon: 'user' as const,
      onPress: handleAccountPress,
    },
    {
      id: 'orders',
      title: 'Bestellverlauf',
      subtitle: 'Alle deine Bestellungen',
      icon: 'file' as const,
      onPress: handleOrderHistoryPress,
    },
    {
      id: 'settings',
      title: 'Einstellungen',
      subtitle: 'App-Einstellungen anpassen',
      icon: 'settings' as const,
      onPress: () => {},
    },
    {
      id: 'help',
      title: 'Hilfe & Support',
      subtitle: 'Häufige Fragen und Kontakt',
      icon: 'help' as const,
      onPress: () => {},
    },
  ];

  return (
    <Box backgroundColor="background" flex={1}>
      <Header
        back
        title="Profil"
        onBackPress={handleBackPress}
        onCartPress={handleCartPress}
        cartItemCount={3}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingHorizontal="l" paddingVertical="xl">
          {/* User Info Section */}
          <Box 
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
            <Box flexDirection="row" alignItems="center" marginBottom="m">
              <Box
                backgroundColor="accent1"
                borderRadius="full"
                width={60}
                height={60}
                justifyContent="center"
                alignItems="center"
                marginRight="m"
              >
                <Icon name="user" size={24} color="white" />
              </Box>
              <Box flex={1}>
                <Text variant="subtitle" fontWeight="600">
                  Willkommen zurück!
                </Text>
                <Text variant="body" color="textSecondary">
                  Melde dich an oder erstelle ein Konto
                </Text>
              </Box>
            </Box>
            <TouchableOpacity
              style={{
                backgroundColor: '#fde047',
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 24,
                alignItems: 'center',
              }}
              onPress={handleAccountPress}
            >
              <Text variant="body" color="textPrimary" fontWeight="600">
                Anmelden / Registrieren
              </Text>
            </TouchableOpacity>
          </Box>

          {/* Menu Items */}
          <Box>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}
                onPress={item.onPress}
              >
                <Box
                  backgroundColor="accent2"
                  borderRadius="m"
                  width={40}
                  height={40}
                  justifyContent="center"
                  alignItems="center"
                  marginRight="m"
                >
                  <Icon name={item.icon} size={20} color="accent1" />
                </Box>
                <Box flex={1}>
                  <Text variant="subtitle" fontWeight="600" marginBottom="xs">
                    {item.title}
                  </Text>
                  <Text variant="small" color="textSecondary">
                    {item.subtitle}
                  </Text>
                </Box>
                <Icon name="arrow-right" size={20} color="textSecondary" />
              </TouchableOpacity>
            ))}
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default ProfileScreen;
