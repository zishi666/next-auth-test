import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import NextAuth, { NextAuthOptions, Account, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import LinkedInProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

// export interface VerifiedAccount {
//   id: string | null;
//   name: string;
//   email: string;
//   profileUrl: string;
// }

// interface CustomToken extends JWT {
//   verifiedAccounts?: Record<string, VerifiedAccount>;
// }

// export interface CustomSession extends Session {
//   user: {
//     name?: string | null;
//     email?: string | null;
//     image?: string | null;
//     verifiedAccounts?: Record<string, VerifiedAccount>;
//   };
// }

// TikTok provider (custom)
const TikTokProvider = (options: OAuthUserConfig<any>): OAuthConfig<any> => ({
  id: "tiktok",
  name: "TikTok",
  type: "oauth",
  authorization: {
    url: "https://open-api.tiktok.com/platform/oauth/connect",
    params: {
      client_key: options.clientId,
      response_type: "code",
      scope: "user.info.basic",
      // redirect_uri: options.redirectUri,
    },
  },
  token: {
    url: "https://open-api.tiktok.com/oauth/access_token/",
    params: {
      client_key: process.env.TIKTOK_CLIENT_KEY,
      client_secret: process.env.TIKTOK_CLIENT_SECRET,
      grant_type: "authorization_code",
    },
  },
  userinfo: "https://open-api.tiktok.com/user/info/",
  profile(profile) {
    return {
      id: profile.data?.user?.id || null,
      name: profile.data?.user?.display_name || "",
      email: null, // TikTok API may not provide email
      image: profile.data?.user?.avatar_large || null,
    };
  },
  ...options,
});

// Telegram integration: use `telegram-login-widget` on the client side for Telegram login URL

export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      authorization: { params: { scope: "public_profile,email" } },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID as string,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
      version: "2.0",
    }),
    TikTokProvider({
      clientId: process.env.TIKTOK_CLIENT_ID as string,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET as string,
    }),
    // other Options
  ],
  debug: true,

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

    async jwt({ token, account, profile, user }) {
      console.log("JWT Callback - Account:", account);
      console.log("JWT Callback - Profile:", profile);
      console.log("USER is as - User:", user);
      // const customToken = token as CustomToken;

      if (account && profile) {
        const providerName = account.provider;

        console.log("Id condition inside the JWT Token Triggered..!=====>");

        token.id = profile.sub ?? null;
        token.name = profile.name ?? "";
        token.email = profile.email ?? "";
        token.profileUrl = "";

        // Set the profile URL based on provider
        switch (providerName) {
          case "twitter":
            token.profileUrl = `https://twitter.com/${
              (profile as any).username
            }`;
            break;
          case "linkedin":
            token.profileUrl = (profile as any).publicProfileUrl || "";
            break;
          case "facebook":
            token.profileUrl = `https://www.facebook.com/${account.id}`;
            break;
          case "instagram":
            token.profileUrl = `https://www.instagram.com/${account.id}`;
            break;
          case "google":
            token.profileUrl = `https://plus.google.com/${user.id}`;
            break;
          case "tiktok":
            token.profileUrl = `https://www.tiktok.com/@${
              (profile as any).unique_id
            }`;
            break;
          case "telegram":
            // Telegram does not follow traditional OAuth; set this based on user data obtained
            token.profileUrl = `https://t.me/${profile.name}`;
            break;
          default:
            token.profileUrl = "";
        }

        // // Initialize or update verifiedAccounts
        // customT.verifiedAccounts = customToken.verifiedAccounts || {};
        // customToken.verifiedAccounts[providerName] = verifiedAccount;
      }
      return token;
    },

    async session({ session, token }) {
      console.log("Session Callback - Token:", token);
      console.log("Session Callback = Session: ", session);
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
};

// Define the NextAuth handler
const handler = NextAuth(authOptions);

// Export named HTTP methods for the app router
export const GET = handler;
export const POST = handler;

// Redurect URI links

// https://yourdomain.com/api/auth/callback/{provider}
// https://yourdomain.com/api/auth/callback/facebook
// https://yourdomain.com/api/auth/callback/google
// https://yourdomain.com/api/auth/callback/instagram
// https://yourdomain.com/api/auth/callback/linkedin
// https://yourdomain.com/api/auth/callback/twitter
// https://yourdomain.com/api/auth/callback/tiktok

// Telegram is have diferent
// https://yourdomain.com/api/auth/telegram
