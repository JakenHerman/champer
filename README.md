# Necessary Steps to Run

 1. Go to https://developer.riotgames.com/ and get a development API key. 
 2. Copy this key.
 3. Open terminal and run `cd documents` followed by `git clone https://www.github.com/jakenherman/champer`
 4. Once the project is cloned, open the project in your text editor of choice. (For me, `cd champer && code .`)
 5. Run `yarn add` from the directory to insure all packages are installed. (If you get an error here you can do `npm i` instead or `npm i -g yarn` followed by `yarn add`)
 6. In the root directory of the project, create a file called `.env`, and past this: `REACT_APP_RIOT_KEY={YOUR_KEY}`, where `{YOUR_KEY}` is the key you copied in step **2**. Put your key in double-quotation marks like so : `"RGX-XX-XXX"`. If you get a 403 error, it's likely that your Riot key is expired. The first key I got was expired, so just go back to https://developer.riotgames.com/ and make sure your key is not expired.
 7. Run `yarn start`.
 
 ---
 
 # How to use
 
 My League of Legends summoner name loads by default (deOZad). You can either poke around through my stats that are displayed on the champions tab, or peruse around my games in the "Games" tab.
 If there is a game that interests you, click the "View Matchup" button to see the stats of other participants in the match.
 
 To add a new summoner to the list at the top, type their summoner name in the top-right corner and click the "+" button. Once you navigate to their tab, their stats will replace the ones currently in view.
 If there have been no games played for the most current season, the "Top Lanes" and "Games" will be empty. 
 
 A good example of another profile with data is the summoner name "Revolie".
 A good example of a profile without game data is either "Brooklyn2711" or "Gember".
 
 ---
 
I used a mix of React State, Redux, and Redux Saga. I used a mix of CSS-in-JS, css, and styled components. I used `http-proxy-middleware` to get around CORS issues with the Riot API.

