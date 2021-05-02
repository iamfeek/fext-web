import {
    FormControl,
    FormLabel,
    Input,
    InputProps,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'

interface InputFieldProps extends InputProps {
    label: string
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
    const { label, isInvalid, ...rest } = props

    return (
        <FormControl position="relative">
            <FormLabel
                _focus={{ color: isInvalid ? "crimson": mode('green.600', 'green.300') }}
                fontWeight="semibold"
                position="absolute"
                color={mode('gray.600', 'white')}
                top="-3"
                insetStart="2"
                bg={{ base: mode('white', 'gray.800'), md: mode('white', 'gray.700') }}
                zIndex={2}
                px="2"
            >
                {label}
            </FormLabel>
            <Input ref={ref} size="lg" fontSize="md" focusBorderColor={
                isInvalid ? "crimson" : "green.600"
            } {...rest} />
        </FormControl>
    )
})

InputField.displayName = 'InputField'
