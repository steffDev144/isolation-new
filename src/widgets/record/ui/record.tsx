"use client";

import { TitleSection } from "@/shared/ui/title-section";
import "./record.scss";
import { RecordList } from "@/shared/ui/record-list";
import { useState, useEffect } from "react";
import { Booking } from "@/widgets/booking";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface UnavailableSlot {
  id: number;
  date: string;
  day_of_week: string;
  time_slots: any;
  price: number;
}

interface Slots {
  date: string;
  time_slots: any;
}

interface ApiResponse {
  unavailable_slots: UnavailableSlot[];
}

interface RecordProps {
  onTimeSelect?: (date: string, time: string) => void;
  qId: number;
  name: string;
}

export function Record({ onTimeSelect, qId, name }: RecordProps) {
  const [selectedTime, setSelectedTime] = useState<{ date: string; time: string; price: number } | null>(null);
  const [unavailableSlots, setUnavailableSlots] = useState<UnavailableSlot[]>([]);
  const [slots, setSlots] = useState<Slots[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnavailableSlots = async () => {
      try {
        const response = await fetch('https://0275d3dd1dabf767.mokky.dev/quest-time');
        const data: ApiResponse[] = await response.json();
        setSlots(data[0].unavailable_slots);
      } catch (error) {
        console.error('Error fetching unavailable slots:', error);
      } finally {
        setLoading(false);
      }
    };

    // setSlots([
    //   {
    //     "date": "2025-11-23",
    //     "time_slots": ['10:00', '17:30'],
    //   },
    // ]);
    fetchUnavailableSlots();
  }, []);

  const handleTimeSelect = (date: string, time: string, available: boolean, price: number) => {
    if (!available) return;

    setSelectedTime({ date, time, price });

    if (onTimeSelect) {
      onTimeSelect(date, time, price);
    }
  };

  const handleCloseBooking = () => {
    setSelectedTime(null);
  };

  if (loading) {
    return (
      <section className="record">
        <TitleSection classTitle="record__title" text="Запись" />
        <div>Загрузка...</div>
      </section>
    );
  }

  const twoWeekSchedule = generateTwoWeeksSchedule();

  return (
    <section className="record">
      <TitleSection classTitle="record__title" text="Запись" />

      {twoWeekSchedule.map((slot, index) => (
        <RecordList
          key={index}
          id={qId}
          slots={slots}
          timeSlots={slot.timeSlots}
          date={slot.date}
          onTimeSelect={handleTimeSelect}
          selectedTime={selectedTime}
          questPrice={3500}
          onCloseBooking={handleCloseBooking}
          name={name}
        />
      ))}
    </section>
  );
}

function getMonthName(dateString: string): string {
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  const monthIndex = parseInt(dateString.split('-')[1]) - 1;
  return months[monthIndex];
}

function generateRussianHolidays(year) {
  const holidays = [];
  
  // Фиксированные государственные праздники России
  const fixedHolidays = [
    `01-01`, // Новый год
    `01-02`, // Новый год
    `01-03`, // Новый год
    `01-04`, // Новый год
    `01-05`, // Новый год
    `01-06`, // Новый год
    `01-07`, // Рождество Христово
    `01-08`, // Новый год
    `02-23`, // День защитника Отечества
    `03-08`, // Международный женский день
    `05-01`, // Праздник Весны и Труда
    `05-09`, // День Победы
    `06-12`, // День России
    `11-04`  // День народного единства
  ];
  
  // Добавляем фиксированные праздники
  fixedHolidays.forEach(monthDay => {
    holidays.push(`${year}-${monthDay}`);
  });
  
  // Рассчитываем плавающие праздники
  // Пасха (православная) - рассчитывается по алгоритму Гаусса
  const easterDate = calculateOrthodoxEaster(year);
  holidays.push(easterDate);
  
  // День России иногда переносится, но для простоты оставим фиксированным
  // Можно добавить другие религиозные праздники, если нужно
  
  return holidays;
}

function calculateOrthodoxEaster(year) {
  // Алгоритм расчета православной Пасхи (метод Гаусса)
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;
  
  const date = new Date(year, month - 1, day);
  // Переводим в григорианский календарь (добавляем 13 дней для 20-21 веков)
  date.setDate(date.getDate() + 13);
  
  return date.toISOString().split('T')[0];
}

function generateTwoWeeksSchedule() {
  // Массивы для форматирования дат
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  
  const daysOfWeek = [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
    'Четверг', 'Пятница', 'Суббота'
  ];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  // Автогенерация праздничных дней
  const holidays = generateRussianHolidays(currentYear);
  
  // Проверяем следующий год на случай, если 2 недели захватывают январь следующего года
  const nextYearHolidays = generateRussianHolidays(currentYear + 1);
  holidays.push(...nextYearHolidays);

  const schedule = [];

  // Генерируем 14 дней
  for (let i = 0; i < 14; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    
    // Форматируем дату для отображения
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dateString = `${dayOfMonth} ${month}, ${dayOfWeek}`;
    
    // Проверяем, выходной ли день (суббота или воскресенье)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    // Проверяем, праздничный ли день
    const dateISO = date.toISOString().split('T')[0];
    const isHoliday = holidays.includes(dateISO);
    
    // Генерируем временные слоты с 10:00 до 01:00 (следующего дня)
    const timeSlots = [];
    let hour = 10;
    let minute = 0;
    
    while (!(hour === 1 && minute === 0)) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      // Создаем полную дату и время для проверки активности
      const slotDateTime = new Date(date);
      
      // Если время после 00:00, это уже следующий день
      if (hour >= 24 || (hour === 0 && minute === 0)) {
        slotDateTime.setDate(date.getDate() + 1);
        slotDateTime.setHours(hour - 24, minute, 0, 0);
      } else {
        slotDateTime.setHours(hour, minute, 0, 0);
      }
      
      // Проверяем активность слота
      let isActive = true;
      if (i === 0) { // Только для текущего дня
        isActive = slotDateTime > currentDate;
      }
      
      // Рассчитываем цену
      let price = 3500;
      
      // +1000 если выходной или праздник
      if (isWeekend || isHoliday) price += 1000;
      
      // +1000 если время 22:00 или больше
      if (hour >= 22 || hour < 1) price += 1000;
      
      timeSlots.push({
        time: timeString,
        price: price,
        available: isActive
      });
      
      // Увеличиваем время на 1.5 часа
      hour += 1;
      minute += 30;
      if (minute >= 60) {
        hour += 1;
        minute -= 60;
      }
      if (hour >= 24) {
        hour -= 24;
      }
    }
    
    if(dayOfWeek == 'Пятница' || dayOfWeek == 'Суббота') {
      // Добавляем последний слот 01:00
      const lastSlotDateTime = new Date(date);
      lastSlotDateTime.setDate(date.getDate() + 1);
      lastSlotDateTime.setHours(1, 0, 0, 0);
      let isLastSlotActive = true;
      if (i === 0) {
        isLastSlotActive = lastSlotDateTime > currentDate;
      }
      let lastSlotPrice = 3500;
      if (isWeekend || isHoliday) lastSlotPrice += 1000;
      lastSlotPrice += 1000; // Всегда +1000 для 01:00
      
      timeSlots.push({
        time: '01:00',
        price: lastSlotPrice,
        available: isLastSlotActive
      });
    }
    
    
    
    

    schedule.push({
      date: dateString,
      fullDate: date,
      isWeekend: isWeekend,
      isHoliday: isHoliday,
      timeSlots: timeSlots
    });
  }

  return schedule;
}