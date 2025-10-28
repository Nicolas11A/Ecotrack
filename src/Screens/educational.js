import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Button, Card } from 'react-native-paper';
import profileIcon from '../Images/logo.png';
import home from '../Images/home.png';
import styles from '../Styles/styles_educational';

const educational = ({ route, navigation }) => {
  const { profile } = route.params;

  const handleBackMenu = () => {
    navigation.navigate('main_menu', { profile: profile });
  };

  const handleViewProfile = () => {
    navigation.navigate('view_profile', { profile: profile });
  };

  const openLink = url => {
    if (url) {
      Linking.openURL(url);
    } else {
      //alert("Falta agregar el enlace.");
    }
  };

  return (
    <View>
      <ScrollView style={{ backgroundColor: '#ffffffff' }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleViewProfile}>
            <Image source={profileIcon} style={styles.iconHeader} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBackMenu}>
            <Image source={home} style={styles.iconHeader} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>CONTENIDO EDUCATIVO</Text>

          <TouchableOpacity
            onPress={() =>
              openLink('https://www.huelladecarbono.info/actualidad/')
            }
            style={styles.cardButton}
          >
            <Text style={styles.iconText}>🌿</Text>
            <Text style={styles.cardText}>
              ¡Infórmate de las últimas noticias del medio ambiente!
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              openLink(
                'https://www.greenpeace.org/mexico/blog/9386/huella-de-carbono/',
              )
            }
            style={styles.cardButton}
          >
            <Text style={styles.iconText}>🌎</Text>
            <Text style={styles.cardText}>
              ¿Qué es la huella de carbono? ¡Todo lo que necesitas saber!
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => openLink('https://www.un.org/es/actnow/ten-actions')}
            style={styles.cardButton}
          >
            <Text style={styles.iconText}>💡</Text>
            <Text style={styles.cardText}>
              ¡Guía de mejores actividades para reducir tu huella de carbono!
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              openLink(
                'https://climate.selectra.com/es/huella-carbono/paises-contaminantes',
              )
            }
            style={styles.cardButton}
          >
            <Text style={styles.iconText}>🌍</Text>
            <Text style={styles.cardText}>
              ¡Ranking de los países más contaminantes del mundo!
            </Text>
          </TouchableOpacity>

          <Button
            mode="contained"
            onPress={handleBackMenu}
            style={styles.buttonMenu}
          >
            <Text style={styles.buttonText}>Volver al Menú</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default educational;
