
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star, User, MessageSquare, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuthCheck } from "../hooks/useAuthCheck";

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  helpful?: number;
}

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { requireAuth } = useAuthCheck();
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      user: "John D.",
      rating: 5,
      comment: "Excellent product! The quality exceeded my expectations. Fast delivery and great customer service.",
      date: "2024-01-15",
      helpful: 12
    },
    {
      id: "2", 
      user: "Sarah M.",
      rating: 4,
      comment: "Good quality product. The design is beautiful and it works perfectly. Would recommend to others.",
      date: "2024-01-10",
      helpful: 8
    },
    {
      id: "3",
      user: "Mike Johnson",
      rating: 5,
      comment: "Amazing! This is exactly what I was looking for. The product description was accurate and shipping was quick.",
      date: "2024-01-08",
      helpful: 15
    }
  ]);
  
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [reviewerName, setReviewerName] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmitReview = () => {
    if (!requireAuth('write a review')) return;
    
    if (newReview.trim() && reviewerName.trim()) {
      const review: Review = {
        id: Date.now().toString(),
        user: reviewerName,
        rating: newRating,
        comment: newReview,
        date: new Date().toISOString().split('T')[0],
        helpful: 0
      };
      
      setReviews([review, ...reviews]);
      setNewReview("");
      setNewRating(5);
      setReviewerName("");
      setShowReviewForm(false);
    }
  };

  const handleHelpful = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: (review.helpful || 0) + 1 }
        : review
    ));
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 : 0
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <h3 className="text-3xl font-bold text-gray-900">Customer Reviews</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-6 w-6 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
            </div>
            <span className="text-gray-500 text-lg">Based on {reviews.length} reviews</span>
          </div>
        </div>
        
        <Button 
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
        >
          Write a Review
        </Button>
      </div>

      {/* Rating Distribution */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <h4 className="font-semibold text-lg mb-4">Rating Breakdown</h4>
          <div className="space-y-3">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-400" />
              Write Your Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Your Name</label>
                <Input
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Enter your name"
                  className="border-2 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Rating</label>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-8 w-8 cursor-pointer transition-all duration-200 ${
                        i < newRating ? 'text-yellow-400 fill-yellow-400 scale-110' : 'text-gray-300 hover:text-yellow-400 hover:scale-105'
                      }`}
                      onClick={() => setNewRating(i + 1)}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Your Review</label>
              <Textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Share your experience with this product. What did you like? How was the quality?"
                rows={4}
                className="border-2 focus:border-blue-500"
              />
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={handleSubmitReview}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-blue-600 hover:to-green-600"
                disabled={!newReview.trim() || !reviewerName.trim()}
              >
                Submit Review
              </Button>
              <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{review.user}</p>
                    <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                    />
                  ))}
                  <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
                    {review.rating}/5
                  </Badge>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4 text-lg">{review.comment}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleHelpful(review.id)}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Helpful ({review.helpful || 0})
                </Button>
                <span className="text-xs text-gray-400">Review #{review.id}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-600 mb-2">No Reviews Yet</h4>
            <p className="text-gray-500">Be the first to review this product!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductReviews;
