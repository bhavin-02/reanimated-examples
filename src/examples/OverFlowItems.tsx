import React, { useState } from 'react';
import {
  CellRendererProps,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  FlingGestureHandlerEventPayload,
  HandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';

interface ItemsInterface {
  data: typeof DATA;
  index: number;
  scrollXAnimated: SharedValue<number>;
}

interface LocationIconInterface {
  style: StyleProp<ViewStyle>;
}

interface RenderImageInterface {
  item: (typeof DATA)[0];
  index: number;
  scrollXAnimated: SharedValue<number>;
}

type CellRendererComponentInterface = (
  | CellRendererProps<(typeof DATA)[0]>
  | null
  | undefined
) & {
  data: typeof DATA;
};

const { width } = Dimensions.get('screen');

const DATA = [
  {
    title: 'Afro vibes',
    location: 'Mumbai, India',
    date: 'Nov 17th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg',
  },
  {
    title: 'Jungle Party',
    location: 'Unknown',
    date: 'Sept 3rd, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg',
  },
  {
    title: '4th Of July',
    location: 'New York, USA',
    date: 'Oct 11th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg',
  },
  {
    title: 'Summer festival',
    location: 'Bucharest, Romania',
    date: 'Aug 17th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg',
  },
  {
    title: 'BBQ with friends',
    location: 'Prague, Czech Republic',
    date: 'Sept 11th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg',
  },
  {
    title: 'Festival music',
    location: 'Berlin, Germany',
    date: 'Apr 21th, 2021',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg',
  },
  {
    title: 'Beach House',
    location: 'Liboa, Portugal',
    date: 'Aug 12th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
  },
];

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const LocationIcon = ({ style }: LocationIconInterface) => {
  return (
    <Svg viewBox="0 0 32 32" style={style}>
      <Path
        fill="#000"
        d="M16 18a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5m0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3"
      />
      <Path
        fill="#000"
        d="m16 30l-8.436-9.949a35.076 35.076 0 0 1-.348-.451A10.889 10.889 0 0 1 5 13a11 11 0 0 1 22 0a10.884 10.884 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447ZM8.813 18.395s.233.308.286.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.901 8.901 0 0 0 25 13a9 9 0 1 0-18 0a8.905 8.905 0 0 0 1.813 5.395"
      />
    </Svg>
  );
};

const Items = ({ data, scrollXAnimated, index }: ItemsInterface) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [-1, 0, 1];
    const translateY = interpolate(scrollXAnimated.value, inputRange, [
      OVERFLOW_HEIGHT,
      0,
      -OVERFLOW_HEIGHT,
    ]);
    const opacity = interpolate(
      scrollXAnimated.value,
      [index - 1, index, index + 1],
      [0.4, 1, 0.4],
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View style={styles.overFlowContainer}>
      <Animated.View style={animatedStyle}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text numberOfLines={1} style={styles.itemTitle}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <View style={styles.locationContainer}>
                  <LocationIcon style={styles.locationIcon} />
                  <Text style={styles.location}>{item.location}</Text>
                </View>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const CellRendererComponent = ({
  index,
  children,
  style,
  data,
  ...props
}: CellRendererComponentInterface) => {
  const newStyle = [style, { zIndex: data.length - index }];

  return (
    <View style={newStyle} key={index} {...props}>
      {children}
    </View>
  );
};

const RenderImage = ({
  item,
  index,
  scrollXAnimated,
}: RenderImageInterface) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [index - 1, index, index + 1];
    const translateX = interpolate(
      scrollXAnimated.value,
      inputRange,
      [40, 0, -90],
    );
    const scale = interpolate(scrollXAnimated.value, inputRange, [0.8, 1, 1.3]);
    const opacity = interpolate(scrollXAnimated.value, inputRange, [
      1 - 1 / VISIBLE_ITEMS,
      1,
      0,
    ]);

    return {
      opacity,
      transform: [{ translateX }, { scale }],
    };
  });

  const userAgent = Platform.select({
    ios: 'iPhone',
    android: 'Android',
    default: 'Unknown',
  });

  return (
    <Animated.View style={[styles.renderImageContainer, animatedStyle]}>
      <Image
        source={{
          uri: item.poster,
          headers: { 'User-Agent': userAgent },
        }}
        style={styles.poster}
      />
    </Animated.View>
  );
};

export default function OverFlowItems() {
  const scrollXIndex = useSharedValue(0);
  const scrollXAnimated = useSharedValue(0);

  const [index, setIndex] = useState(0);

  const setActiveIndex = (index: number) => {
    setIndex(index);
    scrollXIndex.value = withSpring(index);
    scrollXAnimated.value = withSpring(index);
  };

  const handleStateChange = (
    e: HandlerStateChangeEvent<FlingGestureHandlerEventPayload>,
    direction: 'left' | 'right',
  ) => {
    if (direction === 'left') {
      if (e.nativeEvent.state === State.END) {
        if (index === DATA.length - 1) {
          return;
        }
        setActiveIndex(index + 1);
      }
    }

    if (direction === 'right') {
      if (e.nativeEvent.state === State.END) {
        if (index === 0) {
          return;
        }
        setActiveIndex(index - 1);
      }
    }
  };

  return (
    <FlingGestureHandler
      key={'left'}
      direction={Directions.LEFT}
      onHandlerStateChange={e => handleStateChange(e, 'left')}>
      <FlingGestureHandler
        key={'right'}
        direction={Directions.RIGHT}
        onHandlerStateChange={e => handleStateChange(e, 'right')}>
        <View style={styles.container}>
          <Items data={DATA} index={index} scrollXAnimated={scrollXAnimated} />

          <FlatList
            data={DATA}
            keyExtractor={(_, i) => i.toString()}
            horizontal
            contentContainerStyle={styles.imageListContentContainerStyle}
            scrollEnabled={false}
            removeClippedSubviews={false}
            // eslint-disable-next-line react/no-unstable-nested-components
            CellRendererComponent={props => (
              <CellRendererComponent data={DATA} {...props} />
            )}
            renderItem={({ item, index }) => (
              <RenderImage
                item={item}
                index={index}
                scrollXAnimated={scrollXAnimated}
              />
            )}
          />
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  overFlowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING,
  },
  itemTitle: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
    color: '#000',
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontSize: 16,
    color: '#000',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 5,
    height: 16,
    width: 16,
  },
  date: {
    fontSize: 12,
    color: '#000',
  },
  imageListContentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING * 2,
  },
  renderImageContainer: {
    position: 'absolute',
    left: -ITEM_WIDTH / 2,
  },
  poster: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
});
