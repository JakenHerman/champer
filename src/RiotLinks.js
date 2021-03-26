export const getAllChampions = () => 'http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json';
export const getImageLink = (image) => `http://ddragon.leagueoflegends.com/cdn/11.6.1/img/champion/${image}`;
export const getSummonerInfoByName = (summonerName) => `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.REACT_APP_RIOT_KEY}`;