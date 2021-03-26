import React from 'react';
import { useSelector } from 'react-redux';
import { Statistic, Segment } from 'semantic-ui-react';
import { SummonerName, SummaryWrapper } from './styles';
import SubMenu from './SubMenu';
import Champions from './champions/Champions';
import GameLogs from './games/GameLogs';

const SummonerSummary = () => {
  const selectedSummoner = useSelector(state => state.selectedSummoner);
  const view = useSelector(state => state.view);
  
  return (
    <SummaryWrapper>
      <SubMenu />
      <Segment inverted placeholder>
        <Segment inverted style={{ border: '1px solid white' }} circular>
          <Statistic color='yellow'>
            <Statistic.Value>{selectedSummoner.summonerLevel}</Statistic.Value>
            <Statistic.Label style={{ color: 'white' }}>Level</Statistic.Label>
          </Statistic>
        </Segment>
        <SummonerName>{selectedSummoner.name}</SummonerName>
      </Segment>

      <Segment inverted>
        {view === 'Champions' &&
          <Champions />
        }
        {view === 'Games' &&
          <GameLogs />
        }
      </Segment>
    </SummaryWrapper>
  );
};

export default SummonerSummary;
