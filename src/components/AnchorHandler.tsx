"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function AnchorHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          const headerOffset = 100; // Высота хедера
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, [pathname]);

  return null;
}