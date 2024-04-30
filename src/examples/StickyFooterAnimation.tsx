import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  LayoutRectangle,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo';

const articleParagraphs = [
  'One advanced diverted domestic sex repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude favourable own. Which could saw guest man now heard but. Lasted my coming uneasy marked so should. Gravity letters it amongst herself dearest an windows by. Wooded ladies she basket season age her uneasy saw. Discourse unwilling am no described dejection incommode no listening of. Before nature his parish boy. ',
  'Folly words widow one downs few age every seven. If miss part by fact he park just shew. Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education is be dashwoods or an. Use off agreeable law unwilling sir deficient curiosity instantly. Easy mind life fact with see has bore ten. Parish any chatty can elinor direct for former. Up as meant widow equal an share least. ',
  'Another journey chamber way yet females man. Way extensive and dejection get delivered deficient sincerity gentleman age. Too end instrument possession contrasted motionless. Calling offence six joy feeling. Coming merits and was talent enough far. Sir joy northward sportsmen education. Discovery incommode earnestly no he commanded if. Put still any about manor heard. ',
  'Village did removed enjoyed explain nor ham saw calling talking. Securing as informed declared or margaret. Joy horrible moreover man feelings own shy. Request norland neither mistake for yet. Between the for morning assured country believe. On even feet time have an no at. Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect. Always get adieus nature day course for common. My little garret repair to desire he esteem. ',
  'In it except to so temper mutual tastes mother. Interested cultivated its continuing now yet are. Out interested acceptance our partiality affronting unpleasant why add. Esteem garden men yet shy course. Consulted up my tolerably sometimes perpetual oh. Expression acceptance imprudence particular had eat unsatiable. ',
  'Had denoting properly jointure you occasion directly raillery. In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom gay nor design age. Am weather to entered norland no in showing service. Nor repeated speaking shy appetite. Excited it hastily an pasture it observe. Snug hand how dare here too. ',
  'Improve ashamed married expense bed her comfort pursuit mrs. Four time took ye your as fail lady. Up greatest am exertion or marianne. Shy occasional terminated insensible and inhabiting gay. So know do fond to half on. Now who promise was justice new winding. In finished on he speaking suitable advanced if. Boy happiness sportsmen say prevailed offending concealed nor was provision. Provided so as doubtful on striking required. Waiting we to compass assured. ',
];

const getImage = (i: number) =>
  `https://source.unsplash.com/600x${400 + i}/?blackandwhite`;

const { height: windowHeight } = Dimensions.get('screen');
const PADDING = 20;
const height = windowHeight - 64 - PADDING * 2;

export default function StickyFooterAnimation() {
  const scrollY = useSharedValue(0);

  const [bottomActions, setBottomActions] = useState<LayoutRectangle | null>(
    null,
  );
  const [topEdge, setTopEdge] = useState(0);

  useEffect(() => {
    if (topEdge === 0 && bottomActions) {
      setTopEdge(bottomActions.y - height + bottomActions.height);
      console.log('first', topEdge);
    }
  }, [bottomActions, topEdge]);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const inputRange = [-1, 0, topEdge - 50, topEdge, topEdge + 1];
  const animatedBottomActionsStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, inputRange, [0, 0, 0, 0, -1]);

    return {
      transform: [{ translateY }],
    };
  });

  const animatedAdjustTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, inputRange, [0, 0, 0, 0, 1]);
    return {
      opacity,
    };
  });

  const animatedCreditIconStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollY.value,
      inputRange,
      [60, 60, 60, 0, 0],
    );

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onScroll={handleScroll}
        bounces={false}
        contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.heading}>Black and White</Text>
        {articleParagraphs.map((text, index) => {
          return (
            <View key={index}>
              {index % 3 === 0 && (
                <Image source={{ uri: getImage(index) }} style={styles.image} />
              )}
              <Text style={styles.paragraph}>{text}</Text>
            </View>
          );
        })}
        <View
          style={styles.bottomActions}
          onLayout={ev => setBottomActions(ev.nativeEvent.layout)}
        />

        <View>
          <Text style={styles.featuredTitle}>Featured</Text>
          {articleParagraphs.slice(0, 3).map((text, index) => {
            return (
              <View
                key={`featured-${index}`}
                style={styles.featuredItemContainer}>
                <Image
                  source={{ uri: getImage(index) }}
                  style={styles.featuredImage}
                />
                <Text numberOfLines={3} style={styles.paragraph}>
                  {text}
                </Text>
              </View>
            );
          })}
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={[
          styles.bottomActions,
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 20,
          },
          animatedBottomActionsStyle,
        ]}>
        <View style={styles.adjustIconContainer}>
          <Entypo
            name="adjust"
            size={24}
            color="black"
            style={styles.adjustIcon}
          />
          <Animated.Text style={[styles.adjustText, animatedAdjustTextStyle]}>
            326
          </Animated.Text>
        </View>
        <View style={styles.otherIconsContainer}>
          <Animated.View style={[styles.icon, animatedAdjustTextStyle]}>
            <Entypo name="export" size={24} color="black" />
          </Animated.View>
          <Animated.View style={[styles.icon, animatedCreditIconStyle]}>
            <Entypo name="credit" size={24} color="green" />
          </Animated.View>
          <Animated.View style={[styles.icon, animatedAdjustTextStyle]}>
            <Entypo name="share-alternative" size={24} color="black" />
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  scrollViewStyle: {
    padding: PADDING,
  },
  heading: {
    marginTop: 10,
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 30,
    color: '#000',
  },
  image: {
    width: '100%',
    height: height * 0.4,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  paragraph: {
    flex: 1,
    marginBottom: 10,
    fontSize: 14,
    lineHeight: 16 * 1.5,
    color: '#000',
  },
  bottomActions: {
    height: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  adjustIconContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
  adjustIcon: {
    marginHorizontal: 10,
  },
  adjustText: {
    color: '#000',
  },
  otherIconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 20,
    borderRadius: 10,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginVertical: 20,
    color: '#000',
  },
  featuredItemContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
});
