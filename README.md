# react-native-simple-carousel

Package to render a simple carousel with React Native. Works on Android and iOS.

## Showcase

### Basic usage for fullscreen slides

![react-native-simple-carousel](https://media.giphy.com/media/MsLMrLYq6vA0F1HgN8/giphy.gif)

[example component for basic usage](https://github.com/wecraftapps/react-native-simple-carousel/blob/master/examples/basic-usage.tsx)

### Basic usage for card layout

![react-native-simple-carousel](https://media.giphy.com/media/WFtP6wdT7bsJrYNgxj/giphy.gif)

[example component for basic usage card layout](https://github.com/wecraftapps/react-native-simple-carousel/blob/master/examples/basic-usage-card-layout.tsx)

## Installation

```
npm i --save @wecraftapps/react-native-simple-carousel
```

## Basic usage

```javascript
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

| Prop | Type | Optionnal | Description | Default |
| --- | --- | --- | --- | --- |
| `setIndex` | function | true | function to be called to update the current page index | `null` |
| `layout` | `'FULLSCREEN' | 'CARD'` | true | string that indicates the type of layout the carousel will have | `FULLSCREEN` |
| `cardLayoutOptions` | `CardLayoutOptions` | true | object describing the carousel layout using `layout = 'CARD'` (see the `Types` section for details) | `null` |
| `scrollEnabled` | boolean | true | boolean that indicates if the carousel can be scrolled | `true` |
| `initialSlide` | number | true | initial slide index | `0` |

## Methods

Following methods are available using a ref

| Name | Arguments | Description |
| --- | --- | --- |
| `previousPage` |  | function to navigate to the previous slide if possible |
| `nextPage` |  | function to navigate to the next slide if possible |

## Types

```
enum CAROUSEL_LAYOUTS {
  FULLSCREEN = 'FULLSCREEN',
  CARD = 'CARD',
}
```

```
interface CardLayoutOptions {
  offset: number, // horizontal space to see the adjacent cards. Default is 40,
  adjacentCardsScale: number, // scale of the adjacent cards. Default is 0.85,
  adjacentCardsOpacity: number, // default is 0.5,
}
```


## Special thanks

Special thanks to @chanonroy for tutorial : https://chanonroy.medium.com/building-a-netflix-style-card-carousel-in-react-native-649afcd8d78e
