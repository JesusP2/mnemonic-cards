import React from 'react';
import { urlFor } from 'sanity';
import { Card } from 'types';

export default function CardFront({ currentCard }: { currentCard: Card }) {
    return (
        <div className="bg-white text-slate-100 w-full h-full md:w-72 md:h-96 md:rounded-sm md:shadow-xl p-4 mt-12">
            <div>
                <h2 className="text-xl text-stone-800 font-bold font-mono text-center mb-4">{currentCard?.title}</h2>
                <img src={currentCard?.mainImage ? urlFor(currentCard?.mainImage).url() : ''} alt="" className="h-full md:h-64 mx-auto" />
            </div>
        </div>
    );
}
