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
  image: any;
}

interface NGO {
  id: number;
  name: string;
  distance: string;
  capacity: string;
  rating: number;
  image: any;
  gradientColors: string[];
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
      image: require("../../assets/images/dish6.jpeg"),
    },
    {
      id: 2,
      ngo: "Care Center",
      items: "8 meals",
      time: "1 day ago",
      status: "Delivered",
      image: require("../../assets/images/dish7.jpeg"),
    },
  ];

  const nearbyNGOs: NGO[] = [
    {
      id: 1,
      name: "Hope Foundation",
      distance: "0.8 km",
      capacity: "High",
      rating: 4.8,
      image: require("../../assets/images/dish6.jpeg"),
      gradientColors: ["#93c5fd", "#60a5fa"], // Light blue
    },
    {
      id: 2,
      name: "Seva Trust",
      distance: "1.2 km",
      capacity: "Medium",
      rating: 4.6,
      image: require("../../assets/images/dish8.jpg"),
      gradientColors: ["#fcd34d", "#fbbf24"], // Light yellow
    },
    {
      id: 3,
      name: "Care Center",
      distance: "2.1 km",
      capacity: "High",
      rating: 4.9,
      image: require("../../assets/images/dish9.jpg"),
      gradientColors: ["#86efac", "#4ade80"], // Light green
    },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    background: isDarkMode ? "#000000" : "#ffffff",
    cardBackground: isDarkMode ? "#1a1a1a" : "#ffffff",
    textPrimary: isDarkMode ? "#f9fafb" : "#1f2937",
    textSecondary: isDarkMode ? "#d1d5db" : "#6b7280",
    borderColor: isDarkMode ? "#333333" : "#f3f4f6",
    sectionTitle: isDarkMode ? "#f9fafb" : "#1f2937",
  };

  return (
    <View
      style={[
        styles.mainBackground,
        { backgroundColor: isDarkMode ? "#000000" : "transparent" },
      ]}
    >
      {!isDarkMode && (
        <ImageBackground
          source={require("../../assets/images/dish5.jpg")}
          style={StyleSheet.absoluteFill}
          imageStyle={{ opacity: 0.3 }}
        />
      )}
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
            {/* Dark overlay for better text visibility */}
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
                      trackColor={{ false: "#d1d5db", true: "#4b5563" }}
                      thumbColor={isDarkMode ? "#f59e0b" : "#fbbf24"}
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
                <View style={styles.statCard}>
                  <View style={styles.statHeader}>
                    <MaterialCommunityIcons
                      name="package-variant"
                      size={18}
                      color="#fff"
                    />
                    <Text style={styles.statLabel}>Total</Text>
                  </View>
                  <Text style={styles.statValue}>24</Text>
                  <Text style={styles.statSubtext}>Donations</Text>
                </View>

                <View style={styles.statCard}>
                  <View style={styles.statHeader}>
                    <Ionicons name="heart-outline" size={18} color="#fff" />
                    <Text style={styles.statLabel}>Impact</Text>
                  </View>
                  <Text style={styles.statValue}>186</Text>
                  <Text style={styles.statSubtext}>Meals served</Text>
                </View>

                <View style={styles.statCard}>
                  <View style={styles.statHeader}>
                    <Ionicons name="trophy-outline" size={18} color="#fff" />
                    <Text style={styles.statLabel}>Points</Text>
                  </View>
                  <Text style={styles.statValue}>450</Text>
                  <Text style={styles.statSubtext}>Rewards</Text>
                </View>
              </View>
            </View>
          </ImageBackground>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Donate Button */}
            <TouchableOpacity>
              <LinearGradient
                colors={["#16a34a", "#22c55e"]}
                style={styles.donateButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.donateIconContainer}>
                  <Ionicons name="add" size={24} color="#16a34a" />
                </View>
                <Text style={styles.donateButtonText}>
                  Create Food Donation
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Recent Activity */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text
                  style={[styles.sectionTitle, { color: theme.sectionTitle }]}
                >
                  Recent Activity
                </Text>
                <TouchableOpacity style={styles.viewAllButton}>
                  <Text style={styles.viewAllText}>View all</Text>
                  <Ionicons name="chevron-forward" size={16} color="#16a34a" />
                </TouchableOpacity>
              </View>

              <View style={styles.activityContainer}>
                {recentDonations.map((donation) => (
                  <TouchableOpacity
                    key={donation.id}
                    style={styles.activityCircle}
                  >
                    <ImageBackground
                      source={donation.image}
                      style={styles.circleBackground}
                      imageStyle={styles.circleImage}
                    >
                      <View style={styles.circleOverlay} />
                      <View style={styles.circleContent}>
                        <Text style={styles.circleNGO}>{donation.ngo}</Text>
                        <Text style={styles.circleItems}>{donation.items}</Text>
                        <View style={styles.circleStatusBadge}>
                          <Text style={styles.circleStatusText}>
                            {donation.status}
                          </Text>
                        </View>
                        <View style={styles.circleTime}>
                          <Ionicons
                            name="time-outline"
                            size={10}
                            color="#fff"
                          />
                          <Text style={styles.circleTimeText}>
                            {donation.time}
                          </Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Nearby NGOs */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text
                  style={[styles.sectionTitle, { color: theme.sectionTitle }]}
                >
                  Nearby NGOs
                </Text>
                <TouchableOpacity style={styles.locationButton}>
                  <Ionicons name="location-outline" size={16} color="#16a34a" />
                  <Text style={styles.locationText}>Change location</Text>
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
                  <View style={styles.ngoCardLayout}>
                    {/* NGO Image with Gradient Overlay */}
                    <View style={styles.ngoImageContainer}>
                      <ImageBackground
                        source={ngo.image}
                        style={styles.ngoImage}
                        imageStyle={styles.ngoImageStyle}
                      >
                        <LinearGradient
                          colors={[
                            ...ngo.gradientColors.map((c) => c + "99"),
                            ngo.gradientColors[1] + "BB",
                          ]}
                          style={styles.ngoImageGradient}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                        >
                          <View style={styles.ratingBadge}>
                            <Ionicons name="star" size={12} color="#fbbf24" />
                            <Text style={styles.ratingBadgeText}>
                              {ngo.rating}
                            </Text>
                          </View>
                        </LinearGradient>
                      </ImageBackground>
                    </View>

                    {/* NGO Content */}
                    <View style={styles.ngoContent}>
                      <View style={styles.ngoInfo}>
                        <Text
                          style={[styles.ngoName, { color: theme.textPrimary }]}
                        >
                          {ngo.name}
                        </Text>
                        <View style={styles.ngoDetails}>
                          <View style={styles.ngoDetailItem}>
                            <Ionicons
                              name="location"
                              size={14}
                              color="#16a34a"
                            />
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
                                ngo.capacity === "High" ? "#16a34a" : "#f59e0b"
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
                        <Text style={styles.viewButtonText}>View</Text>
                        <Ionicons name="arrow-forward" size={14} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Impact Banner */}
            <LinearGradient
              colors={["#fb923c", "#ec4899"]}
              style={styles.impactBanner}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.impactContent}>
                <View style={styles.impactIconContainer}>
                  <Ionicons name="heart" size={24} color="#fff" />
                </View>
                <View style={styles.impactText}>
                  <Text style={styles.impactTitle}>Make a bigger impact!</Text>
                  <Text style={styles.impactSubtitle}>
                    Invite friends and earn bonus rewards
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.shareButton}>
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
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  headerImage: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    position: "relative",
    zIndex: 1,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  darkModeToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  iconButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 8,
    borderRadius: 20,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1f2937",
    textShadowColor: "rgba(255, 255, 255, 0.9)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statSubtext: {
    fontSize: 11,
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  donateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  donateIconContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
    marginRight: 12,
  },
  donateButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(255, 255, 255, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#16a34a",
  },
  activityContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 16,
  },
  activityCircle: {
    width: 160,
    height: 160,
  },
  circleBackground: {
    width: "100%",
    height: "100%",
    borderRadius: 80,
    overflow: "hidden",
  },
  circleImage: {
    borderRadius: 80,
  },
  circleOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 80,
  },
  circleContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    zIndex: 1,
  },
  circleNGO: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 6,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  circleItems: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  circleStatusBadge: {
    backgroundColor: "rgba(220, 252, 231, 0.9)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
  },
  circleStatusText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#15803d",
  },
  circleTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  circleTimeText: {
    fontSize: 10,
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#16a34a",
  },
  ngoCard: {
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  ngoCardLayout: {
    flexDirection: "row",
  },
  ngoImageContainer: {
    width: 120,
    height: 120,
  },
  ngoImage: {
    width: "100%",
    height: "100%",
  },
  ngoImageStyle: {
    resizeMode: "cover",
  },
  ngoImageGradient: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 8,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1f2937",
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
    fontWeight: "500",
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#16a34a",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  viewButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },
  impactBanner: {
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  impactContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  impactIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 24,
  },
  impactText: {
    flex: 1,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  impactSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  shareButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ec4899",
  },
});
