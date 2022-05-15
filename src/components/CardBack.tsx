import React from 'react';
import type { Card } from 'types';


export default function CardBack({ currentCard }: { currentCard: Card }) {
    return (
        <div className="bg-white text-slate-100 w-72 h-96 md:rounded-sm md:shadow-xl p-4 mt-12">
            <div>
                <h2 className="text-xl text-stone-800 font-bold font-mono text-center mb-4">{currentCard?.title}</h2>
                <p className="text-black">{currentCard?.description}</p>
            </div>
        </div>
    );
}
