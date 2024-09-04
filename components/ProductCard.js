import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const itemStagger = {
  hidden: { opacity: 0, scale: 0.1 },
  show: { opacity: 1, scale: 1.0 },
};

export default function ProductCard({ product, keyID }) {
  return (
    <motion.article variants={itemStagger} key={keyID} exit={{ opacity: 0 }}>
      <Link className="group max-w-xl" href={`/products/${encodeURIComponent(product.slug)}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white rounded-2xl shadow overflow-hidden group-hover:brightness-90"
          key={product.id}
        >
          <div className="relative w-full h-auto md:h-auto">
            {/* Keep the same height for mobile and laptop */}
            <Image
              src={product.imgPaths[0]}
              alt={product.title}
              width={996}
              height={1280}
              className="object-contain w-full h-auto"
              sizes="100vw"
              priority
            />
          </div>
          <div className="p-4 text-xl">
              <p className="text-gray-800 w-full font-bold truncate pb-2">{product.title}</p>
            <div className="flex justify-between">
            <p ></p>
              <p className="text-blue-400 font-bold">QAR {product.price}</p>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}