import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { ExploreListings } from './components/Listings/ExploreListings';
import { ListingDetails } from './components/ListingDetails/ListingDetails';
import { RestaurantDashboard } from './components/Dashboard/RestaurantDashboard';
import { IndividualDashboard } from './components/Dashboard/IndividualDashboard';
import { MartDashboard } from './components/Dashboard/MartDashboard';
import { HowItWorks } from './components/HowItWorks/HowItWorks';
import { VolunteerPage } from './components/Volunteer/VolunteerPage';
import { VolunteerDashboard } from './components/Volunteer/VolunteerDashboard';
import { AboutPage } from './components/About/AboutPage';
import { ContactPage } from './components/Contact/ContactPage';
import { AnalyticsPage } from './components/Analytics/AnalyticsPage';
import { SignUpForm } from './components/Auth/SignUpForm';
import { FoodConnectBasesPage } from './components/FoodConnectBases/FoodConnectBasesPage';

function HomePage() {
  return (
    <>
      <Hero />
      <ExploreListings />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExploreListings />} />
          <Route path="/listings/:id" element={<ListingDetails />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/foodconnect-bases" element={<FoodConnectBasesPage />} />
          
          {/* Role-specific routes */}
          <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
          <Route path="/mart/dashboard" element={<MartDashboard />} />
          <Route path="/individual/dashboard" element={<IndividualDashboard />} />
          <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;