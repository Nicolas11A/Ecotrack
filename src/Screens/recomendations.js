import React, { useState, useEffect, use } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Card, Avatar, TextInput, Button } from 'react-native-paper';
import profileIcon from '../Images/logo.png';
import home from '../Images/home.png';
import styles from '../Styles/styles_recomendations';

const recomendations = ({ route, navigation }) => {
  const { footprint } = route.params;
  const { profile } = route.params;

  const handleViewProfile = () => {
    navigation.navigate('view_profile', { profile: profile });
    //Alert.alert('Navegando', 'Redirigiendo a Ver Perfil', [{ text: 'OK' }]);
  };
  const handleBackMenu = () => {
    navigation.navigate('main_menu', {
      profile: profile,
      footprint: footprint,
    });
  };

  if (footprint.total >= 0 && footprint.total <= 150) {
    return (
      <ScrollView style={{ backgroundColor: '#ffffffff' }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleViewProfile}>
            <Image source={profileIcon} style={styles.iconHeader} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBackMenu}>
            <Image source={home} style={styles.iconHeader} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title1}>
            ¡Excelente! Tu huella de carbono es baja
          </Text>
          <Card style={styles.container}>
            <Card.Content>
              <Text style={styles.adviceText}>
                ¡Vas por muy buen camino! Mantén tus hábitos sostenibles y sigue
                inspirando a otros.
              </Text>

              <Text style={styles.adviceText}>
                • Continúa usando energía eficiente (bombillos LED, desconexión
                de equipos).{'\n'}
                {'\n'}• Usa transporte limpio (bicicleta, transporte público o
                caminar).{'\n'}
                {'\n'}• Participa en actividades ambientales (reforestación,
                reciclaje).{'\n'}
                {'\n'}• Registra tus progresos en EcoTrack para
                motivarte.
              </Text>
              <Button
                mode="contained"
                onPress={handleBackMenu}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Volver al Menú</Text>
              </Button>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    );
  } else if (footprint.total >= 151 && footprint.total < 400) {
    return (
      <ScrollView style={{ backgroundColor: '#ffffffff' }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleViewProfile}>
            <Image source={profileIcon} style={styles.iconHeader} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBackMenu}>
            <Image source={home} style={styles.iconHeader} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title2}>
            ¡Tu huella está dentro del promedio, pero puedes mejorar!
          </Text>
          <Card style={styles.container}>
            <Card.Content>
              <Text style={styles.adviceText}>
                Con algunos cambios, puedes reducir significativamente tu
                impacto ambiental.
              </Text>

              <Text style={styles.adviceText}>
                Energía:{'\n'}• Apaga luces y equipos cuando no los necesites.
                {'\n'}• Optimiza el uso de electrodomésticos.{'\n\n'}
                Transporte:{'\n'}• Usa transporte público o comparte vehículo
                (carpooling).{'\n'}• Camina o usa bicicleta para trayectos
                cortos.{'\n\n'}
                Residuos:{'\n'}• Separa y recicla tus residuos.{'\n'}• Evita
                plásticos de un solo uso.
              </Text>

              <Button
                mode="contained"
                onPress={handleBackMenu}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Volver al Menú</Text>
              </Button>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={{ backgroundColor: '#ffffffff' }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleViewProfile}>
            <Image source={profileIcon} style={styles.iconHeader} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBackMenu}>
            <Image source={home} style={styles.iconHeader} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title3}>
            Tu huella de carbono es alta. ¡Es momento de actuar!
          </Text>
          <Card style={styles.container}>
            <Card.Content>
              <Text style={styles.adviceText}>
                No te preocupes, con compromiso y pequeños pasos puedes reducir
                tu impacto ambiental.
              </Text>

              <Text style={styles.adviceText}>
                Energía:{'\n'}• Revisa tu consumo eléctrico y cambia a bombillos
                LED.{'\n'}• Considera el uso de energía solar o renovable.
                {'\n\n'}
                Transporte:{'\n'}• Evita viajes innecesarios en carro.
                {'\n'}• Usa transporte público o planifica trayectos para
                reducir kilometraje.{'\n'}• Evalúa cambiar a un vehículo híbrido
                o eléctrico.{'\n\n'}
                Residuos:{'\n'}• Implementa separación total de residuos.{'\n'}•
                Reutiliza y evita desperdicios.{'\n\n'}
                Acción climática:{'\n'}• Compensa tus emisiones apoyando
                proyectos de reforestación o energía limpia.
              </Text>

              <Button
                mode="contained"
                onPress={handleBackMenu}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Volver al Menú</Text>
              </Button>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    );
  }
};
export default recomendations;
