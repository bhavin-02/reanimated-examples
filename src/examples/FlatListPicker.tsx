import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  ScrollHandlerProcessed,
  runOnJS,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

interface ItemInterface {
  icon: string;
  name?: string;
  color?: string;
  showText?: boolean;
}

interface IconInterface {
  icon: string;
  color?: string;
}

interface ConnectWithButtonInterface {
  onPress?: () => void;
}

interface ListInterface {
  showText?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onScroll?: ScrollHandlerProcessed<Record<string, unknown>>;
}

const data = [
  { icon: 'social-tumblr', name: 'Tumblr' },
  { icon: 'social-twitter', name: 'Twitter' },
  { icon: 'social-facebook', name: 'Facebook' },
  { icon: 'social-instagram', name: 'Instagram' },
  { icon: 'social-linkedin', name: 'LinkedIn' },
  { icon: 'social-pinterest', name: 'Pinterest' },
  { icon: 'social-github', name: 'Github' },
  { icon: 'social-google', name: 'Google' },
  { icon: 'social-reddit', name: 'Reddit' },
  { icon: 'social-skype', name: 'Skype' },
  { icon: 'social-dribbble', name: 'Dribbble' },
  { icon: 'social-behance', name: 'Be hance' },
  { icon: 'social-foursqare', name: 'Four Sqare' },
  { icon: 'social-soundcloud', name: 'Sound Cloud' },
  { icon: 'social-spotify', name: 'Spotify' },
  { icon: 'social-stumbleupon', name: 'Stumble Upon' },
  { icon: 'social-youtube', name: 'YouTube' },
  { icon: 'social-dropbox', name: 'DropBox' },
  { icon: 'social-vkontakte', name: 'VKontakte' },
  { icon: 'social-steam', name: 'Steam' },
];

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;
const colors = { yellow: '#FFE8A3', dark: '#2D2D2D' };
const { width, height } = Dimensions.get('window');

const Icon = memo(({ icon, color }: IconInterface) => {
  return <SimpleLineIcons name={icon} color={color} size={ICON_SIZE} />;
});

const Item = memo(({ icon, color, name, showText }: ItemInterface) => {
  return (
    <View style={styles.itemWrapper}>
      {showText ? (
        <Text style={[styles.itemText, { color }]}>{name}</Text>
      ) : (
        <View />
      )}
      <Icon icon={icon} color={color} />
    </View>
  );
});

const ConnectWithText = memo(() => {
  return (
    <View style={styles.connectWithTextContainer}>
      <Text style={styles.connectWithText}>Connect with...</Text>
    </View>
  );
});

const ConnectWithButton = memo(({ onPress }: ConnectWithButtonInterface) => {
  return (
    <View style={styles.connectWithButtonContainer}>
      <View style={styles.line} />
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.button}>
        <Text style={styles.buttonText}>Done!</Text>
      </TouchableOpacity>
    </View>
  );
});

const List = forwardRef(
  (
    { color, showText, style, onScroll }: ListInterface,
    ref: ForwardedRef<FlatList<typeof data>>,
  ) => {
    return (
      <Animated.FlatList
        ref={ref}
        data={data}
        keyExtractor={item => `${item.name}-${item.icon}`}
        bounces={false}
        style={style}
        scrollEnabled={!showText}
        scrollEventThrottle={16}
        onScroll={onScroll}
        decelerationRate={'fast'}
        snapToInterval={ITEM_HEIGHT}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContentContainerStyle,
          {
            paddingTop: showText ? 0 : height / 2 - ITEM_HEIGHT,
            paddingBottom: showText ? 0 : height / 2 - ITEM_HEIGHT,
          },
        ]}
        renderItem={({ item }) => {
          return <Item {...item} color={color} showText={showText} />;
        }}
      />
    );
  },
);

export default function FlatListPicker() {
  const scrollY = useSharedValue(0);

  const yellowRef = useRef<Animated.FlatList<typeof data>>(null);
  const darkRef = useRef<Animated.FlatList<typeof data>>(null);

  const [index, setIndex] = useState(0);

  const onConnectPress = useCallback(() => {
    Alert.alert('Connect with', data[index].name);
  }, [index]);

  const onItemIndexChange = useCallback(setIndex, [setIndex]);

  const fun = () => {
    if (darkRef.current) {
      darkRef.current.scrollToOffset({
        offset: scrollY.value,
        animated: false,
      });
    }
  };

  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
    onMomentumEnd: event => {
      const ind = Math.round(event.contentOffset.y / ITEM_HEIGHT);
      runOnJS(onItemIndexChange)(ind);
    },
  });

  useAnimatedReaction(
    () => scrollY.value,
    () => runOnJS(fun)(),
    [scrollY],
  );

  return (
    <View style={styles.container}>
      <ConnectWithText />
      <List
        ref={yellowRef}
        color={colors.yellow}
        style={StyleSheet.absoluteFillObject}
        onScroll={handleScroll}
      />
      <List
        ref={darkRef}
        color={colors.dark}
        showText
        style={styles.darkList}
        onScroll={handleScroll}
      />
      <ConnectWithButton onPress={onConnectPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.dark,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ITEM_HEIGHT,
  },
  itemText: {
    fontSize: 26,
    fontWeight: '800',
  },
  connectWithTextContainer: {
    position: 'absolute',
    top: height / 2 - ITEM_HEIGHT * 2.5,
    width: width * 0.7,
    paddingHorizontal: 14,
  },
  connectWithText: {
    color: colors.yellow,
    fontSize: 52,
    fontWeight: '700',
    lineHeight: 52,
  },
  listContentContainerStyle: {
    paddingHorizontal: 20,
  },
  darkList: {
    position: 'absolute',
    backgroundColor: colors.yellow,
    width,
    height: ITEM_HEIGHT,
    top: height / 2 - ITEM_HEIGHT,
  },
  connectWithButtonContainer: {
    position: 'absolute',
    top: height / 2,
    paddingHorizontal: 14,
  },
  line: {
    height: ITEM_HEIGHT * 2,
    width: 2,
    backgroundColor: colors.yellow,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.dark,
    fontSize: 32,
    fontWeight: '800',
  },
});
