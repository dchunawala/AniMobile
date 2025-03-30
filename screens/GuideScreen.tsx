import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const WILDLIFE_GUIDES = [
  {
    id: 1,
    animal: 'Black Bear',
    image: 'https://api.a0.dev/assets/image?text=black%20bear%20in%20forest%20realistic',
    description: 'Black bears are typically shy and try to avoid human contact.',
    safety: [
      'Make noise while hiking',
      'Keep food stored properly',
      'Never run if encountered',
      'Make yourself look big',
    ],
  },
  {
    id: 2,
    animal: 'Grey Wolf',
    image: 'https://api.a0.dev/assets/image?text=grey%20wolf%20in%20wilderness%20realistic',
    description: 'Wolves generally avoid human contact and are rarely aggressive towards people.',
    safety: [
      'Stay in groups',
      'Make loud noises',
      'Never run away',
      'Back away slowly if encountered',
    ],
  },
  {
    id: 3,
    animal: 'Mountain Lion',
    image: 'https://api.a0.dev/assets/image?text=mountain%20lion%20stalking%20realistic',
    description: 'Mountain lions are solitary and elusive creatures, most active at dawn and dusk.',
    safety: [
      'Keep children close',
      'Never approach or run',
      'Make noise to avoid surprise encounters',
      'Fight back if attacked',
    ],
  },
  {
    id: 4,
    animal: 'Moose',
    image: 'https://api.a0.dev/assets/image?text=moose%20in%20forest%20realistic',
    description: 'Moose are generally peaceful but can be very dangerous if threatened or during mating season.',
    safety: [
      'Keep at least 50 yards away',
      'Watch for warning signs like laid-back ears',
      'Get behind large objects if charged',
      'Never get between a cow and calf',
    ],
  },
  {
    id: 5,
    animal: 'Bald Eagle',
    image: 'https://api.a0.dev/assets/image?text=bald%20eagle%20perched%20majestic%20realistic',
    description: 'Bald eagles are protected and typically nest in tall trees near water bodies.',
    safety: [
      'Observe from a distance',
      'Never disturb nests',
      'Keep dogs leashed',
      'Avoid loud noises near nesting sites',
    ],
  },
  {
    id: 6,
    animal: 'Grizzly Bear',
    image: 'https://api.a0.dev/assets/image?text=grizzly%20bear%20standing%20realistic',
    description: 'Grizzly bears are powerful and territorial, requiring extra caution in their habitat.',
    safety: [
      'Carry bear spray',
      'Travel in groups',
      'Make noise while hiking',
      'Store food properly and away from camp',
    ],
  },
];

export default function GuideScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredGuides = WILDLIFE_GUIDES.filter(guide =>
    guide.animal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search animals..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialCommunityIcons name="close" size={24} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView>
        <Text style={styles.header}>Wildlife Safety Guide</Text>        {filteredGuides.map((guide) => (
          <View key={guide.id} style={styles.guideCard}>
            <Image
              source={{ uri: guide.image }}
              style={styles.animalImage}
            />
            
            <Text style={styles.animalTitle}>{guide.animal}</Text>
            <Text style={styles.description}>{guide.description}</Text>
            
            <View style={styles.safetyContainer}>
              <Text style={styles.safetyHeader}>Safety Tips:</Text>
              {guide.safety.map((tip, index) => (
                <View key={index} style={styles.safetyTip}>
                  <MaterialCommunityIcons name="shield-check" size={20} color="#27ae60" />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.emergencyButton}>
              <MaterialCommunityIcons name="phone" size={24} color="white" />
              <Text style={styles.emergencyButtonText}>Emergency Contact</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    margin: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#2c3e50',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: '#2c3e50',
  },
  guideCard: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  animalImage: {
    width: '100%',
    height: 200,
  },
  animalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
    color: '#2c3e50',
  },
  description: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  safetyContainer: {
    padding: 15,
    backgroundColor: '#f8f9fa',
  },
  safetyHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
  },
  safetyTip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipText: {
    marginLeft: 10,
    color: '#34495e',
    flex: 1,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    padding: 15,
    margin: 15,
    borderRadius: 10,
  },
  emergencyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
});