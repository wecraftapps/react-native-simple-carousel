import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';

interface Props {
  children: JSX.Element | JSX.Element[];
  setIndex?: (number) => void;
}

const { width, height } = Dimensions.get('window');

const SimpleCarousel = ({ children, setIndex }: Props, ref): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<any>();

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
  };

  // Renders internal pages from prop "children"
  const pages = Object.keys(children).map((p: string) => {
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
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}>
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

export default forwardRef(SimpleCarousel);
