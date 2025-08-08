import React, { useState, useRef } from 'react';
import { ScrollView, Dimensions, View } from 'react-native';
import { createRestyleComponent, createVariant, spacing, SpacingProps } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Button } from 'components/atoms/Button';
import { Icon } from 'components/atoms/Icon';

const { width: screenWidth } = Dimensions.get('window');

const HeroCarouselContainer = createRestyleComponent<SpacingProps<Theme>, View>([spacing], View);

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaAction?: () => void;
}

export interface HeroCarouselProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
  height?: number;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showPagination = true,
  showNavigation = true,
  height = 300,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    scrollToIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    scrollToIndex(prevIndex);
  };

  return (
    <HeroCarouselContainer position="relative" height={height}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={{ width: screenWidth, height }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#f0f0f0', // Placeholder for image
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
              }}
            >
              <Text variant="title" color="primary" textAlign="center" marginBottom="sm">
                {slide.title}
              </Text>
              {slide.subtitle && (
                <Text variant="body" color="textSecondary" textAlign="center" marginBottom="md">
                  {slide.subtitle}
                </Text>
              )}
              {slide.ctaText && (
                <Button
                  variant="primary"
                  size="md"
                  title={slide.ctaText}
                  onPress={slide.ctaAction}
                />
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {showPagination && (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: index === currentIndex ? '#007AFF' : '#D1D5DB',
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>
      )}

      {showNavigation && slides.length > 1 && (
        <>
          <Button
            variant="outline"
            size="sm"
            onPress={prevSlide}
            style={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: [{ translateY: -20 }],
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <Icon name="chevron-left" size={20} color="primary" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onPress={nextSlide}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: [{ translateY: -20 }],
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <Icon name="chevron-right" size={20} color="primary" />
          </Button>
        </>
      )}
    </HeroCarouselContainer>
  );
};

export default HeroCarousel;
export type { HeroCarouselProps };
