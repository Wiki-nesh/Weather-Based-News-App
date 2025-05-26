import {createContext, useState} from 'react';

export const Context = createContext();

export const MyContent = ({children}) => {
  const [state, setState] = useState('C');
   const [catergory, setCategory] = useState("");

  return (
    <Context.Provider value={{state, setState,catergory,setCategory}}>{children}</Context.Provider>
  );
};
