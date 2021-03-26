import { takeEvery } from 'redux-saga/effects';
import { ADD_TO_SUMMONER_LIST } from '../redux/actions';
import { getSummonerInfoByName } from '../RiotLinks';
import * as axios from 'axios';

function fetchUser(action) {
    axios.get(getSummonerInfoByName(action.payload))
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
};

export function* watchAddSummoner() {
  yield takeEvery(ADD_TO_SUMMONER_LIST, fetchUser);
};


// import * as axios from 'axios';
// import { getAllChampions } from '../RiotLinks';

// export function* summonerSaga() {
//     axios.get(getAllChampions())
//         .then(res => {
//             const championInfo = Object.entries(res.data.data);
//             console.log(championInfo);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };