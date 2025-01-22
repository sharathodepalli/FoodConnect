// src/components/Settings/UserSettings.tsx
import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { supabase } from "../../lib/supabase";

interface Profile {
  id: string;
  name: string;
  email: string;
  // Add more fields as needed
}

export function UserSettings() {
  const { state } = useApp();
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    // Fetch user profile from supabase and set it to profile state
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", state.user?.id ?? "")
        .single();
      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
      }
    };

    if (state.user) {
      fetchProfile();
    }
  }, [state.user]);

  return (
    <div>
      {profile ? (
        <div>
          <h2>User Profile</h2>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          {/* Add more profile fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
