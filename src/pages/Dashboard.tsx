import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Car, Clock, Eye, Heart, TrendingUp, Trophy, Users, LogOut } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const Dashboard = () => {
  const navigate = useNavigate();
  useAuthGuard(); // Protect this route

  const [user] = useState({
    name: "John Doe",
    email: "john@example.com", 
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    joinDate: "March 2024",
    totalBids: 47,
    wonAuctions: 3,
    watchlistCount: 12
  });

  const activeBids = [
    {
      id: 1,
      title: "2019 Porsche 911 GT3 RS",
      currentBid: 185000,
      yourBid: 180000,
      timeLeft: "2d 14h",
      status: "outbid",
      image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "1967 Ford Mustang Fastback",
      currentBid: 75000,
      yourBid: 75000,
      timeLeft: "5d 8h",
      status: "winning",
      image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "2021 Tesla Model S Plaid",
      currentBid: 120000,
      yourBid: 115000,
      timeLeft: "1d 6h",
      status: "outbid",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=300&h=200&fit=crop"
    }
  ];

  const wonAuctions = [
    {
      id: 4,
      title: "2020 BMW M4 Competition",
      finalBid: 65000,
      datePurchased: "Jan 15, 2024",
      status: "completed",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      title: "1995 Toyota Supra",
      finalBid: 85000,
      datePurchased: "Dec 8, 2023",
      status: "completed",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop"
    }
  ];

  const watchlist = [
    {
      id: 6,
      title: "2022 Lamborghini Huracan",
      currentBid: 250000,
      timeLeft: "3d 12h",
      bids: 23,
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop"
    },
    {
      id: 7,
      title: "1973 Porsche 911 Carrera",
      currentBid: 125000,
      timeLeft: "6d 5h",
      bids: 18,
      image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "winning":
        return "bg-green-500";
      case "outbid":
        return "bg-red-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">BidCars</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Browse Auctions
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-gray-600">Manage your bids, track your wins, and discover new auctions.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Bids</p>
                  <p className="text-2xl font-bold text-gray-900">{activeBids.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Won Auctions</p>
                  <p className="text-2xl font-bold text-gray-900">{user.wonAuctions}</p>
                </div>
                <Trophy className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Watchlist</p>
                  <p className="text-2xl font-bold text-gray-900">{user.watchlistCount}</p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bids</p>
                  <p className="text-2xl font-bold text-gray-900">{user.totalBids}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="active-bids" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active-bids">Active Bids</TabsTrigger>
            <TabsTrigger value="won-auctions">Won Auctions</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="active-bids" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Bids</CardTitle>
                <CardDescription>Track your current bidding activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeBids.map((bid) => (
                    <div key={bid.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <img src={bid.image} alt={bid.title} className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                          <h3 className="font-semibold text-lg">{bid.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Your bid: ${bid.yourBid.toLocaleString()}</span>
                            <span>Current: ${bid.currentBid.toLocaleString()}</span>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {bid.timeLeft}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(bid.status)}>
                          {bid.status === "winning" ? "Winning" : "Outbid"}
                        </Badge>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          {bid.status === "outbid" ? "Increase Bid" : "View"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="won-auctions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Won Auctions</CardTitle>
                <CardDescription>Your successful auction wins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wonAuctions.map((auction) => (
                    <div key={auction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img src={auction.image} alt={auction.title} className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                          <h3 className="font-semibold text-lg">{auction.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Final bid: ${auction.finalBid.toLocaleString()}</span>
                            <span>Won on: {auction.datePurchased}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-500">Completed</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="watchlist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Watchlist</CardTitle>
                <CardDescription>Auctions you're interested in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {watchlist.map((item) => (
                    <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                          <span>Current: ${item.currentBid.toLocaleString()}</span>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {item.timeLeft}
                          </div>
                        </div>
                        <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
                          Place Bid
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-lg">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">Member since {user.joinDate}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-500">{user.totalBids}</p>
                    <p className="text-sm text-gray-600">Total Bids</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-500">{user.wonAuctions}</p>
                    <p className="text-sm text-gray-600">Auctions Won</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-500">{user.watchlistCount}</p>
                    <p className="text-sm text-gray-600">Watchlist Items</p>
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
