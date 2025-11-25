// shared/ui/record-list/index.tsx
import "./index.scss";
import { Booking } from "@/widgets/booking";

interface TimeSlot {
  time: string;
  available: boolean;
  price: number;
}

interface RecordListProps {
  timeSlots: TimeSlot[];
  slots: any;
  date: string;
  onTimeSelect: (date: string, time: string, available: boolean, price: number) => void;
  selectedTime: { date: string; time: string; price: number } | null;
  questPrice: number;
  onCloseBooking: () => void;
}

export function RecordList({ 
  timeSlots, 
  slots,
  date, 
  onTimeSelect, 
  selectedTime, 
  questPrice, 
  onCloseBooking 
}: RecordListProps) {
  const isTimeSelected = (time: string) => {
    return selectedTime?.date === date && selectedTime?.time === time;
  };

  const handleTimeClick = (time: string, available: boolean, price: number) => {
    if (!available) return;
    
    // Если кликаем на уже выбранное время - закрываем форму
    if (isTimeSelected(time)) {
      onCloseBooking();
    } else {
      // Иначе открываем форму для нового времени
      onTimeSelect(date, time, available, price);
    }
  };

  // Функция для обновления доступности слотов
  const updateSlotsAvailability = (allSlots: any, bookedSlots: any) => {
    return allSlots.map(slot => ({
      ...slot,
      available: slot.available ? !bookedSlots.includes(slot.time) : false
    }));
  };

  const formatDate = (dateStr) => { const d=new Date(dateStr), m=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'], w=['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота']; return `${d.getDate()} ${m[d.getMonth()]}, ${w[d.getDay()]}`; }

  slots.map(slot => {
    if(formatDate(slot.date) == date) {
      timeSlots = updateSlotsAvailability(timeSlots, slot.time_slots);
    }
  })
  
  
  

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
            onClick={() => handleTimeClick(timeSlot.time, timeSlot.available, timeSlot.price)}
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
            questPrice={selectedTime.price}
          />
        </div>
      )}
    </div>
  );
}