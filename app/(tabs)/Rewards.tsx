import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Alert,
  Modal,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  category: string;
  icon: string;
  color: string;
  claimed: boolean;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  progress: number;
  total: number;
  unlocked: boolean;
  icon: string;
}

export default function Rewards() {
  const [currentPoints, setCurrentPoints] = useState(450);
  const [selectedTab, setSelectedTab] = useState<"rewards" | "achievements">(
    "rewards"
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [redeemedReward, setRedeemedReward] = useState<Reward | null>(null);

  const rewards: Reward[] = [
    {
      id: 1,
      title: "Free Coffee Voucher",
      description: "Redeem at partner cafes",
      points: 100,
      category: "Food & Beverage",
      icon: "cafe",
      color: "#ec4899",
      claimed: false,
    },
    {
      id: 2,
      title: "Restaurant Discount",
      description: "20% off at partner restaurants",
      points: 200,
      category: "Food & Beverage",
      icon: "restaurant",
      color: "#d946ef",
      claimed: false,
    },
    {
      id: 3,
      title: "Grocery Voucher",
      description: "$10 off grocery shopping",
      points: 300,
      category: "Shopping",
      icon: "cart",
      color: "#a855f7",
      claimed: false,
    },
    {
      id: 4,
      title: "Movie Tickets",
      description: "2 free movie tickets",
      points: 400,
      category: "Entertainment",
      icon: "film",
      color: "#8b5cf6",
      claimed: false,
    },
    {
      id: 5,
      title: "Spa Treatment",
      description: "Relaxation package",
      points: 500,
      category: "Wellness",
      icon: "flower",
      color: "#c084fc",
      claimed: false,
    },
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "First Donation",
      description: "Complete your first food donation",
      progress: 1,
      total: 1,
      unlocked: true,
      icon: "gift",
    },
    {
      id: 2,
      title: "Generous Giver",
      description: "Donate 10 times",
      progress: 8,
      total: 10,
      unlocked: false,
      icon: "heart",
    },
    {
      id: 3,
      title: "Community Champion",
      description: "Help feed 100 people",
      progress: 68,
      total: 100,
      unlocked: false,
      icon: "people",
    },
    {
      id: 4,
      title: "Consistency King",
      description: "Donate for 7 consecutive days",
      progress: 4,
      total: 7,
      unlocked: false,
      icon: "calendar",
    },
    {
      id: 5,
      title: "Ambassador",
      description: "Refer 5 friends",
      progress: 2,
      total: 5,
      unlocked: false,
      icon: "share-social",
    },
  ];

  const handleRedeem = (reward: Reward) => {
    if (currentPoints >= reward.points) {
      setCurrentPoints((prev) => prev - reward.points);
      setRedeemedReward(reward);
      setShowSuccessModal(true);

      // Mark reward as claimed
      const updatedRewards = rewards.map((r) =>
        r.id === reward.id ? { ...r, claimed: true } : r
      );
      // In a real app, you would update state with updatedRewards
    } else {
      Alert.alert(
        "Not Enough Points",
        `You need ${
          reward.points - currentPoints
        } more points to redeem this reward.`,
        [{ text: "OK" }]
      );
    }
  };

  const renderSuccessModal = () => (
    <Modal
      visible={showSuccessModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowSuccessModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <LinearGradient
            colors={["#ec4899", "#d946ef"]}
            style={styles.modalGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.modalIcon}>
              <Ionicons name="sparkles" size={48} color="#fff" />
            </View>
            <Text style={styles.modalTitle}>Hurray! 🎉</Text>
            <Text style={styles.modalSubtitle}>
              You've successfully redeemed:
            </Text>
            <Text style={styles.rewardName}>{redeemedReward?.title}</Text>
            <Text style={styles.pointsDeducted}>
              -{redeemedReward?.points} points
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowSuccessModal(false)}
            >
              <Text style={styles.modalButtonText}>Awesome!</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );

  const renderRewardsTab = () => (
    <View style={styles.tabContent}>
      {/* Points Balance Card */}
      <LinearGradient
        colors={["#ec4899", "#d946ef", "#a855f7"]}
        style={styles.pointsCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.pointsContent}>
          <View>
            <Text style={styles.pointsLabel}>Your Points Balance</Text>
            <Text style={styles.pointsValue}>{currentPoints}</Text>
            <Text style={styles.pointsSubtext}>
              Keep donating to earn more!
            </Text>
          </View>
          <View style={styles.pointsIcon}>
            <Ionicons name="trophy" size={48} color="#fff" />
          </View>
        </View>
      </LinearGradient>

      {/* How to Earn Points */}
      <View style={styles.earnSection}>
        <Text style={styles.sectionTitle}>How to Earn Points</Text>
        <View style={styles.earnGrid}>
          <View style={styles.earnCard}>
            <View style={[styles.earnIcon, { backgroundColor: "#fce7f3" }]}>
              <Ionicons name="add-circle" size={24} color="#ec4899" />
            </View>
            <Text style={styles.earnValue}>+10</Text>
            <Text style={styles.earnLabel}>Per Donation</Text>
          </View>
          <View style={styles.earnCard}>
            <View style={[styles.earnIcon, { backgroundColor: "#f3e8ff" }]}>
              <Ionicons name="checkmark-done" size={24} color="#a855f7" />
            </View>
            <Text style={styles.earnValue}>+50</Text>
            <Text style={styles.earnLabel}>Complete Profile</Text>
          </View>
          <View style={styles.earnCard}>
            <View style={[styles.earnIcon, { backgroundColor: "#fae8ff" }]}>
              <Ionicons name="share" size={24} color="#d946ef" />
            </View>
            <Text style={styles.earnValue}>+25</Text>
            <Text style={styles.earnLabel}>Refer a Friend</Text>
          </View>
        </View>
      </View>

      {/* Available Rewards */}
      <View style={styles.rewardsSection}>
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        {rewards.map((reward) => (
          <TouchableOpacity key={reward.id} style={styles.rewardCard}>
            <View
              style={[
                styles.rewardIcon,
                { backgroundColor: reward.color + "20" },
              ]}
            >
              <Ionicons
                name={reward.icon as any}
                size={28}
                color={reward.color}
              />
            </View>
            <View style={styles.rewardContent}>
              <Text style={styles.rewardTitle}>{reward.title}</Text>
              <Text style={styles.rewardDescription}>{reward.description}</Text>
              <View style={styles.rewardFooter}>
                <View style={styles.rewardPoints}>
                  <Ionicons name="star" size={16} color="#f59e0b" />
                  <Text style={styles.rewardPointsText}>
                    {reward.points} points
                  </Text>
                </View>
                <Text style={styles.rewardCategory}>{reward.category}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.redeemButton,
                currentPoints < reward.points && styles.redeemButtonDisabled,
                reward.claimed && styles.redeemButtonClaimed,
              ]}
              disabled={currentPoints < reward.points || reward.claimed}
              onPress={() => handleRedeem(reward)}
            >
              <Text
                style={[
                  styles.redeemButtonText,
                  currentPoints < reward.points &&
                    styles.redeemButtonTextDisabled,
                  reward.claimed && styles.redeemButtonTextClaimed,
                ]}
              >
                {reward.claimed
                  ? "Claimed"
                  : currentPoints >= reward.points
                  ? "Redeem"
                  : "Locked"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
      {renderSuccessModal()}
    </View>
  );

  const renderAchievementsTab = () => (
    <View style={styles.tabContent}>
      {/* Progress Overview */}
      <View style={styles.progressOverview}>
        <Text style={styles.overviewTitle}>Your Progress</Text>
        <View style={styles.overviewStats}>
          <View style={styles.overviewStat}>
            <Text style={styles.overviewValue}>
              {achievements.filter((a) => a.unlocked).length}
            </Text>
            <Text style={styles.overviewLabel}>Unlocked</Text>
          </View>
          <View style={styles.overviewDivider} />
          <View style={styles.overviewStat}>
            <Text style={styles.overviewValue}>
              {achievements.filter((a) => !a.unlocked).length}
            </Text>
            <Text style={styles.overviewLabel}>In Progress</Text>
          </View>
        </View>
      </View>

      {/* Achievements List */}
      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        {achievements.map((achievement) => (
          <View
            key={achievement.id}
            style={[
              styles.achievementCard,
              achievement.unlocked && styles.achievementCardUnlocked,
            ]}
          >
            <View
              style={[
                styles.achievementIcon,
                {
                  backgroundColor: achievement.unlocked ? "#fce7f3" : "#f3f4f6",
                },
              ]}
            >
              <Ionicons
                name={achievement.icon as any}
                size={32}
                color={achievement.unlocked ? "#ec4899" : "#9ca3af"}
              />
            </View>
            <View style={styles.achievementContent}>
              <View style={styles.achievementHeader}>
                <Text
                  style={[
                    styles.achievementTitle,
                    achievement.unlocked && styles.achievementTitleUnlocked,
                  ]}
                >
                  {achievement.title}
                </Text>
                {achievement.unlocked && (
                  <Ionicons name="checkmark-circle" size={20} color="#ec4899" />
                )}
              </View>
              <Text style={styles.achievementDescription}>
                {achievement.description}
              </Text>
              {!achievement.unlocked && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${
                            (achievement.progress / achievement.total) * 100
                          }%`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {achievement.progress}/{achievement.total}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <ImageBackground
          source={require("../../assets/images/dish2.jpeg")}
          style={styles.header}
          imageStyle={styles.headerImage}
        >
          <View style={styles.overlay} />
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Rewards & Achievements</Text>
            <Text style={styles.headerSubtitle}>
              Track your impact and redeem rewards
            </Text>
          </View>
        </ImageBackground>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "rewards" && styles.tabActive]}
            onPress={() => setSelectedTab("rewards")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "rewards" && styles.tabTextActive,
              ]}
            >
              Rewards
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === "achievements" && styles.tabActive,
            ]}
            onPress={() => setSelectedTab("achievements")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "achievements" && styles.tabTextActive,
              ]}
            >
              Achievements
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {selectedTab === "rewards"
          ? renderRewardsTab()
          : renderAchievementsTab()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf4ff",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 48,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
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
    backgroundColor: "rgba(168, 85, 247, 0.7)",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    position: "relative",
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    padding: 4,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#ec4899",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9ca3af",
  },
  tabTextActive: {
    color: "#fff",
  },
  tabContent: {
    padding: 16,
  },
  pointsCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  pointsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointsLabel: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
    marginBottom: 8,
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  pointsSubtext: {
    fontSize: 13,
    color: "#fff",
    opacity: 0.8,
  },
  pointsIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 40,
    padding: 16,
  },
  earnSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7e22ce",
    marginBottom: 16,
  },
  earnGrid: {
    flexDirection: "row",
    gap: 12,
  },
  earnCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  earnIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  earnValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7e22ce",
    marginBottom: 4,
  },
  earnLabel: {
    fontSize: 11,
    color: "#a855f7",
    textAlign: "center",
  },
  rewardsSection: {
    marginBottom: 24,
  },
  rewardCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  rewardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rewardContent: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7e22ce",
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 13,
    color: "#a855f7",
    marginBottom: 8,
  },
  rewardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rewardPoints: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rewardPointsText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#f59e0b",
  },
  rewardCategory: {
    fontSize: 11,
    color: "#c084fc",
  },
  redeemButton: {
    backgroundColor: "#ec4899",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  redeemButtonDisabled: {
    backgroundColor: "#e5e7eb",
  },
  redeemButtonClaimed: {
    backgroundColor: "#86efac",
  },
  redeemButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },
  redeemButtonTextDisabled: {
    color: "#9ca3af",
  },
  redeemButtonTextClaimed: {
    color: "#166534",
  },
  progressOverview: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7e22ce",
    marginBottom: 16,
  },
  overviewStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  overviewStat: {
    flex: 1,
    alignItems: "center",
  },
  overviewValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ec4899",
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 13,
    color: "#a855f7",
  },
  overviewDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#f3e8ff",
  },
  achievementsSection: {
    marginBottom: 24,
  },
  achievementCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    opacity: 0.6,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementCardUnlocked: {
    opacity: 1,
    borderWidth: 2,
    borderColor: "#fce7f3",
  },
  achievementIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9ca3af",
  },
  achievementTitleUnlocked: {
    color: "#7e22ce",
  },
  achievementDescription: {
    fontSize: 13,
    color: "#a855f7",
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ec4899",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#a855f7",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalGradient: {
    padding: 32,
    alignItems: "center",
  },
  modalIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
    marginBottom: 8,
  },
  rewardName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fde047",
    marginBottom: 8,
  },
  pointsDeducted: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ec4899",
  },
});
