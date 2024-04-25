import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type TimeType = 'hours' | 'meridiem' | 'minutes';

interface RenderItemInterface {
  item: (typeof data)[TimeType][0];
  itemKey: TimeType;
  scrollY: SharedValue<number>;
  index: number;
  onItemPress: (key: TimeType, index: number) => void;
}

const VISIBLE_ITEMS = 3;
const FONT_SIZE = 30;
const ITEM_HEIGHT = FONT_SIZE * 1.3;

const twelveHours = Array.from({ length: 12 }, (_, i) =>
  i < 9 ? `0${i + 1}` : `${i + 1}`,
);
const sixtyMinutes = Array.from({ length: 60 }, (_, i) =>
  i < 10 ? `0${i}` : `${i}`,
);

const data = {
  meridiem: ['AM', 'PM'],
  hours: twelveHours,
  minutes: sixtyMinutes,
};

const RenderItem = ({
  item,
  itemKey,
  scrollY,
  index,
  onItemPress,
}: RenderItemInterface) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      ITEM_HEIGHT * (index - 1),
      ITEM_HEIGHT * index,
      ITEM_HEIGHT * (index + 1),
    ];
    const outputRange = [0.2, 1, 0.2];

    const opacity = interpolate(
      scrollY.value,
      inputRange,
      outputRange,
      'clamp',
    );
    const scale = interpolate(
      scrollY.value,
      inputRange,
      [0.8, 1, 0.8],
      'clamp',
    );

    if (scrollY.value === 1) {
      onItemPress(itemKey, index);
    }

    return {
      opacity,
      transform: [{ scale }],
    };
  }, [index, scrollY]);

  return (
    <Animated.View style={[styles.textContainer, animatedStyle]}>
      <Pressable onPress={() => onItemPress(itemKey, index * ITEM_HEIGHT)}>
        <Text style={styles.text}>{item}</Text>
      </Pressable>
    </Animated.View>
  );
};

const EmptyComponent = () => {
  return <View style={{ height: ITEM_HEIGHT }} />;
};

const TimeSeparator = () => {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 500 }), -1, true);
  }, [opacity]);

  return <Animated.Text style={[styles.text, animatedStyle]}>:</Animated.Text>;
};

export default function TimePicker() {
  const animatedMeridiem = useSharedValue(0);
  const animatedHours = useSharedValue(0);
  const animatedMinutes = useSharedValue(0);

  const meridiemRef = useRef<Animated.FlatList<typeof data.meridiem>>(null);
  const hoursRef = useRef<Animated.FlatList<typeof data.hours>>(null);
  const minutesRef = useRef<Animated.FlatList<typeof data.minutes>>(null);

  const [time, setTime] = useState({
    meridiem: data.meridiem[0],
    hours: data.hours[0],
    minutes: data.minutes[0],
  });

  const onChangeTime = (key: TimeType, offset: number) => {
    const ref =
      key === 'meridiem'
        ? meridiemRef
        : key === 'hours'
        ? hoursRef
        : minutesRef;
    ref.current?.scrollToOffset({ offset });

    const index = offset / ITEM_HEIGHT;
    setTime(prev => ({ ...prev, [key]: data[key][index] }));
  };

  const handleScrollMeridiem = useAnimatedScrollHandler({
    onScroll: event => {
      animatedMeridiem.value = event.contentOffset.y;
    },
  });
  const handleScrollHours = useAnimatedScrollHandler({
    onScroll: event => {
      animatedHours.value = event.contentOffset.y;
    },
  });
  const handleScrollMinutes = useAnimatedScrollHandler({
    onScroll: event => {
      animatedMinutes.value = event.contentOffset.y;
    },
  });

  useEffect(() => {
    const meridiemIndex = data.meridiem.findIndex(
      item => item === time.meridiem,
    );
    meridiemRef.current?.scrollToOffset({
      offset: ITEM_HEIGHT * meridiemIndex,
    });

    const hoursIndex = data.hours.findIndex(item => item === time.hours);
    hoursRef.current?.scrollToOffset({ offset: ITEM_HEIGHT * hoursIndex });

    const minutesIndex = data.minutes.findIndex(item => item === time.minutes);
    minutesRef.current?.scrollToOffset({
      offset: ITEM_HEIGHT * minutesIndex,
    });
  }, [time]);

  return (
    <View style={styles.container}>
      <View style={styles.listsContainer}>
        <Animated.FlatList
          ref={meridiemRef}
          data={data.meridiem}
          renderItem={({ item, index }) => (
            <RenderItem
              itemKey={'meridiem'}
              item={item}
              index={index}
              scrollY={animatedMeridiem}
              onItemPress={onChangeTime}
            />
          )}
          pagingEnabled
          decelerationRate={'fast'}
          maxToRenderPerBatch={data.meridiem.length}
          snapToAlignment={'center'}
          onScroll={handleScrollMeridiem}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={EmptyComponent}
          ListFooterComponent={EmptyComponent}
        />
        <TimeSeparator />
        <Animated.FlatList
          ref={hoursRef}
          data={data.hours}
          renderItem={({ item, index }) => (
            <RenderItem
              itemKey={'hours'}
              item={item}
              index={index}
              scrollY={animatedHours}
              onItemPress={onChangeTime}
            />
          )}
          pagingEnabled
          decelerationRate={'fast'}
          maxToRenderPerBatch={data.hours.length}
          snapToAlignment={'center'}
          onScroll={handleScrollHours}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={EmptyComponent}
          ListFooterComponent={EmptyComponent}
        />
        <TimeSeparator />
        <Animated.FlatList
          ref={minutesRef}
          data={data.minutes}
          renderItem={({ item, index }) => (
            <RenderItem
              itemKey={'minutes'}
              item={item}
              index={index}
              scrollY={animatedMinutes}
              onItemPress={onChangeTime}
            />
          )}
          pagingEnabled
          decelerationRate={'fast'}
          maxToRenderPerBatch={data.minutes.length}
          snapToAlignment={'center'}
          onScroll={handleScrollMinutes}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={EmptyComponent}
          ListFooterComponent={EmptyComponent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listsContainer: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  textContainer: {
    height: ITEM_HEIGHT,
  },
  text: {
    fontWeight: '700',
    fontSize: FONT_SIZE,
    textAlign: 'center',
    color: '#000',
  },
});
