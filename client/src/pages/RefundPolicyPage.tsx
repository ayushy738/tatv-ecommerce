
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Clock, CreditCard, Package, AlertCircle, CheckCircle } from "lucide-react";

const RefundPolicyPage: React.FC = () => {
  const sections = [
    {
      icon: <RotateCcw className="h-6 w-6 text-blue-600" />,
      title: "Return Policy",
      content: [
        "Items can be returned within 30 days of delivery for a full refund.",
        "Products must be in original condition with all tags, packaging, and accessories.",
        "Items should be unworn, unused, and in the same condition as received.",
        "Return shipping costs will be borne by the customer unless the item is defective."
      ]
    },
    {
      icon: <Clock className="h-6 w-6 text-green-600" />,
      title: "Cancellation Policy",
      content: [
        "Orders can be cancelled within 24 hours of placement without any charges.",
        "If the order has been shipped, cancellation is not possible but returns are accepted.",
        "Cancelled orders will be refunded to the original payment method within 3-5 business days.",
        "Custom or personalized items cannot be cancelled once production has started."
      ]
    },
    {
      icon: <CreditCard className="h-6 w-6 text-purple-600" />,
      title: "Refund Process",
      content: [
        "Refunds are processed within 5-10 business days after we receive the returned item.",
        "Refunds will be credited to the original payment method used for the purchase.",
        "Shipping charges are non-refundable unless the return is due to our error.",
        "You will receive an email confirmation once your refund has been processed."
      ]
    },
    {
      icon: <Package className="h-6 w-6 text-orange-600" />,
      title: "Non-Returnable Items",
      content: [
        "Earbuds and electronic accessories for hygiene reasons (unless defective).",
        "Items damaged by misuse, wear, or accidents after delivery.",
        "Products without original packaging, tags, or proof of purchase.",
        "Items purchased during final sale or clearance events (marked as non-returnable)."
      ]
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-teal-600" />,
      title: "How to Return Items",
      content: [
        "Log into your account and go to 'My Orders' to initiate a return request.",
        "Select the items you want to return and specify the reason for return.",
        "Print the return label and securely package the items.",
        "Drop off the package at any authorized courier location or schedule a pickup."
      ]
    }
  ];

  const timeline = [
    { step: "1", title: "Request Return", description: "Initiate return within 30 days", time: "Day 1" },
    { step: "2", title: "Ship Item", description: "Send item back to us", time: "Day 2-5" },
    { step: "3", title: "Inspection", description: "We inspect the returned item", time: "Day 6-8" },
    { step: "4", title: "Refund", description: "Refund processed to your account", time: "Day 9-15" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 py-12 md:py-20 text-white">
          <div className="container text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Refund & Cancellation Policy</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              We want you to be completely satisfied with your purchase. Learn about our hassle-free return and refund process.
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
                          <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Return Process Timeline */}
            <div className="max-w-4xl mx-auto mt-8 md:mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Return Process Timeline</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {timeline.map((item, index) => (
                  <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-4 md:p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                        {item.step}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">{item.title}</h3>
                      <p className="text-gray-600 text-xs md:text-sm mb-2">{item.description}</p>
                      <Badge variant="outline" className="text-xs">{item.time}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="max-w-4xl mx-auto mt-8 md:mt-12">
              <Card className="border-l-4 border-l-red-500 bg-red-50">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">Important Notes</h3>
                      <ul className="text-gray-600 space-y-2 text-sm md:text-base">
                        <li>• All returns are subject to inspection and approval</li>
                        <li>• Refund processing times may vary during peak seasons</li>
                        <li>• International orders may have different return policies</li>
                        <li>• Contact customer service for assistance with your return</li>
                      </ul>
                    </div>
                  </div>
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

export default RefundPolicyPage;
