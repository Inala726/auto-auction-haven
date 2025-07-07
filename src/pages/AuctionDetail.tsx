
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Car, Clock, DollarSign, Eye, MessageCircle, ArrowLeft, Gavel } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuthGuard } from "@/hooks/useAuthGuard";

interface AuctionDetail {
  id: number;
  carId: number;
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
  description: string;
  images: string[];
  startingBid: number;
  currentBid: number;
  startTime: string;
  endTime: string;
  isClosed: boolean;
  sellerId: number;
  sellerName: string;
  totalBids: number;
  views: number;
}

interface Bid {
  id: number;
  amount: number;
  timestamp: string;
  bidderName: string;
}

export default function AuctionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const token = localStorage.getItem("ACCESS_TOKEN") || "";
  useAuthGuard();

  const [auction, setAuction] = useState<AuctionDetail | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [placingBid, setPlacingBid] = useState(false);

  useEffect(() => {
    if (!id) return;

    // Fetch auction details
    axios
      .get<AuctionDetail>(`http://localhost:8080/api/v1/auctions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAuction(res.data))
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to load auction details",
          variant: "destructive",
        });
      });

    // Fetch bids for this auction
    axios
      .get<Bid[]>(`http://localhost:8080/api/v1/auctions/${id}/bids`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBids(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, token, toast]);

  const handlePlaceBid = async () => {
    if (!auction || !bidAmount) return;

    const amount = parseFloat(bidAmount);
    if (amount <= auction.currentBid) {
      toast({
        title: "Invalid Bid",
        description: `Bid must be higher than current bid of $${auction.currentBid.toLocaleString()}`,
        variant: "destructive",
      });
      return;
    }

    setPlacingBid(true);
    try {
      await axios.post(
        `http://localhost:8080/api/v1/auctions/${id}/bids`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast({
        title: "Bid Placed",
        description: `Your bid of $${amount.toLocaleString()} has been placed successfully!`,
      });

      // Refresh auction data
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Bid Failed",
        description: error.response?.data?.message || "Failed to place bid",
        variant: "destructive",
      });
    } finally {
      setPlacingBid(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Car className="h-12 w-12 animate-spin mx-auto mb-4 text-orange-500" />
          <p>Loading auction details...</p>
        </div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Auction Not Found</h2>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const timeRemaining = new Date(auction.endTime).getTime() - new Date().getTime();
  const isActive = timeRemaining > 0 && !auction.isClosed;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-900">BidCars</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Car Images */}
            <Card className="mb-6">
              <CardContent className="p-0">
                {auction.images && auction.images.length > 0 ? (
                  <img
                    src={auction.images[0]}
                    alt={`${auction.make} ${auction.model}`}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-t-lg">
                    <Car className="h-24 w-24 text-gray-400" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold">
                      {auction.year} {auction.make} {auction.model}
                    </h1>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-500">{auction.views} views</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">Year</p>
                      <p className="font-semibold">{auction.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Mileage</p>
                      <p className="font-semibold">{auction.mileage?.toLocaleString()} mi</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Condition</p>
                      <p className="font-semibold">{auction.condition}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Seller</p>
                      <p className="font-semibold">{auction.sellerName}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">{auction.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bidding History */}
            <Card>
              <CardHeader>
                <CardTitle>Bidding History</CardTitle>
                <CardDescription>{bids.length} bids placed</CardDescription>
              </CardHeader>
              <CardContent>
                {bids.length > 0 ? (
                  <div className="space-y-3">
                    {bids.map((bid) => (
                      <div key={bid.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{bid.bidderName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{bid.bidderName}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(bid.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-500">
                          ${bid.amount.toLocaleString()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    No bids placed yet. Be the first to bid!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Auction Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gavel className="h-5 w-5 mr-2" />
                  Auction Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge className={isActive ? "bg-green-500" : "bg-gray-500"}>
                    {isActive ? "Active" : "Ended"}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Current Bid</p>
                  <p className="text-3xl font-bold text-green-600">
                    ${auction.currentBid.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Starting Bid</p>
                  <p className="text-lg font-semibold">
                    ${auction.startingBid.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {isActive ? (
                    <span>Ends {new Date(auction.endTime).toLocaleString()}</span>
                  ) : (
                    <span>Ended {new Date(auction.endTime).toLocaleString()}</span>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Bids</p>
                  <p className="text-xl font-bold">{auction.totalBids}</p>
                </div>
              </CardContent>
            </Card>

            {/* Place Bid */}
            {isActive && (
              <Card>
                <CardHeader>
                  <CardTitle>Place Your Bid</CardTitle>
                  <CardDescription>
                    Minimum bid: ${(auction.currentBid + 100).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Input
                      type="number"
                      placeholder="Enter bid amount"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      min={auction.currentBid + 100}
                    />
                  </div>
                  <Button
                    onClick={handlePlaceBid}
                    disabled={placingBid || !bidAmount}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    {placingBid ? "Placing Bid..." : "Place Bid"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Ask Seller Question
                </Button>
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View Vehicle Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
