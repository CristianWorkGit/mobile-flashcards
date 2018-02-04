import { connect } from 'react-redux';

import QuizView from '../components/Quiz';

const getQuestions = (state, props) =>
  state.entities.decks[props.navigation.state.params.title].questions;

const mapStateToProps = (state, props) => ({
  questions: getQuestions(state, props),
  title: props.navigation.state.params.title
});

const mapAcionCreators = {};

export default connect(mapStateToProps, mapAcionCreators)(QuizView);
