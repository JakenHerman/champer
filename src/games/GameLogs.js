import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Header, Games } from '../styles';
import GameQuickLook from './GameQuickLook';
import store from '../redux/store';
import { Card } from 'semantic-ui-react';
import * as axios from 'axios';
import { getMatch } from '../RiotLinks';
import { ADD_MATCH_TO_DETAILED_LIST } from '../redux/actions';

const GameLogs = () => {
  const selectedSummoner = useSelector(state => state.selectedSummoner);
  const detailedMatches = useSelector(state => state.detailedMatches);
  const lastTenMatches = selectedSummoner.matchHistory.matches.slice(0, 10);

  useEffect(() => { console.log(detailedMatches); }, [detailedMatches]);

  useEffect(() => {
    const promises = [];
    const fetchAllMatches = () => {
      lastTenMatches.forEach(x => {
        promises.push(axios.get(getMatch(x.gameId)));
      })
    }

    fetchAllMatches();
    Promise.all(promises).then(r => {
      r.forEach(x => {
        store.dispatch({
          type: ADD_MATCH_TO_DETAILED_LIST,
          payload: x.data
        });
      });
    });
  }, []);

  return (
    <div>
      <Header>Last 10 Games</Header>
      <Games>
        <Card.Group>
          {lastTenMatches.map((x, i) => {
            return <GameQuickLook game={x} key={i} />;
          })}
        </Card.Group>
      </Games>
    </div>
  );
};

export default GameLogs;
