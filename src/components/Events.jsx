// favorites
import React, { useState, useCallback } from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import events from '../constants/events.js';
import Icons from './Icons.jsx';

const { height } = Dimensions.get('window');

const Events = () => {
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

    const toggleFavorite = async (event) => {
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

    const isFavorite = (event) => {
        return favorites.some(fav => fav.name === event.name);
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
                <Text style={styles.title}>Rhodes Events</Text>

                <ScrollView style={{width: '100%', paddingHorizontal: 16, paddingTop: 16, borderTopWidth: 2, borderTopColor: '#fff'}}>
                    {
                        events.map((event, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={styles.card}
                                onPress={() => navigation.navigate('EventDetailsScreen', {event: event})}
                                >
                                <TouchableOpacity 
                                    style={styles.favBtn} 
                                    onPress={() => toggleFavorite(event)}
                                    >
                                    <Icons type={'fav'} active={isFavorite(event)} />
                                </TouchableOpacity>
                                <Image source={event.image} style={styles.image} />
                                <View style={{width: '100%', paddingHorizontal: 12, paddingVertical: 14}}>
                                    <Text style={styles.name}>{event.name}</Text>
                                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <Text style={styles.date}>{event.time} / {event.date}</Text>
                                        <Text style={styles.price}>{event.price}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                    <View style={{height: 50}} />
                </ScrollView>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 90,
    },

    favBtn: {
        width: 27,
        height: 24,
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10
    },

    title: {
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 28.64,
        color: '#a66702',
        textAlign: 'center',
        marginTop: height * 0.07,
        marginBottom: 30
    },

    card: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden'
    },

    image: {
        width: '100%',
        height: 224,
        resizeMode: 'cover',
    },

    name: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 16.71,
        color: '#a66702',
        marginBottom: 6
    },

    date: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        color: '#939393',
    },

    price: {
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 20.3,
        color: '#d8b281',
    }


})

export default Events;