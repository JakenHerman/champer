import { takeEvery } from 'redux-saga/effects';
import { ADD_TO_SUMMONER_LIST, FILL_CHAMPION_INFORMATION } from '../redux/actions';
import * as axios from 'axios';
import store from '../redux/store';
import { getSummonerInfoByName, fetchChampionMastery } from '../RiotLinks';
export const getAllChampions = () => 'http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json';

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
            console.log(err);
        });
};

export const fetchSummonerInfo = (action) => {
    axios.get(getSummonerInfoByName(action.payload.name))
        .then(res => {
            if (res && res.data) {
                const id = res.data.id;
                fetchChampionMastery(id, action.payload.name);
            }
        })
        .catch(err => {
            console.error(err);
        });
  };

export function* watchAddSummoner() {
    getChampionData();
    yield takeEvery(ADD_TO_SUMMONER_LIST, fetchSummonerInfo);
};