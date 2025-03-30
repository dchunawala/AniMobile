import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, TextInput, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';

const MOCK_SIGHTINGS = [
  {
    id: 1,
    animal: 'Black Bear',
    date: '2024-03-28',
    location: 'Yellowstone',
    coordinates: '44.4280° N, 110.5885° W',
    image: 'https://api.a0.dev/assets/image?text=black%20bear%20foraging%20in%20natural%20habitat%20realistic',
    description: 'Spotted near hiking trail, eating berries. Showed no aggression.',
  },
  {
    id: 2,
    animal: 'Grey Wolf',
    date: '2024-03-25',
    location: 'Grand Teton',
    coordinates: '43.7904° N, 110.6818° W',
    image: 'https://api.a0.dev/assets/image?text=grey%20wolf%20pack%20in%20snow%20realistic',
    description: 'Pack of 3 wolves observed from safe distance, hunting elk',
  },
  {
    id: 3,
    animal: 'Mountain Lion',
    date: '2024-03-27',
    location: 'Rocky Mountain National Park',
    coordinates: '40.3428° N, 105.6836° W',
    image: 'https://api.a0.dev/assets/image?text=mountain%20lion%20on%20rocky%20outcrop%20realistic',
    description: 'Solitary cougar spotted at dusk, moving through rocky terrain',
  },
  {
    id: 4,
    animal: 'Moose',
    date: '2024-03-26',
    location: 'Denali',
    coordinates: '63.1148° N, 151.1926° W',
    image: 'https://api.a0.dev/assets/image?text=bull%20moose%20in%20lake%20with%20antlers%20realistic',
    description: 'Large bull moose feeding in lake during early morning',
  },
  {
    id: 5,
    animal: 'Bald Eagle',
    date: '2024-03-24',
    location: 'Olympic National Park',
    coordinates: '47.8021° N, 123.6044° W',
    image: 'https://api.a0.dev/assets/image?text=bald%20eagle%20perched%20on%20tree%20realistic',
    description: 'Adult eagle spotted with nest, fishing in nearby river',
  },
  {
    id: 6,
    animal: 'Grizzly Bear',
    date: '2024-03-23',
    location: 'Glacier National Park',
    coordinates: '48.7596° N, 113.7870° W',
    image: 'https://api.a0.dev/assets/image?text=grizzly%20bear%20catching%20salmon%20realistic',
    description: 'Large grizzly fishing for salmon in mountain stream',
  }
];

