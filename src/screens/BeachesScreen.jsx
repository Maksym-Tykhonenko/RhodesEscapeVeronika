import { View } from "react-native"
import Beaches from "../components/Beaches"
import Menu from "../components/Menu";

const BeachesScreen = () => {
    return (
        <View style={styles.container}>
            <Beaches />
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

export default BeachesScreen;