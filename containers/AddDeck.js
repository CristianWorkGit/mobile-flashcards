import { connect } from 'react-redux';

import { addDeck } from '../actions/decks';

import AddDeckView from '../components/AddDeck';

const mapStateToProps = (state, props) => ({});

const mapAcionCreators = {
  addDeck
};

export default connect(mapStateToProps, mapAcionCreators)(AddDeckView);
