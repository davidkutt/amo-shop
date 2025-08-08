import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { createRestyleComponent, createVariant, spacing, SpacingProps } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Button } from 'components/atoms/Button';
import { Icon } from 'components/atoms/Icon';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth * 0.8;

const PersonalityPacksContainer = createRestyleComponent<SpacingProps<Theme>, View>([spacing], View);

export interface PersonalityPack {
  id: string;
  title: string;
  description: string;
  image: string;
  productCount: number;
  priceRange: {
    min: number;
    max: number;
  };
  tags: string[];
  onPress: () => void;
}

export interface PersonalityPacksCarouselProps {
  title: string;
  subtitle?: string;
  packs: PersonalityPack[];
  showViewAll?: boolean;
  onViewAll?: () => void;
}

const PersonalityPacksCarousel: React.FC<PersonalityPacksCarouselProps> = ({
  title,
  subtitle,
  packs,
  showViewAll = true,
  onViewAll,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <PersonalityPacksContainer paddingVertical="lg">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <View style={{ flex: 1 }}>
          <Text variant="subtitle" color="textPrimary" marginBottom="xs">
            {title}
          </Text>
          {subtitle && (
            <Text variant="body" color="textSecondary">
              {subtitle}
            </Text>
          )}
        </View>
        {showViewAll && onViewAll && (
          <Button
            variant="text"
            size="sm"
            title="View All"
            onPress={onViewAll}
          />
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {packs.map((pack) => (
          <View
            key={pack.id}
            style={{
              width: cardWidth,
              marginRight: 16,
              backgroundColor: 'white',
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <View
              style={{
                width: '100%',
                height: 120,
                backgroundColor: '#f0f0f0', // Placeholder for image
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon name="image" size={32} color="textSecondary" />
            </View>

            <View style={{ padding: 16 }}>
              <Text variant="subtitle" color="textPrimary" marginBottom="xs">
                {pack.title}
              </Text>
              
              <Text variant="body" color="textSecondary" marginBottom="sm" numberOfLines={2}>
                {pack.description}
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Icon name="package" size={16} color="textSecondary" />
                <Text variant="small" color="textSecondary" style={{ marginLeft: 4 }}>
                  {pack.productCount} products
                </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Icon name="tag" size={16} color="textSecondary" />
                <Text variant="small" color="textSecondary" style={{ marginLeft: 4 }}>
                  {formatPrice(pack.priceRange.min)} - {formatPrice(pack.priceRange.max)}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
                {pack.tags.slice(0, 3).map((tag, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: '#f3f4f6',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                    }}
                  >
                    <Text variant="small" color="textSecondary">
                      {tag}
                    </Text>
                  </View>
                ))}
                {pack.tags.length > 3 && (
                  <View
                    style={{
                      backgroundColor: '#f3f4f6',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                    }}
                  >
                    <Text variant="small" color="textSecondary">
                      +{pack.tags.length - 3}
                    </Text>
                  </View>
                )}
              </View>

              <Button
                variant="primary"
                size="sm"
                title="Explore Pack"
                onPress={pack.onPress}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </PersonalityPacksContainer>
  );
};

export default PersonalityPacksCarousel;
export type { PersonalityPacksCarouselProps };
