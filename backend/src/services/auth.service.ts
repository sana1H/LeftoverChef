// // import User, { IUser } from '../models/User';
// import jwt from 'jsonwebtoken';

// interface SignUpData {
//   name: string;
//   email: string;
//   password: string;
// }

// interface SignInData {
//   email: string;
//   password: string;
// }

// interface AuthResponse {
//   success: boolean;
//   user?: IUser;
//   token?: string;
//   message?: string;
// }

// export class AuthService {
//   /**
//    * Register new user
//    */
//   static async signUp(userData: SignUpData): Promise<AuthResponse> {
//     try {
//       // Check if user already exists
//       const existingUser = await User.findOne({ email: userData.email });
//       if (existingUser) {
//         return {
//           success: false,
//           message: 'User already exists with this email'
//         };
//       }

//       // Create user
//       const user = await User.create(userData);

//       // Generate JWT token
//       const token = this.generateToken(user._id);

//       return {
//         success: true,
//         user: this.sanitizeUser(user),
//         token
//       };
//     } catch (error: any) {
//       console.error('SignUp Error:', error);
//       return {
//         success: false,
//         message: error.message || 'Failed to create user'
//       };
//     }
//   }

//   /**
//    * Sign in user
//    */
//   static async signIn(credentials: SignInData): Promise<AuthResponse> {
//     try {
//       // Check if user exists and password is correct
//       const user = await User.findOne({ email: credentials.email }).select('+password');
      
//       if (!user) {
//         return {
//           success: false,
//           message: 'Invalid credentials'
//         };
//       }

//       // Check if user is active
//       if (!user.isActive) {
//         return {
//           success: false,
//           message: 'Account is deactivated'
//         };
//       }

//       // Check password
//       const isPasswordMatch = await user.comparePassword(credentials.password);
//       if (!isPasswordMatch) {
//         return {
//           success: false,
//           message: 'Invalid credentials'
//         };
//       }

//       // Update last login
//       await user.updateLastLogin();

//       // Generate JWT token
//       const token = this.generateToken(user._id);

//       return {
//         success: true,
//         user: this.sanitizeUser(user),
//         token
//       };
//     } catch (error: any) {
//       console.error('SignIn Error:', error);
//       return {
//         success: false,
//         message: error.message || 'Failed to sign in'
//       };
//     }
//   }

//   /**
//    * Get current user profile
//    */
//   static async getCurrentUser(userId: string): Promise<AuthResponse> {
//     try {
//       const user = await User.findById(userId);
      
//       if (!user) {
//         return {
//           success: false,
//           message: 'User not found'
//         };
//       }

//       return {
//         success: true,
//         user: this.sanitizeUser(user)
//       };
//     } catch (error: any) {
//       console.error('Get User Error:', error);
//       return {
//         success: false,
//         message: error.message || 'Failed to get user'
//       };
//     }
//   }

//   /**
//    * Generate JWT token
//    */
//   private static generateToken(userId: any): string {
//     return jwt.sign(
//       { id: userId },
//       process.env.JWT_SECRET!,
//       { expiresIn: process.env.JWT_EXPIRE }
//     );
//   }

//   /**
//    * Remove sensitive data from user object
//    */
//   private static sanitizeUser(user: IUser): any {
//     const userObj = user.toObject();
//     delete userObj.password;
//     return userObj;
//   }
// }


import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";

// ... other imports and interfaces

export class AuthService {
  // ... other methods

  /**
   * Generate JWT token - Updated with your JWT config
   */
  private static generateToken(userId: any): string {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || "30d" } // Using your 30d expiry
    );
  }

  // ... rest of the methods
}