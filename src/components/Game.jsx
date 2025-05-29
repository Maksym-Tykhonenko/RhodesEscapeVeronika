import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Image, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import Icons from './Icons.jsx';

const { height } = Dimensions.get('window');

const Game = ({ item }) => {
    const navigation = useNavigation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

    useEffect(() => {
        resetFail();
    }, []);

    const resetFail = async () => {
        try {
            const storedLevels = await AsyncStorage.getItem('levels');
            if (storedLevels) {
                const levels = JSON.parse(storedLevels);
                const currentLevelIndex = levels.findIndex(level => level.level === item.level);

                if (currentLevelIndex !== -1) {
                    levels[currentLevelIndex].fail = false;
                    await AsyncStorage.setItem('levels', JSON.stringify(levels));
                    console.log('Fail status reset for level:', item.level);
                }

                console.log('fail status: ', levels[currentLevelIndex].fail)
            }

        } catch (error) {
            console.error('Error resetting fail status:', error);
        }
    };

    const handleOptionPress = (isCorrect, index) => {
        setSelectedOptionIndex(index);

        let updatedCorrectAnswers = correctAnswers;
        if (isCorrect) {
            updatedCorrectAnswers += 1;
            setCorrectAnswers(updatedCorrectAnswers);
        }
    
        setTimeout(() => {
            if (currentQuestionIndex <= item.questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOptionIndex(null);
            }
            
            if (item.questions.length + 1) {
                updateLevelStatus(updatedCorrectAnswers);
                setSelectedOptionIndex(null);
            }

        }, 1000);
    };
    
    const updateLevelStatus = async (finalCorrectAnswers) => {
        try {
            const storedLevels = await AsyncStorage.getItem('levels');
            const levels = JSON.parse(storedLevels);

            const currentLevelIndex = levels.findIndex(level => level.level === item.level);

            if (finalCorrectAnswers === item.questions.length) {
                levels[currentLevelIndex].success = true;
                levels[currentLevelIndex].fail = false;
                if (levels[currentLevelIndex + 1]) {
                    levels[currentLevelIndex + 1].open = true;
                }
            } else {
                levels[currentLevelIndex].fail = true;
            }

            console.log('correctAnswers: ', finalCorrectAnswers)
            console.log('current level: ', currentLevelIndex)
            console.log('levels: ', levels)

            await AsyncStorage.setItem('levels', JSON.stringify(levels));
        } catch (error) {
            console.error('Error updating level status:', error);
        }
    };

    const handleTryAgain = () => {
        setCorrectAnswers(0);
        setCurrentQuestionIndex(0);
        setSelectedOptionIndex(null);
        resetFail();
    }

    const renderQuestion = () => {
        const currentQuestion = item.questions[currentQuestionIndex];

        return (
            <View style={{width: '100%', padding: 16}}>

                <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedOptionIndex === index;
                        const optionStyle = isSelected
                        ? option.correct ? {borderWidth: 3, borderColor: '#d8b281'} : {borderWidth: 3, borderColor: '#ea1414'}
                        : {borderColor: 'transparent', borderWidth: 0};

                        return (
                        <TouchableOpacity
                            key={index}
                            style={[index === 2 ? styles.bigImage : styles.smallImage, optionStyle]}
                            onPress={() => handleOptionPress(option.correct, index)}
                            disabled={selectedOptionIndex !== null}
                        >
                            <Image source={option.option} style={{width: '100%', height: '100%', resizeMode: 'cover'}} />
                        </TouchableOpacity>
                        );
                    })}
                </View>

                <Text style={styles.question}>{currentQuestion.question}</Text>

            </View>
        );
    };

    const renderFinishScreen = () => (
        <View style={{width: '100%', alignItems: 'center', padding: 16}}>
            {
                correctAnswers === item.questions.length ? (
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={styles.finishTitle}>Success !</Text>
                        <Text style={styles.finishText}>{correctAnswers}/{item.questions.length} are correct.</Text>
                        <Image source={require('../assets/decor/saved.png')} style={{width: height * 0.25, height: height * 0.25, resizeMode: 'contain', marginBottom: height * 0.1}} />
                    </View>
                ) : (
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={styles.finishTitle}>Nice try !</Text>
                        <Text style={styles.finishText}>{correctAnswers}/{item.questions.length} are correct.</Text>
                        <Image source={require('../assets/decor/nothing.png')} style={{width: height * 0.25, height: height * 0.25, resizeMode: 'contain', marginBottom: height * 0.1}} />
                    </View>
                )
            }
            <TouchableOpacity
                style={styles.tryAgainBtn}
                onPress={handleTryAgain}
            >
                <Text style={[styles.finishBtnText, {fontWeight: '600'}]}>Try again</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.finishBtnText}>Close</Text>
            </TouchableOpacity>
        </View>
    );

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
                    <Text style={styles.title}>{item.level} lvl</Text>
                </View>

                {currentQuestionIndex < item.questions.length ? renderQuestion() : renderFinishScreen()}

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

    title: {
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 28.64,
        color: '#a66702',
    },


    question: {
        fontSize: 24,
        color: '#000',
        fontWeight: '700',
        lineHeight: 28.64
    },

    bigImage: {
        width: '100%',
        height: height * 0.35,
        borderRadius: 16,
        marginBottom: 20,
        overflow: 'hidden'
    },

    smallImage: {
        width: '47%',
        height: height * 0.22,
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden'
    },

    finishTitle: {
        fontSize: 32,
        color: '#a66702',
        fontWeight: '700',
        lineHeight: 38.2,
        marginBottom: 32,
        marginTop: 20,
        textAlign: 'center'
    },

    finishText: {
        fontSize: 20,
        color: '#000',
        fontWeight: '400',
        lineHeight: 23.87,
        marginBottom: 32,
        textAlign: 'center'
    },

    tryAgainBtn: {
        width: '100%',
        padding: 14.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a66702',
        borderRadius: 12,
        marginBottom: 24
    },

    closeBtn: {
        width: '100%',
        padding: 14.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 12,
        marginBottom: 24
    },

    finishBtnText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
        lineHeight: 19.09,
    }

})

export default Game;