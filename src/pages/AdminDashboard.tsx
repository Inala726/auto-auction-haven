import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Car, Plus, Edit, Trash2, Users, TrendingUp, DollarSign, Clock, LogOut, Eye } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  useAuthGuard(); // Protect this route
  const [showCreateAuction, setShowCreateAuction] = useState(false);

  const stats = {
    totalAuctions: 342,
    activeAuctions: 87,
    totalUsers: 15420,
    totalRevenue: 12500000,
    avgPrice: 75000,
    successRate: 98.5
  };

  const auctions = [
    {
      id: 1,
      title: "2019 Porsche 911 GT3 RS",
      startingBid: 150000,
      currentBid: 185000,
      bids: 23,
      endDate: "2024-01-15",
      status: "active",
      views: 1240,
      image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "1967 Ford Mustang Fastback",
      startingBid: 50000,
      currentBid: 75000,
      bids: 18,
      endDate: "2024-01-18",
      status: "active",
      views: 856,
      image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "2020 BMW M4 Competition",
      startingBid: 60000,
      currentBid: 65000,
      bids: 12,
      endDate: "2024-01-10",
      status: "ended",
      views: 643,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop"
    }
  ];

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      joinDate: "2024-01-01",
      totalBids: 47,
      wonAuctions: 3,
      status: "active",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      joinDate: "2023-12-15",
      totalBids: 32,
      wonAuctions: 2,
      status: "active",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b2609525?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com",
      joinDate: "2023-11-20",
      totalBids: 67,
      wonAuctions: 5,
      status: "active",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const [newAuction, setNewAuction] = useState({
    title: "",
    description: "",
    startingBid: "",
    category: "",
    endDate: "",
    imageUrl: ""
  });

  const handleCreateAuction = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Auction Created",
      description: "New auction has been successfully created.",
    });
    setShowCreateAuction(false);
    setNewAuction({
      title: "",
      description: "",
      startingBid: "",
      category: "",
      endDate: "",
      imageUrl: ""
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    navigate('/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "ended":
        return "bg-gray-500";
      case "draft":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
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
              <Badge className="bg-orange-500 ml-2">Admin</Badge>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                View Site
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage auctions, users, and monitor platform performance</p>
          </div>
          <Button 
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => setShowCreateAuction(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Auction
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Auctions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAuctions}</p>
                </div>
                <Car className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Auctions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeAuctions}</p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Price</p>
                  <p className="text-2xl font-bold text-gray-900">${(stats.avgPrice / 1000)}K</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.successRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="auctions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="auctions">Auctions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="auctions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Auction Management</CardTitle>
                <CardDescription>Create, edit, and manage all auctions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auctions.map((auction) => (
                    <div key={auction.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <img src={auction.image} alt={auction.title} className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                          <h3 className="font-semibold text-lg">{auction.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Starting: ${auction.startingBid.toLocaleString()}</span>
                            <span>Current: ${auction.currentBid.toLocaleString()}</span>
                            <span>Bids: {auction.bids}</span>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {auction.views}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(auction.status)}>
                          {auction.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Monitor and manage platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{user.name}</h3>
                          <p className="text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Joined: {user.joinDate}</span>
                            <span>Bids: {user.totalBids}</span>
                            <span>Won: {user.wonAuctions}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-500">Active</Badge>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Key metrics and performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
                    <p className="text-3xl font-bold text-blue-600">${(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-gray-600 mt-2">Total platform revenue</p>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">User Growth</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.totalUsers.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 mt-2">Registered users</p>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Auction Success</h3>
                    <p className="text-3xl font-bold text-orange-600">{stats.successRate}%</p>
                    <p className="text-sm text-gray-600 mt-2">Successful auctions</p>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Average Price</h3>
                    <p className="text-3xl font-bold text-purple-600">${(stats.avgPrice / 1000)}K</p>
                    <p className="text-sm text-gray-600 mt-2">Per vehicle sold</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Auction Modal */}
      {showCreateAuction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Create New Auction</CardTitle>
              <CardDescription>Add a new vehicle to the auction platform</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateAuction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Vehicle Title</Label>
                  <Input
                    id="title"
                    value={newAuction.title}
                    onChange={(e) => setNewAuction({...newAuction, title: e.target.value})}
                    placeholder="e.g., 2019 Porsche 911 GT3 RS"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newAuction.description}
                    onChange={(e) => setNewAuction({...newAuction, description: e.target.value})}
                    placeholder="Detailed description of the vehicle..."
                    rows={4}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startingBid">Starting Bid ($)</Label>
                    <Input
                      id="startingBid"
                      type="number"
                      value={newAuction.startingBid}
                      onChange={(e) => setNewAuction({...newAuction, startingBid: e.target.value})}
                      placeholder="50000"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => setNewAuction({...newAuction, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sports">Sports Car</SelectItem>
                        <SelectItem value="classic">Classic Car</SelectItem>
                        <SelectItem value="luxury">Luxury Car</SelectItem>
                        <SelectItem value="electric">Electric Car</SelectItem>
                        <SelectItem value="supercar">Supercar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Auction End Date</Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={newAuction.endDate}
                    onChange={(e) => setNewAuction({...newAuction, endDate: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={newAuction.imageUrl}
                    onChange={(e) => setNewAuction({...newAuction, imageUrl: e.target.value})}
                    placeholder="https://example.com/car-image.jpg"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowCreateAuction(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                    Create Auction
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
