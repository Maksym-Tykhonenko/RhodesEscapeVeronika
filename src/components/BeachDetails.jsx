// favorites
import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions, ScrollView, ImageBackground } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const BeachDetails = ({ beach }) => {
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]);

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favoriteBeaches');
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
            const index = updatedFavorites.findIndex(fav => fav.name === beach.name);

            if (index !== -1) {
                updatedFavorites.splice(index, 1);
            } else {
                updatedFavorites.push(beach);
            }

            await AsyncStorage.setItem('favoriteBeaches', JSON.stringify(updatedFavorites));
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
                        <Icons type={'fav'} active={favorites.some(fav => fav.name === beach.name)} />
                    </TouchableOpacity>
                </View>

                <Image source={typeof beach.image === 'string' ? { uri: beach.image } : beach.image} style={styles.image} />

                <ScrollView style={{width: '100%', paddingHorizontal: 16}}>

                    <Text style={styles.name}>{beach.name}</Text>

                    <Text style={styles.location}>{beach.location}</Text>

                    <Text style={styles.description}>{beach.description}</Text>

                    {
                        beach.facilities && (
                            <Text style={[styles.name, {fontSize: 20}]}>Facilities on the site</Text>
                        )
                    }

                    {
                        beach.facilities?.map((f, i) => (
                            <View key={i} style={{width: '100%', alignItems: 'flex-start', marginBottom: 12}}>
                                <Text style={styles.facilityName}>{f.name}</Text>
                                <Text style={styles.facilityDesc}>{f.description}</Text>
                            </View>
                        ))
                    }

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

    description: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.09,
        color: '#000',
        marginBottom: 32
    },

    location: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.09,
        color: '#a66702',
        marginBottom: 24
    },

    facilityName: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 19.09,
        color: '#000',
        marginBottom: 6
    },

    facilityDesc: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 14.32,
        color: '#a66702',
    }

});

export default BeachDetails;