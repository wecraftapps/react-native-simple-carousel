import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { SimpleCarousel, CAROUSEL_LAYOUTS } from '@wecraftapps/react-native-simple-carousel';

const BasicUsageCardLayout = (): JSX.Element => {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);

  return (
    <View style={styles.container}>
      <SimpleCarousel
        ref={carouselRef}
        setIndex={setIndex} 
        layout={CAROUSEL_LAYOUTS.CARD}
        cardLayoutOptions={{
          offset: 40,
          adjacentCardsScale: 0.85,
          adjacentCardsOpacity: 0.5,
        }}>
        <View style={[styles.page, { backgroundColor: 'yellow' }]}>
          <Text>PAGE 0</Text>
        </View>

        <View style={[styles.page, { backgroundColor: 'red' }]}>
          <Text>PAGE 1</Text>
        </View>

        <View style={[styles.page, { backgroundColor: 'green' }]}>
          <Text>PAGE 2</Text>
        </View>

        <View style={[styles.page, { backgroundColor: 'gold' }]}>
          <Text>PAGE 3</Text>
        </View>

        <View style={[styles.page, { backgroundColor: 'purple' }]}>
          <Text>PAGE 4</Text>
        </View>
      </SimpleCarousel>

      <View style={styles.paginationContainer}>
        <View
          style={{
            backgroundColor: index === 0 ? 'blue' : 'white',
            height: 20,
            width: 20,
          }}
        />
        <View
          style={{
            backgroundColor: index === 1 ? 'purple' : 'white',
            height: 20,
            width: 20,
          }}
        />
        <View
          style={{
            backgroundColor: index === 2 ? 'grey' : 'white',
            height: 20,
            width: 20,
          }}
        />
        <View
          style={{
            backgroundColor: index === 3 ? 'orange' : 'white',
            height: 20,
            width: 20,
          }}
        />
        <View
          style={{
            backgroundColor: index === 4 ? 'red' : 'white',
            height: 20,
            width: 20,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  page: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    flex: 1,
    width: '60%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom: 40,
  },
});

export default BasicUsageCardLayout;
