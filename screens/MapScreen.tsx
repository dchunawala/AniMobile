import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_SIGHTINGS = [
  {
    id: 1,
    latitude: 37.78825,
    longitude: -122.4324,
    title: 'Black Bear',
    description: 'Spotted near hiking trail',
    type: 'bear',
  },
  {
    id: 2,
    latitude: 37.78925,
    longitude: -122.4344,
    title: 'Grey Wolf',
    description: 'Pack of 3 wolves',
    type: 'wolf',
  },
];

export default function MapScreen({ navigation }) {
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Web fallback component
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.webFallback}>
          <MaterialCommunityIcons name="map-marker-alert" size={64} color="#27ae60" />
          <Text style={styles.webFallbackTitle}>Map View Available on Mobile</Text>
          <Text style={styles.webFallbackText}>
            Please open this app on your mobile device to access the full map functionality and view wildlife sightings in your area.
          </Text>
          <TouchableOpacity
            style={styles.webFallbackButton}
            onPress={() => navigation.navigate('Sightings')}
          >
            <Text style={styles.webFallbackButtonText}>View Sightings List Instead</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <MaterialCommunityIcons name="map-search" size={64} color="#27ae60" />
          <Text style={styles.mapPlaceholderTitle}>Mobile Only Feature</Text>
          <Text style={styles.mapPlaceholderText}>
            The interactive map is available when you open this app on your mobile device.
          </Text>
          <View style={styles.sightingsPreview}>
            <Text style={styles.previewTitle}>Recent Sightings Nearby:</Text>
            {MOCK_SIGHTINGS.map((sighting) => (
              <View key={sighting.id} style={styles.previewItem}>
                <MaterialCommunityIcons 
                  name={sighting.type === 'bear' ? 'paw' : 'wolf'} 
                  size={24} 
                  color="#27ae60" 
                />
                <View style={styles.previewInfo}>
                  <Text style={styles.previewAnimal}>{sighting.title}</Text>
                  <Text style={styles.previewDescription}>{sighting.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Sightings')}
      >
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>

      {selectedMarker && (
        <View style={styles.markerInfo}>
          <Text style={styles.markerTitle}>{selectedMarker.title}</Text>
          <Text style={styles.markerDescription}>{selectedMarker.description}</Text>
          <TouchableOpacity
            style={styles.learnMoreButton}
            onPress={() => navigation.navigate('Guide', { animalType: selectedMarker.type })}
          >
            <Text style={styles.learnMoreText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },  mapContainer: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mapPlaceholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 16,
    marginBottom: 8,
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  sightingsPreview: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  previewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  previewInfo: {
    marginLeft: 12,
    flex: 1,
  },
  previewAnimal: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
  },
  previewDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  webFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webFallbackTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  webFallbackText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  webFallbackButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  webFallbackButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#27ae60',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  markerInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  markerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  markerDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  learnMoreButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  learnMoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});