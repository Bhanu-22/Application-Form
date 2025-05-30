import ApplicationForm from './components/ApplicationForm'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const App = () => {
  return (
    <Box minH="100vh" position="relative" overflow="hidden" bg="gray.900">
      {/* Animated Background with Particles */}
      <MotionBox
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        zIndex={0}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Gradient Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgGradient="radial(circle at 50% 50%, rgba(45, 55, 72, 0.8) 0%, rgba(26, 32, 44, 0.95) 100%)"
        />

        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            width="4px"
            height="4px"
            borderRadius="full"
            bg="white"
            opacity={0.5}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 2,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              scale: [Math.random() * 2, Math.random() * 3, Math.random() * 2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Animated Gradient Background */}
        <MotionBox
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            background: [
              'radial-gradient(circle at 0% 0%, #7928CA 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, #FF0080 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, #7928CA 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, #FF0080 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, #7928CA 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </MotionBox>

      {/* Form Overlay */}
      <Box position="relative" zIndex={1}>
        <ApplicationForm />
      </Box>
    </Box>
  )
}

export default App
