// export const ChatsContextProvider = (props: any) => {
//     const toast = useToast();
//     const { user, userDetails } = useUser();
//     const [chats, setChats] = useState<any>(null);
//     const [generatorChats, setGeneratorChats] = useState<any>(null);
//     const {
//       session,
//       isLoading: isLoadingUser,
//       supabaseClient: supabase,
//     } = useSessionContext();
  
//     const getChats = useCallback(async () => {
//       const { data, error } = await supabase
//         .from("chats")
//         .select("*")
//         .eq("owner", user?.id)
//         .eq("is_active", true)
//         .order("created_at", { ascending: false });
//       if (error) {
//         console.log(error);
//       }
//       return { data, error };
//     }, [user, supabase]);
  
//     const getGeneratorChats = useCallback(async () => {
//       const { data, error } = await supabase
//         .from("generator-sessions")
//         .select("*")
//         .eq("creator", user?.id)
//         .eq("isActive", true)
//         .order("created_at", { ascending: false });
//       if (error) {
//         console.log(error);
//       }
//       return { data, error };
//     }, [user, supabase]);
  
//     useEffect(() => {
//       if (isLoadingUser) return;
//       if (user) {
//         getChats().then((res) => {
//           if (res.data) {
//             setChats(res.data);
//           }
//         });
//         getGeneratorChats().then((res) => {
//           if (res.data) {
//             setGeneratorChats(res.data);
//           }
//         });
//       }
//     }, [isLoadingUser, user, getChats, getGeneratorChats]);
  
//     return (
//       <ChatsContext.Provider
//         value={{
//           chats,
//           getChats,
//           generatorChats,
//           getGeneratorChats,
//         }}
//       >
//         {props.children}
//       </ChatsContext.Provider>
//     );
//   };
  
// //   export const useChats = () => {
// //     const context = useContext(ChatsContext);
// //     if (context === undefined) {
// //       throw new Error("useChats must be used within a ChatsContextProvider");
// //     } // yes this error is not handled… lol
// //     return context;
// //   };
  

// DwQZjnHff2xHQYJw