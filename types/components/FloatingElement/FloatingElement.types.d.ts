import type React from 'react';
export interface FloatingElementProps {
    children: React.ReactNode;
    destinationRef: React.RefObject<HTMLInputElement>;
}
