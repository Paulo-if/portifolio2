"use client";

import React from 'react';
import FanCarousel from '@/components/FanCarousel/FanCarousel';
import { gallery } from '@/resources/content';

export default function FanDemoPage() {
    // Extract image sources from the gallery resource
    const images = gallery.images.map(img => img.src);

    return (
        <main style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', width: '100%' }}>
            <FanCarousel images={images} />
        </main>
    );
}
