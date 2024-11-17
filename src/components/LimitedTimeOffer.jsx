export default function LimitedTimeOffer() {
    return (
        <div className="max-w-7xl mx-auto px-4 mt-16">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 text-3xl sm:text-5xl font-bold mb-4">
                Limited Time Offer 🚀
            </h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center mt-8">
                <ProductCard />
                <ProductCard />
            </div>
            <Banner />
        </div>
    );
}

const ProductCard = () => {
    return (
        <div className="bg-gradient-to-br from-[#1f1c2c] to-[#403b4a] rounded-2xl p-4 shadow-xl w-full transition hover:scale-105 hover:shadow-2xl duration-300">
            <div className="border-[0.5px] p-8">
                <div className="flex items-center gap-6">
                    <img
                        src="https://techno-workdo.myshopify.com/cdn/shop/files/1_a8b34ad1-e057-4985-8ffa-fd6151a892e9_600x600.png?v=1714541495"
                        alt="Boult Audio K40"
                        className="w-32 h-32 object-contain rounded-lg"
                    />
                    <div className="space-y-3">
                        <h3 className="text-white text-3xl font-bold tracking-tight">
                            Boult Audio K40
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="text-pink-400 font-semibold text-2xl">
                                $50.00
                            </span>
                            <del className="text-gray-400 text-lg">$55.00</del>
                        </div>
                        <button className="px-5 py-2 text-lg bg-pink-500 hover:bg-pink-600 hover:text-white transition duration-300 text-black rounded-full shadow-lg">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Banner = () => {
    return (
        <div className="relative flex flex-col md:flex-row mt-8 justify-center items-center h-96 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-lg shadow-lg overflow-hidden gap-12">
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />
            <div className="relative z-10 text-center md:text-left space-y-4">
                <h1 className="text-4xl font-bold">Hurry Up!</h1>
                <h2 className="text-3xl font-semibold">Up To 25% Discount</h2>
                <p className="text-lg">Check it Out</p>
                <button className="mt-4 px-6 py-2 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-300" onClick={() => window.location.href = '/products'}>
                    Shop Now 🛍️
                </button>
            </div>
            <img
                src="https://techno-workdo.myshopify.com/cdn/shop/files/offer-banner.png?v=1714650626"
                alt="Offer Banner"
                className="relative z-10 w-full md:w-1/2  object-contain rounded-lg mt-4 md:mt-0"
            />
        </div>
    );
};