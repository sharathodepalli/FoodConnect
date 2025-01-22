// // src/components/Auth/SignUpForm.tsx
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
// import { Mail, Lock, User, Building } from "lucide-react";
// import type { UserRole } from "../../types/user";

// // Keep the same interface as useSupabaseAuth.ts
// interface SignUpFormData {
//   email: string;
//   password: string;
//   fullName: string;
//   role: UserRole;
//   phone: string | undefined;
//   address: string | undefined;
//   businessName: string | undefined;
//   businessType: string | undefined;
//   storageCapacity: string | undefined;
//   operatingHours: string | undefined;
// }

// export function SignUpForm() {
//   const navigate = useNavigate();
//   const { signUp } = useSupabaseAuth();
//   const [formData, setFormData] = useState<SignUpFormData>({
//     email: "",
//     password: "",
//     fullName: "",
//     role: "recipient",
//     phone: undefined,
//     address: undefined,
//     businessName: undefined,
//     businessType: undefined,
//     storageCapacity: undefined,
//     operatingHours: undefined,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.email.includes("@")) {
//       newErrors.email = "Please enter a valid email address";
//     }
//     if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters long";
//     }
//     if (formData.fullName.length < 2) {
//       newErrors.fullName = "Full name must be at least 2 characters long";
//     }
//     if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
//       newErrors.phone = "Please enter a valid phone number";
//     }
//     if (["restaurant", "mart"].includes(formData.role)) {
//       if (!formData.businessName) {
//         newErrors.businessName = "Business name is required";
//       }
//       if (!formData.address) {
//         newErrors.address = "Address is required";
//       }
//       if (!formData.operatingHours) {
//         newErrors.operatingHours = "Operating hours are required";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     try {
//       const result = await signUp(formData);
//       if (result.success) {
//         navigate("/signin", {
//           state: {
//             message:
//               "Account created successfully! Please sign in to continue.",
//             email: formData.email,
//           },
//         });
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Create your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Join FoodConnect and start making a difference
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             {/* Email Input */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email address
//               </label>
//               <div className="mt-1 relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   id="email"
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
//                     errors.email ? "border-red-300" : "border-gray-300"
//                   } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
//                   placeholder="you@example.com"
//                 />
//               </div>
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//               )}
//             </div>

//             {/* Password Input */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <div className="mt-1 relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   id="password"
//                   type="password"
//                   required
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                   className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
//                     errors.password ? "border-red-300" : "border-gray-300"
//                   } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
//                   placeholder="••••••••"
//                 />
//               </div>
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//               )}
//             </div>

//             {/* Full Name Input */}
//             <div>
//               <label
//                 htmlFor="fullName"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Full Name
//               </label>
//               <div className="mt-1 relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   id="fullName"
//                   type="text"
//                   required
//                   value={formData.fullName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, fullName: e.target.value })
//                   }
//                   className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
//                     errors.fullName ? "border-red-300" : "border-gray-300"
//                   } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
//                   placeholder="John Doe"
//                 />
//               </div>
//               {errors.fullName && (
//                 <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
//               )}
//             </div>

//             {/* Rest of your form fields remain the same */}
//             {/* ... Role Selection and Business Information ... */}
//           </div>

//           {/* Submit Button remains the same */}
//           <button
//             type="submit"
//             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Creating account..." : "Sign Up"}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link
//               to="/signin"
//               className="font-medium text-green-600 hover:text-green-500"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/Auth/SignUpForm.tsx
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
}

export function SignUpForm() {
  const navigate = useNavigate();
  const { signUp } = useSupabaseAuth();
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    fullName: "",
    role: "recipient",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (formData.fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters long";
    }
    if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (["restaurant", "mart"].includes(formData.role)) {
      if (!formData.businessName) {
        newErrors.businessName = "Business name is required";
      }
      if (!formData.address) {
        newErrors.address = "Address is required";
      }
      if (!formData.operatingHours) {
        newErrors.operatingHours = "Operating hours are required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const result = await signUp({
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        role: formData.role,
        phone: formData.phone,
        address: formData.address,
        business_name: formData.businessName,
        business_type: formData.businessType,
        storage_capacity: formData.storageCapacity,
        operating_hours: formData.operatingHours,
      });

      if (result.success) {
        navigate("/FoodConnect/signin", {
          state: {
            message:
              "Account created successfully! Please sign in to continue.",
            email: formData.email,
          },
        });
      } else {
        setErrors({ form: result.error || "An unexpected error occurred." });
      }
    } catch (error) {
      setErrors({ form: "Failed to create account. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join FoodConnect and start making a difference
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.form && (
            <div className="p-2 bg-red-50 text-red-700 rounded text-sm">
              {errors.form}
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Full Name Input */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                    errors.fullName ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
