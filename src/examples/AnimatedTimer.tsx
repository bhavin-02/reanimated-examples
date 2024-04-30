import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface RenderItemInterface {
  item: number;
  scrollX: SharedValue<number>;
  index: number;
}

const { width, height: windowHeight } = Dimensions.get('window');

const colors = {
  black: '#323F4E',
  red: '#F76A6A',
  text: '#ffffff',
};

const TIMER_DATA = [...Array(13).keys()].map(i => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

const RenderItem = ({ item, scrollX, index }: RenderItemInterface) => {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [(index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE],
      [0.5, 1, 0.5],
      'clamp',
    );
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE],
      [0.8, 1, 0.8],
      'clamp',
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={[styles.timerTextContainer, animatedStyle]}>
      <Text style={styles.timerText}>{item}</Text>
    </Animated.View>
  );
};

export default function AnimatedTimer() {
  const scrollX = useSharedValue(0);
  const buttonAnimation = useSharedValue(0);
  const [height, setHeight] = useState(windowHeight);
  const backgroundAnimation = useSharedValue(-width);
  const [time, setTime] = useState<number>(0);
  const ref = useRef<View>(null);

  const [index, setIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time >= 0) {
        setTime(time - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (ref.current) {
      ref.current.measure((_x, _y, _width, height) => {
        setHeight(height);
      });
    }
  }, [ref]);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const onPressRedButton = () => {
    setDisabled(true);
    setTime(TIMER_DATA[index]);
    buttonAnimation.value = withTiming(-ITEM_SIZE, { duration: 300 }, () => {
      backgroundAnimation.value = withSequence(
        withTiming(height, { duration: 500 }),
        withTiming(0, { duration: TIMER_DATA[index] * 1000 }, () => {
          buttonAnimation.value = withTiming(0, { duration: 300 }, () => {
            runOnJS(setDisabled)(false);
          });
        }),
      );
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      buttonAnimation.value,
      [0, ITEM_SIZE],
      [0, -(60 + ITEM_SIZE)],
    );

    return {
      transform: [{ translateY }],
    };
  });

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      backgroundAnimation.value,
      [0, height],
      [height, 0],
    );

    return {
      transform: [{ translateY }],
    };
  });

  const animatedTimerContainerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(buttonAnimation.value, [0, -ITEM_SIZE], [0, 1]);

    return {
      opacity,
    };
  });

  const animatedFlatListStyle = useAnimatedStyle(() => {
    const opacity = interpolate(buttonAnimation.value, [0, -ITEM_SIZE], [1, 0]);

    return {
      opacity,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        ref={ref}
        style={[styles.redBackground, backgroundAnimatedStyle]}
      />
      <Animated.View
        style={[styles.timerCountContainer, animatedTimerContainerStyle]}>
        <Text style={styles.timerText}>{time}</Text>
      </Animated.View>
      <Animated.FlatList
        data={TIMER_DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.toString()}
        bounces={false}
        scrollEnabled={!disabled}
        onScroll={handleScroll}
        onMomentumScrollEnd={event => {
          const currentIndex = Math.round(
            event.nativeEvent.contentOffset.x / ITEM_SIZE,
          );
          setIndex(currentIndex);
        }}
        contentOffset={{ x: ITEM_SIZE * index, y: 0 }}
        contentContainerStyle={styles.timerListContainer}
        snapToInterval={ITEM_SIZE}
        style={[styles.timerList, animatedFlatListStyle]}
        decelerationRate={'fast'}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} scrollX={scrollX} />
        )}
      />
      <Animated.View style={[styles.redButtonContainer, animatedStyle]}>
        <Pressable style={styles.redButton} onPress={onPressRedButton} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  redBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.red,
  },
  timerListContainer: {
    paddingTop: windowHeight / 4,
    paddingHorizontal: ITEM_SPACING,
  },
  timerList: {
    flexGrow: 0,
  },
  timerTextContainer: {
    width: ITEM_SIZE,
  },
  timerCountContainer: {
    position: 'absolute',
    top: windowHeight / 4,
    width: ITEM_SIZE,
    alignSelf: 'center',
  },
  timerText: {
    color: colors.text,
    fontSize: ITEM_SIZE * 0.6,
    fontWeight: '900',
    textAlign: 'center',
    transform: [{ perspective: ITEM_SIZE }],
  },
  redButtonContainer: {
    position: 'absolute',
    width,
    bottom: 60,
    alignItems: 'center',
  },
  redButton: {
    backgroundColor: colors.red,
    height: 70,
    width: 70,
    borderRadius: 70,
  },
});
