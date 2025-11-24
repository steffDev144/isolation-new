// shared/ui/record-list/index.tsx
import "./index.scss";
import { Booking } from "@/widgets/booking";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface RecordListProps {
  timeSlots: TimeSlot[];
  date: string;
  onTimeSelect: (date: string, time: string, available: boolean) => void;
  selectedTime: { date: string; time: string } | null;
  questPrice: number;
  onCloseBooking: () => void;
}

export function RecordList({ 
  timeSlots, 
  date, 
  onTimeSelect, 
  selectedTime, 
  questPrice, 
  onCloseBooking 
}: RecordListProps) {
  const isTimeSelected = (time: string) => {
    return selectedTime?.date === date && selectedTime?.time === time;
  };

  const handleTimeClick = (time: string, available: boolean) => {
    if (!available) return;
    
    // Если кликаем на уже выбранное время - закрываем форму
    if (isTimeSelected(time)) {
      onCloseBooking();
    } else {
      // Иначе открываем форму для нового времени
      onTimeSelect(date, time, available);
    }
  };

  return (
    <div className="record-list-container">
      <ul className="record__list">
        <li className="record__list_date">{date}</li>
        {timeSlots.map((timeSlot, i) => (
          <li
            key={i}
            className={`
              record__list_item 
              ${!timeSlot.available ? 'record__list_item--unavailable' : ''}
              ${isTimeSelected(timeSlot.time) && timeSlot.available ? 'record__list_item--selected' : ''}
            `}
            onClick={() => handleTimeClick(timeSlot.time, timeSlot.available)}
          >
            {timeSlot.time}
          </li>
        ))}
      </ul>

      {selectedTime?.date === date && selectedTime?.time && (
        <div className="record-list__booking-form">
          <Booking
            date={selectedTime.date}
            time={selectedTime.time}
            onClose={onCloseBooking}
            questPrice={questPrice}
          />
        </div>
      )}
    </div>
  );
}