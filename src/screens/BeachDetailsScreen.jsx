import { View } from "react-native"
import BeachDetails from "../components/BeachDetails"

const BeachDetailsScreen = ({ route }) => {
    const { beach } = route.params;

    return (
        <View style={styles.container}>
            <BeachDetails beach={beach} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default BeachDetailsScreen;