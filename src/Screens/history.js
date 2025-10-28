import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Card, Button } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import profileIcon from '../Images/logo.png';
import home from '../Images/home.png';
import { db } from '../Config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import styles from '../Styles/styles_history';

const history = ({ route, navigation }) => {
  const { profile } = route.params;
  const [footprints, setFootprints] = useState([]);
  const [average, setAverage] = useState(0);
  const [level, setLevel] = useState('');
  const [levelColor, setLevelColor] = useState('');
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    fetchUserFootprints();
  }, []);

  const fetchUserFootprints = async () => {
    try {
      const q = query(
        collection(db, 'footprints'),
        where('email', '==', profile.email),
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data());

      if (data.length === 0) {
        Alert.alert(
          'Sin datos',
          'Aún no tienes registros de huella de carbono.',
        );
        return;
      }

      setFootprints(data);

      // Calcular promedio total
      const totalAvg =
        data.reduce((acc, item) => acc + item.total, 0) / data.length;
      setAverage(totalAvg.toFixed(2));

      // Determinar nivel
      if (totalAvg <= 150) {
        setLevel('Baja');
        setLevelColor('#4CAF50');
      } else if (totalAvg < 400) {
        setLevel('Media');
        setLevelColor('#c39d33ff');
      } else {
        setLevel('Alta');
        setLevelColor('#c8483aff');
      }
    } catch (error) {
      console.error('Error al obtener datos del historial:', error);
    }
  };

  // Cálculo de porcentajes
  const total = footprints.length || 1;
  const low = (footprints.filter(f => f.total <= 150).length / total) * 100;
  const mid =
    (footprints.filter(f => f.total > 150 && f.total < 400).length / total) *
    100;
  const high = (footprints.filter(f => f.total >= 400).length / total) * 100;

  const chartData = {
    labels: ['Baja', 'Media', 'Alta'],
    datasets: [
      {
        data: [low, mid, high],
      },
    ],
  };

  const handleViewProfile = () => {
    navigation.navigate('view_profile', { profile });
  };

  const handleBackMenu = () => {
    navigation.navigate('main_menu', { profile });
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView style={{ backgroundColor: '#ffffffff' }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleViewProfile}>
            <Image source={profileIcon} style={styles.iconHeader} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBackMenu}>
            <Image source={home} style={styles.iconHeader} />
          </TouchableOpacity>
        </View>

        {/* Título */}
        <Text style={styles.title}>Historial de Huellas</Text>

        {/* Promedio total */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.adviceText}>Promedio total:</Text>
            <View style={[styles.circleContainer, { borderColor: levelColor }]}>
              <Text style={[styles.resultText, { color: levelColor }]}>
                {average} kg CO2e
              </Text>
              <Text style={[styles.resultText, { color: levelColor }]}>
                Nivel: {level}
              </Text>
            </View>

            {/* Gráfico de barras */}
            <Text style={styles.adviceText}>Distribución de niveles (%)</Text>

            <View style={styles.chartContainer}>
              <BarChart
                data={chartData}
                width={screenWidth - 40}
                height={220}
                yAxisSuffix="%"
                chartConfig={{
                  backgroundColor: '#ffffffff',
                  backgroundGradientFrom: '#ffffffff',
                  backgroundGradientTo: '#ffffffff',
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                style={styles.chartStyle}
              />
            </View>
            <Button
              mode="contained"
              onPress={handleBackMenu}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Volver al Menú</Text>
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

export default history;
