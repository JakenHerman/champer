import React from 'react';
import './App.css';
import SummonerList from './SummonerList';
import SummonerSummary from './SummonerSummary';
import 'semantic-ui-css/semantic.min.css';
import store from './redux/store';
import { useSelector } from 'react-redux';
import { ADD_TO_SUMMONER_LIST } from './redux/actions';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

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
        <Segment style={{ minHeight: '100vh' }}>
          <Dimmer active>
            <Loader>Loading...</Loader>
            <p style={{ marginTop: 150 }}>
              If you've been loading for more than 5 seconds, your Riot Developer key is likely expired. Please verify you have a valid key.
              <br />
              If you've retreived a new key and replaced the entry in your .env file, you will need to restart the application.
            </p>
          </Dimmer>
        </Segment>
      }

    </div>
  );
}

export default App;
