function Summary() {
  const currentDate = new Date();
//   const min = new Date(currentDate.setMonth(currentDate.getMonth() - 4))
//     .toISOString()
//     .slice(0, 10);
  const max = new Date().toISOString().slice(0, 10);
  return (
    <>
      <div>
        <label>
          Month:
          {/* <input title="date" type="date" min={min} max={max}></input> */}
        </label>
      </div>

      <table>
        <th>
          <td></td>
        </th>
        <tr></tr>
      </table>
    </>
  );
}

export default Summary;

interface employee {}
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
