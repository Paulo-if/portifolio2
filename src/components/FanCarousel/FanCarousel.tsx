"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './FanCarousel.module.css';

interface FanCarouselProps {
    images: string[];
    title?: string;
}

const FanCarousel: React.FC<FanCarouselProps> = ({ images, title }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

    useEffect(() => {
        if (isPaused || fullscreenImage) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, 3000); // Passa a cada 3 segundos
        return () => clearInterval(interval);
    }, [images.length, isPaused, fullscreenImage]);

    const getCardClass = (index: number) => {
        const total = images.length;
        // Calculate relative position to activeIndex with wrapping
        let diff = index - activeIndex;

        // Handle wrapping for infinite loop
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;

        if (diff === 0) return styles['pos-0'];
        if (diff === 1) return styles['pos-1'];
        if (diff === -1) return styles['pos-minus-1'];
        if (diff === 2) return styles['pos-2'];
        if (diff === -2) return styles['pos-minus-2'];

        return styles.hidden;
    };

    const handleCardClick = (index: number, img: string) => {
        const total = images.length;
        let diff = index - activeIndex;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;

        if (diff === 0) {
            setFullscreenImage(img);
        }
    };

    return (
        <section className={styles.container}>
            {title && (
                <div className={styles.titleWrapper}>
                    <h2 className={styles.title}>{title}</h2>
                </div>
            )}
            <div
                className={styles.carouselWrapper}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className={styles.cardContainer}>
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`${styles.card} ${getCardClass(index)}`}
                            onClick={() => handleCardClick(index, img)}
                        >
                            <img src={img} alt={`Slide ${index}`} />
                        </div>
                    ))}
                </div>
            </div>


            {fullscreenImage && (
                <div
                    className={styles.modal}
                    onClick={() => setFullscreenImage(null)}
                >
                    <img
                        src={fullscreenImage}
                        alt="Fullscreen"
                        className={styles.modalImage}
                    />
                </div>
            )}
        </section>
    );
};

export default FanCarousel;
