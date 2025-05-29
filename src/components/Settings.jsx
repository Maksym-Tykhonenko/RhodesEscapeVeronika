import { TouchableOpacity, View, Text, Dimensions, StyleSheet, Linking, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icons from './Icons.jsx';

const { height } = Dimensions.get('window');

const Beaches = () => {
    const navigation = useNavigation();

    const handlePrivacyPolicy = () => {
        const url = 'https://www.termsfeed.com/live/d3e0f7af-2724-4df1-ab86-eb8d31c8046c';
        Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    };    

    const handleRate = () => {
        const url = Platform.select({
            ios: 'https://apps.apple.com/us/app/rhodes-escape/id6741211670',
        });
    
        Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    };

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={{ marginBottom: 16, paddingHorizontal: 16, alignSelf: 'flex-start'}}>
                    <Text style={styles.title}>Settings</Text>
                </View>

                <View style={{ width: '100%', height: '100%', borderTopWidth: 2, borderTopColor: '#fff', padding: 16}}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('FavoritesScreen')}>
                        <View style={{width: 32, height: 32, marginRight: 15}}>
                            <Icons type={'settings-fav'} />
                        </View>
                        <Text style={styles.btnText}>Favorites</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={handlePrivacyPolicy}>
                        <View style={{width: 32, height: 32, marginRight: 15}}>
                            <Icons type={'settings-policy'} />
                        </View>
                        <Text style={styles.btnText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={handleRate}>
                        <View style={{width: 32, height: 32, marginRight: 15}}>
                            <Icons type={'settings-rate'} />
                        </View>
                        <Text style={styles.btnText}>Rate us</Text>
                    </TouchableOpacity>
                </View>

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

    title: {
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 28.64,
        color: '#a66702',
    },

    btn: {
        width: '100%',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginBottom: 18,
        backgroundColor: '#f6f6f6',
        borderRadius: 16
    },

    btnText: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19.09,
        color: '#000',
    }

})

export default Beaches;