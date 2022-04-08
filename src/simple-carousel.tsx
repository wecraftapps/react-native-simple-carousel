import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native';
import CardLayoutOptions from './types/card-layout-options.type';
import { CAROUSEL_LAYOUTS } from './enums/carousel-layouts.enum';

interface Props {
  children: JSX.Element | JSX.Element[];
  setIndex?: (number) => void;
  layout?: CAROUSEL_LAYOUTS;
  cardLayoutOptions: CardLayoutOptions;
  scrollEnabled?: boolean;
  initialSlide?: number;
}

const { width } = Dimensions.get('window');

const Carousel = ({ children, setIndex, layout, cardLayoutOptions, scrollEnabled, initialSlide }: Props, ref): JSX.Element => {
  const OFFSET = cardLayoutOptions?.offset || 40;
  const ITEM_WIDTH = width - OFFSET * 2;

  const [currentPage, setCurrentPage] = useState(initialSlide || 0);
  const scrollViewRef = useRef<any>();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  // Functions to expose to parent
  useImperativeHandle(ref, () => ({
    previousPage,
    nextPage,
  }));

  // Effect to scroll to the intial slide without animation
  useEffect(() => {
    if (initialSlide) {
      // Added timeout as iOS didn't scroll to initial slide
      setTimeout(() => {
        scrollViewRef.current.scrollTo({
          x: initialSlide * width,
          y: 0,
          animated: false,
        });
      }, 50);
    }
  }, [initialSlide]);

  // Effect to update current index to parent
  useEffect(() => {
    if (setIndex) setIndex(currentPage);
  }, [currentPage]);

  const previousPage = (): void => {
    if (currentPage <= 0) return;

    const newPageIndex = currentPage - 1;

    scrollViewRef.current.scrollTo({
      x: newPageIndex * width,
      y: 0,
      animated: true,
    });
  };

  const nextPage = (): void => {
    if (currentPage >= Object.keys(children).length - 1) return;

    const newPageIndex = currentPage + 1;

    scrollViewRef.current.scrollTo({
      x: newPageIndex * width,
      y: 0,
      animated: true,
    });
  };

  const onScroll = (data: any): void => {
    const { x: offsetX } = data.nativeEvent.contentOffset;

    const newPage = Math.round(parseFloat(offsetX) / ( layout === 'CARD' ? ITEM_WIDTH : width));

    // Updating currentPage when it changes
    if (newPage !== currentPage) {
      setCurrentPage(Math.round(parseFloat(offsetX) / ( layout === 'CARD' ? ITEM_WIDTH : width)));
    }

    if (layout === 'CARD') {
      Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: false,
      });
    }
  };

  // Renders internal pages from prop "children"
  const pages = Object.keys(children).map((p: string, index: number) => {
    if (layout === 'CARD') {
      const inputRange = [
        (index - 1) * ITEM_WIDTH,
        index * ITEM_WIDTH,
        (index + 1) * ITEM_WIDTH,
      ];

      // Calculate the size of adjacent cards
      const translate = scrollX.interpolate({
        inputRange,
        outputRange: [cardLayoutOptions?.adjacentCardsScale || 0.85, 1, cardLayoutOptions?.adjacentCardsScale || 0.85],
      });

      // Calculates the opacity of adjacent cards
      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [cardLayoutOptions?.adjacentCardsOpacity || 0.5, 1, cardLayoutOptions?.adjacentCardsOpacity || 0.5],
      });

      return (
        <Animated.View
          style={{
            width: ITEM_WIDTH,
            marginLeft: index === 0 ? OFFSET : 0,
            marginRight: index === Object.keys(children).length - 1 ? OFFSET : 0,
            opacity: opacity,
            transform: [{ scale: translate }],
          }}
          key={p}>
          {children[p]}
        </Animated.View>
      );
    }

    return (
      <View
        style={{
          width,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        key={p}>
        {children[p]}
      </View>
    );
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        bounces={false}
        snapToInterval={layout === 'CARD' ? ITEM_WIDTH : width}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            listener: event => {
              onScroll(event);
            },
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={12}
        scrollEnabled={typeof scrollEnabled === 'boolean' ? scrollEnabled : true}>
        {pages}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default forwardRef(Carousel);
