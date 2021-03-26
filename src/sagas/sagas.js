import { takeEvery, takeLeading } from 'redux-saga/effects';
import { SET_GAME_VIEW_STATE, ADD_TO_SUMMONER_LIST, FILL_CHAMPION_INFORMATION, SET_MATCH_HISTORY, SET_SELECTED_MATCH, FILL_SUMMONER_SPELLS_INFORMATION } from '../redux/actions';
import * as axios from 'axios';
import store from '../redux/store';
import { getSummonerInfoByName, fetchChampionMastery, getGameHistory } from '../RiotLinks';
export const getAllChampions = () => 'https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json';
export const getAllSummonerSpells = () => 'https://ddragon.leagueoflegends.com/cdn/11.6.1/data/en_US/summoner.json';

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

export function getSummonerSpells() {
    axios.get(getAllSummonerSpells())
        .then(res => {
            const summonerSpells = Object.entries(res.data.data);
            store.dispatch({
                type: FILL_SUMMONER_SPELLS_INFORMATION,
                payload: summonerSpells
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

  const changeGameViewState = (action) => {
    store.dispatch({
        type: SET_GAME_VIEW_STATE,
        payload: action.payload // if we have a payload, game view should be open. otherwise, closed.
    });
  };

export function* watchSelectedMatch() {
    yield takeEvery(SET_SELECTED_MATCH, changeGameViewState);
};

export function* watchAddSummoner() {
    getChampionData();
    getSummonerSpells();
    yield takeEvery(ADD_TO_SUMMONER_LIST, fetchSummonerInfo);
};