import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { Usage } from '../styles';

const RolePct = () => {
  const [options, setOptions] = useState({});
  const selectedSummoner = useSelector(state => state.selectedSummoner);

  useEffect(() => {
    if (selectedSummoner && selectedSummoner.matchHistory) {
      const values = [
        selectedSummoner.matchHistory.filter(l => l.lane === 'JUNGLE').length,
        selectedSummoner.matchHistory.filter(l => l.lane === 'MID').length,
        selectedSummoner.matchHistory.filter(l => l.lane === 'TOP').length,
        selectedSummoner.matchHistory.filter(l => l.lane === 'BOTTOM').length,
      ];
      setOptions({
        chart: {
          type: 'column'
        },
        title: {
          text: 'Top Lanes'
        },
        xAxis: {
          categories: ['Jungle', 'Mid', 'Top', 'Bottom']
        },
        yAxis: {
          title: {
            text: 'Games Played'
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


