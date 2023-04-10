import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase_client";

type SessionContextType = {
  session: any;
  isLoading: boolean;
  setSession: (session: any) => void;
  email: string;
  setEmail: (email: any) => void;
}


const SessionContext = createContext<SessionContextType>({
  session: null,
  isLoading: false,
  setSession: () => {},
  email:"",
  setEmail: () => {},
});


export const SessionProvider = ({ children }:any) => {
  const [session, setSession] = useState<any>(undefined);
  const [isLoading, setLoading] = useState(true);
  const [email,setEmail] = useState<string>("")


  useEffect(() => {
    const loadSession = async () => {
      const setSessionData = await supabase.auth.getSession()
      setSession(setSessionData.data.session)
      setLoading(false);
      setEmail(setSessionData.data.session?.user.email||"")
  
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session);
          setLoading(false);
        }
      );
      return () => {
        authListener.subscription;
      };
    };
    
    loadSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, isLoading,setSession, email,setEmail }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  return useContext(SessionContext);
};

