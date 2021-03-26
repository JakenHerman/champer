import React from 'react';
import './App.css';
import SummonerList from './SummonerList';
import SummonerSummary from './SummonerSummary';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div className="App">
      <SummonerList />
      <SummonerSummary />
    </div>
  );
}

export default App;
