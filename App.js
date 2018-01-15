import React from 'react';
import { Constants } from 'expo';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import MainNavigator from './routes';
import store from './stores'
import { setLocalNotification } from './utils/helpers';

const FlashcardsStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
};

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FlashcardsStatusBar backgroundColor="#3498d8" barStyle="light-content" animated />
          <MainNavigator />
        </View>
      </Provider>
    );

  }

};