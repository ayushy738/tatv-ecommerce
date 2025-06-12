
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, ShoppingCart, Truck, CreditCard, RotateCcw, Shield, MessageCircle } from "lucide-react";

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All FAQs", icon: <Search className="h-5 w-5" /> },
    { id: "orders", name: "Orders", icon: <ShoppingCart className="h-5 w-5" /> },
    { id: "shipping", name: "Shipping", icon: <Truck className="h-5 w-5" /> },
    { id: "payment", name: "Payment", icon: <CreditCard className="h-5 w-5" /> },
    { id: "returns", name: "Returns", icon: <RotateCcw className="h-5 w-5" /> },
    { id: "account", name: "Account", icon: <Shield className="h-5 w-5" /> }
  ];

  const faqs = [
    {
      category: "orders",
      question: "How do I place an order?",
      answer: "To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your order."
    },
    {
      category: "orders",
      question: "Can I modify or cancel my order?",
      answer: "You can modify or cancel your order within 1 hour of placing it. After this time, if the order hasn't been shipped, please contact our customer support for assistance."
    },
    {
      category: "orders",
      question: "How do I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can also track your order in the 'My Orders' section of your account."
    },
    {
      category: "shipping",
      question: "What are your shipping charges?",
      answer: "We offer free shipping on orders above ₹500. For orders below ₹500, a shipping charge of ₹50 applies. Express delivery options are also available."
    },
    {
      category: "shipping",
      question: "How long does delivery take?",
      answer: "Standard delivery takes 3-7 business days. Express delivery is available in select cities and takes 1-2 business days. Delivery times may vary during festivals and peak seasons."
    },
    {
      category: "shipping",
      question: "Do you deliver internationally?",
      answer: "Currently, we only deliver within India. We're working on expanding our shipping to international locations in the future."
    },
    {
      category: "payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI payments, net banking, and cash on delivery (COD) for orders above ₹200."
    },
    {
      category: "payment",
      question: "Is it safe to pay online?",
      answer: "Yes, our payment gateway is secured with 256-bit SSL encryption. We never store your payment information on our servers."
    },
    {
      category: "payment",
      question: "Can I pay with a gift card?",
      answer: "Yes, you can use Tatv gift cards during checkout. The gift card amount will be deducted from your total order value."
    },
    {
      category: "returns",
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most products. Items should be in original condition with tags attached. Some products like undergarments and cosmetics cannot be returned."
    },
    {
      category: "returns",
      question: "How do I initiate a return?",
      answer: "You can initiate a return from the 'My Orders' section in your account. Select the item you want to return and follow the instructions."
    },
    {
      category: "returns",
      question: "When will I get my refund?",
      answer: "Refunds are processed within 5-7 business days after we receive the returned item. The amount will be credited to your original payment method."
    },
    {
      category: "account",
      question: "How do I create an account?",
      answer: "Click on 'Sign Up' in the top right corner of the website. You can sign up using your email address or phone number."
    },
    {
      category: "account",
      question: "I forgot my password. How do I reset it?",
      answer: "Click on 'Forgot Password' on the login page. Enter your email address and we'll send you a password reset link."
    },
    {
      category: "account",
      question: "How do I update my profile information?",
      answer: "Log in to your account and go to 'My Profile' to update your personal information, addresses, and preferences."
    },
    {
      category: "orders",
      question: "What if I receive a damaged product?",
      answer: "If you receive a damaged product, please contact our customer support within 48 hours with photos of the damage. We'll arrange for a replacement or refund."
    },
    {
      category: "shipping",
      question: "Can I change my delivery address?",
      answer: "You can change your delivery address only if your order hasn't been shipped yet. Contact customer support immediately if you need to change the address."
    },
    {
      category: "payment",
      question: "My payment failed. What should I do?",
      answer: "If your payment failed, please check your bank account for any deductions. If money was deducted, it will be refunded within 5-7 business days. You can retry the payment or use a different payment method."
    },
    {
      category: "returns",
      question: "Can I exchange a product?",
      answer: "Yes, you can exchange products for a different size or color within 30 days. The exchange is subject to availability and the product should be in original condition."
    },
    {
      category: "account",
      question: "How do I delete my account?",
      answer: "To delete your account, please contact our customer support. Note that this action is irreversible and you'll lose all your order history and saved information."
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20 text-white">
          <div className="container text-center">
            <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              Find quick answers to common questions about shopping, orders, shipping, and more.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  className="pl-12 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white shadow">
          <div className="container">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`flex items-center gap-2 px-4 py-2 ${
                    selectedCategory === category.id 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600" 
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.icon}
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16">
          <div className="container max-w-4xl">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No FAQs Found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any FAQs matching your search. Please try different keywords.
                </p>
                <Button onClick={() => {setSearchQuery(""); setSelectedCategory("all")}}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-0 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 bg-gray-100">
          <div className="container max-w-4xl">
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white p-8 flex items-center justify-center">
                  <MessageCircle className="h-24 w-24" />
                </div>
                <div className="md:col-span-3 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h3>
                  <p className="text-gray-600 mb-6">
                    If you cannot find the answer to your question in our FAQ, you can always contact us.
                    We're here to help!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button>Contact Support</Button>
                    <Button variant="outline">Live Chat</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Popular Guides */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-purple-100 text-purple-800">Helpful Resources</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Guides & Articles</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Detailed guides to help you navigate various aspects of shopping with us.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Complete Guide to Returns & Exchanges",
                  description: "Learn how to initiate returns, what can be returned, and how refunds work.",
                  icon: <RotateCcw className="h-8 w-8 text-red-600" />
                },
                {
                  title: "Understanding Shipping Options",
                  description: "Details about standard delivery, express shipping, and international options.",
                  icon: <Truck className="h-8 w-8 text-green-600" />
                },
                {
                  title: "Payment Methods Explained",
                  description: "Learn about all available payment methods, security, and processing times.",
                  icon: <CreditCard className="h-8 w-8 text-blue-600" />
                }
              ].map((guide, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-4">
                      {guide.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{guide.title}</h3>
                    <p className="text-gray-600 mb-6">{guide.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Read More
                    </Button>
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

export default FAQPage;
