import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ScrollView, ImageBackground } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import games from "../constants/games.js";
import Icons from './Icons';

const { height } = Dimensions.get('window');

const GameLevels = () => {
    const navigation = useNavigation();
    const [levels, setLevels] = useState([]);

    const loadLevels = async () => {
        try {
            const storedLevels = await AsyncStorage.getItem("levels");
            if (storedLevels) {
                setLevels(JSON.parse(storedLevels));
            } else {
                const initialLevels = games.map((item, index) => ({
                    level: item.level,
                    success: false,
                    fail: false,
                    open: index === 0
                }));
                setLevels(initialLevels);
                await AsyncStorage.setItem("levels", JSON.stringify(initialLevels));
            }
        } catch (error) {
            console.error("Error initializing levels:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadLevels();
        }, [])
    );

    const handleLevelPress = async (item) => {
        try {
            navigation.navigate("GameScreen", { item });
        } catch (error) {
            console.error("Error navigating to level:", error);
        }
    };

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <Text style={styles.title}>Rhodes games</Text>

                <ScrollView style={{width: '100%', height: '100%', borderTopWidth: 2, borderTopColor: '#fff', padding: 16}}>
                    {levels.map((level, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleLevelPress(games.find(g => g.level === level.level))}
                            style={[
                                styles.btn,
                                !level.open && {opacity: 0.4},
                                level.open && !level.success && {backgroundColor: '#d8b281'}
                            ]}
                            disabled={!level.open}
                        >
                            <View style={[level.success ? {width: 32, height: 32, marginRight: 10} : {width: 24, height: 24, marginRight: 10}]}>
                                <Icons type={level.success ? 'success' : !level.open ? 'locked' : ''} />
                            </View>
                            <Text style={[styles.btnText, level.open && !level.success && {marginLeft: -30}]}>{level.level} lvl</Text>
                        </TouchableOpacity>
                    ))}
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

    title: {
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 28.64,
        color: '#a66702',
        marginBottom: 16
    },

    btn: {
        width: '100%',
        padding: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 24,
        flexDirection: 'row'
    },

    btnText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        lineHeight: 23.87
    }

})

export default GameLevels;