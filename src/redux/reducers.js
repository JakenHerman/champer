import { 
    ADD_TO_SUMMONER_LIST,
    REMOVE_FROM_SUMMONER_LIST,
    CHANGE_SELECTED_SUMMONER,
    CHANGE_SELECTED_VIEW
} from './actions';

const initialState = {
  summoners: ['deOZad', 'Revolie'],
  selectedSummoner: 'deOZad',
  view: 'Champions'
};

export const summonerReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_SUMMONER_LIST:
        return { ...state, summoners: [...state.summoners, action.payload] };
      case REMOVE_FROM_SUMMONER_LIST:
        return { ...state, summoners: state.summoners.splice(state.summoners.indexOf(action.payload), 1) };
      case CHANGE_SELECTED_SUMMONER:
        return { ...state, selectedSummoner: action.payload };
      case CHANGE_SELECTED_VIEW:
        return { ...state, view: action.payload };
      default:
        return state;
    }
  };