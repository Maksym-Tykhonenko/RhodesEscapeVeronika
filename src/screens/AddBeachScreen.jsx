import { View } from "react-native"
import AddBeach from "../components/AddBeach"

const AddBeachScreen = () => {
    return (
        <View style={styles.container}>
            <AddBeach />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default AddBeachScreen;