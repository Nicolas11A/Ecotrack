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
import styles from '../Styles/styles_calculator';
import profileIcon from '../Images/logo.png';
import home from '../Images/home.png';
//importar funcion de firebaseService
import {
  createFootprint,
  checkAndUpdateAchievements,
} from '../Config/firebaseServices';

const calculate_footprint = ({ route, navigation }) => {
  const [electricity, setElectricity] = useState(0);
  const [gas, setGas] = useState(0);
  const [fuel, setFuel] = useState(0);
  const [km, setKm] = useState(0);
  const [trash, setTrash] = useState(0);
  const [total, setTotal] = useState(0);
  const [formValid, setformValid] = useState(false);
  const { profile } = route.params;

  useEffect(() => {
    const isValid =
      electricity >= 0 && gas >= 0 && fuel >= 0 && km >= 0 && trash >= 0;
    setformValid(isValid);
  }, [electricity, gas, fuel, km, trash]);

  const factorElectricity = 0.233; // kg CO2e per kWh
  const factorGas = 2.204; // kg CO2e per therm
  const factorFuel_per_Km = 2.581; // kg CO2e per km for a typical car
  const factorTrash = 0.45; // kg CO2e per kg of waste

  const handleCalculate = () => {
    if (!formValid) {
      Alert.alert('Error', 'los campos no pueden ser negativos', [
        { text: 'OK' },
      ]);
      return;
    }
    const totalEmissions =
      electricity * factorElectricity +
      gas * factorGas +
      (fuel + km) * factorFuel_per_Km +
      trash * factorTrash;
    setTotal(totalEmissions.toFixed(2));

    const estadistics = {
      electricity,
      gas,
      fuel,
      km,
      trash,
      total: totalEmissions,
    };
    {
      /*Alert.alert(
      'Resultado',
      `Tu huella de carbono mensual es ${totalEmissions.toFixed(2)} kg CO2e`,
      [{ text: 'OK' }],
    );*/
    }
    //llamar a la funcion de firebase
    createFootprint(estadistics, profile.email)
      .then(async () => {
        console.log('Footprint created successfully');
      })
      .catch(error => {
        console.error('Error creating footprint: ', error);
      });

    navigation.navigate('result', {
      footprint: estadistics,
      profile: profile,
    });
  };

  handleViewProfile = () => {
    navigation.navigate('view_profile', { profile: profile });
    //Alert.alert('Navegando', 'Redirigiendo a Ver Perfil', [{ text: 'OK' }]);
  };

  const handleBackMenu = () => {
    navigation.navigate('main_menu', { profile: profile });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleViewProfile}>
            <Image source={profileIcon} style={styles.iconHeader} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBackMenu}>
            <Image source={home} style={styles.iconHeader} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>Calculadora de Huella de Carbono</Text>
        </View>
        <Card style={styles.container}>
          <Card.Content>
            <Text style={styles.question}>
              Consumo de electricidad (kWh/mensual):
            </Text>
            <TextInput
              label="Electricidad"
              value={electricity.toString()}
              onChangeText={text => setElectricity(parseFloat(text) || 0)}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
              textColor='black'
            />
            <Text style={styles.question}>Consumo de gas (therms/mensual):</Text>
            <TextInput
              label="Gas"
              value={gas.toString()}
              onChangeText={text => setGas(parseFloat(text) || 0)}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
              textColor='black'
            />
            <Text style={styles.question}>
              Distancia recorrida en coche (km/mensual):
            </Text>
            <TextInput
              label="Kilometros"
              value={km.toString()}
              onChangeText={text => setKm(parseFloat(text) || 0)}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
              textColor='black'
            />
            <Text style={styles.question}>
              Consumo de combustible (litros/mensual):
            </Text>
            <TextInput
              label="Combustible"
              value={fuel.toString()}
              onChangeText={text => setFuel(parseFloat(text) || 0)}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
              textColor='black'
            />
            <Text style={styles.question}>
              Cantidad de basura generada (kg/mensual):
            </Text>
            <TextInput
              label="Basura"
              value={trash.toString()}
              onChangeText={text => setTrash(parseFloat(text) || 0)}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
              textColor='black'
            />
            <Button
              mode="contained"
              onPress={handleCalculate}
              style={styles.button}
              disabled={!formValid}
            >
              <Text style={styles.buttonText}>Calcular</Text>
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

export default calculate_footprint;
