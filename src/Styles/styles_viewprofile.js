//styles para ver perfil
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
    },
    avatar: {
        backgroundColor: '#fff',
        color: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    card: {
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    divider: {
        marginVertical: 10,
    },
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#4CAF50',
    },
});
export default styles;
