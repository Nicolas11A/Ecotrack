import { server } from 'typescript';
import { db } from './firebase';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore';

const COLLECTION_NAME = 'profiles';
const COLLECTION_NAME2 = 'footprints';
//Crear el CRUD

export const createProfile = async profileData => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      name: profileData.name,
      lastName: profileData.lastName,
      email: profileData.email,
      password: profileData.password,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

/**
 * Pruebas de createProfile()
 * 
 * Unitarias:
 * - Verificar que se cree un documento correctamente con todos los campos esperados.
 * - Validar que arroje error si falta algún campo obligatorio.
 * - Simular error de conexión a Firebase y comprobar que se lanza una excepción.
 * 
 * Integración:
 * - Confirmar que el documento se almacene correctamente en la colección "profiles" de Firestore.
 * - Verificar que los datos sean consultables después de la inserción.
 * 
 * Rendimiento:
 * - Medir el tiempo promedio de inserción (debe ser < 500 ms en condiciones normales).
 * 
 * Aceptación:
 * - Crear un perfil desde la interfaz de usuario y confirmar
 *   que aparezca en la base de datos y pueda iniciar sesión.
 */

export const checkEmailExists = async email => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('email', '==', email),
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty; // true si ya existe
  } catch (error) {
    console.error('Error verificando correo:', error);
    throw error;
  }
};

/**
 * Pruebas de checkEmailExists()
 * 
 * Unitarias:
 * - Comprobar que retorne true si el correo ya existe.
 * - Comprobar que retorne false si el correo no está registrado.
 * - Validar que lance error si el argumento email es undefined o vacío.
 * 
 * Integración:
 * - Probar con un usuario real en la base de datos y verificar el resultado correcto.
 * 
 * Rendimiento:
 * - Asegurar que la búsqueda en Firestore no supere 300 ms.
 * 
 * Aceptación:
 * - Desde el registro, el sistema debe impedir crear un nuevo usuario con un correo ya existente.
 */

export const getProfile = async email => {
  try {
    const usersRef = collection(db, COLLECTION_NAME);
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No se encontró ningún perfil con ese email');
      return null;
    }

    // Solo tomamos el primer resultado
    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data();

    return {
      id: docSnap.id,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
  } catch (error) {
    console.error('Error getting document: ', error);
    throw error;
  }
};

/**
 * Pruebas de getProfile()
 * 
 * Unitarias:
 * - Validar que retorne un objeto con las claves correctas (id, name, lastName, email, password).
 * - Probar con un correo inexistente y confirmar que retorne null.
 * - Simular error de red o permisos y comprobar manejo de excepción.
 * 
 * Integración:
 * - Confirmar que el perfil recuperado coincida con los datos en Firestore.
 * 
 * Rendimiento:
 * - El tiempo de respuesta promedio debe ser < 400 ms.
 * 
 * Aceptación:
 * - Desde la interfaz, al iniciar sesión, el usuario debe ver sus datos correctamente cargados.
 */

export const createFootprint = async (footprintData, userEmail) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME2), {
      electricity: footprintData.electricity,
      gas: footprintData.gas,
      fuel: footprintData.fuel,
      km: footprintData.km,
      trash: footprintData.trash,
      total: footprintData.total,
      email: userEmail, // Guardar el email del usuario
    });
    console.log('Footprint saved for user: ', userEmail);
  } catch (error) {
    console.error('Error adding footprint: ', error);
    throw error;
  }
};

/**
 * Pruebas de createFootprint()
 * 
 * Unitarias:
 * - Validar que todos los campos de footprint se guarden correctamente.
 * - Probar que arroje error si falta el campo email o total.
 * 
 * Integración:
 * - Verificar que el documento se cree en la colección "footprints" y se relacione correctamente con el email.
 * 
 * Rendimiento:
 * - Medir el tiempo de escritura promedio (esperado < 600 ms).
 * 
 * Aceptación:
 * - Al registrar huella en la app, debe aparecer el nuevo cálculo en el historial del usuario.
 */


export const deleteProfileAndData = async (profileId, email) => {
  try {
    if (!profileId || !email) {
      throw new Error(`Faltan datos: profileId=${profileId}, email=${email}`);
    }

    // Buscar footprints del usuario por email
    const footprintsRef = collection(db, 'footprints');
    const q = query(footprintsRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    // Eliminar footprints asociados
    if (!querySnapshot.empty) {
      const deletePromises = querySnapshot.docs.map(docSnap => deleteDoc(docSnap.ref));
      await Promise.all(deletePromises);
      console.log(`${querySnapshot.size} footprints eliminados del usuario ${email}`);
    } else {
      console.log(`No se encontraron footprints asociados a ${email}`);
    }

    // Eliminar el perfil
    await deleteDoc(doc(db, 'profiles', profileId));
    console.log(`Perfil ${email} eliminado correctamente.`);

    return true;
  } catch (error) {
    console.error('Error eliminando perfil y datos asociados:', error);
    return false;
  }
};

/**
 * Pruebas de deleteProfileAndData()
 * 
 * Unitarias:
 * - Probar que arroje error si falta profileId o email.
 * - Verificar que retorne true si la eliminación fue exitosa.
 * - Confirmar que retorne false si ocurre un error en Firestore.
 * 
 * Integración:
 * - Crear un usuario y footprints asociados, luego eliminarlos y verificar que no existan en la base de datos.
 * 
 * Rendimiento:
 * - Evaluar el tiempo de eliminación completa (perfil + huellas) sea < 1 segundo.
 * 
 * Aceptación:
 * - Desde la interfaz, al eliminar un usuario, sus datos y huellas deben desaparecer por completo del sistema.
 */