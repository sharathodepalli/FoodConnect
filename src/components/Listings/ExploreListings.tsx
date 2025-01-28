// import React, { useState, useEffect, useCallback } from 'react';
// import { FilterBar } from './FilterBar';
// import { FoodCard } from './FoodCard';
// import { LoadingCard } from './LoadingCard';
// import type { FoodListing, FoodCategory, DistanceFilter, ExpirationFilter } from '../../types/listing';

// // Mock data for food listings
// const mockListings = [
//   {
//     id: 1,
//     title: "Fresh Artisan Bread Assortment",
//     image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
//     distance: "1.2 miles away",
//     expiresIn: "Expires in 2 hours",
//     category: "bakery"
//   },
//   {
//     id: 2,
//     title: "Organic Fruit Basket",
//     image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
//     distance: "0.8 miles away",
//     expiresIn: "Expires in 4 hours",
//     category: "fruits"
//   },
//   {
//     id: 3,
//     title: "Restaurant Surplus Meals",
//     image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
//     distance: "2.1 miles away",
//     expiresIn: "Expires in 1 hour",
//     category: "meals"
//   },
//   {
//     id: 4,
//     title: "Fresh Vegetables Mix",
//     image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
//     distance: "1.5 miles away",
//     expiresIn: "Expires in 3 hours",
//     category: "vegetables"
//   },
//   {
//     id: 5,
//     title: "Pastries and Desserts",
//     image: "https://images.unsplash.com/photo-1612203985729-70726954388c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
//     distance: "0.5 miles away",
//     expiresIn: "Expires in 5 hours",
//     category: "bakery"
//   },
//   {
//     id: 6,
//     title: "Asian Cuisine Bundle",
//     image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
//     distance: "1.8 miles away",
//     expiresIn: "Expires in 2 hours",
//     category: "meals"
//   }
// ];

// const ITEMS_PER_PAGE = 6;

// export function ExploreListings() {
//   // Filter states
//   const [searchQuery, setSearchQuery] = useState('');
//   const [foodType, setFoodType] = useState<FoodCategory>('all');
//   const [distance, setDistance] = useState<DistanceFilter>('5');
//   const [expiration, setExpiration] = useState<ExpirationFilter>('24');

//   // Listings state
//   const [listings, setListings] = useState<FoodListing[]>([]);
//   const [filteredListings, setFilteredListings] = useState<FoodListing[]>([]);
//   const [displayedListings, setDisplayedListings] = useState<FoodListing[]>([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [hasMore, setHasMore] = useState(true);

//   // Simulate API call to fetch listings
//   useEffect(() => {
//     const fetchListings = async () => {
//       setLoading(true);
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setListings(mockListings);
//       setLoading(false);
//     };

//     fetchListings();
//   }, []);

//   // Filter listings based on search and filters
//   useEffect(() => {
//     let filtered = [...listings];

//     // Apply search filter
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(listing =>
//         listing.title.toLowerCase().includes(query) ||
//         listing.category.toLowerCase().includes(query)
//       );
//     }

//     // Apply food type filter
//     if (foodType !== 'all') {
//       filtered = filtered.filter(listing =>
//         listing.category.toLowerCase() === foodType
//       );
//     }

//     // Apply distance filter
//     filtered = filtered.filter(listing => {
//       const listingDistance = parseFloat(listing.distance.split(' ')[0]);
//       return listingDistance <= parseFloat(distance);
//     });

//     // Apply expiration filter
//     filtered = filtered.filter(listing => {
//       const listingExpiration = parseInt(listing.expiresIn.split(' ')[3]);
//       return listingExpiration <= parseInt(expiration);
//     });

//     setFilteredListings(filtered);
//     setPage(1);
//     setHasMore(filtered.length > ITEMS_PER_PAGE);
//     setDisplayedListings(filtered.slice(0, ITEMS_PER_PAGE));
//   }, [listings, searchQuery, foodType, distance, expiration]);

//   // Load more items
//   const loadMore = useCallback(() => {
//     const nextPage = page + 1;
//     const start = (nextPage - 1) * ITEMS_PER_PAGE;
//     const end = start + ITEMS_PER_PAGE;
//     const newDisplayedListings = filteredListings.slice(0, end);

//     setDisplayedListings(newDisplayedListings);
//     setPage(nextPage);
//     setHasMore(end < filteredListings.length);
//   }, [page, filteredListings]);

//   // Infinite scroll handler
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!hasMore || loading) return;

//       const scrolledToBottom =
//         window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

//       if (scrolledToBottom) {
//         loadMore();
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [hasMore, loading, loadMore]);

//   return (
//     <section className="bg-gray-50 min-h-screen pt-8 pb-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-8">
//           Surplus Food Available Near You
//         </h2>

//         <FilterBar
//           searchQuery={searchQuery}
//           onSearchChange={setSearchQuery}
//           foodType={foodType}
//           onFoodTypeChange={setFoodType}
//           distance={distance}
//           onDistanceChange={setDistance}
//           expiration={expiration}
//           onExpirationChange={setExpiration}
//         />

