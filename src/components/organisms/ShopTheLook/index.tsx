import React from 'react';
import {
  View,
  Image,
} from 'react-native';
import { Text } from 'components/atoms/Text';
import { Button } from 'components//atoms/Button';

type Look = {
  collectionHandle: string;
  title: string;
  imageUrl: string;
  description: string;
};

type ShopTheLookProps = {
  look: Look;
  onPress: (collectionHandle: string) => void;
};

export const ShopTheLook: React.FC<ShopTheLookProps> = ({
                                                          look,
                                                          onPress,
                                                        }) => {
  return (
    <View className="my-4 mx-4 p-4 bg-primary/20 rounded-lg">

      <Image
        source={{ uri: look.imageUrl }}
        className="w-full aspect-[4/3] rounded-lg"
        resizeMode="cover"
      />

      {/* Title section */}
      <View className="my-4">
        <Text
          className="texttext text-2xl text-center"
        >
          Shop The Look
        </Text>
        <Text className="text-text text-lg text-center mt-1">
          {look.description}
        </Text>
      </View>

      {/* Primary Call-to-Action Button */}
      <Button
        title="Diesen Look Shoppen"
        onPress={() => onPress(look.description)}
        className="bg-primary w-full"
        textClassName="text-white"
      />
    </View>
  );
};
