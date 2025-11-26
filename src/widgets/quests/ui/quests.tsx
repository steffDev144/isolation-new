"use client";
import { Quest } from "@/shared/ui/quest";
import "./quests.scss";
import { TitleSection } from "@/shared/ui/title-section";
import { useEffect, useState } from "react";
import axios from "axios";

export interface CardsState {
  id: number;
  nameQuest: string;
  descrQuest: string;
  descrQuestToo?: string;
  locationQuest: string;
  priceQuest: number;
  maxPeople: string;
  level?: number;
  imageUrl: string;
  keys: number;
  slug?: string;
  complexity: number; // Добавляем поле сложности
}

export function Quests() {
  const [cards, setCards] = useState<CardsState[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetCards();
  }, []);

  const FetchCards = async () => {
    try {
      const { data } = await axios.get("https://0275d3dd1dabf767.mokky.dev/card-main");

      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const GetCards = async () => {
    setLoading(true);
    const data = await FetchCards();
    console.log('Data from server:', data);
    setCards(data);
    setLoading(false);
  };

  if (loading) {
    return <div>loading...</div>;
  }

  if (cards.length === 0) {
    return <div>Квесты не найдены</div>;
  }

  const contentCard = cards.map(item => {
    return (
      <Quest
        key={item.id}
        id={item.id}
        nameQuest={item.nameQuest}
        descrQuest={item.descrQuest}
        locationQuest={item.locationQuest}
        priceQuest={item.priceQuest}
        maxPeople={item.maxPeople}
        imageUrl={item.imageUrl}
        keys={item.keys}
        complexity={item.complexity} // Передаем сложность
      />
    );
  });

  return (
    <section className="quests">
      <TitleSection id={"quests"} classTitle="quests__title" text="Наши квесты" />
      <div className="quests__wrapper">
        {contentCard}
      </div>
    </section>
  );
}