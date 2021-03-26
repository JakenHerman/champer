import { takeEvery, takeLeading } from 'redux-saga/effects';
import { ADD_MATCH_TO_DETAILED_LIST, ADD_TO_SUMMONER_LIST, FILL_CHAMPION_INFORMATION, SET_MATCH_HISTORY, SET_SELECTED_MATCH } from '../redux/actions';
import * as axios from 'axios';
import store from '../redux/store';
import { getSummonerInfoByName, fetchChampionMastery, getGameHistory, getMatch } from '../RiotLinks';
export const getAllChampions = () => 'https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json';

export function getChampionData() {
    axios.get(getAllChampions())
        .then(res => {
            const championInfo = Object.entries(res.data.data);
            store.dispatch({
                type: FILL_CHAMPION_INFORMATION,
                payload: championInfo
            });
        })
        .catch(err => {
            console.error(err);
        });
};


export const fetchGames = (accountId, name) => {
    axios.get(getGameHistory(accountId))
        .then(res => {
            if (res && res.data) {
                store.dispatch({
                    type: SET_MATCH_HISTORY,
                    payload: {
                        name: name,
                        matchHistory: res.data.matches
                    }
                });
            }
        })
        .catch(err => {
            console.error(err);
        });
};

const fetchSummonerInfo = (action) => {
    axios.get(getSummonerInfoByName(action.payload.name))
        .then(res => {
            if (res && res.data) {
                const id = res.data.id;
                fetchChampionMastery(id, action.payload.name, res.data.summonerLevel);
                fetchGames(res.data.accountId, action.payload.name);
            }
        })
        .catch(err => {
            console.error(err);
        });
  };

export function* watchSetMatch(action) {
    console.log('setting match to', action.payload);
};

export function* watchAddMatchToDetailedList(action) {
    yield takeLeading(
        ADD_MATCH_TO_DETAILED_LIST,
        store.dispatch({
            type: SET_SELECTED_MATCH,
            payload: action.payload
        })
    );
};

export function* watchAddSummoner() {
    getChampionData();
    yield takeEvery(ADD_TO_SUMMONER_LIST, fetchSummonerInfo);
};