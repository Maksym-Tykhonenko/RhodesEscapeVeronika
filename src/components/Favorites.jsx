import React, { useState, useCallback } from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icons from './Icons.jsx';

const { height } = Dimensions.get('window');

const Beaches = () => {
    const navigation = useNavigation();
    const [favoriteEvents, setFavoriteEvents] = useState([]);
    const [favoriteBeaches, setFavoriteBeaches] = useState([]);
    const [button, setButton] = useState('events');

    const loadFavorites = async () => {
        try {
            const storedFavoritesEvents = await AsyncStorage.getItem('favoriteEvents');
            const storedFavoritesBeaches = await AsyncStorage.getItem('favoriteBeaches');

            if (storedFavoritesEvents) {
                setFavoriteEvents(JSON.parse(storedFavoritesEvents));
            }

            if (storedFavoritesBeaches) {
                setFavoriteBeaches(JSON.parse(storedFavoritesBeaches));
            }

        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadFavorites();
        }, [])
    );

    const handleRemoveEvent = async (event) => {
        try {
            const updatedFavorites = favoriteEvents.filter(favEvent => favEvent.name !== event.name);
            setFavoriteEvents(updatedFavorites);
            await AsyncStorage.setItem('favoriteEvents', JSON.stringify(updatedFavorites));
            await loadFavorites();
        } catch (error) {
            console.error('Error removing event from favorites:', error);
        }
    };
    
    const handleRemoveBeach = async (beach) => {
        try {
            const updatedFavorites = favoriteBeaches.filter(favBeach => favBeach.name !== beach.name);
            setFavoriteBeaches(updatedFavorites);
            await AsyncStorage.setItem('favoriteBeaches', JSON.stringify(updatedFavorites));
            await loadFavorites();
        } catch (error) {
            console.error('Error removing beach from favorites:', error);
        }
    };    

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', marginBottom: 16, paddingHorizontal: 16}}>
                    <TouchableOpacity 
                        style={styles.backBtn}
                        onPress={() => navigation.goBack('')}
                        >
                        <Icons type={'back'} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Rhodes Favorites</Text>
                </View>

                <View style={styles.btnsContainer}>
                    <TouchableOpacity 
                        style={[styles.btn, button === 'events' && {backgroundColor: '#d8b281'}]} 
                        onPress={() => setButton('events')}
                        >
                        <Text style={[styles.btnText, button === 'events' && {color: '#fff', fontWeight: '600'}]} >Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.btn, button === 'beaches' && {backgroundColor: '#d8b281'}]}
                        onPress={() => setButton('beaches')}
                        >
                        <Text style={[styles.btnText, button === 'beaches' && {color: '#fff', fontWeight: '600'}]} >Beaches</Text>
                    </TouchableOpacity>
                </View>

                {
                    button === 'events' && favoriteEvents.length === 0 && (
                        <View style={{width: '80%', height: '100%', alignSelf: 'center', alignItems: 'center'}}>
                            <Image source={require('../assets/decor/nothing.png')} style={{width: 140, height: 140, resizeMode: 'contain', marginBottom: 24, marginTop: 100}} />
                            <Text style={styles.nothingText}>There aren’t any favorite events yet</Text>
                        </View>    
                    )
                }

                {
                    button === 'beaches' && favoriteBeaches.length === 0 && (
                        <View style={{width: '80%', height: '100%', alignSelf: 'center', alignItems: 'center'}}>
                            <Image source={require('../assets/decor/nothing.png')} style={{width: 140, height: 140, resizeMode: 'contain', marginBottom: 24, marginTop: 100}} />
                            <Text style={styles.nothingText}>There aren’t any favorite beaches yet</Text>
                        </View>    
                    )
                }

                <ScrollView style={{width: '100%', height: '100%', borderTopWidth: 2, borderTopColor: '#fff', padding: 16}}>
                    {
                        button === 'events' ? (
                            <View>
                                {
                                    favoriteEvents?.map((event, index) => (
                                        <TouchableOpacity 
                                            key={index} 
                                            style={styles.card}
                                            onPress={() => navigation.navigate('EventDetailsScreen', {event: event})}
                                            >
                                            <TouchableOpacity 
                                                style={styles.favBtn} 
                                                onPress={() => handleRemoveEvent(event)}
                                                >
                                                <Icons type={'fav'} active />
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
                            </View>
                        ) : (
                            <View>
                                {
                                    favoriteBeaches?.map((beach, index) => (
                                        <TouchableOpacity 
                                            key={index} 
                                            style={{width: '100%', marginBottom: 20}}
                                            onPress={() => navigation.navigate('BeachDetailsScreen', {beach: beach})}
                                            >
                                            <TouchableOpacity 
                                                style={styles.favBtn} 
                                                onPress={() => handleRemoveBeach(beach)}
                                                >
                                                <Icons type={'fav'} active />
                                            </TouchableOpacity>
                                            <Image
                                                source={typeof beach.image === 'string' ? { uri: beach.image } : beach.image} 
                                                style={{width: '100%', height: 177, borderRadius: 12, marginBottom: 8}} />
                                            <Text style={styles.beachName}>{beach.name}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        )
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
        paddingTop: height * 0.07,
    },

    backBtn: {
        width: 44,
        height: 44,
        backgroundColor: '#ececec',
        borderRadius: 16,
        padding: 10,
        marginRight: 15
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
    },

    btnsContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#ececec',
        marginBottom: 16,
        padding: 2
    },

    btn: {
        width: '49%',
        padding: 9,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnText: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
        color: '#a66702',
    },

    //events

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
    },

    //beaches

    beachName: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 16.41,
        color: '#a66702',
    },

    nothingText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22.4,
        color: '#fff',
        textAlign: 'center'
    }


})

export default Beaches;