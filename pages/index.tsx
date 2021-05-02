import {GenericLayout} from "components/layout/generic/GenericLayout";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import ISession from "types/session";
import {getSession} from "next-auth/client";

const IndexPage: InferGetServerSidePropsType<typeof getServerSideProps> = () => {
    return (
        <GenericLayout>
            <strong>Hello!</strong>
        </GenericLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const session = await getSession({req}) as ISession;

    return {
        props: {
            session,
        },
    };
};

export default IndexPage
