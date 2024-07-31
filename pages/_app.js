import "@/styles/globals.css";
import { AuthUserProvider } from "@/firebase/auth";
import Head from 'next/head';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Yapılacaklar Listesi</title>
            </Head>
            <AuthUserProvider>
                <Component {...pageProps} />
            </AuthUserProvider>
        </>
    );
}

