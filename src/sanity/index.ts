import {createCurrentUserHook, createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const config = {
    projectId: '4pv10k5y',
    dataset: 'production',
    apiVersion: '2022-04-21',
    token: 'skxjrmdFqI64a8Ia1pnvDRF5xIk8gRSFiNpdX11fTIUkq16ynCCbSAVZa0uetYPfDf4HkzuBChNgzTjxLMl9zhfX73JrsOCDnsy4dhGA74x6l9p8tSR414X3smuCJ5vJWo7cTKUhpm7PqAJt2V7RyiH10oBUqtmwM5znAnk5WMiapzqttm8h',
    useCdn: true
}
export const sanityClient = createClient(config);
const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source: SanityImageSource) => builder.image(source)
export const useCurrentUser = createCurrentUserHook(config)


