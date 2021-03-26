import React from 'react';
import { useSelector } from 'react-redux';
import { getImageLink } from '../RiotLinks';
import { Modal, Button, Table } from 'semantic-ui-react';
import { SET_GAME_VIEW_STATE } from '../redux/actions';
import store from '../redux/store';
import ItemList from './ItemList';
import SummonerSpells from './SummonerSpells';

const GameDetailed = () => {
  const gameViewOpen = useSelector(state => state.gameViewOpen);
  const selectedMatch = useSelector(state => state.selectedMatch);
  const detailedMatches = useSelector(state => state.detailedMatches);
  const champions = useSelector(state => state.championInformation);

  const fullMatch = detailedMatches.find(x => x.gameId === selectedMatch);

  const getSummoners = () => {
    const summoners = [];
    fullMatch.participantIdentities.forEach(x => {
      summoners.push({
        id: x.participantId,
        name: x.player.summonerName
      });
    });
    return summoners;
  }

  const getSummoner = (id) => {
    const summoner = fullMatch.participants.find(x => +x.participantId === +id);
    return summoner;
  };

  return fullMatch ? (
    <Modal
    onClose={() => {}}
    open={gameViewOpen}
  >
    <Modal.Header>{fullMatch.gameMode} Game - {(fullMatch.gameDuration / 60).toFixed(1)} minutes</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
 <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Summoner</Table.HeaderCell>
        <Table.HeaderCell>KDA</Table.HeaderCell>
        <Table.HeaderCell>Gold Earned</Table.HeaderCell>
        <Table.HeaderCell>Gold Spent</Table.HeaderCell>
        <Table.HeaderCell>Items</Table.HeaderCell>
        <Table.HeaderCell>Summoner Spells</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {getSummoners().map((x, i) => {
        const summoner = getSummoner(x.id);
        let champion, img;
        if (champions) {
          champion = champions.find(c => +c[1].key === summoner.championId);
          img =  champion ? getImageLink(champion[1].image.full) : '';
        }

        return (
        <Table.Row>
          <Table.Cell>
            {img &&
              <img style={{ marginRight: 10, borderRadius: 50 }} src={img} height="20" width="20" />
            }
            {x.name}
          </Table.Cell>
          <Table.Cell>{`${summoner.stats.kills}/${summoner.stats.deaths}/${summoner.stats.assists}`}</Table.Cell>
          <Table.Cell>{summoner.stats.goldEarned}</Table.Cell>
          <Table.Cell>{summoner.stats.goldSpent}</Table.Cell>
          <Table.Cell><ItemList participantItems={summoner.stats} /></Table.Cell>
          <Table.Cell><SummonerSpells spell1Id={summoner.spell1Id} spell2Id={summoner.spell2Id} /> </Table.Cell>
        </Table.Row>
      );
    })}
    </Table.Body>
  </Table>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color='black' onClick={() => store.dispatch({ type: SET_GAME_VIEW_STATE, payload: false })}>
        Close
      </Button>
    </Modal.Actions>
  </Modal>
  ) : null;
};

export default GameDetailed;
