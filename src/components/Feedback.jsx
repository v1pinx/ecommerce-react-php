import React from 'react';

export default function Feedback() {
    return (
        <div className="max-w-7xl mx-auto mt-16 p-6 rounded-lg shadow-lg">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-300 text-3xl sm:text-5xl font-bold mb-6">
                OUR CUSTOMER FEEDBACK
            </h2>

            <div className="flex flex-col md:flex-row items-center ">
                <div className="w-full md:w-1/3 mb-6 flex justify-center h-72">
                    <img
                        src="//techno-workdo.myshopify.com/cdn/shop/files/testimonial-image.png?v=1714652745"
                        alt="testimonial"
                        className="rounded-full shadow-lg"
                        loading="lazy"
                    />
                </div>
                <div className="bg-gray-800 text-white lg:w-2/3 p-6 rounded-lg shadow-md">
                    <p className="mb-4">
                        "The range of products available is extensive, and the detailed product descriptions and specifications provided helped me make an informed decision. The checkout process was smooth and secure, giving me confidence in my purchase."
                    </p>
                    <div className="flex items-center mb-4">
                        <img
                            src="//techno-workdo.myshopify.com/cdn/shop/files/star-image.png?v=1714652744"
                            alt="review-star"
                            className="h-5"
                            loading="lazy"
                        />
                        <span className="ml-2 text-lg font-semibold">4.0</span>
                    </div>
                    <h3 className="font-semibold text-lg">Jothan Don</h3>
                    <div className="text-gray-400">Customer of Our Shop</div>
                    <div className="testimonial-icon mt-2">
                        <img
                            src="//techno-workdo.myshopify.com/cdn/shop/files/testimonial-icon.png?v=1714652745"
                            alt="testimonial-icon"
                            className="h-6"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}