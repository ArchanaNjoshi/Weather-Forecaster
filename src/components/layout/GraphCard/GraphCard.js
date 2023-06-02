import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import "./GraphCard.css";

const GraphCard = (props) => {
  const { forecastData, location } = props;
  // console.table("====================", forecastData.data);

  const data = forecastData.data.list.map((item) => ({
    y: new Date(item.dt * 1000).toISOString().slice(0, 19),
    x: Math.round(item.main.temp_max - 273.15),
  }));

  const { sunrise, sunset } = forecastData.data.city;

  const chartRef = useRef(null);

  const TimestampFormat = (someTime) => {
    return new Date(someTime * 1000).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const TimestampFormatHours = (someTime) => {
    const newTime = new Date(1685545200 * 1000).toISOString().slice(11, 16);
    return newTime.slice(0, 2) + "HR " + newTime.slice(3) + "M ";
  };

  const sunriseTime = TimestampFormat(sunrise);
  const sunsetTime = TimestampFormat(sunset);
  const dayLength = TimestampFormatHours(sunset - sunrise);

  useEffect(() => {
    if (chartRef.current && data) {
      const chartOptions = {
        chart: {
          height: " 180vw",
          type: "area",
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        series: [
          {
            name: "Temperature",
            data: data.map((item) => ({
              x: new Date(item.y),
              y: item.x,
            })),
          },
        ],
        xaxis: {
          type: "datetime",
          labels: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
          min: Math.min(...data.map((item) => item.x)) - 5,
          max: Math.max(...data.map((item) => item.x)) + 5,
        },
        grid: {
          show: false,
        },
        toolbar: {
          show: false,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            customIcons: [],
          },
        },
        annotations: {
          xaxis: [
            {
              x: sunriseTime,
              borderColor: "#FF0000",
              label: {
                borderColor: "#FF0000",
                style: {
                  color: "#fff",
                  background: "#FF0000",
                },
                text: "Sunrise",
              },
            },
            {
              x: sunsetTime,
              borderColor: "#FFA500",
              label: {
                borderColor: "#FFA500",
                style: {
                  color: "#fff",
                  background: "#FFA500",
                },
                text: "Sunset",
              },
            },
          ],
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
          },
          colors: ["#FDCEA9"],
        },
        stroke: {
          width: 2,
          colors: ["#FDCEA9"],
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy, hh:mm A",
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
      };

      const chart = new ApexCharts(chartRef.current, chartOptions);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [data]);
  // colors: ['#FDCEA9', '#FDEBD0'],

  return (
    <div className="graph-container">
      <span className="graph-title">Sunrise and Sunset</span>
      <div className="graph-section-1">
        <div className="graph-title-section">
          <div className="graph-sub-title">
            <span className="graph-label"> Sunrise Time </span>
            <span className="graph-value"> {sunriseTime}</span>
          </div>
          <div className="graph-sub-title">
            <span className="graph-label">Sunset Time </span>
            <span className="graph-value"> {sunsetTime}</span>
          </div>
          <div className="graph-sub-title">
            <span className="graph-label">Length of the day </span>
            <span className="graph-value"> {dayLength}</span>
          </div>
        </div>
        <div className="graph-output" ref={chartRef}>
          {" "}
        </div>
      </div>
    </div>
  );
};

export default GraphCard;
