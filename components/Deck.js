import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default Deck = ({ deck, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('DeckInfo', { deck })} style={{ margin: 25 }}>
      <View style={styles.item}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.num}>{deck.questions.length} cards</Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
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