import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { today } from '../utils/helpers';
import { fetchHistory, initHistory } from '../utils/history';

export default class AgendaScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: {}
    };
  }

  componentDidMount() {
    fetchHistory().then(history => {
      this.setState({ history: { ...initHistory(), ...history } });
    })
  }

  render() {
    return (
      <Agenda
        items={this.state.history}
        selected={today(-2)}
        maxDate={today()}
        minDate={'2018-01-13'}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
      />
    );
  }

  renderItem = item => {
    return (
      <View style={styles.item}>
        <Text>{item.title} @ {item.time}</Text>
        <Text>
          <Text style={{ color: item.correct === item.total ? 'green' : 'red' }}>{item.correct}</Text> / {item.total}
        </Text>
      </View>
    );
  }

  renderEmptyDate = () => <View style={styles.emptyDate}><Text>No quiz score today!</Text></View>
  timeToString = time => (new Date(time)).toISOString().split('T')[0];
  rowHasChanged = (r1, r2) => r1.title !== r2.title;

}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 15
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});