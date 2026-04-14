function DateRangePicker({ startDate, endDate, onDateChange }) {
  return (
    <div className="date-range-picker">
      <label className="date-range-field">
        <span>De:</span>
        <input
          type="date"
          value={startDate}
          max={endDate || undefined}
          onChange={(e) => onDateChange(e.target.value, endDate)}
        />
      </label>
      <label className="date-range-field">
        <span>Até:</span>
        <input
          type="date"
          value={endDate}
          min={startDate || undefined}
          onChange={(e) => onDateChange(startDate, e.target.value)}
        />
      </label>
    </div>
  );
}

export default DateRangePicker;
