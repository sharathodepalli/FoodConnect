import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { Mail, Lock, User } from "lucide-react";
import type { UserRole } from "../../types/user";

interface SignUpFormData {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  address?: string;
  businessName?: string;
  businessType?: string;
  storageCapacity?: string;
  operatingHours?: string;
  avatarUrl?: string | null;
}

export function SignUpForm() {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    fullName: "",
    role: "recipient",
    phone: "",
    address: "",
    businessName: "",
    businessType: "",
    storageCapacity: "",
    operatingHours: "",
  });

  const navigate = useNavigate();
  const { signUp } = useSupabaseAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.fullName.length < 2) {
      setError("Full name must be at least 2 characters long");
      setLoading(false);
      return;
    }

    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role,
        phone: formData.phone,
        address: formData.address,
        businessName: formData.businessName,
        businessType: formData.businessType,
        storageCapacity: formData.storageCapacity,
        operatingHours: formData.operatingHours,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                className="pl-10 w-full p-2 border rounded"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                required
                className="pl-10 w-full p-2 border rounded"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                minLength={2}
                className="pl-10 w-full p-2 border rounded"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Role</label>
            <div className="relative">
              <select
                required
                className="w-full p-2 border rounded"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value as UserRole })
                }
              >
                <option value="recipient">Recipient</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1">Phone (Optional)</label>
            <input
              type="tel"
              className="w-full p-2 border rounded"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-1">Address (Optional)</label>
            <textarea
              className="w-full p-2 border rounded"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          {formData.role === "volunteer" && (
            <>
              <div>
                <label className="block mb-1">Business Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-1">Business Type</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.businessType}
                  onChange={(e) =>
                    setFormData({ ...formData, businessType: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-1">Storage Capacity</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.storageCapacity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      storageCapacity: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block mb-1">Operating Hours</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.operatingHours}
                  onChange={(e) =>
                    setFormData({ ...formData, operatingHours: e.target.value })
                  }
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:text-blue-600">
          Log in
        </Link>
      </p>
    </div>
  );
}
