import React from 'react';
import { View, ImageBackground } from 'react-native';
import { createRestyleComponent, createVariant, spacing, SpacingProps } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Button } from 'components/atoms/Button';

const HeroSectionContainer = createRestyleComponent<SpacingProps<Theme>, View>([spacing], View);

export interface HeroSectionProps {
  backgroundImage?: string;
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: {
    text: string;
    action: () => void;
  };
  secondaryCta?: {
    text: string;
    action: () => void;
  };
  height?: number;
  textAlign?: 'left' | 'center' | 'right';
  overlayOpacity?: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  height = 400,
  textAlign = 'center',
  overlayOpacity = 0.3,
}) => {
  const content = (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start',
        padding: 20,
      }}
    >
      <Text
        variant="title"
        color="white"
        textAlign={textAlign}
        marginBottom="sm"
        style={{ textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 }}
      >
        {title}
      </Text>
      
      {subtitle && (
        <Text
          variant="subtitle"
          color="white"
          textAlign={textAlign}
          marginBottom="md"
          style={{ textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 }}
        >
          {subtitle}
        </Text>
      )}
      
      {description && (
        <Text
          variant="body"
          color="white"
          textAlign={textAlign}
          marginBottom="lg"
          style={{ textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 }}
        >
          {description}
        </Text>
      )}
      
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start',
        }}
      >
        {primaryCta && (
          <Button
            variant="primary"
            size="lg"
            title={primaryCta.text}
            onPress={primaryCta.action}
          />
        )}
        {secondaryCta && (
          <Button
            variant="outline"
            size="lg"
            title={secondaryCta.text}
            onPress={secondaryCta.action}
          />
        )}
      </View>
    </View>
  );

  if (backgroundImage) {
    return (
      <HeroSectionContainer height={height} position="relative">
        <ImageBackground
          source={{ uri: backgroundImage }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
            }}
          />
          {content}
        </ImageBackground>
      </HeroSectionContainer>
    );
  }

  return (
    <HeroSectionContainer
      height={height}
      backgroundColor="primary"
      justifyContent="center"
      alignItems="center"
    >
      {content}
    </HeroSectionContainer>
  );
};

export default HeroSection;
export type { HeroSectionProps };
