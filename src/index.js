import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

// TODO: create a slice to hold game view open or not
// TODO: create a stacked column highcharts where x axis is champion name, y axis is total games stacked by win/loss
// TODO: add toggle to go from pie chart to bar chart
// TODO: create sparkline charts for champion points
// TODO: load deozad summoner on initial project load
// TODO: on hover of wins/losses in stacked column, show number of games won or lost
// TODO: on click of wins/losses in stacked column, show game info stats (k/d/a, champion points earned, etc)
// TODO: on hover of champion points in sparkline charts, show (+7,594) or however many points were earned from previous
// TODO: on click of champion points in sparkline charts, show game info stats

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
