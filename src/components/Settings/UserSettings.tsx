import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { supabase } from "../../lib/supabase";

interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string; // Added phone
  address: string; // Added address
}

export function UserSettings() {
  const { state } = useApp();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<Profile>({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: ''
  }); // Initialize with empty values

  useEffect(() => {
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
        setUpdatedProfile(data); // Initialize updatedProfile
      }
    };

    if (state.user) {
      fetchProfile();
    }
  }, [state.user]);

  const handleEdit = () => {
    if (profile) {
      setUpdatedProfile(profile); // Set updatedProfile to current profile
    }
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (updatedProfile) {
      const { error } = await supabase
        .from("profiles")
        .update(updatedProfile)
        .eq("id", state.user?.id ?? "");
      if (error) {
        console.error("Error updating profile:", error);
      } else {
        setProfile(updatedProfile);
        setIsEditing(false);
      }
    }
  };

  return (
    <div>
      {profile ? (
        <div>
          <h2>User Profile</h2>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={updatedProfile.name}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}
              />
              <input
                type="email"
                value={updatedProfile.email}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, email: e.target.value })}
              />
              <input
                type="text"
                value={updatedProfile.phone}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, phone: e.target.value })}
              />
              <input
                type="text"
                value={updatedProfile.address}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, address: e.target.value })}
              />
              <button onClick={handleSave}>Save Changes</button>
            </div>
          ) : (
            <div>
              <p>Name: {profile.name}</p>
              <p>Email: {profile.email}</p>
              <p>Phone: {profile.phone}</p> {/* Display phone */}
              <p>Address: {profile.address}</p> {/* Display address */}
              <button onClick={handleEdit}>Edit Profile</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
