import React from 'react';

const TwoImageSection = () => {
    const images = [
        {
            src: '//techno-workdo.myshopify.com/cdn/shop/files/box-image-1.png?v=1714622893',
            subtitle: 'Sony Mdr 10rbt',
            title: 'New Collection',
            link: '/products',
        },
        {
            src: '//techno-workdo.myshopify.com/cdn/shop/files/box-image-2.png?v=1714622894',
            subtitle: 'MacBook Pro',
            title: 'Best New',
            link: '/products',
        },
    ];

    return (
        <section className="max-w-7xl mx-auto pb-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap">
                    {images.map((image, index) => (
                        <div key={index} className="w-full md:w-1/2 p-4">
                            <div className="relative">
                                <img
                                    src={image.src}
                                    alt={image.subtitle}
                                    loading="lazy"
                                    className="w-full rounded-md"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-md text-center p-6 space-y-4">
                                    <div className="text-white text-lg">{image.subtitle}</div>
                                    <h2 className="text-2xl font-semibold text-white">
                                        {image.title}
                                    </h2>
                                    <a
                                        href={image.link}
                                        className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300 transition"
                                    >
                                        Shop Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TwoImageSection;
