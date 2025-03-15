import React, { useEffect, useState } from "react";
import axios from "axios";
import 'remixicon/fonts/remixicon.css';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { a, div } from "framer-motion/client";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { UserRound } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Navbar() {
    return (
        <>
            <nav className="flex justify-around items-center bg-black px-8 sm:px-16 py-4 shadow-md absolute w-full z-10">
                <a href="/">
                    <div className="font-extrabold text-3xl text-white">Square</div>
                </a>
                <div className="flex gap-6 text-white">
                    <FlyoutLink2 href="/">Home</FlyoutLink2>
                    <FlyoutLink
                        href="/products"
                        FlyoutContent={CategoryContent}
                    >
                        Products
                    </FlyoutLink>
                    <FlyoutLink
                        href="/"
                        FlyoutContent={PageContent}
                    >
                        Pages
                    </FlyoutLink>
                </div>
                <div className="flex gap-2">
                    {/* User profile  */}

                    <div className="rounded-full flex justify-center cursor-pointer  text-white">
                        <FlyoutLink
                            href='#'
                            FlyoutContent={UserContent}
                        >
                            <UserRound />
                        </FlyoutLink>
                    </div>
                    {/* User cart */}
                    <FlyoutLink2 href='/user/cart'>
                        <div className="rounded-full flex justify-center cursor-pointer  text-white" title="Cart">
                            <ShoppingCart></ShoppingCart>
                        </div>
                    </FlyoutLink2>
                </div>
            </nav>
        </>
    )

}

const FlyoutLink2 = ({ children, href }) => {
    const [open, setOpen] = useState(false);
    const showFlyout = open;
    const [categoryHover, setCategoryHover] = useState(false);

    return (
        <div
            onMouseEnter={() => {
                setOpen(true);
            }}
            onMouseLeave={() => {
                setOpen(false);
            }}
            className="relative h-fit w-fit">
            <a className="relative text-white" href={href} onMouseEnter={() => setCategoryHover(true)} onMouseLeave={() => setCategoryHover(false)}>{children}
                <span
                    style={{
                        transform: categoryHover ? "scaleX(1)" : "scaleX(0)",
                    }}
                    className="absolute -bottom-2 -left-2 -right-2 h-[0.05rem] origin-left rounded-full bg-indigo-300 transition-transform duration-300 ease-out">
                </span>
            </a>
            <AnimatePresence>
                {showFlyout && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        style={{ x: "-50%" }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute left-1/2 top-12 b-white text-black ">
                        <div className="absolute -top-6 left-0 right-0 h-6 "></div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const FlyoutLink = ({ children, href, FlyoutContent }) => {
    const [open, setOpen] = useState(false);
    const showFlyout = open;
    const [categoryHover, setCategoryHover] = useState(false);

    return (
        <div
            onMouseEnter={() => {
                setOpen(true);
            }}
            onMouseLeave={() => {
                setOpen(false);
            }}
            className="relative h-fit w-fit">
            <a className="relative text-white" href={href} onMouseEnter={() => setCategoryHover(true)} onMouseLeave={() => setCategoryHover(false)}>{children}
                <span
                    style={{
                        transform: categoryHover ? "scaleX(1)" : "scaleX(0)",
                    }}
                    className="absolute -bottom-2 -left-2 -right-2 h-[0.05rem] origin-left rounded-full bg-indigo-300 transition-transform duration-300 ease-out">
                </span>
            </a>
            <AnimatePresence>
                {showFlyout && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        style={{ x: "-50%" }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute left-1/2 top-12 b-white text-black ">
                        <div className="absolute -top-6 left-0 right-0 h-6 "></div>
                        <FlyoutContent />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const CategoryContent = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/getCategory.php`);
                if (response.data && Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    setCategories([]);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) {
        return <div className="text-white">Loading categories...</div>;
    }

    return (
        <div className="w-40 bg-black px-6 py-4 shadow-2xl -left-11 absolute">
            <div className="space-y-2 text-white">
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <motion.div
                            key={index}
                            className="relative"
                            whileHover={{ scale: 1.1 }}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                        >
                            <motion.a
                                href={`/products`}
                                className="relative"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </motion.a>
                            <motion.span
                                initial={{ scaleX: 0 }}
                                animate={{
                                    scaleX: hoveredIndex === index ? 1 : 0,
                                    transition: { duration: 0.3, ease: "easeOut" }
                                }}
                                className="absolute -bottom-1 -left-2 -right-2 h-[0.05rem] origin-right rounded-full bg-indigo-300"
                            />
                        </motion.div>
                    ))
                ) : (
                    <div className="text-white">Loading...</div>
                )}
            </div>
        </div>
    );
};


const UserContent = () => {
    const navigate = useNavigate();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    
    let name = localStorage.getItem('name') || "User";
    const pagesObj = {
        [name]: '#',
        'Logout': '#',
    };

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        localStorage.removeItem('admin');
        toast('Logging Out', { icon: '👏' });
        setTimeout(() => {
            navigate('/Login');
        }, 2000);
    }

    return (
        <div className="w-28 bg-black p-6 shadow-2xl absolute -right-5">
            <div className="space-y-2 text-white">
                {Object.entries(pagesObj).map(([key, url], index) => (
                    <motion.div
                        key={index}
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                    >
                        <motion.a
                            href={url}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.5 } }}
                            className="block w-full"
                            onClick={() => {
                                if (key === 'Logout') logout();
                            }}
                        >
                            {key}
                        </motion.a>
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-indigo-300 origin-left"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

const PageContent = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const pagesObj = {
        "Home": "/",
        // "About Us": "/about",
        "Products": "/products",
        "Cart": "/user/cart",
        "Order History": "user/orders",
        // "Wishlist": "/user/wishlist",
        "Contact Us": "/contact",
        "Terms of Service": "/tos",
        "Privacy Policy": "/privacy-policy",
    };

    return (
        <div className="w-48 bg-black px-6 py-4 shadow-2xl -left-8 absolute">
            <div className="space-y-2 text-white">
                {Object.entries(pagesObj).map(([key, url], index) => (
                    <motion.div
                        key={index}
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                    >
                        <Link
                            to={url} // Use Link from react-router-dom
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="block w-full"
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalizing first letter */}
                        </Link>
                        <span
                            style={{
                                transform: hoveredIndex === index ? "scaleX(1)" : "scaleX(0)",
                            }}
                            className="absolute -bottom-1 -left-2 -right-2 h-[0.05rem] origin-right rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
                        ></span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
