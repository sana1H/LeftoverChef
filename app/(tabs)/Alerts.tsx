import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface Notification {
  id: number;
  type: "pickup" | "delivery" | "reward" | "update";
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
  gradient: string[];
}

export default function Alerts() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "pickup",
      title: "Pickup Scheduled",
      message: "Hope Foundation will pick up your donation at 3:00 PM today.",
      time: "10 mins ago",
      read: false,
      icon: "car",
      gradient: ["#a855f7", "#d946ef"],
    },
    {
      id: 2,
      type: "delivery",
      title: "Donation Delivered",
      message:
        "Your 15 meals were successfully delivered to Care Center. 45 people fed!",
      time: "2 hours ago",
      read: false,
      icon: "checkmark-circle",
      gradient: ["#ec4899", "#f472b6"],
    },
    {
      id: 3,
      type: "reward",
      title: "New Reward Unlocked!",
      message:
        "Congratulations! You've earned 50 points. Check your rewards section.",
      time: "5 hours ago",
      read: true,
      icon: "gift",
      gradient: ["#f472b6", "#fb923c"],
    },
    {
      id: 4,
      type: "update",
      title: "Monthly Impact Report",
      message:
        "This month you've donated 120 meals and helped 360 people. Amazing work!",
      time: "1 day ago",
      read: true,
      icon: "bar-chart",
      gradient: ["#8b5cf6", "#a855f7"],
    },
    {
      id: 5,
      type: "pickup",
      title: "Pickup Reminder",
      message:
        "Seva Trust is scheduled to pick up your donation tomorrow at 4:00 PM.",
      time: "1 day ago",
      read: true,
      icon: "time",
      gradient: ["#d946ef", "#ec4899"],
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const filteredNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

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
            <View style={styles.headerTop}>
              <View>
                <View style={styles.headerIconRow}>
                  <View style={styles.bellContainer}>
                    <Ionicons name="notifications" size={28} color="#fff" />
                    {unreadCount > 0 && (
                      <View style={styles.bellBadge}>
                        <Text style={styles.bellBadgeText}>{unreadCount}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.headerTitle}>Notifications</Text>
                </View>
                <Text style={styles.headerSubtitle}>
                  {unreadCount} unread notification
                  {unreadCount !== 1 ? "s" : ""}
                </Text>
              </View>
              {unreadCount > 0 && (
                <TouchableOpacity
                  style={styles.markAllButton}
                  onPress={markAllAsRead}
                >
                  <Ionicons name="checkmark-done" size={18} color="#a855f7" />
                  <Text style={styles.markAllText}>Mark all</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />
        </LinearGradient>

        {/* Filters */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "all" && styles.filterButtonActive,
            ]}
            onPress={() => setFilter("all")}
          >
            {filter === "all" && (
              <LinearGradient
                colors={["#a855f7", "#ec4899"]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            )}
            <Ionicons
              name="albums"
              size={18}
              color={filter === "all" ? "#fff" : "#a855f7"}
            />
            <Text
              style={[
                styles.filterText,
                filter === "all" && styles.filterTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "unread" && styles.filterButtonActive,
            ]}
            onPress={() => setFilter("unread")}
          >
            {filter === "unread" && (
              <LinearGradient
                colors={["#a855f7", "#ec4899"]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            )}
            <Ionicons
              name="mail-unread"
              size={18}
              color={filter === "unread" ? "#fff" : "#ec4899"}
            />
            <Text
              style={[
                styles.filterText,
                filter === "unread" && styles.filterTextActive,
              ]}
            >
              Unread ({unreadCount})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notifications Settings */}
        <View style={styles.settingsCard}>
          <View style={styles.settingsHeader}>
            <Ionicons name="settings" size={20} color="#a855f7" />
            <Text style={styles.settingsTitle}>Notification Settings</Text>
          </View>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <LinearGradient
                colors={["#a855f7", "#d946ef"]}
                style={styles.settingIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="notifications" size={20} color="#fff" />
              </LinearGradient>
              <Text style={styles.settingLabel}>Push Notifications</Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: "#e9d5ff", true: "#f0abfc" }}
              thumbColor={pushEnabled ? "#a855f7" : "#faf5ff"}
            />
          </View>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <LinearGradient
                colors={["#ec4899", "#f472b6"]}
                style={styles.settingIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="mail" size={20} color="#fff" />
              </LinearGradient>
              <Text style={styles.settingLabel}>Email Notifications</Text>
            </View>
            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              trackColor={{ false: "#e9d5ff", true: "#f0abfc" }}
              thumbColor={emailEnabled ? "#ec4899" : "#faf5ff"}
            />
          </View>
        </View>

        {/* Notifications List */}
        <View style={styles.notificationsList}>
          {filteredNotifications.length === 0 ? (
            <View style={styles.emptyState}>
              <LinearGradient
                colors={["#fae8ff", "#fce7f3"]}
                style={styles.emptyIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons
                  name="notifications-off-outline"
                  size={48}
                  color="#d8b4fe"
                />
              </LinearGradient>
              <Text style={styles.emptyTitle}>All caught up!</Text>
              <Text style={styles.emptySubtitle}>
                You have no {filter === "unread" ? "unread" : ""} notifications
              </Text>
            </View>
          ) : (
            filteredNotifications.map((notif) => (
              <TouchableOpacity
                key={notif.id}
                style={[
                  styles.notificationCard,
                  !notif.read && styles.notificationCardUnread,
                ]}
                onPress={() => markAsRead(notif.id)}
              >
                <LinearGradient
                  colors={notif.gradient}
                  style={styles.notificationIcon}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name={notif.icon as any} size={24} color="#fff" />
                </LinearGradient>
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle}>{notif.title}</Text>
                    {!notif.read && (
                      <View style={styles.unreadDot}>
                        <LinearGradient
                          colors={["#a855f7", "#ec4899"]}
                          style={StyleSheet.absoluteFill}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                        />
                      </View>
                    )}
                  </View>
                  <Text style={styles.notificationMessage}>
                    {notif.message}
                  </Text>
                  <View style={styles.notificationFooter}>
                    <Ionicons name="time-outline" size={14} color="#c084fc" />
                    <Text style={styles.notificationTime}>{notif.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.quickActionsTitle}>
            <Ionicons name="flash" size={20} color="#a855f7" /> Quick Actions
          </Text>
          <TouchableOpacity style={styles.actionCard}>
            <LinearGradient
              colors={["#a855f7", "#ec4899"]}
              style={styles.actionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.actionContent}>
                <View style={styles.actionIcon}>
                  <Ionicons name="add-circle" size={28} color="#fff" />
                </View>
                <View style={styles.actionText}>
                  <Text style={styles.actionTitle}>Create New Donation</Text>
                  <Text style={styles.actionSubtitle}>
                    Share your surplus food
                  </Text>
                </View>
              </View>
              <Ionicons name="arrow-forward-circle" size={28} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <LinearGradient
              colors={["#ec4899", "#f472b6"]}
              style={styles.actionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.actionContent}>
                <View style={styles.actionIcon}>
                  <Ionicons name="gift" size={28} color="#fff" />
                </View>
                <View style={styles.actionText}>
                  <Text style={styles.actionTitle}>View Rewards</Text>
                  <Text style={styles.actionSubtitle}>
                    Check your earned points
                  </Text>
                </View>
              </View>
              <Ionicons name="arrow-forward-circle" size={28} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
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
    padding: 24,
    paddingTop: 48,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
    position: "relative",
  },
  headerContent: {
    zIndex: 1,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 8,
  },
  bellContainer: {
    position: "relative",
  },
  bellBadge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#fde047",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },
  bellBadgeText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#7e22ce",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#fff",
    opacity: 0.95,
    marginTop: 4,
  },
  markAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  markAllText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#a855f7",
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
    bottom: -40,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  filterContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e9d5ff",
    backgroundColor: "#faf5ff",
    gap: 8,
    overflow: "hidden",
  },
  filterButtonActive: {
    borderColor: "#a855f7",
  },
  filterText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#a855f7",
  },
  filterTextActive: {
    color: "#fff",
  },
  settingsCard: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 24,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 2,
    borderColor: "#fae8ff",
  },
  settingsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  settingsTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#7e22ce",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#fae8ff",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  settingLabel: {
    fontSize: 15,
    color: "#7e22ce",
    fontWeight: "600",
  },
  notificationsList: {
    padding: 20,
    paddingTop: 0,
  },
  notificationCard: {
    flexDirection: "row",
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: "#fae8ff",
  },
  notificationCardUnread: {
    borderLeftWidth: 5,
    borderLeftColor: "#a855f7",
    backgroundColor: "#faf5ff",
  },
  notificationIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7e22ce",
    flex: 1,
  },
  unreadDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 10,
    overflow: "hidden",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#a855f7",
    marginBottom: 10,
    lineHeight: 20,
  },
  notificationFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: "#c084fc",
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 60,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#7e22ce",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#c084fc",
    textAlign: "center",
  },
  quickActions: {
    padding: 20,
    paddingTop: 0,
  },
  quickActionsTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#7e22ce",
    marginBottom: 16,
  },
  actionCard: {
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  actionGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  actionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.95,
  },
});
