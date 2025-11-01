import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.Kind.LeftoverChef",
  projectId: "68fbf3bc0020d649df03",
  databaseId: "68fbf6d80028f464b4fa",
  userCollectionId: "68fbf6d80028f464b4fa",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);

// Get current user
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("No user logged in");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
      // Query to find user by accountId
    );

    if (!currentUser.documents.length)
      throw new Error("User not found in database");

    return currentUser.documents[0];
  } catch (error: any) {
    console.log("Get current user error:", error);
    return null;
  }
};

// Sign Out
export const signOut = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error: any) {
    throw new Error(error.message || "Sign-out failed");
  }
};

// Create User
export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    // First, create the account
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) throw new Error("Account creation failed");

    // Get avatar URL
    const avatarUrl = avatars.getInitials(name);

    // Create user document in database
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        name: name,
        avatar: avatarUrl.toString(),
      }
    );

    // Now sign in the user automatically
    await signIn({ email, password });

    return newUser;
  } catch (error: any) {
    console.log("Create user error:", error);

    // If error is "user already exists", try to sign them in
    if (error.message?.includes("user") && error.message?.includes("already")) {
      throw new Error(
        "A user with this email already exists. Please sign in instead."
      );
    }

    throw new Error(
      error.message || "Something went wrong while creating user"
    );
  }
};

// Sign In
export const signIn = async ({ email, password }: SignInParams) => {
  try {
    // Check if there's already an active session
    try {
      const currentSession = await account.get();
      if (currentSession) {
        // Delete existing session before creating new one
        await account.deleteSession("current");
      }
    } catch (e) {
      // No active session, which is fine
    }

    // Create new session
    const session = await account.createEmailPasswordSession(email, password);

    if (!session) throw new Error("Failed to create session");

    return session;
  } catch (error: any) {
    console.log("Sign-in error:", error);

    if (error.message?.includes("Invalid credentials")) {
      throw new Error("Invalid email or password");
    }

    throw new Error(error.message || "Sign-in failed");
  }
};
