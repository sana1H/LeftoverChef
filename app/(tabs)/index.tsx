// app/(tabs)/index.tsx
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";

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
  const router = useRouter();

  // SAMPLE DATA
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

  // SHARE HANDLER
  const handleShareApp = async () => {
    const appLink = "https://leftoverchef.app/download";

    try {
      await Share.share({
        message: `🍽️ Join me on LeftoverChef! Download here: ${appLink}`,
      });
    } catch {
      await Clipboard.setStringAsync(appLink);
      Alert.alert("Link Copied!", "The download link is copied.");
    }
  };

  const handleNGODetails = (ngo: NGO) => {
    router.push({
      pathname: "/(tabs)/NgoDetails",
      params: { ...ngo },
    });
  };

  return (
    <View style={[styles.mainBackground, { backgroundColor: "#faf5ff" }]}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* HEADER */}
          <ImageBackground
            source={require("../../assets/images/dish2.jpeg")}
            style={styles.header}
            imageStyle={styles.headerImage}
          >
            <View style={styles.overlay} />

            <View style={styles.headerContent}>
              <View style={styles.headerTop}>
                {/* LEFT TITLE */}
                <View>
                  <Text style={styles.headerTitle}>LeftoverChef</Text>
                  <Text style={styles.headerSubtitle}>
                    Share food, spread kindness
                  </Text>
                </View>

                {/* ONLY NOTIFICATION ICON */}
                <View style={styles.headerIconsAdjusted}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => router.push("/(tabs)/Alerts")}
                  >
                    <Ionicons
                      name="notifications-outline"
                      size={22}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>

          {/* MAIN CONTENT */}
          <View style={styles.content}>
            {/* DONATE BUTTON */}
            <TouchableOpacity
              style={styles.donateButtonWrapper}
              onPress={() => router.push("/(tabs)/Upload")}
            >
              <LinearGradient
                colors={["#a855f7", "#ec4899"]}
                style={styles.donateButton}
              >
                <Ionicons name="add-circle" size={28} color="#fff" />
                <Text style={styles.donateButtonText}>
                  Create Food Donation
                </Text>
                <Ionicons name="arrow-forward-circle" size={24} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

            {/* RECENT ACTIVITY */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.activityContainer}
              >
                {recentDonations.map((d) => (
                  <View key={d.id} style={styles.activityCircle}>
                    <LinearGradient
                      colors={d.gradient}
                      style={styles.activityGradient}
                    >
                      <Ionicons name="restaurant" size={34} color="#fff" />
                    </LinearGradient>

                    <View style={styles.activityInfo}>
                      <Text style={styles.circleNGO}>{d.ngo}</Text>
                      <Text style={styles.circleItems}>{d.items}</Text>
                      <Text style={{ color: "#a855f7" }}>{d.time}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* NEARBY NGOS WITH ICON IMAGE */}
            <View style={styles.section}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <Ionicons name="business-outline" size={22} color="#7e22ce" />
                <Text style={styles.sectionTitle}>Nearby NGOs</Text>
              </View>

              {nearbyNGOs.map((ngo) => (
                <TouchableOpacity key={ngo.id} style={styles.ngoCard}>
                  <LinearGradient
                    colors={ngo.gradient}
                    style={styles.ngoIconContainer}
                  >
                    <Ionicons name="home" size={34} color="#fff" />
                  </LinearGradient>

                  <View style={styles.ngoContent}>
                    {/* ⭐ NGO NAME + CUSTOM ICON (FIXED) ⭐ */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 3,
                      }}
                    >
                      <Image
                        source={require("../../assets/icons/home.png")}
                        style={{ width: 22, height: 22, borderRadius: 6 }}
                      />
                      <Text style={styles.ngoName}>{ngo.name}</Text>
                    </View>

                    <Text style={{ color: "#a855f7" }}>
                      {ngo.distance} • {ngo.capacity} capacity
                    </Text>

                    <TouchableOpacity
                      onPress={() => handleNGODetails(ngo)}
                      style={styles.viewButton}
                    >
                      <Text style={styles.viewButtonText}>View →</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* IMPACT BANNER */}
            <LinearGradient
              colors={["#a855f7", "#ec4899"]}
              style={styles.impactBanner}
            >
              <Text style={styles.impactTitle}>Make a bigger impact!</Text>
              <Text style={styles.impactSubtitle}>
                Invite friends & earn bonus rewards
              </Text>

              <TouchableOpacity
                style={styles.shareButton}
                onPress={handleShareApp}
              >
                <Ionicons name="share-social" size={18} color="#a855f7" />
                <Text style={styles.shareButtonText}>Share App</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// =======================================================
// STYLES
// =======================================================
const styles = StyleSheet.create({
  mainBackground: { flex: 1 },
  container: { flex: 1 },

  header: {
    padding: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
  },

  headerImage: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(126, 34, 206, 0.75)",
  },

  headerContent: { position: "relative" },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },

  headerSubtitle: {
    fontSize: 15,
    color: "#fff",
    opacity: 0.9,
  },

  headerIconsAdjusted: {
    flexDirection: "row",
    gap: 12,
    marginRight: -10,
  },

  iconButton: {
    backgroundColor: "rgba(255,255,255,0.25)",
    padding: 10,
    borderRadius: 20,
  },

  content: { padding: 24 },

  donateButtonWrapper: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
  },

  donateButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 20,
    gap: 12,
  },

  donateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
  },

  section: { marginBottom: 24 },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#7e22ce",
  },

  activityContainer: {
    flexDirection: "row",
    gap: 16,
    paddingRight: 20,
  },

  activityCircle: {
    width: 160,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#e9d5ff",
    overflow: "hidden",
  },

  activityGradient: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },

  activityInfo: { padding: 12 },

  circleNGO: {
    fontSize: 15,
    fontWeight: "700",
    color: "#7e22ce",
    marginBottom: 4,
  },

  circleItems: {
    fontSize: 13,
    fontWeight: "600",
    color: "#a855f7",
    marginBottom: 4,
  },

  ngoCard: {
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 2,
    padding: 12,
    marginBottom: 14,
    borderColor: "#e9d5ff",
    backgroundColor: "#fff",
  },

  ngoIconContainer: {
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    paddingVertical: 18,
  },

  ngoContent: { flex: 1, paddingLeft: 12 },

  ngoName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#7e22ce",
  },

  viewButton: { marginTop: 8 },

  viewButtonText: { color: "#a855f7", fontWeight: "700" },

  impactBanner: { borderRadius: 20, padding: 20, marginTop: 10 },

  impactTitle: { fontSize: 18, fontWeight: "700", color: "#fff" },

  impactSubtitle: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
    marginBottom: 10,
  },

  shareButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  shareButtonText: {
    color: "#a855f7",
    fontWeight: "700",
    fontSize: 15,
  },
});

