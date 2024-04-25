// Grabbed data from https://www.bbcgoodfood.com/recipes/collection/all-time-top-20-recipes
/*
const exp = () => `${(Math.floor(Math.random() * 10) + 1) * 5}`;
const mealType = [ "Vegan", "Vegetarian", "Fusion", "Nouvelle", "Haute", "Fish"];
const cousineType = ["Dehydrated", "Unhealthy", "Fast Food", "Healthy"];

let getRandom = (arr) => {
  const random = Math.floor(Math.random() * arr.length);
  return arr[random];
};

copy(JSON.stringify([...document.querySelectorAll('.dynamic-list__list li')].map(x => ({
  image: x.querySelector('.image__picture img')?.src,
  title: x.querySelector('.heading-4')?.innerText?.trim(),
  description: x.querySelector('.card__description p')?.innerText?.trim(),
  prepTime: x.querySelectorAll('.terms-icons-list li')?.[0]?.querySelector('.list-item span')?.innerText?.trim()?.toLowerCase(),
  exp: exp(),
  skill: x.querySelectorAll('.terms-icons-list li')?.[1]?.querySelector('.list-item span')?.innerText?.trim()?.toLowerCase(),
  cousine: x.querySelectorAll('.terms-icons-list li')?.[2]?.querySelector('.list-item span')?.innerText?.trim()?.toLowerCase() ?? getRandom(cousineType),
  type: x.querySelectorAll('.terms-icons-list li')?.[2]?.querySelector('.list-item span')?.innerText?.trim()?.toLowerCase() ?? getRandom(mealType)
})), null, 2));
*/

