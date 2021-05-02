import { Button, Stack, } from '@chakra-ui/react';
import * as React from 'react';
import { InputField } from './InputField';
import { isEmpty, isEqual } from 'lodash';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const SignupForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [submitting, setSubmitting] = React.useState(false);
    const toast = useToast();
    const router = useRouter();

    const shouldDisableSubmit = () => {
        if (isEmpty(email)) {
            return true;
        }

        if (isEmpty(password)) {
            return true;
        }

        if (isEmpty(confirmPassword)) {
            return true;
        }

        if (isConfirmPasswordInvalid()) {
            return true;
        }

        return submitting;
    };

    const isConfirmPasswordInvalid = () => {
        const passwordEmpty = isEmpty(password);
        const confirmPasswordEmpty = isEmpty(confirmPassword);

        if (!confirmPasswordEmpty && !passwordEmpty) {
            return !isEqual(password, confirmPassword);
        }

        return false;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const payload = {
            username: email,
            email: email,
            password
        };

        const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const response = await raw.json();
        if (response.statusCode === 400) {
            setSubmitting(false);
            const firstErrorMessage = response.data[0].messages[0].message;
            toast({
                      title: 'Error registering.',
                      description: firstErrorMessage,
                      status: 'error',
                      isClosable: true,
                      position: 'top',
                      duration: null
                  });
        } else {
            toast({
                      title: 'Success!',
                      description: 'You can now log in with your new credentials!',
                      status: 'success',
                      isClosable: true,
                      position: 'top',
                      duration: null
                  });
            router.push(`/auth/signin?email=${email}`);
        }


    };

    return (
        <form
            onSubmit={handleSubmit}
        >
            <Stack spacing="8">
                <InputField label="Email" type="email"
                            value={email} onChange={e => setEmail(e.target.value)}
                />

                <InputField label="Password" type="password"
                            value={password} onChange={e => setPassword(e.target.value)}
                />

                <InputField label="Confirm password"
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            isInvalid={isConfirmPasswordInvalid()}
                            errorBorderColor="crimson"
                />

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
                    loadingText="Registering..."
                >
                    Register
                </Button>
            </Stack>
        </form>
    );
};
