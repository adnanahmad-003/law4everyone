import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

const NewChatModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
    >
      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
        onPress={onClose}
      >
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Add New Chat</Text>
          {/* Add your chat input fields and buttons here */}
          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: 'blue' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default NewChatModal;
