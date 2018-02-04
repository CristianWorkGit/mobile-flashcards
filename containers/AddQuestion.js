import { connect } from 'react-redux';

import { addQuestion } from '../actions/questions';

import AddQuestionView from '../components/AddQuestion';

const getTitle = (state, props) => props.navigation.state.params.title;

const mapStateToProps = (state, props) => ({
  title: getTitle(state, props)
});

const mapAcionCreators = {
  addQuestion
};

export default connect(mapStateToProps, mapAcionCreators)(AddQuestionView);
