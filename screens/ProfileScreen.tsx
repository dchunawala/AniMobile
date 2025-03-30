import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialUserData = {  name: 'John Doe',
  type: 'Explorer',
  badges: ['Bear Spotter', 'Wolf Pack', 'Snake Expert'],
  totalSightings: 24,
  statesVisited: ['Wyoming', 'Montana', 'Alaska'],
  email: 'john.doe@example.com',  friends: [
    { name: 'Sarah Wilson', type: 'Explorer' },
    { name: 'Mike Thompson', type: 'Pro' },
    { name: 'Emma Davis', type: 'Explorer' }
  ],
  recentSightings: [
    {
      id: 1,
      animal: 'Black Bear',
      date: '2024-03-28',
      location: 'Yellowstone',
    },
    {
      id: 2,
      animal: 'Grey Wolf',
      date: '2024-03-25',
      location: 'Grand Teton',
    },
  ],
};

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userData);
const [showStatesModal, setShowStatesModal] = useState(false);

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];
  return (
    <SafeAreaView style={styles.container}>      <ScrollView style={styles.scrollView}>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => setIsEditing(true)}
        >
          <MaterialCommunityIcons name="account-edit" size={20} color="white" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <View style={styles.header}>          <Image            source={{ uri: 'https://api.a0.dev/assets/image?text=professional%20headshot%20of%20a%20friendly%20male%20outdoor%20enthusiast%20in%20his%2030s%20smiling%20natural%20lighting&seed=john_doe' }}
            style={styles.avatar}
          />          <Text style={styles.name}>{userData.name}</Text>
          <View style={styles.typeContainer}>
            <MaterialCommunityIcons name="compass" size={20} color="#27ae60" />
            <Text style={styles.type}>{userData.type}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>            <Text style={styles.statNumber}>{userData.totalSightings}</Text>
            <Text style={styles.statLabel}>Sightings</Text>
          </View>
          <View style={styles.statItem}>            <Text style={styles.statNumber}>{userData.badges.length}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges</Text>          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {userData.badges.map((badge, index) => {
              let iconName = "shield-star";
              let iconColor = "#f39c12";
              
              // Match icon to badge type
              if (badge.includes("Bear")) {
                iconName = "paw";
                iconColor = "#8B4513";
              } else if (badge.includes("Wolf")) {
                iconName = "wolf";
                iconColor = "#4A4A4A";
              } else if (badge.includes("Snake")) {
                iconName = "snake";
                iconColor = "#2E8B57";
              }
              
              return (
                <View key={index} style={[styles.badge, { backgroundColor: `${iconColor}15` }]}>
                  <MaterialCommunityIcons name={iconName} size={24} color={iconColor} />
                  <Text style={[styles.badgeText, { color: iconColor }]}>{badge}</Text>
                </View>
              );
            })}        <View style={styles.section}>
          <Text style={styles.sectionTitle}>States Visited</Text>
          <View style={styles.statesContainer}>
            {userData.statesVisited.map((state, index) => (
              <View key={index} style={styles.stateTag}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#27ae60" />
                <Text style={styles.stateText}>{state}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Friends</Text>
          <View style={styles.friendsContainer}>            {userData.friends.map((friend, index) => (
              <View key={index} style={styles.friendItem}>
                <Image 
                  source={{ uri: `https://api.a0.dev/assets/image?text=profile%20picture%20portrait%20person%20${friend.name}&seed=${index}` }}
                  style={styles.friendAvatar}
                />
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <View style={[
                    styles.friendBadge,
                    { backgroundColor: friend.type === 'Pro' ? '#27ae60' : '#3498db' }
                  ]}>
                    <MaterialCommunityIcons 
                      name={friend.type === 'Pro' ? 'shield-check' : 'compass'} 
                      size={12} 
                      color="white" 
                    />
                    <Text style={styles.friendBadgeText}>{friend.type}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={isEditing}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                value={editData.name}
                onChangeText={(text) => setEditData({ ...editData, name: text })}
              />
            </View>            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={editData.email}
                onChangeText={(text) => setEditData({ ...editData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>States Visited</Text>
              <TouchableOpacity
                style={styles.statesDropdown}
                onPress={() => setShowStatesModal(true)}
              >
                <Text style={styles.statesDropdownText}>
                  {editData.statesVisited?.length 
                    ? `${editData.statesVisited.length} states selected` 
                    : 'Select states...'}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={() => {
                  setUserData(editData);
                  setIsEditing(false);
                }}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>      </Modal>

      {/* States Selection Modal */}
      <Modal
        visible={showStatesModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select States</Text>
              <TouchableOpacity onPress={() => setShowStatesModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.statesList}>
              {US_STATES.map((state) => (
                <TouchableOpacity
                  key={state}
                  style={styles.stateOption}
                  onPress={() => {
                    const currentStates = editData.statesVisited || [];
                    const newStates = currentStates.includes(state)
                      ? currentStates.filter(s => s !== state)
                      : [...currentStates, state];
                    setEditData({ ...editData, statesVisited: newStates });
                  }}
                >
                  <Text style={styles.stateOptionText}>{state}</Text>
                  {(editData.statesVisited || []).includes(state) && (
                    <MaterialCommunityIcons name="check" size={24} color="#27ae60" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity 
              style={styles.doneButton}
              onPress={() => setShowStatesModal(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Sightings</Text>          {userData.recentSightings.map((sighting) => (            <TouchableOpacity 
              key={sighting.id} 
              style={styles.sightingItem}
              onPress={() => navigation.navigate('Sightings', { selectedSightingId: sighting.id })}
            >
              <MaterialCommunityIcons name="paw" size={24} color="#27ae60" />
              <View style={styles.sightingInfo}>
                <Text style={styles.sightingAnimal}>{sighting.animal}</Text>
                <Text style={styles.sightingDetails}>
                  {sighting.location} • {sighting.date}
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#bdc3c7" />
            </TouchableOpacity>
          ))}
        </View>        <View style={styles.section}>
          <Text style={styles.sectionTitle}>States Visited</Text>
          <View style={styles.statesContainer}>
            {userData.statesVisited.map((state, index) => (
              <View key={index} style={styles.stateTag}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#27ae60" />
                <Text style={styles.stateText}>{state}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Friends</Text>
          <View style={styles.friendsContainer}>            {userData.friends.map((friend, index) => (
              <View key={index} style={styles.friendItem}>
                <Image 
                  source={{ uri: `https://api.a0.dev/assets/image?text=profile%20picture%20portrait%20person%20${friend.name}&seed=${index}` }}
                  style={styles.friendAvatar}
                />
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <View style={[
                    styles.friendBadge,
                    { backgroundColor: friend.type === 'Pro' ? '#27ae60' : '#3498db' }
                  ]}>
                    <MaterialCommunityIcons 
                      name={friend.type === 'Pro' ? 'shield-check' : 'compass'} 
                      size={12} 
                      color="white" 
                    />
                    <Text style={styles.friendBadgeText}>{friend.type}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={isEditing}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                value={editData.name}
                onChangeText={(text) => setEditData({ ...editData, name: text })}
              />
            </View>            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={editData.email}
                onChangeText={(text) => setEditData({ ...editData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>States Visited</Text>
              <TouchableOpacity
                style={styles.statesDropdown}
                onPress={() => setShowStatesModal(true)}
              >
                <Text style={styles.statesDropdownText}>
                  {editData.statesVisited?.length 
                    ? `${editData.statesVisited.length} states selected` 
                    : 'Select states...'}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={() => {
                  setUserData(editData);
                  setIsEditing(false);
                }}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>      </Modal>

      {/* States Selection Modal */}
      <Modal
        visible={showStatesModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select States</Text>
              <TouchableOpacity onPress={() => setShowStatesModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.statesList}>
              {US_STATES.map((state) => (
                <TouchableOpacity
                  key={state}
                  style={styles.stateOption}
                  onPress={() => {
                    const currentStates = editData.statesVisited || [];
                    const newStates = currentStates.includes(state)
                      ? currentStates.filter(s => s !== state)
                      : [...currentStates, state];
                    setEditData({ ...editData, statesVisited: newStates });
                  }}
                >
                  <Text style={styles.stateOptionText}>{state}</Text>
                  {(editData.statesVisited || []).includes(state) && (
                    <MaterialCommunityIcons name="check" size={24} color="#27ae60" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity 
              style={styles.doneButton}
              onPress={() => setShowStatesModal(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  statesDropdown: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statesDropdownText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  statesList: {
    maxHeight: 400,
  },
  stateOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  stateOptionText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  doneButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f6ef',
    padding: 8,
    borderRadius: 15,
    marginTop: 10,
  },
  type: {
    marginLeft: 5,
    color: '#27ae60',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    color: '#7f8c8d',
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
    backgroundColor: '#fff9e6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 4,
  },
  badgeText: {
    marginLeft: 3,
    color: '#f39c12',
    fontWeight: '500',
    fontSize: 12,
  },
  sightingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 10,
  },
  sightingInfo: {
    flex: 1,
    marginLeft: 15,
  },
  sightingAnimal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  sightingDetails: {
    color: '#7f8c8d',
    marginTop: 3,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  editButtonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '600',
  },
  statesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  stateTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f6ef',
    padding: 8,
    borderRadius: 15,
    margin: 5,
  },
  stateText: {
    marginLeft: 5,
    color: '#27ae60',
    fontWeight: '500',
  },
  friendsContainer: {
    padding: 10,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 8,
  },  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },  friendInfo: {
    flex: 1,
    marginLeft: 10,
  },
  friendName: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 4,
  },
  friendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  friendBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
  },
  saveButton: {
    backgroundColor: '#27ae60',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});