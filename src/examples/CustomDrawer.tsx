import MaskedView from '@react-native-masked-view/masked-view';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  AnimatedStyle,
  SharedValue,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { G, Path, Polygon, Svg } from 'react-native-svg';

interface DrawerInterface {
  onPress: () => void;
  animatedValue: SharedValue<typeof fromCoords>;
}

interface MenuIconInterface {
  onPress?: () => void;
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

interface ButtonInterface {
  label: string;
  onPress: () => void;
  style?: StyleProp<TextStyle>;
}

const routes = [
  'Get started',
  'Features',
  'Tools',
  'Services',
  'Portfolio',
  'Careers',
  'Contact',
];
const links = ['Follow us', 'Quota', 'Awesome link'];
const colors = [
  '#69d2e7',
  '#a7dbd8',
  '#e0e4cc',
  '#f38630',
  '#fa6900',
  '#fe4365',
  '#fc9d9a',
  '#f9cdad',
  '#c8c8a9',
  '#83af9b',
  '#ecd078',
  '#d95b43',
  '#c02942',
  '#53777a',
];
const { width, height } = Dimensions.get('window');

const fromCoords = { x: 0, y: height };
const toCoords = { x: width, y: 0 };

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Drawer = ({ onPress, animatedValue }: DrawerInterface) => {
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);

  const animatedProps = useAnimatedProps(() => {
    return {
      points: `0, 0 ${animatedValue.value.x}, ${animatedValue.value.y} ${width}, ${height} 0, ${height}`,
    };
  }, [animatedValue.value.x, animatedValue.value.y]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animatedValue.value.x,
      [0, width],
      [-100, 0],
    );
    const opacity = interpolate(animatedValue.value.x, [0, width], [0, 1]);

    return {
      opacity,
      transform: [{ translateX }],
    };
  }, []);

  return (
    <MaskedView
      maskElement={
        <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
          <AnimatedPolygon
            fill={'green'}
            points={`0, 0 ${fromCoords.x}, ${fromCoords.y} ${width}, ${height} 0, ${height}`}
            // points={`0, 0 ${toCoords.x}, ${toCoords.y} ${width}, ${height} 0, ${height}`}
            animatedProps={animatedProps}
          />
        </Svg>
      }
      style={styles.container}>
      <View style={styles.menuContainer}>
        <CloseIcon onPress={onPress} style={styles.menuIcon} />
        <Animated.View style={[styles.menu, animatedStyle]}>
          <View>
            {routes.map((route, index) => {
              return (
                <Button
                  key={route}
                  label={route}
                  onPress={() => {
                    setSelectedRoute(route);
                    onPress();
                  }}
                  style={[
                    styles.button,
                    {
                      color: colors[index],
                      textDecorationLine:
                        route === selectedRoute ? 'line-through' : 'none',
                    },
                  ]}
                />
              );
            })}
          </View>
          <View>
            {links.map((link, index) => {
              return (
                <Button
                  label={link}
                  key={link}
                  onPress={onPress}
                  style={[
                    styles.buttonSmall,
                    { color: colors[index + routes.length + 1] },
                  ]}
                />
              );
            })}
          </View>
        </Animated.View>
      </View>
    </MaskedView>
  );
};

const MenuIcon = ({ onPress, style }: MenuIconInterface) => {
  return (
    <AnimatedSvg viewBox="0 0 48 48" style={style} onPress={onPress}>
      <G
        fill="none"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4">
        <Path d="M8 11H40" />
        <Path d="M8 24H40" />
        <Path d="M8 37H40" />
        <Path d="M13.6568 29.6568L8 23.9999L13.6568 18.343" />
      </G>
    </AnimatedSvg>
  );
};

const CloseIcon = ({ onPress, style }: MenuIconInterface) => {
  return (
    <AnimatedSvg viewBox="0 0 24 24" style={style} onPress={onPress}>
      <Path
        fill="#fff"
        d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
      />
    </AnimatedSvg>
  );
};

const Button = ({ label, onPress, style }: ButtonInterface) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function CustomDrawer() {
  const animatedValue = useSharedValue(fromCoords);

  const animate = (toValue: number) => {
    animatedValue.value = withTiming(toValue === 1 ? toCoords : fromCoords, {
      duration: 1000,
    });
  };

  const onCloseDrawer = () => {
    animate(0);
  };

  const onOpenDrawer = () => {
    animate(1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animatedValue?.value.y,
      [0, height * 0.3],
      [100, 0],
      'clamp',
    );
    return {
      transform: [{ translateX }],
    };
  }, []);

  return (
    <View style={styles.container}>
      <Drawer onPress={onCloseDrawer} animatedValue={animatedValue} />
      <MenuIcon
        onPress={onOpenDrawer}
        style={[styles.menuIcon, animatedStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'flex-start',
    paddingTop: 80,
    paddingBottom: 30,
    paddingLeft: 30,
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    height: 20,
    width: 20,
  },
  menu: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 34,
    lineHeight: 34 * 1.5,
  },
  buttonSmall: {
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
});
