// favorites
import React, { useState, useCallback } from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView, Dimensions, StyleSheet, Modal, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import beaches from '../constants/beaches.js';
import Icons from './Icons.jsx';

const { height } = Dimensions.get('window');

const Beaches = () => {
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]);
    const [button, setButton] = useState('general');
    const [addedBeaches, setAddedBeaches] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBeach, setSelectedBeach] = useState(null);

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

    const loadBeaches = async () => {
        try {
            const storedBeaches = await AsyncStorage.getItem('beaches');
            if (storedBeaches) {
                setAddedBeaches(JSON.parse(storedBeaches));
            }
        } catch (error) {
            console.error('Error loading beaches:', error);
        }
    };

    const toggleFavorite = async (beach) => {
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

    const isFavorite = (beach) => {
        return favorites.some(fav => fav.name === beach.name);
    };

    useFocusEffect(
        useCallback(() => {
            loadFavorites();
            loadBeaches();
        }, [])
    );

    console.log(favorites)

    const filteredBeaches = button === 'general' ? beaches : addedBeaches;

    const confirmDelete = (beach) => {
        setSelectedBeach(beach);
        setModalVisible(true);
    };
    
    const deleteBeach = async () => {
        try {
            const updatedBeaches = addedBeaches.filter(b => b.name !== selectedBeach.name);
            await AsyncStorage.setItem('beaches', JSON.stringify(updatedBeaches));
            setAddedBeaches(updatedBeaches);
            setModalVisible(false);
            setSelectedBeach(null);
        } catch (error) {
            console.error('Error deleting beach:', error);
        }
    };

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, paddingHorizontal: 16}}>
                    <Text style={styles.title}>Rhodes Beaches</Text>
                    <TouchableOpacity 
                        style={{width: 44, height: 44, backgroundColor: '#ececec', padding: 5, borderRadius: 12}} 
                        onPress={() => navigation.navigate('AddBeachScreen')}
                        >
                        <Icons type={'plus'} />
                    </TouchableOpacity>
                </View>

                <View style={styles.btnsContainer}>
                    <TouchableOpacity 
                        style={[styles.btn, button === 'general' && {backgroundColor: '#d8b281'}]} 
                        onPress={() => setButton('general')}
                        >
                        <Text style={[styles.btnText, button === 'general' && {color: '#fff', fontWeight: '600'}]} >General</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.btn, button === 'added' && {backgroundColor: '#d8b281'}]}
                        onPress={() => setButton('added')}
                        >
                        <Text style={[styles.btnText, button === 'added' && {color: '#fff', fontWeight: '600'}]} >Added</Text>
                    </TouchableOpacity>
                </View>

                <View style={{width: '100%', height: '100%', padding: 16, borderTopWidth: 2, borderTopColor: '#fff'}}>
                    {
                        filteredBeaches.length > 0 ? (
                            <ScrollView style={{width: '100%'}}>
                                {
                                    filteredBeaches.map((beach, index) => (
                                        <TouchableOpacity 
                                            key={index} 
                                            style={{width: '100%', marginBottom: 20}}
                                            onPress={() => navigation.navigate('BeachDetailsScreen', {beach: beach})}
                                            >
                                            <TouchableOpacity 
                                                style={styles.favBtn} 
                                                onPress={() => toggleFavorite(beach)}
                                                >
                                                <Icons type={'fav'} active={isFavorite(beach)} />
                                            </TouchableOpacity>
                                            <Image
                                                source={typeof beach.image === 'string' ? { uri: beach.image } : beach.image} 
                                                style={{width: '100%', height: 177, borderRadius: 12, marginBottom: 8}} />
                                            <Text style={styles.name}>{beach.name}</Text>
                                            {
                                                filteredBeaches === addedBeaches && (
                                                    <TouchableOpacity 
                                                        style={{width: 24, height: 24, position: 'absolute', top: 16, left: 16, zIndex: 10}}
                                                        onPress={() => confirmDelete(beach)}
                                                        >
                                                        <Icons type={'cross-img'} />
                                                    </TouchableOpacity>
                                                )
                                            }
                                        </TouchableOpacity>
                                    ))
                                }
                                <View style={{height: 100}} />
                            </ScrollView>
                        ) : (
                            <View style={{width: '80%', alignSelf: 'center', alignItems: 'center', marginVertical: 'auto'}}>
                                <Image source={require('../assets/decor/nothing.png')} style={{width: 140, height: 140, resizeMode: 'contain', marginBottom: 24}} />
                                <Text style={styles.nothingText}>There aren’t any beaches yet, please add something</Text>
                            </View>
                        )
                    }
                </View>

                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="fade"
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>Are you sure you want to delete this beach?</Text>
                            <TouchableOpacity 
                                style={styles.modalBtn}
                                onPress={deleteBeach}
                            >
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.modalBtn}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                </View>

        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: height * 0.07,
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

    name: {
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
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        paddingBottom: 0,
        borderRadius: 14,
        alignItems: 'center',
    },

    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    },

    modalBtn: {
        width: '100%',
        borderTopWidth: 0.33,
        borderTopColor: '#ececec',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    deleteButtonText: {
        color: '#dd0326',
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 22
    },

    closeButtonText: {
        color: '#d8b281',
        fontWeight: '400',
        fontSize: 17,
        lineHeight: 22
    },
    

})

export default Beaches;