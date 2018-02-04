import { connect } from 'react-redux';

import { getDecks } from '../actions/decks';

import DecksView from '../components/Decks';

const mapStateToProps = (state, props) => ({
  decks: Object.values(state.entities.decks),
  navigation: props.navigation
});

const mapAcionCreators = {
  getDecks
};

export default connect(mapStateToProps, mapAcionCreators)(DecksView);
