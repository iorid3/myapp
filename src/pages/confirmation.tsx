import { Box, Text } from '@chakra-ui/react';

export default function CheckEmailPage() {
  return (
    <Box maxW="xl" mx="auto" mt="8">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Check your email
      </Text>
      <Text mb="4">
        We've sent you an email with a link to confirm your account. Please check your inbox and follow the instructions to complete your registration.
      </Text>
      <Text>
        If you don't receive the email within a few minutes, please check your spam folder or try to resend the confirmation email.
      </Text>
    </Box>
  );
}