import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'components/atoms/Text';
import { Icon, IconName } from 'components/atoms/Icon';

interface FilterButtonProps {
  children: string;
  onPress: () => void;
  iconName?: IconName;
}

/**
 * A simple, tappable text button with an optional icon, styled in a warm, elegant aesthetic.
 */
export const FilterButton: React.FC<FilterButtonProps> = ({
                                                            children,
                                                            onPress,
                                                            iconName,
                                                          }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center gap-x-2">
      <Text className="text-text text-base font-medium">{children}</Text>

      {/* The icon also uses the new text color for consistency */}
      {iconName && <Icon name={iconName} size={18} color="#36454F" />}
    </TouchableOpacity>
  );
};
