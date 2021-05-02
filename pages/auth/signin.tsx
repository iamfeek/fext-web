import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/client';
import {
    Box,
    Button,
    Heading,
    SimpleGrid,
    Text,
    useColorModeValue as mode,
    VisuallyHidden,
} from '@chakra-ui/react'
import * as React from 'react'
import { SigninForm } from 'components/pages/auth/SigninForm'
import { FaGoogle } from 'react-icons/fa'
import { DividerWithText } from 'components/pages/auth/DividerWithText'
import Link from 'next/link';
import {GenericLayout} from "components/layout/generic/GenericLayout";

export const SigninPage = () => {
    return (
        <GenericLayout>
            <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }}>
                <Heading mt="6" textAlign="center" size="xl" fontWeight="extrabold">
                    Sign in to Fext
                </Heading>
                <Text mt="4" align="center" maxW="md" fontWeight="medium">
                    <span>Don&apos;t have an account?</span>
                    <Box
                        as="a"
                        marginStart="1"
                        href="#"
                        color={mode('green.600', 'green.200')}
                        _hover={{ color: 'green.600' }}
                        display={{ base: 'block', sm: 'revert' }}
                    >
                        <Link href="/auth/register">Create an account</Link>
                    </Box>
                </Text>
            </Box>
            <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
                <Box
                    bg={mode('white', 'gray.700')}
                    py="8"
                    px={{ base: '4', md: '10' }}
                    shadow="base"
                    rounded={{ sm: 'lg' }}
                >
                    <SigninForm />
                    <DividerWithText mt="6">or continue with</DividerWithText>
                    <SimpleGrid mt="6" columns={1} spacing="3">
                        <Button color="currentColor" variant="outline" onClick={() => signIn('google')}>
                            <VisuallyHidden>Login with Google</VisuallyHidden>
                            <FaGoogle />
                        </Button>
                    </SimpleGrid>
                </Box>
            </Box>
        </GenericLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const session = await getSession({req});

    if(session) {
        return {
            redirect: {
                destination: '/secured',
                permanent: false,
            },
        }
    }

    return {
        props: {}
    }
}


export default SigninPage;
