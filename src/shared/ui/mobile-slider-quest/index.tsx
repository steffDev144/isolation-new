import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import "./index.scss";


export function MobileSliderQuest(images: any, alt: any) {
    return (
        <div className="quest-images">

            <div className="quest-images__mobile">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    className="quest-images__slider"
                >

                    {images.images.map((img, key) => (
                        <SwiperSlide>
                            <View img={img} key={key}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </div>
    );
}

function View(img, key) {
    if(img.img.indexOf('http://') == 0 || img.img.indexOf('https://') == 0) {
        return (
            <div key={key} className="slide-inner">
                <img width={400} height={300} src={img.img}/>
            </div>
        )
    } else {
        return (
            <div key={key} className="slide-inner">
                <Image width={400} height={300} src={img.img} />
            </div>
        )
    }
}