import React, { PropsWithChildren, useCallback, useState } from 'react';
import {
  ColorValue,
  Dimensions,
  Image,
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
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type IconsType = 'prepTime' | 'exp' | 'skill' | 'cousine' | 'type';

interface ItemInterface extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

interface IconInterface {
  type: string;
}

interface DescriptionInterface {
  index: number;
  text: string;
  color: ColorValue;
}

interface TitleInterface {
  index: number;
  text: string;
  color: ColorValue;
}

interface DetailsInterface {
  index: number;
  color: ColorValue;
}

const detailsList = ['prepTime', 'exp', 'skill', 'cousine', 'type'];
const iconByType = {
  prepTime: 'fire',
  exp: 'badge',
  skill: 'energy',
  cousine: 'chemistry',
  type: 'drop',
};
const data = [
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1273477_8-ad36e3b.jpg?quality=90&resize=93,85',
    title: 'Easy pancakes',
    description:
      'Learn a skill for life with our foolproof easy crêpe recipe that ensures perfect pancakes every time – elaborate flip optional',
    prepTime: '30 mins',
    exp: 50,
    skill: 'easy',
    cousine: 'healthy',
    type: 'healthy',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-901451_9-687c42b.jpg?quality=90&resize=93,85',
    title: 'Best Yorkshire puddings',
    description:
      "The secret to getting gloriously puffed-up Yorkshire puddings is to have the fat sizzling hot and don't open the oven door!",
    prepTime: '25 mins',
    exp: 35,
    skill: 'easy',
    cousine: 'vegetarian',
    type: 'vegetarian',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001451_6-c8d72b8.jpg?quality=90&resize=93,85',
    title: 'Chilli con carne recipe',
    description:
      'This great chilli recipe has to be one of the best dishes to serve to friends for a casual get-together. An easy sharing favourite that uses up storecupboard ingredients.',
    prepTime: '1 hr 10 mins',
    exp: 40,
    skill: 'easy',
    cousine: 'Healthy',
    type: 'Haute',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/06/recipe-image-legacy-id-1273522_8-a6b9246.jpg?quality=90&resize=93,85',
    title: 'Banana bread',
    description:
      "A cross between banana bread and a drizzle cake, this easy banana loaf recipe is a quick bake that can be frozen. It's great for using up overripe bananas, too.",
    prepTime: '1 hr 5 mins',
    exp: 40,
    skill: 'easy',
    cousine: 'Unhealthy',
    type: 'Fish',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/the-best-spaghetti-bolognese-7e83155.jpg?quality=90&resize=93,85',
    title: 'The best spaghetti bolognese recipe',
    description:
      'Our best ever spaghetti bolognese is super easy and a true Italian classic with a meaty, chilli sauce. This pasta bolognese recipe is sure to become a family favourite.',
    prepTime: '2 hrs 15 mins',
    exp: 35,
    skill: 'easy',
    cousine: 'Dehydrated',
    type: 'Fish',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001464_11-ed687dd.jpg?quality=90&resize=93,85',
    title: 'Best ever chocolate brownies recipe',
    description:
      'A super easy brownie recipe for a squidgy chocolate bake. Watch our foolproof recipe video to help you get a perfect traybake every time.',
    prepTime: '1 hr',
    exp: 20,
    skill: 'more effort',
    cousine: 'Dehydrated',
    type: 'Vegan',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001468_10-81b47f5.jpg?quality=90&resize=93,85',
    title: 'Classic Victoria sandwich recipe',
    description:
      'The perfect party cake, a Victoria sponge is a traditional bake everyone will love. Makes an easy wedding cake, too',
    prepTime: '1 hr',
    exp: 30,
    skill: 'easy',
    cousine: 'Fast Food',
    type: 'Vegan',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?quality=90&resize=93,85',
    title: 'Ultimate spaghetti carbonara recipe',
    description:
      'Discover how to make traditional spaghetti carbonara. This classic Italian pasta dish combines a silky cheese sauce with crisp pancetta and black pepper.',
    prepTime: '35 mins',
    exp: 40,
    skill: 'easy',
    cousine: 'Dehydrated',
    type: 'Nouvelle',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001500_10-16f94ee.jpg?quality=90&resize=93,85',
    title: 'Classic scones with jam & clotted cream',
    description:
      "You can have a batch of scones on the table in 20 minutes with Jane Hornby's storecupboard recipe, perfect for unexpected guests",
    prepTime: '15 mins',
    exp: 25,
    skill: 'easy',
    cousine: 'Healthy',
    type: 'Vegetarian',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1238452_7-35e4911.jpg?quality=90&resize=93,85',
    title: 'Lemon drizzle cake',
    description:
      "It's difficult not to demolish this classic lemon drizzle in just one sitting, so why not make two at once?",
    prepTime: '45 mins',
    exp: 40,
    skill: 'easy',
    cousine: 'Unhealthy',
    type: 'Nouvelle',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-736458_11-5ff6be2.jpg?quality=90&resize=93,85',
    title: 'Toad-in-the-hole',
    description:
      'Serve this comforting classic made with chipolata sausages and a simple batter – it’s easy enough that kids can help make it.',
    prepTime: '1 hr',
    exp: 25,
    skill: 'easy',
    cousine: 'Dehydrated',
    type: 'Nouvelle',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/roast-potatoes-main-7b0e23a.jpg?quality=90&resize=93,85',
    title: 'Ultimate roast potatoes',
    description:
      'Make sure your roasties are perfect for Sunday lunch or even Christmas dinner – this foolproof recipe guarantees a crisp crunch that gives way to a fluffy middle',
    prepTime: '1 hr 10 mins',
    exp: 15,
    skill: 'easy',
    cousine: 'Fast Food',
    type: 'Fusion',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1074465_10-0f090a9.jpg?quality=90&resize=93,85',
    title: 'Cottage pie',
    description:
      'Make our classic meat and potato pie for a comforting dinner. This great-value family favourite freezes beautifully and is a guaranteed crowd-pleaser',
    prepTime: '2 hrs 25 mins',
    exp: 50,
    skill: 'easy',
    cousine: 'Unhealthy',
    type: 'Fusion',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/the-best-apple-crumble-1fb6036-scaled.jpg?quality=90&resize=93,85',
    title: 'The best apple crumble',
    description:
      "You can't beat a traditional apple filling topped with crispy, buttery crumble - classic comfort food at its best",
    prepTime: '55 mins',
    exp: 10,
    skill: 'easy',
    cousine: 'Unhealthy',
    type: 'Vegetarian',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-196602_11-01e6eea.jpg?quality=90&resize=93,85',
    title: 'Cauliflower cheese',
    description:
      "Pop this classic side dish in the oven when you take your roast chicken out to rest, so there's no hot shelf juggling",
    prepTime: '45 mins',
    exp: 5,
    skill: 'easy',
    cousine: 'vegetarian',
    type: 'vegetarian',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1079477_11-e712431.jpg?quality=90&resize=93,85',
    title: 'Vintage chocolate chip cookies',
    description:
      "An easy chocolate chip cookie recipe for soft biscuits with a squidgy middle that will impress family and friends. Make plenty as they're sure to be a hit",
    prepTime: '25 mins',
    exp: 20,
    skill: 'easy',
    cousine: 'Unhealthy',
    type: 'Nouvelle',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flapjacks-239a448.jpg?quality=90&resize=93,85',
    title: 'Yummy golden syrup flapjacks',
    description:
      "Bake these 4-ingredient flapjacks – they're easy to make and ready in half an hour. Add chocolate drops, desiccated coconut or sultanas, if you like",
    prepTime: '30 mins',
    exp: 15,
    skill: 'easy',
    cousine: 'vegetarian',
    type: 'vegetarian',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1274503_8-05ae02b.jpg?quality=90&resize=93,85',
    title: 'Chicken & chorizo jambalaya',
    description:
      "A healthy Cajun-inspired rice pot recipe that's bursting with spicy Spanish sausage, sweet peppers and tomatoes",
    prepTime: '55 mins',
    exp: 20,
    skill: 'easy',
    cousine: 'healthy',
    type: 'healthy',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1043451_11-4713959.jpg?quality=90&resize=93,85',
    title: 'Ultimate chocolate cake',
    description:
      'Indulge yourself with this ultimate chocolate ganache cake recipe that is beautifully moist, rich and fudgy. Perfect for a celebration or an afternoon tea',
    prepTime: '2 hrs 10 mins',
    exp: 50,
    skill: 'easy',
    cousine: 'Dehydrated',
    type: 'Fish',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1074500_11-ee0d41a.jpg?quality=90&resize=93,85',
    title: 'Spiced carrot & lentil soup',
    description:
      "A delicious, spicy blend packed full of iron and low in fat to boot. It's ready in under half an hour, or can be made in a slow cooker",
    prepTime: '25 mins',
    exp: 25,
    skill: 'easy',
    cousine: 'healthy',
    type: 'healthy',
  },
];

