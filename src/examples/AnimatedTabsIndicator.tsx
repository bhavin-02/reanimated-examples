import React, {
  LegacyRef,
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Dimensions,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface TabInterface {
  item: (typeof data)[0];
  onItemPress: (itemIndex: number | GestureResponderEvent) => void;
}

type MeasuresTypes = {
  x: number;
  y: number;
  width: number;
  height: number;
};

interface IndicatorInterface {
  measures: MeasuresTypes[];
  scrollX: SharedValue<number>;
}

interface TabsInterface {
  scrollX: SharedValue<number>;
  data: typeof data;
  onItemPress: (itemIndex: number) => void;
}

interface RenderItemInterface {
  item: (typeof data)[0];
}

const { width, height } = Dimensions.get('screen');

const images = {
  man: 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids: 'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help: 'https://images.pexels.com/photos/3552130/pexels-photo-3552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};

const data = Object.keys(images).map(i => ({
  key: i,
  title: i,
  image: images[i as keyof typeof images],
  ref: createRef<View>(),
}));

const Tab = forwardRef(
  ({ item, onItemPress }: TabInterface, ref: LegacyRef<View>) => {
    return (
      <TouchableOpacity onPress={onItemPress}>
        <View ref={ref}>
          <Text style={styles.tabTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  },
);

const Indicator = ({ measures, scrollX }: IndicatorInterface) => {
  const inputRange = data.map((_, i) => i * width);

  const animatedStyle = useAnimatedStyle(() => {
    const indicatorWidth = interpolate(
      scrollX.value,
      inputRange,
      measures.map(measure => measure.width),
    );
    const translateX = interpolate(
      scrollX.value,
      inputRange,
      measures.map(measure => measure.x),
    );
    return {
      width: indicatorWidth,
      transform: [{ translateX }],
    };
  }, []);

  return <Animated.View style={[styles.indicator, animatedStyle]} />;
};

const Tabs = ({ scrollX, data, onItemPress }: TabsInterface) => {
  const containerRef = useRef<View>(null);
  const [measures, setMeasures] = useState<MeasuresTypes[]>([]);

  useEffect(() => {
    let m = [];
    data.forEach(i => {
      if (containerRef.current) {
        i.ref.current?.measureLayout(
          containerRef.current,
          (x, y, width, height) => {
            m.push({ x, y, width, height });

            if (m.length === data.length) {
              setMeasures(m);
            }
          },
        );
      }
    });
  }, [data]);

  return (
    <View ref={containerRef} style={styles.tabsView}>
      <View style={styles.tabContainer}>
        {data.map((item, index) => {
          return (
            <Tab
              key={item.key}
              item={item}
              ref={item.ref}
              onItemPress={() => onItemPress(index)}
            />
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

const RenderItem = ({ item }: RenderItemInterface) => {
  return (
    <View style={{ width, height }}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={[StyleSheet.absoluteFillObject, styles.overlay]} />
    </View>
  );
};

export default function AnimatedTabsIndicator() {
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<typeof data>>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const onItemPress = useCallback(
    (itemIndex: number) => {
      ref.current?.scrollToOffset({
        offset: itemIndex * width,
      });
    },
    [ref],
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={ref}
        data={data}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        onScroll={scrollHandler}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <RenderItem item={item} />}
      />

      <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  tabsView: {
    position: 'absolute',
    top: 100,
    width,
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    zIndex: 999,
  },
  tabTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  indicator: {
    height: 4,
    bottom: -10,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
