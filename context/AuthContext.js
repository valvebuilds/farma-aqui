import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

const DB_URL = "https://farma-aqui-default-rtdb.firebaseio.com/";

export const AuthContext = createContext();


const AuthContextProvider = ({children}) => { 
    const [medicamentos, setMedicamentos] = useState([]);
    const [farmacias, setFarmacias] = useState([]);
    const [stock, setStock] = useState([]);
    const [eps, setEps] = useState([]);
    const [redEps, setRedEps] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);

    const [canasta, setCanasta] = useState([]);

    const asignarToken = (token) => {
        setToken(token);
    }

    const añadirCanasta = ( med ) => {
      setCanasta(canasta => [...canasta, med]);
    }

    const eliminarCanasta = ( med ) => {
      setCanasta(canasta.filter(item => item !== med));
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [medsResponse, farmsResponse, stockResponse, epsResponse, redEpsResponse] = await Promise.all([
              axios.get(`${DB_URL}/medicamentos.json`),
              axios.get(`${DB_URL}/farmacias.json`),
              axios.get(`${DB_URL}/stock.json`),
              axios.get(`${DB_URL}/eps.json`),
              axios.get(`${DB_URL}/red-farmacias-eps.json`)
            ]);
            setMedicamentos(medsResponse.data);
            setFarmacias(farmsResponse.data);
            setStock(stockResponse.data);
            setEps(epsResponse.data);
            setRedEps(redEpsResponse.data);

            setIsLoading(false);
          } catch (error) {
            console.error("Error al obtener datos:", error);
          } finally {
            setIsLoading(false); // Se ejecuta haya o no error
          }
        };

        fetchData();
      }, []);

    return(
        <AuthContext.Provider value = {{medicamentos, farmacias, stock, eps, redEps, isLoading, token, 
                                      asignarToken, canasta, añadirCanasta, eliminarCanasta}} >
        {children}
        </AuthContext.Provider>
        )
}
export default AuthContextProvider; 