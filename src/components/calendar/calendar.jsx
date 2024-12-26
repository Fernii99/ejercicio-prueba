import React, { useEffect } from 'react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

// Function to get the number of days in a month
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Function to get the first day of the month (adjusted for Monday-start week)
const getFirstDayOfMonth = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to 6, Monday (1) to 0
};

export const Calendar = ({ year, festivos = [], date }) => {

  const currentYear = year;

  useEffect(() => {
  },[date, festivos, year])

  return (
    <div className="calendar">
      {months.map((month, monthIndex) => {
        const daysInMonth = getDaysInMonth(currentYear, monthIndex);
        const firstDay = getFirstDayOfMonth(currentYear, monthIndex);

        return (
          <div key={monthIndex} className="month-container">
            <h2>{month}</h2>
            <div className="days-of-week">
              {daysOfWeek.map((day) => (
                <div key={day} className="day-header">{day}</div>
              ))}
            </div>
            <div className="days-grid">
              {/* Create empty cells for the days before the first day of the month */}
              {Array(firstDay).fill(null).map((_, i) => (
                <div key={`empty-${i}`} className="day empty"></div>
              ))}

              {Array.from({ length: daysInMonth }, (_, dayIndex) => {
                const dayNumber = dayIndex + 1;
                const dateString = `${currentYear}/${String(monthIndex + 1).padStart(2, '0')}/${String(dayNumber).padStart(2, '0')}`;
                const dayString = `${currentYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
                const isMarked = festivos != [] && festivos.includes(dateString) ;
                
                
                const isPayment = date != "" && date === dayString;
                
                const dayOfWeek = (firstDay + dayIndex) % 7;
                const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Saturday (5) and Sunday (6)
                return (
                  <div
                    key={dayIndex}
                    className={` day ${isMarked ? 'marked' : ''} ${isWeekend ? 'weekend' : ''} ${isPayment ? 'payment' : ''} `}
                  >
                    {dayNumber}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};