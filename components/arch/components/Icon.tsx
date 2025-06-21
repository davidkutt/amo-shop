import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IconProps {
  name: React.ComponentProps<typeof Ionicons>['name'];
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
  className?: string;
}

export default function Icon({ 
  name, 
  size = 24, 
  color = 'black', 
  className,
  ...rest 
}: IconProps) {
  return (
    <Ionicons 
      name={name} 
      size={size} 
      color={color} 
      style={className ? { marginRight: 8 } : undefined}
      {...rest} 
    />
  );
} 