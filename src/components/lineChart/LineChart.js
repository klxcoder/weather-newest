import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useStore } from '../../store';
// libary Chartjs
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function LineChart({ index }) {
  const [value, setValue] = useState([]);
  const data = useSelector((state) => state.api);
  const [temperatureSwitch, setTemperatureSwitch] = useStore();
  const [currentTempText, setCurrentTempText] = useState('300');

  // update linechart every time the temperature changes
  useLayoutEffect(() => {
    const total = data.weekWeather.map((data) => data.main.temp);
    setValue(total);
    console.log(data.weekWeather);
  }, [data]);

  useEffect(() => {
    const text = `${temperatureSwitch ? data.detalsWeather.tempF : data.detalsWeather.tempC} ${temperatureSwitch ? '°F' : '°C'}`
    setCurrentTempText(text);
  }, [value, index, temperatureSwitch]);

  // handle point linechart
  function alternatePointRadius(ctx, nbr) {
    const index = ctx.dataIndex;
    return index === nbr ? 7 : 0;
  }

  const drawCurrentTemp = {
    id: 'drawCurrentTemp',
    afterDraw(chart) {
      console.log(temperatureSwitch);
      const { ctx } = chart;
      const currentTemp = chart.getDatasetMeta(0)._dataset.currentTemp;
      const currentTempText = chart.getDatasetMeta(0)._dataset.currentTempText;
      const currentIndex = chart.getDatasetMeta(0)._dataset.currentIndex;

      ctx.save();
      ctx.font = '20px Sans MS';
      ctx.fillStyle = '#3f84e2';
      ctx.textAlign = 'center';
      if (chart.getDatasetMeta(0).data[currentIndex]) {
        const { x, y } = chart.getDatasetMeta(0).data[currentIndex];
        ctx.fillText(currentTempText, x, y - 10);
      }
      ctx.restore();
    },
  };

  return (
    <div>
      <Line
        data={{
          labels: ['', '', '', '', '', '', ''],
          datasets: [
            {
              label: null,
              data: value,
              borderColor: '#70a0e8',
              backgroundColor: '#e0e7f3',
              pointRadius: (ctx) => alternatePointRadius(ctx, index),
              borderWidth: 2,
              tension: 0.4,
              fill: true,
              pointStyle: temperatureSwitch
                ? `${data.detalsWeather.tempF}°F`
                : `${data.detalsWeather.tempC}°C`,
              currentIndex: index,
              currentTemp: value[index],
              currentTempText: currentTempText
            },
          ],
        }}
        height={200}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              display: false,
            },
            y: {
              min: -5,
              max: 40,
              display: false,
            },
          },
          plugins: {
            title: {
              display: true,
              text: (ctx) =>
                'Temperature: ' + `${ctx.chart.data.datasets[0].pointStyle}`,
            },
            legend: {
              display: false,
            },
          },
        }}
        plugins={[drawCurrentTemp]}
      />
    </div>
  );
}

export default LineChart;
