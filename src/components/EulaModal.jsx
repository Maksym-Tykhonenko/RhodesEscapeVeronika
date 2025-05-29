import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Linking,
  Switch,
} from 'react-native';

const EulaModal = ({ visible, onAccept }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const openTermsLink = () => {
    const url = 'https://www.termsfeed.com/live/d3e0f7af-2724-4df1-ab86-eb8d31c8046c';
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
};

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Terms of Use (EULA)</Text>
          <ScrollView style={styles.textContainer}>
            <Text style={styles.text}>
              Please read and accept the terms of use before registering.
            </Text>
            <TouchableOpacity onPress={openTermsLink}>
              <Text style={styles.linkText}>Terms of Use</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
              Offensive content and behavior are not allowed in our app. Violators will be banned.
              Avoid uploading provocative images, abusive comments, or violating user privacy.
            </Text>
          </ScrollView>

          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>I agree with the terms of use</Text>
            <Switch
              value={isAgreed}
              onValueChange={setIsAgreed}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.acceptButton,
              { backgroundColor: isAgreed ? '#d8b281' : '#ccc' },
            ]}
            onPress={onAccept}
            disabled={!isAgreed}
          >
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  textContainer: {
    maxHeight: 200,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchText: {
    fontSize: 16,
    marginRight: 10,
  },
  acceptButton: {
    width: '100%',
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  acceptButtonText: {
    fontSize: 17,
        fontWeight: '600',
        color: '#fff',
        lineHeight: 22
  },
});

export default EulaModal;
