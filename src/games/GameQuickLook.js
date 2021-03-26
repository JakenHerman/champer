import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Grid } from 'semantic-ui-react';
import { getImageLink, getItemPhoto } from '../RiotLinks';
import { ChampionImage } from '../styles';


const GameQuickLook = ({ game }) => {
  const champions = useSelector(state => state.championInformation);
  const detailedMatches = useSelector(state => state.detailedMatches);
  const selectedSummoner = useSelector(state => state.selectedSummoner);

  const champion = champions.find(x => +x[1].key === game.champion);
  let img = '';
  if (champion) {
    img =  getImageLink(champion[1].image.full);
  }
  
  const match = detailedMatches.find(x => x.gameId === game.gameId);

  const getParticipantId = () => {
    return match.participantIdentities.find(x => x.player.summonerName === selectedSummoner.name).participantId;
  };

  const getTeamId = (participantId) => {
    return match.participants[participantId-1].teamId;
  };

  const getWinLoss = (teamId) => {
    return match.teams.find(x => x.teamId === teamId).win;
  };

  return (img && match) ? (
    <Card color={getWinLoss(getTeamId(getParticipantId())) === 'Win' ? 'green' : 'red'} fluid>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={3}>
            <ChampionImage src={img} height='50' width='50' alt='' />
          </Grid.Column>
          <Grid.Column width={13}>{match.gameMode} - {getWinLoss(getTeamId(getParticipantId())) === 'Win' ? 'W' : 'L'}</Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ marginBottom: 15, marginLeft: '-2%' }}>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={14}>
            <ItemList participantItems={match.participants[getParticipantId()-1].stats} />
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid.Row>
      </Grid>
    </Card>
  ) : null;
};

const ItemList = ({ participantItems }) => {
  const items = [
    participantItems.item0 || null,
    participantItems.item1 || null,
    participantItems.item2 || null,
    participantItems.item3 || null,
    participantItems.item4 || null,
    participantItems.item5 || null,
    participantItems.item6 || null
  ];

  return (
    <Card.Group itemsPerRow={7}>
      {items.map((x, i) => {
        return x ? <Card raised style={{ height: 25, width: 25 }} key={i} image={getItemPhoto(x)} /> : null;
      })}
  </Card.Group>
  )
};

export default GameQuickLook;
