// // app/(tabs)/Upload.tsx - Complete Upload Screen with Image Picker
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
import * as ImagePicker from 'expo-image-picker';
import { mlAPI } from '@/lib/api';
import { useRouter } from 'expo-router';

interface Prediction {
  name: string;
  confidence: number;
}

export default function Upload() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Request permissions
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to make this work!'
      );
      return false;
    }
    return true;
  };

  // Pick image from gallery
  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      setShowResults(false);
      setPredictions([]);
    }
  };

  // Take photo with camera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera permissions to make this work!'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      setShowResults(false);
      setPredictions([]);
    }
  };

  // Upload and predict
  const handleUpload = async () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please select an image first');
      return;
    }

    setIsUploading(true);

    try {
      const response = await mlAPI.predict(selectedImage);
      
      if (response.success && response.data) {
        setPredictions(response.data.predictions);
        setShowResults(true);
        
        Alert.alert(
          'Success!',
          `Detected ${response.data.predictions.length} ingredients`,
          [
            {
              text: 'OK',
              onPress: () => console.log('Success acknowledged'),
            },
          ]
        );
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      Alert.alert(
        'Upload Failed',
        error.message || 'Something went wrong. Please try again.',
        [
          {
            text: 'OK',
          },
        ]
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Reset
  const handleReset = () => {
    setSelectedImage(null);
    setPredictions([]);
    setShowResults(false);
  };

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
              <Ionicons name="camera" size={32} color="#fff" />
            </View>
            <Text style={styles.headerTitle}>Upload Food Image</Text>
            <Text style={styles.headerSubtitle}>
              Identify ingredients with AI
            </Text>
          </View>
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />
        </LinearGradient>

        <View style={styles.content}>
          {/* Image Preview or Upload Options */}
          {!selectedImage ? (
            <View style={styles.uploadSection}>
              <View style={styles.uploadCard}>
                <LinearGradient
                  colors={["#fae8ff", "#fce7f3"]}
                  style={styles.uploadArea}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="cloud-upload-outline" size={64} color="#d8b4fe" />
                  <Text style={styles.uploadTitle}>Upload Food Image</Text>
                  <Text style={styles.uploadSubtitle}>
                    Take a photo or choose from gallery
                  </Text>
                </LinearGradient>
              </View>

              {/* Upload Buttons */}
              <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
                <LinearGradient
                  colors={["#a855f7", "#ec4899"]}
                  style={styles.actionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="camera" size={24} color="#fff" />
                  <Text style={styles.actionText}>Take Photo</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
                <LinearGradient
                  colors={["#ec4899", "#f472b6"]}
                  style={styles.actionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="images" size={24} color="#fff" />
                  <Text style={styles.actionText}>Choose from Gallery</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.previewSection}>
              {/* Image Preview */}
              <View style={styles.imageCard}>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
              </View>

              {/* Action Buttons */}
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
                  style={[styles.primaryButton, { flex: 1 }]}
                  onPress={handleUpload}
                  disabled={isUploading}
                >
                  <LinearGradient
                    colors={["#a855f7", "#ec4899"]}
                    style={styles.gradientButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {isUploading ? (
                      <>
                        <ActivityIndicator color="#fff" size="small" />
                        <Text style={styles.buttonText}>Analyzing...</Text>
                      </>
                    ) : (
                      <>
                        <Ionicons name="sparkles" size={24} color="#fff" />
                        <Text style={styles.buttonText}>Analyze Image</Text>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Results */}
              {showResults && predictions.length > 0 && (
                <View style={styles.resultsCard}>
                  <View style={styles.resultsHeader}>
                    <Ionicons name="checkmark-circle" size={24} color="#16a34a" />
                    <Text style={styles.resultsTitle}>
                      Detected Ingredients ({predictions.length})
                    </Text>
                  </View>

                  {predictions.map((pred, index) => (
                    <View key={index} style={styles.predictionItem}>
                      <View style={styles.predictionInfo}>
                        <View style={styles.predictionIcon}>
                          <Ionicons name="nutrition" size={20} color="#a855f7" />
                        </View>
                        <Text style={styles.predictionName}>
                          {pred.name.charAt(0).toUpperCase() + pred.name.slice(1)}
                        </Text>
                      </View>
                      
                      <View style={styles.confidenceContainer}>
                        <View style={styles.confidenceBar}>
                          <LinearGradient
                            colors={["#a855f7", "#ec4899"]}
                            style={[
                              styles.confidenceFill,
                              { width: `${pred.confidence * 100}%` },
                            ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                          />
                        </View>
                        <Text style={styles.confidenceText}>
                          {Math.round(pred.confidence * 100)}%
                        </Text>
                      </View>
                    </View>
                  ))}

                  {/* View History Button */}
                  <TouchableOpacity
                    style={styles.historyButton}
                    onPress={() => router.push('/(tabs)/Alerts')}
                  >
                    <Ionicons name="time" size={18} color="#a855f7" />
                    <Text style={styles.historyButtonText}>View History</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          {/* Info Section */}
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Ionicons name="information-circle" size={20} color="#a855f7" />
              <Text style={styles.infoTitle}>How it works</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>1</Text>
              <Text style={styles.infoText}>
                Take a photo or upload an image of your food
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>2</Text>
              <Text style={styles.infoText}>
                Our AI analyzes and identifies ingredients
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>3</Text>
              <Text style={styles.infoText}>
                Get instant results with confidence scores
              </Text>
            </View>
          </View>
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
    fontSize: 28,
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
  content: {
    padding: 20,
  },
  uploadSection: {
    marginBottom: 24,
  },
  uploadCard: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  uploadArea: {
    padding: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#e9d5ff",
    borderStyle: "dashed",
    borderRadius: 24,
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7e22ce",
    marginTop: 16,
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: "#a855f7",
    textAlign: "center",
  },
  actionButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
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
    fontWeight: "700",
    color: "#fff",
  },
  previewSection: {
    marginBottom: 24,
  },
  imageCard: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    backgroundColor: "#fff",
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
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#e9d5ff",
    backgroundColor: "#faf5ff",
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#a855f7",
  },
  primaryButton: {
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
  resultsCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 2,
    borderColor: "#dcfce7",
  },
  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16a34a",
  },
  predictionItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#fae8ff",
  },
  predictionInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  predictionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fae8ff",
    alignItems: "center",
    justifyContent: "center",
  },
  predictionName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7e22ce",
  },
  confidenceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  confidenceBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#fae8ff",
    borderRadius: 4,
    overflow: "hidden",
  },
  confidenceFill: {
    height: "100%",
    borderRadius: 4,
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#a855f7",
    minWidth: 45,
    textAlign: "right",
  },
  historyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#fae8ff",
    marginTop: 12,
  },
  historyButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#a855f7",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#7e22ce",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  infoNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#a855f7",
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 28,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: "#a855f7",
    lineHeight: 20,
  },
});