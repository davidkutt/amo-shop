import React, { useEffect } from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Text } from 'components/atoms/Text';

// Define the props for the HeroSection component
type HeroSectionProps = {
  title: string;
  image: ImageSourcePropType;
  backgroundColor: string; // e.g., 'bg-yellow-300'
};

/**
 * A static hero section to welcome the user with a cheerful message and image.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
                                                          title,
                                                          image,
                                                          backgroundColor,
                                                        }) => {
  // --- Animation Setup ---
  // Shared value for the image scale, starting at a smaller size
  const imageScale = useSharedValue(0.8);

  // Animated style that will be applied to the image container
  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: imageScale.value }],
    };
  });

  // Trigger the animation when the component mounts
  useEffect(() => {
    imageScale.value = withSpring(1, { damping: 12, stiffness: 100 });
  }, []);
  const greetingByTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Guten Morgen!';
    } else if (hour < 18) {
      return 'Guten Abend!';
    } else {
    }
  }
  return (
    // Main container with dynamic background color
    <View
      className={`w-full h-96 justify-center items-center p-8 ${backgroundColor}`}
    >
      {/* Title Text */}
      <Text
        className="text-text text-4xl font-bold text-center mb-6"
        // Note: For a truly rounded font, you would add a custom font family here
        // style={{ fontFamily: 'Nunito-Bold' }}
      >
        {title}
      </Text>

      {/* Animated Image Container */}
      <Animated.View style={animatedImageStyle}>
        <Image
          source={image}
          // Large, playful rounded corners and a subtle shadow
          className="w-48 h-48 rounded-2xl shadow-lg"
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
};
