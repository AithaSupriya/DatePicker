import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './date.css';
import dayjs from 'dayjs';

export default function DateComponent() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [excludeSaturdays, setExcludeSaturdays] = useState(false);
  const [excludeSundays, setExcludeSundays] = useState(false);
  const [multipleDates, setMultipleDates] = useState([]); // State for multiple date selection
  const [selectedCount, setSelectedCount] = useState(0);

  // Handle date range selection
  const handleDateChange = (dates) => {
    let newDates = dates;
    if (excludeSaturdays || excludeSundays) {
      newDates = filterWeekends(newDates);
    }

    setSelectedDates(newDates);
  };

  // Filter weekends based on checkboxes
// Corrected code
const filterWeekends = (dates) => {
  if (!dates[0] || !dates[1]) return dates;

  const start = new Date(dates[0]);
  const end = new Date(dates[1]);
  const filteredDates = [];

  for (let d = new Date(start); d.getTime() <= end.getTime(); d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    if (!(excludeSaturdays && day === 6) && !(excludeSundays && day === 0)) {
      filteredDates.push(new Date(d));
    }
  }

  return filteredDates.length > 0 ? [filteredDates[0], filteredDates[filteredDates.length - 1]] : [null, null];
};


  // Handle checkbox changes for excluding weekends
  // Corrected code
const handleCheckboxChange = (e) => {
  const { id, checked } = e.target;
  setExcludeSaturdays((prevExcludeSaturdays) => id === 'saturday' ? checked : prevExcludeSaturdays);
  setExcludeSundays((prevExcludeSundays) => id === 'sunday' ? checked : prevExcludeSundays);
};

  // Effect to re-filter selected dates on checkbox change
  useEffect(() => {
    setSelectedDates((prevDates) => filterWeekends(prevDates));
  }, [excludeSaturdays, excludeSundays]);

  // Custom class names for date styles
  const dayClassName = (date) => {
    const day = date.getDay();
    const isSelectedDate = multipleDates.some((d) => dayjs(d).isSame(date, 'day'));
    const isInRange = selectedDates[0] && selectedDates[1] &&
      date >= selectedDates[0] && date <= selectedDates[1];

    if (isSelectedDate) {
      return 'selected-day';
    }
    if ((day === 6 && excludeSaturdays) || (day === 0 && excludeSundays)) {
      return 'weekend-day';
    }
    if (isInRange) {
      return 'range-day';
    }
    return '';
  };

  // Handle multiple date selection
  const handleMultipleDateChange = (date) => {
    setMultipleDates((prevDates) => {
      const dateExists = prevDates.some((d) => dayjs(d).isSame(date, 'day'));
      let newDate;
      if (dateExists) {
        newDate = prevDates.filter((d) => !dayjs(d).isSame(date, 'day'));
      } else {
        newDate = [...prevDates, date];
      }
      setSelectedCount(newDate.length);
      return newDate;
    });
  };

  return (
    <div className="container">
      <div className="calendar-container">
        <div className="selected-container">
          <form className="form">
            <div>
              <input
                type="checkbox"
                id="saturday"
                name="saturday"
                checked={excludeSaturdays}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="saturday"> Saturday</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="sunday"
                name="sunday"
                checked={excludeSundays}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="sunday"> Sunday</label>
            </div>
          </form>
          <div className="form">
            <p>Selected Dates: {selectedCount}</p>
          </div>
        </div>
        <div>
          <div className="date-range-field">
            <input
              type="text"
              placeholder="Start Date"
              value={selectedDates[0] ? selectedDates[0].toLocaleDateString() : ''}
              readOnly
            />
            <input
              type="text"
              placeholder="End Date"
              value={selectedDates[1] ? selectedDates[1].toLocaleDateString() : ''}
              readOnly
            />
          </div>
          <DatePicker
            selected={selectedDates[0]}
            startDate={selectedDates[0]}
            endDate={selectedDates[1]}
            onChange={handleDateChange}
            selectsRange
            inline
            highlightDates={multipleDates}
            dayClassName={dayClassName}
            onSelect={handleMultipleDateChange}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
    </div>
  );
}
