import React from 'react';
import TopChampions from './TopChampions';
import ChampionUsage from '../charts/ChampionUsage';
import RolePct from '../charts/RolePct';
import { Grid, Segment } from 'semantic-ui-react';

const Champions = () => {
  return (
    <div>
      <TopChampions />
      <Grid stackable columns={2}>
        <Grid.Column>
          <Segment>
            <ChampionUsage />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <RolePct />
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Champions;
