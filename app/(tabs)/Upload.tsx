import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Upload() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    expiryTime: "",
    description: "",
    pickupAddress: "",
    contactNumber: "",
    selectedNGO: null as any,
  });

  const foodTypes = [
    {
      id: 1,
      name: "Cooked Meals",
      icon: "fast-food",
      gradient: ["#ec4899", "#f472b6"],
    },
    {
      id: 2,
      name: "Raw Food",
      icon: "nutrition",
      gradient: ["#a855f7", "#c084fc"],
    },
    {
      id: 3,
      name: "Packaged Food",
      icon: "cube",
      gradient: ["#d946ef", "#e879f9"],
    },
    {
      id: 4,
      name: "Beverages",
      icon: "cafe",
      gradient: ["#8b5cf6", "#a78bfa"],
    },
  ];

  const expiryOptions = [
    { id: 1, label: "Within 2 hours", value: "2h" },
    { id: 2, label: "Within 4 hours", value: "4h" },
    { id: 3, label: "Within 6 hours", value: "6h" },
    { id: 4, label: "Within 12 hours", value: "12h" },
  ];

  const nearbyNGOs = [
    {
      id: 1,
      name: "Hope Foundation",
      distance: "0.8 km",
      capacity: "High",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Seva Trust",
      distance: "1.2 km",
      capacity: "Medium",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Care Center",
      distance: "2.1 km",
      capacity: "High",
      rating: 4.9,
    },
  ];

  const handleSubmit = () => {
    if (!formData.foodType || !formData.quantity || !formData.selectedNGO) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    Alert.alert(
      "Success",
      "Your donation request has been submitted successfully!",
      [
        {
          text: "OK",
          onPress: () => {
            setStep(1);
            setFormData({
              foodType: "",
              quantity: "",
              expiryTime: "",
              description: "",
              pickupAddress: "",
              contactNumber: "",
              selectedNGO: null,
            });
          },
        },
      ]
    );
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      {/* Food Type Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>
          <Ionicons name="restaurant" size={18} color="#a855f7" /> Type of Food
          *
        </Text>
        <View style={styles.gridContainer}>
          {foodTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.optionCard,
                formData.foodType === type.name && styles.optionCardSelected,
              ]}
              onPress={() => setFormData({ ...formData, foodType: type.name })}
            >
              {formData.foodType === type.name ? (
                <LinearGradient
                  colors={type.gradient}
                  style={styles.optionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name={type.icon as any} size={32} color="#fff" />
                  <Text style={styles.optionTextSelected}>{type.name}</Text>
                  <View style={styles.checkBadge}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  </View>
                </LinearGradient>
              ) : (
                <>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: type.gradient[0] + "20" },
                    ]}
                  >
                    <Ionicons
                      name={type.icon as any}
                      size={32}
                      color={type.gradient[0]}
                    />
                  </View>
                  <Text style={styles.optionText}>{type.name}</Text>
                </>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quantity */}
      <View style={styles.section}>
        <Text style={styles.label}>
          <MaterialCommunityIcons name="counter" size={18} color="#ec4899" />{" "}
          Quantity (meals) *
        </Text>
        <View style={styles.inputContainer}>
          <Ionicons name="calculator-outline" size={20} color="#a855f7" />
          <TextInput
            style={styles.input}
            placeholder="e.g., 10 meals"
            placeholderTextColor="#d8b4fe"
            value={formData.quantity}
            onChangeText={(text) =>
              setFormData({ ...formData, quantity: text })
            }
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Expiry Time */}
      <View style={styles.section}>
        <Text style={styles.label}>
          <Ionicons name="time" size={18} color="#d946ef" /> Best Before
        </Text>
        <View style={styles.gridContainer}>
          {expiryOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.timeOption,
                formData.expiryTime === option.value &&
                  styles.timeOptionSelected,
              ]}
              onPress={() =>
                setFormData({ ...formData, expiryTime: option.value })
              }
            >
              {formData.expiryTime === option.value && (
                <LinearGradient
                  colors={["#ec4899", "#f472b6"]}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              )}
              <Ionicons
                name="alarm-outline"
                size={16}
                color={
                  formData.expiryTime === option.value ? "#fff" : "#a855f7"
                }
              />
              <Text
                style={[
                  styles.timeOptionText,
                  formData.expiryTime === option.value &&
                    styles.timeOptionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.label}>
          <Ionicons name="document-text" size={18} color="#8b5cf6" />{" "}
          Description (Optional)
        </Text>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Describe the food..."
            placeholderTextColor="#d8b4fe"
            value={formData.description}
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
            multiline
            numberOfLines={4}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => setStep(2)}>
        <LinearGradient
          colors={["#a855f7", "#ec4899"]}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Continue</Text>
          <Ionicons name="arrow-forward-circle" size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      {/* Pickup Address */}
      <View style={styles.section}>
        <Text style={styles.label}>
          <Ionicons name="location" size={18} color="#ec4899" /> Pickup Address
          *
        </Text>
        <View style={styles.inputContainer}>
          <Ionicons name="home-outline" size={20} color="#a855f7" />
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            placeholderTextColor="#d8b4fe"
            value={formData.pickupAddress}
            onChangeText={(text) =>
              setFormData({ ...formData, pickupAddress: text })
            }
          />
        </View>
      </View>

      {/* Contact Number */}
      <View style={styles.section}>
        <Text style={styles.label}>
          <Ionicons name="call" size={18} color="#d946ef" /> Contact Number *
        </Text>
        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={20} color="#a855f7" />
          <TextInput
            style={styles.input}
            placeholder="Enter your contact number"
            placeholderTextColor="#d8b4fe"
            value={formData.contactNumber}
            onChangeText={(text) =>
              setFormData({ ...formData, contactNumber: text })
            }
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* NGO Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>
          <Ionicons name="people" size={18} color="#8b5cf6" /> Select NGO *
        </Text>
        {nearbyNGOs.map((ngo, index) => (
          <TouchableOpacity
            key={ngo.id}
            style={[
              styles.ngoCard,
              formData.selectedNGO?.id === ngo.id && styles.ngoCardSelected,
            ]}
            onPress={() => setFormData({ ...formData, selectedNGO: ngo })}
          >
            {formData.selectedNGO?.id === ngo.id && (
              <LinearGradient
                colors={["#a855f7", "#ec4899"]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            )}
            <View style={styles.ngoContent}>
              <View style={styles.ngoHeader}>
                <Text
                  style={[
                    styles.ngoName,
                    formData.selectedNGO?.id === ngo.id && { color: "#fff" },
                  ]}
                >
                  {ngo.name}
                </Text>
                <View
                  style={[
                    styles.ratingBadge,
                    formData.selectedNGO?.id === ngo.id &&
                      styles.ratingBadgeSelected,
                  ]}
                >
                  <Ionicons name="star" size={12} color="#fbbf24" />
                  <Text
                    style={[
                      styles.ratingText,
                      formData.selectedNGO?.id === ngo.id && { color: "#fff" },
                    ]}
                  >
                    {ngo.rating}
                  </Text>
                </View>
              </View>
              <View style={styles.ngoDetails}>
                <View style={styles.ngoDetailItem}>
                  <Ionicons
                    name="location"
                    size={14}
                    color={
                      formData.selectedNGO?.id === ngo.id
                        ? "#fde047"
                        : "#a855f7"
                    }
                  />
                  <Text
                    style={[
                      styles.ngoDetailText,
                      formData.selectedNGO?.id === ngo.id && {
                        color: "#fef3c7",
                      },
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
                      formData.selectedNGO?.id === ngo.id
                        ? "#86efac"
                        : "#ec4899"
                    }
                  />
                  <Text
                    style={[
                      styles.ngoDetailText,
                      formData.selectedNGO?.id === ngo.id && {
                        color: "#dcfce7",
                      },
                    ]}
                  >
                    {ngo.capacity} capacity
                  </Text>
                </View>
              </View>
            </View>
            {formData.selectedNGO?.id === ngo.id && (
              <View style={styles.selectedBadge}>
                <Ionicons name="checkmark-circle" size={28} color="#fde047" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => setStep(1)}>
          <Ionicons name="arrow-back" size={20} color="#a855f7" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, { flex: 1 }]}
          onPress={handleSubmit}
        >
          <LinearGradient
            colors={["#a855f7", "#ec4899"]}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
            <Text style={styles.buttonText}>Submit Donation</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#fae8ff", "#fce7f3", "#fff"]}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={["#a855f7", "#ec4899"]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerIcon}>
              <Ionicons name="heart" size={32} color="#fff" />
            </View>
            <Text style={styles.headerTitle}>Create Donation</Text>
            <Text style={styles.headerSubtitle}>
              Share your surplus food with love
            </Text>
          </View>
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />
        </LinearGradient>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressStep}>
            <LinearGradient
              colors={
                step >= 1 ? ["#a855f7", "#ec4899"] : ["#e9d5ff", "#fbcfe8"]
              }
              style={styles.progressCircle}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {step > 1 ? (
                <Ionicons name="checkmark" size={24} color="#fff" />
              ) : (
                <Text style={styles.progressNumber}>1</Text>
              )}
            </LinearGradient>
            <Text
              style={[
                styles.progressLabel,
                step >= 1 && styles.progressLabelActive,
              ]}
            >
              Food Details
            </Text>
          </View>
          <View style={styles.progressLineContainer}>
            <View style={styles.progressLineBg} />
            <LinearGradient
              colors={["#a855f7", "#ec4899"]}
              style={[
                styles.progressLine,
                { width: step >= 2 ? "100%" : "0%" },
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
          <View style={styles.progressStep}>
            <LinearGradient
              colors={
                step >= 2 ? ["#a855f7", "#ec4899"] : ["#e9d5ff", "#fbcfe8"]
              }
              style={styles.progressCircle}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.progressNumber}>2</Text>
            </LinearGradient>
            <Text
              style={[
                styles.progressLabel,
                step >= 2 && styles.progressLabelActive,
              ]}
            >
              Pickup Details
            </Text>
          </View>
        </View>

        {/* Step Content */}
        <View style={styles.content}>
          {step === 1 ? renderStep1() : renderStep2()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 32,
    paddingTop: 48,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
    position: "relative",
  },
  headerContent: {
    alignItems: "center",
    zIndex: 1,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.95,
  },
  decorativeCircle1: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: -60,
    left: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  progressStep: {
    alignItems: "center",
  },
  progressCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  progressNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  progressLabel: {
    fontSize: 13,
    color: "#d8b4fe",
    fontWeight: "600",
  },
  progressLabelActive: {
    color: "#a855f7",
  },
  progressLineContainer: {
    width: 80,
    height: 4,
    marginHorizontal: 12,
    position: "relative",
  },
  progressLineBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#e9d5ff",
    borderRadius: 2,
  },
  progressLine: {
    height: "100%",
    borderRadius: 2,
  },
  content: {
    padding: 20,
  },
  stepContainer: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  section: {
    marginBottom: 28,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7e22ce",
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  optionCard: {
    width: "47%",
    height: 140,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#e9d5ff",
    backgroundColor: "#faf5ff",
    overflow: "hidden",
  },
  optionCardSelected: {
    borderColor: "#a855f7",
  },
  optionGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    position: "relative",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 12,
    alignSelf: "center",
  },
  optionText: {
    fontSize: 14,
    color: "#7e22ce",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
  optionTextSelected: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    marginTop: 12,
  },
  checkBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e9d5ff",
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: "#faf5ff",
    gap: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 15,
    color: "#7e22ce",
    fontWeight: "500",
  },
  timeOption: {
    width: "47%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e9d5ff",
    backgroundColor: "#faf5ff",
    gap: 8,
    overflow: "hidden",
  },
  timeOptionSelected: {
    borderColor: "#ec4899",
  },
  timeOptionText: {
    fontSize: 13,
    color: "#7e22ce",
    fontWeight: "600",
  },
  timeOptionTextSelected: {
    color: "#fff",
  },
  textAreaContainer: {
    borderWidth: 2,
    borderColor: "#e9d5ff",
    borderRadius: 16,
    backgroundColor: "#faf5ff",
    padding: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    fontSize: 15,
    color: "#7e22ce",
    fontWeight: "500",
  },
  ngoCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#e9d5ff",
    marginBottom: 16,
    backgroundColor: "#faf5ff",
    overflow: "hidden",
    position: "relative",
  },
  ngoCardSelected: {
    borderColor: "#a855f7",
  },
  ngoContent: {
    flex: 1,
    zIndex: 1,
  },
  ngoHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  ngoName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#7e22ce",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef3c7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  ratingBadgeSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#92400e",
  },
  ngoDetails: {
    flexDirection: "row",
    gap: 20,
  },
  ngoDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ngoDetailText: {
    fontSize: 14,
    color: "#a855f7",
    fontWeight: "600",
  },
  selectedBadge: {
    position: "absolute",
    right: 16,
    zIndex: 2,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 32,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#e9d5ff",
    backgroundColor: "#faf5ff",
    gap: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#a855f7",
  },
  nextButton: {
    marginTop: 32,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    gap: 12,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
});
