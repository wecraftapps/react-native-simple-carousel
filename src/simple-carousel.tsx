import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native';

interface Props {
  children: JSX.Element | JSX.Element[];
  setIndex?: (number) => void;
  cardLayout?: boolean;
}

const { width, height } = Dimensions.get('window');
const OFFSET = 40;
const ITEM_WIDTH = width - OFFSET * 2;

const Carousel = ({ children, setIndex, cardLayout }: Props, ref): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<any>();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  // Functions to expose to parent
  useImperativeHandle(ref, () => ({
    previousPage,
    nextPage,
  }));

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

    const newPage = Math.round(parseFloat(offsetX) / width);

    // Updating currentPage when it changes
    if (newPage !== currentPage) {
      setCurrentPage(Math.round(parseFloat(offsetX) / width));
    }

    if (cardLayout) {
      Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: false,
      });
    }
  };

  // Renders internal pages from prop "children"
  const pages = Object.keys(children).map((p: string, idx: number) => {
    if (cardLayout) {
      const inputRange = [
        (idx - 1) * ITEM_WIDTH,
        idx * ITEM_WIDTH,
        (idx + 1) * ITEM_WIDTH,
      ];

      const translate = scrollX.interpolate({
        inputRange,
        outputRange: [0.85, 1, 0.85],
      });

      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.5, 1, 0.5],
      });

      return (
        <Animated.View
          style={{
            width: ITEM_WIDTH,
            marginLeft: idx === 0 ? OFFSET : 0,
            marginRight: idx === Object.keys(children).length - 1 ? OFFSET : 0,
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
          height,
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
        snapToInterval={cardLayout ? ITEM_WIDTH : width}
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
        scrollEventThrottle={12}>
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
