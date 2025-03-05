import { useState } from "react";

function Summary() {
  const currentDate = new Date();
  // const noOfDaysInAMonth = (month: number) => {
  //   return new Date(0, month, 0).getDate();
  // };
  let weeks = [];
  for (let i = 0; i < 7; i++) {
    weeks.push(Week[i]);
  }
  // let tempMonths = [];
  // let tempYears = new Set<number>();
  let dates = [];
  for (let i = 0; i < 4; i++) {
    let date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      currentDate.getDate()
    ); //currentDate.setMonth(currentDate.getMonth() - i));
    // tempMonths.push(month[date.getMonth()]);
    // tempYears.add(date.getFullYear());
    dates.push(date);
  }
  // let [selectedMonth, updateSelectedMonth] = useState(
  //   currentDate.toLocaleDateString("default", {
  //     month: "long",
  //     year: "numeric",
  //   })
  // );
  let [selectedDate, updateSelectedDate] = useState(currentDate);
  // let [months, updateMonths] = useState(tempMonths);
  // let [years, updateYears] = useState([...tempYears]);
  //let [dates, updateDates] = useState(tempDate);

  let tempMonthStatus: status[] = [];
  for (let i = 0; i < 30; i++) {
    tempMonthStatus.push(Math.ceil(Math.random() * 4));
  }
  let [monthStatus, updateMonthStatus] = useState(tempMonthStatus);

  const formatMonthStatus = () => {
    let rows = monthStatus.length / 7;
    let formattedMonthStatus: status[][] = [];
    for (let i = 0; i < rows; i++) {
      let tempStatus = [];
      for (let j = 0; j < 7; j++) {
        tempStatus.push(monthStatus[i * 7 + j]);
      }
      formattedMonthStatus.push(tempStatus);
    }
    return formattedMonthStatus;
  };
  const formattedMonthStatus = formatMonthStatus();
  console.log(formattedMonthStatus);

  //const max = new Date().toISOString().slice(0, 10);
  return (
    <>
      <div>
        <label>
          Month:
          <select
            onChange={(e) => updateSelectedDate(new Date(e.target.value))}
          >
            {dates.map((date, id) => {
              return (
                <option key={id} value={date.toString()}>
                  {date.toLocaleDateString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </option>
              );
            })}
            {/* {months.map((month, id) => {
              return <option key={id}>{month}</option>;
            })} */}
          </select>
        </label>
        {/* <label>
          Year:
          <select>
            {years.map((year, id) => {
              return <option key={id}>{year}</option>;
            })}
          </select>
        </label> */}
        <table>
          <thead>
            <tr>
              {weeks.map((week, id) => {
                return <th key={id}>{week}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {formattedMonthStatus.map((month, id) => {
              return (
                <tr key={id}>
                  {month.map((status, idx) => {
                    return <td key={idx}>{status}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Summary;

export enum month {
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
}

export enum Week {
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
}

export enum status {
  "NotADay/Holiday",
  "Present/WFH",
  "Absent",
  "Abscond",
}
//Need to convert status in months to selected mon to weeks
