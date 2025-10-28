//iniciar sesion
import React, { useState, useEffect, use } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Alert } from 'react-native';
import { Card, Avatar, TextInput, Button } from 'react-native-paper';
import styles from '../Styles/styles_login';
import logo from '../Images/logo.png';
//importar funcion de firebaseService
import { getProfile } from '../Config/firebaseServices';
import { Color } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';

const log_in = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setformValid] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const profileUser = { name: '', lastName: '', email, password };

  useEffect(() => {
    const isValid =
      profileUser.email.trim() !== '' && profileUser.password.trim() !== '';
    setformValid(isValid);
  }, [profileUser.email, profileUser.password]);

  const handleLogin = () => {
    if (!formValid) {
      Alert.alert('Advertencia', 'los campos con * son obligatorios', [
        { text: 'OK' },
      ]);
      return;
    }
    //comprobar si el email y password coinciden con los del perfil creado
    //y si es asi, navegar al menu principal

    getProfile(profileUser.email)
    .then(fetchedProfile => {
      if (!fetchedProfile) {
        // Caso: el correo no existe en la base de datos
        Alert.alert('Error', 'El correo o contraseña son incorrectos', [
          { text: 'OK' },
        ]);
        return;
      }

      if (fetchedProfile.password === profileUser.password) {
        navigation.navigate('main_menu', { profile: fetchedProfile });
      } else {
        Alert.alert('Error', 'El correo o contraseña son incorrectos', [{ text: 'OK' }]);
      }
    })
    .catch(error => {
      console.error('Error obteniendo perfil:', error);
      Alert.alert('Error', 'Ocurrió un error al obtener el perfil', [
        { text: 'OK' },
      ]);
    });
};

  const handleSignUpNavigation = () => {
    navigation.navigate('sign_up');
  };

  return (
    <View>
      <ScrollView>
        <View>
          <Image source={logo} style={styles.image} />
          <Text style={styles.title}>Iniciar Sesion</Text>
        </View>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label={'* Email'}
              value={profileUser.email}
              onChangeText={setEmail}
              style={styles.input}
              mode="outlined"
              textColor={'black'}
            />
            <TextInput
              label={'* Password'}
              value={profileUser.password}
              onChangeText={setPassword}
              secureTextEntry={hidePassword}
              style={styles.input}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon={hidePassword ? 'eye-off' : 'eye'}
                  onPress={() => setHidePassword(!hidePassword)} // 👁 alternar visibilidad
                />
              }
              textColor={'black'}
            />
            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.button_}
            >
              <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Iniciar Sesion</Text>
            </Button>
            <Button
              mode="text"
              onPress={handleSignUpNavigation}
              style={styles.buttonSignUp}
            >
              <Text style={styles.buttonTextSignUp}>
                Crear una nueva cuenta
              </Text>
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};
export default log_in;
