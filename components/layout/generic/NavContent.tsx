import {
    Box,
    BoxProps,
    Button,
    Center,
    HStack,
    Stack,
    StackDivider,
    StackProps,
    useDisclosure,
} from '@chakra-ui/react'
import * as React from 'react'
import {HiOutlineMenu, HiX} from 'react-icons/hi'
import {NavLink} from './NavLink'
import {NavItemTransition, NavListTransition} from './Transition'
import Link from 'next/link'
import {useSession} from "next-auth/client";

const links: { label: string, href: string }[] = [
    // { label: 'Showcase', href: '#' },
    // { label: 'Reviews', href: '#' },
    // { label: 'Features', href: '#' },
    // { label: 'Resources', href: '#' },
]

const MobileNavContent = (props: BoxProps) => {
    const {isOpen, onToggle} = useDisclosure()
    return (
        <Box {...props}>
            <Center as="button" p="2" fontSize="2xl" color="gray.700" onClick={onToggle}>
                {isOpen ? <HiX/> : <HiOutlineMenu/>}
            </Center>
            <NavListTransition
                pos="absolute"
                insetX="0"
                bg="blue.600"
                top="64px"
                animate={isOpen ? 'enter' : 'exit'}
            >
                <Stack spacing="0" divider={<StackDivider borderColor="whiteAlpha.200"/>}>
                    {links.map((link, index) => (
                        <NavItemTransition key={index}>
                            <NavLink.Mobile href={link.href}>{link.label}</NavLink.Mobile>
                        </NavItemTransition>
                    ))}
                    <NavItemTransition style={{flex: '1'}}>
                        <NavLink.Mobile href="/auth/signin">Login</NavLink.Mobile>
                    </NavItemTransition>
                </Stack>
            </NavListTransition>
        </Box>
    )
}

const DesktopNavContent = (props: StackProps) => {
    const [session] = useSession();

    return (
        <HStack spacing="8" align="stretch" {...props}>
            {links.map((link, index) => (
                <NavLink.Desktop key={index} href={link.href}>
                    {link.label}
                </NavLink.Desktop>
            ))}
            {
                session ?
                    <Link passHref href="/api/auth/signout">
                        <Button as="a" height="16" rounded="0" colorScheme="blue" minW="10rem"
                        >
                            Sign out
                        </Button>
                    </Link>
                    : <Link passHref href="/auth/signin">
                        <Button as="a" height="16" rounded="0" colorScheme="blue" minW="10rem">
                            Login
                        </Button>
                    </Link>
            }
        </HStack>
    )
}

export const NavContent = {
    Mobile: MobileNavContent,
    Desktop: DesktopNavContent,
}
