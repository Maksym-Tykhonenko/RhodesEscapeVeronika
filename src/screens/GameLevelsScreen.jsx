import { View } from "react-native"
import GameLevels from "../components/GameLevels"
import Menu from "../components/Menu";

const GameLevelsScreen = () => {
    return (
        <View style={styles.container}>
            <GameLevels />
            <View style={styles.menu}>
                <Menu />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
}

export default GameLevelsScreen;