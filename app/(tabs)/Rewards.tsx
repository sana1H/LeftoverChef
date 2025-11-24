import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
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
  const [currentPoints] = useState(450);
  const [selectedTab, setSelectedTab] = useState<"rewards" | "achievements">(
    "rewards"
  );

  const rewards: Reward[] = [
    {
      id: 1,
      title: "Free Coffee Voucher",
      description: "Redeem at partner cafes",
      points: 100,
      category: "Food & Beverage",
      icon: "cafe",
      color: "#92400e",
      claimed: false,
    },
    {
      id: 2,
      title: "Restaurant Discount",
      description: "20% off at partner restaurants",
      points: 200,
      category: "Food & Beverage",
      icon: "restaurant",
      color: "#dc2626",
      claimed: false,
    },
    {
      id: 3,
      title: "Grocery Voucher",
      description: "$10 off grocery shopping",
      points: 300,
      category: "Shopping",
      icon: "cart",
      color: "#16a34a",
      claimed: false,
    },
    {
      id: 4,
      title: "Movie Tickets",
      description: "2 free movie tickets",
      points: 400,
      category: "Entertainment",
      icon: "film",
      color: "#7c3aed",
      claimed: false,
    },
    {
      id: 5,
      title: "Spa Treatment",
      description: "Relaxation package",
      points: 500,
      category: "Wellness",
      icon: "flower",
      color: "#ec4899",
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

  const renderRewardsTab = () => (
    <View style={styles.tabContent}>
      {/* Points Balance Card */}
      <LinearGradient
        colors={["#f59e0b", "#fb923c"]}
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
            <View style={[styles.earnIcon, { backgroundColor: "#dbeafe" }]}>
              <Ionicons name="add-circle" size={24} color="#3b82f6" />
            </View>
            <Text style={styles.earnValue}>+10</Text>
            <Text style={styles.earnLabel}>Per Donation</Text>
          </View>
          <View style={styles.earnCard}>
            <View style={[styles.earnIcon, { backgroundColor: "#dcfce7" }]}>
              <Ionicons name="checkmark-done" size={24} color="#16a34a" />
            </View>
            <Text style={styles.earnValue}>+50</Text>
            <Text style={styles.earnLabel}>Complete Profile</Text>
          </View>
          <View style={styles.earnCard}>
            <View style={[styles.earnIcon, { backgroundColor: "#fef3c7" }]}>
              <Ionicons name="share" size={24} color="#f59e0b" />
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
              ]}
              disabled={currentPoints < reward.points}
            >
              <Text
                style={[
                  styles.redeemButtonText,
                  currentPoints < reward.points &&
                    styles.redeemButtonTextDisabled,
                ]}
              >
                {currentPoints >= reward.points ? "Redeem" : "Locked"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
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
                  backgroundColor: achievement.unlocked ? "#dcfce7" : "#f3f4f6",
                },
              ]}
            >
              <Ionicons
                name={achievement.icon as any}
                size={32}
                color={achievement.unlocked ? "#16a34a" : "#9ca3af"}
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
                  <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
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
    backgroundColor: "#f9fafb",
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
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
    backgroundColor: "#16a34a",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
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
    color: "#1f2937",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
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
    color: "#1f2937",
    marginBottom: 4,
  },
  earnLabel: {
    fontSize: 11,
    color: "#6b7280",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
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
    color: "#1f2937",
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 13,
    color: "#6b7280",
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
    color: "#9ca3af",
  },
  redeemButton: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  redeemButtonDisabled: {
    backgroundColor: "#e5e7eb",
  },
  redeemButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },
  redeemButtonTextDisabled: {
    color: "#9ca3af",
  },
  progressOverview: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
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
    color: "#16a34a",
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 13,
    color: "#6b7280",
  },
  overviewDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#e5e7eb",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementCardUnlocked: {
    opacity: 1,
    borderWidth: 2,
    borderColor: "#dcfce7",
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
    color: "#6b7280",
  },
  achievementTitleUnlocked: {
    color: "#1f2937",
  },
  achievementDescription: {
    fontSize: 13,
    color: "#9ca3af",
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
    backgroundColor: "#16a34a",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
  },
});
