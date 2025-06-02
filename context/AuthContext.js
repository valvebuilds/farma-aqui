import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';
import * as Location from 'expo-location';

const DB_URL = "https://farma-aqui-default-rtdb.firebaseio.com/";

export const AuthContext = createContext();


const AuthContextProvider = ({children}) => { 
    const [medicamentos, setMedicamentos] = useState([]);
    const [farmacias, setFarmacias] = useState([]);
    const [stock, setStock] = useState([]);
    const [eps, setEps] = useState([]);
    const [redEps, setRedEps] = useState([]);
    const [turnos, setTurnos] = useState([]);
 
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [uid, setUid] = useState(null);

    const [canasta, setCanasta] = useState([]);

    
    const asignarToken = (token) => {
        setToken(token);
    }

    const asignarUid = (uid) => {
      setUid(uid);
    }

    const agregarTurno = async (nuevoTurno) => {
       try {
        const response = await axios.post(`${DB_URL}/turnos/${uid}.json?auth=${token}`, nuevoTurno).then(res => console.log('Turno guardado:', res.data))
  .catch(err => console.error('Error:', err.response || err));
        console.log('POST response:', response.data);
        fetchTurnos();
        return { ok: true, id: response.data.name };
    }
    catch (error){
      return {
      ok: false,
      error: error.response?.data?.error?.message || 'Error al crear turno',
    };
    }
  };

    const añadirCanasta = ( med ) => {
      setCanasta(canasta => [...canasta, med]);
    }

    const eliminarCanasta = ( med ) => {
      setCanasta(canasta.filter(item => item !== med));
    }

    useEffect(() => {
      if(token && uid){
      const fetchTurnos = async ()=> {
        try{
          const response = await axios.get(`${DB_URL}/turnos/${uid}.json?auth=${token}`);
          setTurnos(response.data);
          setIsLoading(false);
        } catch (error) {
            console.error("Error al obtener turnos:", error);
          } finally {
            setIsLoading(false); // Se ejecuta haya o no error
          }
      };
      fetchTurnos();
    }
      }, [token, uid]);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const [medsResponse, farmsResponse, stockResponse, epsResponse, redEpsResponse] = await Promise.all([
              axios.get(`${DB_URL}/medicamentos.json`),
              axios.get(`${DB_URL}/farmacias.json`),
              axios.get(`${DB_URL}/stock.json`),
              axios.get(`${DB_URL}/eps.json`),
              axios.get(`${DB_URL}/red-farmacias-eps.json`),
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
        <AuthContext.Provider value = {{medicamentos, farmacias, stock, eps, redEps, 
                                      turnos, isLoading, token, uid, asignarUid, agregarTurno,
                                      asignarToken, canasta, añadirCanasta, eliminarCanasta}} >
        {children}
        </AuthContext.Provider>
        )
}
export default AuthContextProvider; 