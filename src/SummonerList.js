import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Input } from 'semantic-ui-react'
import { ADD_TO_SUMMONER_LIST, CHANGE_SELECTED_SUMMONER } from './redux/actions';
import { v4 as uuidv4 } from 'uuid';

const SummonerList= () => {    
    const dispatch = useDispatch();
    const [summonerName, setSummonerName] = useState('');
    const summoners = useSelector(state => state.summoners);
    const selectedSummoner = useSelector(state => state.selectedSummoner);

    return (
        <div>
        <Menu pointing secondary>
            {summoners.map(s => (
                <Menu.Item
                    key={uuidv4()}
                    name={s.name}
                    active={selectedSummoner.name === s.name}
                    onClick={() => dispatch({ type: CHANGE_SELECTED_SUMMONER, payload: s })}
                />
            ))}
            <Menu.Item position='right'>
                <Input
                    onChange={(e, { value }) => setSummonerName(value)}
                    value={summonerName}
                    disabled={summoners.length >= 5}
                    action={{
                        content: '+',
                        disabled: !summonerName,
                        onClick: () => {
                            dispatch({ type: ADD_TO_SUMMONER_LIST, payload: { name: summonerName, champions: [] } });
                            setSummonerName('');
                        }}
                    }
                    placeholder='Add Summoner'
                />
            </Menu.Item>
        </Menu>
      </div>
    );
};

export default SummonerList;
