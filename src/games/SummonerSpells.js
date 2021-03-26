import React from 'react';
import { getSpellPhoto } from '../RiotLinks';
import { useSelector } from 'react-redux';

const SummonerSpells = ({ spell1Id, spell2Id }) => {
  const summonerSpells = useSelector(state => state.summonerSpells);
  let spell1Name, spell2Name;
  if (summonerSpells) {
    spell1Name = summonerSpells.filter(x => x[1].key === spell1Id.toString())[0][0];
    spell2Name = summonerSpells.filter(x => x[1].key === spell2Id.toString())[0][0];
  }

  return (spell1Name && spell2Name) ? (
    <div>
      <img style={{ margin: 7 }} src={getSpellPhoto(spell1Name)} height="25" width="25" />
      <img style={{ margin: 7 }} src={getSpellPhoto(spell2Name)} height="25" width="25" />
    </div>
  ) : null;
};

export default SummonerSpells;
