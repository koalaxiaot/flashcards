import React from 'react';
import { StyleSheet, Keyboard, View, Button, Text, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions/index';
import { NavigationActions } from 'react-navigation';
import * as API from '../utils/api';

class AddCardScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: ''
    };
  }

  submit = () => {

    const { navigation, dispatch } = this.props;
    const { deck } = navigation.state.params;
    let { question, answer } = this.state;

    if (!question.trim() || !answer.trim()) {
      Alert.alert('ERROR', 'can not be null string!');
      return;
    }

    question = question.trim();
    answer = answer.trim();

    const newDeck = {
      [deck.title]: {
        title: deck.title,
        questions: [...deck.questions, { question, answer }]
      }
    };

    Keyboard.dismiss();
    dispatch(addCard(newDeck));
    API.addCard(newDeck);
    navigation.dispatch(NavigationActions.back());
  }

  onQchange = (question) => {
    this.setState({ question });
  }

  onAchange = (answer) => {
    this.setState({ answer });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput style={styles.input} placeholder="Question" onChangeText={this.onQchange} />
        <TextInput style={styles.input} placeholder="Answer" onChangeText={this.onAchange} />
        <View style={styles.button}>
          <Button title='Submit' onPress={this.submit} />
        </View>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  input: {
    padding: 15,
    fontSize: 20,
    margin: 20,
    marginTop: 40,
  },
  button: {
    margin: 20,
    padding: 10,
    alignItems: 'center'
  }
});

export default connect()(AddCardScreen);