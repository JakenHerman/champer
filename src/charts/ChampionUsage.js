import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { Usage } from '../styles';

const ChampionUsage = (props) => {

  const options = {
    title: {
      style: {
        color: 'white'
      },
      text: 'Champion Usage'
    },
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
    },
    chart: {
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
            [0, '#2a2a2b'],
            [1, '#3e3e40']
        ]
      },
      style: {
          fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063',
        type: 'pie'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Champion Points',
        colorByPoint: true,
        data: []
    }]
  };

  const selectedSummoner = useSelector(state => state.selectedSummoner);
  const champions = useSelector(state => state.championInformation);
  if (selectedSummoner && selectedSummoner.champions) {
    try {
      selectedSummoner.champions.forEach(x => {
        const champion = champions.find(c => +c[1].key === x.championId);
        if (champion) {
          options.series[0].data.push({
            name: champion[0],
            y: x.championPoints
          });
        }
      })
    } catch (e) {
      console.error(e);
    }
  }


  return (
    <Usage>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </Usage>
  )
};

export default ChampionUsage;


