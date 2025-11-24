"use client"

import { RedButton } from "@/shared/ui/RedButton/RedButton";
import "./hero-main.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAbout } from "@/store";

interface HeroInfo {
  id: number;
  descr_section: string;
}

export function HeroMain() {
  const [info, setInfo] = useState<HeroInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const { load } = useAbout();

  useEffect(() => {
    GetInfo();
  }, []);

  const FetchInfo = async (): Promise<HeroInfo[]> => {
    try {
      const { data } = await axios.get<HeroInfo[]>("https://0275d3dd1dabf767.mokky.dev/hero-section");
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const GetInfo = async (): Promise<void> => {
    setLoading(true);
    const data = await FetchInfo();
    setInfo(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="hero">
        <div className="hero__wrapper">
          <p className="hero__wrapper_about">Загрузка...</p>
          <RedButton classButton="hero__wrapper_select" textButton="выбрать квест" altImage="выбрать квест" href={load ? "#" : "#quests"} />
        </div>
      </section>
    );
  }

  return (
    <section className="hero">
      <div className="hero__wrapper">
        {info.map((item) => (
          <p key={item.id} className="hero__wrapper_about">{item.descr_section}</p>
        ))}
        {/* Добавьте href здесь тоже */}
        <RedButton classButton="hero__wrapper_select" textButton="выбрать квест" altImage="выбрать квест" href="#quests" />
      </div>
    </section>
  );
}