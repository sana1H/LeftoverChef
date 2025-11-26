import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Camera from "expo-camera";
import { useRouter } from "expo-router";

interface Prediction {
  freshness: "Fresh" | "Stale";
  confidence: number; // 0–1
}

export default function Upload() {
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Permission for camera
  const requestCameraPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      return status === "granted";
    } catch {
      return false;
    }
  };

  // Permission for gallery
  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Gallery access is needed.");
      return false;
    }
    return true;
  };

  // Take a photo
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert("Permission Required", "Camera access is needed.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      setPrediction(null);
      setShowResults(false);
    }
  };

  // Pick from gallery
  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      setPrediction(null);
      setShowResults(false);
    }
  };

  // Upload & check freshness
  const handleUpload = async () => {
    if (!selectedImage) {
      Alert.alert("No Image", "Please upload a food image first.");
      return;
    }

    setIsUploading(true);

    try {
      // Simulate actual ML API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // MOCK – Your ML model will return real values later.
      const mock: Prediction =
        Math.random() > 0.5
          ? { freshness: "Fresh", confidence: 0.92 }
          : { freshness: "Stale", confidence: 0.81 };

      setPrediction(mock);
      setShowResults(true);

      Alert.alert(
        "Analysis Complete",
        `Food is detected as: ${mock.freshness}`,
        [{ text: "OK" }]
      );
    } catch {
      Alert.alert("Error", "Unable to analyze image. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Reset
  const handleReset = () => {
    setSelectedImage(null);
    setPrediction(null);
    setShowResults(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#fae8ff", "#fce7f3", "#fff"]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <LinearGradient
          colors={["#a855f7", "#ec4899"]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerIcon}>
              <Ionicons name="restaurant" size={32} color="#fff" />
            </View>

            <Text style={styles.headerTitle}>Food Freshness Check</Text>
            <Text style={styles.headerSubtitle}>
              Upload food image to check if it is fresh or stale
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Upload Section */}
          {!selectedImage ? (
            <>
              <View style={styles.uploadCard}>
                <LinearGradient
                  colors={["#fae8ff", "#fce7f3"]}
                  style={styles.uploadArea}
                >
                  <Ionicons
                    name="cloud-upload-outline"
                    size={64}
                    color="#d8b4fe"
                  />
                  <Text style={styles.uploadTitle}>Upload Food Image</Text>
                  <Text style={styles.uploadSubtitle}>
                    Detect freshness using AI
                  </Text>
                </LinearGradient>
              </View>

              <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
                <LinearGradient
                  colors={["#a855f7", "#ec4899"]}
                  style={styles.actionGradient}
                >
                  <Ionicons name="camera" size={24} color="#fff" />
                  <Text style={styles.actionText}>Take Photo</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
                <LinearGradient
                  colors={["#ec4899", "#f472b6"]}
                  style={styles.actionGradient}
                >
                  <Ionicons name="images" size={24} color="#fff" />
                  <Text style={styles.actionText}>Choose from Gallery</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.previewSection}>
              <View style={styles.imageCard}>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.previewImage}
                />
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={handleReset}
                  disabled={isUploading}
                >
                  <Ionicons name="close-circle" size={20} color="#a855f7" />
                  <Text style={styles.secondaryButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleUpload}
                  disabled={isUploading}
                >
                  <LinearGradient
                    colors={["#a855f7", "#ec4899"]}
                    style={styles.gradientButton}
                  >
                    {isUploading ? (
                      <>
                        <ActivityIndicator color="#fff" size="small" />
                        <Text style={styles.buttonText}>Analyzing...</Text>
                      </>
                    ) : (
                      <>
                        <Ionicons name="sparkles" size={24} color="#fff" />
                        <Text style={styles.buttonText}>Check Freshness</Text>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* RESULTS */}
              {showResults && prediction && (
                <View style={styles.resultsCard}>
                  <View style={styles.resultsHeader}>
                    <Ionicons
                      name={
                        prediction.freshness === "Fresh"
                          ? "checkmark-circle"
                          : "warning"
                      }
                      size={26}
                      color={
                        prediction.freshness === "Fresh" ? "#16a34a" : "#dc2626"
                      }
                    />

                    <Text
                      style={[
                        styles.resultsTitle,
                        {
                          color:
                            prediction.freshness === "Fresh"
                              ? "#16a34a"
                              : "#dc2626",
                        },
                      ]}
                    >
                      Food is {prediction.freshness}
                    </Text>
                  </View>

                  <View style={styles.confidenceContainer}>
                    <Text style={styles.confidenceLabel}>Confidence:</Text>

                    <View style={styles.confidenceBar}>
                      <LinearGradient
                        colors={
                          prediction.freshness === "Fresh"
                            ? ["#22c55e", "#16a34a"]
                            : ["#f87171", "#dc2626"]
                        }
                        style={[
                          styles.confidenceFill,
                          { width: `${prediction.confidence * 100}%` },
                        ]}
                      />
                    </View>

                    <Text style={styles.confidenceText}>
                      {(prediction.confidence * 100).toFixed(0)}%
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Info Section */}
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Ionicons name="information-circle" size={20} color="#a855f7" />
              <Text style={styles.infoTitle}>How It Works</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>1</Text>
              <Text style={styles.infoText}>
                Upload a clear image of the food item
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>2</Text>
              <Text style={styles.infoText}>
                Our ML model analyzes color, texture & patterns
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>3</Text>
              <Text style={styles.infoText}>
                You get a prediction whether food is **fresh or stale**
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    padding: 32,
    paddingTop: 48,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  headerContent: { alignItems: "center" },

  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },

  headerSubtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 6,
    opacity: 0.9,
    textAlign: "center",
    paddingHorizontal: 10,
  },

  content: {
    padding: 20,
  },

  uploadCard: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 20,
  },

  uploadArea: {
    padding: 48,
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#e9d5ff",
    borderStyle: "dashed",
    borderRadius: 24,
  },

  uploadTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#7e22ce",
    marginTop: 16,
  },

  uploadSubtitle: {
    fontSize: 14,
    color: "#a855f7",
    marginTop: 4,
  },

  actionButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },

  actionGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    gap: 12,
  },

  actionText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "700",
  },

  previewSection: {
    marginBottom: 24,
  },

  imageCard: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#fff",
    elevation: 8,
  },

  previewImage: {
    width: "100%",
    height: 300,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },

  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e9d5ff",
    backgroundColor: "#faf5ff",
    gap: 8,
    flex: 1,
    justifyContent: "center",
  },

  secondaryButtonText: {
    fontSize: 16,
    color: "#a855f7",
    fontWeight: "700",
  },

  primaryButton: {
    borderRadius: 16,
    overflow: "hidden",
    flex: 1,
  },

  gradientButton: {
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  buttonText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "700",
  },

  // RESULTS SECTION
  resultsCard: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 20,
    elevation: 7,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#f3e8ff",
  },

  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },

  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  confidenceContainer: {
    marginTop: 8,
  },

  confidenceLabel: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 6,
  },

  confidenceBar: {
    height: 10,
    backgroundColor: "#f3e8ff",
    borderRadius: 6,
    overflow: "hidden",
  },

  confidenceFill: {
    height: "100%",
    borderRadius: 6,
  },

  confidenceText: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "right",
    color: "#7e22ce",
  },

  infoCard: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    elevation: 6,
  },

  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#7e22ce",
  },

  infoItem: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
    alignItems: "flex-start",
  },

  infoNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#a855f7",
    color: "#fff",
    textAlign: "center",
    lineHeight: 26,
    fontWeight: "700",
  },

  infoText: {
    flex: 1,
    color: "#7e22ce",
    fontSize: 14,
  },
});
