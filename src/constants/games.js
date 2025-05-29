const games = [
    {
        level: 'Simple',
        questions: [
            {
                options: [
                    {
                        option: require('../assets/games/1/1.png'),
                        correct: true
                    },
                    {
                        option: require('../assets/games/1/2.png'),
                        correct: false
                    },
                    {
                        option: require('../assets/games/1/3.png'),
                        correct: false
                    },
                ],
                question: 'Where is the Palace of the Grand Masters?',      
            },
            {
                options: [
                    {
                        option: require('../assets/games/1/4.png'),
                        correct: false
                    },
                    {
                        option: require('../assets/games/1/5.png'),
                        correct: true
                    },
                    {
                        option: require('../assets/games/1/6.png'),
                        correct: false
                    },
                ],
                question: 'Where is Lindos Beach?',
            },
            {
                options: [
                    {
                        option: require('../assets/games/1/7.png'),
                        correct: false
                    },
                    {
                        option: require('../assets/games/1/8.png'),
                        correct: false
                    },
                    {
                        option: require('../assets/games/1/9.png'),
                        correct: true
                    },
                ],
                question: 'Where is the Valley of Butterflies?',
                correct: require('../assets/games/1/9.png')        
            },
        ]
    },
    {
        level: 'Middle',
        questions: [
            {
                options: [
                    {
                        option: require('../assets/games/2/1.png'),
                        correct: false
                    },
                    {
                        option: require('../assets/games/2/2.png'),
                        correct: false
                    },
                    {
                        option: require('../assets/games/2/3.png'),
                        correct: true
                    },
                ],
                question: 'Which picture is the Acropolis of Lindos?',
            },
            {
                options: [
                    {
                        option: require('../assets/games/2/4.png'),
                        correct: false
                    },
                    {
                        option: require('../assets/games/2/5.png'),
                        correct: true
                    },
                    {
                        option: require('../assets/games/2/6.png'),
                        correct: false
                    },
                ],
                question: 'Where is Tsambika Beach?',
            },
            {
                options: [
                    {
                        option: require('../assets/games/2/7.png'),
                        correct: false
                    },
                    {
                        option: require('../assets/games/2/8.png'),
                        correct: false
                    },
                    {
                        option: require('../assets/games/2/9.png'),
                    },
                ],
                question: 'Where is the Monolithos Fortress?',
                correct: require('../assets/games/2/9.png')        
            },
        ]
    },
    {
        level: 'Hard',
        questions: [
            {
                options: [
                    {
                        option: require('../assets/games/3/1.png'),
                        correct: true
                    },
                    {
                        option: require('../assets/games/3/2.png'),
                        correct: false
                    },
                    {
                        option: require('../assets/games/3/3.png'),
                        correct: false
                    },
                ],
                question: 'Which picture is St. Paul`s Beach?',
            },
            {
                options: [
                    {
                        option: require('../assets/games/3/4.png'),
                        correct: false
                    },
                    {
                        option: require('../assets/games/3/5.png'),
                        correct: false
                    },
                    {
                        option: require('../assets/games/3/6.png'),
                        correct: true
                    },
                ],
                question: 'Where is Mount Filerimos?',
            },
            {
                options: [
                    {
                        option: require('../assets/games/3/7.png'),
                        correct: true
                    },
                    {
                        option: require('../assets/games/3/8.png'),
                        correct: false
                    },
                    {
                        option: require('../assets/games/3/9.png'),
                        correct: false
                    },
                ],
                question: 'Where are the Medieval Walls of Rhodes?',
            },
        ]
    }
];

export default games;