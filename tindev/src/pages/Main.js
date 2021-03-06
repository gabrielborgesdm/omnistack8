import React, {useEffect, useState } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';


export default function Main({ navigation }){
    const id = navigation.getParam('user');

    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: id,
                }
            })
            setUsers(response.data);
        }

        loadUsers();
    }, [id]);

    async function handleLike(){
        const [ user, ...rest ] = users;
        await api.post(`/devs/${user._id}/likes`, null, {
            headers: { user: id },
        })
        
        setUsers(rest);//remove this user from the users list
    }

    async function handleDislike(){
        const [ user, ...rest ] = users;
        await api.post(`devs/${user._id}/dislikes`, null, {
            headers: { user: id }
        })

        setUsers(rest);
    }

    async function handleLogout(){
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>
            
            <View style={styles.cardsContainer}>
                {users.length === 0
                ? <Text style={styles.empty}>Acabou :(</Text>
                : (users.map((user, index) => (
                    <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                        <Image style={styles.avatar}  source={{ uri: user.avatar}}  />
                        <View style={styles.footer}>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text numberOfLines={3} style={styles.bio}>{user.bio}</Text>
                        </View>
                    </View>
                )))}
            </View>

            {users.length > 0 &&(
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={handleLike} style={styles.button}>
                        <Image  source={like}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDislike} style={styles.button}>
                        <Image  source={dislike}/>
                    </TouchableOpacity>
                </View>
            )}
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor:'#f5f5f5', 
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        marginTop: 30,
        
    },
    empty: {
       alignSelf: "center",
       color: "#999",
       fontSize: 24,
       fontWeight: "bold" 
    },
    avatar: {
        flex: 1,
        height: 300, 
    },
    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right:0,
        bottom: 0,
    }, 
    footer: {
       backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333'  
    },
    bio: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 18,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset:{
            width:0,
            height: 2,
        }
    }    
});