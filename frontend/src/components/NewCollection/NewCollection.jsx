import Item from '../Item/Item';

const NewCollection = ({ products = [] }) => {
  const recentItems = products.slice(0, 8);

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-royal font-bold text-xs uppercase tracking-wider mb-1">Fresh Listings</div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy">Fresh listings from campus</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentItems.map((product) => (
            <Item key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewCollection;
