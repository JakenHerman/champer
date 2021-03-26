import React from 'react';
import { useSelector } from 'react-redux';
import { getImageLink } from '../RiotLinks';
import { ChampionImage, ChampionName, Champion } from '../styles';

const ChampionCircle = ({ championId }) => {
  const champions = useSelector(state => state.championInformation);
  const champion = champions.find(x => +x[1].key === championId);
  let img = champion ? getImageLink(champion[1].image.full) : null;
  const img =  getImageLink(champion[1].image.full);
  return (
    <Champion>
      {img && <ChampionImage src={img} height='50' width='50' alt='' /> }
      {champion && <ChampionName>{champion[0]}</ChampionName> }
    </Champion>
  );
};

export default ChampionCircle;
