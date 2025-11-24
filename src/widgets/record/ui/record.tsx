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
  date: string;
  day_of_week: string;
  time_slots: TimeSlot[];
}

interface ApiResponse {
  unavailable_slots: UnavailableSlot[];
}

interface RecordProps {
  onTimeSelect?: (date: string, time: string) => void;
}

export function Record({ onTimeSelect }: RecordProps) {
  const [selectedTime, setSelectedTime] = useState<{ date: string; time: string } | null>(null);
  const [unavailableSlots, setUnavailableSlots] = useState<UnavailableSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnavailableSlots = async () => {
      try {
        const response = await fetch('https://0275d3dd1dabf767.mokky.dev/quest-time');
        const data: ApiResponse[] = await response.json();
        setUnavailableSlots(data[0].unavailable_slots);
      } catch (error) {
        console.error('Error fetching unavailable slots:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnavailableSlots();
  }, []);

  const handleTimeSelect = (date: string, time: string, available: boolean) => {
    if (!available) return;

    setSelectedTime({ date, time });

    if (onTimeSelect) {
      onTimeSelect(date, time);
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

  return (
    <section className="record">
      <TitleSection classTitle="record__title" text="Запись" />

      {unavailableSlots.map((slot, index) => (
        <RecordList
          key={index}
          timeSlots={slot.time_slots}
          date={`${slot.date.split('-')[2]} ${getMonthName(slot.date)}, ${slot.day_of_week}`}
          onTimeSelect={handleTimeSelect}
          selectedTime={selectedTime}
          questPrice={3000}
          onCloseBooking={handleCloseBooking}
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