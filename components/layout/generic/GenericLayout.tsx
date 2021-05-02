import {Box, Container, Stack,} from '@chakra-ui/react';
import * as React from 'react';
import {Navbar} from "components/layout/generic/Navbar";

export const GenericLayout: React.FC = ({children}) => {
    return (
        <Stack minHeight="100vh" bg="gray.100">
            <Navbar/>

            {/* Main content area */}
            <Box as="main">
                <Container maxW="7xl">
                    <Box>
                        {children}
                    </Box>
                </Container>
            </Box>
        </Stack>
    );
};
