import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Card, Avatar, Button, Divider, List, IconButton } from 'react-native-paper';
import styles from '../Styles/styles_viewprofile';
import { deleteProfileAndData } from '../Config/firebaseServices';

const view_profile = ({ route, navigation }) => {
  const { profile } = route.params;

  const [showPassword, setShowPassword] = useState(false); 

  const handleBackMenu = () => {
    navigation.navigate('main_menu', { profile });
  };

  const handleDeleteProfile = async () => {
    Alert.alert(
      'Eliminar perfil',
      '¿Estás seguro de que quieres eliminar tu perfil y todos los datos asociados?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const result = await deleteProfileAndData(profile.id, profile.email);
              if (result) {
                Alert.alert('Perfil eliminado correctamente');
                navigation.navigate('log_in');
              } else {
                Alert.alert('Ocurrió un error al eliminar el perfil');
              }
            } catch (error) {
              console.error('Error al eliminar el perfil:', error);
              Alert.alert('Error', 'No se pudo eliminar el perfil.');
            }
          },
        },
      ]
    );
  };

  const handleCloseProfile = () => {
    navigation.navigate('log_in');
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.header}>
          <Avatar.Text
            size={100}
            label={profile.name.charAt(0).toUpperCase()}
            style={styles.avatar}
          />
        </View>

        <View style={styles.container}>
          <Card style={styles.card}>
            <Text style={styles.title}>Información de Perfil:</Text>
            <Divider style={styles.divider} />

            <List.Item
              title="Nombre"
              description={profile.name}
              left={props => <List.Icon {...props} color="black" icon="account" />}
            />
            <List.Item
              title="Apellido"
              description={profile.lastName}
              left={props => <List.Icon {...props} color="black" icon="account" />}
            />
            <List.Item
              title="Email"
              description={profile.email}
              left={props => <List.Icon {...props} color="black" icon="email" />}
            />

           
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <List.Item
                  title="Contraseña"
                  description={
                    showPassword ? profile.password : '*'.repeat(profile.password.length)
                  }
                  left={props => <List.Icon {...props} color="black" icon="lock" />}
                />
              </View>
              <IconButton
                icon={showPassword ? 'eye' : 'eye-off'}
                size={24}
                onPress={() => setShowPassword(!showPassword)}
                iconColor='black'
              />
            </View>
          </Card>
        </View>

        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleBackMenu} style={styles.button}>
            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Menú</Text>
          </Button>
          <Button
            mode="contained"
            onPress={handleDeleteProfile}
            style={[styles.button, { backgroundColor: 'red' }]}
          >
            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Eliminar Perfil</Text>
          </Button>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleCloseProfile}
            style={[styles.button, { backgroundColor: 'gray' }]}
          >
            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Cerrar Sesión</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default view_profile;
