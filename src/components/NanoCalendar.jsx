import { memo, useEffect, useMemo, useState } from "react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function NanoCalendar() {
  const [hasHost, setHasHost] = useState(false);
  const now = useMemo(() => new Date(), []);
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  useEffect(() => { setHasHost(!!document.getElementById("playerBirthday")); }, []);

  const grid = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push({ blank: true, key: `b${i}` });
    for (let d = 1; d <= days; d++) {
      cells.push({
        day: d,
        key: `d${d}`,
        today: d === now.getDate() && year === now.getFullYear() && month === now.getMonth(),
      });
    }
    return cells;
  }, [year, month, now]);

  const years = useMemo(() => {
    const arr = [];
    for (let y = 1990; y <= 2030; y++) arr.push(y);
    return arr;
  }, []);

  if (!hasHost) return null;

  const pickDay = (d) => {
    const input = document.getElementById("playerBirthday");
    if (input) {
      const mm = String(month + 1).padStart(2, "0");
      const dd = String(d).padStart(2, "0");
      input.value = `${year}-${mm}-${dd}`;
    }
  };

  return (
    <div className="nano-calendar" id="nanoCalendar">
      <div className="cal-header">
        <div className="month-strip">
          {MONTHS.map((m, idx) => (
            <div
              key={m}
              className={`month-item${idx === month ? " active" : ""}`}
              onClick={() => setMonth(idx)}
            >
              {m.substring(0, 3)}
            </div>
          ))}
        </div>
        <div className="today-label">{`${MONTHS[month]} ${year}`}</div>
      </div>
      <div className="cal-body">
        <div className="year-scroller">
          {years.map((y) => (
            <div
              key={y}
              className={`year-item${y === year ? " active" : ""}`}
              onClick={() => setYear(y)}
            >
              {y}
            </div>
          ))}
        </div>
        <div className="cal-grid">
          {grid.map((c) =>
            c.blank ? (
              <div key={c.key} className="day other">&nbsp;</div>
            ) : (
              <div
                key={c.key}
                className={`day${c.today ? " today" : ""}`}
                data-day={c.day}
                onClick={() => pickDay(c.day)}
              >
                {c.day}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(NanoCalendar);
