import ChartBar from "./ChartBar";
import "./Chart.css";

const Chart = (props) => {
  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.key}
          value={dataPoint.value}
          maxValue={props.maxValue}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
