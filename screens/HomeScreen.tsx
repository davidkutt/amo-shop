import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../components/atoms/Text';

// --- Reusable Sub-components for this screen ---

const CategoryLink = ({ label, imageUrl, onPress }) => (
  <TouchableOpacity onPress={onPress} className="items-center gap-y-2">
    <Image
      source={{ uri: imageUrl }}
      className="w-28 h-28 border-2 border-black"
      resizeMode="cover"
    />
    <Text className="text-black uppercase font-bold text-xs tracking-widest">
      {label}
    </Text>
  </TouchableOpacity>
);

const HeroSection = ({ title, subtitle, imageUrl, links, onPress }) => (
  <View className="border-b-2 border-black">
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <ImageBackground
        source={{ uri: imageUrl }}
        resizeMode="cover"
        className="h-[60vh]"
      >
        <View style={styles.overlay} />
        <View className="w-full h-full justify-center items-center p-4">
          <Text className="text-white uppercase font-bold text-4xl tracking-wider text-center">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-white uppercase font-semibold text-2xl tracking-wider text-center">
              {subtitle}
            </Text>
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
    {links && (
      // This container no longer has any stray dot elements.
      <View className="bg-white p-4 flex-row justify-around items-center">
        {links.map((link) => (
          <CategoryLink
            key={link.label}
            label={link.label}
            imageUrl={link.imageUrl}
            onPress={link.onPress}
          />
        ))}
      </View>
    )}
  </View>
);

// --- Main HomeScreen Component ---

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToGrid = (category) => {
    navigation.navigate('ProductGrid', { category });
  };

  const heroData = [
    {
      title: 'Hamptons Sneakers',
      imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200',
      links: [
        {
          label: 'For Women',
          imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500',
          onPress: () => navigateToGrid("Women's Sneakers"),
        },
        {
          label: 'For Men',
          imageUrl: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500',
          onPress: () => navigateToGrid("Men's Sneakers"),
        },
      ],
    },
    {
      title: 'Summer',
      subtitle: 'Collection',
      imageUrl: 'https://images.unsplash.com/photo-150937554154A-d41b31a89a74?w=1200',
      onPress: () => navigateToGrid('Summer Collection'),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        {heroData.map((section, index) => (
          <HeroSection
            key={index}
            title={section.title}
            subtitle={section.subtitle}
            imageUrl={section.imageUrl}
            links={section.links}
            onPress={() => section.onPress && section.onPress()}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

export default HomeScreen;
