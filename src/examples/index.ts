import { FC } from 'react';

import AboutExample from './AboutExample';
import AmountExample from './AmountExample';
import AnimatableRefExample from './AnimatableRefExample';
import AnimatedKeyboardExample from './AnimatedKeyboardExample';
import AnimatedSensorAccelerometerExample from './AnimatedSensorAccelerometerExample';
import AnimatedSensorGravityExample from './AnimatedSensorGravityExample';
import AnimatedSensorGyroscopeExample from './AnimatedSensorGyroscopeExample';
import AnimatedSensorMagneticFieldExample from './AnimatedSensorMagneticFieldExample';
import AnimatedSensorRotationExample from './AnimatedSensorRotationExample';
import AnimatedStyleUpdateExample from './AnimatedStyleUpdateExample';
import AnimatedTabBarExample from './AnimatedTabBarExample';
import AnimatedTabsIndicator from './AnimatedTabsIndicator';
import AnimatedTextWidthExample from './AnimatedTextWidthExample';
import ArticleProgressExample from './ArticleProgressExample';
import BabelVersionCheckExample from './BabelVersionCheckExample';
import BokehExample from './BokehExample';
import BouncingBoxExample from './BouncingBoxExample';
import BubblesExample from './BubblesExample';
import ChatHeadsExample from './ChatHeadsExample';
import ChessExample from './ChessExample';
import ChessboardExample from './ChessboardExample';
import ColorExample from './ColorExample';
import ColorInterpolationExample from './ColorInterpolationExample';
import CounterExample from './CounterExample';
import CubesExample from './CubesExample';
import CustomDrawer from './CustomDrawer';
import PagerExample from './CustomHandler/PagerExample';
import DispatchCommandExample from './DispatchCommandExample';
import DragAndSnapExample from './DragAndSnapExample';
import EmojiWaterfallExample from './EmojiWaterfallExample';
import EmptyExample from './EmptyExample';
import ExtrapolationExample from './ExtrapolationExample';
import FrameCallbackExample from './FrameCallbackExample';
import GestureHandlerExample from './GestureHandlerExample';
import GetViewPropExample from './GetViewPropExample';
import IPodExample from './IPodExample';
import InvertedFlatListExample from './InvertedFlatListExample';
import JSPropsExample from './JSPropsExample';
import AnimatedListExample from './LayoutAnimations/AnimatedList';
import BasicLayoutAnimation from './LayoutAnimations/BasicLayoutAnimation';
import BasicNestedAnimation from './LayoutAnimations/BasicNestedAnimation';
import BasicNestedLayoutAnimation from './LayoutAnimations/BasicNestedLayoutAnimation';
import Carousel from './LayoutAnimations/Carousel';
import ChangeThemeExample from './LayoutAnimations/ChangeTheme';
import CombinedTest from './LayoutAnimations/Combined';
import CustomLayoutAnimationScreen from './LayoutAnimations/CustomLayout';
import DefaultAnimations from './LayoutAnimations/DefaultAnimations';
import DeleteAncestorOfExiting from './LayoutAnimations/DeleteAncestorOfExiting';
import FlatListSkipEnteringExiting from './LayoutAnimations/FlatListSkipEnteringExiting';
import HabitsExample from './LayoutAnimations/HabitsExample';
import KeyframeAnimation from './LayoutAnimations/KeyframeAnimation';
import Modal from './LayoutAnimations/Modal';
import ModalNewAPI from './LayoutAnimations/ModalNewAPI';
import MountingUnmounting from './LayoutAnimations/MountingUnmounting';
import NativeModals from './LayoutAnimations/NativeModals';
import NestedTest from './LayoutAnimations/Nested';
import NestedLayoutAnimationConfig from './LayoutAnimations/NestedLayoutAnimationConfig';
import NestedNativeStacksWithLayout from './LayoutAnimations/NestedNativeStacksWithLayout';
import OlympicAnimation from './LayoutAnimations/OlympicAnimation';
import ReactionsCounterExample from './LayoutAnimations/ReactionsCounterExample';
import ReducedMotionLayoutExample from './LayoutAnimations/ReducedMotionLayoutExample';
import SpringLayoutAnimation from './LayoutAnimations/SpringLayoutAnimation';
import SwipeableList from './LayoutAnimations/SwipeableList';
import WaterfallGridExample from './LayoutAnimations/WaterfallGridExample';
import LettersExample from './LettersExample';
import LightBoxExample from './LightBoxExample';
import LiquidSwipe from './LiquidSwipe/LiquidSwipe';
import LogExample from './LogExample';
import MatrixTransform from './MatrixTransform';
import MeasureExample from './MeasureExample';
import ModifyExample from './ModifyExample';
import NewestShadowNodesRegistryRemoveExample from './NewestShadowNodesRegistryRemoveExample';
import NonLayoutPropAndRenderExample from './NonLayoutPropAndRenderExample';
import OldAnimatedSensorExample from './OldAnimatedSensorExample';
import OldMeasureExample from './OldMeasureExample';
import OverFlowItems from './OverFlowItems';
import OverlappingBoxesExample from './OverlappingBoxesExample';
import ParallaxCarousel from './ParallaxCarousel';
import PendulumExample from './PendulumExample';
import PinExample from './PinExample';
import PlanetsExample from './PlanetsExample';
import RainbowExample from './RainbowExample';
import ReducedMotionExample from './ReducedMotionExample';
import RefExample from './RefExample';
import ScreenStackExample from './ScreenStackExample';
import ScreenStackHeaderConfigBackgroundColorExample from './ScreenStackHeaderConfigBackgroundColorExample';
import ScrollEventExample from './ScrollEventExample';
import ScrollToExample from './ScrollToExample';
import ScrollViewExample from './ScrollViewExample';
import ScrollViewOffsetExample from './ScrollViewOffsetExample';
import ScrollableViewExample from './ScrollableViewExample';
import SetNativePropsExample from './SetNativePropsExample';
import ShareablesExample from './ShareablesExample';
import CardExample from './SharedElementTransitions/Card';
import CustomTransitionExample from './SharedElementTransitions/CustomTransition';
import DuplicateTagsExample from './SharedElementTransitions/DuplicateTags';
import FlatListExample from './SharedElementTransitions/FlatList';
import GalleryExample from './SharedElementTransitions/Gallery';
import ImageStackExample from './SharedElementTransitions/ImageStack';
import LayoutAnimationExample from './SharedElementTransitions/LayoutAnimation';
import ManyScreensExample from './SharedElementTransitions/ManyScreens';
import ManyTagsExample from './SharedElementTransitions/ManyTags';
import ModalsExample from './SharedElementTransitions/Modals';
import NestedStacksExample from './SharedElementTransitions/NestedStacks';
import ProfilesExample from './SharedElementTransitions/Profiles';
import ProgressTransitionExample from './SharedElementTransitions/ProgressTransition';
import ReducedMotionSharedExample from './SharedElementTransitions/ReducedMotionSharedExample';
import RestoreStateExample from './SharedElementTransitions/RestoreState';
import TransitionRestartExample from './SharedElementTransitions/TransitionRestart';
import SharedStyleExample from './SharedStyleExample';
import SlickCarouselFlatList from './SlickCarouselFlatList';
import SvgExample from './SvgExample';
import SwipeableListExample from './SwipeableListExample';
import TransformExample from './TransformExample';
import UpdatePropsPerfExample from './UpdatePropsPerfExample';
import VolumeExample from './VolumeExample';
import WheelOfFortune from './WheelOfFortune';
import WidthExample from './WidthExample';
import WithClampExample from './WithClampExample';
import WithoutBabelPluginExample from './WithoutBabelPluginExample';
import WobbleExample from './WobbleExample';
import WorkletExample from './WorkletExample';
import WorkletFactoryCrash from './WorkletFactoryCrashExample';
import WorkletRuntimeExample from './WorkletRuntimeExample';

