import React from 'react';
import { View, Platform, StatusBar, StyleSheet, Text } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { gray, white, black } from './utils/colors';
import { setLocalNotification } from './utils/notifications';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Constants } from 'expo';
import thunk from 'redux-thunk';
import Decks from './containers/Decks';
import DeckDetail from './containers/DeckDetail';
import AddDeck from './containers/AddDeck';
import AddQuestion from './containers/AddQuestion';
import Quiz from './containers/Quiz';
import reducer from './reducers';

function FlashCardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = TabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="cards-outline"
            size={30}
            color={tintColor}
          />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="add-to-photos" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? black : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : black,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator(
  {
    Home: {
      screen: Tabs
    },
    DeckDetail: {
      screen: DeckDetail
    },
    AddQuestion: {
      screen: AddQuestion
    },
    Quiz: {
      screen: Quiz
    }
  },
  {
    navigationOptions: {
      headerBackTitle: 'Back',
      headerTintColor: white,
      headerBackTitleStyle: {
        color: white
      },
      headerStyle: {
        paddingTop: 0,
        borderBottomColor: white,
        backgroundColor: black
      }
    }
  }
);

const store = createStore(reducer, compose(applyMiddleware(thunk)));

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FlashCardsStatusBar
            backgroundColor={black}
            barStyle="light-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
