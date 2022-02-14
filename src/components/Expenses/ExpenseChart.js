import React from "react";
import Chart from "../Chart/Chart";

const ExpenseChart = (props) => {
  const monthData = [
    {
      key: "m1",
      label: "Jan",
      value: 0,
    },
    {
      key: "m2",
      label: "Feb",
      value: 0,
    },
    {
      key: "m3",
      label: "Mar",
      value: 0,
    },
    {
      key: "m4",
      label: "Apr",
      value: 0,
    },
    {
      key: "m5",
      label: "May",
      value: 0,
    },
    {
      key: "m6",
      label: "Jun",
      value: 0,
    },
    {
      key: "m7",
      label: "Jul",
      value: 0,
    },
    {
      key: "m8",
      label: "Aug",
      value: 0,
    },
    {
      key: "m9",
      label: "Sap",
      value: 0,
    },
    {
      key: "m10",
      label: "Oct",
      value: 0,
    },
    {
      key: "m11",
      label: "Nov",
      value: 0,
    },
    {
      key: "m12",
      label: "Dec",
      value: 0,
    },
  ];

  let max = 0;
  for (let expense of props.expenses) {
    const expenseMonth = expense.date.getMonth();
    monthData[expenseMonth].value += expense.amount - 1 + 1;
    if (monthData[expenseMonth].value > max)
      max = monthData[expenseMonth].value;
  }
  console.log(max);
  return <Chart dataPoints={monthData} maxValue={max} />;
};

export default ExpenseChart;
