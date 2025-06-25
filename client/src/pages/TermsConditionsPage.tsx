
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, CreditCard, Truck, AlertTriangle } from "lucide-react";

const TermsConditionsPage: React.FC = () => {
  const sections = [
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Tatv's website and services, you accept and agree to be bound by these Terms and Conditions.",
        "If you do not agree to abide by the above, please do not use this service.",
        "These terms apply to all visitors, users, and others who access or use our service."
      ]
    },
    {
      icon: <CreditCard className="h-6 w-6 text-green-600" />,
      title: "Account Registration",
      content: [
        "You must be at least 18 years old to create an account and make purchases.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree to accept responsibility for all activities that occur under your account.",
        "We reserve the right to refuse service or terminate accounts at our discretion."
      ]
    },
    {
      icon: <Truck className="h-6 w-6 text-purple-600" />,
      title: "Orders and Payments",
      content: [
        "All orders are subject to availability and confirmation of the order price.",
        "Payment must be made in full before delivery of products.",
        "We accept various payment methods including credit cards, debit cards, and digital wallets.",
        "Prices are subject to change without notice but confirmed orders will honor the agreed price."
      ]
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: "Delivery and Returns",
      content: [
        "Delivery times are estimates and may vary based on location and product availability.",
        "Returns must be initiated within 30 days of delivery for eligible items.",
        "Items must be returned in original condition with all tags and packaging.",
        "Refund processing may take 5-10 business days after we receive the returned item."
      ]
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-red-600" />,
      title: "Prohibited Uses",
      content: [
        "You may not use our service for any illegal or unauthorized purpose.",
        "You may not violate any laws in your jurisdiction including copyright laws.",
        "You may not transmit any worms, viruses, or code of a destructive nature.",
        "You may not attempt to gain unauthorized access to our systems or networks."
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-12 md:py-20 text-white">
          <div className="container text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Terms & Conditions</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Please read these terms and conditions carefully before using our services.
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
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="max-w-4xl mx-auto mt-8 md:mt-12">
              <Card className="border-l-4 border-l-yellow-500 bg-yellow-50">
                <CardContent className="p-4 md:p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Contact Information</h3>
                  <p className="text-gray-600 text-sm md:text-base mb-2">
                    If you have any questions about these Terms and Conditions, please contact us:
                  </p>
                  <ul className="text-gray-600 space-y-1 text-sm md:text-base">
                    <li>Email: legal@tatv.com</li>
                    <li>Phone: +91 98765 43210</li>
                    <li>Address: 123 Business Avenue, Mumbai, Maharashtra 400001</li>
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

export default TermsConditionsPage;
