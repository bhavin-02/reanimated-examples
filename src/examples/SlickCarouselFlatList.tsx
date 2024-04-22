import React from 'react';

import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

interface RenderItemInterface {
  item: (typeof DATA)[0];
}

interface IndicatorInterface {
  scrollX: SharedValue<number>;
}

interface BackDropInterface {
  scrollX: SharedValue<number>;
}

interface SquareInterface {
  scrollX: SharedValue<number>;
}

const { width, height } = Dimensions.get('screen');

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    key: '3571572',
    title: 'Multi-lateral intermediate moratorium',
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: 'https://cdn-icons-png.flaticon.com/512/7139/7139391.png',
  },
  {
    key: '3571747',
    title: 'Automated radical data-warehouse',
    description:
      'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image: 'https://cdn-icons-png.flaticon.com/512/6596/6596467.png',
  },
  {
    key: '3571680',
    title: 'Inverse attitude-oriented system engine',
    description:
      'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image: 'https://cdn-icons-png.flaticon.com/512/4464/4464318.png',
  },
  {
    key: '3571603',
    title: 'Monitored global data-warehouse',
    description: 'We need to program the open-source IB interface!',
    image: 'https://cdn-icons-png.flaticon.com/512/12781/12781273.png',
  },
];

const Indicator = ({ scrollX }: IndicatorInterface) => {
  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderIndicator = ({ index }: { index: number }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ];

      const scale = interpolate(
        scrollX.value,
        inputRange,
        [0.8, 1.4, 0.8],
        'clamp',
      );
      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0.6, 0.9, 0.6],
        'clamp',
      );

      return {
        opacity,
        transform: [{ scale }],
      };
    }, []);

    return (
      <Animated.View
        key={`indicator-${index}`}
        style={[styles.indicator, animatedStyle]}
      />
    );
  };

  return (
    <View style={styles.indicatorContainer}>
      {DATA.map((_, i) => (
        <RenderIndicator index={i} key={_.key} />
      ))}
    </View>
  );
};

const BackDrop = ({ scrollX }: BackDropInterface) => {
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollX.value,
      bgs.map((_, i) => i * width),
      bgs,
    );

    return {
      backgroundColor,
    };
  }, []);

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, animatedStyle]} />
  );
};

const Square = ({ scrollX }: SquareInterface) => {
  const YOLO = useDerivedValue(() => ((scrollX.value / width) % width) % 1);

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(YOLO.value, [0, 0.5, 1], [35, -35, 35]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  }, []);

  return <Animated.View style={[styles.square, animatedStyle]} />;
};

const RenderItem = ({ item }: RenderItemInterface) => {
  return (
    <View style={styles.renderItemContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
    </View>
  );
};

export default function SlickCarouselFlatList() {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <BackDrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        onScroll={scrollHandler}
        bounces={false}
        contentContainerStyle={styles.listStyle}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <RenderItem item={item} />}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  listStyle: {
    paddingBottom: 100,
  },
  image: {
    width: width / 2,
    height: width / 2,
    resizeMode: 'cover',
  },
  renderItemContainer: {
    width: width,
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 0.3,
  },
  titleText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
  },
  descriptionText: {
    color: '#fff',
    fontWeight: '300',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 10,
  },
  square: {
    position: 'absolute',
    height: height,
    width: height,
    backgroundColor: '#fff',
    borderRadius: 86,
    top: -height * 0.7,
    left: -height * 0.35,
  },
});
