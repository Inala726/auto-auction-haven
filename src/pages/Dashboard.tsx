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
import {
  Car,
  Clock,
  LogOut,
  Trophy,
  TrendingUp,
  Users,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

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
  currentBid: number;
  endTime: string;
  isClosed: boolean;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("ACCESS_TOKEN") || "";

  // Profile
  const [me, setMe] = useState<UserDetailResponse | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Active bids
  const [activeBids, setActiveBids] = useState<BidResponse[]>([]);
  // Won auctions
  const [wonAuctions, setWonAuctions] = useState<BidResponse[]>([]);
  // All open auctions
  const [auctions, setAuctions] = useState<AuctionListResponse[]>([]);

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
      .then((res) => setAuctions(res.data))
      .catch(console.error);
  }, [token]);

  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
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

  const userName = `${me.firstName} ${me.lastName}`;
  const joinDate = new Date(me.createdAt).toLocaleDateString();

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-900">BidCars</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {me.firstName}!
          </h1>
          <p className="text-gray-600">
            Manage your bids, track your wins, and discover new auctions.
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
                <TrendingUp className="h-8 w-8 text-orange-500" />
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
                    Auctions
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {auctions.length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Bids
                  </p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="active-bids" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active-bids">Active Bids</TabsTrigger>
            <TabsTrigger value="won-auctions">Won Auctions</TabsTrigger>
            <TabsTrigger value="auctions">Auctions</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Active Bids */}
          <TabsContent value="active-bids" className="space-y-4">
            {activeBids.map((b) => (
              <Card key={b.id}>
                <CardHeader>
                  <CardTitle>Bid on #{b.auctionId}</CardTitle>
                  <CardDescription>
                    {new Date(b.timestamp).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <span>${b.amount.toLocaleString()}</span>
                  <Clock className="h-4 w-4 text-gray-500" />
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Won Auctions */}
          <TabsContent value="won-auctions" className="space-y-4">
            {wonAuctions.map((w) => (
              <Card key={w.id}>
                <CardHeader>
                  <CardTitle>Won Auction #{w.auctionId}</CardTitle>
                  <CardDescription>
                    {new Date(w.timestamp).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <span>${w.amount.toLocaleString()}</span>
                  <Trophy className="h-4 w-4 text-green-500" />
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* All Auctions */}
          <TabsContent value="auctions" className="space-y-4">
            {auctions.map((a) => (
              <Card key={a.id}>
                <CardHeader>
                  <CardTitle>
                    {a.make} {a.model}
                  </CardTitle>
                  <CardDescription>
                    Ends {new Date(a.endTime).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <span>Current: ${a.currentBid.toLocaleString()}</span>
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() => navigate(`/auctions/${a.id}`)}
                  >
                    Place Bid
                  </Button>
                </CardContent>
              </Card>
            ))}
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
                    <h3 className="text-xl font-semibold">{userName}</h3>
                    <p className="text-gray-600">{me.email}</p>
                    <p className="text-sm text-gray-500">
                      Joined {joinDate}
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
                    <p>{joinDate}</p>
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
