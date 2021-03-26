import React from 'react';
import { useSelector } from 'react-redux';
import { SummonerName, SummaryWrapper, SummonerLevel } from './styles';
import SideMenu from './SideMenu';

const SummonerSummary = () => {
  const selectedSummoner = useSelector(state => state.selectedSummoner);
  const view = useSelector(state => state.view);
  return (
    <SummaryWrapper>
      <SummonerLevel>35</SummonerLevel>
      <SummonerName>{selectedSummoner}</SummonerName>
      <SideMenu />
      {view === 'Champions' &&
        <Champions />
      }
      {view === 'Roles' &&
        <Roles />
      }
    </SummaryWrapper>
  );
};

const Champions = () => {
  return <>CHAMPS</>;
};

const Roles = () => {
  return <>ROLES</>;
};

export default SummonerSummary;
