"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./AnimatedBackground.module.css";

const BUBBLE_CONFIGS = [
    { size: 28, left: '5%', dur: 12, delay: 0 }, { size: 48, left: '12%', dur: 16, delay: 1.5 },
    { size: 18, left: '20%', dur: 10, delay: 3 }, { size: 62, left: '28%', dur: 19, delay: 0.8 },
    { size: 35, left: '35%', dur: 14, delay: 4 }, { size: 22, left: '43%', dur: 11, delay: 2 },
    { size: 75, left: '50%', dur: 22, delay: 0.5 }, { size: 30, left: '58%', dur: 13, delay: 5 },
    { size: 50, left: '65%', dur: 17, delay: 1 }, { size: 16, left: '72%', dur: 9, delay: 3.5 },
    { size: 88, left: '78%', dur: 25, delay: 0 }, { size: 24, left: '85%', dur: 12, delay: 6 },
    { size: 42, left: '90%', dur: 15, delay: 2.5 }, { size: 14, left: '8%', dur: 8, delay: 7 },
    { size: 55, left: '46%', dur: 20, delay: 1.2 },
];

export default function AnimatedBackground() {
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const counterNumRef = useRef<HTMLSpanElement>(null);

    const [popCount, setPopCount] = useState(0);

    const incrementCounter = useCallback(() => {
        setPopCount(prev => {
            const next = prev + 1;
            if (counterRef.current) {
                counterRef.current.classList.add(styles.popAnim);
                setTimeout(() => counterRef.current?.classList.remove(styles.popAnim), 400);
            }
            return next;
        });
    }, []);

    useEffect(() => {
        if (typeof window === "undefined" || !containerRef.current) return;

        const cont = containerRef.current;

        const spawnEl = (cls: string, cx: number, cy: number, extra: string) => {
            const el = document.createElement('div');
            el.className = styles[cls];
            el.style.cssText = `left:${cx}px;top:${cy}px;${extra}`;
            document.body.appendChild(el);
            el.addEventListener('animationend', () => el.remove(), { once: true });
        };

        const spawnDrops = (cx: number, cy: number, size: number) => {
            const n = Math.max(10, Math.floor(size / 4)), sp = size * 2.2;
            for (let i = 0; i < n; i++) {
                const a = (Math.PI * 2 / n) * i + (Math.random() - .5) * .6, d = sp * (.4 + Math.random() * .9);
                const el = document.createElement('div');
                el.className = styles.drop;
                el.style.cssText = `left:${cx}px;top:${cy}px;width:${(Math.random() * 5 + 2).toFixed(1)}px;height:${(Math.random() * 5 + 2).toFixed(1)}px;--ex:${(Math.cos(a) * d).toFixed(1)}px;--ey:${(Math.sin(a) * d - d * .25).toFixed(1)}px;--dur:${(.38 + Math.random() * .4).toFixed(2)}s;`;
                document.body.appendChild(el);
                el.addEventListener('animationend', () => el.remove(), { once: true });
            }
        };

        const spawnShards = (cx: number, cy: number, size: number) => {
            for (let i = 0; i < 10; i++) {
                const el = document.createElement('div');
                el.className = styles.shard;
                el.style.cssText = `left:${cx}px;top:${cy}px;--rot:${(360 / 10) * i + Math.random() * 18}deg;--dist:${size * (.8 + Math.random() * 1.2)}px;--dur:${(.3 + Math.random() * .3).toFixed(2)}s;--w:${(size * .15 + Math.random() * size * .25).toFixed(1)}px;`;
                document.body.appendChild(el);
                el.addEventListener('animationend', () => el.remove(), { once: true });
            }
        };

        const pop = (bubble: HTMLDivElement, cx: number, cy: number, cfg: any, idx: number) => {
            if (bubble.classList.contains(styles.bubblePopping)) return;
            document.body.classList.remove('on-bubble');
            incrementCounter();

            bubble.classList.add(styles.bubblePopping);
            bubble.style.cssText += `animation-name:${styles.bubblePop};animation-duration:0.35s;animation-delay:0s;animation-timing-function:cubic-bezier(0.36,0.07,0.19,0.97);animation-iteration-count:1;animation-fill-mode:forwards;`;
            bubble.addEventListener('animationend', () => bubble.remove(), { once: true });

            setTimeout(() => {
                const size = cfg.size;
                spawnEl('popRing', cx, cy, `width:${size}px;height:${size}px`);
                spawnEl('popRing2', cx, cy, `width:${size * .8}px;height:${size * .8}px`);
                spawnEl('popFlash', cx, cy, `width:${size * .7}px;height:${size * .7}px`);
                spawnDrops(cx, cy, size);
                spawnShards(cx, cy, size);
            }, 80);

            setTimeout(() => makeBubble(cfg, idx), 3000 + Math.random() * 2000);
        };

        const makeBubble = (cfg: any, idx: number) => {
            if (!cont) return;
            const b = document.createElement('div');
            b.className = styles.bubble;

            b.setAttribute('data-idx', idx.toString());

            const animName = idx % 2 === 0 ? styles.riseLeft : styles.riseRight;
            b.style.cssText = `width:${cfg.size}px;height:${cfg.size}px;left:${cfg.left};animation-name:${animName};animation-duration:${cfg.dur}s;animation-delay:${cfg.delay}s;animation-timing-function:linear;animation-iteration-count:infinite;`;

            b.addEventListener('mouseenter', () => document.body.classList.add('on-bubble'));
            b.addEventListener('mouseleave', () => document.body.classList.remove('on-bubble'));

            cont.appendChild(b);
        };

        BUBBLE_CONFIGS.forEach((c, i) => makeBubble(c, i));

        const handleGlobalClick = (e: MouseEvent) => {
            const elements = document.elementsFromPoint(e.clientX, e.clientY);
            const bubbleEl = Array.from(elements).find(el => el.classList.contains(styles.bubble)) as HTMLDivElement | undefined;
            if (bubbleEl) {
                const idxStr = bubbleEl.getAttribute('data-idx');
                if (idxStr !== null) {
                    const idx = parseInt(idxStr, 10);
                    const cfg = BUBBLE_CONFIGS[idx];
                    pop(bubbleEl, e.clientX, e.clientY, cfg, idx);
                }
            }
        };

        window.addEventListener('click', handleGlobalClick);

        return () => {
            window.removeEventListener('click', handleGlobalClick);
            if (cont) {
                while (cont.firstChild) {
                    cont.removeChild(cont.firstChild);
                }
            }
        };
    }, [incrementCounter]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleMouseMove = (e: MouseEvent) => {
            if (ringRef.current) {
                ringRef.current.style.left = e.clientX + 'px';
                ringRef.current.style.top = e.clientY + 'px';
            }
            if (dotRef.current) {
                dotRef.current.style.left = e.clientX + 'px';
                dotRef.current.style.top = e.clientY + 'px';
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        const handleMouseEnter = () => document.body.classList.add("onHover");
        const handleMouseLeave = () => document.body.classList.remove("onHover");

        const attachHoverEvents = () => {
            document.querySelectorAll('a, button').forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        attachHoverEvents();

        const observer = new MutationObserver(attachHoverEvents);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.querySelectorAll('a, button').forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
            observer.disconnect();
        };
    }, []);

    return (
        <div className={styles.background}>
            <div className={styles.blobTl}></div>
            <div className={styles.blobCr}></div>
            <div className={styles.blobBl}></div>

            <div className={styles.bubblesContainer} ref={containerRef}></div>

            {/* CONTADOR */}
            <div className={`${styles.pill} ${styles.counterPill}`} ref={counterRef}>
                <div className={styles.counterIcon}>
                    <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="13" r="8" stroke="rgba(120,190,255,0.9)" strokeWidth="1.4" fill="rgba(80,150,255,0.08)" />
                        <ellipse cx="9.5" cy="10" rx="2.2" ry="1.4" fill="rgba(255,255,255,0.45)" transform="rotate(-20 9.5 10)" />
                        <circle cx="17.5" cy="7" r="2.8" stroke="rgba(120,190,255,0.75)" strokeWidth="1.2" fill="rgba(80,150,255,0.06)" />
                        <ellipse cx="16.6" cy="6.1" rx="0.9" ry="0.6" fill="rgba(255,255,255,0.40)" transform="rotate(-20 16.6 6.1)" />
                        <circle cx="6" cy="6.5" r="1.8" stroke="rgba(120,190,255,0.6)" strokeWidth="1.1" fill="rgba(80,150,255,0.05)" />
                    </svg>
                </div>
                <div className={styles.counterInfo}>
                    <span className={styles.counterLabel}>Bolhas Estouradas</span>
                    <span className={styles.counterNumber} ref={counterNumRef}>{popCount}</span>
                </div>
            </div>

            <div className={styles.vignette}></div>
            <div className={styles.grain}></div>

            <div className={styles.curRing} ref={ringRef}></div>
            <div className={styles.curDot} ref={dotRef}></div>
        </div>
    );
}
