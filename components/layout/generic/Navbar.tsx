import {Box, Flex, Text, useColorModeValue as mode,} from '@chakra-ui/react'
import * as React from 'react'
import {NavContent} from './NavContent'
import Link from 'next/link'

export const Navbar = () => {
    return (
        <Box as="header" height="16" bg={mode('white', 'gray.800')} position="relative">
            <Box
                height="100%"
                // maxW="7xl"
                mx="auto"
                ps={{base: '6', md: '8'}}
                pe={{base: '5', md: '0'}}
            >
                <Flex
                    as="nav"
                    aria-label="Site navigation"
                    align="center"
                    justify="space-between"
                    height="100%"
                >
                    <Link passHref={true} href="/">
                        <Text
                            as="a"
                            display={{base: 'none', lg: 'block'}}
                            flexShrink={0} marginEnd="6"
                            fontWeight="bold" fontSize="2xl"
                            color="gray.700"
                        >Fext</Text>
                    </Link>
                    <NavContent.Desktop display={{base: 'none', md: 'flex'}}/>
                    <NavContent.Mobile display={{base: 'flex', md: 'none'}}/>
                </Flex>
            </Box>
        </Box>
    )
}
