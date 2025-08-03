import React, { useState } from 'react';
import { View, Image, Dimensions, Pressable, ImageSourcePropType } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Text } from 'components/atoms/Text'; // Assuming this is our custom Text atom

// Get the full width and height of the screen for responsive sizing
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define the type for a single slide item
type Slide = {
  id: string;
  image: ImageSourcePropType;
  title: string;
  subtitle?: string;
  badge?: string;
};

// Define the props for the HeroCarousel component
type HeroCarouselProps = {
  slides: Slide[];
  onSlidePress: (slideId: string) => void;
};

/**
 * A beautiful, full-width, swipeable carousel to showcase featured collections.
 * It's designed to be highly reusable and match the premium, elegant Prunkhund aesthetic.
 */
export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides, onSlidePress }) => {
  // Calculate the height of the carousel to be 60% of the screen height
  const carouselHeight = screenHeight * 0.6;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View className="w-full" style={{ height: carouselHeight }}>
      <Carousel
        loop
        width={screenWidth}
        height={carouselHeight}
        autoPlay={true}
        autoPlayInterval={4000}
        data={slides}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onSlidePress(item.id)}
            className="flex-1" // Ensure the Pressable fills the entire item space
          >
            {/* Background Image */}
            <Image
              source={item.image}
              className="absolute inset-0 w-full h-full" // Equivalent to StyleSheet.absoluteFillObject
              resizeMode="cover"
            />

            {/* Subtle Dark Overlay for Text Legibility */}
            <View className="absolute inset-0 bg-black/30" />



            {/* Badge - Top Right Corner */}
            {/*{item.badge && (*/}
            {/*  <View className="absolute top-4 right-4 bg-highlight-pink rounded-full px-3 py-1">*/}
            {/*    <Text className="text-background text-xs font-bold uppercase">*/}
            {/*      {item.badge}*/}
            {/*    </Text>*/}
            {/*  </View>*/}
            {/*)}*/}
          </Pressable>
        )}
      />

      {/* Pagination Dots */}
      <View className="flex-row justify-center absolute bottom-4 w-full">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`
              w-2 h-2 rounded-full mx-1
              ${activeIndex === index ? 'bg-primary' : 'bg-gray-300'}
            `}
          />
        ))}
      </View>
    </View>
  );
};
