import React from "react";
import Head from "next/head";
import Page from "components/pages/Error";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";

type MyType = InferGetServerSidePropsType<typeof getServerSideProps>

const Error: React.FC<MyType> = ({statusCode}) => {
    return (
        <>
            <Head>
                <title>Error Page</title>
            </Head>
            <Page statusCode={statusCode}/>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({res}) => {
    const statusCode = res ? res.statusCode : 404;

    return {
        props: {
            statusCode
        }, // will be passed to the page component as props
    }
}

export default Error;
