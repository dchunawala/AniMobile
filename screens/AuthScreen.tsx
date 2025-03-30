import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AuthScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('explorer'); // 'explorer' or 'pro'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleAuth = () => {
    // Here you would implement actual authentication
    // For now, we'll just navigate to the main app
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://api.a0.dev/assets/image?text=wildlife%20tracking%20app%20logo%20nature%20forest%20minimal' }}
            style={styles.logo}
          />          <Text style={styles.title}>Welcome to AniMobile</Text>
          <Text style={styles.subtitle}>Track • Share • Learn</Text>
        </View>

        <View style={styles.form}>
          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          )}
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
          />

          {!isLogin && (
            <View style={styles.userTypeContainer}>
              <TouchableOpacity 
                style={[styles.userTypeButton, userType === 'explorer' && styles.selectedType]}
                onPress={() => setUserType('explorer')}
              >
                <MaterialCommunityIcons name="compass" size={24} color={userType === 'explorer' ? 'white' : '#666'} />
                <Text style={[styles.userTypeText, userType === 'explorer' && styles.selectedTypeText]}>Explorer</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.userTypeButton, userType === 'pro' && styles.selectedType]}
                onPress={() => setUserType('pro')}
              >
                <MaterialCommunityIcons name="shield-check" size={24} color={userType === 'pro' ? 'white' : '#666'} />
                <Text style={[styles.userTypeText, userType === 'pro' && styles.selectedTypeText]}>Pro</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={handleAuth}>
            <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.switchText}>
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#27ae60',
    letterSpacing: 1,
    textAlign: 'center',
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginTop: 8,
    letterSpacing: 2,
    textAlign: 'center',
  },
  form: {
    padding: 20,
  },
  input: {
    backgroundColor: '#f5f6fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#2980b9',
    textAlign: 'center',
    marginTop: 20,
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f5f6fa',
    marginHorizontal: 5,
  },
  selectedType: {
    backgroundColor: '#27ae60',
  },
  userTypeText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  selectedTypeText: {
    color: 'white',
  },
});