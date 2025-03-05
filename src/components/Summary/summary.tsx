import { useState } from "react";
import "./summary.css";

function Summary() {
  //1.Get current Date
  //2.Get days of week in a list for calendar
  //3.Get last 4 month dates for calendar
  //4.Make api call when page load that will get data for 4 months by default and return 2d list of month and status list
  //5. In short: for 4 months status we will get for the days
  //6. These status we have to properly loop to form react table
  //7. Each status id will use diff class to style
  const currentDate = new Date();
  let weeks = [];
  for (let i = 0; i < 7; i++) {
    weeks.push(Week[i]);
  }
  let dates = [];
  for (let i = 0; i < 4; i++) {
    let date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      currentDate.getDate()
    );
    dates.push(date);
  }

  let [selectedDate, updateSelectedDate] = useState(currentDate);

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

  const OnMonthUpdate = (date: Date) => {
    updateSelectedDate(date);
  };

  return (
    <>
      <div>
        <label>
          Month:
          <select onChange={(e) => OnMonthUpdate(new Date(e.target.value))}>
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
            {}
          </select>
        </label>
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
                    return (
                      <td key={idx} className={"color " + statusClass[status]}>
                        {status}
                      </td>
                    );
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
export enum statusClass {
  "status1" = 1,
  "status2",
  "status3",
  "status4",
}
//Need to convert status in months to selected mon to weeks
