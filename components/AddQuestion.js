import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { white, gray, black } from '../utils/colors';

export class NewDeck extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.state.params.title}`
  });

  constructor(props) {
    super(props);

    this.state = {
      question: 'question',
      answer: 'answer'
    };

    this._handleAddQuestion = this._handleAddQuestion.bind(this);
  }

  _handleAddQuestion() {
    const { title, addQuestion, navigation } = this.props;
    const { question, answer } = this.state;

    if (!answer || !question) {
      return;
    }

    const card = {
      question: question,
      answer: answer
    };

    addQuestion(title, card).then(() => navigation.goBack());
  }

  render() {
    const { question, answer } = this.state;

    return (
      <View style={styles.deckAddDeckContainer}>
        <Text style={styles.deckAddDeckTitle}>New Question</Text>
        <TextInput
          style={styles.deckAddDeckInput}
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
        />
        <TextInput
          style={styles.deckAddDeckInput}
          onChangeText={answer => this.setState({ answer })}
          value={this.state.answer}
        />
        <View style={styles.questionActionContainer}>
          <TouchableOpacity
            style={[styles.deckButton, styles.startQuizButton]}
            onPress={this._handleAddQuestion}
          >
            <Text style={[styles.submitBtnText, styles.startQuizButtonText]}>
              Add Question
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
    marginBottom: 20,
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

export default NewDeck;
