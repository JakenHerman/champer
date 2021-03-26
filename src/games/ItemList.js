import React from 'react';
import { getItemPhoto } from '../RiotLinks';
import { Card } from 'semantic-ui-react';


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

export default ItemList;
