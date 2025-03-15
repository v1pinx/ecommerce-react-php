import React, { useState, useEffect } from "react";
import { Star, ThumbsUp, MessageCircle, User } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios"; // For API requests
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const ReviewSection = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: "",
    });
    const [likedReviews, setLikedReviews] = useState({});


    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const RatingStars = ({ rating }) => (
        <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
                <Star
                    key={index}
                    className={`w-4 h-4 ${index < rating
                        ? "fill-purple-400 text-purple-400"
                        : "text-gray-600"
                        }`}
                />
            ))}
        </div>
    );

    // Fetch reviews from backend
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${API_URL}/write-review.php?productId=${productId}`);
                setReviews(response.data.reviews);
                console.log("Reviews fetched successfully:", response.data.reviews);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [productId], [reviews]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/ca3/api/write-review.php`, {
                product_id: productId,
                rating: newReview.rating,
                comment: newReview.comment,
            });
            if (response.data.success) {
                const updatedReviews = await axios.get(`$API_URL/api/write-review.php?productId=${productId}`);
                setReviews(updatedReviews.data.reviews);
                console.log("Review submitted successfully:", response.data.newReview);
                setShowReviewForm(false);
                setNewReview({ rating: 5, comment: "" });
            } else {
                toast.error("Failed to submit review.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto px-4 py-24"
        >
            {/* Reviews Header */}
            <motion.div variants={fadeIn} className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Customer Reviews
                    </h2>
                    <p className="text-gray-400 mt-2">
                        {reviews.length} reviews for this product
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium cursor-pointer"
                >
                    Write a Review
                </motion.button>
            </motion.div>

            {/* Review Form */}
            {showReviewForm && (
                <motion.form
                    variants={fadeIn}
                    onSubmit={handleSubmitReview}
                    className="mb-8 p-6 bg-black/40 rounded-xl border border-purple-900/40 backdrop-blur-sm"
                >
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                    className="focus:outline-none"
                                >
                                    <Star
                                        className={`w-6 h-6 ${star <= newReview.rating
                                            ? "fill-purple-400 text-purple-400"
                                            : "text-gray-600"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Your Review</label>
                        <textarea
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-900/40 text-gray-200 focus:outline-none focus:border-purple-500"
                            rows="4"
                            placeholder="Share your thoughts about the product..."
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium"
                    >
                        Submit Review
                    </motion.button>
                </motion.form>
            )}

            {/* Reviews List */}
            <motion.div variants={containerVariants} className="space-y-6">
                {[...reviews].reverse().map((review) => (
                    <motion.div
                        key={review.review_id}
                        variants={fadeIn}
                        className="p-6 bg-black/40 rounded-xl border border-purple-900/40 backdrop-blur-sm group hover:border-purple-500/40 transition-colors duration-300"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-950/80 rounded-full">
                                    <User className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-purple-300 font-medium">Anonymous</h3>
                                    <p className="text-sm text-gray-400">{review.updated_at}</p>
                                </div>
                            </div>
                            <RatingStars rating={review.rating} />
                        </div>

                        <p className="text-gray-300 mb-4">{review.review_text}</p>

                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <motion.button
                                onClick={() => {
                                    setLikedReviews(prev => ({
                                        ...prev,
                                        [review.review_id]: !prev[review.review_id]
                                    }));
                                }}
                                whileTap={{ scale: 1.2 }}
                                className={`flex items-center gap-2 transition-colors ${likedReviews[review.review_id]
                                    ? "text-purple-500"
                                    : "hover:text-purple-400"
                                    }`}
                            >
                                <motion.div
                                    animate={
                                        likedReviews[review.review_id]
                                            ? {
                                                scale: [1, 1.5, 1],
                                                rotate: [0, 15, -15, 0],
                                                fill: ["transparent", "purple", "transparent"]
                                            }
                                            : {}
                                    }
                                    transition={{ duration: 0.5 }}
                                >
                                    <ThumbsUp
                                        className={`w-4 h-4 ${likedReviews[review.review_id]
                                            ? "fill-purple-400"
                                            : ""
                                            }`}
                                    />
                                </motion.div>
                                {likedReviews[review.review_id]
                                    ? review.helpful + 1
                                    : review.helpful} Helpful

                            </motion.button>
                        </div>

                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default ReviewSection;
