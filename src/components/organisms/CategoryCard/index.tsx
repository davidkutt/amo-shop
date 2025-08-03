import React from 'react';
import {
  Pressable,
  ImageBackground,
  View,
  ImageSourcePropType,
} from 'react-native';
import { Text } from 'components/atoms/Text';

// Define the shape of a single category object
type Category = {
  id: string;
  title: string;
  image: ImageSourcePropType;
};

// Define the props for the CategoryCard component
type CategoryCardProps = {
  category: Category;
  onPress: (categoryId: string) => void;
};

/**
 * A reusable, pressable card with a background image and a title to represent a single category.
 */
export const CategoryCard: React.FC<CategoryCardProps> = ({
                                                            category,
                                                            onPress,
                                                          }) => {
  return (
    <Pressable onPress={() => onPress(category.id)}>
      <ImageBackground
        source={category.image}
        resizeMode="cover"
        // The card is full-width with a 4:3 aspect ratio for a visually appealing shape
        className="w-full aspect-[4/3] justify-center items-center"
      >
        {/* Text Box Overlay with a semi-transparent background and border */}
        <View className="bg-background/80 border border-text/50 p-4">
          <Text
            className="text-text text-2xl"
          >
            {category.title}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};
