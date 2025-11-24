import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import "./index.scss";


export function MobileSliderQuest() {
    return (
        <div className="quest-images">

            <div className="quest-images__mobile">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    className="quest-images__slider"
                >
                    <SwiperSlide>
                        <div className="slide-inner">
                            <Image
                                width={400}
                                height={300}
                                alt="картинка квеста"
                                src="/images/quest-images/one.png"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-inner">
                            <Image
                                width={400}
                                height={300}
                                alt="картинка квеста"
                                src="/images/quest-images/two.png"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-inner">
                            <Image
                                width={400}
                                height={300}
                                alt="картинка квеста"
                                src="/images/quest-images/three.png"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

        </div>
    );
}