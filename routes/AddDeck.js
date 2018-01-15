import React from 'react';
import { Keyboard, FlatList, View, Button, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions/index';
import { NavigationActions } from 'react-navigation';
import * as API from '../utils/api';

class AddDeckScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      deck_name: ''
    }
  }

  submit = () => {

    let { deck_name } = this.state;
    const { dispatch, navigation } = this.props;

    if (!deck_name.trim()) {
      Alert.alert('ERROR', 'Deck name can not be null string!');
      return;
    }

    deck_name = deck_name.trim();

    const deck = {
      [deck_name]: {
        title: deck_name,
        questions: []
      }
    };

    Keyboard.dismiss();
    dispatch(addDeck(deck));
    API.addDeck(deck);
    navigation.dispatch(NavigationActions.back());
  }

  textChange = (deck_name) => {
    this.setState({
      deck_name
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>What is the title of you new deck:</Text>
        <TextInput style={styles.input} autoFocus placeholder='New Deck Name' value={this.state.deck_name} onChangeText={this.textChange} />
        <View style={styles.button}>
          <Button title='Submit' onPress={this.submit} />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    padding: 20
  },
  input: {
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 20,
    width: 300
  },

});

export default connect()(AddDeckScreen);