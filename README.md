# react-native-simple-carousel

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
| `ref` | function | true | function to be called to update the current page index |
| `setIndex` | function | true | function to be called to update the current page index |

## Methods

Following methods area available using a ref

| Name | Arguments | Description |
| --- | --- | --- |
| `previousPage` |  | function to navigate to the previous slide if possible |
| `nextPage` |  | function to navigate to the next slide if possible |
