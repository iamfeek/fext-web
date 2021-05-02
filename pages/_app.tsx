import React from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import {Provider as NextAuthProvider} from 'next-auth/client';
import {ChakraProvider} from '@chakra-ui/react';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', (url: string) => {
    console.log(`Loading: ${url}`)
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({Component, pageProps}: AppProps) => {
    const {session} = pageProps;
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/images/favicon.ico"/>
                <link rel="stylesheet" type="text/css" href="/nprogress.css"/>
            </Head>
            <NextAuthProvider session={session}>
                <ChakraProvider>
                    <Component {...pageProps} />
                </ChakraProvider>
            </NextAuthProvider>
        </>
    );
};

export default App;
