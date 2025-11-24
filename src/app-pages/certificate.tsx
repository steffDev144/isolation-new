"use client"
import { RedButton } from "@/shared/ui/RedButton/RedButton";
import { TitleSection } from "@/shared/ui/title-section";
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { useRef, useState, useEffect } from "react";

import Link from "next/link";
import axios from "axios";

interface CertificateData {
    id: number;
    urlImage: string;
    price: string;
    validity: string;
    design_description: string;
    delivery_options: string[];
    description: string;
}

export function CertificatePage() {
    const swiperRef = useRef<SwiperType | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [certificates, setCertificates] = useState<CertificateData[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    // Фиксированные данные для информации (берем из первого сертификата)
    const [staticInfo, setStaticInfo] = useState<CertificateData | null>(null);

    useEffect(() => {
        GetCertificates();
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const FetchCertificates = async (): Promise<CertificateData[]> => {
        try {
            const { data } = await axios.get<CertificateData[]>("https://0275d3dd1dabf767.mokky.dev/certificate-page");
            return data;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const GetCertificates = async (): Promise<void> => {
        setLoading(true);
        const data = await FetchCertificates();
        setCertificates(data);
        if (data.length > 0) {
            // Устанавливаем фиксированную информацию из первого сертификата
            setStaticInfo(data[0]);
            setActiveIndex(0);
        }
        setLoading(false);
    };

    const handleSlideChange = (swiper: SwiperType) => {
        const newIndex = swiper.realIndex;
        setActiveIndex(newIndex);
        // Информация не меняется при перелистывании
    };

    const handlePrevSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const handleNextSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, direction: 'prev' | 'next') => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (direction === 'prev') {
                handlePrevSlide();
            } else {
                handleNextSlide();
            }
        }
    };

    if (loading) {
        return (
            <div className="certificate">
                <div className="container">Загрузка сертификатов...</div>
            </div>
        );
    }

    if (!staticInfo || certificates.length === 0) {
        return (
            <div className="certificate">
                <div className="container">Нет данных о сертификатах</div>
            </div>
        );
    }

    return (
        <div className="certificate">
            <div className="certificate__navigation">
                <Link href="/" className="certificate__navigation-link">
                    Главная
                </Link>
                <span className="certificate__navigation-separator">›</span>
                <span className="certificate__navigation-current">Сертификаты</span>
            </div>

            <TitleSection classTitle={"certificate__title"} text={"сертификаты"} />

            <div className="certificate__wrapper">
                <div className="certificate__wrapper_info">
                    {/* Используем фиксированные данные из staticInfo */}
                    <div className="certificate__wrapper_info-block">
                        <h5 className="certificate__wrapper_info-block_title">Цена:</h5>
                        <p className="certificate__wrapper_info-block_descr">{staticInfo.price}</p>
                    </div>
                    <div className="certificate__wrapper_info-block">
                        <h5 className="certificate__wrapper_info-block_title">Срок действия:</h5>
                        <p className="certificate__wrapper_info-block_descr">{staticInfo.validity}</p>
                    </div>
                    <div className="certificate__wrapper_info-block">
                        <h5 className="certificate__wrapper_info-block_title">Дизайн:</h5>
                        <p className="certificate__wrapper_info-block_descr">{staticInfo.design_description}</p>
                        <Image
                            className="certificate__wrapper_info-block_quesition"
                            src={"/icons/uestion.svg"}
                            width={30}
                            height={30}
                            alt="Вопрос"
                        />
                    </div>

                    <ul className="certificate__wrapper_info-list">
                        <h5 className="certificate__wrapper_info-list_title">Как получить:</h5>
                        {staticInfo.delivery_options.map((option, index) => (
                            <li key={index} className="certificate__wrapper_info-list_item">
                                {option}
                            </li>
                        ))}
                    </ul>

                    <p className="certificate__wrapper_info-text">
                        {staticInfo.description}
                    </p>
                    <RedButton
                        altImage={"заказать сертификат"}
                        classButton={"certificate__wrapper_info-btn"}
                        textButton={"заказать сертификат"}
                    />
                </div>

                <div className="certificate__wrapper_slider">
                    {!isMobile && (
                        <>
                            <div
                                className="certificate__wrapper_slider-arrow left"
                                onClick={handlePrevSlide}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => handleKeyDown(e, 'prev')}
                            >
                                <Image src={"/icons/left-arrow.svg"} width={20} height={20} alt="стрелка влево" />
                            </div>
                            <div
                                className="certificate__wrapper_slider-arrow right"
                                onClick={handleNextSlide}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => handleKeyDown(e, 'next')}
                            >
                                <Image src={"/icons/right-arrow.svg"} width={20} height={20} alt="стрелка вправо" />
                            </div>
                        </>
                    )}

                    <Swiper
                        className="certificate__wrapper_slider-scroll"
                        slidesPerView={1}
                        spaceBetween={20}
                        loop={true}
                    >
                        {certificates.map((certificate) => (
                            <SwiperSlide key={certificate.id}>
                                <div className="slide-image-container">
                                    <Image
                                        width={900}
                                        height={900}
                                        src={certificate.urlImage}
                                        alt={`Сертификат ${certificate.id}`}
                                        priority={certificate.id === 1}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}