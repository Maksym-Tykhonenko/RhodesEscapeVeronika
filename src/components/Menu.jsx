import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const Menu = () => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('EventsScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        navigation.navigate(screen)
    };    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>

            <View style={{alignItems: 'center'}}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleNavigate('EventsScreen')}>
                    <View style={{width: 24, height: 24}}>
                        <Icons type={'1'} active={activeButton === 'EventsScreen'}/>
                    </View>
                </TouchableOpacity>
                <Text style={[styles.btnText, activeButton === 'EventsScreen' && {color: '#d8b281'}]}>Events</Text>
            </View>

            <View style={{alignItems: 'center'}}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleNavigate('BeachesScreen')}>
                    <View style={{width: 24, height: 24}}>
                        <Icons type={'2'} active={activeButton === 'BeachesScreen'}/>
                    </View>
                </TouchableOpacity>
                <Text style={[styles.btnText, activeButton === 'BeachesScreen' && {color: '#d8b281'}]}>Beaches</Text>
            </View>

            <View style={{alignItems: 'center'}}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleNavigate('GameLevelsScreen')}>
                    <View style={{width: 24, height: 24}}>
                        <Icons type={'3'} active={activeButton === 'GameLevelsScreen'}/>
                    </View>
                </TouchableOpacity>
                <Text style={[styles.btnText, activeButton === 'GameLevelsScreen' && {color: '#d8b281'}]}>Game</Text>
            </View>

            <View style={{alignItems: 'center'}}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleNavigate('SettingsScreen')}>
                    <View style={{width: 24, height: 24}}>
                        <Icons type={'4'} active={activeButton === 'SettingsScreen'}/>
                    </View>
                </TouchableOpacity>
                <Text style={[styles.btnText, activeButton === 'SettingsScreen' && {color: '#d8b281'}]}>Settings</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderTopColor: '#ececec',
        borderTopWidth: 2,
    },
    
    button: {
        width: 35,
        height: 35,
        padding: 5
    },

    btnText: {
        color: '#999',
        fontSize: 11,
        marginLeft: 4,
        fontWeight: '700',
        lineHeight: 15
    }
});

export default Menu;
