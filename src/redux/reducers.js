import { 
    ADD_TO_SUMMONER_LIST,
    REMOVE_FROM_SUMMONER_LIST,
    CHANGE_SELECTED_SUMMONER,
    CHANGE_SELECTED_VIEW,
    MODIFY_CHAMPIONS_LIST,
    FILL_CHAMPION_INFORMATION
} from './actions';

const initialState = {
  championInformation: [],
  summoners: [ { name: 'deOZad', champions: [] }],
  selectedSummoner: { name: 'deOZad', champions: [] },
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
      case MODIFY_CHAMPIONS_LIST:
        let summoner = state.summoners.find(x => x.name === action.payload.name);
        summoner.champions = action.payload.champions;
        summoner = state.summoners.splice(state.summoners.indexOf(summoner), 1);
        return { ...state, summoners: [...state.summoners, ...summoner] };
      case FILL_CHAMPION_INFORMATION:
        return { ...state, championInformation: action.payload };
      default:
        return state;
    }
  };