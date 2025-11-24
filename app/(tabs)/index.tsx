import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface Donation {
  id: number;
  ngo: string;
  items: string;
  time: string;
  status: string;
  gradient: string[];
}

interface NGO {
  id: number;
  name: string;
  distance: string;
  capacity: string;
  rating: number;
  gradient: string[];
}

export default function HomeScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const recentDonations: Donation[] = [
    {
      id: 1,
      ngo: "Hope Foundation",
      items: "15 meals",
      time: "2 hours ago",
      status: "Picked up",
      gradient: ["#a855f7", "#ec4899"],
    },
    {
      id: 2,
      ngo: "Care Center",
      items: "8 meals",
      time: "1 day ago",
      status: "Delivered",
      gradient: ["#ec4899", "#f472b6"],
    },
    {
      id: 3,
      ngo: "Seva Trust",
      items: "12 meals",
      time: "2 days ago",
      status: "Completed",
      gradient: ["#d946ef", "#f0abfc"],
    },
  ];

  const nearbyNGOs: NGO[] = [
    {
      id: 1,
      name: "Hope Foundation",
      distance: "0.8 km",
      capacity: "High",
      rating: 4.8,
      gradient: ["#a855f7", "#d946ef"],
    },
    {
      id: 2,
      name: "Seva Trust",
      distance: "1.2 km",
      capacity: "Medium",
      rating: 4.6,
      gradient: ["#ec4899", "#f472b6"],
    },
    {
      id: 3,
      name: "Care Center",
      distance: "2.1 km",
      capacity: "High",
      rating: 4.9,
      gradient: ["#d946ef", "#f0abfc"],
    },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    background: isDarkMode ? "#1a0b2e" : "#faf5ff",
    cardBackground: isDarkMode ? "#2d1b4e" : "#ffffff",
    textPrimary: isDarkMode ? "#f9fafb" : "#7e22ce",
    textSecondary: isDarkMode ? "#d8b4fe" : "#a855f7",
    borderColor: isDarkMode ? "#4c1d95" : "#e9d5ff",
    statBg: isDarkMode ? "#3d2463" : "#fae8ff",
  };

  return (
    <View
      style={[styles.mainBackground, { backgroundColor: theme.background }]}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section with Background Image */}
          <ImageBackground
            source={require("../../assets/images/dish2.jpeg")}
            style={styles.header}
            imageStyle={styles.headerImage}
          >
            <View style={styles.overlay} />

            <View style={styles.headerContent}>
              <View style={styles.headerTop}>
                <View>
                  <Text style={styles.headerTitle}>LeftoverChef</Text>
                  <Text style={styles.headerSubtitle}>
                    Share food, spread kindness
                  </Text>
                </View>
                <View style={styles.headerIcons}>
                  {/* Dark Mode Toggle */}
                  <View style={styles.darkModeToggle}>
                    <Ionicons
                      name={isDarkMode ? "moon" : "sunny"}
                      size={16}
                      color="#fff"
                    />
                    <Switch
                      value={isDarkMode}
                      onValueChange={toggleDarkMode}
                      trackColor={{ false: "#d8b4fe", true: "#7e22ce" }}
                      thumbColor={isDarkMode ? "#ec4899" : "#fde047"}
                      style={styles.switch}
                    />
                  </View>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons
                      name="notifications-outline"
                      size={20}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="person-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Quick Stats */}
              <View style={styles.statsContainer}>
                <LinearGradient
                  colors={["#a855f7", "#d946ef"]}
                  style={styles.statCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.statIconContainer}>
                    <MaterialCommunityIcons
                      name="package-variant"
                      size={22}
                      color="#fff"
                    />
                  </View>
                  <Text style={styles.statValue}>24</Text>
                  <Text style={styles.statSubtext}>Donations</Text>
                </LinearGradient>

                <LinearGradient
                  colors={["#ec4899", "#f472b6"]}
                  style={styles.statCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.statIconContainer}>
                    <Ionicons name="fast-food-outline" size={22} color="#fff" />
                  </View>
                  <Text style={styles.statValue}>186</Text>
                  <Text style={styles.statSubtext}>Meals served</Text>
                </LinearGradient>

                <LinearGradient
                  colors={["#d946ef", "#f0abfc"]}
                  style={styles.statCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.statIconContainer}>
                    <Ionicons name="star" size={22} color="#fff" />
                  </View>
                  <Text style={styles.statValue}>450</Text>
                  <Text style={styles.statSubtext}>Points</Text>
                </LinearGradient>
              </View>
            </View>

            {/* Decorative circles */}
            <View style={styles.decorativeCircle1} />
            <View style={styles.decorativeCircle2} />
          </ImageBackground>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Donate Button */}
            <TouchableOpacity style={styles.donateButtonWrapper}>
              <LinearGradient
                colors={["#a855f7", "#ec4899"]}
                style={styles.donateButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.donateIconContainer}>
                  <Ionicons name="add-circle" size={28} color="#fff" />
                </View>
                <Text style={styles.donateButtonText}>
                  Create Food Donation
                </Text>
                <Ionicons name="arrow-forward-circle" size={24} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

            {/* Recent Activity */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleRow}>
                  <Ionicons name="time" size={20} color={theme.textSecondary} />
                  <Text
                    style={[styles.sectionTitle, { color: theme.textPrimary }]}
                  >
                    Recent Activity
                  </Text>
                </View>
                <TouchableOpacity style={styles.viewAllButton}>
                  <Text style={styles.viewAllText}>View all</Text>
                  <Ionicons name="chevron-forward" size={16} color="#ec4899" />
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.activityContainer}
              >
                {recentDonations.map((donation) => (
                  <TouchableOpacity
                    key={donation.id}
                    style={[
                      styles.activityCircle,
                      {
                        backgroundColor: theme.cardBackground,
                        borderColor: theme.borderColor,
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={donation.gradient}
                      style={styles.activityGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <View style={styles.activityIcon}>
                        <Ionicons name="restaurant" size={32} color="#fff" />
                      </View>
                    </LinearGradient>
                    <View style={styles.activityInfo}>
                      <Text
                        style={[styles.circleNGO, { color: theme.textPrimary }]}
                      >
                        {donation.ngo}
                      </Text>
                      <View style={styles.circleItemsRow}>
                        <Ionicons
                          name="cube"
                          size={14}
                          color={theme.textSecondary}
                        />
                        <Text
                          style={[
                            styles.circleItems,
                            { color: theme.textSecondary },
                          ]}
                        >
                          {donation.items}
                        </Text>
                      </View>
                      <View style={styles.circleStatusBadge}>
                        <LinearGradient
                          colors={["#86efac", "#22c55e"]}
                          style={StyleSheet.absoluteFill}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                        />
                        <Ionicons
                          name="checkmark-circle"
                          size={12}
                          color="#fff"
                        />
                        <Text style={styles.circleStatusText}>
                          {donation.status}
                        </Text>
                      </View>
                      <View style={styles.circleTime}>
                        <Ionicons
                          name="time-outline"
                          size={12}
                          color={theme.textSecondary}
                        />
                        <Text
                          style={[
                            styles.circleTimeText,
                            { color: theme.textSecondary },
                          ]}
                        >
                          {donation.time}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Nearby NGOs */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleRow}>
                  <Ionicons
                    name="location"
                    size={20}
                    color={theme.textSecondary}
                  />
                  <Text
                    style={[styles.sectionTitle, { color: theme.textPrimary }]}
                  >
                    Nearby NGOs
                  </Text>
                </View>
                <TouchableOpacity style={styles.locationButton}>
                  <Ionicons name="navigate" size={16} color="#ec4899" />
                  <Text style={styles.locationText}>Change</Text>
                </TouchableOpacity>
              </View>

              {nearbyNGOs.map((ngo) => (
                <TouchableOpacity
                  key={ngo.id}
                  style={[
                    styles.ngoCard,
                    {
                      backgroundColor: theme.cardBackground,
                      borderColor: theme.borderColor,
                    },
                  ]}
                >
                  <LinearGradient
                    colors={ngo.gradient}
                    style={styles.ngoIconContainer}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="home" size={32} color="#fff" />
                    <View style={styles.ratingBadge}>
                      <Ionicons name="star" size={10} color="#fbbf24" />
                      <Text style={styles.ratingBadgeText}>{ngo.rating}</Text>
                    </View>
                  </LinearGradient>

                  <View style={styles.ngoContent}>
                    <View style={styles.ngoInfo}>
                      <Text
                        style={[styles.ngoName, { color: theme.textPrimary }]}
                      >
                        {ngo.name}
                      </Text>
                      <View style={styles.ngoDetails}>
                        <View style={styles.ngoDetailItem}>
                          <Ionicons name="location" size={14} color="#a855f7" />
                          <Text
                            style={[
                              styles.ngoDetailText,
                              { color: theme.textSecondary },
                            ]}
                          >
                            {ngo.distance}
                          </Text>
                        </View>
                        <View style={styles.ngoDetailItem}>
                          <Ionicons
                            name="trending-up"
                            size={14}
                            color={
                              ngo.capacity === "High" ? "#22c55e" : "#f59e0b"
                            }
                          />
                          <Text
                            style={[
                              styles.ngoDetailText,
                              { color: theme.textSecondary },
                            ]}
                          >
                            {ngo.capacity} capacity
                          </Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.viewButton}>
                      <LinearGradient
                        colors={ngo.gradient}
                        style={styles.viewButtonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      >
                        <Text style={styles.viewButtonText}>View</Text>
                        <Ionicons name="arrow-forward" size={14} color="#fff" />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Impact Banner */}
            <LinearGradient
              colors={["#a855f7", "#ec4899"]}
              style={styles.impactBanner}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.impactContent}>
                <View style={styles.impactIconContainer}>
                  <Ionicons name="heart" size={32} color="#fff" />
                </View>
                <View style={styles.impactText}>
                  <Text style={styles.impactTitle}>
                    <Ionicons name="sparkles" size={18} color="#fde047" /> Make
                    a bigger impact!
                  </Text>
                  <Text style={styles.impactSubtitle}>
                    Invite friends and earn bonus rewards
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.shareButton}>
                <Ionicons name="share-social" size={18} color="#a855f7" />
                <Text style={styles.shareButtonText}>Share app</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    overflow: "hidden",
    position: "relative",
  },
  headerImage: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(126, 34, 206, 0.75)",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerContent: {
    position: "relative",
    zIndex: 1,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#fff",
    opacity: 0.95,
    fontWeight: "600",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  darkModeToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  iconButton: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    padding: 10,
    borderRadius: 20,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
  },
  statSubtext: {
    fontSize: 11,
    color: "#fff",
    opacity: 0.95,
    fontWeight: "600",
  },
  decorativeCircle1: {
    position: "absolute",
    top: -60,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: -50,
    left: -50,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  donateButtonWrapper: {
    marginBottom: 28,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  donateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  donateIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  donateButtonText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ec4899",
  },
  activityContainer: {
    gap: 16,
    paddingRight: 24,
  },
  activityCircle: {
    width: 160,
    borderRadius: 24,
    borderWidth: 2,
    overflow: "hidden",
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  activityGradient: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  activityInfo: {
    padding: 14,
  },
  circleNGO: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },
  circleItemsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  circleItems: {
    fontSize: 13,
    fontWeight: "600",
  },
  circleStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 8,
    gap: 4,
    overflow: "hidden",
  },
  circleStatusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
  },
  circleTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  circleTimeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fce7f3",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  locationText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ec4899",
  },
  ngoCard: {
    flexDirection: "row",
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 2,
    overflow: "hidden",
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  ngoIconContainer: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  ratingBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#7e22ce",
  },
  ngoContent: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  ngoInfo: {
    flex: 1,
  },
  ngoName: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
  },
  ngoDetails: {
    gap: 8,
  },
  ngoDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ngoDetailText: {
    fontSize: 13,
    fontWeight: "600",
  },
  viewButton: {
    alignSelf: "flex-start",
    marginTop: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  viewButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  viewButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#fff",
  },
  impactBanner: {
    borderRadius: 24,
    padding: 24,
    marginTop: 8,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  impactContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  impactIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  impactText: {
    flex: 1,
  },
  impactTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  impactSubtitle: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.95,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  shareButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#a855f7",
  },
});
