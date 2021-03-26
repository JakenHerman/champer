import * as axios from 'axios';
import { MODIFY_CHAMPIONS_LIST } from './redux/actions';
import store from './redux/store';

export const getImageLink = (image) => `http://ddragon.leagueoflegends.com/cdn/11.6.1/img/champion/${image}`;
export const getSummonerInfoByName = (summonerName) => appendKey(`/lol/summoner/v4/summoners/by-name/${summonerName}`);
export const getChampionMastery = (summonerId) => appendKey(`/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`);
export const getChampionPhoto = (photo) => `http://ddragon.leagueoflegends.com/cdn/11.6.1/img/champion/${photo}`;

const appendKey = (link) => `${link}?api_key=${process.env.REACT_APP_RIOT_KEY}`;

export const fetchChampionMastery = (id, name) => {
  axios.get(getChampionMastery(id))
      .then(res => {
        store.dispatch({ 
            type: MODIFY_CHAMPIONS_LIST,
            payload: {
                name: name,
                champions: res.data
            }
        })
      })
      .catch(err => {
          console.error(err);
      });
};