// // app/(tabs)/index.tsx
// import { Ionicons } from "@expo/vector-icons";
// import * as Clipboard from "expo-clipboard";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   Alert,
//   ImageBackground,
//   Modal,
//   SafeAreaView,
//   ScrollView,
//   Share,
//   StatusBar,
//   StyleSheet,
//   Switch,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useAuth } from "../context/AuthContext";

// interface Donation {
//   id: number;
//   ngo: string;
//   items: string;
//   time: string;
//   status: string;
//   gradient: string[];
// }

// interface NGO {
//   id: number;
//   name: string;
//   distance: string;
//   capacity: string;
//   rating: number;
//   gradient: string[];
// }

// export default function HomeScreen() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [showAuthPopup, setShowAuthPopup] = useState(false);

//   const router = useRouter();
//   const { user, token } = useAuth();

//   // ⭐ POPUP AFTER 7 SECONDS
//   useEffect(() => {
//     if (!user) {
//       const timer = setTimeout(() => setShowAuthPopup(true), 7000);
//       return () => clearTimeout(timer);
//     }
//   }, [user]);

//   const handleSignIn = () => {
//     setShowAuthPopup(false);
//     router.push("/auth/sign-in");
//   };

//   const handleSignUp = () => {
//     setShowAuthPopup(false);
//     router.push("/auth/sign-up");
//   };

//   // SAMPLE DATA
//   const recentDonations: Donation[] = [
//     {
//       id: 1,
//       ngo: "Hope Foundation",
//       items: "15 meals",
//       time: "2 hours ago",
//       status: "Picked up",
//       gradient: ["#a855f7", "#ec4899"],
//     },
//     {
//       id: 2,
//       ngo: "Care Center",
//       items: "8 meals",
//       time: "1 day ago",
//       status: "Delivered",
//       gradient: ["#ec4899", "#f472b6"],
//     },
//     {
//       id: 3,
//       ngo: "Seva Trust",
//       items: "12 meals",
//       time: "2 days ago",
//       status: "Completed",
//       gradient: ["#d946ef", "#f0abfc"],
//     },
//   ];

