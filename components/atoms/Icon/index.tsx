import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useColorScheme } from 'nativewind';
import { icons } from './icons';

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string; // This will primarily control the STROKE color
  fill?: string;  // This will control the FILL color
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
                                            name,
                                            size = 24,
                                            color,
                                            fill = 'none', // Default fill to 'none' if not provided
                                            className,
                                          }) => {
  const { colorScheme } = useColorScheme();
  const iconColor = color || ( '#000000');
  const pathData = icons[name];

  if (!pathData) {
    return null;
  }

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      // These props are now passed to the Path element for more control
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <Path
        d={pathData}
        stroke={iconColor} // The `color` prop controls the outline
        fill={fill}         // The `fill` prop controls the inner color
      />
    </Svg>
  );
};
