import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Truck, Clock, Heart, Award, Users } from "lucide-react";

const AboutPage: React.FC = () => {
  const stats = [
    { label: "Happy Customers", value: "50K+", icon: <Users className="h-8 w-8" /> },
    { label: "Products Sold", value: "100K+", icon: <Award className="h-8 w-8" /> },
    { label: "Years of Trust", value: "5+", icon: <Shield className="h-8 w-8" /> },
    { label: "Fast Delivery", value: "24hrs", icon: <Truck className="h-8 w-8" /> }
  ];

  const values = [
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Quality Assurance",
      description: "We ensure every product meets our high-quality standards before it reaches you."
    },
    {
      icon: <Truck className="h-12 w-12 text-green-600" />,
      title: "Fast Delivery",
      description: "Quick and reliable delivery to your doorstep, with real-time tracking updates."
    },
    {
      icon: <Heart className="h-12 w-12 text-red-600" />,
      title: "Customer First",
      description: "Your satisfaction is our priority. We're here to help with any concerns."
    },
    {
      icon: <Clock className="h-12 w-12 text-purple-600" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you whenever you need help."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20 text-white">
          <div className="container text-center">
            <h1 className="text-5xl font-bold mb-6">About Tatv</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              We're not just an e-commerce platform; we're your trusted partner in discovering 
              amazing products that enhance your lifestyle. Since our inception, we've been 
              committed to bringing you the best shopping experience.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-4 text-blue-600">
                      {stat.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-blue-100 text-blue-800">Our Story</Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Building the Future of Shopping
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Founded with a vision to revolutionize online shopping, Tatv started as a small 
                    team of passionate individuals who believed that everyone deserves access to 
                    quality products at affordable prices.
                  </p>
                  <p>
                    Today, we've grown into a trusted platform serving thousands of customers 
                    across the country. Our commitment to excellence, customer satisfaction, and 
                    innovation continues to drive us forward.
                  </p>
                  <p>
                    We carefully curate our product selection, working directly with manufacturers 
                    and trusted suppliers to ensure authenticity, quality, and competitive pricing.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
                  alt="Our team"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-xl">
                  <p className="text-lg font-bold">5+ Years</p>
                  <p className="text-sm">of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-purple-100 text-purple-800">Our Values</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Stand For</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our core values guide everything we do, from product selection to customer service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="container text-center">
            <Badge className="mb-4 bg-white/20 text-white">Our Mission</Badge>
            <h2 className="text-4xl font-bold mb-6">
              Making Quality Accessible to Everyone
            </h2>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed">
              We believe that everyone should have access to high-quality products without 
              breaking the bank. Our mission is to democratize shopping by offering curated 
              selections at competitive prices, backed by exceptional customer service and 
              a seamless online experience.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-green-100 text-green-800">Meet the Team</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">The People Behind Tatv</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our diverse team of passionate professionals works tirelessly to bring you the best shopping experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Agmoth Kalyan", role: "CEO & Founder", image: "https://res.cloudinary.com/dm3sc3use/image/upload/v1749665939/kalyan_ql0f0b.jpg" },
                { name: "Ayush Raj Yadav", role: "Web Devloper And Manager", image: "https://res.cloudinary.com/dm3sc3use/image/upload/v1749665671/ayush_tejrmq.jpg" },
                { name: "Sairaj Raithatha", role: "Marketing Head And Advisor", image: "https://res.cloudinary.com/dm3sc3use/image/upload/v1749665671/sairaj_tcvhg6.jpg" }
              ].map((member, index) => (
                <Card key={index} className="text-center overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
