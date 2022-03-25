# react-native-simple-carousel

Package to render a simple carousel with React Native. Works on Android and iOS.

## Showcase

### Basic usage for fullscreen slides

![react-native-simple-carousel](https://media.giphy.com/media/MsLMrLYq6vA0F1HgN8/giphy.gif)

[example component for basic usage](https://github.com/wecraftapps/react-native-simple-carousel/blob/master/examples/basic-usage.tsx)

### Basic usage for card layout
Thanks to @chanonroy for tutorial : https://chanonroy.medium.com/building-a-netflix-style-card-carousel-in-react-native-649afcd8d78e

![react-native-simple-carousel](https://media.giphy.com/media/WFtP6wdT7bsJrYNgxj/giphy.gif)

[example component for basic usage card layout](https://github.com/wecraftapps/react-native-simple-carousel/blob/master/examples/basic-usage-card-layout.tsx)

## Installation

```
npm i --save @wecraftapps/react-native-simple-carousel
```

## Basic usage

```
import { SimpleCarousel } from '@wecraftapps/react-native-simple-carousel';

...

const carouselRef = useRef(null);

...

return (
  <SimpleCarousel ref={carouselRef}>
    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow'}}>
      <Text>PAGE 0</Text>
    </View>

    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green'}}>
      <Text>PAGE 1</Text>
    </View>
  </SimpleCarousel>
);
```

## Props

| Prop | Type | Optionnal | Description |
| --- | --- | --- | --- |
| `setIndex` | function | true | function to be called to update the current page index |
| `cardLayout` | boolean | true | boolean that indicates if the layout of elements must be cards |
| `offset` | number | true | margin of elements if `cardLayout` is set to `true`. Default is 40 |

## Methods

Following methods are available using a ref

| Name | Arguments | Description |
| --- | --- | --- |
| `previousPage` |  | function to navigate to the previous slide if possible |
| `nextPage` |  | function to navigate to the next slide if possible |

## Examples
