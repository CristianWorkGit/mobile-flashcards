import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { white } from '../utils/colors';

import Deck from './Deck';

class Decks extends Component {
  componentDidMount() {
    const { getDecks } = this.props;

    getDecks();
  }

  _keyExtractor = (item, index) => {
    return index;
  };

  _handleOnPress = deck => {
    const { navigation } = this.props;

    navigation.navigate('DeckDetail', { title: deck.title });
  };

  render() {
    const { decks, navigation } = this.props;

    const hasDecks = decks && Object.keys(decks).length > 0;

    if (!hasDecks) {
      return (
        <View style={styles.center}>
          <Foundation name="alert" size={50} />
          <Text>You don't have any deck on the system</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <Deck onPressDeck={() => this._handleOnPress(item)} deck={item} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: white,
    marginTop: 20
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  }
});

export default Decks;
