import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Button, Text } from 'react-native';

const DeckInfoScreen = ({ deck, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deck.title}</Text>
      <View style={styles.columnCnt}>
        <Text style={{ fontSize: 30 }}>{deck.questions.length}</Text>
        <Text style={styles.cards}>cards</Text>
      </View>
      <View style={styles.button}>
        <Button title='add card' onPress={() => navigation.navigate('AddCard', { deck })} />
      </View>
      {deck.questions.length > 0 &&
        <View style={styles.button}>
          <Button title='start quiz' onPress={() => navigation.navigate('Quiz', { deck })} />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 35,
    margin: 40,
  },
  columnCnt: {
    flexDirection: 'row',
    margin: 20
  },
  cards: {
    color: '#888',
    fontSize: 30,
    paddingLeft: 10
  },
  button: {
    margin: 20,
    width: 300
  }
});


const mapStateToProps = (decks, { navigation }) => ({
  deck: decks[navigation.state.params.deck.title]
});

export default connect(mapStateToProps)(DeckInfoScreen);