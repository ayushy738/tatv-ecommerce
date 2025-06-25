
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Database, Share2, Lock, UserCheck } from "lucide-react";

const PrivacyPolicyPage: React.FC = () => {
  const sections = [
    {
      icon: <Database className="h-6 w-6 text-blue-600" />,
      title: "Information We Collect",
      content: [
        "Personal information such as name, email address, phone number, and shipping address when you create an account or place an order.",
        "Payment information processed securely through our payment partners (we do not store credit card details).",
        "Device and usage information including IP address, browser type, and pages visited.",
        "Cookies and similar technologies to enhance your browsing experience."
      ]
    },
    {
      icon: <Eye className="h-6 w-6 text-green-600" />,
      title: "How We Use Your Information",
      content: [
        "Process and fulfill your orders, including shipping and customer service.",
        "Send you important updates about your orders and account.",
        "Improve our website, products, and services based on your feedback and usage patterns.",
        "Personalize your shopping experience and show relevant product recommendations.",
        "Comply with legal obligations and protect against fraud."
      ]
    },
    {
      icon: <Share2 className="h-6 w-6 text-purple-600" />,
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "We may share information with trusted service providers who help us operate our business.",
        "Information may be disclosed if required by law or to protect our rights and safety.",
        "Aggregate, non-personal information may be shared for business analysis purposes."
      ]
    },
    {
      icon: <Lock className="h-6 w-6 text-red-600" />,
      title: "Data Security",
      content: [
        "We implement industry-standard security measures to protect your personal information.",
        "All sensitive data is encrypted during transmission using SSL technology.",
        "Regular security audits and updates to maintain the highest level of protection.",
        "Access to personal information is restricted to authorized personnel only."
      ]
    },
    {
      icon: <UserCheck className="h-6 w-6 text-orange-600" />,
      title: "Your Rights",
      content: [
        "Access and review the personal information we have about you.",
        "Request corrections to any inaccurate or incomplete information.",
        "Request deletion of your account and associated personal data.",
        "Opt-out of marketing communications at any time.",
        "File a complaint with relevant data protection authorities."
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 py-12 md:py-20 text-white">
          <div className="container text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Privacy Policy</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </section>

        <section className="py-8 md:py-16 bg-white">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
              {sections.map((section, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg md:text-xl">
                      {section.icon}
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 md:space-y-3">
                      {section.content.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-gray-600">
                          <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="max-w-4xl mx-auto mt-8 md:mt-12">
              <Card className="border-l-4 border-l-blue-500 bg-blue-50">
                <CardContent className="p-4 md:p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Contact Us About Privacy</h3>
                  <p className="text-gray-600 text-sm md:text-base mb-2">
                    If you have questions about this Privacy Policy or your personal data:
                  </p>
                  <ul className="text-gray-600 space-y-1 text-sm md:text-base">
                    <li>Email: tatvecommerce@gmail.com</li>
                    <li>Phone: +91 77940 33470</li>
                    <li>Address: 123 Business Avenue, Hyderabad, Telengana</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8 text-sm text-gray-500">
              <p>Last updated: January 2025</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
