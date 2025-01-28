// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { User, Settings, Bell, Lock, HelpCircle, Trash2 } from "lucide-react";
// import { useApp } from "../../context/AppContext";

// enum TabContent {
//   PROFILE = "Profile",
//   SETTINGS = "Settings",
//   HELP = "Help",
// }

// export function SettingsPage() {
//   const { state } = useApp();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState(TabContent.PROFILE);
//   const [notificationsEnabled, setNotificationsEnabled] = useState(true);

//   // Set initial active tab based on path
//   useEffect(() => {
//     const path = location.pathname;
//     if (path === "/settings") {
//       setActiveTab(TabContent.SETTINGS);
//     } else if (path === "/help") {
//       setActiveTab(TabContent.HELP);
//     } else {
//       setActiveTab(TabContent.PROFILE);
//     }
//   }, [location.pathname]);

//   // Handle tab changes and update URL
//   const handleTabChange = (tab: TabContent) => {
//     setActiveTab(tab);
//     switch (tab) {
//       case TabContent.SETTINGS:
//         navigate("/settings");
//         break;
//       case TabContent.HELP:
//         navigate("/help");
//         break;
//       default:
//         navigate("/profile");
//     }
//   };

//   function renderContent(): React.ReactNode {
//     switch (activeTab) {
//       case TabContent.SETTINGS:
//         return <div>Settings Content</div>;
//       case TabContent.HELP:
//         return <div>Help Content</div>;
//       case TabContent.PROFILE:
//       default:
//         return <div>Profile Content</div>;
//     }
//   }
//   // ... rest of your Settings component code remains the same ...

//   return (
//     <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
//       <div className="flex space-x-4 border-b border-gray-200 mb-6">
//         {Object.values(TabContent).map((tab) => (
//           <button
//             key={tab}
//             onClick={() => handleTabChange(tab)}
//             className={`pb-2 px-1 text-sm font-medium border-b-2 ${
//               activeTab === tab
//                 ? "border-green-600 text-green-600"
//                 : "border-transparent text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>
//       {renderContent()}
//     </div>
//   );
// }
