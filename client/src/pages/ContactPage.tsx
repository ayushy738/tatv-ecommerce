import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Shield } from "lucide-react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      title: "Visit Our Office",
      details: ["123 Business Avenue", "Hyderabad, Telengana", "India"],
      action: "Get Directions"
    },
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: "Call Us",
      details: ["+91 91555 23819", "+91 87654 32109", "Mon-Sat: 9AM-7PM"],
      action: "Call Now"
    },
    {
      icon: <Mail className="h-6 w-6 text-purple-600" />,
      title: "Email Us",
      details: ["tatvecommerce@gmail.com","Quick response within 24hrs"],
      action: "Send Email"
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-orange-600" />,
      title: "Live Chat",
      details: ["Available 24/7", "Instant support", "AI-powered assistance"],
      action: "Start Chat"
    }
  ];

  const faqs = [
    {
      question: "What are your business hours?",
      answer: "We're available Monday to Saturday from 9:00 AM to 7:00 PM IST. Our live chat support is available 24/7."
    },
    {
      question: "How can I track my order?",
      answer: "You can track your order by visiting the 'My Orders' section in your account."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we ship within India only. We're working on expanding our shipping to international locations."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 7-day return policy for most items. Products should be in original condition with tags attached."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20 text-white">
          <div className="container text-center">
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Have questions, feedback, or need assistance? We're here to help! 
              Reach out to us through any of the channels below.
            </p>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-800">Contact Information</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Multiple Ways to Reach Us</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose the most convenient way to get in touch with our team.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-4">
                      {info.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                    <div className="space-y-1 mb-4">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      {info.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <Badge className="mb-4 bg-purple-100 text-purple-800">Send us a Message</Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  We'd Love to Hear From You
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form and our team will get back to you within 24 hours. 
                  For urgent matters, please call us directly.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-600">Response within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-gray-600">Your data is safe with us</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-600">Professional support team</span>
                  </div>
                </div>
              </div>

              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="How can we help?"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-green-100 text-green-800">Frequently Asked Questions</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Answers</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find answers to the most common questions our customers ask.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">Don't see your question here?</p>
              <Button variant="outline">
                View All FAQs
              </Button>
            </div>
          </div>
        </section>

        {/* Map Section */}
        {/* <section className="py-16 bg-gray-100">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
              <p className="text-gray-600">We're located in the heart of Mumbai</p>
            </div>
            
            <div className="bg-gray-300 h-96 rounded-xl flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg font-medium">Interactive Map</p>
                <p className="text-sm">123 Business Avenue, Mumbai, Maharashtra 400001</p>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
