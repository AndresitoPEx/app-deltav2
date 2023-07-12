import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Image, TextInput, Button, StyleSheet, Text, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Home');
  }

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '2785324345-4oaa3gpqu0j3s1q03b2ca7ql93alkivs.apps.googleusercontent.com',
    androidClientId: '2785324345-grvhcs472pm9n91bq06botiva5r9jh9d.apps.googleusercontent.com',
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await getLocalUser();
    if (!user) {
      if (response?.type === 'success') {
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem('@user');
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await response.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/back.png')} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.content}>
          <Image source={require('../../assets/logo1.png')} style={styles.logo} />
          {!userInfo && (
            <View style={styles.formContainer}>
              <Text style={styles.title}>Iniciar sesión</Text>
              <TextInput placeholder="Email" style={styles.textInput} />
              <TextInput placeholder="Contraseña" style={styles.textInput} secureTextEntry />
              <Button title="Ingresar" onPress={handleLogin} />
              <Text style={styles.orText}>O inicia sesión con</Text>
              <Button
                title="Google"
                disabled={!request}
                onPress={() => {
                  promptAsync();
                }}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  formContainer: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  orText: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default Login;