//         {/* Grid Layout */}
//         <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {loading ? (
//             // Loading state
//             Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
//               <LoadingCard key={index} />
//             ))
//           ) : displayedListings.length > 0 ? (
//             // Food listings
//             displayedListings.map((listing) => (
//               <FoodCard
//                 key={listing.id}
//                 title={listing.title}
//                 image={listing.image}
//                 distance={listing.distance}
//                 expiresIn={listing.expiresIn}
//                 category={listing.category}
//               />
//             ))
//           ) : (
//             // Empty state
//             <div className="col-span-full text-center py-16">
//               <p className="text-xl text-gray-600">
//                 No food available near you right now. Check back later or expand your search.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Load More Button (visible on desktop) */}
//         {!loading && hasMore && (
//           <div className="mt-8 text-center hidden sm:block">
//             <button
//               onClick={loadMore}
//               className="px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors"
//             >
//               Load More
//             </button>
//           </div>
//         )}

//         {/* Loading indicator for infinite scroll */}
//         {!loading && hasMore && (
//           <div className="mt-8 text-center sm:hidden">
//             <p className="text-gray-600">Loading more...</p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
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
import { useLocation } from "../../context/LocationContext"; // Import the context

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
  return R * c; // Distance in km
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
            const expiresIn = item.expires_at
              ? `Expires in ${Math.max(
                  0,
                  Math.round(
                    (new Date(item.expires_at).getTime() - Date.now()) /
                      (1000 * 60 * 60)
                  )
                )} hours`
              : "Expires in 999 hours";

            return {
              ...item,
              distance: item.distance || "999 miles away",
              expiresIn,
              image:
                item.images?.[0] ||
                "https://via.placeholder.com/300?text=No+Image+Available",
              category: item.category || "unknown",
            };
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

  // Filter listings based on search and filters
  // useEffect(() => {
  //   if (!location.latitude || !location.longitude) return;

  //   let filtered = [...listings];

  //   // Search Filter
  //   if (searchQuery) {
  //     const query = searchQuery.toLowerCase();
  //     filtered = filtered.filter(
  //       (listing) =>
  //         listing.title?.toLowerCase().includes(query) ||
  //         listing.category?.toLowerCase().includes(query)
  //     );
  //   }

  //   // Food Type Filter
  //   if (foodType !== "all") {
  //     filtered = filtered.filter(
  //       (listing) => listing.category?.toLowerCase() === foodType
  //     );
  //   }

  //   // // Distance Filter
  //   // filtered = filtered.filter((listing) => {
  //   //   if (!listing.pickup_latitude || !listing.pickup_longitude) return false;
  //   //   const distanceValue = calculateDistance(
  //   //     location.latitude,
  //   //     location.longitude,
  //   //     listing.pickup_latitude,
  //   //     listing.pickup_longitude
  //   //   );
  //   //   return distanceValue <= parseFloat(distance);
  //   // });

  //   // Expiration Filter
  //   filtered = filtered.filter((listing) => {
  //     const expiresAt = new Date(listing.expires_at).getTime();
  //     return expiresAt > Date.now();
  //   });

  //   setFilteredListings(filtered);
  //   setDisplayedListings(filtered.slice(0, ITEMS_PER_PAGE));
  //   setPage(1);
  //   setHasMore(filtered.length > ITEMS_PER_PAGE);
  // }, [listings, searchQuery, foodType, distance, expiration, location]);
  //22222222
  // useEffect(() => {
  //   //if (!location.latitude || !location.longitude) return;
  //   if (!location?.latitude || !location?.longitude) {
  //     console.log("Location not available");
  //     return;
  //   }
  //   let filtered = [...listings];

  //   // Search Filter
  //   if (searchQuery) {
  //     const query = searchQuery.toLowerCase();
  //     filtered = filtered.filter(
  //       (listing) =>
  //         listing.title?.toLowerCase().includes(query) ||
  //         listing.category?.toLowerCase().includes(query)
  //     );
  //   }

  //   // Food Type Filter
  //   if (foodType !== "all") {
  //     filtered = filtered.filter(
  //       (listing) => listing.category?.toLowerCase() === foodType
  //     );
  //   }

  //   // Distance Filter - Adjust to include all listings
  //   filtered = filtered.filter((listing) => {
  //     if (
  //       !listing.pickupLocation?.latitude ||
  //       !listing.pickupLocation?.longitude
  //     )
  //       return true;
  //     const distanceValue = calculateDistance(
  //       location.latitude!,
  //       location.longitude!,
  //       listing.pickupLocation.latitude || 0,
  //       listing.pickupLocation.longitude || 0
  //     );
  //     // return distanceValue <= parseFloat(distance);
  //     return isNaN(distanceValue) || distanceValue <= parseFloat(distance);
  //   });

  //   // Expiration Filter - Adjust to include all listings
  //   filtered = filtered.filter((listing) => {
  //     const expiresAt = new Date(listing.expires_at).getTime();
  //     return isNaN(expiresAt) || expiresAt > Date.now();
  //   });

  //   setFilteredListings(filtered);

  //   setDisplayedListings(filtered.slice(0, ITEMS_PER_PAGE));
  //   setPage(1);
  //   setHasMore(filtered.length > ITEMS_PER_PAGE);
  // }, [listings, searchQuery, foodType, distance, expiration, location]);

  // // Load more items
  // const loadMore = useCallback(() => {
  //   const nextPage = page + 1;
  //   const start = (nextPage - 1) * ITEMS_PER_PAGE;
  //   const end = start + ITEMS_PER_PAGE;
  //   const newDisplayedListings = filteredListings.slice(0, end);

  //   setDisplayedListings(newDisplayedListings);
  //   setPage(nextPage);
  //   setHasMore(end < filteredListings.length);
  // }, [page, filteredListings]);

  //3333333

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
