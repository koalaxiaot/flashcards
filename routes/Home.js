import React from 'react';
import { FlatList, TouchableNativeFeedback, Alert, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Deck from '../components/Deck';
import { receiveDecks } from '../actions';
import { fetchAll } from '../utils/api';
import { obj2arr } from '../utils/helpers';
import { FontAwesome } from '@expo/vector-icons';

class HomeScreen extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    fetchAll().then(decks => dispatch(receiveDecks(decks)));
  }

  render() {
    const { navigation, decks, dispatch } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.calendarV}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('History')}>
            <FontAwesome style={styles.calendar} name='calendar' />
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={obj2arr(decks)}
            renderItem={({ item }) => <Deck deck={item} navigation={navigation} />}
          />
        </View>
      </View>
    );
  }
};

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: 'Home',
  headerRight: <View style={styles.headerBtn}>
    <Button title='add deck' onPress={() => navigation.navigate('AddDeck')} />
  </View>
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerBtn: {
    marginRight: 15
  },
  calendarV: {
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: 20,
    marginBottom: 5
  },
  calendar: {
    fontSize: 30,
    color: '#245a91'
  },
  list: {
    flex: 1
  }
});

const mapStateToDispatch = (decks) => ({
  decks
});

export default connect(mapStateToDispatch)(HomeScreen);