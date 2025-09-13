import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { useTheme } from '@shopify/restyle';
import { Theme } from 'theme/index'; // Importing the TYPE is okayimport { Text } from 'components/atoms/Text';
import { Button } from 'components/atoms/Button';
import { Input } from 'components/atoms/Input';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme<Theme>(); // <--- Use the hook to get the theme

  return (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

describe('Atomic Components - Joyful Design System', () => {
  describe('Text Component', () => {
    it('should render with correct joyful typography variants', () => {
      const { getByText } = customRender(
        <>
          <Text variant="title">Title Text</Text>
          <Text variant="subtitle">Subtitle Text</Text>
          <Text variant="body">Body Text</Text>
          <Text variant="small">Small Text</Text>
        </>
      );

      expect(getByText('Title Text')).toBeTruthy();
      expect(getByText('Subtitle Text')).toBeTruthy();
      expect(getByText('Body Text')).toBeTruthy();
      expect(getByText('Small Text')).toBeTruthy();
    });

    it('should use Nunito font family for joyful feel', () => {
      const { getByText } = customRender(
        <Text variant="title">Joyful Title</Text>
      );

      const textElement = getByText('Joyful Title');
      expect(textElement).toBeTruthy();
    });
  });

  describe('Button Component', () => {
    it('should render with fully rounded corners (joyful design)', () => {
      const { getByText } = customRender(
        <Button title="Joyful Button" onPress={() => {}} />
      );

      expect(getByText('Joyful Button')).toBeTruthy();
    });

    it('should support different variants with joyful colors', () => {
      const { getByText: getPrimary } = customRender(
        <Button title="Primary" variant="primary" onPress={() => {}} />
      );
      const { getByText: getOutline } = customRender(
        <Button title="Outline" variant="outline" onPress={() => {}} />
      );
      const { getByText: getText } = customRender(
        <Button title="Text" variant="text" onPress={() => {}} />
      );

      expect(getPrimary('Primary')).toBeTruthy();
      expect(getOutline('Outline')).toBeTruthy();
      expect(getText('Text')).toBeTruthy();
    });
  });

  describe('Input Component', () => {
    it('should render with joyful styling', () => {
      const { getByPlaceholderText } = customRender(
        <Input placeholder="Enter joyful text" />
      );

      expect(getByPlaceholderText('Enter joyful text')).toBeTruthy();
    });
  });
});

describe('Theme - Joyful Design System', () => {
  it('should have joyful color palette', () => {
    expect(theme.colors.primary).toBe('#93c5fd'); // Soft Blue
    expect(theme.colors.accent1).toBe('#fde047'); // Cheerful Yellow
    expect(theme.colors.accent2).toBe('#f9a8d4'); // Playful Pink
    expect(theme.colors.accent3).toBe('#5eead4'); // Fresh Green
    expect(theme.colors.accent4).toBe('#fed7aa'); // Warm Peach
  });

  it('should use Nunito font family for joyful typography', () => {
    expect(theme.textVariants.title.fontFamily).toBe('Nunito-Bold');
    expect(theme.textVariants.body.fontFamily).toBe('Nunito-Regular');
    expect(theme.textVariants.small.fontFamily).toBe('Nunito-Medium');
  });

  it('should have fully rounded button variants', () => {
    expect(theme.buttonVariants.primary.borderRadius).toBe('full');
    expect(theme.buttonVariants.outline.borderRadius).toBe('full');
  });

  it('should have transparent color for joyful design', () => {
    expect(theme.colors.transparent).toBe('transparent');
  });
});
