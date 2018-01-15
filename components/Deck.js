import React from 'react';
import { StyleSheet, Text, View, Button, TouchableNativeFeedback } from 'react-native';

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 150,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#abc",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1'
  },
  title: {
    fontSize: 30,
    marginBottom: 10
  },
  num: {
    fontSize: 20,
    color: '#245a91'
  }

});

export default Deck = ({ deck, navigation }) => {
  return (
    <TouchableNativeFeedback onPress={() => navigation.navigate('DeckInfo', { deck })}>
      <View style={styles.item}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.num}>{deck.questions.length} cards</Text>
      </View>
    </TouchableNativeFeedback>
  )
};