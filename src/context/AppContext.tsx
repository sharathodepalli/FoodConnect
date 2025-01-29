
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { User } from "../types/user";
import type { FoodListing } from "../types/listing";
import type { Notification } from "../hooks/useNotifications";

interface AppState {
  user: User | null;
  listings: {
    active: FoodListing[];
    past: FoodListing[];
  };
  analytics: {
    totalDonations: number;
    mealsServed: number;
    co2Saved: number;
    categoryBreakdown: Record<string, number>;
    recentActivity: {
      donations: number[];
      dates: string[];
    };
    environmentalStats: {
      waterSaved: number;
      energySaved: number;
      wasteDiverted: number;
    };
  };
  notifications: Notification[];
}

type Action =
  | { type: "SET_USER"; payload: User | null }
  | { type: "ADD_LISTING"; payload: FoodListing }
  | { type: "DELETE_LISTING"; payload: number }
  | { type: "MARK_AS_CLAIMED"; payload: number }
  | { type: "UPDATE_ANALYTICS"; payload: Partial<AppState["analytics"]> }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "REMOVE_NOTIFICATION"; payload: number }
  | { type: "CLEAR_ALL_NOTIFICATIONS" }
  | { type: "CLEAR_USER" };

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}
const STORAGE_KEY = "app_state";
const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState = (): AppState => {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    user: null,
    listings: {
      active: [],
      past: [],
    },
    analytics: {
      totalDonations: 0,
      mealsServed: 0,
      co2Saved: 0,
      categoryBreakdown: {},
      recentActivity: {
        donations: [],
        dates: [],
      },
      environmentalStats: {
        waterSaved: 0,
        energySaved: 0,
        wasteDiverted: 0,
      },
    },
    notifications: [],
  };
};

function appReducer(state: AppState, action: Action): AppState {
  let newState: AppState;
  switch (action.type) {
    case "SET_USER":
      newState = {
        ...state,
        user: action.payload,
      };
      break;
    case "ADD_LISTING":
      return {
        ...state,
        listings: {
          ...state.listings,
          active: [...state.listings.active, action.payload],
        },
      };
    case "DELETE_LISTING":
      return {
        ...state,
        listings: {
          ...state.listings,
          active: state.listings.active.filter(
            (listing) => listing.id !== action.payload
          ),
        },
      };
    case "MARK_AS_CLAIMED":
      const listing = state.listings.active.find(
        (l) => l.id === action.payload
      );
      if (!listing) return state;
      return {
        ...state,
        listings: {
          active: state.listings.active.filter((l) => l.id !== action.payload),
          past: [{ ...listing, expiresIn: "Claimed" }, ...state.listings.past],
        },
      };
    case "UPDATE_ANALYTICS":
      return {
        ...state,
        analytics: { ...state.analytics, ...action.payload },
      };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload
        ),
      };
    case "CLEAR_ALL_NOTIFICATIONS":
      return {
        ...state,
        notifications: [],
      };

    case "CLEAR_USER":
      return {
        ...state,
        user: null,
        listings: {
          active: [],
          past: [],
        },
      };
    default:
      return state;
  }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  return newState;
}

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState());

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profileError) throw profileError;

          if (profile) {
            const userData: User = {
              id: session.user.id,
              name: profile.full_name || "User",
              role: profile.role,
              avatar: profile.avatar_url,
              notifications: 0,
              email: profile.email,
              phone: profile.phone,
              address: profile.address,
              businessName: profile.business_name,
              businessType: profile.business_type,
              storageCapacity: profile.storage_capacity,
              operatingHours: profile.operating_hours,
              totalDonations: profile.total_donations,
              rating: profile.rating,
            };

            dispatch({ type: "SET_USER", payload: userData });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else if (event === "SIGNED_OUT") {
        dispatch({ type: "SET_USER", payload: null });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// export function useApp(): AppContextType {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useApp must be used within an AppProvider");
//   }
//   return context;
// }
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
}
