import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Header, Games } from '../styles';
import GameQuickLook from './GameQuickLook';
import store from '../redux/store';
import { Card } from 'semantic-ui-react';
import * as axios from 'axios';
import { getMatch } from '../RiotLinks';
import { ADD_MATCH_TO_DETAILED_LIST } from '../redux/actions';
import GameDetailed from './GameDetailed';

const GameLogs = () => {
  const selectedSummoner = useSelector(state => state.selectedSummoner);
  const lastTenMatches = selectedSummoner.matchHistory.slice(0, 10);

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
        <GameDetailed />
        {lastTenMatches.length === 10
          ? (
              <Card.Group>
                {lastTenMatches.map((x, i) => {
                  return <GameQuickLook game={x} key={i} />;
                })}
              </Card.Group>
            )
          : <div>Loading...</div>
        }
      </Games>
    </div>
  );
};

export default GameLogs;
