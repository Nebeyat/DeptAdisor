import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function AdminScreen() {
  // Form input states
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [stream, setStream] = useState('');
  const [description, setDescription] = useState('');
  const [minGpa, setMinGpa] = useState('');
  const [loading, setLoading] = useState(false);

  // Convex mutation hook
  const addDepartment = useMutation(api.departments.createDepartment);

  const handleSubmit = async () => {
    if (!name || !code || !stream || !description || !minGpa) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      setLoading(true);
      await addDepartment({
        name,
        code,
        stream,
        description,
        minGpa,
      });

      Alert.alert('Success', 'Department added successfully!');
      
      // Clear form inputs
      setName('');
      setCode('');
      setStream('');
      setDescription('');
      setMinGpa('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add department.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin: Add Department</Text>
      
      <Text style={styles.label}>Department Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Software Engineering"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Department Code</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. SE"
        placeholderTextColor="#888"
        value={code}
        onChangeText={setCode}
      />

      <Text style={styles.label}>Stream</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Natural Science"
        placeholderTextColor="#888"
        value={stream}
        onChangeText={setStream}
      />

      <Text style={styles.label}>Minimum GPA Cutoff</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 3.2"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={minGpa}
        onChangeText={setMinGpa}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter department overview..."
        placeholderTextColor="#888"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Save Department</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});