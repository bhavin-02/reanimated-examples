import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DialPadInterface {
  onPress: (item: (typeof dialPad)[number]) => void;
}

interface RenderItemInterface {
  item: number | string;
  onPress: (item: (typeof dialPad)[number]) => void;
}

interface RenderPinInterface {
  index: number;
  code: number[];
}

const { width } = Dimensions.get('window');
const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'];
const PIN_LENGTH = 4;
const PIN_CONTAINER_SIZE = width / 2;
const PIN_MAX_SIZE = PIN_CONTAINER_SIZE / PIN_LENGTH;
const PIN_SPACING = 10;
const PIN_SIZE = PIN_MAX_SIZE - PIN_SPACING * 2;
const SIZE = width * 0.2;
const DIAL_PAD_TEXT_SIZE = SIZE * 0.4;
const SPACING = 20;

const RenderItem = ({ item, onPress }: RenderItemInterface) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View
        style={[
          styles.dialPadButtons,
          { borderWidth: typeof item !== 'number' ? 0 : 1 },
        ]}>
        {item === 'del' ? (
          <Ionicons
            name="backspace-outline"
            color={'#000'}
            size={DIAL_PAD_TEXT_SIZE}
          />
        ) : (
          <Text style={styles.dialPadButtonText}>{item}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const DialPad = ({ onPress }: DialPadInterface) => {
  return (
    <FlatList
      data={dialPad}
      renderItem={({ item }) => <RenderItem item={item} onPress={onPress} />}
      style={styles.dialPad}
      scrollEnabled={false}
      columnWrapperStyle={{ gap: SPACING }}
      contentContainerStyle={{ gap: SPACING }}
      keyExtractor={(_, index) => index.toString()}
      numColumns={3}
    />
  );
};

const RenderPin = ({ code, index }: RenderPinInterface) => {
  const animatedCodeValue = useSharedValue(0);

  const isSelected = !!code[index];

  useEffect(() => {
    if (isSelected) {
      animatedCodeValue.value = withTiming(PIN_SIZE, { duration: 200 });
    } else {
      animatedCodeValue.value = withTiming(0, { duration: 200 });
    }
  }, [animatedCodeValue, code, isSelected]);

  const animatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      animatedCodeValue.value,
      [0, PIN_SIZE],
      [2, PIN_SIZE],
    );
    const marginBottom = interpolate(
      animatedCodeValue.value,
      [0, PIN_SIZE],
      [0, PIN_SIZE / 2],
    );

    return {
      height,
      marginBottom,
    };
  });

  return <Animated.View style={[styles.pin, animatedStyle]} />;
};

export default function AnimatedDialPad() {
  const [code, setCode] = useState<number[]>([]);

  const onPressNumber = (number: number | string) => {
    if (number === 'del') {
      setCode(prevCode => prevCode.slice(0, -1));
    } else if (typeof number === 'number') {
      if (code.length === PIN_LENGTH) {
        return;
      }
      setCode(prevCode => [...prevCode, number]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pinContainer}>
        {[...Array(PIN_LENGTH).keys()].map(i => (
          <RenderPin key={`pin-${i}`} index={i} code={code} />
        ))}
      </View>
      <DialPad onPress={onPressNumber} />
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
  pinContainer: {
    flexDirection: 'row',
    gap: PIN_SPACING * 2,
    marginBottom: SPACING * 2,
    height: PIN_SIZE * 2,
    alignItems: 'flex-end',
  },
  pin: {
    width: PIN_SIZE,
    borderRadius: PIN_SIZE,
    backgroundColor: '#000',
    borderColor: '#000',
  },
  dialPad: {
    flexGrow: 0,
  },
  dialPadButtons: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialPadButtonText: {
    fontSize: DIAL_PAD_TEXT_SIZE,
    color: '#000',
  },
});