const { width, height } = Dimensions.get('window');
const DURATION = 700;
const TITLE_SIZE = 36;
const SPACING = 80;
const ITEM_SIZE = width * 0.8;

const colors = {
  lightBg: '#F2F2F2',
  darkBg: '#2C2D51',
  lightText: '#E5E5DD',
  darkText: '#A5A6AA',
};

const Item = ({ children, style }: ItemInterface) => {
  return <View style={[styles.itemContainer, style]}>{children}</View>;
};

const Icon = ({ type }: IconInterface) => {
  return (
    <SimpleLineIcons
      name={type}
      size={26}
      color={'#A5A6AA'}
      style={styles.icon}
    />
  );
};

const Description = ({ index, text, color }: DescriptionInterface) => {
  return (
    <Item>
      <Text
        key={`description-${index}`}
        style={[styles.description, { color }]}>
        {text}
      </Text>
    </Item>
  );
};

const Title = ({ index, text, color }: TitleInterface) => {
  return (
    <Item style={styles.titleItem}>
      <Text key={`title-${index}`} style={[styles.title, { color }]}>
        {text}
      </Text>
    </Item>
  );
};

const Details = ({ color, index }: DetailsInterface) => {
  return (
    <View style={styles.detailsListContainer}>
      {detailsList.map(key => {
        return (
          <View key={key} style={styles.detailsContainer}>
            <Icon type={iconByType[key as IconsType]} />
            <Item style={styles.detailsItem}>
              <Text
                key={`${key}-${index}`}
                style={[styles.detailsItemText, { color }]}>
                {data[index][key as IconsType]}
              </Text>
            </Item>
          </View>
        );
      })}
    </View>
  );
};

export default function AnimatedCarousel() {
  const activeIndex = useSharedValue(0);
  const animation = useSharedValue(0);

  const [index, setIndex] = useState(0);

  const color = index % 2 === 1 ? colors.darkText : colors.lightText;
  const headingColor = index % 2 === 1 ? colors.lightText : colors.darkBg;

  useAnimatedReaction(
    () => animation.value,
    currentValue => {
      animation.value = withTiming(currentValue, { duration: DURATION });
    },
    [animation],
  );

  const setActiveIndex = useCallback(
    (ind: number) => {
      activeIndex.value = ind;
      setIndex(ind);
    },
    [activeIndex],
  );

  const onHandleStateChange = (
    direction: 'up' | 'down',
    e: HandlerStateChangeEvent<FlingGestureHandlerEventPayload>,
  ) => {
    if (e.nativeEvent.state === State.END) {
      if (direction === 'up') {
        if (index === data.length - 1) {
          return;
        }
        setActiveIndex(index + 1);
      }
      if (direction === 'down') {
        if (index === 0) {
          return;
        }
        setActiveIndex(index - 1);
      }
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animation.value,
      [-1, 0, 1],
      [height, 0, -height],
    );

    return {
      transform: [{ translateY }],
    };
  }, [animation]);

  return (
    <FlingGestureHandler
      key={'up'}
      direction={Directions.UP}
      onHandlerStateChange={e => onHandleStateChange('up', e)}>
      <FlingGestureHandler
        key={'down'}
        direction={Directions.DOWN}
        onHandlerStateChange={e => onHandleStateChange('down', e)}>
        <View style={styles.container}>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              { height: height * data.length },
              animatedStyle,
            ]}>
            {data.map((_, i) => {
              return (
                <View
                  key={i}
                  style={{
                    height,
                    backgroundColor:
                      i % 2 === 0 ? colors.lightBg : colors.darkBg,
                  }}
                />
              );
            })}
          </Animated.View>
          <View
            style={[
              styles.imageContainer,
              {
                backgroundColor:
                  index % 2 === 0 ? colors.darkBg : colors.lightBg,
              },
            ]}>
            <Image source={{ uri: data[index].image }} style={styles.image} />
          </View>
          <View style={styles.currentItemDetailsContainer}>
            <Title
              color={headingColor}
              index={index}
              text={data[index].title}
            />
            <Details color={color} index={index} />
            <Description
              index={index}
              text={data[index].description}
              color={headingColor}
            />
          </View>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {},
  image: {},
  currentItemDetailsContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-evenly',
  },
  itemContainer: {
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: 15,
    height: 26,
  },
  description: {
    fontSize: 16,
  },
  titleItem: {
    height: TITLE_SIZE * 3,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: TITLE_SIZE,
    fontWeight: '900',
  },
  detailsListContainer: {
    marginVertical: SPACING,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  detailsItem: {
    flex: 1,
    height: 26,
    justifyContent: 'center',
  },
  detailsItemText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
