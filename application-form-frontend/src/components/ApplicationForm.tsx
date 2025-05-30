import { useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    useToast,
    Container,
    Heading,
    FormErrorMessage,
    Textarea,
    Select as ChakraSelect,
    InputGroup,
    InputLeftElement,
    Icon,
    useColorModeValue,
    ScaleFade,
    Progress,
    HStack,
    Text,
    Tooltip,
    Badge,
} from '@chakra-ui/react'
import { FiUser, FiMail, FiPhone, FiBriefcase, FiClock, FiMessageSquare } from 'react-icons/fi'

interface FormData {
    firstName: string
    lastName: string
    email: string
    phone: string
    position: string
    experience: string
    message: string
}

interface FormErrors {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    position?: string
    experience?: string
    message?: string
}

const ApplicationForm = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        message: '',
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const toast = useToast()

    const bgColor = useColorModeValue('rgba(17, 24, 39, 0.7)', 'rgba(17, 24, 39, 0.9)')
    const borderColor = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.2)')
    const inputBg = useColorModeValue('rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.1)')

    const calculateProgress = () => {
        const totalFields = Object.keys(formData).length
        const filledFields = Object.values(formData).filter(value => value.trim() !== '').length
        return (filledFields / totalFields) * 100
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}
        let isValid = true

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required'
            isValid = false
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required'
            isValid = false
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
            isValid = false
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required'
            isValid = false
        }

        if (!formData.position) {
            newErrors.position = 'Position is required'
            isValid = false
        }

        if (!formData.experience) {
            newErrors.experience = 'Experience is required'
            isValid = false
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setIsSubmitting(true)
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            toast({
                title: 'Application Submitted',
                description: 'Thank you for your application! We will review it shortly.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                position: '',
                experience: '',
                message: '',
            })
            setIsSubmitting(false)
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }))
        }
    }

    return (
        <Container maxW="container.md" py={10}>
            <ScaleFade initialScale={0.9} in={true}>
                <Box
                    p={8}
                    borderWidth={2}
                    borderRadius="2xl"
                    boxShadow="2xl"
                    bg={bgColor}
                    style={{
                        backdropFilter: 'blur(20px)',
                        borderImage: 'linear-gradient(90deg, #7928CA, #FF0080, #7928CA) 1'
                    }}
                    borderColor={borderColor}
                    transition="all 0.3s"
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: '3xl',
                        bg: 'rgba(17, 24, 39, 0.8)'
                    }}
                >
                    <VStack spacing={8} align="stretch">
                        <Heading
                            as="h1"
                            size="2xl"
                            textAlign="center"
                            bgGradient="linear(to-r, #7928CA, #FF0080)"
                            bgClip="text"
                            fontWeight="extrabold"
                            letterSpacing="tight"
                        >
                            Job Application Form
                        </Heading>

                        <Box>
                            <HStack justify="space-between" mb={2}>
                                <Text fontSize="sm" color="#FF0080" fontWeight="bold">
                                    Form Progress
                                </Text>
                                <Badge
                                    bgGradient="linear(to-r, #7928CA, #FF0080)"
                                    color="white"
                                    fontWeight="bold"
                                    px={3}
                                    py={1}
                                    borderRadius="md"
                                    boxShadow="md"
                                >
                                    {Math.round(calculateProgress())}%
                                </Badge>
                            </HStack>
                            <Progress
                                value={calculateProgress()}
                                size="sm"
                                borderRadius="full"
                                hasStripe
                                isAnimated
                                sx={{
                                    '& > div': {
                                        background: 'linear-gradient(90deg, #7928CA, #FF0080)',
                                    },
                                }}
                            />
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4}>
                                <FormControl isInvalid={!!errors.firstName}>
                                    <FormLabel color="white" fontWeight="medium">First Name</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none" h="full">
                                            <Icon as={FiUser} color="#FF0080" />
                                        </InputLeftElement>
                                        <Input
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="Enter your first name"
                                            bg={inputBg}
                                            borderColor={borderColor}
                                            color="white"
                                            _hover={{ bg: 'rgba(255, 255, 255, 0.15)' }}
                                            _focus={{
                                                borderColor: '#FF0080',
                                                boxShadow: '0 0 0 1px #FF0080',
                                                bg: 'rgba(255, 255, 255, 0.2)'
                                            }}
                                            _placeholder={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                            pl="2.5rem"
                                        />
                                    </InputGroup>
                                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.lastName}>
                                    <FormLabel color="white" fontWeight="medium">Last Name</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none" h="full">
                                            <Icon as={FiUser} color="#FF0080" />
                                        </InputLeftElement>
                                        <Input
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Enter your last name"
                                            bg={inputBg}
                                            borderColor={borderColor}
                                            color="white"
                                            _hover={{ bg: 'rgba(255, 255, 255, 0.15)' }}
                                            _focus={{
                                                borderColor: '#FF0080',
                                                boxShadow: '0 0 0 1px #FF0080',
                                                bg: 'rgba(255, 255, 255, 0.2)'
                                            }}
                                            _placeholder={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                            pl="2.5rem"
                                        />
                                    </InputGroup>
                                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.email}>
                                    <FormLabel color="white" fontWeight="medium">Email</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none" h="full">
                                            <Icon as={FiMail} color="#FF0080" />
                                        </InputLeftElement>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            bg={inputBg}
                                            borderColor={borderColor}
                                            color="white"
                                            _hover={{ bg: 'rgba(255, 255, 255, 0.15)' }}
                                            _focus={{
                                                borderColor: '#FF0080',
                                                boxShadow: '0 0 0 1px #FF0080',
                                                bg: 'rgba(255, 255, 255, 0.2)'
                                            }}
                                            _placeholder={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                            pl="2.5rem"
                                        />
                                    </InputGroup>
                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.phone}>
                                    <FormLabel color="white" fontWeight="medium">Phone Number</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none" h="full">
                                            <Icon as={FiPhone} color="#FF0080" />
                                        </InputLeftElement>
                                        <Input
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter your phone number"
                                            bg={inputBg}
                                            borderColor={borderColor}
                                            color="white"
                                            _hover={{ bg: 'rgba(255, 255, 255, 0.15)' }}
                                            _focus={{
                                                borderColor: '#FF0080',
                                                boxShadow: '0 0 0 1px #FF0080',
                                                bg: 'rgba(255, 255, 255, 0.2)'
                                            }}
                                            _placeholder={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                            pl="2.5rem"
                                        />
                                    </InputGroup>
                                    <FormErrorMessage>{errors.phone}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.position}>
                                    <FormLabel color="white" fontWeight="medium">Position</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none" h="full">
                                            <Icon as={FiBriefcase} color="#FF0080" />
                                        </InputLeftElement>
                                        <ChakraSelect
                                            name="position"
                                            value={formData.position}
                                            onChange={handleChange}
                                            placeholder="Select position"
                                            bg={inputBg}
                                            borderColor={borderColor}
                                            color="white"
                                            _hover={{ bg: 'rgba(255, 255, 255, 0.15)' }}
                                            _focus={{
                                                borderColor: '#FF0080',
                                                boxShadow: '0 0 0 1px #FF0080',
                                                bg: 'rgba(255, 255, 255, 0.2)'
                                            }}
                                            _placeholder={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                            pl="2.5rem"
                                        >
                                            <option value="frontend">Frontend Developer</option>
                                            <option value="backend">Backend Developer</option>
                                            <option value="fullstack">Full Stack Developer</option>
                                            <option value="designer">UI/UX Designer</option>
                                        </ChakraSelect>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.position}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.experience}>
                                    <FormLabel color="white" fontWeight="medium">Experience</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none" h="full">
                                            <Icon as={FiClock} color="#FF0080" />
                                        </InputLeftElement>
                                        <ChakraSelect
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            placeholder="Select experience"
                                            bg={inputBg}
                                            borderColor={borderColor}
                                            color="white"
                                            _hover={{ bg: 'rgba(255, 255, 255, 0.15)' }}
                                            _focus={{
                                                borderColor: '#FF0080',
                                                boxShadow: '0 0 0 1px #FF0080',
                                                bg: 'rgba(255, 255, 255, 0.2)'
                                            }}
                                            _placeholder={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                            pl="2.5rem"
                                        >
                                            <option value="0-1">0-1 years</option>
                                            <option value="1-3">1-3 years</option>
                                            <option value="3-5">3-5 years</option>
                                            <option value="5+">5+ years</option>
                                        </ChakraSelect>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.experience}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.message}>
                                    <FormLabel color="white" fontWeight="medium">Message</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none" h="full">
                                            <Icon as={FiMessageSquare} color="#FF0080" />
                                        </InputLeftElement>
                                        <Textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us about yourself and why you're interested in this position"
                                            rows={4}
                                            bg={inputBg}
                                            borderColor={borderColor}
                                            color="white"
                                            _hover={{ bg: 'rgba(255, 255, 255, 0.15)' }}
                                            _focus={{
                                                borderColor: '#FF0080',
                                                boxShadow: '0 0 0 1px #FF0080',
                                                bg: 'rgba(255, 255, 255, 0.2)'
                                            }}
                                            _placeholder={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                            pl="2.5rem"
                                        />
                                    </InputGroup>
                                    <FormErrorMessage>{errors.message}</FormErrorMessage>
                                </FormControl>

                                <Tooltip
                                    label="Fill all required fields to submit"
                                    placement="top"
                                    isDisabled={Object.values(formData).every(value => value.trim() !== '')}
                                >
                                    <Button
                                        type="submit"
                                        size="lg"
                                        width="full"
                                        mt={4}
                                        isLoading={isSubmitting}
                                        loadingText="Submitting..."
                                        bgGradient="linear(to-r, #7928CA, #FF0080)"
                                        color="white"
                                        fontWeight="bold"
                                        _hover={{
                                            bgGradient: 'linear(to-r, #FF0080, #7928CA)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 20px rgba(255, 0, 128, 0.4)'
                                        }}
                                        _active={{
                                            transform: 'translateY(0)',
                                        }}
                                        transition="all 0.2s"
                                        shadow="lg"
                                    >
                                        Submit Application
                                    </Button>
                                </Tooltip>
                            </VStack>
                        </form>
                    </VStack>
                </Box>
            </ScaleFade>
        </Container>
    )
}

export default ApplicationForm 