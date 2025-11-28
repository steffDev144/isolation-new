"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';

interface SliderItem {
    id: number;
    urlImage: string;
}

interface AboutData {
    id: string;
    slider_scroll?: SliderItem[];
}

interface AboutSliderProps {
    sliderData?: AboutData;
    fallbackData: SliderItem[];
}

export function AboutSlider({ sliderData, fallbackData }: AboutSliderProps) {
    const swiperRef = useRef<SwiperType>(null);
    const sliderItems = sliderData?.slider_scroll || fallbackData;
    
    return (
        <section className="about-slider">
            <div className="about-slider__container">
                <Swiper
                    className="about-slider__swiper"
                    modules={[Autoplay, FreeMode]}
                    slidesPerView={"auto"}
                    loop={true}
                    freeMode={{
                        enabled: true,
                        momentum: true,
                        sticky: false,
                        minimumVelocity: 0.01,
                    }}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                        stopOnLastSlide: false,
                    }}
                    speed={8000}
                    grabCursor={true}
                    allowTouchMove={true}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        setTimeout(() => {
                            swiper.autoplay?.start();
                        }, 100);
                    }}
                    onInit={(swiper) => {
                        swiper.autoplay?.start();
                    }}
                >
                    {sliderItems.map((item: SliderItem) => (
                        <SwiperSlide
                            key={item.id}
                            className="about-slider__slide"
                            style={{
                                width: '500px',
                                flexShrink: 0,
                                cursor: 'grab'
                            }}
                        >
                            
                            <ViewImg url={item.urlImage}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

function ViewImg(url: any) {
    if(url.url.indexOf('http://') == 0 || url.url.indexOf('https://') == 0) {
        return (
            <img className="about-slider__image" width={500} height={350} alt="наши команды" src={url.url}/>
        )
    } else {
        return <Image className="about-slider__image" width={500} height={350} src={url.url} alt="наши команды" />
    }
}