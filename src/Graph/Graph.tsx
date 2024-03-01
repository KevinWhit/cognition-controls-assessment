import Chart from "chart.js/auto";
import { SensorData } from "../Types/types";
import { useEffect, useRef, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

interface TemperatureGraphProps {
  data?: SensorData[];
}

const Graph: React.FC<TemperatureGraphProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  const [minTime, setMinTime] = useState<number>();
  const [maxTime, setMaxTime] = useState<number>();

  const colorPallete = ['blue', 'green', 'yellow', 'black']

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setMaxTime(value);
  };
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setMinTime(value);
  };

  useEffect(() => {
    if (data) {
      const tValues: number[] = data.map((data) => data.t);

      setMinTime(Math.min(...tValues));
      setMaxTime(Math.max(...tValues));
    }
  }, [data]);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    renderChart();
  }, [data, maxTime, minTime]);

  const renderChart = () => {
    if (!chartRef.current || !data) return;

    const labels = data.map((entry) => entry.t);
    const datasets: any = [];

    if (data.length > 0) {
      const properties = ["H", "T", "crh", "crl"];
      properties.forEach((property, index) => {
        datasets.push({
          label: property,
          data: data.map((entry) => entry[property as keyof SensorData]),
          borderColor: colorPallete[index],
          fill: false,
        });
      });
    }

    const chartInstance = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            min: minTime,
            max: maxTime,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    chartInstanceRef.current = chartInstance;
  };



  return (
    <Box>
      {data && (
      <Typography display={'flex'} alignSelf={'center'} justifyContent={'center'}>Click label to toggle off data</Typography>
      )}
      <canvas ref={chartRef} />
      {data && (
        <Box p={5} display={'flex'} justifyContent={'center'} alignSelf={'center'}>
          <TextField
            id="min-time"
            label="Min Time"
            variant="standard"
            value={minTime || ''}
            onChange={handleMinChange}
          />
          <TextField
            id="max-time"
            label="Max Time"
            variant="standard"
            value={maxTime || ''}
            onChange={handleMaxChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default Graph;
