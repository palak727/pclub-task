import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import { api, getProductId } from '../utils/api';
import { useShop } from '../context/ShopContext';
import { ArrowLeft } from 'lucide-react';

const ProductPage = () => {
  const { productId } = useParams();
  const { all_product } = useShop();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = all_product.find((p) => String(getProductId(p)) === String(productId));
    if (found) {
      setProduct(found);
      setLoading(false);
      return;
    }

    api
      .get(`/products/${productId}`)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [productId, all_product]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center glass-card my-12">
        <h2 className="text-2xl font-bold text-navy mb-2">Item Not Found</h2>
        <p className="text-slate-500 text-sm mb-6">The requested campus listing may have been sold or removed.</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2 text-sm">
          <ArrowLeft size={16} /> Return to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-royal mb-6">
        <ArrowLeft size={16} /> Back to Listings
      </Link>
      <ProductDisplay product={product} />
    </div>
  );
};

export default ProductPage;