interface Example {
  icon?: string;
  title: string;
  screen: FC;
}

export const EXAMPLES: Record<string, Example> = {
  // Custom animations

  ParallaxCarousel: {
    icon: '🌀',
    title: 'Parallax Carousel',
    screen: ParallaxCarousel,
  },

  AnimatedTabsIndicator: {
    icon: '➗',
    title: 'Animated tabs indicator',
    screen: AnimatedTabsIndicator,
  },

  SlickCarouselFlatList: {
    icon: '🧩',
    title: 'Slick carousel FlatList',
    screen: SlickCarouselFlatList,
  },

  WheelOfFortune: {
    icon: '🎰',
    title: 'Wheel of fortune',
    screen: WheelOfFortune,
  },

  CustomDrawer: {
    icon: '📝',
    title: 'Custom drawer',
    screen: CustomDrawer,
  },

  OverFlowItems: {
    title: 'Over Flow Items',
    icon: '📦',
    screen: OverFlowItems,
  },

  // Empty example for test purposes

  EmptyExample: {
    icon: '👻',
    title: 'Empty',
    screen: EmptyExample,
  },
  WorkletRuntimeExample: {
    icon: '🏃‍♂️',
    title: 'Worklet runtime',
    screen: WorkletRuntimeExample,
  },
  ShareablesExample: {
    icon: '🖇',
    title: 'Shareables',
    screen: ShareablesExample,
  },
  ModifyExample: {
    icon: '🪛',
    title: 'Modify',
    screen: ModifyExample,
  },
  JSPropsExample: {
    icon: '🟨',
    title: 'JS props',
    screen: JSPropsExample,
  },

  // About

  AboutExample: {
    icon: 'ℹ️',
    title: 'About',
    screen: AboutExample,
  },

  // Showcase

  BokehExample: {
    icon: '✨',
    title: 'Bokeh',
    screen: BokehExample,
  },
  BubblesExample: {
    icon: '🫧',
    title: 'Bubbles',
    screen: BubblesExample,
  },
  IPodExample: {
    icon: '🎧',
    title: 'iPod',
    screen: IPodExample,
  },
  EmojiWaterfallExample: {
    icon: '💸',
    title: 'Emoji waterfall',
    screen: EmojiWaterfallExample,
  },
  LightBoxExample: {
    icon: '📷',
    title: 'Camera roll',
    screen: LightBoxExample,
  },
  LiquidSwipe: {
    icon: '♠️',
    title: 'Liquid swipe',
    screen: LiquidSwipe,
  },
  SwipeableListExample: {
    icon: '📞',
    title: 'Swipeable list',
    screen: SwipeableListExample,
  },
  ArticleProgressExample: {
    icon: '📰',
    title: 'Article progress',
    screen: ArticleProgressExample,
  },
  LettersExample: {
    icon: '📖',
    title: 'Letters',
    screen: LettersExample,
  },
  SetNativePropsExample: {
    icon: '🪄',
    title: 'setNativeProps',
    screen: SetNativePropsExample,
  },
  UpdatePropsPerfExample: {
    icon: '🏎️',
    title: 'Update props performance',
    screen: UpdatePropsPerfExample,
  },

  // Basic examples

  AnimatableRefExample: {
    icon: '⏬',
    title: 'Animate inner component',
    screen: AnimatableRefExample,
  },
  AmountExample: {
    icon: '📈',
    title: 'Amount',
    screen: AmountExample,
  },
  CounterExample: {
    icon: '🎰',
    title: 'Counter',
    screen: CounterExample,
  },
  AnimatedTextWidthExample: {
    icon: '✂️',
    title: 'Animate text width',
    screen: AnimatedTextWidthExample,
  },
  ColorExample: {
    icon: '🌈',
    title: 'Animate colors',
    screen: ColorExample,
  },
  ScreenStackHeaderConfigBackgroundColorExample: {
    icon: '🎨',
    title: 'Screen header background color',
    screen: ScreenStackHeaderConfigBackgroundColorExample,
  },
  ScreenStackExample: {
    icon: '🥞',
    title: 'Screen stack',
    screen: ScreenStackExample,
  },
  GestureHandlerExample: {
    icon: '👌',
    title: 'Draggable circle',
    screen: GestureHandlerExample,
  },
  SvgExample: {
    icon: '🟢',
    title: 'Animated SVG circle',
    screen: SvgExample,
  },
  PlanetsExample: {
    icon: '🪐',
    title: 'Planets',
    screen: PlanetsExample,
  },
  BouncingBoxExample: {
    icon: '📦',
    title: 'Bouncing box',
    screen: BouncingBoxExample,
  },
  AnimatedKeyboardExample: {
    icon: '⌨️',
    title: 'useAnimatedKeyboard',
    screen: AnimatedKeyboardExample,
  },
  AnimatedSensorAccelerometerExample: {
    icon: '🚀',
    title: 'useAnimatedSensor - accelerometer',
    screen: AnimatedSensorAccelerometerExample,
  },
  AnimatedSensorGyroscopeExample: {
    icon: '⚖️',
    title: 'useAnimatedSensor - gyroscope',
    screen: AnimatedSensorGyroscopeExample,
  },
  AnimatedSensorGravityExample: {
    icon: '🌎',
    title: 'useAnimatedSensor - gravity',
    screen: AnimatedSensorGravityExample,
  },
  AnimatedSensorMagneticFieldExample: {
    icon: '🧲',
    title: 'useAnimatedSensor - magnetic field',
    screen: AnimatedSensorMagneticFieldExample,
  },
  AnimatedSensorRotationExample: {
    icon: '🔄',
    title: 'useAnimatedSensor - rotation',
    screen: AnimatedSensorRotationExample,
  },
  FrameCallbackExample: {
    icon: '🗣',
    title: 'useFrameCallback',
    screen: FrameCallbackExample,
  },
  ScrollViewExample: {
    icon: '📜',
    title: 'useAnimatedScrollHandler',
    screen: ScrollViewExample,
  },
  ScrollToExample: {
    icon: '🦘',
    title: 'scrollTo',
    screen: ScrollToExample,
  },
  ScrollViewOffsetExample: {
    icon: '𝌍',
    title: 'useScrollViewOffset',
    screen: ScrollViewOffsetExample,
  },
  DispatchCommandExample: {
    icon: '🫡',
    title: 'Dispatch command',
    screen: DispatchCommandExample,
  },
  MeasureExample: {
    icon: '📐',
    title: 'measure',
    screen: MeasureExample,
  },
  WorkletExample: {
    icon: '🧵',
    title: 'runOnJS / runOnUI',
    screen: WorkletExample,
  },
  BabelVersionCheckExample: {
    icon: '📦',
    title: 'Babel version check',
    screen: BabelVersionCheckExample,
  },
  TransformExample: {
    icon: '🔄',
    title: 'Transform',
    screen: TransformExample,
  },
  WidthExample: {
    icon: '🌲',
    title: 'Layout props',
    screen: WidthExample,
  },
  NonLayoutPropAndRenderExample: {
    icon: '🎭',
    title: 'Non-layout prop and render example',
    screen: NonLayoutPropAndRenderExample,
  },
  RefExample: {
    icon: '🦑',
    title: 'forwardRef & useImperativeHandle',
    screen: RefExample,
  },
  ChessExample: {
    icon: '♟️',
    title: 'Chess',
    screen: ChessExample,
  },
  ChessboardExample: {
    icon: '♟️',
    title: 'Chessboard',
    screen: ChessboardExample,
  },
  OverlappingBoxesExample: {
    icon: '🔝',
    title: 'z-index & elevation',
    screen: OverlappingBoxesExample,
  },
  NewestShadowNodesRegistryRemoveExample: {
    icon: '🌓',
    title: 'Conditional',
    screen: NewestShadowNodesRegistryRemoveExample,
  },
  RainbowExample: {
    icon: '🌈',
    title: 'Rainbow',
    screen: RainbowExample,
  },
  WithoutBabelPluginExample: {
    icon: '🔌',
    title: 'Without Babel plugin',
    screen: WithoutBabelPluginExample,
  },
  GalleryExample: {
    icon: '🇮🇹',
    title: 'Gallery',
    screen: GalleryExample,
  },
  ProfilesExample: {
    icon: '🙆‍♂️',
    title: 'Profiles',
    screen: ProfilesExample,
  },
  VolumeExample: {
    icon: '🎧',
    title: 'Volume slider & sensor',
    screen: VolumeExample,
  },
  ProgressTransitionExample: {
    icon: '☕',
    title: 'Progress transition',
    screen: ProgressTransitionExample,
  },
  MatrixExample: {
    icon: '🧮',
    title: 'useAnimatedStyle with matrix',
    screen: MatrixTransform,
  },
  SpringExample: {
    icon: '🕰',
    title: 'Pendulum example',
    screen: PendulumExample,
  },
  SpringClampExample: {
    icon: '🗜',
    title: 'Spring with Clamp',
    screen: WithClampExample,
  },
  ReducedMotionExample: {
    icon: '⏸️',
    title: 'Reduced Motion',
    screen: ReducedMotionExample,
  },
  GetViewPropExample: {
    icon: '🔎',
    title: 'getViewProp',
    screen: GetViewPropExample,
  },
  LogExample: {
    icon: '⌨',
    title: 'Log test',
    screen: LogExample,
  },
  WorkletFactoryCrash: {
    icon: '🏭',
    title: 'Worklet factory crash',
    screen: WorkletFactoryCrash,
  },
  HabitsExample: {
    icon: '🧑‍💻',
    title: 'Habits',
    screen: HabitsExample,
  },

  // Old examples

  AnimatedStyleUpdateExample: {
    title: 'Animated style update',
    screen: AnimatedStyleUpdateExample,
  },
  SharedStyleExample: {
    title: 'Shared style',
    screen: SharedStyleExample,
  },
  AnimatedTabBarExample: {
    title: 'Tab bar',
    screen: AnimatedTabBarExample,
  },
  ChatHeadsExample: {
    title: 'Chat heads',
    screen: ChatHeadsExample,
  },
  CubesExample: {
    title: 'Cubes',
    screen: CubesExample,
  },
  DragAndSnapExample: {
    title: 'Drag and snap',
    screen: DragAndSnapExample,
  },
  ColorInterpolationExample: {
    title: 'Color interpolation',
    screen: ColorInterpolationExample,
  },
  ExtrapolationExample: {
    title: 'Extrapolation example',
    screen: ExtrapolationExample,
  },
  InvertedFlatListExample: {
    title: 'Inverted FlatList example',
    screen: InvertedFlatListExample,
  },
  OldAnimatedSensorExample: {
    title: 'Old animated sensor example',
    screen: OldAnimatedSensorExample,
  },
  OldMeasureExample: {
    title: 'Accordion',
    screen: OldMeasureExample,
  },
  PinExample: {
    title: 'PIN example',
    screen: PinExample,
  },
  ScrollableViewExample: {
    title: 'Scrollable view example',
    screen: ScrollableViewExample,
  },
  ScrollEventExample: {
    title: 'Scroll event example',
    screen: ScrollEventExample,
  },
  WobbleExample: {
    title: 'Wobble example',
    screen: WobbleExample,
  },
  PagerExample: {
    title: 'Pager example',
    screen: PagerExample,
  },

  // Layout Animations

  DeleteAncestorOfExiting: {
    title: '[LA] Deleting view with an exiting animation',
    screen: DeleteAncestorOfExiting,
  },
  NestedNativeStacksWithLayout: {
    title: '[LA] Nested NativeStacks with layout',
    screen: NestedNativeStacksWithLayout,
  },
  BasicLayoutAnimation: {
    title: '[LA] Basic layout animation',
    screen: BasicLayoutAnimation,
  },
  BasicNestedAnimation: {
    title: '[LA] Basic nested animation',
    screen: BasicNestedAnimation,
  },
  BasicNestedLayoutAnimation: {
    title: '[LA] Basic nested layout animation',
    screen: BasicNestedLayoutAnimation,
  },
  NestedLayoutAnimations: {
    title: '[LA] Nested layout animations',
    screen: NestedTest,
  },
  CombinedLayoutAnimations: {
    title: '[LA] Entering and Exiting with Layout',
    screen: CombinedTest,
  },
  DefaultAnimations: {
    title: '[LA] Default layout animations',
    screen: DefaultAnimations,
  },
  DefaultTransitions: {
    title: '[LA] Default layout transitions',
    screen: WaterfallGridExample,
  },
  KeyframeAnimation: {
    title: '[LA] Keyframe animation',
    screen: KeyframeAnimation,
  },
  ParticipantList: {
    title: '[LA] Participant List',
    screen: AnimatedListExample,
  },
  OlympicAnimation: {
    title: '[LA] Olympic animation',
    screen: OlympicAnimation,
  },
  CustomLayoutAnimation: {
    title: '[LA] Custom layout animation',
    screen: CustomLayoutAnimationScreen,
  },
  ModalNewAPI: {
    title: '[LA] ModalNewAPI',
    screen: ModalNewAPI,
  },
  SpringLayoutAnimation: {
    title: '[LA] Spring Layout Animation',
    screen: SpringLayoutAnimation,
  },
  MountingUnmounting: {
    title: '[LA] Mounting Unmounting',
    screen: MountingUnmounting,
  },
  ReactionsCounterExample: {
    title: '[LA] Reactions counter',
    screen: ReactionsCounterExample,
  },
  SwipeableList: {
    title: '[LA] Swipeable list',
    screen: SwipeableList,
  },
  Modal: {
    title: '[LA] Modal',
    screen: Modal,
  },
  NativeModals: {
    title: '[LA] Native modals (RN and Screens)',
    screen: NativeModals,
  },
  Carousel: {
    title: '[LA] Carousel',
    screen: Carousel,
  },
  ReducedMotionLayoutExample: {
    title: '[LA] Reduced Motion',
    screen: ReducedMotionLayoutExample,
  },
  NestedLayoutAnimationConfig: {
    title: '[LA] Nested LayoutAnimationConfig',
    screen: NestedLayoutAnimationConfig,
  },
  FlatListSkipEnteringExiting: {
    title: '[LA] FlatList skip entering & exiting',
    screen: FlatListSkipEnteringExiting,
  },
  ChangeTheme: {
    title: '[LA] Change theme',
    screen: ChangeThemeExample,
  },

  // Shared Element Transitions

  CardExample: {
    title: '[SET] Card',
    screen: CardExample,
  },
  CustomTransitionExample: {
    title: '[SET] Custom transition',
    screen: CustomTransitionExample,
  },
  LayoutAnimationExample: {
    title: '[SET] Layout Animation',
    screen: LayoutAnimationExample,
  },
  ManyScreensExample: {
    title: '[SET] Many screens',
    screen: ManyScreensExample,
  },
  ManyTagsExample: {
    title: '[SET] Many tags',
    screen: ManyTagsExample,
  },
  NestedStacksExample: {
    title: '[SET] Nested stacks',
    screen: NestedStacksExample,
  },
  ModalsExample: {
    title: '[SET] Modals',
    screen: ModalsExample,
  },
  FlatListExample: {
    title: '[SET] FlatList',
    screen: FlatListExample,
  },
  ImageStackExample: {
    title: '[SET] Image Stack',
    screen: ImageStackExample,
  },
  RestoreStateExample: {
    title: '[SET] Restore State',
    screen: RestoreStateExample,
  },
  DuplicateTagsExample: {
    title: '[SET] Duplicate Tags',
    screen: DuplicateTagsExample,
  },
  ReducedMotionSharedExample: {
    title: '[SET] Reduced Motion',
    screen: ReducedMotionSharedExample,
  },
  TransitionRestartExample: {
    title: '[SET] Transition Restart',
    screen: TransitionRestartExample,
  },
} as const;
