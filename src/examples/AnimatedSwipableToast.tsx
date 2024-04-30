import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ToastType = 'success' | 'error' | 'warning';

interface ShowFunctionInterface {
  type: ToastType;
  text: string;
  duration?: number;
}

const Toast = forwardRef((_, ref) => {
  const toastTopAnimation = useSharedValue(-100);

  const [showToast, setShowToast] = useState(true);
  const [toastType, setToastType] = useState<ToastType>('success');
  const [toastMessage, setToastMessage] = useState('Success Toast!');
  const [toastDuration, setToastDuration] = useState(2000);

  const show = useCallback(
    ({ type, text, duration = 2000 }: ShowFunctionInterface) => {
      setShowToast(true);
      setToastType(type);
      setToastMessage(text);
      setToastDuration(duration);
      toastTopAnimation.value = withSequence(
        withTiming(20),
        withDelay(
          duration,
          withTiming(-100, {}, finished => {
            if (finished) {
              runOnJS(setShowToast)(false);
            }
          }),
        ),
      );
    },
    [toastTopAnimation],
  );

  useImperativeHandle(ref, () => ({ show }), [show]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: toastTopAnimation.value,
    };
  });

  const gestureHandler = Gesture.Pan()
    .onStart(e => {
      e.y = toastTopAnimation.value;
    })
    .onUpdate(e => {
      if (e.translationY < 100) {
        toastTopAnimation.value = withSpring(e.y + e.translationY, {
          damping: 600,
          stiffness: 100,
        });
      }
    })
    .onEnd(e => {
      if (e.translationY < 0) {
        toastTopAnimation.value = withTiming(-100, {}, finished => {
          if (finished) {
            runOnJS(setShowToast)(false);
          }
        });
      } else if (e.translationY > 0) {
        toastTopAnimation.value = withSequence(
          withTiming(20),
          withDelay(
            toastDuration,
            withTiming(-100, {}, finished => {
              if (finished) {
                runOnJS(setShowToast)(false);
              }
            }),
          ),
        );
      }
    });

  return (
    <>
      {showToast && (
        <GestureDetector gesture={gestureHandler}>
          <Animated.View
            style={[
              styles.toastContainer,
              toastType === 'success'
                ? styles.successToastContainer
                : toastType === 'warning'
                ? styles.warningToastContainer
                : styles.errorToastContainer,
              animatedStyle,
            ]}>
            <Ionicons
              name={
                toastType === 'success'
                  ? 'checkmark-circle'
                  : toastType === 'warning'
                  ? 'warning'
                  : 'close-circle'
              }
              color={
                toastType === 'success'
                  ? '#1F8722'
                  : toastType === 'warning'
                  ? '#F08135'
                  : '#D9100A'
              }
              size={25}
            />
            <Text
              style={[
                styles.toastText,
                toastType === 'success'
                  ? styles.successToastText
                  : toastType === 'warning'
                  ? styles.warningToastText
                  : styles.errorToastText,
              ]}>
              {toastMessage}
            </Text>
          </Animated.View>
        </GestureDetector>
      )}
    </>
  );
});

export default function AnimatedSwipableToast() {
  const toastRef = useRef<{
    show: ({ type, text }: ShowFunctionInterface) => void;
  }>(null);

  return (
    <View style={styles.container}>
      <Toast ref={toastRef} />
      <TouchableWithoutFeedback
        onPress={() =>
          toastRef.current?.show({
            type: 'success',
            text: 'Success Toast!',
          })
        }>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Success Toast</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() =>
          toastRef.current?.show({
            type: 'error',
            text: 'Error Toast!',
          })
        }>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Error Toast</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() =>
          toastRef.current?.show({
            type: 'warning',
            text: 'Warning Toast!',
          })
        }>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Warning Toast</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEC520',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  // Toast Styles
  toastContainer: {
    position: 'absolute',
    top: 60,
    width: '90%',
    padding: 10,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  successToastContainer: {
    backgroundColor: '#DEF1D7',
    borderColor: '#1F8722',
  },
  warningToastContainer: {
    backgroundColor: '#FEF7EC',
    borderColor: '#F08135',
  },
  errorToastContainer: {
    backgroundColor: '#FAE1DB',
    borderColor: '#D9100A',
  },
  toastText: {
    fontSize: 16,
    marginLeft: 12,
  },
  successToastText: {
    color: '#1F8722',
  },
  warningToastText: {
    color: '#F08135',
  },
  errorToastText: {
    color: '#D9100A',
  },
});
