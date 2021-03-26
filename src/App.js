import React from 'react';
import './App.css';
import SummonerList from './SummonerList';
import SummonerSummary from './SummonerSummary';
import 'semantic-ui-css/semantic.min.css';
import store from './redux/store';
import { useSelector } from 'react-redux';
import { ADD_TO_SUMMONER_LIST } from './redux/actions';

function App() {

  const selectedSummoner = useSelector(state => state.selectedSummoner);

  // initialize app with a summoner
  if (store.getState().summoners.length === 0) {
    store.dispatch({
      type: ADD_TO_SUMMONER_LIST,
      payload: {
        name: 'deOZad',
        matchHistory: [],
        champions: []
      }
    });
  }


  return (
    <div className="App">
      {selectedSummoner &&
        <>
          <SummonerList />
          <SummonerSummary />
        </>
      }

      {!selectedSummoner &&
        <div>Loading...</div>
      }

    </div>
  );
}

export default App;
