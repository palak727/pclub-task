import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const imagesPath = path.join(__dirname, 'images');

const images = fs.readdirSync(imagesPath)
  .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

const getImage = (filename) => {
  if (!images.includes(filename)) {
    throw new Error(`Image not found: ${filename}`);
  }

  return `/images/${filename}`;
};

export const seedProducts = [
  // ── COOLERS ────────────────────────────────────────────
  {
    name: 'Symphony Diet 3D Tower Air Cooler 55L',
    category: 'coolers',
    new_price: 4200,
    old_price: 9999,
    description:
      'Premium Symphony tower cooler equipped with i-Pure console technology, 3-side honeycomb cooling pads, and an auto-drain system. Maintained in top condition through 3 Kanpur summers in Hall 12 Room 214. Effectively cools a 30×20 ft room with high airflow efficiency. Features original heavy-duty castor wheels for smooth hostel-room repositioning and a sleek vertical profile that saves floor space.',
    image: getImage('SymphonyCooler1.png'),
    images: [
      getImage('SymphonyCooler1.png'),
      getImage('SymphonyCooler2.png'),
      getImage('SymphonyCooler3.png'),
    ],
    hall: 'Hall 12',
    condition: 'Barely Used',
    defects: ['Minor lime scale on water tray', 'Honeycomb pads replaced last summer'],
    status: 'available',
    sellerName: 'Aman Sharma (Y22)',
  },
  {
    name: 'Bajaj PCF 25DLX Personal Air Cooler 24L',
    category: 'coolers',
    new_price: 1800,
    old_price: 4299,
    description:
      'Compact and reliable Bajaj personal cooler, custom-tailored for single-room hostel accommodation. Built with Hexacool technology pads and an anti-bacterial water tank to maintain clean airflow. Operates with low noise emission at night, making it an ideal study companion during exam season. Operated carefully for 2 summers in Hall 5 Room 107.',
    image: getImage('BajajCooler1.png'),
    images: [
      getImage('BajajCooler1.png'),
      getImage('BajajCooler2.png'),
      getImage('BajajCooler3.png'),
    ],
    hall: 'Hall 5',
    condition: 'Barely Used',
    defects: ['Slight water mark on top panel', 'Remote included'],
    status: 'available',
    sellerName: 'Priya Verma (Y22)',
  },

  // ── CYCLES ─────────────────────────────────────────────
  {
    name: 'Hero Hawk 27T Single-Speed Road Cycle',
    category: 'cycles',
    new_price: 3200,
    old_price: 7499,
    description:
      'Hero Hawk 27-inch steel frame classic road bicycle. Exceptionally sturdy layout built to effortlessly handle daily campus transit across the Hall 1 → LHC → Library route. Fitted with brand new high-grip MRF tyres in July 2026. Responsive front and rear caliper brakes with a cleanly lubricated single-speed chain drivetrain.',
    image: getImage('HeroCycle1.png'),
    images: [
      getImage('HeroCycle1.png'),
      getImage('HeroCycle2.png'),
    ],
    hall: 'Hall 1',
    condition: 'Barely Used',
    defects: ['New MRF rear tyre (July 2026)', 'Small paint chip on front fork', 'Both brakes working'],
    status: 'available',
    sellerName: 'Rohan Gupta (Y22)',
  },
  {
    name: 'Firefox Target 21-Speed Gear Cycle',
    category: 'cycles',
    new_price: 5500,
    old_price: 14999,
    description:
      'High-performance Firefox Target featuring precision Shimano 21-speed gear shifters, mechanical disc brakes on both front & rear wheels, and durable lightweight aluminium rims. Built to comfortably conquer rough terrains like the MT and Hall 13 slopes. Fully serviced and tuned up at the local campus cycle station last week. Heavy-duty lock and portable pump included at no extra cost.',
    image: getImage('FirefoxCycle2.png'),
    images: [
      getImage('FirefoxCycle2.png'),
    ],
    hall: 'Hall 13',
    condition: 'Barely Used',
    defects: ['Shimano derailleur adjusted', 'New brake cables', 'Comes with Godrej cycle lock'],
    status: 'available',
    sellerName: 'Sneha Patel (Y22)',
  },
  {
    name: 'Hercules Roadeo Hank 26T MTB Cycle',
    category: 'cycles',
    new_price: 2800,
    old_price: 8999,
    description:
      'Hercules Roadeo Hank 26-inch mountain bike featuring smooth front suspension travel and reliable 18-speed Shimano gear setup. Structurally robust steel frame with responsive handling. Note that the rear tyre tube requires a replacement, which is reflected in the discounted pricing. Makes an excellent quick DIY project for incoming freshers who enjoy maintenance work.',
    image: getImage('HerculesCycle1.png'),
    images: [
      getImage('HerculesCycle1.png'),
      getImage('HerculesCycle2.png'),
      getImage('HerculesCycle3.png'),
    ],
    hall: 'GH-1',
    condition: 'Heavily Used',
    defects: ['Rear tube punctured — needs replacement', 'Front suspension functional', 'Gear shift smooth'],
    status: 'available',
    sellerName: 'Ananya Roy (Y22)',
  },

  // ── MATTRESSES ─────────────────────────────────────────
  {
    name: 'Sleepwell Ortho Pro Spring Mattress 6" (Single)',
    category: 'mattresses',
    new_price: 2500,
    old_price: 6999,
    description:
      'Sleepwell Ortho Pro 6-inch luxury bonnell spring single mattress engineered for optimal back support. Precision-sized to fit standard IITK hostel single cots (6×3 ft) seamlessly. Maintained for one academic year with a dedicated waterproof mattress protector—completely pristine with zero stains. Accompanied by its original zippered breathable cotton cover. Convenient pickup from Hall 1 Room 312.',
    image: getImage('Matress1-1.png'),
    images: [
      getImage('Matress1-1.png'),
      getImage('Matress1-2.png'),
    ],
    hall: 'Hall 1',
    condition: 'Brand New',
    defects: ['Always used with mattress protector', 'Includes zippered cotton cover'],
    status: 'available',
    sellerName: 'Rohan Gupta (Y22)',
  },
  {
    name: 'Kurlon Convenio High-Density Foam Mattress 4" (Single)',
    category: 'mattresses',
    new_price: 1500,
    old_price: 3999,
    description:
      'Kurlon 4-inch high-density resilient foam mattress featuring advanced anti-sag architecture. Built strictly to standard IITK hostel cot dimensions. Retains firm support with zero structural dips or warping after 2 years of careful use. Professionally dry-cleaned and UV surface-sanitized prior to listing. Immediate pickup arranged from Hall 5.',
    image: getImage('Matress2-1.png'),
    images: [
      getImage('Matress2-1.png'),
      getImage('Matress2-2.png'),
    ],
    hall: 'Hall 5',
    condition: 'Barely Used',
    defects: ['Professionally dry-cleaned', 'Anti-sag core intact'],
    status: 'reserved',
    sellerName: 'Priya Verma (Y22)',
  },

  // ── ACADEMICS & TECH ───────────────────────────────────
  {
    name: 'Mini Drafter (Engineering Drawing A3 Board)',
    category: 'academics',
    new_price: 650,
    old_price: 1899,
    description:
      'Professional-grade engineering mini drafter combined with an unblemished A3 drafting board—mandatory requirement for TA101 and TA201 Engineering Graphics courses. Package includes clear set squares, scale protractor, precise French curves, and a technical 2B pencil kit. Utilized carefully for exactly one semester.',
    image: getImage('Drafter1.png'),
    images: [
      getImage('Drafter1.png'),
      getImage('Drafter2.png'),
    ],
    hall: 'Hall 13',
    condition: 'Barely Used',
    defects: ['Ruler edge sharp & straight', 'Complete kit — all pieces included'],
    status: 'available',
    sellerName: 'Sneha Patel (Y22)',
  },
  {
    name: 'White Lab Coat (L) + Safety Goggles — CHM/BIO Labs',
    category: 'academics',
    new_price: 350,
    old_price: 1200,
    description:
      'Standard-issue spotless white laboratory coat (Size Large, 42-inch chest specification) paired with impact-resistant polycarbonate chemical safety goggles. Mandatory gear for CHM101/102 Chemistry practical sessions and BIO101 modules. Laundered, neatly pressed, and equipped with a functional chest name tag slot.',
    image: getImage('LabCoat1.png'),
    images: [
      getImage('LabCoat1.png'),
      getImage('LabCoat2.png'),
    ],
    hall: 'Hall 12',
    condition: 'Barely Used',
    defects: ['Freshly ironed', 'Goggles scratch-free'],
    status: 'available',
    sellerName: 'Aman Sharma (Y22)',
  },
  {
    name: 'Casio FX-991EX Classwiz Scientific Calculator',
    category: 'academics',
    new_price: 800,
    old_price: 1650,
    description:
      'Original Casio fx-991EX Classwiz calculator featuring high-resolution LCD, spreadsheet computation capability, QR code metric sharing, and 552 advanced functions. An indispensable asset for MTH101, ESC101 programming/math labs, and rigorous engineering curriculum examinations. Internal cell battery freshly swapped out—displays zero pixel fade. Hard protective slide-case fully intact.',
    image: getImage('Calc1.png'),
    images: [
      getImage('Calc1.png'),
      getImage('Calc2.png'),
    ],
    hall: 'Hall 5',
    condition: 'Brand New',
    defects: ['New battery (July 2026)', 'Slide cover included'],
    status: 'available',
    sellerName: 'Priya Verma (Y22)',
  },
  {
    name: 'Philips LED Desk Study Lamp (Foldable, USB-C)',
    category: 'appliances',
    new_price: 600,
    old_price: 1799,
    description:
      'Philips 12W professional LED desk lamp offering 3 granular touch-controlled brightness levels along with customized warm, cool, and daylight temperature modes. Ergonomic foldable arm profile optimized for compact hostel study tables. Powered conveniently via a modern USB-C charging port on the base. Integrated with eye-care anti-flicker technology designed for prolonged reading and coding sessions.',
    image: getImage('Lamp1.png'),
    images: [
      getImage('Lamp1.png'),
      getImage('Lamp2.png'),
    ],
    hall: 'GH-1',
    condition: 'Barely Used',
    defects: ['All 3 brightness modes working', 'USB-C cable included'],
    status: 'available',
    sellerName: 'Ananya Roy (Y22)',
  },
  {
    name: 'Havells Caro 1.5L Electric Kettle (Stainless Steel)',
    category: 'appliances',
    new_price: 500,
    old_price: 1399,
    description:
      'Havells 1500W heavy-duty food-grade stainless steel electric kettle featuring dry-boil protection, automatic thermal cut-off, and an insulated cool-touch handle. An absolute essential utility item for late-night hostel study snacks and quick morning coffee/tea brewing. Designed with a concealed heating element for effortless scale cleaning.',
    image: getImage('Kettle1.png'),
    images: [
      getImage('Kettle1.png'),
      getImage('Kettle2.png'),
    ],
    hall: 'Hall 12',
    condition: 'Barely Used',
    defects: ['Auto cut-off working', 'No lime buildup', 'Original box available'],
    status: 'sold',
    sellerName: 'Aman Sharma (Y22)',
  },
  {
    name: 'Thomas Calculus 14th Ed + Griffiths Electrodynamics ',
    category: 'academics',
    new_price: 900,
    old_price: 2800,
    description:
      'Comprehensive MTH101 and PHY103 course textbook bundle containing: Thomas Calculus 14th Edition (authorized Pearson hardcover print) and Introduction to Electrodynamics by David J. Griffiths (4th Edition). ',
    image: getImage('Book1.png'),
    images: [
      getImage('Book1.png'),
      getImage('Book2.png'),
    ],
    hall: 'Hall 13',
    condition: 'Barely Used',
    defects: ['Pencil highlights in Griffiths Ch.3-5', 'Thomas spine intact', 'PYQ notes (2023-25) included free'],
    status: 'available',
    sellerName: 'Sneha Patel (Y22)',
  },
];