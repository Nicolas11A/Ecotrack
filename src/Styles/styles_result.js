import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffffff',
  },
  containerResult1: {
    width: 150, // ancho del círculo
    height: 150, // alto igual al ancho
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    borderRadius: 75, // mitad del ancho/alto = círculo perfecto
    borderColor: '#4CAF50',
    borderWidth: 3,
    alignSelf: 'center', // centra el círculo horizontalmente
    marginVertical: 20,
  },
  resultText1: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CAF50',
  },
  containerResult2: {
    width: 150, // ancho del círculo
    height: 150, // alto igual al ancho
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    borderRadius: 75, // mitad del ancho/alto = círculo perfecto
    borderColor: '#c39d33ff',
    borderWidth: 3,
    alignSelf: 'center', // centra el círculo horizontalmente
    marginVertical: 20,
  },
  resultText2: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#c39d33ff',
  },
  containerResult3: {
    width: 150, // ancho del círculo
    height: 150, // alto igual al ancho
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    borderRadius: 75, // mitad del ancho/alto = círculo perfecto
    borderColor: '#c8483aff',
    borderWidth: 3,
    alignSelf: 'center', // centra el círculo horizontalmente
    marginVertical: 20,
  },
  resultText3: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#c8483aff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CAF50',
  },
  adviceText: {
    fontSize: 18,
    marginTop: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000ff',
  },
  button: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#77a988a1',
        borderRadius: 5,
        borderColor: '#4CAF50',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        color: '#000000ff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  iconHeader: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
export default styles;
