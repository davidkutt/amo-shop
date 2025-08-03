import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'components/atoms/Icon';
import { Text } from 'components/atoms/Text';

// Define the shape of a single "crumb"
interface Crumb {
  label: string;
  onPress: () => void;
}

interface BreadcrumbsProps {
  // The component takes an array of crumb objects
  crumbs: Crumb[];
  containerClassName?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
                                                          crumbs,
                                                          containerClassName = '',
                                                        }) => {
  return (
    <View className={`flex-row items-center flex-wrap ${containerClassName}`}>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;

        return (
          <React.Fragment key={index}>
            {/* If it's the last crumb, render it as non-interactive text */}
            {isLast ? (
              <Text variant="body" className="font-semibold text-gray-500 ">
                {crumb.label}
              </Text>
            ) : (
              // Otherwise, render it as a tappable link
              <TouchableOpacity onPress={crumb.onPress}>
                <Text variant="link">{crumb.label}</Text>
              </TouchableOpacity>
            )}

            {/* Add a separator icon after each crumb except the last one */}
            {!isLast && (
              <View className="mx-2">
                <Icon name="chevron-right" size={16} color="#9CA3AF" />
              </View>
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};
