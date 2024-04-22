import React, { useRef, useState } from 'react';

import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function NewestShadowNodesRegistryRemoveExample() {
  const [show, setShow] = useState(true);

  const ref = useRef(0);

  const sv = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const size = 50 + sv.value * 100;
    return { width: size, height: size };
  });

  const handleAnimate = (e: GestureResponderEvent) => {
    e?.stopPropagation();
    ref.current = 1 - ref.current;
    sv.value = withTiming(ref.current, { duration: 1500 });
  };

  const handleToggle = (e: GestureResponderEvent) => {
    e?.stopPropagation();
    setShow(s => !s);
  };

  return (
    <View
      style={styles.container}
      onTouchStart={handleToggle}
      collapsable={false}>
      <Animated.View
        style={[styles.left, animatedStyle]}
        onTouchStart={handleAnimate}
      />
      {show && (
        <View collapsable={false}>
          <View collapsable={false}>
            <Animated.View style={[styles.right, animatedStyle]} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    backgroundColor: 'red',
  },
  right: {
    backgroundColor: 'blue',
  },
});