//   const nearbyNGOs: NGO[] = [
//     {
//       id: 1,
//       name: "Hope Foundation",
//       distance: "0.8 km",
//       capacity: "High",
//       rating: 4.8,
//       gradient: ["#a855f7", "#d946ef"],
//     },
//     {
//       id: 2,
//       name: "Seva Trust",
//       distance: "1.2 km",
//       capacity: "Medium",
//       rating: 4.6,
//       gradient: ["#ec4899", "#f472b6"],
//     },
//     {
//       id: 3,
//       name: "Care Center",
//       distance: "2.1 km",
//       capacity: "High",
//       rating: 4.9,
//       gradient: ["#d946ef", "#f0abfc"],
//     },
//   ];

//   const handleShareApp = async () => {
//     const appLink = "https://leftoverchef.app/download";

//     try {
//       await Share.share({
//         message: `🍽️ Join me on LeftoverChef! Download here: ${appLink}`,
//         title: "LeftoverChef App",
//       });
//     } catch {
//       await Clipboard.setStringAsync(appLink);
//       Alert.alert("Link Copied!", "Download link copied to clipboard.");
//     }
//   };

//   const handleNGODetails = (ngo: NGO) => {
//     router.push({
//       pathname: "/(tabs)/NgoDetails",
//       params: {
//         id: ngo.id,
//         name: ngo.name,
//         distance: ngo.distance,
//         capacity: ngo.capacity,
//         rating: ngo.rating,
//       },
//     });
//   };

//   const theme = {
//     background: isDarkMode ? "#1a0b2e" : "#faf5ff",
//     cardBackground: isDarkMode ? "#2d1b4e" : "#ffffff",
//     textPrimary: isDarkMode ? "#f9fafb" : "#7e22ce",
//     textSecondary: isDarkMode ? "#d8b4fe" : "#a855f7",
//     borderColor: isDarkMode ? "#4c1d95" : "#e9d5ff",
//   };

//   return (
//     <View
//       style={[styles.mainBackground, { backgroundColor: theme.background }]}
//     >
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

//         {/* POPUP MODAL */}
//         <Modal visible={showAuthPopup} transparent animationType="fade">
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContainer}>
//               <Text style={styles.modalTitle}>Welcome to LeftOver Chef</Text>
//               <Text style={styles.modalText}>
//                 Please sign in or create an account to continue.
//               </Text>

//               <View style={styles.modalButtons}>
//                 <TouchableOpacity
//                   style={styles.signInBtn}
//                   onPress={handleSignIn}
//                 >
//                   <Text style={styles.signInText}>Sign In</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.signUpBtn}
//                   onPress={handleSignUp}
//                 >
//                   <Text style={styles.signUpText}>Sign Up</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>

//         <ScrollView showsVerticalScrollIndicator={false}>
//           {/* HEADER */}
//           <ImageBackground
//             source={require("../../assets/images/dish2.jpeg")}
//             style={styles.header}
//             imageStyle={styles.headerImage}
//           >
//             <View style={styles.overlay} />

//             <View style={styles.headerContent}>
//               <View style={styles.headerTop}>
//                 <View>
//                   <Text style={styles.headerTitle}>LeftoverChef</Text>
//                   <Text style={styles.headerSubtitle}>
//                     Share food, spread kindness
//                   </Text>
//                 </View>

//                 <View style={styles.headerIcons}>
//                   <View style={styles.darkModeToggle}>
//                     <Ionicons
//                       name={isDarkMode ? "moon" : "sunny"}
//                       size={18}
//                       color="#fff"
//                     />
//                     <Switch
//                       value={isDarkMode}
//                       onValueChange={() => setIsDarkMode(!isDarkMode)}
//                       trackColor={{ false: "#d8b4fe", true: "#7e22ce" }}
//                       thumbColor={isDarkMode ? "#ec4899" : "#fde047"}
//                       style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
//                     />
//                   </View>

