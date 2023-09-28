import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import {
  useTheme
} from '@material-ui/core';


const changeWidth = (num) =>{
    if(num<=5)
    return "100%";
    else
    return 100/5*num + "%";
}

function Chart({
  data: dataProp,
  labels,
  className,
  ...rest
}) {

  const theme = useTheme();
  var barNum = {
    position: 'relative',
    width:changeWidth(labels.length)
  }

  const data = {
    datasets: [
      {
        label: 'Learners',
        backgroundColor: theme.palette.secondary.main,
        data: dataProp,
        barThickness: 30,
        maxBarThickness: 30,
        barPercentage: 0.5,
        categoryPercentage: 1.0,
      }
    ],
    labels
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis:"x",
    animation: false,
    cornerRadius: 20,
    legend: {
      display: false
    },
    layout: {
      padding: 0
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false,
          },
          stacked:true,
          ticks: {
            padding: 20,
            fontColor: theme.palette.text.primary,
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          },
          ticks: {
            padding: 20,
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            stepSize: 5,
            min: 0,
            maxTicksLimit: 100,
            callback: (value) => (value > 0 ? `${value} people` : value)
          }
        }
      ]
    },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      caretSize: 10,
      yPadding: 20,
      xPadding: 20,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.background.dark,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary,
      callbacks: {
        title: () => {},
        label: (tooltipItem) => {
          let label = `${tooltipItem.xLabel}: ${tooltipItem.yLabel}`;

          if (tooltipItem.yLabel > 0) {
            label += ' learners';
          }

          return label;
        }
      }
    }
  };

  return (
    <div
      className={clsx(barNum, className)}
      {...rest}
    >
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
}

Chart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired
};

export default Chart;
