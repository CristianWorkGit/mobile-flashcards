import { connect } from 'react-redux';

import DeckDetailView from '../components/DeckDetail';

const getDeckFromTitle = (state, props) =>
  state.entities.decks[props.navigation.state.params.title];

const mapStateToProps = (state, props) => ({
  deck: getDeckFromTitle(state, props)
});

const mapAcionCreators = {};

export default connect(mapStateToProps, mapAcionCreators)(DeckDetailView);
