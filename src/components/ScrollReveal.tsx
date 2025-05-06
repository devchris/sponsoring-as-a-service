'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    animation?: 'fadeIn' | 'slideUp' | 'scaleIn';
}

export default function ScrollReveal({
    children,
    className = '',
    delay = 0,
    animation = 'fadeIn'
}: ScrollRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const animationClass = isVisible
        ? `animate-${animation}`
        : 'opacity-0';

    const style = {
        animationDelay: delay ? `${delay}ms` : '0ms',
        animationFillMode: 'forwards',
    };

    return (
        <div ref={ref} className={`${className} ${animationClass}`} style={style}>
            {children}
        </div>
    );
} 