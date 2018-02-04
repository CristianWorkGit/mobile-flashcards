import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { white, gray, black } from '../utils/colors';

class AddDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };

    this._handleAddDeck = this._handleAddDeck.bind(this);
  }

  _handleAddDeck() {
    const { addDeck, navigation } = this.props;
    const { title } = this.state;

    if (!title || !title.length) {
      return;
    }

    addDeck(title)
      .then(() => navigation.navigate('Home'))
      .then(() => navigation.navigate('DeckDetail', { title }));
  }

  render() {
    return (
      <View style={styles.deckAddDeckContainer}>
        <Text style={styles.deckAddDeckTitle}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.deckAddDeckInput}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />
        <View style={styles.questionActionContainer}>
          <TouchableOpacity
            style={[styles.deckButton, styles.startQuizButton]}
            onPress={this._handleAddDeck}
          >
            <Text style={[styles.submitBtnText, styles.startQuizButtonText]}>
              Add Deck
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckAddDeckContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: white
  },
  deckAddDeckTitle: {
    flex: 1,
    alignItems: 'center',
    fontSize: 35,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50
  },
  deckAddDeckInput: {
    borderColor: black,
    color: black,
    borderWidth: 1,
    height: 40,
    width: 260,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderRadius: 3
  },
  questionActionContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  submitBtnText: {
    color: black,
    fontSize: 17,
    textAlign: 'center'
  },
  deckButton: {
    backgroundColor: white,
    padding: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: gray,
    height: 40,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  },
  startQuizButton: {
    backgroundColor: black
  },
  startQuizButtonText: {
    color: white
  }
});

export default AddDeck;
