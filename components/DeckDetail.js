import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Animated
} from 'react-native';
import { white, gray, black } from '../utils/colors';
import {
  clearLocalNotifications,
  setLocalNotification
} from '../utils/notifications';

//import { clearLocalNotifications } from '../../utils'

export class DeckDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bounceValue: new Animated.Value(1)
    };
  }

  componentDidMount() {
    const { bounceValue } = this.state;

    Animated.sequence([
      Animated.timing(bounceValue, { duration: 400, toValue: 1.2 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 })
    ]).start();
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.state.params.title}`
  });

  _keyExtractor = (item, index) => {
    return index;
  };

  _handleAddQuestion = () => {
    const { navigation, deck } = this.props;

    navigation.navigate('AddQuestion', { title: deck.title });
  };

  _handleStartQuiz = () => {
    const { navigation, deck } = this.props;

    clearLocalNotifications()
      .then(setLocalNotification)
      .then(() => navigation.navigate('Quiz', { title: deck.title }));
  };

  render() {
    const { bounceValue } = this.state;
    const { deck } = this.props;
    const hasQuestions = deck.questions.length > 0;

    return (
      <View style={styles.deckDetailContainer}>
        <View style={styles.deckInfoContainer}>
          <View style={styles.deckCard}>
            <Animated.Text
              style={[
                styles.deckQuestions,
                { transform: [{ scale: bounceValue }] }
              ]}
            >
              {deck.title}
            </Animated.Text>

            <Text style={styles.deckQuestions}>
              {deck.questions.length} card{deck.questions.length > 1 ? 's' : ''}{' '}
              on this deck
            </Text>
          </View>
        </View>
        <View style={styles.questionActionContainer}>
          <TouchableOpacity
            style={styles.deckButton}
            onPress={this._handleAddQuestion}
          >
            <Text style={styles.submitBtnText}>Add New Question</Text>
          </TouchableOpacity>
          {hasQuestions && (
            <TouchableOpacity
              style={[styles.deckButton, styles.startQuizButton]}
              onPress={this._handleStartQuiz}
            >
              <Text style={[styles.submitBtnText, styles.startQuizButtonText]}>
                Start Quiz
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckDetailContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: white
  },
  deckInfoContainer: {
    flex: 2,
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  deckCard: {
    flex: 1,
    height: 150,
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
    backgroundColor: white
  },
  deckTitle: {
    flex: 1,
    color: black,
    fontSize: 30
  },
  deckQuestions: {
    flex: 1,
    color: gray,
    fontSize: 20
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
    marginLeft: 40,
    marginRight: 40
  },
  startQuizButton: {
    backgroundColor: black
  },
  startQuizButtonText: {
    color: white
  }
});

export default DeckDetail;
