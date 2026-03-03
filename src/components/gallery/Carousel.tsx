"use client";

import { useState, useEffect, useRef } from "react";
import { Media, Heading, Flex } from "@once-ui-system/core";
import { gallery } from "@/resources";

interface CarouselProps {
    title?: string;
    reverse?: boolean;
}

export default function Carousel({ title, reverse = false }: CarouselProps) {
    const [isPaused, setIsPaused] = useState(true);
    const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Triple images to ensure the track is always full and smooth
    const images = [...gallery.images, ...gallery.images, ...gallery.images];

    const handleInteraction = () => {
        setIsPaused(true);
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current);
        }
    };

    const handleMouseLeave = () => {
        resumeTimeoutRef.current = setTimeout(() => {
            setIsPaused(false);
        }, 2000);
    };

    useEffect(() => {
        const initialTimer = setTimeout(() => {
            setIsPaused(false);
        }, 2500);

        return () => {
            clearTimeout(initialTimer);
            if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        };
    }, []);

    return (
        <Flex direction="column" gap="16" fillWidth>
            {title && (
                <Heading align="left" variant="display-strong-xs" paddingX="16">
                    {title}
                </Heading>
            )}
            <div
                className="carousel-container"
                onMouseEnter={handleInteraction}
                onMouseLeave={handleMouseLeave}
                data-paused={isPaused}
            >
                <div className={`carousel-track ${reverse ? "reverse" : ""}`}>
                    {images.map((image, index) => (
                        <div key={index} className="carousel-item">
                            <Media
                                priority={index < 3}
                                aspectRatio="4 / 5"
                                src={image.src}
                                alt={image.alt}
                                radius="m"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Flex>
    );
}
