
import React, { useState, useEffect, useCallback } from "react";
import { FilterBar } from "./FilterBar";
import { FoodCard } from "./FoodCard";
import { LoadingCard } from "./LoadingCard";
import type {
  FoodListing,
  FoodCategory,
  DistanceFilter,
  ExpirationFilter,
} from "../../types/listing";
import { supabase } from "../../lib/supabase";
import { LocationProvider, useLocation } from "../../context/LocationContext"; // Import the context

const ITEMS_PER_PAGE = 6;

// Helper function to calculate distance
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.floor(R * c); // Distance in km
}

export function ExploreListings() {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [foodType, setFoodType] = useState<FoodCategory>("all");
  const [distance, setDistance] = useState<DistanceFilter>("999");
  const [expiration, setExpiration] = useState<ExpirationFilter>("999");

  // Get user location from the LocationContext
  const { location } = useLocation();

  // Listings state
  const [listings, setListings] = useState<FoodListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<FoodListing[]>([]);
  const [displayedListings, setDisplayedListings] = useState<FoodListing[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // Fetch listings from API
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("food_listings")
          .select("*");
        if (error) throw error;

        if (data) {
          console.log("Fetched listings:", data);

          // Map fetched data to match frontend expectations
          const processedData = data.map((item) => {
            console.log("item: ", item);
            const expiresIn = item.expires_at
              ? `Expires in ${Math.max(
                  0,
                  Math.round(
                    (new Date(item.expires_at).getTime() - Date.now()) /
                      (1000 * 60 * 60)
                  )
                )} hours`
              : "Expires in 999 hours";

              console.log("location,lat: ", location.latitude);
              console.log("location,long: ", location.longitude);
              console.log("item.pickup_latitude: ", item.pickup_latitude);
              console.log("item.pickup_longitude: ", item.pickup_longitude);
              
              
              const distanceValue = calculateDistance(
                location.latitude!,
                location.longitude!,
                item.pickup_latitude,
                item.pickup_longitude
              );
              const it = {
                ...item,
                distance: distanceValue + " miles away" || "999 miles away",
                expiresIn,
                image:
                  item.images?.[0] ||
                  "https://via.placeholder.com/300?text=No+Image+Available",
                category: item.category || "unknown",
              };
              console.log("it: ", it);
            return it;
          });

          setListings(processedData);
        }
      } catch (error) {
        console.error(
          "Error fetching listings:",
          error instanceof Error ? error.message : error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    if (!location?.latitude || !location?.longitude) {
      console.log("Location not available");
      return;
    }

    let filtered = [...listings];

    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (listing) =>
          listing.title?.toLowerCase().includes(query) ||
          listing.category?.toLowerCase().includes(query)
      );
    }

    // Food Type Filter
    if (foodType !== "all") {
      filtered = filtered.filter(
        (listing) => listing.category?.toLowerCase() === foodType
      );
    }

    // Distance Filter
    filtered = filtered.filter((listing) => {
      const listingLatitude = listing.pickupLocation?.latitude || null;
      const listingLongitude = listing.pickupLocation?.longitude || null;

      // If no pickup location is available, include the listing
      if (!listingLatitude || !listingLongitude) return true;

      const distanceValue = calculateDistance(
        location.latitude!,
        location.longitude!,
        listingLatitude,
        listingLongitude
      );

      return !isNaN(distanceValue) && distanceValue <= parseFloat(distance);
    });

    // Expiration Filter
    filtered = filtered.filter((listing) => {
      const expiresAt = listing.expires_at
        ? new Date(listing.expires_at).getTime()
        : null;

      // Include listings without expiration or those not yet expired
      return expiresAt === null || expiresAt > Date.now();
    });

    setFilteredListings(filtered);

    // Display the first page of results
    setDisplayedListings(filtered.slice(0, ITEMS_PER_PAGE));
    setPage(1);
    setHasMore(filtered.length > ITEMS_PER_PAGE);
  }, [listings, searchQuery, foodType, distance, expiration, location]);

  // Load more items
  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    const newDisplayedListings = filteredListings.slice(0, end);

    setDisplayedListings(newDisplayedListings);
    setPage(nextPage);
    setHasMore(end < filteredListings.length);
  }, [page, filteredListings]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || loading) return;

      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (scrolledToBottom) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, loadMore]);

  return (
    <section className="bg-gray-50 min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Surplus Food Available Near You
        </h2>

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          foodType={foodType}
          onFoodTypeChange={setFoodType}
          distance={distance}
          onDistanceChange={setDistance}
          expiration={expiration}
          onExpirationChange={setExpiration}
        />

        {/* Grid Layout */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index: number) => (
              <LoadingCard key={index} />
            ))
          ) : displayedListings.length > 0 ? (
            displayedListings.map((listing) => (
              <FoodCard
                key={listing.id}
                title={listing.title}
                image={listing.image}
                distance={listing.distance}
                expiresIn={listing.expiresIn}
                category={listing.category}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-xl text-gray-600">
                No food available near you right now. Check back later or expand
                your search.
              </p>
            </div>
          )}
        </div>

        {!loading && hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
