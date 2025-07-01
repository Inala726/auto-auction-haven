
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Users, Car, Search, User, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const featuredAuctions = [
    {
      id: 1,
      title: "2019 Porsche 911 GT3 RS",
      currentBid: 185000,
      timeLeft: "2d 14h",
      bids: 23,
      image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=500&h=300&fit=crop",
      category: "Sports Car"
    },
    {
      id: 2,
      title: "1967 Ford Mustang Fastback",
      currentBid: 75000,
      timeLeft: "5d 8h",
      bids: 18,
      image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=500&h=300&fit=crop",
      category: "Classic"
    },
    {
      id: 3,
      title: "2021 Tesla Model S Plaid",
      currentBid: 120000,
      timeLeft: "1d 6h",
      bids: 31,
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&h=300&fit=crop",
      category: "Electric"
    },
    {
      id: 4,
      title: "1985 Lamborghini Countach",
      currentBid: 425000,
      timeLeft: "3d 12h",
      bids: 42,
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&h=300&fit=crop",
      category: "Supercar"
    }
  ];

  const categories = [
    { name: "Sports Cars", count: 156, icon: "🏎️" },
    { name: "Classic Cars", count: 89, icon: "🚗" },
    { name: "Luxury Cars", count: 72, icon: "💎" },
    { name: "Electric Cars", count: 34, icon: "⚡" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-orange-500" />
                <span className="text-2xl font-bold text-gray-900">BidCars</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Auctions</a>
                <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Categories</a>
                <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">How it Works</a>
                <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">About</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Find your dream car
                <span className="block text-orange-200">& place your bid</span>
              </h1>
              <p className="text-xl text-orange-100 leading-relaxed">
                Discover exceptional vehicles through our exclusive online auctions. 
                From classic collectibles to modern supercars.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8">
                  <Search className="h-5 w-5 mr-2" />
                  Browse Auctions
                </Button>
                <Button size="lg" variant="outline" className="border-white text-orange-500 hover:text-orange-600 px-8">
                  How it Works
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&h=400&fit=crop" 
                alt="Featured car"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">2,500+</div>
              <div className="text-gray-600">Cars Sold</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">$50M+</div>
              <div className="text-gray-600">Total Sales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">15,000+</div>
              <div className="text-gray-600">Active Bidders</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Auctions</h2>
            <p className="text-xl text-gray-600">Don't miss these exceptional vehicles ending soon</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAuctions.map((auction) => (
              <Card key={auction.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={auction.image} 
                    alt={auction.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-orange-500">{auction.category}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-500 transition-colors">
                    {auction.title}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Current Bid</span>
                      <span className="font-bold text-xl text-green-600">
                        ${auction.currentBid.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {auction.timeLeft}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {auction.bids} bids
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 px-8">
              View All Auctions
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Find your perfect vehicle type</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-500 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-500">{category.count} vehicles</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Bidding?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of car enthusiasts and collectors. Create your account today and start bidding on exceptional vehicles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 px-8" onClick={() => navigate('/signup')}>
              Create Account
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-8 w-8 text-orange-500" />
                <span className="text-2xl font-bold">BidCars</span>
              </div>
              <p className="text-gray-400 mb-4">
                The premier destination for automotive auctions. Connecting collectors with exceptional vehicles worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sports Cars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Classic Cars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Luxury Cars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Electric Cars</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BidCars. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
