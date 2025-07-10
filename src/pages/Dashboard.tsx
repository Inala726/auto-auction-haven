
// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Car,
  Clock,
  LogOut,
  Trophy,
  TrendingUp,
  Users,
  Search,
  Filter,
  Eye,
  Gavel,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthGuard } from "@/hooks/useAuthGuard";

interface UserDetailResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface BidResponse {
  id: number;
  auctionId: number;
  amount: number;
  timestamp: string;
}

interface AuctionListResponse {
  id: number;
  carId: number;
  make: string;
  model: string;
  year: number;
  currentBid: number;
  endTime: string;
  isClosed: boolean;
  images?: string[];
  mileage?: number;
  condition?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("ACCESS_TOKEN") || "";
  useAuthGuard();

  // Profile
  const [me, setMe] = useState<UserDetailResponse | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Active bids
  const [activeBids, setActiveBids] = useState<BidResponse[]>([]);
  // Won auctions
  const [wonAuctions, setWonAuctions] = useState<BidResponse[]>([]);
  // All open auctions
  const [auctions, setAuctions] = useState<AuctionListResponse[]>([]);
  const [filteredAuctions, setFilteredAuctions] = useState<AuctionListResponse[]>([]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [makeFilter, setMakeFilter] = useState("");

  useEffect(() => {
    // Fetch profile
    axios
      .get<UserDetailResponse>("http://localhost:8080/api/v1/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMe(res.data))
      .catch(() => setMe(null))
      .finally(() => setLoadingProfile(false));

    // Active bids
    axios
      .get<BidResponse[]>("http://localhost:8080/api/v1/bids/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setActiveBids(res.data))
      .catch(console.error);

    // Won auctions
    axios
      .get<BidResponse[]>("http://localhost:8080/api/v1/auctions/me/won", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setWonAuctions(res.data))
      .catch(console.error);

    // All open auctions
    axios
      .get<AuctionListResponse[]>("http://localhost:8080/api/v1/auctions", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAuctions(res.data);
        setFilteredAuctions(res.data);
      })
      .catch(console.error);
  }, [token]);

  // Filter auctions based on search and filters
  useEffect(() => {
    let filtered = auctions;

    // Search by make/model
    if (searchTerm) {
      filtered = filtered.filter(auction => 
        `${auction.make} ${auction.model}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by make
    if (makeFilter) {
      filtered = filtered.filter(auction => auction.make === makeFilter);
    }

    // Filter by price range
    if (priceFilter) {
      const [min, max] = priceFilter.split('-').map(Number);
      filtered = filtered.filter(auction => {
        if (max) {
          return auction.currentBid >= min && auction.currentBid <= max;
        } else {
          return auction.currentBid >= min;
        }
      });
    }

    setFilteredAuctions(filtered);
  }, [auctions, searchTerm, makeFilter, priceFilter]);

  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Car className="h-12 w-12 animate-spin mx-auto mb-4 text-orange-500" />
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!me) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load profile.
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    navigate("/");
  };

  const getTimeRemaining = (endTime: string) => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const diff = end - now;
    
    if (diff <= 0) return "Ended";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const switchToBrowseAuctions = () => {
    const browseTab = document.querySelector('[value="browse-auctions"]') as HTMLElement;
    if (browseTab) {
      browseTab.click();
    }
  };

  const uniqueMakes = [...new Set(auctions.map(a => a.make))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-900">BidCars</span>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {me.firstName}!</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Bidding Dashboard
          </h1>
          <p className="text-gray-600">
            Track your active bids, browse auctions, and manage your account.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Bids
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activeBids.length}
                  </p>
                </div>
                <Gavel className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Won Auctions
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {wonAuctions.length}
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Available Auctions
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {auctions.filter(a => !a.isClosed).length}
                  </p>
                </div>
                <Car className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Spent
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${wonAuctions.reduce((sum, bid) => sum + bid.amount, 0).toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="browse-auctions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse-auctions">Browse Auctions</TabsTrigger>
            <TabsTrigger value="active-bids">My Active Bids</TabsTrigger>
            <TabsTrigger value="won-auctions">Won Auctions</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Browse Auctions */}
          <TabsContent value="browse-auctions" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Find Your Next Car
                </CardTitle>
                <CardDescription>
                  Search and filter through available auctions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by make or model..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={makeFilter} onValueChange={setMakeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by make" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Makes</SelectItem>
                      {uniqueMakes.map(make => (
                        <SelectItem key={make} value={make}>{make}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Prices</SelectItem>
                      <SelectItem value="0-25000">Under $25K</SelectItem>
                      <SelectItem value="25000-50000">$25K - $50K</SelectItem>
                      <SelectItem value="50000-100000">$50K - $100K</SelectItem>
                      <SelectItem value="100000">Above $100K</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Auctions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAuctions.slice(0, 9).map((auction) => (
                <Card key={auction.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-0">
                    {auction.images && auction.images[0] ? (
                      <img
                        src={auction.images[0]}
                        alt={`${auction.make} ${auction.model}`}
                        className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg">
                        <Car className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">
                        {auction.year} {auction.make} {auction.model}
                      </h3>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="text-sm text-gray-600">Current Bid</p>
                          <p className="text-xl font-bold text-green-600">
                            ${auction.currentBid.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Time Left</p>
                          <Badge className={
                            getTimeRemaining(auction.endTime) === "Ended" 
                              ? "bg-gray-500" 
                              : "bg-orange-500"
                          }>
                            {getTimeRemaining(auction.endTime)}
                          </Badge>
                        </div>
                      </div>
                      {auction.mileage && (
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <span>{auction.mileage.toLocaleString()} miles</span>
                          {auction.condition && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{auction.condition}</span>
                            </>
                          )}
                        </div>
                      )}
                      <Button
                        onClick={() => navigate(`/auctions/${auction.id}`)}
                        className="w-full bg-orange-500 hover:bg-orange-600"
                        disabled={auction.isClosed}
                      >
                        {auction.isClosed ? "Auction Ended" : "View & Bid"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAuctions.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No auctions found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Active Bids */}
          <TabsContent value="active-bids" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Active Bids</CardTitle>
                <CardDescription>
                  Monitor your current bids and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeBids.length > 0 ? (
                  <div className="space-y-4">
                    {activeBids.map((bid) => (
                      <div key={bid.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div>
                          <h3 className="font-semibold">Auction #{bid.auctionId}</h3>
                          <p className="text-sm text-gray-600">
                            Bid placed: {new Date(bid.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">
                            ${bid.amount.toLocaleString()}
                          </p>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigate(`/auctions/${bid.auctionId}`)}
                          >
                            View Auction
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Gavel className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No active bids</h3>
                    <p className="text-gray-600 mb-4">Start bidding on auctions to see them here.</p>
                    <Button onClick={switchToBrowseAuctions}>
                      Browse Auctions
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Won Auctions */}
          <TabsContent value="won-auctions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-green-500" />
                  Your Winning Bids
                </CardTitle>
                <CardDescription>
                  Congratulations on your successful auctions!
                </CardDescription>
              </CardHeader>
              <CardContent>
                {wonAuctions.length > 0 ? (
                  <div className="space-y-4">
                    {wonAuctions.map((auction) => (
                      <div key={auction.id} className="flex items-center justify-between p-4 border rounded-lg bg-green-50 border-green-200">
                        <div>
                          <h3 className="font-semibold text-green-800">
                            Won Auction #{auction.auctionId}
                          </h3>
                          <p className="text-sm text-green-600">
                            Won on: {new Date(auction.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-700">
                            ${auction.amount.toLocaleString()}
                          </p>
                          <Badge className="bg-green-500">
                            Winner
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No wins yet</h3>
                    <p className="text-gray-600">Keep bidding to win your first auction!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl">
                      {me.firstName.charAt(0) + me.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{me.firstName} {me.lastName}</h3>
                    <p className="text-gray-600">{me.email}</p>
                    <p className="text-sm text-gray-500">
                      Joined {new Date(me.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge className="mt-2">{me.status}</Badge>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Created</p>
                    <p>{new Date(me.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Last Update</p>
                    <p>
                      {new Date(me.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