export default function SightingsScreen({ route, navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newSighting, setNewSighting] = useState({
    animal: '',
    notes: '',
    coordinates: '',
    image: null
  });
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [locationPermission, requestLocationPermission] = Location.useForegroundPermissions();  const [camera, setCamera] = useState<any>(null);
  const [type, setType] = useState('back');
  const sightingsToShow = MOCK_SIGHTINGS;    const getCurrentLocation = async () => {
    try {
      if (!locationPermission?.granted) {
        const permission = await requestLocationPermission();
        if (!permission.granted) {
          Alert.alert('Location permission is required to add sightings');
          return;
        }
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      
      // Get actual location name using reverse geocoding
      const [geocode] = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      setNewSighting(prev => ({
        ...prev,
        coordinates: `${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° W`,
        location: geocode ? `${geocode.name}, ${geocode.region}` : 'Unknown Location'
      }));
    } catch (error) {
      Alert.alert('Error getting location', 'Please try again');
    }
  };  const handleAddSighting = () => {
    if (!newSighting.animal.trim()) {
      Alert.alert('Please enter the animal name');
      return;
    }

    if (!newSighting.coordinates) {
      Alert.alert('Location is required', 'Please wait for location or try again');
      return;
    }

    // Create a new sighting object
    const sighting = {
      id: MOCK_SIGHTINGS.length + 1,
      animal: newSighting.animal,
      date: new Date().toISOString().split('T')[0],
      location: newSighting.location || 'Unknown Location',
      coordinates: newSighting.coordinates,
      image: newSighting.image || `https://api.a0.dev/assets/image?text=${encodeURIComponent(newSighting.animal)}%20in%20natural%20habitat%20realistic&seed=${Date.now()}`,
      description: newSighting.notes || `${newSighting.animal} spotted in the wild`
    };

    // Add to mock sightings
    MOCK_SIGHTINGS.unshift(sighting);

    // Reset form and close modal
    setIsModalVisible(false);
    setNewSighting({
      animal: '',
      notes: '',
      coordinates: '',
      location: '',
      image: null
    });

    // Show success message
    Alert.alert('Success', 'Sighting added successfully!');
  };  const takePicture = async () => {
    if (!permission?.granted) {
      const newPermission = await requestPermission();
      if (!newPermission.granted) {
        Alert.alert('Permission required', 'Camera permission is needed to take photos');
        return;
      }
    }
    
    try {
      if (!camera) {
        Alert.alert('Error', 'Camera not ready. Please try again.');
        return;
      }
      const photo = await camera.takePictureAsync();
      if (photo) {
        setNewSighting(prev => ({
          ...prev,
          image: photo.uri
        }));
        setIsCameraVisible(false);
      }
    } catch (error) {
      console.error('Failed to take picture:', error);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Sightings</Text>        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => {
            setIsModalVisible(true);
            getCurrentLocation();
          }}
        >
          <MaterialCommunityIcons name="plus" size={24} color="white" />
          <Text style={styles.addButtonText}>Add Sighting</Text>
        </TouchableOpacity>

        {/* Add Sighting Modal */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add New Sighting</Text>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <MaterialCommunityIcons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Animal Name"
                value={newSighting.animal}
                onChangeText={(text) => setNewSighting(prev => ({ ...prev, animal: text }))}
              />

              <View style={styles.coordinatesContainer}>
                <Text style={styles.coordinatesText}>{newSighting.coordinates || 'Getting location...'}</Text>
                <TouchableOpacity onPress={getCurrentLocation}>
                  <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#27ae60" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={styles.photoButton}
                onPress={() => setIsCameraVisible(true)}
              >
                {newSighting.image ? (
                  <Image source={{ uri: newSighting.image }} style={styles.previewImage} />
                ) : (
                  <>
                    <MaterialCommunityIcons name="camera" size={24} color="#666" />
                    <Text style={styles.photoButtonText}>Take Photo</Text>
                  </>
                )}
              </TouchableOpacity>

              <TextInput
                style={[styles.input, styles.notesInput]}
                placeholder="Notes about the sighting..."
                value={newSighting.notes}
                onChangeText={(text) => setNewSighting(prev => ({ ...prev, notes: text }))}
                multiline
              />

              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleAddSighting}
              >
                <Text style={styles.submitButtonText}>Add Sighting</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Camera Modal */}
        <Modal
          visible={isCameraVisible}
          animationType="slide"
          transparent={false}
        >
          <View style={styles.cameraContainer}>            <CameraView              style={styles.camera}
              type={type}
            >
              <View style={styles.cameraButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setIsCameraVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.captureButton}
                  onPress={takePicture}
                >
                  <View style={styles.captureCircle} />
                </TouchableOpacity>
              </View>
            </CameraView>
          </View>
        </Modal>
      </View>      <ScrollView style={styles.sightingsList}>
        {sightingsToShow.map((sighting) => (
          <TouchableOpacity key={sighting.id} style={styles.sightingCard}>
            <Image source={{ uri: sighting.image }} style={styles.sightingImage} />
            
            <View style={styles.sightingContent}>
              <View style={styles.sightingHeader}>
                <Text style={styles.animalName}>{sighting.animal}</Text>
                <View style={styles.dateContainer}>
                  <MaterialCommunityIcons name="calendar" size={16} color="#666" />
                  <Text style={styles.date}>{sighting.date}</Text>
                </View>
              </View>

              <View style={styles.locationContainer}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#27ae60" />
                <Text style={styles.location}>{sighting.location}</Text>
              </View>

              <Text style={styles.coordinates}>{sighting.coordinates}</Text>
              <Text style={styles.description}>{sighting.description}</Text>

              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <MaterialCommunityIcons name="share-variant" size={20} color="#3498db" />
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <MaterialCommunityIcons name="map-marker-radius" size={20} color="#27ae60" />
                  <Text style={styles.actionText}>View on Map</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  input: {
    backgroundColor: '#f5f6fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  coordinatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  coordinatesText: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  photoButton: {
    backgroundColor: '#f5f6fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  photoButtonText: {
    color: '#666',
    marginTop: 10,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  cameraButtons: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 30,
  },
  cancelButton: {
    padding: 15,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '600',
  },
  sightingsList: {
    flex: 1,
  },
  sightingCard: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sightingImage: {
    width: '100%',
    height: 200,
  },
  sightingContent: {
    padding: 15,
  },
  sightingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  animalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    marginLeft: 5,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  location: {
    marginLeft: 5,
    color: '#27ae60',
    fontWeight: '500',
  },
  coordinates: {
    color: '#7f8c8d',
    fontSize: 12,
    marginBottom: 10,
  },
  description: {
    color: '#34495e',
    marginBottom: 15,
    lineHeight: 20,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    marginLeft: 5,
    color: '#666',
    fontWeight: '500',
  },
});