//                   <TouchableOpacity style={styles.iconButton}>
//                     <Ionicons
//                       name="notifications-outline"
//                       size={22}
//                       color="#fff"
//                     />
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.iconButton}
//                     onPress={() => {
//                       if (token && user) {
//                         router.push("/(tabs)/profile");
//                       } else {
//                         setShowAuthPopup(true);
//                       }
//                     }}
//                   >
//                     <Ionicons name="person-outline" size={22} color="#fff" />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </ImageBackground>

//           {/* MAIN CONTENT */}
//           <View style={styles.content}>
//             {/* DONATE BUTTON */}
//             <TouchableOpacity
//               style={styles.donateButtonWrapper}
//               onPress={() => {
//                 if (token && user) {
//                   router.push("/(tabs)/Upload");
//                 } else {
//                   setShowAuthPopup(true);
//                 }
//               }}
//             >
//               <LinearGradient
//                 colors={["#a855f7", "#ec4899"]}
//                 style={styles.donateButton}
//               >
//                 <Ionicons name="add-circle" size={28} color="#fff" />
//                 <Text style={styles.donateButtonText}>
//                   Create Food Donation
//                 </Text>
//                 <Ionicons name="arrow-forward-circle" size={24} color="#fff" />
//               </LinearGradient>
//             </TouchableOpacity>

//             {/* RECENT ACTIVITY */}
//             <View style={styles.section}>
//               <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
//                 Recent Activity
//               </Text>

//               <ScrollView
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.activityContainer}
//               >
//                 {recentDonations.map((d) => (
//                   <View
//                     key={d.id}
//                     style={[
//                       styles.activityCircle,
//                       {
//                         backgroundColor: theme.cardBackground,
//                         borderColor: theme.borderColor,
//                       },
//                     ]}
//                   >
//                     <LinearGradient
//                       colors={d.gradient}
//                       style={styles.activityGradient}
//                     >
//                       <Ionicons name="restaurant" size={34} color="#fff" />
//                     </LinearGradient>

//                     <View style={styles.activityInfo}>
//                       <Text
//                         style={[
//                           styles.circleNGO,
//                           { color: theme.textPrimary },
//                         ]}
//                       >
//                         {d.ngo}
//                       </Text>
//                       <Text
//                         style={[
//                           styles.circleItems,
//                           { color: theme.textSecondary },
//                         ]}
//                       >
//                         {d.items}
//                       </Text>
//                       <Text style={{ color: theme.textSecondary }}>
//                         {d.time}
//                       </Text>
//                     </View>
//                   </View>
//                 ))}
//               </ScrollView>
//             </View>

//             {/* NEARBY NGOS */}
//             <View style={styles.section}>
//               <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
//                 Nearby NGOs
//               </Text>

//               {nearbyNGOs.map((ngo) => (
//                 <TouchableOpacity
//                   key={ngo.id}
//                   style={[
//                     styles.ngoCard,
//                     {
//                       backgroundColor: theme.cardBackground,
//                       borderColor: theme.borderColor,
//                     },
//                   ]}
//                 >
//                   <LinearGradient
//                     colors={ngo.gradient}
//                     style={styles.ngoIconContainer}
//                   >
//                     <Ionicons name="home" size={34} color="#fff" />
//                   </LinearGradient>

//                   <View style={styles.ngoContent}>
//                     <Text
//                       style={[styles.ngoName, { color: theme.textPrimary }]}
//                     >
//                       {ngo.name}
//                     </Text>

//                     <Text style={{ color: theme.textSecondary }}>
//                       {ngo.distance} • {ngo.capacity} capacity
//                     </Text>

//                     <TouchableOpacity
//                       onPress={() => handleNGODetails(ngo)}
//                       style={styles.viewButton}
//                     >
//                       <Text style={styles.viewButtonText}>View →</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* IMPACT BANNER */}
//             <LinearGradient
//               colors={["#a855f7", "#ec4899"]}
//               style={styles.impactBanner}
//             >
//               <Text style={styles.impactTitle}>Make a bigger impact!</Text>
//               <Text style={styles.impactSubtitle}>
//                 Invite friends & earn bonus rewards
//               </Text>

//               <TouchableOpacity
//                 style={styles.shareButton}
//                 onPress={handleShareApp}
//               >
//                 <Ionicons name="share-social" size={18} color="#a855f7" />
//                 <Text style={styles.shareButtonText}>Share App</Text>
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </View>
//   );
// }

