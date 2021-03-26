import React from 'react';
import { useSelector } from 'react-redux';
import { SummonerName, SummaryWrapper, SummonerLevel } from './styles';
import SideMenu from './SideMenu';
import Champions from './champions/Champions';
import GameLogs from './games/GameLogs';

const SummonerSummary = () => {
  const selectedSummoner = useSelector(state => state.selectedSummoner);
  const view = useSelector(state => state.view);
  
  return (
    <SummaryWrapper>
      <SummonerLevel>35</SummonerLevel>
      <SummonerName>{selectedSummoner.name}</SummonerName>
      <SideMenu />
      {view === 'Champions' &&
        <Champions />
      }
      {view === 'Games' &&
        <GameLogs />
      }
    </SummaryWrapper>
  );
};

export default SummonerSummary;
