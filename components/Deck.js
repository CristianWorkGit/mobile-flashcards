import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { white, gray, black } from '../utils/colors';

export class Deck extends Component {
  render() {
    const { deck, onPressDeck } = this.props;

    return (
      <View style={styles.deckContainer}>
        <TouchableOpacity onPress={onPressDeck}>
          <View style={styles.deckCard}>
            <Text style={styles.deckTitle}>{deck.title}</Text>
            <Text style={styles.deckQuestions}>
              {deck.questions.length} card{deck.questions.length > 1 ? 's' : ''}{' '}
              on this deck
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20
  },
  deckCard: {
    flex: 1,
    height: 100,
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: gray,
    backgroundColor: white,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  deckTitle: {
    flex: 1,
    color: black,
    fontSize: 15
  },
  deckQuestions: {
    flex: 1,
    color: black,
    fontSize: 10
  }
});

export default Deck;
