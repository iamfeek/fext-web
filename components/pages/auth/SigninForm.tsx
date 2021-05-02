import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import * as React from 'react';
import { InputField } from './InputField';
import { isEmpty } from 'lodash';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

export const SigninForm = () => {
    const {
        query: {email: prefilledEmail, error},
    } = useRouter();
    const toast = useToast();

    const [email, setEmail] = React.useState(prefilledEmail || '');
    const [password, setPassword] = React.useState('');

    const [submitting] = React.useState(false);
    const emailRef = React.useRef<any>(null);
    const passwordRef = React.useRef<any>(null);

    const shouldDisableSubmit = () => {
        if (isEmpty(email)) {
            return true;
        }

        if (isEmpty(password)) {
            return true;
        }

        return submitting;
    };

    const shouldShowError = () => {
        if (error) {
            toast({
                      title: "Error signing in.",
                      description: "Your credentials are not found/not matching!",
                      status: "error",
                      isClosable: true,
                      duration: null
                  })
        }
    };

    React.useEffect(() => {
        if (prefilledEmail) {
            passwordRef.current?.focus();
        } else {
            emailRef.current?.focus();
        }

        shouldShowError();
    }, []);

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();

                await signIn('credentials', {email, password});
            }}
        >
            <Stack spacing="8">
                <InputField label="Email" type="email"
                            ref={emailRef}
                            value={email} onChange={e => setEmail(e.target.value)}
                />

                <Box>
                    <InputField label="Password" type="password"
                                ref={passwordRef}
                                value={password} onChange={e => setPassword(e.target.value)}
                    />
                </Box>

                <Button
                    mb={{base: '4', md: '0'}}
                    w={{base: 'full', md: 'auto'}}
                    type="submit"
                    colorScheme="green"
                    size="lg"
                    fontSize="md"
                    fontWeight="bold"
                    disabled={shouldDisableSubmit()}
                    isLoading={submitting}
                    loadingText="Signing in..."
                >
                    Sign in
                </Button>
            </Stack>
        </form>
    );
};
