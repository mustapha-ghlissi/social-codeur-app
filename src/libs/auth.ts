import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from 'jwt-decode';
import { API_GET_MANAGED_RESTAURANTS_URL, API_LOGIN_REFRESH_URL, API_LOGIN_URL, API_ME_URL, axiosInstance } from "@/lib/api";

declare module "next-auth" {
  interface Session {
    accessToken: string
    refreshToken: string
    user: any
    firstLogin?: boolean
  }

  interface User {
    accessToken: string
    refreshToken: string
    firstLogin: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string
    refreshToken: string
    accessTokenExpiresAt: number
    user: any
    firstLogin?: boolean
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin"
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          // check to see if eamil and password is there
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please enter an email or password");
          }

          const authResponse = await axiosInstance.post(API_LOGIN_URL, credentials);

          if (authResponse.status === 200) {
            const { access_token, refresh_token } = authResponse.data;

            const getUserResponse = await axiosInstance.get(API_ME_URL, {
              headers: {
                Authorization: `Bearer ${access_token}`
              }
            });

            const getRestaurantResponse = await axiosInstance.get(API_GET_MANAGED_RESTAURANTS_URL, {
              headers: {
                Authorization: `Bearer ${access_token}`
              }
            });

            const restaurant = getRestaurantResponse.data.data[0];

            if (getUserResponse.status === 200) {
              return {
                ...getUserResponse.data.user,
                accessToken: access_token,
                refreshToken: refresh_token,
                restaurant: {
                  id: restaurant.id,
                  name_ar: restaurant.name_ar,
                  name_en: restaurant.name_en,
                  name_fr: restaurant.fr,
                  picture: restaurant.picture,
                  email: restaurant.email,
                  phone: restaurant.phone,
                  status: restaurant.status,
                  online_status: restaurant.online_status,
                  offline_for: restaurant.offline_for,
                  open_days: restaurant.open_days,
                },
                firstLogin: true,
              };
            }

            return null;
          }

          return null;
        }
        catch (error: any) {
          console.error('Authentication error:', error.response?.data || error.message)
          return null
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        const { exp }: { exp: number } = jwtDecode(user.accessToken);

        return {
          ...token,
          user,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpiresAt: exp * 1000,
        }
      }

      if (token.firstLogin) {
        token.firstLogin = false;
      }
      else if (token.user.firstLogin) {
        token.firstLogin = true;

        token.user = {
          ...token.user,
          firstLogin: false,
        }
      }

      // Return previous token if the access token has not expired
      if (Date.now() < token.accessTokenExpiresAt) {
        return token
      }

      // Access token has expired, refresh it
      const refreshedToken = await refreshAccessToken(token);

      return refreshedToken;
    },

    async session({ session, token }: any) {
      if (token) {
        session.user = token.user
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
        session.firstLogin = token.firstLogin

        if (token.error) {
          session.error = token.error
        }
      }

      return session;
    }
  },
  //debug: process.env.NODE_ENV === "developement",
};

export const getAuthSession = async () => {
  return getServerSession(authOptions);
};

// Function to refresh access token
async function refreshAccessToken(token: any) {
  try {
    const response = await axiosInstance.post(API_LOGIN_REFRESH_URL, {
      refresh_token: token.refreshToken
    })
    const { access_token, refresh_token } = response.data
    const { exp }: { exp: number } = jwtDecode(access_token);

    return {
      ...token,
      accessToken: access_token,
      refreshToken: refresh_token,
      accessTokenExpiresAt: exp * 1000
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}