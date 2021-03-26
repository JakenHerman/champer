import React from 'react';
import { useSelector } from 'react-redux';
import { SummonerName, SummaryWrapper, SummonerLevel, ChampionImage, Champion, ChampionName, Header } from './styles';
import SideMenu from './SideMenu';
import { getImageLink } from './RiotLinks';

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
      {view === 'Roles' &&
        <Roles />
      }
    </SummaryWrapper>
  );
};

const TopChampions = () => {
  const selectedSummoner = useSelector(state => state.selectedSummoner);
  return (
    <div>
      <Header>Top 3 Champions</Header>
      {selectedSummoner.champions.slice(0, 3).map((x, i) => {
          return <ChampionCircle key={i} championId={x.championId} />;
      })}
    </div>
  )

}

const ChampionCircle = ({ championId }) => {
  const champions = useSelector(state => state.championInformation);
  const champion = champions.find(x => +x[1].key === championId);
  const img =  getImageLink(champion[1].image.full);
  return (
    <Champion>
      <ChampionImage src={img} height='50' width='50' alt='' />
      <ChampionName>{champion[0]}</ChampionName>
    </Champion>
  );
};

const Champions = () => {
  return (
    <div>
      <TopChampions />
    </div>
  );
};

const Roles = () => {
  return <>ROLES</>;
};

export default SummonerSummary;
