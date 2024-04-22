/**
 * This component is used for display slider for select price range.
 */
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface RangeSliderProps {
  sliderWidth: number;
  min: number;
  max: number;
  step: number;
  onValueChange?: (...args: unknown[]) => void;
}

function RangeSlider({
  sliderWidth,
  min,
  max,
  step,
  onValueChange,
}: RangeSliderProps) {
  const THUMB_SIZE = 30;

  const position = useSharedValue(20);
  const position2 = useSharedValue(sliderWidth - 20);
  const opacity = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const zIndex2 = useSharedValue(0);

  const gestureHandler = Gesture.Pan()
    .onBegin(event => {
      event.absoluteX = position.value;
    })
    .onChange(event => {
      opacity.value = 1;
      if (event.absoluteX < 0) {
        position.value = 0;
      } else if (event.absoluteX + event.translationX > position2.value) {
        position.value = position2.value;
        zIndex.value = 1;
        zIndex2.value = 0;
      } else {
        position.value = event.absoluteX;
      }
    })
    .onEnd(() => {
      opacity.value = 0;
      position.value = withSpring(
        Math.min(Math.max(0, position.value), position2.value - THUMB_SIZE),
        { damping: 10, stiffness: 100 },
      );
      if (onValueChange) {
        runOnJS(onValueChange)({
          min:
            min +
            Math.floor(position.value / (sliderWidth / ((max - min) / step))) *
              step,
          max:
            min +
            Math.ceil(position2.value / (sliderWidth / ((max - min) / step))) *
              step,
        });
      }
    });

  const gestureHandler2 = Gesture.Pan()
    .onBegin(event => {
      event.absoluteX = position2.value;
    })
    .onChange(event => {
      opacity2.value = 1;
      if (event.absoluteX > sliderWidth) {
        position2.value = sliderWidth;
      } else if (event.absoluteX + event.translationX < position.value) {
        position2.value = position.value;
        zIndex.value = 0;
        zIndex2.value = 1;
      } else {
        position2.value = event.absoluteX;
      }
    })
    .onEnd(() => {
      opacity2.value = 0;
      position2.value = withSpring(
        Math.max(
          Math.min(sliderWidth, position2.value),
          position.value + THUMB_SIZE,
        ),
        { damping: 10, stiffness: 100 },
      );
      if (onValueChange) {
        runOnJS(onValueChange)({
          min:
            min +
            Math.floor(position.value / (sliderWidth / ((max - min) / step))) *
              step,
          max:
            min +
            Math.ceil(position2.value / (sliderWidth / ((max - min) / step))) *
              step,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    zIndex: zIndex.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: position2.value }],
    zIndex: zIndex2.value,
  }));

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    width: position2.value - position.value,
  }));

  return (
    <View style={[styles.sliderContainer, { width: sliderWidth }]}>
      <View style={[styles.sliderBack, { width: sliderWidth }]} />
      <Animated.View style={[sliderStyle, styles.sliderFront]} />
      <GestureDetector gesture={gestureHandler}>
        <Animated.View style={animatedStyle}>
          <TouchableOpacity
            hitSlop={{
              bottom: 10,
              left: 10,
              right: 10,
              top: 10,
            }}
            style={styles.thumb}
          />
        </Animated.View>
      </GestureDetector>
      <GestureDetector gesture={gestureHandler2}>
        <Animated.View style={animatedStyle2}>
          <TouchableOpacity
            hitSlop={{
              bottom: 10,
              left: 10,
              right: 10,
              top: 10,
            }}
            style={[styles.thumb, { left: -2 }]}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

export default RangeSlider;

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 30,
  },
  sliderBack: {
    height: 3,
    backgroundColor: '#555555',
    borderRadius: 4,
  },
  sliderFront: {
    height: 10,
    backgroundColor: '#FFFF00',
    borderRadius: 4,
    position: 'absolute',
  },
  thumb: {
    width: 8,
    height: 20,
    position: 'absolute',
    backgroundColor: '#FFFF00',
    borderWidth: 1,
    borderColor: '#FFFF00',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -5,
  },
});
