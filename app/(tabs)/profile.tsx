import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    joinedDate: "January 2024",
    recipesCreated: 24,
    recipesSaved: 156,
    wasteReduced: "45 kg",
    profileImage: null as string | null,
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
  });
  const [notificationSettings, setNotificationSettings] = useState({
    push: true,
    email: true,
    sms: false,
  });

  const menuItems = [
    { id: 1, icon: "person-outline", title: "Edit Profile", color: "#A855F7" },
    {
      id: 4,
      icon: "notifications-outline",
      title: "Notifications",
      color: "#EC4899",
    },
    {
      id: 6,
      icon: "help-circle-outline",
      title: "Help & Support",
      color: "#A855F7",
    },
    {
      id: 7,
      icon: "shield-checkmark-outline",
      title: "Privacy Policy",
      color: "#EC4899",
    },
  ];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setUser((prev) => ({ ...prev, profileImage: result.assets[0].uri }));
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Sorry, we need camera permissions to make this work!"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setUser((prev) => ({ ...prev, profileImage: result.assets[0].uri }));
    }
  };

  const handleImageChange = () => {
    Alert.alert("Change Profile Picture", "Choose an option", [
      {
        text: "Take Photo",
        onPress: takePhoto,
      },
      {
        text: "Choose from Gallery",
        onPress: pickImage,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const handleSaveProfile = () => {
    setUser((prev) => ({ ...prev, ...editForm }));
    setShowEditModal(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // Handle logout logic here
          router.replace("/auth/sign-in");
        },
      },
    ]);
  };

  const renderEditModal = () => (
    <Modal
      visible={showEditModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={() => setShowEditModal(false)}>
            <Ionicons name="close" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {/* Profile Picture Edit */}
          <View style={styles.editAvatarSection}>
            <TouchableOpacity onPress={handleImageChange}>
              <View style={styles.editAvatarContainer}>
                {user.profileImage ? (
                  <Image
                    source={{ uri: user.profileImage }}
                    style={styles.editAvatar}
                  />
                ) : (
                  <View style={styles.editAvatarPlaceholder}>
                    <Text style={styles.avatarPlaceholderText}>
                      {user.name.charAt(0)}
                    </Text>
                  </View>
                )}
                <View style={styles.editAvatarButton}>
                  <Ionicons name="camera" size={16} color="#fff" />
                </View>
              </View>
            </TouchableOpacity>
            <Text style={styles.editAvatarText}>Tap to change photo</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Full Name</Text>
            <TextInput
              style={styles.formInput}
              value={editForm.name}
              onChangeText={(text) =>
                setEditForm((prev) => ({ ...prev, name: text }))
              }
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Email Address</Text>
            <TextInput
              style={styles.formInput}
              value={editForm.email}
              onChangeText={(text) =>
                setEditForm((prev) => ({ ...prev, email: text }))
              }
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveProfile}
          >
            <LinearGradient
              colors={["#A855F7", "#EC4899"]}
              style={styles.saveButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );

  const renderNotificationsModal = () => (
    <Modal
      visible={showNotificationsModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Notification Settings</Text>
          <TouchableOpacity onPress={() => setShowNotificationsModal(false)}>
            <Ionicons name="close" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <Ionicons name="notifications" size={24} color="#A855F7" />
              <View>
                <Text style={styles.notificationTitle}>Push Notifications</Text>
                <Text style={styles.notificationDescription}>
                  Receive app notifications
                </Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.push}
              onValueChange={(value) =>
                setNotificationSettings((prev) => ({ ...prev, push: value }))
              }
              trackColor={{ false: "#e5e7eb", true: "#A855F7" }}
              thumbColor={notificationSettings.push ? "#EC4899" : "#f4f4f5"}
            />
          </View>

          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <Ionicons name="mail" size={24} color="#EC4899" />
              <View>
                <Text style={styles.notificationTitle}>
                  Email Notifications
                </Text>
                <Text style={styles.notificationDescription}>
                  Receive email updates
                </Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.email}
              onValueChange={(value) =>
                setNotificationSettings((prev) => ({ ...prev, email: value }))
              }
              trackColor={{ false: "#e5e7eb", true: "#EC4899" }}
              thumbColor={notificationSettings.email ? "#A855F7" : "#f4f4f5"}
            />
          </View>

          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <Ionicons name="chatbubble" size={24} color="#A855F7" />
              <View>
                <Text style={styles.notificationTitle}>SMS Notifications</Text>
                <Text style={styles.notificationDescription}>
                  Receive text messages
                </Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.sms}
              onValueChange={(value) =>
                setNotificationSettings((prev) => ({ ...prev, sms: value }))
              }
              trackColor={{ false: "#e5e7eb", true: "#A855F7" }}
              thumbColor={notificationSettings.sms ? "#EC4899" : "#f4f4f5"}
            />
          </View>

          <View style={styles.notificationTips}>
            <Ionicons name="information-circle" size={20} color="#6b7280" />
            <Text style={styles.notificationTipsText}>
              You can customize notification types in settings
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  const renderPrivacyModal = () => (
    <Modal
      visible={showPrivacyModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Privacy Policy</Text>
          <TouchableOpacity onPress={() => setShowPrivacyModal(false)}>
            <Ionicons name="close" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <Text style={styles.privacyTitle}>LeftoverChef Privacy Policy</Text>

          <View style={styles.privacySection}>
            <Text style={styles.privacySectionTitle}>Data Collection</Text>
            <Text style={styles.privacyText}>
              We collect necessary information to provide our food sharing
              services, including: • Your profile information • Donation history
              • Location data for NGO matching • Food images for AI analysis
            </Text>
          </View>

          <View style={styles.privacySection}>
            <Text style={styles.privacySectionTitle}>Data Usage</Text>
            <Text style={styles.privacyText}>
              Your data is used to: • Connect you with nearby NGOs • Track your
              impact and rewards • Improve our AI food recognition • Provide
              personalized recommendations
            </Text>
          </View>

          <View style={styles.privacySection}>
            <Text style={styles.privacySectionTitle}>Data Protection</Text>
            <Text style={styles.privacyText}>
              We implement industry-standard security measures to protect your
              personal information and ensure it is not misused.
            </Text>
          </View>

          <View style={styles.privacySection}>
            <Text style={styles.privacySectionTitle}>Your Rights</Text>
            <Text style={styles.privacyText}>
              You have the right to access, modify, or delete your personal data
              at any time through the app settings.
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  const renderHelpModal = () => (
    <Modal
      visible={showHelpModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Help & Support</Text>
          <TouchableOpacity onPress={() => setShowHelpModal(false)}>
            <Ionicons name="close" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.helpSection}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpSubtitle}>
              Our AI assistant is here to help you with any questions about
              using LeftoverChef.
            </Text>

            <View style={styles.chatbotPlaceholder}>
              <Ionicons name="chatbubble-ellipses" size={64} color="#A855F7" />
              <Text style={styles.chatbotText}>AI Assistant Coming Soon</Text>
              <Text style={styles.chatbotSubtext}>
                We're working on integrating an intelligent chatbot to help you
                with any questions about food donations, NGOs, and rewards.
              </Text>
            </View>

            <View style={styles.contactOptions}>
              <Text style={styles.contactTitle}>Other Ways to Get Help</Text>

              <TouchableOpacity style={styles.contactOption}>
                <Ionicons name="mail" size={24} color="#EC4899" />
                <View>
                  <Text style={styles.contactOptionTitle}>Email Support</Text>
                  <Text style={styles.contactOptionText}>
                    support@leftoverchef.org
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactOption}>
                <Ionicons name="call" size={24} color="#A855F7" />
                <View>
                  <Text style={styles.contactOptionTitle}>Phone Support</Text>
                  <Text style={styles.contactOptionText}>
                    +1 (555) 123-HELP
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactOption}>
                <Ionicons name="document-text" size={24} color="#EC4899" />
                <View>
                  <Text style={styles.contactOptionTitle}>FAQ</Text>
                  <Text style={styles.contactOptionText}>
                    Frequently Asked Questions
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  const handleMenuItemPress = (item: any) => {
    switch (item.title) {
      case "Edit Profile":
        setShowEditModal(true);
        break;
      case "Notifications":
        setShowNotificationsModal(true);
        break;
      case "Help & Support":
        setShowHelpModal(true);
        break;
      case "Privacy Policy":
        setShowPrivacyModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with gradient effect */}
      <View style={styles.header}>
        <View style={styles.headerGradient}>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Picture and Info */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={handleImageChange}>
            {user.profileImage ? (
              <Image
                source={{ uri: user.profileImage }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editAvatarButton}
            onPress={handleImageChange}
          >
            <Ionicons name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.joinedText}>Member since {user.joinedDate}</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.statCard1]}>
          <Ionicons name="restaurant" size={28} color="#A855F7" />
          <Text style={styles.statNumber}>{user.recipesCreated}</Text>
          <Text style={styles.statLabel}>Recipes Created</Text>
        </View>

        <View style={[styles.statCard, styles.statCard2]}>
          <Ionicons name="bookmark" size={28} color="#EC4899" />
          <Text style={styles.statNumber}>{user.recipesSaved}</Text>
          <Text style={styles.statLabel}>Recipes Saved</Text>
        </View>

        <View style={[styles.statCard, styles.statCard3]}>
          <Ionicons name="leaf" size={28} color="#A855F7" />
          <Text style={styles.statNumber}>{user.wasteReduced}</Text>
          <Text style={styles.statLabel}>Waste Reduced</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuItemPress(item)}
          >
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: item.color + "15" },
              ]}
            >
              <Ionicons name={item.icon as any} size={24} color={item.color} />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.8}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={24} color="#EF4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacing} />

      {/* Modals */}
      {renderEditModal()}
      {renderNotificationsModal()}
      {renderPrivacyModal()}
      {renderHelpModal()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    height: 200,
    backgroundColor: "#A855F7",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  headerGradient: {
    flex: 1,
    backgroundColor: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
    padding: 20,
    paddingTop: 50,
  },
  settingsButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
  profileSection: {
    alignItems: "center",
    marginTop: -60,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#EC4899",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#A855F7",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 4,
  },
  joinedText: {
    fontSize: 14,
    color: "#9CA3AF",
    fontStyle: "italic",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCard1: {
    borderTopWidth: 3,
    borderTopColor: "#A855F7",
  },
  statCard2: {
    borderTopWidth: 3,
    borderTopColor: "#EC4899",
  },
  statCard3: {
    borderTopWidth: 3,
    borderTopColor: "#A855F7",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  menuContainer: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE2E2",
    marginHorizontal: 20,
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 40,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  // Edit Profile Modal
  editAvatarSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  editAvatarContainer: {
    position: "relative",
    marginBottom: 10,
  },
  editAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#e5e7eb",
  },
  editAvatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#EC4899",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#e5e7eb",
  },
  avatarPlaceholderText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
  },
  editAvatarText: {
    fontSize: 14,
    color: "#6b7280",
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  saveButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 20,
  },
  saveButtonGradient: {
    padding: 18,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  // Notifications Modal
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  notificationInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginLeft: 12,
  },
  notificationDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 12,
    marginTop: 2,
  },
  notificationTips: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  notificationTipsText: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 12,
    flex: 1,
  },
  // Privacy Modal
  privacyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 20,
    textAlign: "center",
  },
  privacySection: {
    marginBottom: 24,
  },
  privacySectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#A855F7",
    marginBottom: 8,
  },
  privacyText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  // Help Modal
  helpSection: {
    marginBottom: 20,
  },
  helpTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  helpSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 24,
  },
  chatbotPlaceholder: {
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 40,
    borderRadius: 20,
    marginBottom: 30,
  },
  chatbotText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#A855F7",
    marginTop: 16,
    marginBottom: 8,
  },
  chatbotSubtext: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
  contactOptions: {
    marginTop: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  contactOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    marginBottom: 12,
  },
  contactOptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginLeft: 12,
  },
  contactOptionText: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 12,
    marginTop: 2,
  },
});

export default Profile;
