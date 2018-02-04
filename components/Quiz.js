import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { white, gray, black, red, green } from '../utils/colors';

export class Quiz extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.state.params.title}`
  });

  constructor(props) {
    super(props);

    this.state = {
      wrongAnswers: 0,
      correctAnswers: 0,
      currentQuestion: 0,
      showAnswer: true
    };

    this._onPressWrongAnswer = this._onPressWrongAnswer.bind(this);
    this._onPressCorrectAnswer = this._onPressCorrectAnswer.bind(this);

    this._onPressRestart = this._onPressRestart.bind(this);
    this._onPressFinish = this._onPressFinish.bind(this);

    this._onPressShowAnswer = this._onPressShowAnswer.bind(this);
  }

  _onPressCorrectAnswer() {
    const { correctAnswers, currentQuestion } = this.state;
    this.setState({
      correctAnswers: correctAnswers + 1,
      currentQuestion: currentQuestion + 1,
      showAnswer: true
    });
  }

  _onPressWrongAnswer() {
    const { wrongAnswers, currentQuestion } = this.state;
    this.setState({
      wrongAnswers: wrongAnswers + 1,
      currentQuestion: currentQuestion + 1,
      showAnswer: true
    });
  }

  _onPressRestart() {
    this.setState({ wrongAnswers: 0, currentQuestion: 0, correctAnswers: 0 });
  }

  _onPressFinish() {
    const { navigation } = this.props;
    this.setState({ wrongAnswers: 0, currentQuestion: 0, correctAnswers: 0 });
    navigation.goBack();
  }

  _onPressShowAnswer() {
    const { showAnswer } = this.state;
    this.setState({ showAnswer: !showAnswer });
  }

  render() {
    const { questions } = this.props;
    const {
      currentQuestion,
      wrongAnswers,
      correctAnswers,
      showAnswer
    } = this.state;

    const leftQuestions = questions.length - currentQuestion;

    const progress = `${currentQuestion + 1}/${questions.length}`;
    const percentageCorrect = Math.floor(
      correctAnswers / questions.length * 100
    ).toFixed(2);
    const hasMoreQuestions = currentQuestion < questions.length;
    const { question, answer } = hasMoreQuestions
      ? questions[currentQuestion]
      : {};

    if (!hasMoreQuestions) {
      return (
        <View style={styles.deckAddDeckContainer}>
          <Text
            style={styles.deckAddDeckTitle}
          >{`You got ${percentageCorrect}% right!`}</Text>
          <View style={styles.questionActionContainer}>
            <TouchableOpacity
              style={styles.deckButton}
              onPress={this._onPressRestart}
            >
              <Text style={styles.submitBtnText}>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.deckButton, styles.startQuizButton]}
              onPress={this._onPressFinish}
            >
              <Text style={[styles.submitBtnText, styles.startQuizButtonText]}>
                Finish
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.deckAddDeckContainer}>
        <Text style={styles.deckProgress}>{progress}</Text>
        <Text style={styles.deckAddDeckTitle}>
          {showAnswer ? question : answer}
        </Text>
        <View style={styles.questionActionContainer}>
          <TouchableOpacity
            style={styles.deckButton}
            onPress={this._onPressShowAnswer}
          >
            <Text style={styles.submitBtnText}>
              {showAnswer ? 'View answer' : 'View question'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.deckButton, styles.correctButton]}
            onPress={this._onPressCorrectAnswer}
          >
            <Text style={[styles.submitBtnText, styles.startQuizButtonText]}>
              Correct
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.deckButton, styles.wrongButton]}
            onPress={this._onPressWrongAnswer}
          >
            <Text style={[styles.submitBtnText, styles.startQuizButtonText]}>
              Wrong
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
  deckProgress: {
    flex: 1,
    alignItems: 'center',
    fontSize: 12
  },
  deckAddDeckTitle: {
    flex: 1,
    alignItems: 'center',
    fontSize: 25,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
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
    flex: 2,
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
  wrongButton: {
    backgroundColor: red
  },
  correctButton: {
    backgroundColor: green
  },
  startQuizButton: {
    backgroundColor: black
  },
  startQuizButtonText: {
    color: white
  }
});

export default Quiz;
