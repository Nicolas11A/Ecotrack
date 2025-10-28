import { TouchableOpacity, Image, Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import styles from '../Styles/styles_mainmenu';
import calculateIcon from '../Images/calculator.png';
import historyIcon from '../Images/history.png';
import educationalIcon from '../Images/logro.png';
import profileIcon from '../Images/logo.png';
import home from '../Images/home.png';

const main_menu = ({ route, navigation }) => {
  const { profile } = route.params;

  const handleCalculate = () => navigation.navigate('calculate_footprint', { profile });
  const handleHistory = () => navigation.navigate('history', { profile });
  const handleEducational = () => navigation.navigate('educational', { profile });
  const handleViewProfile = () => navigation.navigate('view_profile', { profile });
  const handleBackMenu = () => navigation.navigate('main_menu', { profile });

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

      <Text style={styles.title}>Menu Principal</Text>

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleCalculate}>
          <Image source={calculateIcon} style={styles.buttonImage} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleHistory}>
          <Image source={historyIcon} style={styles.buttonImage} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleEducational}>
          <Image source={educationalIcon} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default main_menu;
