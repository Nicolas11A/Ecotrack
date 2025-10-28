import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#fff',
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CAF50',
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
