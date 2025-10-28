import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginVertical: 20,
  },

  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  iconText: {
    fontSize: 22,
    marginRight: 10,
  },

  cardText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },

  buttonMenu: {
        width: '90%',
        alignSelf: 'center',
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
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default styles;
