// src/App.tsx
import { useState, useEffect, ReactNode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { ExploreListings } from "./components/Listings/ExploreListings";
//import { ListingDetails } from "./components/ListingDetails/ListingDetails";
import { RestaurantDashboard } from "./components/Dashboard/RestaurantDashboard";
import { IndividualDashboard } from "./components/Dashboard/IndividualDashboard";
import { MartDashboard } from "./components/Dashboard/MartDashboard";
import { HowItWorks } from "./components/HowItWorks/HowItWorks";
import { VolunteerPage } from "./components/Volunteer/VolunteerPage";
import { VolunteerDashboard } from "./components/Volunteer/VolunteerDashboard";
import { AboutPage } from "./components/About/AboutPage";
import { ContactPage } from "./components/Contact/ContactPage";
import { AnalyticsPage } from "./components/Analytics/AnalyticsPage";
import { SignUpForm } from "./components/Auth/SignUpForm";
import { SignInPage } from "./components/Auth/SignInPage";
import { FoodConnectBasesPage } from "./components/FoodConnectBases/FoodConnectBasesPage";
import { AppProvider, useApp } from "./context/AppContext";
import { LocationProvider } from "./context/LocationContext";
import { UserSettings } from "./components/Settings/UserSettings";

function HomePage() {
  return (
    <>
      <Hero />
      <ExploreListings />
    </>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { state } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return state.user ? (
    <>{children}</>
  ) : (
    <Navigate to="/FoodConnect/signin" replace />
  );
}

function RoleDashboard() {
  const { role } = useParams<{ role: string }>();
  const { state } = useApp();

  if (state.user && state.user.role !== role) {
    return <Navigate to="/" replace />;
  }

  switch (role) {
    case "restaurant":
      return <RestaurantDashboard />;
    case "mart":
      return <MartDashboard />;
    case "individual":
      return <IndividualDashboard />;
    case "volunteer":
      return <VolunteerDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
}

function App() {
  return (
    <AppProvider>
      <LocationProvider>
        <Router basename="/FoodConnect">
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExploreListings />} />
              {/* <Route path="/listings/:id" element={<ListingDetails />} /> */}
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route
                path="/foodconnect-bases"
                element={<FoodConnectBasesPage />}
              />

              {/* Role-specific routes */}
              <Route
                path="/:role/dashboard"
                element={
                  <ProtectedRoute>
                    <RoleDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/analytics" element={<AnalyticsPage />} />

              {/* Protected settings route */}
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <UserSettings />
                  </ProtectedRoute>
                }
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </LocationProvider>
    </AppProvider>
  );
}

export default App;
