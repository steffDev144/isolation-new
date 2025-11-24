"use client"

import Image from "next/image"
import Link from "next/link";

import "./about.scss"
import { TitleSection } from "@/shared/ui/title-section";
import { ScrollTeam } from "@/shared/config/scrollTeam";
import { useEffect, useState } from "react";
import axios from "axios";
import { AboutSlider } from "@/widgets/aboutSlider/about-slider";
import { useAbout } from "@/store";

interface SliderItem {
    id: number;
    urlImage: string;
}

interface AboutData {
    id: string;
    title_section_one?: string;
    title_section_two?: string;
    descr_section_one?: string;
    descr_section_two?: string;
    text_link?: string;
    slider_scroll?: SliderItem[];
}

export function About() {
    const {
        info,
        load,
        error,
        fetchInfo,
        getTitle,
        getDescription,
        getSlider
    } = useAbout();

    useEffect(() => {
        fetchInfo();
    }, [fetchInfo]);

    // Используем геттеры
    const titleData = getTitle();
    const descrData = getDescription();
    const sliderData = getSlider();

    if (load) {
        return <div className="about">Загрузка...</div>;
    }

    return (
        <>
            <section className="about">
                {titleData && (
                    <div className="about__title">
                        <h2 className="about__title_one"> <span>ISOLATION</span> – это то, что перенесет вас в абсолютно новый мир</h2>
                    </div>
                )}

                {descrData && (
                    <div className="about__wrapper">
                        <div className="about__wrapper_link">
                            <h3 className="about__wrapper_link-descr">
                                {descrData.text_link}
                            </h3>
                            <Link href="https://vk.com/dubna_isolation" className="about__wrapper_link-img">
                                <Image
                                    src="/images/link-about-img.png"
                                    alt="Наше фото"
                                    width={55}
                                    height={80}
                                />
                            </Link>
                        </div>
                        <div className="about__wrapper_text">
                            <p className="about__wrapper_text-item">
                                {descrData.descr_section_one}
                            </p>
                            <p className="about__wrapper_text-item">
                                {descrData.descr_section_two}
                            </p>
                        </div>
                    </div>
                )}
            </section>
            <AboutSlider sliderData={sliderData} fallbackData={ScrollTeam} />
        </>
    )
}