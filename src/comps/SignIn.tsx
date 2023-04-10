import { useState, createContext } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { supabase } from '../lib/supabase_client';
import { useSessionContext } from '@/pages/api/sessionContext';


type FormValues = {
  email: string;
  password: string;
  name?:string;
  birthday?:Date;
};

enum FormType {
  Login,
  Signup,
}


export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formType, setFormType] = useState<FormType>(FormType.Login);

  const { setSession } = useSessionContext();

  async function handleLogin(values: FormValues) {
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email: values.email, password: values.password });

    if (error) {
      setError(error.message);
      setSession(null);
    } else {
      window.location.href = '/landing';
    }

    setIsLoading(false);
  }

  async function handleSignup(values: FormValues) {
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({ email: values.email, password: values.password });

    if (error) {
      setError(error.message);
      setSession(null);
    } else {

      await supabase.from('users').insert([
        {
          name: values.name,
          email: values.email,
          birthday: values.birthday,
        }
      ]);
      window.location.href = '/confirmation';
    }

    setIsLoading(false);
  }

  function toggleFormType() {
    setFormType(formType === FormType.Login ? FormType.Signup : FormType.Login);
    setError(null);
  }

  return (
    <VStack spacing="4" as="form" border="1px solid #f2f2f2" borderRadius="lg" p="4"    boxShadow="0 0 5px rgba(0, 0, 0, 0.1)"onSubmit={formType === FormType.Login ? handleSubmit(handleLogin) : handleSubmit(handleSignup)}>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email address</FormLabel>
        <Input type="email" placeholder="Enter your email" {...register('email', { required: true })} />
        <FormErrorMessage>{errors.email?.message || 'Please enter your email'}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder="Enter your password" {...register('password', { required: true })} />
        <FormErrorMessage>{errors.password?.message || 'Please enter your password'}</FormErrorMessage>
      </FormControl>

      {formType === FormType.Signup && (
        <>

        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input type="text" placeholder="Enter your name" {...register('name', { required: true })} />
          <FormErrorMessage>{errors.name?.message || 'Please enter your name'}</FormErrorMessage>
        </FormControl>
        
        <FormControl isInvalid={!!errors.birthday}>
          <FormLabel>Birthday</FormLabel>
          <Input type="date" placeholder="Enter your birthday" {...register('birthday', { required: true })} />
          <FormErrorMessage>{errors.birthday?.message || 'Please enter your birthday'}</FormErrorMessage>
        </FormControl>

    
        </>
      )}

      <Button type="submit" isLoading={isLoading}>
        {formType === FormType.Login ? 'Sign in' : 'Sign up'}
      </Button>

      <Button variant="link" onClick={toggleFormType}>
        {formType === FormType.Login ? 'New user? Sign up' : 'Already have an account? Sign in'}
      </Button>
    </VStack>
  );
}
