"use client";

import { useEffect, useState } from "react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "./slider.scss";

export function Slider({
  images,
  objectFit = "cover",
  autoplay = true,
}: {
  images: string[];
  objectFit?: "cover" | "contain";
  autoplay?: boolean;
}) {
  const [validMobileImages, setValidMobileImages] = useState<Record<string, boolean>>({});

  const getMobileImagePath = (imagePath: string): string => {
    try {
      const url = new URL(imagePath, window.location.origin);
      const pathname = url.pathname;
      
      const extensionMatch = pathname.match(/\.(jpg|jpeg|png|webp)(?=\?|$)/i);
      if (!extensionMatch) return imagePath;
      
      const extension = extensionMatch[0];
      const basePath = pathname.replace(extension, '');
      
      url.pathname = `${basePath}-mobile${extension}`;
      return url.toString().replace(window.location.origin, '');
    } catch {
      return imagePath.replace(/\.(jpg|jpeg|png|webp)(?=\?|$)/i, '-mobile.$1');
    }
  };

  useEffect(() => {
    images.forEach((image) => {
      const mobileImage = getMobileImagePath(image);

      if (mobileImage === image) {
        setValidMobileImages((prev) => ({ ...prev, [image]: false }));
        return;
      }

      const img = new Image();
      img.src = mobileImage;
      img.onload = () => setValidMobileImages((prev) => ({ ...prev, [image]: true }));
      img.onerror = () => setValidMobileImages((prev) => ({ ...prev, [image]: false }));
    });
  }, [images]);

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      loop
      navigation
      simulateTouch={false}
      autoplay={autoplay ? { delay: 5000 } : false}
      speed={500}
    >
      {images.map((image, index) => {
        const mobileImage = getMobileImagePath(image);
        const hasMobileVersion = validMobileImages[image];

        return (
          <SwiperSlide key={index}>
            <div className="page-header__wrapper-text page-header__wrapper-text_info">
              <picture>
                {hasMobileVersion && <source srcSet={mobileImage} media="(max-width: 768px)" />}
                <img src={image} alt={`Slide ${index + 1}`} style={{objectFit}} />
              </picture>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}