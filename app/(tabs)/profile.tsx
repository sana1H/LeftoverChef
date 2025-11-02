import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  // Mock user data - replace with actual user data from your context/state
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinedDate: "January 2024",
    recipesCreated: 24,
    recipesSaved: 156,
    wasteReduced: "45 kg",
  };

  const menuItems = [
    { id: 1, icon: "person-outline", title: "Edit Profile", color: "#A855F7" },
    {
      id: 2,
      icon: "bookmark-outline",
      title: "Saved Recipes",
      color: "#EC4899",
    },
    {
      id: 3,
      icon: "restaurant-outline",
      title: "My Recipes",
      color: "#A855F7",
    },
    {
      id: 4,
      icon: "stats-chart-outline",
      title: "My Statistics",
      color: "#EC4899",
    },
    {
      id: 5,
      icon: "notifications-outline",
      title: "Notifications",
      color: "#A855F7",
    },
    { id: 6, icon: "settings-outline", title: "Settings", color: "#EC4899" },
    {
      id: 7,
      icon: "help-circle-outline",
      title: "Help & Support",
      color: "#A855F7",
    },
    {
      id: 8,
      icon: "shield-checkmark-outline",
      title: "Privacy Policy",
      color: "#EC4899",
    },
  ];

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
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
          </View>
          <TouchableOpacity style={styles.editAvatarButton}>
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
      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
        <Ionicons name="log-out-outline" size={24} color="#EF4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacing} />
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
});

export default Profile;
