import { View, ActivityIndicator} from "react-native"
import React, { useEffect, useState, useRef } from 'react';
import Events from "../components/Events"
import Menu from "../components/Menu";
import EulaModal from "../components/EulaModal";
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventsScreen = () => {
    const [showEula, setShowEula] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEulaConsent = async () => {
      const consent = await AsyncStorage.getItem('eulaAccepted');
      if (consent !== 'true') {
        setShowEula(true);
      }
      setLoading(false);
    };
    checkEulaConsent();
  }, []);

  const handleAcceptEula = async () => {
    try {
      await AsyncStorage.setItem('eulaAccepted', 'true');
      setShowEula(false);
    } catch (error) {
      console.error('Error saving EULA consent:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }
    return (
        <View style={styles.container}>
            <Events />
            <View style={styles.menu}>
                <Menu />
            </View>

            <EulaModal visible={showEula} onAccept={handleAcceptEula} />
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

export default EventsScreen;