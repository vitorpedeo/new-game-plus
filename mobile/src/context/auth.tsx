import React, { useState, useEffect, createContext } from 'react';
import { Alert } from 'react-native';

import api from '../services/api';
import { setData, getData, getMultipleData } from '../utils/storage';

interface ContextData {
  isLogged: boolean;
  user: object | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
}

export const AuthContext = createContext<ContextData>({} as ContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storagedUser = await getData('@User');
        const storagedToken = await getData('@Token');

        if (storagedUser && storagedToken) {
          api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
          setUser(JSON.parse(storagedUser));
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/sign-in', { email, password });
      const { data } = response;
      const loggedUser = data.data;
      const { token } = data.metadata;

      setUser(loggedUser);

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      await setData('@User', JSON.stringify(loggedUser));
      await setData('@Token', token);
    } catch (error) {
      Alert.alert('Dados inválidos!');
    }
  };

  return (
    <AuthContext.Provider value={{ isLogged: !!user, user, loading, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
