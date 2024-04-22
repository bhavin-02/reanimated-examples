import React from 'react';

import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const images = [
  'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
  'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
  'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
  'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
  'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
  'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80',
  'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80',
  'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
  'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80',
  'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
];
const data = images.map((image, index) => ({
  key: String(index),
  photo: image,
  avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
    Math.random() * 40,
  )}.jpg`,
}));

interface RenderItemInterface {
  item: (typeof data)[0];
  index: number;
  scrollX: SharedValue<number>;
}

const RenderItem = ({ item, index, scrollX }: RenderItemInterface) => {
  const translateX = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    return {
      transform: [
        {
          translateX: interpolate(scrollX.value, inputRange, [
            -width * 0.7,
            0,
            width * 0.7,
          ]),
        },
      ],
    };
  }, []);

  return (
    <View style={[styles.renderItemContainer, { width }]}>
      <View style={styles.borderTypeView}>
        <View
          style={[
            styles.mainImageView,
            { width: ITEM_WIDTH, height: ITEM_HEIGHT },
          ]}>
          <Animated.Image
            source={{ uri: item.photo }}
            resizeMode={'cover'}
            style={[
              { width: ITEM_WIDTH * 1.4, height: ITEM_HEIGHT },
              translateX,
            ]}
          />
        </View>
        <Image
          source={{ uri: item.avatar_url }}
          style={styles.userProfilePhoto}
        />
      </View>
    </View>
  );
};

export default function ParallaxCarousel(): React.JSX.Element {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={scrollHandler}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} scrollX={scrollX} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  renderItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderTypeView: {
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
    padding: 12,
    backgroundColor: 'white',
  },
  mainImageView: {
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 18,
  },
  userProfilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    bottom: -25,
  },
});
