import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Stars, ShoppingCart, Heart, User } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


const FlyoutLink = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative h-fit w-fit"
      whileHover={{ scale: 1.05 }}
    >
      <Link
        to={href}
        className="relative text-purple-300 font-serif hover:text-purple-200 transition-colors"
      >
        {children}
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: open ? 1 : 0 }}
          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-purple-500 origin-left"
          transition={{ duration: 0.3 }}
        />
      </Link>

      {open && FlyoutContent && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute left-1/2 top-12 -translate-x-1/2"
        >
          <div className="absolute -top-6 left-0 right-0 h-6 "></div>
          <FlyoutContent />
        </motion.div>
      )}
    </motion.div>
  );
};

const NavbarIcon = ({ Icon, href }) => (
  <Link to={href}>
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="p-2 rounded-lg bg-purple-950/50 backdrop-blur-sm border border-purple-900/40 hover:border-purple-500/50 transition-colors"
    >
      <Icon className="w-5 h-5 text-purple-400" />
    </motion.div>
  </Link>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-purple-900/40"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Stars className="w-6 h-6 text-purple-400" />
            <motion.span
              className="text-2xl font-serif font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Square
            </motion.span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <FlyoutLink href="/">Home</FlyoutLink>
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

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <NavbarIcon Icon={User} href="/" />
            <NavbarIcon Icon={Heart} href="#" />
            <NavbarIcon Icon={ShoppingCart} href="/user/cart" />
          </div>
        </div>
      </div>

      {/* Magical Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              y: [0, -10, 0],
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </motion.nav>
  );
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
          console.log(response.data)
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
    return (
      <motion.div
        className="w-48 p-4 bg-black/90 backdrop-blur-xl rounded-xl border border-purple-900/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-purple-300 font-serif">Loading categories...</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-48 p-4 bg-black/90 backdrop-blur-xl rounded-xl border border-purple-900/40"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="space-y-2">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <motion.div
              key={index}
              className="relative"
              whileHover={{ x: 5 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Link
                to={`/products`}
                className="block text-purple-300 hover:text-purple-200 font-serif transition-colors"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: hoveredIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-purple-500 origin-left"
              />
            </motion.div>
          ))
        ) : (
          <div className="text-purple-300 font-serif">No categories found</div>
        )}
      </div>
    </motion.div>
  );
};


const PageContent = () => {
  const pages = {
    "Home": "/",
    "Products": "/products",
    "Cart": "/user/cart",
    "Orders": "/user/orders",
    "Contact": "/contact",
    "Terms": "/tos",
  };

  return (
    <motion.div
      className="w-48 p-4 bg-black/90 backdrop-blur-xl rounded-xl border border-purple-900/40"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="space-y-2">
        {Object.entries(pages).map(([key, url], index) => (
          <motion.div
            key={index}
            className="relative"
            whileHover={{ x: 5 }}
          >
            <Link
              to={url}
              className="block text-purple-300 hover:text-purple-200 font-serif transition-colors"
            >
              {key}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};