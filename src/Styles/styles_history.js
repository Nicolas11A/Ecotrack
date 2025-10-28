import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CAF50',
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#ffffffff',
    elevation: 3,
  },
  adviceText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
  },
  circleContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    borderRadius: 75,
    borderWidth: 3,
    alignSelf: 'center',
    marginVertical: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  chartStyle: {
    borderRadius: 16,
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