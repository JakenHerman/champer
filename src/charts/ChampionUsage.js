import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { Usage } from '../styles';

const ChampionUsage = (props) => {

  const options = {
    title: {
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
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    series: [{
      name: 'Champion Points',
      colorByPoint: true,
      data: []
  }]
  };

  const selectedSummoner = useSelector(state => state.selectedSummoner);
  const champions = useSelector(state => state.championInformation);
  
  selectedSummoner.champions.forEach(x => {
    const champion = champions.find(c => +c[1].key === x.championId);
    if (champion) {
      options.series[0].data.push({
        name: champion[0],
        y: x.championPoints
      });
    }
  })

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


