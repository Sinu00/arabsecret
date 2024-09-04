import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts, getProductFromSlug, formatPriceWithDecimals } from '@/utils/products';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

export default function ProductPage({ product, cartItems, setCartItems }) {
    const priceWithDecimals = formatPriceWithDecimals(product.price);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    function handleAddToCart() {
        let isFound = false;

        if (cartItems.length <= 0) {
            setCartItems([{ ...product, quantity: 1, totalPrice: product.price }]);
            return;
        }

        const newItems = cartItems.map((item) => {
            if (item.slug === product.slug) {
                isFound = true;
                return {
                    ...item,
                    quantity: item.quantity + 1,
                    totalPrice: (item.quantity + 1) * item.price,
                };
            }
            return item;
        });

        if (isFound) {
            setCartItems(newItems);
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1, totalPrice: product.price }]);
        }
    }

    return (
        <motion.div initial={{ opacity: 0.1, y: -100 }} animate={{ opacity: 1.0, y: 0 }}>
            <Head>
                <title>{product.title}</title>
            </Head>
            <header className="mb-4 md:mb-12">
                <h1 className="font-bold text-3xl md:text-5xl">{product.title}</h1>
            </header>
            <article className="md:grid md:grid-cols-2 md:gap-16">
                <div className="mb-4 w-full relative rounded-2xl shadow overflow-hidden md:mb-0">
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        pagination={{ clickable: true }}
                        modules={[Navigation, Pagination]}
                        onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
                    >
                        {product.imgPaths.map((imgPath, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={imgPath}
                                    width={1000}
                                    height={750}
                                    className="object-contain"
                                    alt={`${product.title} image ${index + 1}`}
                                    priority
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 bg-black bg-opacity-50 rounded-full z-10 cursor-pointer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 4L8 12L16 20" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 bg-black bg-opacity-50 rounded-full z-10 cursor-pointer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 4L16 12L8 20" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col justify-between xl:justify-start">
                    <div className="flex text-3xl justify-between items-center mb-4 md:mb-6 font-bold md:text-5xl md:pb-4 md:border-b-2 md:border-b-gray-300">
                        <p>QAR {priceWithDecimals}</p>
                        <p>{product.size}</p>
                    </div>
                    <div className="flex gap-4 md:flex-col">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAddToCart}
                            className="bg-gray-800 text-white w-full rounded-2xl py-4 px-4 text-2xl font-medium hover:bg-gray-700"
                        >
                            Add to cart
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link className="w-full self-end gap-4 flex items-center justify-center bg-white rounded-2xl text-2xl py-4 px-4 font-medium shadow hover:bg-gray-200" href="/products">
                                <p className="text-center">Back</p>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 8L3.29289 8.70711L2.58579 8L3.29289 7.29289L4 8ZM9 20C8.44772 20 8 19.5523 8 19C8 18.4477 8.44772 18 9 18L9 20ZM8.29289 13.7071L3.29289 8.70711L4.70711 7.29289L9.70711 12.2929L8.29289 13.7071ZM3.29289 7.29289L8.29289 2.29289L9.70711 3.70711L4.70711 8.70711L3.29289 7.29289ZM4 7L14.5 7L14.5 9L4 9L4 7ZM14.5 20L9 20L9 18L14.5 18L14.5 20ZM21 13.5C21 17.0898 18.0898 20 14.5 20L14.5 18C16.9853 18 19 15.9853 19 13.5L21 13.5ZM14.5 7C18.0898 7 21 9.91015 21 13.5L19 13.5C19 11.0147 16.9853 9 14.5 9L14.5 7Z" fill="#1F2937" />
                                </svg>
                            </Link>
                        </motion.button>
                    </div>
                </div>
            </article>
        </motion.div>
    );
}

export async function getStaticPaths() {
    const products = getAllProducts();

    const slugs = products.map((product) => {
        return {
            params: {
                slug: product.slug,
            },
        };
    });

    return {
        paths: slugs,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const slug = params.slug;
    const product = getProductFromSlug(slug);
    return {
        props: {
            product: product,
        },
    };
}
