// favorites
import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions, ScrollView, ImageBackground } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const EventDetails = ({ event }) => {
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]);

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favoriteEvents');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    const toggleFavorite = async () => {
        try {
            let updatedFavorites = [...favorites];
            const index = updatedFavorites.findIndex(fav => fav.name === event.name);

            if (index !== -1) {
                updatedFavorites.splice(index, 1);
            } else {
                updatedFavorites.push(event);
            }

            await AsyncStorage.setItem('favoriteEvents', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadFavorites();
        }, [])
    );

    console.log(favorites)

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={styles.toolsContainer}>
                    <TouchableOpacity 
                        style={styles.toolBtn} 
                        onPress={() => navigation.goBack('')}
                        >
                        <Icons type={'back'} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.toolBtn, {paddingHorizontal: 8}]} 
                        onPress={toggleFavorite}
                        >
                        <Icons type={'fav'} active={favorites.some(fav => fav.name === event.name)} />
                    </TouchableOpacity>
                </View>

                <Image source={event.image} style={styles.image} />

                <ScrollView style={{width: '100%', paddingHorizontal: 16}}>
                    <Text style={styles.name}>{event.name}</Text>

                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12}}>
                        <Text style={styles.date}>{event.date}</Text>
                        <Text style={styles.date}>{event.time}</Text>
                    </View>

                    <Text style={styles.price}>{event.price}</Text>

                    {
                        event.description.map((desc, i) => (
                            <Text key={i} style={styles.description}>{desc}</Text>
                        ))
                    }
                    <View style={{height: 100}} />
                </ScrollView>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },

    toolsContainer: {
        width: '100%',
        paddingHorizontal: 16,
        position: 'absolute',
        top: height * 0.07,
        right: 0,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10
    },

    toolBtn: {
        width: 44,
        height: 44,
        backgroundColor: '#ececec',
        borderRadius: 16,
        padding: 10
    },

    image: {
        width: '100%',
        height: 370,
        marginBottom: 12,
    },

    name: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 28.64,
        color: '#000',
        marginBottom: 12
    },

    date: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.09,
        color: '#939393',
    },

    price: {
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 28.64,
        color: '#d8b281',
        marginBottom: 16
    },

    description: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.09,
        color: '#000',
        marginBottom: 16
    },

    signBtnContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        paddingBottom: 30,
        backgroundColor: '#ececec'
    },

    signBtn: {
        width: '100%',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d8b281',
        padding: 16.5
    },

    signBtnText: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19.09,
        color: '#fff',
    }

});

export default EventDetails;