// // =======================================================
// //                      STYLES
// // =======================================================

// const styles = StyleSheet.create({
//   mainBackground: { flex: 1 },
//   container: { flex: 1 },

//   // MODAL POPUP
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.35)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     width: "82%",
//     backgroundColor: "#fff",
//     padding: 25,
//     borderRadius: 20,
//     elevation: 10,
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#7e22ce",
//   },
//   modalText: {
//     fontSize: 15,
//     color: "#7e22ce",
//     marginTop: 8,
//     marginBottom: 25,
//   },
//   modalButtons: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   signInBtn: {
//     flex: 1,
//     backgroundColor: "#7e22ce",
//     paddingVertical: 12,
//     borderRadius: 12,
//   },
//   signInText: {
//     textAlign: "center",
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   signUpBtn: {
//     flex: 1,
//     backgroundColor: "#fce7f3",
//     paddingVertical: 12,
//     borderRadius: 12,
//   },
//   signUpText: {
//     textAlign: "center",
//     color: "#ec4899",
//     fontSize: 16,
//     fontWeight: "700",
//   },

//   header: {
//     padding: 24,
//     borderBottomLeftRadius: 32,
//     borderBottomRightRadius: 32,
//     overflow: "hidden",
//   },

//   headerImage: {
//     borderBottomLeftRadius: 32,
//     borderBottomRightRadius: 32,
//   },

//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(126, 34, 206, 0.75)",
//   },

//   headerContent: { position: "relative" },

//   headerTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 24,
//   },

//   headerTitle: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#fff",
//   },

//   headerSubtitle: { fontSize: 15, color: "#fff", opacity: 0.9 },

//   headerIcons: { flexDirection: "row", gap: 12 },

//   darkModeToggle: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.25)",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 20,
//   },

//   iconButton: {
//     backgroundColor: "rgba(255,255,255,0.25)",
//     padding: 10,
//     borderRadius: 20,
//   },

//   content: {
//     padding: 24,
//   },

//   donateButtonWrapper: {
//     borderRadius: 20,
//     overflow: "hidden",
//     marginBottom: 24,
//   },

//   donateButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 18,
//     borderRadius: 20,
//     gap: 12,
//   },

//   donateButtonText: { color: "#fff", fontSize: 18, fontWeight: "700", flex: 1 },

//   section: { marginBottom: 24 },

//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginBottom: 12,
//   },

//   activityContainer: {
//     flexDirection: "row",
//     gap: 16,
//     paddingRight: 20,
//   },

//   activityCircle: {
//     width: 160,
//     borderWidth: 2,
//     borderRadius: 20,
//     overflow: "hidden",
//   },

//   activityGradient: {
//     height: 90,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   activityInfo: { padding: 12 },

//   circleNGO: {
//     fontSize: 15,
//     fontWeight: "700",
//     marginBottom: 4,
//   },

//   circleItems: {
//     fontSize: 13,
//     fontWeight: "600",
//     marginBottom: 4,
//   },

//   ngoCard: {
//     flexDirection: "row",
//     borderRadius: 20,
//     borderWidth: 2,
//     padding: 12,
//     marginBottom: 14,
//   },

//   ngoIconContainer: {
//     width: 90,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 16,
//     paddingVertical: 18,
//   },

//   ngoContent: { flex: 1, paddingLeft: 12 },

//   ngoName: { fontSize: 18, fontWeight: "700", marginBottom: 4 },

//   viewButton: { marginTop: 8 },

//   viewButtonText: { color: "#a855f7", fontWeight: "700" },

//   impactBanner: { borderRadius: 20, padding: 20, marginTop: 10 },

//   impactTitle: { fontSize: 18, fontWeight: "700", color: "#fff" },

//   impactSubtitle: {
//     fontSize: 14,
//     color: "#fff",
//     opacity: 0.9,
//     marginBottom: 10,
//   },

//   shareButton: {
//     backgroundColor: "#fff",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 16,
//     alignSelf: "flex-start",
//     flexDirection: "row",
//     gap: 8,
//     alignItems: "center",
//   },

//   shareButtonText: {
//     color: "#a855f7",
//     fontWeight: "700",
//     fontSize: 15,
//   },
// });
