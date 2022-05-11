import {createCurrentUserHook, createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const config = {
    projectId: '4pv10k5y',
    dataset: 'production',
    apiVersion: '2022-04-21',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    useCdn: true
}
export const sanityClient = createClient(config);
const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source: SanityImageSource) => builder.image(source)
export const useCurrentUser = createCurrentUserHook(config)


