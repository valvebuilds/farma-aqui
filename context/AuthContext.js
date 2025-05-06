import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';           
import Feed from '../screens/FeedMedicamentos';

const DB_URL = "https://farma-aqui-default-rtdb.firebaseio.com/";
export const AuthContext = createContext({
    myData: [],
    isLoading: true,
    token: null,
})

const AuthContextProvider = ({children}) => { 
    const [misDatos, setMisDatos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);
    const asignarToken = (token) => {
        setToken(token);
    }

    useEffect(() => {
        const fetchMedicamentos = async () => {
          try {
            const response = await axios.get('https://farma-aqui-default-rtdb.firebaseio.com/medicamentos.json'); 
            setMisDatos(response.data);
            setIsLoading(false);
            console.log(misDatos);
          } catch (error) {
            console.error("Error al obtener listado de medicamentos:", error);
          } 
          
        };
        fetchMedicamentos();
      }, []);

    return(
        <AuthContext.Provider value = {{token,asignarToken}} >
        {children}
        </AuthContext.Provider>
        )
}
export default AuthContextProvider;