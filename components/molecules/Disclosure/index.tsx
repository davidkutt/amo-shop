import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '../../atoms/Text';
import { Icon } from '../../atoms/Icon';
import { LayoutAnimation } from 'react-native';

interface DisclosureProps {
  /**
   * The content for the tappable header of the disclosure.
   */
  summary: React.ReactNode;
  /**
   * The content that will be shown or hidden.
   */
  children: React.ReactNode;
  /**
   * If true, the disclosure will be open by default.
   */
  initialOpen?: boolean;
  /**
   * Custom styles for the container View.
   */
  className?: string;
}

/**
 * A collapsible content area (accordion) styled in a stark, minimalist aesthetic.
 */
export const Disclosure: React.FC<DisclosureProps> = ({
                                                        summary,
                                                        children,
                                                        initialOpen = false,
                                                        className = '',
                                                      }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleToggle = () => {
    // Animate the layout change for a smooth open/close effect
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View className={`bg-white border-b-2 border-black ${className}`}>
      {/* The tappable header area */}
      <TouchableOpacity
        onPress={handleToggle}
        className="flex-row items-center justify-between p-4"
        activeOpacity={0.8}
      >
        <View className="flex-1">
          {typeof summary === 'string' ? (
            <Text className="text-black uppercase font-bold text-base">
              {summary}
            </Text>
          ) : (
            summary
          )}
        </View>

        {/* The rotating chevron icon with the className applied directly */}
        <Icon
          name="chevron-down"
          size={24}
          color="black"
          className={`${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </TouchableOpacity>

      {/* The collapsible content area */}
      {isOpen && <View className="px-4 pb-4">{children}</View>}
    </View>
  );
};
