import React, { useState, useEffect } from 'react';
import {SafeAreaView, TextInput, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import logo from '../assets/logo.png';

import api from '../services/api';

export default function Login( {navigation} ) {
    const [user, setUser] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('Main', { user })
            }
        })
    }, []);// [] means it will be executed everytime the page reloads

    async function handleLogin(){
        const response = await api.post('/devs', { username: user });
        const { _id}  = response.data;
       
        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', {user: _id});
    }

    return (
    <SafeAreaView style={styles.container}>
        <Image source={logo}/> 
        <TextInput
            autoCapitalize="none"
            autoCorrect={false}    
            placeholder="Digite seu usuário no Github"
            placeholderTextColor="#999"
            style={styles.input}
            value={user}
            onChangeText={setUser}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}> 
            <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor:'#f5f5f5', 
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30
    },
    input: {
      marginTop: 20,
      paddingHorizontal: 15,  
      height: 46,
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 4,

    },
    button:{
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16
    }
  })
  
  