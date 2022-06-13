import React from 'react';
import { urlFor } from 'sanity';
import { Card } from 'types';

export default function CardFront({ currentCard }: { currentCard: Card }) {
    return (
        <div className="bg-white text-slate-100 w-72 h-96 md:rounded-sm md:shadow-xl p-4 mt-12">
            <div className='text-stone-800'>
                <h2 className="text-xl font-bold font-mono text-center mb-4">{currentCard?.title}</h2>
                <img src={currentCard?.mainImage ? urlFor(currentCard?.mainImage).url() : ''} alt="" className="h-56 mx-auto" />
                <p>{currentCard?.hint}</p>
            </div>
        </div>
    );
}
