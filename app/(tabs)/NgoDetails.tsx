import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";

interface NGO {
  id: number;
  name: string;
  distance: string;
  capacity: string;
  rating: number;
  gradient: string[];
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  services: string[];
  hours: string;
}

const ngoDatabase = {
  1: {
    name: "Hope Foundation",
    description:
      "Hope Foundation is dedicated to reducing food waste and fighting hunger by connecting surplus food with people in need. We serve over 5000 meals daily across the city.",
    address: "123 Charity Street, Mumbai, Maharashtra 400001",
    phone: "+91 98765 43210",
    email: "contact@hopefoundation.org",
    website: "www.hopefoundation.org",
    services: [
      "Food Distribution",
      "Community Kitchen",
      "Emergency Relief",
      "Nutrition Programs",
      "Food Rescue",
    ],
    hours: "Mon-Sun: 8:00 AM - 8:00 PM",
    gradient: ["#a855f7", "#d946ef"],
  },
  2: {
    name: "Seva Trust",
    description:
      "Seva Trust focuses on sustainable food solutions and community development by supporting farmers and preventing food wastage.",
    address: "456 Service Road, Delhi 110001",
    phone: "+91 98765 43211",
    email: "info@sevatrust.org",
    website: "www.sevatrust.org",
    services: [
      "Food Recovery",
      "Community Meals",
      "Skill Development",
      "Agricultural Support",
      "Education Programs",
    ],
    hours: "Mon-Sat: 9:00 AM - 7:00 PM",
    gradient: ["#ec4899", "#f472b6"],
  },
  3: {
    name: "Care Center",
    description:
      "Care Center provides support to homeless and low-income families through shelter meals, food banks, and rehabilitation programs.",
    address: "789 Care Avenue, Bangalore, Karnataka 560001",
    phone: "+91 98765 43212",
    email: "care@carecenter.org",
    website: "www.carecenter.org",
    services: [
      "Shelter Meals",
      "Food Banks",
      "Rehabilitation",
      "Medical Support",
      "Counseling",
    ],
    hours: "24/7 Emergency Services",
    gradient: ["#d946ef", "#f0abfc"],
  },
};

export default function NgoDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const ngoId = Number(params.id) || 1;
  const ngoInfo = ngoDatabase[ngoId as keyof typeof ngoDatabase];

  const ngoData: NGO = {
    id: ngoId,
    name: (params.name as string) || ngoInfo.name,
    distance: (params.distance as string) || "1 km",
    capacity: (params.capacity as string) || "High",
    rating: Number(params.rating) || 4.8,
    gradient: ngoInfo.gradient,
    description: ngoInfo.description,
    address: ngoInfo.address,
    phone: ngoInfo.phone,
    email: ngoInfo.email,
    website: ngoInfo.website,
    services: ngoInfo.services,
    hours: ngoInfo.hours,
  };

  const handleCall = () => Linking.openURL(`tel:${ngoData.phone}`);
  const handleEmail = () => Linking.openURL(`mailto:${ngoData.email}`);

  const handleWebsite = () => {
    const url = ngoData.website.startsWith("http")
      ? ngoData.website
      : `https://${ngoData.website}`;
    Linking.openURL(url);
  };

  const handleDirections = () => {
    const address = encodeURIComponent(ngoData.address);
    Linking.openURL(`https://maps.google.com/?q=${address}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={ngoData.gradient}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>{ngoData.name}</Text>

            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#fbbf24" />
              <Text style={styles.ratingText}>{ngoData.rating}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* QUOTE CARD */}
        <View style={styles.quoteWrapper}>
          <LinearGradient
            colors={ngoData.gradient}
            style={styles.quoteCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="heart" size={32} color="#fff" />
            <Text style={styles.quoteText}>
              “Serving humanity with dignity and compassion.”
            </Text>
            <Text style={styles.quoteSubText}>— {ngoData.name}</Text>
          </LinearGradient>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* About Section */}
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{ngoData.description}</Text>
          </View>

          {/* Details */}
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Details</Text>

            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Ionicons name="location" size={20} color="#a855f7" />
                <View>
                  <Text style={styles.detailLabel}>Distance</Text>
                  <Text style={styles.detailValue}>{ngoData.distance}</Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <Ionicons name="trending-up" size={20} color="#22c55e" />
                <View>
                  <Text style={styles.detailLabel}>Capacity</Text>
                  <Text style={styles.detailValue}>{ngoData.capacity}</Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <Ionicons name="time" size={20} color="#eab308" />
                <View>
                  <Text style={styles.detailLabel}>Hours</Text>
                  <Text style={styles.detailValue}>{ngoData.hours}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Services */}
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Services</Text>

            <View style={styles.servicesContainer}>
              {ngoData.services.map((service, i) => (
                <View key={i} style={styles.serviceTag}>
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Contact */}
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Contact Information</Text>

            <TouchableOpacity
              style={styles.contactItem}
              onPress={handleDirections}
            >
              <Ionicons name="location-outline" size={24} color="#a855f7" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Address</Text>
                <Text style={styles.contactValue}>{ngoData.address}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
              <Ionicons name="call-outline" size={24} color="#ec4899" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{ngoData.phone}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
              <Ionicons name="mail-outline" size={24} color="#f59e0b" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{ngoData.email}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactItem}
              onPress={handleWebsite}
            >
              <Ionicons name="globe-outline" size={24} color="#22c55e" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Website</Text>
                <Text style={styles.contactValue}>{ngoData.website}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </TouchableOpacity>
          </View>

          {/* Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleDirections}
            >
              <Ionicons name="navigate" size={20} color="#a855f7" />
              <Text style={styles.secondaryButtonText}>Get Directions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={handleCall}>
              <LinearGradient
                colors={ngoData.gradient}
                style={styles.primaryGradient}
              >
                <Ionicons name="call" size={20} color="#fff" />
                <Text style={styles.primaryButtonText}>Call Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  header: {
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: { padding: 8 },

  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },

  ratingContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: "center",
    gap: 4,
  },

  ratingText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  // QUOTE SECTION
  quoteWrapper: {
    marginTop: 24,
    paddingHorizontal: 24,
  },

  quoteCard: {
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },

  quoteText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 4,
  },

  quoteSubText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    textAlign: "center",
  },

  content: { padding: 24 },

  infoCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
  },

  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },

  description: { color: "#6b7280", fontSize: 14, lineHeight: 20 },

  detailsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  detailItem: { flexDirection: "row", alignItems: "center", gap: 8 },

  detailLabel: { fontSize: 12, color: "#9ca3af" },

  detailValue: { fontSize: 14, fontWeight: "600" },

  servicesContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },

  serviceTag: {
    backgroundColor: "#fae8ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderColor: "#e9d5ff",
    borderWidth: 1,
  },

  serviceText: { color: "#a855f7", fontWeight: "600", fontSize: 12 },

  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },

  contactInfo: { flex: 1, marginLeft: 12 },

  contactLabel: { fontSize: 12, color: "#9ca3af" },

  contactValue: { fontSize: 14, fontWeight: "500", color: "#1f2937" },

  actionButtons: { flexDirection: "row", gap: 12, marginTop: 8 },

  secondaryButton: {
    flex: 1,
    padding: 16,
    backgroundColor: "#faf5ff",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e9d5ff",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  secondaryButtonText: { color: "#a855f7", fontWeight: "700", fontSize: 16 },

  primaryButton: { flex: 1, borderRadius: 16, overflow: "hidden" },

  primaryGradient: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  primaryButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
