import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { MultiInputDateRangeField } from '@mui/x-date-pickers-pro/MultiInputDateRangeField';

import dayjs from 'dayjs';

function DateComponent() {
  const [selectedDates, setSelectedDates] = React.useState({
    date1: dayjs('2022-04-17T15:30'),
    date2: dayjs('2022-04-21T18:30'),
  });

  const handleDateChange = (dates) => {
    setSelectedDates({
      date1: dates[0],
      date2: dates[1],
    });
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['MultiInputDateRangeField']}>
          <DemoItem label="Date Range Field">
            <MultiInputDateRangeField value={[selectedDates.date1, selectedDates.date2]} />
          </DemoItem>
        </DemoContainer>
        

        <DemoContainer components={['DateRangeCalendar']}>
          <DemoItem label="Calendar">
            <DateRangeCalendar
              calendars={1}
              onChange={handleDateChange}
              value={[selectedDates.date1, selectedDates.date2]}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>

      <Datepicker
          select="range"
          rangeHighlight={true}
          showRangeLabels={true}
      />
    </div>
  );
}
 
export default DateComponent;

// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import './date.css';
// import dayjs from 'dayjs';

// export default function DateComponent() {
//   // State to hold the selected start and end dates for the range picker
//   const [selectedDates, setSelectedDates] = useState([null, null]);
//   const [excludeSaturdays, setExcludeSaturdays] = useState(false);
//   const [excludeSundays, setExcludeSundays] = useState(false);
//   const [multipleDates, setMultipleDates] = useState([]);
//   const [selectedCount, setSelectedCount] = useState(0);

//   // Function to handle date range change in the react-datepicker
//   const handleDateChange = (dates) => {
//     let newDates = dates;

//     if (excludeSaturdays || excludeSundays) {
//       newDates = filterWeekends(newDates);
//     }

//     setSelectedDates(newDates);
//   };

//   // Function to filter out weekends from the selected dates
//   const filterWeekends = (dates) => {
//     if (!dates[0] || !dates[1]) return dates;

//     const start = new Date(dates[0]);
//     const end = new Date(dates[1]);
//     const filteredDates = [];

//     for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//       const day = d.getDay();
//       if (!(excludeSaturdays && day === 6) && !(excludeSundays && day === 0)) {
//         filteredDates.push(new Date(d));
//       }
//     }

//     return filteredDates.length > 0 ? [filteredDates[0], filteredDates[filteredDates.length - 1]] : [null, null];
//   };

//   // Handle checkbox changes
//   const handleCheckboxChange = (e) => {
//     const { id, checked } = e.target;
//     if (id === 'saturday') {
//       setExcludeSaturdays(checked);
//     } else if (id === 'sunday') {
//       setExcludeSundays(checked);
//     }
//   };

//   // Update selected dates when excludeSaturdays or excludeSundays changes
//   useEffect(() => {
//     setSelectedDates(filterWeekends(selectedDates));
//   }, [excludeSaturdays, excludeSundays]);

//   // Function to apply custom CSS classes for weekend days
//   const dayClassName = (date) => {
//     const day = date.getDay();
//     if ((day === 6 && excludeSaturdays) || (day === 0 && excludeSundays)) {
//       return 'weekend-day'; // Apply this class for Saturdays and Sundays when excluded
//     }
//     return '';
//   };

//   const handleMultipleDateChange = (date) => {
//     setMultipleDates((prevDates) => {
//       const dateExists = prevDates.some((d) => dayjs(d).isSame(date, 'day'));
//       let newDates;
//       if (dateExists) {
//         newDates = prevDates.filter((d) => !dayjs(d).isSame(date, 'day'));
//       } else {
//         newDates = [...prevDates, date];
//       }
//       console.log('Selected Dates:', newDates.map((d) => dayjs(d).format('YYYY-MM-DD')));
//       setSelectedCount(newDates.length); // Update the count of selected dates
//       return newDates;
//     });
//   };

//   return (
//     <div className="container">
//       <div className="date-range-field">
//         <input
//           type="text"
//           placeholder="Start Date"
//           value={selectedDates[0] ? selectedDates[0].toLocaleDateString() : ''}
//           readOnly
//         />
//         <input
//           type="text"
//           placeholder="End Date"
//           value={selectedDates[1] ? selectedDates[1].toLocaleDateString() : ''}
//           readOnly
//         />
//       </div>
//       <div className="calendar-container">
//         <div className="selected-container">
//           <form className="form">
//             <input
//               type="checkbox"
//               id="saturday"
//               name="saturday"
//               checked={excludeSaturdays}
//               onChange={handleCheckboxChange}
//             />
//             <label htmlFor="saturday">Saturday</label>
//             <br />
//             <input
//               type="checkbox"
//               id="sunday"
//               name="sunday"
//               checked={excludeSundays}
//               onChange={handleCheckboxChange}
//             />
//             <label htmlFor="sunday">Sunday</label>
//             <br />
//             <br />
//           </form>
//         </div>
//         <DatePicker
//           selected={selectedDates[0]}
//           startDate={selectedDates[0]}
//           endDate={selectedDates[1]}
//           onChange={handleDateChange}
//           selectsRange
//           inline
//           dayClassName={dayClassName}
//         />
//         <h2>Multiple Date Picker</h2>
//         <DatePicker
//           inline
//           selected={null}
//           onChange={handleMultipleDateChange}
//           highlightDates={multipleDates}
//           dayClassName={dayClassName}
//         />
//         <p>Selected Dates Count: {selectedCount}</p> {/* Display the count of selected dates */}
//       </div>
//     </div>
//   );
// }
