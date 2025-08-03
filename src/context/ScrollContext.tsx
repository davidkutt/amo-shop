import React, { createContext, useContext } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  SharedValue,
} from 'react-native-reanimated';

// Define the shape of our context data
interface ScrollContextType {
  scrollY: SharedValue<number>;
  scrollHandler: (event: any) => void;
}

// Create the context
const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

// Create the Provider component
export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <ScrollContext.Provider value={{ scrollY, scrollHandler }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};
