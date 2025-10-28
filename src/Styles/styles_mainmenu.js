import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30,
  },
  button: {
    width: 120,
    height: 120,
    marginVertical: 10,
    backgroundColor: '#77a988a1',
    borderRadius: 10,
    borderColor: '#4CAF50',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
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
