import { useState, useEffect, useCallback, useContext, createContext } from 'react';
import { supabase } from '@/lib/supabase_client';
import { useSessionContext } from './sessionContext';
import { getZodiacSign } from "../../utils/zodiac";
import { zodiacDescriptions } from "@/utils/zodiacDescription"; 

interface IDataContext {
  users: any[] | undefined;
  setUsers: React.Dispatch<React.SetStateAction<any[] | undefined>>;
}

const dataContext = createContext<IDataContext>({
  users: undefined,
  setUsers: () => {},
});

type Props = {
  children: React.ReactNode;
};


export const DataContextProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<any>();
  const { email } = useSessionContext(); 


  const getUsers = useCallback(async () => {
    const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email',`${email}`)
    if (error) {
      console.log(error);
    }
    setUsers(data ?? []);
    return { data, error };
  }, [supabase, email]);

  useEffect(() => {
    if (email) {
      getUsers();
    }
  }, [getUsers,email]);

  return <dataContext.Provider value={{ users, setUsers }}>{children}</dataContext.Provider>;
};

export const useData = () => {
  const context = useContext(dataContext);

  interface AllScopeInfo {
    birthday: string;
    zodiac: string;
    description: string;
  }

  let AllScopeInfo: AllScopeInfo = {
    birthday: '',
    zodiac: '',
    description: '',
  };

  
  if (context === undefined) {
    throw new Error('Your data is not available');
  }
  else {
    const { users, setUsers } = context
    if (users){
      const birthday = users[0].birthday;
      const zodiac = getZodiacSign(birthday);
      const description = zodiacDescriptions[zodiac];
      AllScopeInfo = {birthday,zodiac, description}
      return { ...context, AllScopeInfo }
    }
  }
  return { ...context, AllScopeInfo }
};
