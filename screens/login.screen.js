import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { AuthContext} from '../context/AuthContext';
import AuthContextProvider from '../context/AuthContext';
import { Dialog } from 'react-native-paper';



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { token, asignarToken } = useContext(AuthContext); // Asegúrate de que el contexto esté correctamente importado y utilizado

  const handleLogin = async () => {
    setError(''); 

    try {
    
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCn1DSP8cbMGt_UzBTzGIJG8XAVOfN8OLk`, //el api key empieza en key=//
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true, 
          }),
        }
      );

      const data = await response.json();
       // Guardar el token en el estado
    if (data.idToken) {
       asignarToken(data.idToken);
       
       navigation.navigate('Home'); }// Navegar a la pantalla de inicio
       else{ 
        setError('Credenciales incorrectas.');
      }    
    } catch (err) {
      setError('Error de conexión.'); 
    }
  };

  return (
    <AuthContextProvider> 
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
    </AuthContextProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  error: { color: 'red', marginTop: 10, textAlign: 'center' },
});

export default LoginScreen;
