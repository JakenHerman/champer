import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Grid, Statistic, Label, Button } from 'semantic-ui-react';
import { getImageLink } from '../RiotLinks';
import { ChampionImage } from '../styles';
import ItemList from './ItemList';
import SummonerSpells from './SummonerSpells';
import { getItemPhoto } from '../RiotLinks';
import store from '../redux/store';
import { SET_SELECTED_MATCH } from '../redux/actions';

const GameQuickLook = ({ game }) => {
  const champions = useSelector(state => state.championInformation);
  const detailedMatches = useSelector(state => state.detailedMatches);
  const selectedSummoner = useSelector(state => state.selectedSummoner);

  const champion = champions.find(x => +x[1].key === game.champion);
  let img = '';
  if (champion) {
    img =  getImageLink(champion[1].image.full);
  }
  
  const getParticipantId = () => {
    return match.participantIdentities.find(x => x.player.summonerName === selectedSummoner.name).participantId;
  };

  const getTeamId = (participantId) => {
    return match.participants[participantId-1].teamId;
  };

  const getWinLoss = (teamId) => {
    return match.teams.find(x => x.teamId === teamId).win || null;
  };

  const getDuration = () => `${(match.gameDuration / 60).toFixed(1)}m`;

  const getKDA = () => {
    const k = stats.kills;
    const d = stats.deaths;
    const a = stats.assists;
    return `${k}/${d}/${a}`;
  };

  const match = detailedMatches.find(x => x.gameId === game.gameId);
  const participant = match ? match.participants[getParticipantId()-1] : null;
  const stats = participant ? participant.stats : null;
  return (img && match) ? (
    <Card style={{ backgroundColor: 'black' }} color={getWinLoss(getTeamId(getParticipantId())) === 'Win' ? 'green' : 'red'} fluid>
      <Grid stackable columns='equal'>
          <Grid.Row style={{ marginTop: 15 }}>
            <Grid.Column>
              <ChampionImage src={img} height='50' width='50' alt='' />
            </Grid.Column>
            <Grid.Column>
              <Statistic size='tiny' color='yellow'>
                <Statistic.Value>{getKDA()}</Statistic.Value>
                <Statistic.Label className='statLabel'>KDA</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic size='tiny' color='yellow'>
                <Statistic.Value>{stats.wardsPlaced || 0}</Statistic.Value>
                <Statistic.Label className='statLabel'>
                  <img height="20" width="20" src={getItemPhoto('3340')} style={{ marginRight: 5, marginBottom: -5 }} />
                  Wards Placed
                </Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic size='tiny' color='yellow'>
                <Statistic.Value>{getDuration()}</Statistic.Value>
                <Statistic.Label className='statLabel'>Duration</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginBottom: 50 }}>
            <Grid.Column style={{ marginLeft: '5%' }}>
              <ItemList participantItems={stats} />
            </Grid.Column>
            <Grid.Column>
              <SummonerSpells spell1Id={participant.spell1Id} spell2Id={participant.spell2Id} />
            </Grid.Column>
            <Grid.Column>
              <Statistic size='tiny' color={getWinLoss(getTeamId(getParticipantId())) === 'Win' ? 'green' : 'red'}>
                <Statistic.Value>{getWinLoss(getTeamId(getParticipantId())) === 'Win' ? 'Win' : 'Loss'}</Statistic.Value>
                <Statistic.Label className='statLabel'>Result</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
          <Label
            attached='bottom'
            as={Button}
            onClick={() => {
              store.dispatch({
                type: SET_SELECTED_MATCH,
                payload: match.gameId
              });
            }}
          >
            View Matchup
          </Label>
        </Grid>
    </Card>
  ) : null;
};

export default GameQuickLook;
