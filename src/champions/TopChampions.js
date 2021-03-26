import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from '../styles';
import ChampionCircle from './ChampionCircle';

const TopChampions = () => {
  const selectedSummoner = useSelector(state => state.selectedSummoner);
  return (
    <div>
      <Header>Top 3 Champions</Header>
      {selectedSummoner.champions.slice(0, 3).map((x, i) => {
          return <ChampionCircle key={i} championId={x.championId} />;
      })}
    </div>
  );
};

export default TopChampions;