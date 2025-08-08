import { createTheme } from '@shopify/restyle';

// Color palette from PRD
const palette = {
  // Primary colors
  primary: '#93c5fd', // Soft Blue
  background: '#f8fafc', // Light Off-White
  text: '#334155', // Soft Charcoal
  
  // Accent colors
  accent1: '#fde047', // Cheerful Yellow
  accent2: '#f9a8d4', // Playful Pink
  accent3: '#5eead4', // Fresh Green
  accent4: '#fed7aa', // Warm Peach
  
  // Additional colors
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

const theme = createTheme({
  colors: {
    // Primary colors
    primary: palette.primary,
    background: palette.background,
    text: palette.text,
    
    // Accent colors
    accent1: palette.accent1,
    accent2: palette.accent2,
    accent3: palette.accent3,
    accent4: palette.accent4,
    
    // Base colors
    white: palette.white,
    black: palette.black,
    
    // Gray scale
    gray50: palette.gray50,
    gray100: palette.gray100,
    gray200: palette.gray200,
    gray300: palette.gray300,
    gray400: palette.gray400,
    gray500: palette.gray500,
    gray600: palette.gray600,
    gray700: palette.gray700,
    gray800: palette.gray800,
    gray900: palette.gray900,
    
    // Status colors
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    info: palette.info,
    
    // Semantic colors
    mainBackground: palette.background,
    cardBackground: palette.white,
    textPrimary: palette.text,
    textSecondary: palette.gray600,
    textTertiary: palette.gray400,
    border: palette.gray200,
    shadow: palette.black,
  },
  
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  borderRadii: {
    none: 0,
    xs: 2,
    s: 4,
    m: 8,
    l: 12,
    xl: 16,
    xxl: 24,
    xxxl: 32,
    full: 9999,
  },
  
  textVariants: {
    title: {
      fontFamily: 'Nunito-Bold',
      fontSize: 32,
      lineHeight: 40,
      fontWeight: 'bold',
      color: 'textPrimary',
    },
    subtitle: {
      fontFamily: 'Nunito-Bold',
      fontSize: 24,
      lineHeight: 32,
      fontWeight: 'bold',
      color: 'textPrimary',
    },
    body: {
      fontFamily: 'Nunito-Regular',
      fontSize: 16,
      lineHeight: 24,
      color: 'textPrimary',
    },
    small: {
      fontFamily: 'Nunito-Medium',
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '500',
      color: 'textSecondary',
    },
    caption: {
      fontFamily: 'Nunito-Regular',
      fontSize: 12,
      lineHeight: 16,
      color: 'textTertiary',
    },
    defaults: {
      fontFamily: 'Nunito-Regular',
      fontSize: 16,
      lineHeight: 24,
      color: 'textPrimary',
    },
  },
  
  buttonVariants: {
    primary: {
      backgroundColor: 'primary',
      borderRadius: 'full',
      paddingHorizontal: 'l',
      paddingVertical: 'm',
      alignItems: 'center',
      justifyContent: 'center',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'primary',
      borderRadius: 'full',
      paddingHorizontal: 'l',
      paddingVertical: 'm',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      backgroundColor: 'transparent',
      paddingHorizontal: 'm',
      paddingVertical: 's',
      alignItems: 'center',
      justifyContent: 'center',
    },
    defaults: {
      backgroundColor: 'primary',
      borderRadius: 'full',
      paddingHorizontal: 'l',
      paddingVertical: 'm',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  
  cardVariants: {
    elevated: {
      backgroundColor: 'cardBackground',
      borderRadius: 'xl',
      shadowColor: 'shadow',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      padding: 'm',
    },
    outlined: {
      backgroundColor: 'cardBackground',
      borderRadius: 'xl',
      borderWidth: 1,
      borderColor: 'border',
      padding: 'm',
    },
    defaults: {
      backgroundColor: 'cardBackground',
      borderRadius: 'xl',
      padding: 'm',
    },
  },
  
  badgeVariants: {
    standard: {
      backgroundColor: 'accent1',
      borderRadius: 'full',
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 'xs',
    },
    dot: {
      backgroundColor: 'accent1',
      borderRadius: 'full',
      width: 8,
      height: 8,
    },
    defaults: {
      backgroundColor: 'accent1',
      borderRadius: 'full',
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 'xs',
    },
  },
  
  chipVariants: {
    default: {
      backgroundColor: 'gray100',
      borderRadius: 'full',
      paddingHorizontal: 'm',
      paddingVertical: 's',
      alignItems: 'center',
      justifyContent: 'center',
    },
    selected: {
      backgroundColor: 'primary',
      borderRadius: 'full',
      paddingHorizontal: 'm',
      paddingVertical: 's',
      alignItems: 'center',
      justifyContent: 'center',
    },
    defaults: {
      backgroundColor: 'gray100',
      borderRadius: 'full',
      paddingHorizontal: 'm',
      paddingVertical: 's',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  
  colorSelectorVariants: {
    default: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    defaults: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  
  disclosureVariants: {
    default: {
      backgroundColor: 'transparent',
    },
    bordered: {
      backgroundColor: 'cardBackground',
      borderRadius: 'm',
      borderWidth: 1,
      borderColor: 'border',
      padding: 'm',
    },
    defaults: {
      backgroundColor: 'transparent',
    },
  },
  
  filterButtonVariants: {
    default: {
      backgroundColor: 'gray100',
      borderRadius: 'full',
      borderWidth: 1,
      borderColor: 'border',
    },
    outline: {
      backgroundColor: 'transparent',
      borderRadius: 'full',
      borderWidth: 1,
      borderColor: 'primary',
    },
    ghost: {
      backgroundColor: 'transparent',
      borderRadius: 'full',
    },
    active: {
      backgroundColor: 'primary',
      borderRadius: 'full',
    },
    defaults: {
      backgroundColor: 'gray100',
      borderRadius: 'full',
      borderWidth: 1,
      borderColor: 'border',
    },
  },
  
  formFieldVariants: {
    default: {
      backgroundColor: 'transparent',
    },
    compact: {
      backgroundColor: 'transparent',
      marginBottom: 's',
    },
    defaults: {
      backgroundColor: 'transparent',
    },
  },
  
  switchVariants: {
    default: {
      backgroundColor: 'transparent',
    },
    defaults: {
      backgroundColor: 'transparent',
    },
  },
  
  textInputFieldVariants: {
    default: {
      backgroundColor: 'transparent',
    },
    outlined: {
      backgroundColor: 'transparent',
    },
    filled: {
      backgroundColor: 'gray50',
      borderRadius: 'm',
      padding: 's',
    },
    defaults: {
      backgroundColor: 'transparent',
    },
  },
});

export type Theme = typeof theme;
export default theme;
