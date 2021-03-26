import { 
    ADD_TO_SUMMONER_LIST,
    REMOVE_FROM_SUMMONER_LIST,
    CHANGE_SELECTED_SUMMONER,
    CHANGE_SELECTED_VIEW,
    MODIFY_CHAMPIONS_LIST,
    FILL_CHAMPION_INFORMATION,
    SET_MATCH_HISTORY,
    SET_SELECTED_MATCH,
    ADD_MATCH_TO_DETAILED_LIST
} from './actions';

const initialState = {
  championInformation: [],
  summoners: [ { name: 'deOZad', champions: [], matchHistory: [] }],
  selectedSummoner: { name: 'deOZad', champions: [], matchHistory: [] },
  selectedMatch: {},
  detailedMatches: [],
  view: 'Champions'
};

export const summonerReducer = (state = initialState, action) => {
  let summoner = {};
    switch (action.type) {
      case ADD_TO_SUMMONER_LIST:
        return { ...state, summoners: [...state.summoners, action.payload] };
      case REMOVE_FROM_SUMMONER_LIST:
        return { ...state, summoners: state.summoners.splice(state.summoners.indexOf(action.payload), 1) };
      case CHANGE_SELECTED_SUMMONER:
        return { ...state, selectedSummoner: action.payload };
      case CHANGE_SELECTED_VIEW:
        return { ...state, view: action.payload };
      case MODIFY_CHAMPIONS_LIST:
        summoner = state.summoners.find(x => x.name === action.payload.name);
        summoner.champions = action.payload.champions;
        summoner = state.summoners.splice(state.summoners.indexOf(summoner), 1);
        return { ...state, summoners: [...state.summoners, ...summoner] };
      case SET_MATCH_HISTORY:
        summoner = state.summoners.find(x => x.name === action.payload.name);
        summoner.matchHistory = action.payload.matchHistory;
        summoner = state.summoners.splice(state.summoners.indexOf(summoner), 1);
        return { ...state, summoners: [...state.summoners, ...summoner] };
      case ADD_MATCH_TO_DETAILED_LIST:
        return { ...state, detailedMatches: [...state.detailedMatches, action.payload] };
      case FILL_CHAMPION_INFORMATION:
        return { ...state, championInformation: action.payload };
      case SET_SELECTED_MATCH:
        return { ...state, selectedMatch: action.payload };
      default:
        return state;
    }
  };