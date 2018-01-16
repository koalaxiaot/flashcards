import React from 'react';
import { FlatList, Alert, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import Deck from '../components/Deck';
import { receiveDecks } from '../actions';
import { fetchAll } from '../utils/api';
import { obj2arr, customNotification } from '../utils/helpers';

class HomeScreen extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    fetchAll().then(decks => dispatch(receiveDecks(decks)));
  }

  render() {
    const { navigation, decks, dispatch } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.calendarV}>
          <Button title='toggle notification (1 minute)' onPress={() => customNotification(1)} />
          <TouchableOpacity onPress={() => this.props.navigation.navigate('History')}>
            <FontAwesome style={styles.calendar} name='calendar' />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
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
  headerRight: <View style={{ marginRight: 15 }}>
    <Button title='add deck' onPress={() => navigation.navigate('AddDeck')} />
  </View>
});

const styles = StyleSheet.create({
  calendarV: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
    marginBottom: 5,
  },
  calendar: {
    fontSize: 30,
    color: '#245a91'
  }
});

const mapStateToDispatch = decks => ({
  decks
});

export default connect(mapStateToDispatch)(HomeScreen);