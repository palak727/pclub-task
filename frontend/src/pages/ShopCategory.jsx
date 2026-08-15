import { useParams } from 'react-router-dom'; 
import ShopCategoryComponent from '../components/ShopCategory/ShopCategory';
import { useShop } from '../context/ShopContext';

const CATEGORY_META = {
  coolers: {
    title: 'Cooling Essentials',
    desc: 'Portable cooling solutions for warmer hostel days and study spaces.',
  },
  mattresses: {
    title: 'Mattresses & Bedding',
    desc: 'Comfortable bedding essentials for a better hostel sleep setup.',
  },
  cycles: {
    title: 'Campus Rides',
    desc: 'Easy everyday ride options for quick movement across campus.',
  },
  academics: {
    title: 'Study Essentials',
    desc: 'Course materials, notes, and practical items for daily student life.',
  },
  appliances: {
    title: 'Room & Study Appliances',
    desc: 'Useful everyday gadgets and small appliances for hostel life.',
  },
};

const ShopCategoryPage = () => {
  const { category } = useParams();
  const { all_product } = useShop();

  const meta = CATEGORY_META[category?.toLowerCase()] || {
    title: `${category || 'Category'} Essentials`,
    desc: 'Browse items listed by IITK graduating seniors.',
  };

  return (
    <ShopCategoryComponent
      categoryName={category}
      products={all_product}
      categoryTitle={meta.title}
      bannerDesc={meta.desc}
    />
  );
};

export default ShopCategoryPage;