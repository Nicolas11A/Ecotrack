/**
 * @file firebaseServices.test.js
 * @description Pruebas unitarias e integradas para las funciones de firebaseServices.js
 * usando Jest y mocks de Firestore.
 */

import {
  createProfile,
  checkEmailExists,
  getProfile,
  createFootprint,
  deleteProfileAndData,
} from './firebaseServices';

// Mock completo de Firebase Firestore
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  deleteDoc: jest.fn(),
}));

const {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  deleteDoc,
} = require('firebase/firestore');

describe(' Pruebas firebaseServices.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =====================================================
  // createProfile
  // =====================================================
  test(' createProfile crea un documento correctamente', async () => {
    addDoc.mockResolvedValueOnce({ id: '12345' });

    await createProfile({
      name: 'Juan',
      lastName: 'Pérez',
      email: 'juan@test.com',
      password: '123456',
    });

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
      name: 'Juan',
      lastName: 'Pérez',
      email: 'juan@test.com',
      password: '123456',
    });
  });

  test(' createProfile lanza error si falla la inserción', async () => {
    addDoc.mockRejectedValueOnce(new Error('Error de Firestore'));

    await expect(
      createProfile({
        name: 'Juan',
        email: 'juan@test.com',
        password: '123',
      }),
    ).rejects.toThrow('Error de Firestore');
  });

  // =====================================================
  // checkEmailExists
  // =====================================================
  test('checkEmailExists retorna true si el correo existe', async () => {
    getDocs.mockResolvedValueOnce({ empty: false });

    const result = await checkEmailExists('test@mail.com');
    expect(result).toBe(true);
  });

  test('checkEmailExists retorna false si el correo no existe', async () => {
    getDocs.mockResolvedValueOnce({ empty: true });

    const result = await checkEmailExists('nuevo@mail.com');
    expect(result).toBe(false);
  });

  // =====================================================
  // getProfile
  // =====================================================
  test('getProfile retorna un perfil válido', async () => {
    const mockDoc = {
      id: 'abc123',
      data: () => ({
        name: 'Ana',
        lastName: 'López',
        email: 'ana@test.com',
        password: 'clave',
      }),
    };

    getDocs.mockResolvedValueOnce({
      empty: false,
      docs: [mockDoc],
    });

    const profile = await getProfile('ana@test.com');
    expect(profile).toEqual({
      id: 'abc123',
      name: 'Ana',
      lastName: 'López',
      email: 'ana@test.com',
      password: 'clave',
    });
  });

  test('getProfile retorna null si no encuentra el usuario', async () => {
    getDocs.mockResolvedValueOnce({ empty: true });
    const result = await getProfile('noexiste@mail.com');
    expect(result).toBeNull();
  });

  // =====================================================
  // createFootprint
  // =====================================================
  test('createFootprint guarda huella correctamente', async () => {
    addDoc.mockResolvedValueOnce({ id: 'foot123' });

    await createFootprint(
      {
        electricity: 100,
        gas: 50,
        fuel: 20,
        km: 30,
        trash: 10,
        total: 210,
      },
      'usuario@test.com',
    );

    expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
      electricity: 100,
      gas: 50,
      fuel: 20,
      km: 30,
      trash: 10,
      total: 210,
      email: 'usuario@test.com',
    });
  });

  test('createFootprint lanza error si falla la inserción', async () => {
    addDoc.mockRejectedValueOnce(new Error('Error al guardar huella'));
    await expect(
      createFootprint({}, 'usuario@test.com'),
    ).rejects.toThrow('Error al guardar huella');
  });

  // =====================================================
  // deleteProfileAndData
  // =====================================================
  test('deleteProfileAndData elimina perfil y huellas asociadas', async () => {
    getDocs.mockResolvedValueOnce({
      empty: false,
      size: 2,
      docs: [
        { ref: { id: 'f1' } },
        { ref: { id: 'f2' } },
      ],
    });
    deleteDoc.mockResolvedValueOnce();

    const result = await deleteProfileAndData('p123', 'test@correo.com');
    expect(result).toBe(true);
    expect(deleteDoc).toHaveBeenCalled();
  });

  test('deleteProfileAndData retorna false si ocurre un error', async () => {
    getDocs.mockRejectedValueOnce(new Error('Error de conexión'));
    const result = await deleteProfileAndData('p123', 'fallo@correo.com');
    expect(result).toBe(false);
  });

  test('deleteProfileAndData lanza error si faltan parámetros', async () => {
    const result = await deleteProfileAndData(undefined, undefined);
    expect(result).toBe(false);
  });
});
