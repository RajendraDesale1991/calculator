/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'

import Calc from './screens/Calc'
import History from './screens/History'
import Feedback from './screens/Feedback'
import Help from './screens/Help'

import { fromTop, zoomIn } from 'react-navigation-transitions'

export default class App extends Component {

  render() {

    return (
      <AppContainer />
    );

  }

}

const handleTransition = ({ scenes }) => {
  const prevScene = scenes[0];
  const nextScene = scenes[1];

  // Custom transitions go there
  if (prevScene
    && prevScene.route.routeName === 'Home'
    && nextScene.route.routeName === 'History') {
    return fromTop(2000);
  } else {
    return zoomIn();
  }
}

const AppStackNavigator = createStackNavigator({
  Home: { screen: Calc },
  History: { screen: History },
  Feedback: { screen: Feedback },
  Help: { screen: Help },
},
  {
    headerMode: 'none',
  },
  {
    transitionConfig: () => handleTransition()
  },
  {
    initialRouteName: 'Home',
  });

const AppContainer = createAppContainer(AppStackNavigator);
