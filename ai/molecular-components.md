# Molecular Components (@/src/components/molecules)

This document outlines the "molecular" components of our design system. Molecules are groups of atoms bonded together to form more complex, reusable UI units. They are the next level of abstraction up from atoms and often manage a small amount of state or logic.

## Table of Contents

1. [Badge](#badge)
2. [Breadcrumbs](#breadcrumbs)
3. [CartItem](#cartitem)
4. [Checkbox](#checkbox)
5. [Chip](#chip)
6. [ColorSelector](#colorselector)
7. [Counter](#counter)
8. [Disclosure](#disclosure)
9. [FilterButton](#filterbutton)
10. [FormField](#formfield)
11. [RatingDisplay](#ratingdisplay)
12. [SearchBar](#searchbar)
13. [Switch](#switch)
14. [TextInputField](#textinputfield)

---

## Badge

A component to display notifications, counts, or status indicators.

### Import
```ts
import { Badge } from '@/components/molecules/Badge';
```

### Props

| Prop       | Type                    | Required | Default     | Description                                      |
|------------|-------------------------|----------|-------------|--------------------------------------------------|
| children   | React.ReactNode         | No       | -           | The element the badge is attached to.           |
| content    | string \| number        | No       | -           | Content inside the badge (e.g., number).        |
| variant    | 'standard' \| 'dot'     | No       | 'standard'  | Badge style.                                    |
| max        | number                  | No       | 99          | Maximum display value.                          |
| placement  | 'top-right' \| ...      | No       | 'top-right' | Placement relative to the container.            |
| className  | string                  | No       | ''          | Custom class for styling.                       |

### Usage
```jsx
import { Badge } from '@/components/molecules/Badge';
import { Icon } from '@/components/atoms/Icon';

<Badge content={5}><Icon name="bell" size={32} /></Badge>
<Badge content={150} max={99}><Icon name="mail" size={32} /></Badge>
<Badge variant="dot"><Icon name="user" size={32} /></Badge>
```

---

## Breadcrumbs

Displays the user's location within the app hierarchy.

### Import
```ts
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs';
```

### Props

| Prop               | Type                                            | Required | Default | Description                              |
|--------------------|-------------------------------------------------|----------|---------|------------------------------------------|
| crumbs             | { label: string; onPress: () => void; }[]       | Yes      | -       | Array of breadcrumb objects.             |
| containerClassName | string                                          | No       | ''      | Custom styles for the container.         |

### Usage
```jsx
const breadcrumbTrail = [
  { label: 'Home', onPress: () => console.log('Go Home') },
  { label: 'Products', onPress: () => console.log('Go to Products') },
  { label: 'T-Shirts', onPress: () => {} },
];

<Breadcrumbs crumbs={breadcrumbTrail} />
```

---

## CartItem

Displays a single cart item.

### Import
```ts
import CartItem from '@/components/molecules/CartItem';
```

### Props

| Prop | Type                                               | Required | Default | Description                    |
|------|----------------------------------------------------|----------|---------|--------------------------------|
| item | { imageUrl: string; name: string; price: string; } | Yes      | -       | Cart item data.                |

### Usage
```jsx
const product = {
  imageUrl: 'https://placehold.co/96x96',
  name: 'Minimalist Graphic Tee',
  price: '$29.99',
};

<CartItem item={product} />
```

---

## Checkbox

Standard form checkbox.

### Import
```ts
import { Checkbox } from '@/components/molecules/Checkbox';
```

### Props

| Prop           | Type                            | Required | Default | Description                            |
|----------------|---------------------------------|----------|---------|----------------------------------------|
| value          | boolean                         | Yes      | -       | Checked state.                         |
| onValueChange  | (newValue: boolean) => void     | Yes      | -       | Change handler.                        |
| label          | string                          | No       | -       | Optional label.                        |
| invalid        | boolean                         | No       | false   | Error state.                           |
| className      | string                          | No       | ''      | Custom styles.                         |

### Usage
```jsx
const [isChecked, setIsChecked] = useState(false);

<Checkbox
  label="I agree to the terms and conditions"
  value={isChecked}
  onValueChange={setIsChecked}
/>
```

---

## Chip

Compact label or filter element.

### Import
```ts
import { Chip } from '@/components/molecules/Chip';
```

### Props

| Prop        | Type                  | Required | Default | Description                           |
|-------------|-----------------------|----------|---------|---------------------------------------|
| children    | React.ReactNode       | Yes      | -       | Content inside the chip.              |
| onPress     | () => void            | Yes      | -       | Click handler.                        |
| selected    | boolean               | No       | false   | Whether selected.                     |
| size        | 'sm' \| 'base'        | No       | 'base'  | Size of the chip.                     |
| slotPrefix  | React.ReactNode       | No       | -       | Element before the text.              |
| slotSuffix  | React.ReactNode       | No       | -       | Element after the text.               |
| className   | string                | No       | ''      | Custom styles.                        |

### Usage
```jsx
<Chip onPress={() => {}}>Category A</Chip>
<Chip selected onPress={() => {}} slotSuffix={<Icon name="close" size={12} color="white" />}>
  Category B
</Chip>
```