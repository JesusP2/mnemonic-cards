import React from 'react';
import type { Card } from 'types';

export default function CardLayout({ currentCard }: { currentCard: Card }) {
    return (
        <div className="bg-white text-slate-100 w-full h-full md:w-72 md:h-96 md:rounded-lg md:shadow-xl p-4">
            <div>
                <h2 className="text-xl text-amber-600 font-bold font-serif text-center">{currentCard?.title}</h2>
                <p>{currentCard?.description}</p>
            </div>
        </div>
    );
}
