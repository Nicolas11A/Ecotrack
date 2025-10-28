import React, { useState, useEffect, use } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Card, Avatar, TextInput, Button } from 'react-native-paper';
import styles from '../Styles/styles_result';
import profileIcon from '../Images/logo.png';
import home from '../Images/home.png';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const result = ({ route, navigation }) => {
  const { footprint } = route.params;
  const { profile } = route.params;

  const screenWidth = Dimensions.get('window').width;
  const chartData = [
    {
      name: 'Electricidad',
      population: footprint.electricity,
      color: '#4CAF50',
      legendFontColor: '#000',
      legendFontSize: 14,
    },
    {
      name: 'Gas',
      population: footprint.gas,
      color: '#FF9800',
      legendFontColor: '#000',
      legendFontSize: 14,
    },
    {
      name: 'Transporte',
      population: footprint.fuel + footprint.km,
      color: '#F44336',
      legendFontColor: '#000',
      legendFontSize: 14,
    },
    {
      name: 'Basura',
      population: footprint.trash,
      color: '#2196F3',
      legendFontColor: '#000',
      legendFontSize: 14,
    },
  ];

  useEffect(() => {
    console.log('visualizando total', footprint.total);
  }, [footprint.total]);

  handleViewProfile = () => {
    navigation.navigate('view_profile', {
      profile: profile,
      footprint: footprint,
    });
    //Alert.alert('Navegando', 'Redirigiendo a Ver Perfil', [{ text: 'OK' }]);
  };
  const handleBackMenu = () => {
    navigation.navigate('main_menu', { profile: profile });
  };

  const recomendations = () => {
    navigation.navigate('recomendations', {
      footprint: footprint,
      profile: profile,
    });
  };
  //
  if (footprint.total >= 0 && footprint.total <= 150) {
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
          <View>
            <Text style={styles.title}>Resultado de Huella de Carbono</Text>
          </View>
          <Card style={styles.container}>
            <Card.Content>
              <Text style={styles.adviceText}>Tu huella de carbono es:</Text>
              <View style={styles.containerResult1}>
                <Text style={styles.resultText1}>
                  {footprint.total.toFixed(2)} kg CO2e
                </Text>
                <Text style={styles.resultText1}>Nivel: Bajo</Text>
              </View>
              <Text style={styles.adviceText}>
                ¡Excelente! Tu huella de carbono es baja.
              </Text>
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <PieChart
                  data={chartData}
                  width={screenWidth - 10}
                  height={180}
                  chartConfig={{
                    color: () => `rgba(0, 0, 0, 1)`,
                  }}
                  accessor={'population'}
                  backgroundColor={'transparent'}
                />
              </View>
              <Button
                mode="contained"
                onPress={recomendations}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Recomendaciones</Text>
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    );
  } else if (footprint.total >= 151 && footprint.total < 400) {
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
          <View>
            <Text style={styles.title}>Resultado de Huella de Carbono</Text>
          </View>
          <Card style={styles.container}>
            <Card.Content>
              <Text style={styles.adviceText}>Tu huella de carbono es:</Text>
              <View style={styles.containerResult2}>
                <Text style={styles.resultText2}>
                  {footprint.total.toFixed(2)} kg CO2e
                </Text>
                <Text style={styles.resultText2}>Nivel: Medio</Text>
              </View>
              <Text style={styles.adviceText}>
                ¡Bien! Tu huella de carbono es media.
              </Text>
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <PieChart
                  data={chartData}
                  width={screenWidth - 10}
                  height={180}
                  chartConfig={{
                    color: () => `rgba(0, 0, 0, 1)`,
                  }}
                  accessor={'population'}
                  backgroundColor={'transparent'}
                />
              </View>
              <Button
                mode="contained"
                onPress={recomendations}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Recomendaciones</Text>
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    );
  } else {
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
          <View>
            <Text style={styles.title}>Resultado de Huella de Carbono</Text>
          </View>
          <Card style={styles.container}>
            <Card.Content>
              <Text style={styles.adviceText}>Tu huella de carbono es:</Text>
              <View style={styles.containerResult3}>
                <Text style={styles.resultText3}>
                  {footprint.total.toFixed(2)} kg CO2e
                </Text>
                <Text style={styles.resultText3}>Nivel: Alto</Text>
              </View>
              <Text style={styles.adviceText}>
                ¡Cuidado! Tu huella de carbono es Alta.
              </Text>
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <PieChart
                  data={chartData}
                  width={screenWidth - 10}
                  height={180}
                  chartConfig={{
                    color: () => `rgba(0, 0, 0, 1)`,
                  }}
                  accessor={'population'}
                  backgroundColor={'transparent'}
                />
              </View>
              <Button
                mode="contained"
                onPress={recomendations}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Recomendaciones</Text>
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    );
  }
};
export default result;
