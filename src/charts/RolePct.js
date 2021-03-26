import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { Usage } from '../styles';

const RolePct = () => {
  const [options, setOptions] = useState({});
  const selectedSummoner = useSelector(state => state.selectedSummoner);

  useEffect(() => {
    console.log(selectedSummoner);
    if (selectedSummoner && selectedSummoner.matchHistory) {
      const values = [
        selectedSummoner.matchHistory.filter(l => l.lane === 'JUNGLE').length,
        selectedSummoner.matchHistory.filter(l => l.lane === 'MID').length,
        selectedSummoner.matchHistory.filter(l => l.lane === 'TOP').length,
        selectedSummoner.matchHistory.filter(l => l.lane === 'BOTTOM').length,
      ];
      setOptions({
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
            type: 'column'
        },
        title: {
          text: 'Top Lanes',
          style: {
            color: 'white'
          }
        },
        xAxis: {
          categories: ['Jungle', 'Mid', 'Top', 'Bottom']
        },
        yAxis: {
          title: {
            text: 'Games Played',
            style: {
              color: 'white'
            }
          }
        },
        credits: {
          enabled: false
        },
        series: [
          {
          name: '',
          data: values
        }]
      });
    }
  }, [selectedSummoner]);

  return (
    <Usage>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </Usage>
  )
};

export default RolePct;


