import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Text } from 'components/atoms/Text';
import { Icon, IconName } from 'components/atoms/Icon';

// --- PersonalityCard Sub-Component ---

type PersonalityCardProps = {
  title: string;
  iconName: IconName;
  color: string; // A NativeWind background color class, e.g., 'bg-sky-300'
  onPress: () => void;
};

const PersonalityCard: React.FC<PersonalityCardProps> = ({
                                                           title,
                                                           iconName,
                                                           color,
                                                           onPress,
                                                         }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        w-40 h-48 rounded-3xl justify-center items-center p-4
        ${color}
      `}
      activeOpacity={0.8}
    >
      <Icon name={iconName} size={48} color="#36454F" />
      <Text className="text-prunkhund-text text-center font-bold mt-4">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// --- Main PersonalityPacksCarousel Component ---

type PersonalityPack = {
  id: string;
  title: string;
  iconName: IconName;
  color: string;
  handle: string; // The Shopify collection handle to navigate to
};

type PersonalityPacksCarouselProps = {
  title: string;
  packs: PersonalityPack[];
  onPackPress: (handle: string) => void;
};

/**
 * A horizontal carousel of playful cards for shopping by "vibe" or personality.
 */
export const PersonalityPacksCarousel: React.FC<PersonalityPacksCarouselProps> = ({
                                                                                    title,
                                                                                    packs,
                                                                                    onPackPress,
                                                                                  }) => {
  return (
    <View className="py-8">
      {/* Section Title */}
      <View className="px-4 mb-4">
        <Text
          className="text-text text-3xl font-bold"
        >
          {title}
        </Text>
      </View>

      {/* Horizontal List of Personality Cards */}
      <FlatList
        data={packs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PersonalityCard
            title={item.title}
            iconName={item.iconName}
            color={item.color}
            onPress={() => onPackPress(item.handle)}
          />
        )}
        // Add spacing between the cards and at the start/end of the list
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View className="w-4" />}
      />
    </View>
  );
};
