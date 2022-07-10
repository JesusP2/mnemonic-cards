import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify';
import "styles/global.css"
import 'react-toastify/dist/ReactToastify.css';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}


export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <>
            <ToastContainer />
            {getLayout(<Component {...pageProps} />)}
        </>
    )
}
