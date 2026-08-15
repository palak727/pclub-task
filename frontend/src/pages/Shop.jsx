import Hero from '../components/Hero/Hero';
import Item from '../components/Item/Item';
import { useShop } from '../context/ShopContext';
import { useMemo } from 'react';

const getUploadedAt = (product) => {
  const raw = product?.createdAt || product?.updatedAt || product?.date || product?.publishedAt;
  if (!raw) return 0;
  return new Date(raw).getTime() || 0;
};

const Shop = () => {
  const { all_product, searchQuery } = useShop();

  const filteredProducts = useMemo(() => {
    const baseProducts = searchQuery
      ? all_product.filter(
          (p) =>
            p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.hall?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : all_product;

    return [...baseProducts].sort((a, b) => getUploadedAt(b) - getUploadedAt(a));
  }, [all_product, searchQuery]);

  return (
    <div>
      {!searchQuery && <Hero />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-bold text-royal uppercase tracking-wider">Hall Pickups</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy mt-1">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Available Campus Essentials'}
            </h2>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 glass-card">
            <p className="text-slate-500">
              {searchQuery
                ? 'No campus items match your search. Try searching for "cooler", "cycle", or "Hall 12".'
                : 'No campus items are available right now.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <Item key={item._id || item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;