import React from 'react';
import { urlFor } from 'sanity';
import { Card } from 'types';

export default function CardFront({ currentCard }: { currentCard: Card }) {
    return (
        <div className="bg-white text-slate-100 w-full h-full md:w-72 md:h-96 md:rounded-lg md:shadow-xl p-4">
            <div>
                <h2 className="text-xl text-amber-600 font-bold font-serif text-center">{currentCard?.title}</h2>
                <img src={currentCard?.mainImage ? urlFor(currentCard?.mainImage).url() : ''} alt="" />
            </div>
        </div>
    );
}
