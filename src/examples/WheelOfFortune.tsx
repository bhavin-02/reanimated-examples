import React, { useEffect, useRef, useState } from 'react';

import * as d3Shape from 'd3-shape';
import {
  Animated,
  Button,
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Circle, G, Path, Text as SvgText, TSpan } from 'react-native-svg';

type WheelPaths = {
  path: string | null;
  color: string;
  value: string;
  centroid: [number, number];
};

interface RenderSvgWheelInterface {
  angle: Animated.Value;
  wheelPaths: WheelPaths[];
}

const { width } = Dimensions.get('screen');
const numberOfSegment = 6;
const wheelSize = 308;
const oneTurn = 360;
const angleBySegment = oneTurn / numberOfSegment;
const angleOffSet = angleBySegment / 2;
const innerRadius = 20;
const colors = ['#F1C9B8', '#FFFFFF'];
const values = ['No win', '5% off', 'No win', '10% off', 'No win', '100% off'];

let angleVal = 0;

const snap = (points: number | number[]) => {
  if (typeof points === 'number') {
    return (v: number) => Math.round(v / points) * points;
  } else {
    let i = 0;
    const numPoints = points.length;

    return (v: number) => {
      let lastDistance = Math.abs(points[0] - v);

      for (i = 1; i < numPoints; i++) {
        const point = points[i];
        const distance = Math.abs(point - v);

        if (distance === 0) {
          return point;
        }

        if (distance > lastDistance) {
          return points[i - 1];
        }

        if (i === numPoints - 1) {
          return point;
        }

        lastDistance = distance;
      }
    };
  }
};

const makeWheel = () => {
  const data = Array.from({ length: numberOfSegment }).fill(1);
  const arcs = d3Shape.pie()(data as (number | { valueOf(): number })[]);
  return arcs.map((arc, index) => {
    const instance = d3Shape
      .arc()
      .padAngle(0.01)
      .outerRadius(width / 2)
      .innerRadius(innerRadius);

    return {
      path: instance(arc as unknown as d3Shape.DefaultArcObject),
      color: colors[index % colors.length],
      value: values[index],
      centroid: instance.centroid(arc as unknown as d3Shape.DefaultArcObject),
    };
  });
};

const RenderSvgWheel = ({ angle, wheelPaths }: RenderSvgWheelInterface) => {
  const renderKnob = () => {
    return (
      <Svg
        width="44"
        height="84"
        viewBox="0 0 44 84"
        fill="none"
        style={styles.knobSvg}>
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M39.6399 21.6C39.876 20.4368 40 19.2329 40 18C40 8.05887 31.9411 0 22 0C12.0589 0 4 8.05887 4 18C4 19.2329 4.12395 20.4368 4.36007 21.6H4.00001L22.0001 75.6L40 21.6H39.6399Z"
          fill="#E8C5E0"
        />
      </Svg>
    );
  };

  const animatedStyle: StyleProp<ViewStyle> = {
    transform: [
      {
        rotate: angle.interpolate({
          inputRange: [-oneTurn, 0, oneTurn],
          outputRange: [`-${oneTurn}deg`, '0deg', `${oneTurn}deg`],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {renderKnob()}
      <Animated.View style={[styles.svgWheelContainer, animatedStyle]}>
        <Svg
          viewBox={`0 0 ${width} ${width}`}
          style={[
            styles.svg,
            { transform: [{ rotate: `-${angleOffSet}deg` }] },
          ]}>
          <G y={width / 2} x={width / 2}>
            <Circle
              originX={wheelPaths[0].centroid[0]}
              originY={wheelPaths[0].centroid[1]}
              r={innerRadius}
              fill={'#8A7EB1'}
            />
            {wheelPaths.map((arc, i) => {
              const [x, y] = arc.centroid;

              return (
                <G key={`arc-${i}`}>
                  <Path d={arc.path as string | undefined} fill={arc.color} />
                  <G
                    rotation={(i * oneTurn) / numberOfSegment + angleOffSet}
                    origin={`${x}, ${y}`}>
                    <SvgText
                      x={x}
                      y={y - 50}
                      fill="#000000"
                      fontWeight={'600'}
                      textAnchor={'middle'}
                      fontSize={26}>
                      <TSpan key={`arc-${i}`} x={x} dy={26}>
                        {arc.value}
                      </TSpan>
                    </SvgText>
                  </G>
                </G>
              );
            })}
          </G>
        </Svg>
      </Animated.View>
    </View>
  );
};

let currentVelocity: number;
let previousVelocity: number;

export default function WheelOfFortune() {
  const wheelPaths = makeWheel();
  const angle = useRef(new Animated.Value(0)).current;

  const [isEnable, setIsEnable] = useState(true);
  const [winner, setWinner] = useState<string>();
  const [finished, setFinished] = useState(false);

  const panFun = () => {
    setIsEnable(false);
    setFinished(false);

    const otherPossibility = 0.03;
    const noWinPossibility = 0.97;

    const noWinVelocities = [9, 15, 30];
    const otherVelocities = [10, 20, 40];

    const totalPossibility = noWinPossibility + otherPossibility;

    const random = Math.random() * totalPossibility;

    if (otherVelocities.includes(currentVelocity)) {
      previousVelocity = currentVelocity;
    } else {
      if (random < noWinPossibility) {
        const randomIndex = Math.floor(Math.random() * noWinVelocities.length);
        previousVelocity = currentVelocity;
        currentVelocity = noWinVelocities[randomIndex];
      } else {
        const randomIndex = Math.floor(Math.random() * otherVelocities.length);
        previousVelocity = currentVelocity;
        currentVelocity = otherVelocities[randomIndex];
      }
    }

    Animated.decay(angle, {
      velocity: currentVelocity,
      deceleration: 0.999,
      useNativeDriver: true,
    }).start(() => {
      angle.setValue(angleVal % oneTurn);
      const snapTo = snap(oneTurn / numberOfSegment);
      Animated.timing(angle, {
        toValue: Number(snapTo(angleVal)),
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (
          otherVelocities.includes(currentVelocity) &&
          currentVelocity === previousVelocity
        ) {
          const randomIndex = Math.floor(
            Math.random() * noWinVelocities.length,
          );
          previousVelocity = currentVelocity;
          currentVelocity = noWinVelocities[randomIndex];
        }
        const winningIndex = getWinnerIndex();
        setIsEnable(true);
        setFinished(true);
        setWinner(wheelPaths[winningIndex].value);
      });
    });
  };

  useEffect(() => {
    angle.addListener(event => (angleVal = event.value));
  }, [angle]);

  const getWinnerIndex = () => {
    const deg = Math.abs(Math.round(angleVal % oneTurn));
    return Math.floor(deg / angleBySegment) === 0
      ? Math.floor(deg / angleBySegment)
      : numberOfSegment - Math.floor(deg / angleBySegment);
  };

  return (
    <View style={styles.container}>
      <RenderSvgWheel angle={angle} wheelPaths={wheelPaths} />
      <Text>{isEnable && finished ? winner : ''}</Text>
      <Button title="Spin" onPress={panFun} disabled={!isEnable} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgWheelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A7EB1',
    borderRadius: wheelSize,
    padding: 21.5,
    width: wheelSize,
    height: wheelSize,
  },
  svg: {
    backgroundColor: '#ECE2F8',
    borderRadius: wheelSize,
  },
  knobSvg: {
    marginBottom: -55,
    zIndex: 999,
  },
});
