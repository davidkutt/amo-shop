# Atomic Components (@/src/components/atoms)

This document outlines the "atomic" components of our design system. Atoms are the smallest, indivisible UI elements and serve as the fundamental building blocks for our application's interface. They are designed to be pure, highly reusable, and styled with NativeWind.

## Table of Contents

1. [Button](#button)
2. [Icon](#icon)
3. [Input](#input)
4. [Text](#text)

---

## Button

A versatile and themeable button component for user actions, with built-in variants, sizes, and loading/disabled states.

**Import**

```typescript
import { Button } from '@/components/atoms/Button';
```

**Props**

| Prop           | Type                               | Required | Default     | Description                                                      |
| :------------- | :--------------------------------- | :------- | :---------- | :--------------------------------------------------------------- |
| title          | string                             | No       | -           | The text content of the button. Use this or children.            |
| children       | React.ReactNode                    | No       | -           | Custom content for the button, which overrides the title prop.   |
| onPress        | () => void                         | Yes      | -           | Function to execute when the button is pressed.                  |
| variant        | 'primary' \| 'outline' \| 'text'    | No       | 'primary'   | The visual style of the button.                                  |
| size           | 'sm' \| 'md' \| 'lg'                | No       | 'md'        | The size of the button, affecting padding and text size.         |
| disabled       | boolean                            | No       | false       | If true, the button is visually disabled and cannot be pressed.  |
| loading        | boolean                            | No       | false       | If true, displays an ActivityIndicator and disables the button.  |
| className      | string                             | No       | ''          | Custom Tailwind classes to apply to the button's container.      |
| textClassName  | string                             | No       | ''          | Custom Tailwind classes to apply to the button's text.           |

**Usage**

```tsx
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';

// Primary Button (Default)
<Button title="Create Account" onPress={() => {}} />

// Outline Button
<Button variant="outline" title="Learn More" onPress={() => {}} />

// Text-only Button
<Button variant="text" title="Cancel" onPress={() => {}} />

// Large button in a loading state
<Button size="lg" loading={true} onPress={() => {}} />

// Small, disabled button
<Button size="sm" disabled={true} title="Cannot Submit" onPress={() => {}} />

// Button with custom children (e.g., an icon)
<Button onPress={() => {}}>
  <Icon name="plus" size={16} color="white" />
</Button>
```

---

## Icon

A component to render SVG icons from a predefined set. It offers control over size, stroke, and fill color.

**Import**

```typescript
import { Icon, IconName } from '@/components/atoms/Icon';
```

**Props**

| Prop       | Type       | Required | Default     | Description                                                              |
| :--------- | :--------- | :------- | :---------- | :----------------------------------------------------------------------- |
| name       | IconName   | Yes      | -           | The name of the icon to display from the icons.ts map.                  |
| size       | number     | No       | 24          | The width and height of the icon in pixels.                             |
| color      | string     | No       | '#000000'   | The color of the icon's stroke (outline).                               |
| fill       | string     | No       | 'none'      | The fill color of the icon. Use a specific color for filled icons.      |
| className  | string     | No       | -           | Custom Tailwind classes to apply to the SVG element (e.g., rotation).   |

**Usage**

```tsx
import { Icon } from '@/components/atoms/Icon';
import { View } from 'react-native';

<View style={{ flexDirection: 'row', gap: 16 }}>
  {/* Standard outline icon */}
  <Icon name="home" size={24} />

  {/* Icon with a custom stroke color */}
  <Icon name="search" size={32} color="#3b82f6" />

  {/* A filled icon (like a star for ratings) */}
  <Icon name="star" size={20} color="#facc15" fill="#facc15" />

  {/* Icon with a rotation class */}
  <Icon name="chevron-down" size={24} className="rotate-180" />
</View>
```

---

## Input

A styled text input component that adapts its appearance based on its state (default, focused, or error). It serves as a flexible wrapper around the standard TextInput.

**Import**

```typescript
import { Input } from '@/components/atoms/Input';
```

**Props**

| Prop       | Type                    | Required | Default     | Description                                                        |
| :--------- | :---------------------- | :------- | :---------- | :----------------------------------------------------------------- |
| variant    | 'default' \| 'error'    | No       | 'default'   | The visual state of the input, primarily affecting border color.   |
| className  | string                  | No       | ''          | Custom Tailwind classes to merge with default styles.              |
| ...rest    | TextInputProps          | -        | -           | Inherits props from React Native TextInput.                        |

**Usage**

```tsx
import { Input } from '@/components/atoms/Input';
import { useState } from 'react';

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const emailHasError = email.length > 0 && !email.includes('@');

// Standard input for an email address
<Input
  value={email}
  onChangeText={setEmail}
  placeholder="you@example.com"
  keyboardType="email-address"
  autoCapitalize="none"
  variant={emailHasError ? 'error' : 'default'}
/>

// Input for a password
<Input
  value={password}
  onChangeText={setPassword}
  placeholder="Password"
  secureTextEntry
/>
```

---

## Text

A foundational component for rendering all text. It ensures typographic consistency across the app by applying predefined styles for different semantic variants.

**Import**

```typescript
import { Text } from '@/components/atoms/Text';
```

**Props**

| Prop       | Type                                        | Required | Default  | Description                                                          |
| :--------- | :------------------------------------------ | :------- | :------- | :------------------------------------------------------------------- |
| variant    | 'title' \| 'subtitle' \| 'body' \| 'small'  | No       | 'body'   | The typographic style to apply from a set of predefined variants.    |
| children   | React.ReactNode                             | Yes      | -        | The text or other elements to be rendered.                           |
| className  | string                                      | No       | ''       | Custom Tailwind classes to override or extend variant styles.        |
| ...rest    | RNTextProps                                 | -        | -        | Inherits props from React Native Text.                               |

**Usage**

```tsx
import { Text } from '@/components/atoms/Text';
import { View } from 'react-native';

<View>
  <Text variant="title">Welcome Back</Text>

  <Text variant="subtitle" className="mt-2">
    Your daily recommendations are here.
  </Text>

  <Text variant="body" className="mt-4">
    This is a paragraph of standard body text. It's used for descriptions
    and general content throughout the application.
  </Text>

  <Text variant="small" className="mt-4">
    Terms and Conditions apply.
  </Text>
</View>
```