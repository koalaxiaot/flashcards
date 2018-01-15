import React from 'react';
import { TouchableOpacity, Animated, StyleSheet, View, Button, Text, TouchableHighlight } from 'react-native';
import { today, setLocalNotification, clearLocalNotification } from '../utils/helpers';
import { NavigationActions } from 'react-navigation';
import { fetchHistory, addHistory } from '../utils/history';

export default class QuizScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      correctNum: 0,
      currentQuestion: 0,
      showAnswer: false,
      finish: false
    };
  }

  toggleAnswer = () => {
    this.setState(prevState => ({
      showAnswer: !prevState.showAnswer
    }));
  }

  retest = () => {
    this.setState({
      correctNum: 0,
      currentQuestion: 0,
      showAnswer: false,
      finish: false
    });
  }

  back = () => {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back());
  }

  nextQuestion = (isTrue) => {
    const { deck } = this.props.navigation.state.params;
    this.setState(prevState => {
      // if finish test
      if (prevState.currentQuestion + 1 === deck.questions.length) {
        clearLocalNotification().then(setLocalNotification);
        addHistory(today(), {
          title: deck.title,
          correct: isTrue ? prevState.correctNum + 1 : prevState.correctNum,
          total: deck.questions.length,
          time: (new Date()).toTimeString().split(' ')[0]
        });
        return {
          finish: true,
          correctNum: isTrue ? prevState.correctNum + 1 : prevState.correctNum,
          showAnswer: false
        }
      }
      // if not finish yet.
      return {
        currentQuestion: prevState.currentQuestion + 1,
        correctNum: isTrue ? prevState.correctNum + 1 : prevState.correctNum,
        showAnswer: false
      }
    });
  }

  render() {

    const { deck } = this.props.navigation.state.params;
    const { finish, correctNum, currentQuestion, showAnswer } = this.state;

    return (
      <View style={styles.container}>

        <View style={styles.nums}>
          <Text style={{ fontSize: 20 }}>{currentQuestion + 1} / {deck.questions.length}</Text>
        </View>

        {finish ?
          <View>
            <View style={[styles.nums, { alignItems: 'center' }]}>
              <Text style={{ fontSize: 20 }}>Correct: {correctNum}</Text>
              <Text style={{ fontSize: 20, color: '#e74c3c' }}>Incorrect: {deck.questions.length - correctNum}</Text>
            </View>
            <View style={styles.button}>
              <Button title='retest' onPress={this.retest} />
            </View>
            <View style={styles.button}>
              <Button title='go back' onPress={this.back} />
            </View>
          </View>
          :
          <View>
            <TouchableOpacity onPress={this.toggleAnswer} style={[styles.card, showAnswer ? styles.answerCard : null]}>
              {showAnswer ?
                <Text style={styles.cardFont}>{deck.questions[currentQuestion].answer}</Text>
                :
                <Text style={styles.cardFont}>{deck.questions[currentQuestion].question}</Text>
              }
            </TouchableOpacity>

            <View style={styles.button}>
              <Button title='correct' onPress={() => this.nextQuestion(true)} />
            </View>
            <View style={styles.button}>
              <Button color='#e74c3c' title='incorrect' onPress={() => this.nextQuestion(false)} />
            </View>

          </View>
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center'
  },
  nums: {
    margin: 20
  },
  card: {
    justifyContent: 'center',
    alignItems: 'stretch',
    width: 300,
    height: 200,
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: "#3498D8"
  },
  answerCard: {
    backgroundColor: "#2c3e50",
  },
  cardFont: {
    color: '#ECF0F1',
    padding: 30,
    fontSize: 16
  },
  next: {
    alignSelf: 'center',
    margin: 20
  },
  button: {
    margin: 10,
    paddingLeft: 80,
    paddingRight: 80
  }
});