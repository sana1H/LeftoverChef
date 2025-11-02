import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  category: string;
  icon: string;
  gradient: string[];
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
  gradient: string[];
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
      gradient: ["#a855f7", "#d946ef"],
      claimed: false,
    },
    {
      id: 2,
      title: "Restaurant Discount",
      description: "20% off at partner restaurants",
      points: 200,
      category: "Food & Beverage",
      icon: "restaurant",
      gradient: ["#ec4899", "#f472b6"],
      claimed: false,
    },
    {
      id: 3,
      title: "Grocery Voucher",
      description: "$10 off grocery shopping",
      points: 300,
      category: "Shopping",
      icon: "cart",
      gradient: ["#d946ef", "#f0abfc"],
      claimed: false,
    },
    {
      id: 4,
      title: "Movie Tickets",
      description: "2 free movie tickets",
      points: 400,
      category: "Entertainment",
      icon: "film",
      gradient: ["#8b5cf6", "#c084fc"],
      claimed: false,
    },
    {
      id: 5,
      title: "Spa Treatment",
      description: "Relaxation package",
      points: 500,
      category: "Wellness",
      icon: "flower",
      gradient: ["#f472b6", "#fb923c"],
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
      gradient: ["#a855f7", "#ec4899"],
    },
    {
      id: 2,
      title: "Generous Giver",
      description: "Donate 10 times",
      progress: 8,
      total: 10,
      unlocked: false,
      icon: "heart",
      gradient: ["#ec4899", "#f472b6"],
    },
    {
      id: 3,
      title: "Community Champion",
      description: "Help feed 100 people",
      progress: 68,
      total: 100,
      unlocked: false,
      icon: "people",
      gradient: ["#d946ef", "#f0abfc"],
    },
    {
      id: 4,
      title: "Consistency King",
      description: "Donate for 7 consecutive days",
      progress: 4,
      total: 7,
      unlocked: false,
      icon: "calendar",
      gradient: ["#8b5cf6", "#a855f7"],
    },
    {
      id: 5,
      title: "Ambassador",
      description: "Refer 5 friends",
      progress: 2,
      total: 5,
      unlocked: false,
      icon: "share-social",
      gradient: ["#f472b6", "#fb923c"],
    },
  ];

  const renderRewardsTab = () => (
    <View style={styles.tabContent}>
      {/* Points Balance Card */}
      <LinearGradient
        colors={["#a855f7", "#ec4899"]}
        style={styles.pointsCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.pointsOverlay}>
          <View style={styles.pointsContent}>
            <View style={styles.pointsLeft}>
              <Text style={styles.pointsLabel}>Your Balance</Text>
              <View style={styles.pointsValueRow}>
                <Ionicons name="star" size={40} color="#fde047" />
                <Text style={styles.pointsValue}>{currentPoints}</Text>
              </View>
              <Text style={styles.pointsSubtext}>
                Keep donating to earn more rewards!
              </Text>
            </View>
            <View style={styles.pointsIcon}>
              <Ionicons
                name="trophy"
                size={64}
                color="rgba(255, 255, 255, 0.3)"
              />
            </View>
          </View>
        </View>
        <View style={styles.pointsCircle1} />
        <View style={styles.pointsCircle2} />
      </LinearGradient>

      {/* How to Earn Points */}
      <View style={styles.earnSection}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="trending-up" size={20} color="#a855f7" /> How to Earn
          Points
        </Text>
        <View style={styles.earnGrid}>
          <LinearGradient
            colors={["#a855f7", "#d946ef"]}
            style={styles.earnCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.earnIcon}>
              <Ionicons name="add-circle" size={28} color="#fff" />
            </View>
            <Text style={styles.earnValue}>+10</Text>
            <Text style={styles.earnLabel}>Per Donation</Text>
          </LinearGradient>
          <LinearGradient
            colors={["#ec4899", "#f472b6"]}
            style={styles.earnCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.earnIcon}>
              <Ionicons name="checkmark-done" size={28} color="#fff" />
            </View>
            <Text style={styles.earnValue}>+50</Text>
            <Text style={styles.earnLabel}>Complete Profile</Text>
          </LinearGradient>
          <LinearGradient
            colors={["#d946ef", "#f0abfc"]}
            style={styles.earnCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.earnIcon}>
              <Ionicons name="share-social" size={28} color="#fff" />
            </View>
            <Text style={styles.earnValue}>+25</Text>
            <Text style={styles.earnLabel}>Refer Friend</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Available Rewards */}
      <View style={styles.rewardsSection}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="gift" size={20} color="#ec4899" /> Available Rewards
        </Text>
        {rewards.map((reward) => (
          <View key={reward.id} style={styles.rewardCard}>
            <LinearGradient
              colors={reward.gradient}
              style={styles.rewardIcon}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name={reward.icon as any} size={32} color="#fff" />
            </LinearGradient>
            <View style={styles.rewardContent}>
              <Text style={styles.rewardTitle}>{reward.title}</Text>
              <Text style={styles.rewardDescription}>{reward.description}</Text>
              <View style={styles.rewardFooter}>
                <View style={styles.rewardPoints}>
                  <Ionicons name="star" size={16} color="#fbbf24" />
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
              <LinearGradient
                colors={
                  currentPoints >= reward.points
                    ? ["#a855f7", "#ec4899"]
                    : ["#e9d5ff", "#fbcfe8"]
                }
                style={styles.redeemGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons
                  name={
                    currentPoints >= reward.points
                      ? "checkmark-circle"
                      : "lock-closed"
                  }
                  size={18}
                  color={currentPoints >= reward.points ? "#fff" : "#c084fc"}
                />
                <Text
                  style={[
                    styles.redeemButtonText,
                    currentPoints < reward.points &&
                      styles.redeemButtonTextDisabled,
                  ]}
                >
                  {currentPoints >= reward.points ? "Redeem" : "Locked"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAchievementsTab = () => (
    <View style={styles.tabContent}>
      {/* Progress Overview */}
      <LinearGradient
        colors={["#a855f7", "#ec4899"]}
        style={styles.progressOverview}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.overviewTitle}>
          <Ionicons name="trophy" size={20} color="#fff" /> Your Progress
        </Text>
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
      </LinearGradient>

      {/* Achievements List */}
      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="medal" size={20} color="#d946ef" /> Achievements
        </Text>
        {achievements.map((achievement) => (
          <View
            key={achievement.id}
            style={[
              styles.achievementCard,
              achievement.unlocked && styles.achievementCardUnlocked,
            ]}
          >
            <LinearGradient
              colors={
                achievement.unlocked
                  ? achievement.gradient
                  : ["#fae8ff", "#fce7f3"]
              }
              style={styles.achievementIcon}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons
                name={achievement.icon as any}
                size={36}
                color={achievement.unlocked ? "#fff" : "#d8b4fe"}
              />
              {achievement.unlocked && (
                <View style={styles.achievementBadge}>
                  <Ionicons name="checkmark" size={14} color="#fde047" />
                </View>
              )}
            </LinearGradient>
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
                  <View style={styles.unlockedBadge}>
                    <Text style={styles.unlockedText}>Unlocked</Text>
                  </View>
                )}
              </View>
              <Text style={styles.achievementDescription}>
                {achievement.description}
              </Text>
              {!achievement.unlocked && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <LinearGradient
                      colors={achievement.gradient}
                      style={[
                        styles.progressFill,
                        {
                          width: `${
                            (achievement.progress / achievement.total) * 100
                          }%`,
                        },
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
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
              <Ionicons name="star" size={36} color="#fff" />
            </View>
            <Text style={styles.headerTitle}>Rewards Hub</Text>
            <Text style={styles.headerSubtitle}>
              Track your impact and claim amazing rewards
            </Text>
          </View>
          <View style={styles.headerCircle1} />
          <View style={styles.headerCircle2} />
        </LinearGradient>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "rewards" && styles.tabActive]}
            onPress={() => setSelectedTab("rewards")}
          >
            {selectedTab === "rewards" && (
              <LinearGradient
                colors={["#a855f7", "#ec4899"]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            )}
            <Ionicons
              name="gift"
              size={20}
              color={selectedTab === "rewards" ? "#fff" : "#a855f7"}
            />
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
            {selectedTab === "achievements" && (
              <LinearGradient
                colors={["#a855f7", "#ec4899"]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            )}
            <Ionicons
              name="trophy"
              size={20}
              color={selectedTab === "achievements" ? "#fff" : "#ec4899"}
            />
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
    width: 72,
    height: 72,
    borderRadius: 36,
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
    fontSize: 15,
    color: "#fff",
    opacity: 0.95,
    textAlign: "center",
  },
  headerCircle1: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  headerCircle2: {
    position: "absolute",
    bottom: -40,
    left: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#faf5ff",
    margin: 20,
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
    borderColor: "#e9d5ff",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
    overflow: "hidden",
  },
  tabActive: {},
  tabText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#a855f7",
  },
  tabTextActive: {
    color: "#fff",
  },
  tabContent: {
    padding: 20,
    paddingTop: 0,
  },
  pointsCard: {
    borderRadius: 28,
    padding: 28,
    marginBottom: 28,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
    overflow: "hidden",
    position: "relative",
  },
  pointsOverlay: {
    zIndex: 1,
  },
  pointsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointsLeft: {
    flex: 1,
  },
  pointsLabel: {
    fontSize: 15,
    color: "#fff",
    opacity: 0.95,
    marginBottom: 12,
    fontWeight: "600",
  },
  pointsValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  pointsValue: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#fff",
  },
  pointsSubtext: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
  },
  pointsIcon: {
    marginLeft: 20,
  },
  pointsCircle1: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  pointsCircle2: {
    position: "absolute",
    bottom: -50,
    left: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  earnSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 19,
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
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  earnIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  earnValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  earnLabel: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    opacity: 0.95,
    fontWeight: "600",
  },
  rewardsSection: {
    marginBottom: 32,
  },
  rewardCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: "#fae8ff",
  },
  rewardIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  rewardContent: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#7e22ce",
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 13,
    color: "#a855f7",
    marginBottom: 10,
  },
  rewardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rewardPoints: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rewardPointsText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#f59e0b",
  },
  rewardCategory: {
    fontSize: 11,
    color: "#c084fc",
    fontWeight: "600",
  },
  redeemButton: {
    marginLeft: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
  redeemGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  redeemButtonDisabled: {},
  redeemButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  redeemButtonTextDisabled: {
    color: "#c084fc",
  },
  progressOverview: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
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
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  overviewLabel: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.95,
    fontWeight: "600",
  },
  overviewDivider: {
    width: 2,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  achievementsSection: {
    marginBottom: 32,
  },
  achievementCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    opacity: 0.6,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: "#fae8ff",
  },
  achievementCardUnlocked: {
    opacity: 1,
    borderColor: "#e9d5ff",
    backgroundColor: "#faf5ff",
  },
  achievementIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    position: "relative",
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  achievementBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#7e22ce",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  achievementContent: {
    flex: 1,
  },
  achievementHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  achievementTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#d8b4fe",
    flex: 1,
  },
  achievementTitleUnlocked: {
    color: "#7e22ce",
  },
  unlockedBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  unlockedText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#15803d",
  },
  achievementDescription: {
    fontSize: 13,
    color: "#c084fc",
    marginBottom: 14,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: "#fae8ff",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
  progressText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#a855f7",
  },
});
