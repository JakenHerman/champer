import styled from 'styled-components';

export const SummaryWrapper = styled.div`
  display: grid;
  grid-template-areas: 
    "level name name"
    "sub graph1 graph2"
    "sub focused focused";
  grid-template-rows: 50px 1fr 30px;
  grid-template-columns: 150px 1fr;
`;

export const SummonerLevel = styled.h1`
  background-color: gray;
  font-size: 1.5em;
  height: -webkit-fill-available;
  color: black;
  grid-area: level;
`;

export const SummonerName = styled.h1`
  background-color: whitesmoke;
  height: -webkit-fill-available;
  font-size: 1.5em;
  color: black;
  grid-area: name;
`;

export const Menu = styled.div`
  grid-area: sub;
  height: -webkit-fill-available;
  background-color: blue;
`;