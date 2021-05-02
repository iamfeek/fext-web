import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import React from 'react';
import ISession from "types/session";
import {getSession} from "next-auth/client";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import {GenericLayout} from "components/layout/generic/GenericLayout";

const DashboardPage: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
                                                                                             session,
                                                                                         }) => {
    if (!session) {
        return <AccessDeniedIndicator />
    }

    return (
        <GenericLayout>
            <strong>This is a secured page, yay!</strong>
        </GenericLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const session = await getSession({req}) as ISession;

    return {
        props: {
            session,
        },
    };
};

export default DashboardPage;
