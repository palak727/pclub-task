import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Product from './models/Product.js';
import Message from './models/Message.js';
import { seedProducts } from './data/seedProducts.js';

const MONGO_URI = process.env.MONGO_URI;
const RESET_FLAG = process.argv.includes('--reset');
const DEFAULT_PASSWORD = 'iitk2026';

const seedUsersData = [
  {
    name: 'Aman Sharma',
    email: 'amans22@iitk.ac.in',
    hall: 'Hall 12',
    year: 'Y22',
  },
  {
    name: 'Priya Verma',
    email: 'priyav22@iitk.ac.in',
    hall: 'Hall 5',
    year: 'Y22',
  },
  {
    name: 'Rohan Gupta',
    email: 'rohang22@iitk.ac.in',
    hall: 'Hall 1',
    year: 'Y22',
  },
  {
    name: 'Sneha Patel',
    email: 'snehap22@iitk.ac.in',
    hall: 'Hall 13',
    year: 'Y22',
  },
  {
    name: 'Ananya Roy',
    email: 'ananr22@iitk.ac.in',
    hall: 'GH-1',
    year: 'Y22',
  },
];

const sellerNameToEmail = {
  'Aman Sharma (Y22)': 'amans22@iitk.ac.in',
  'Priya Verma (Y22)': 'priyav22@iitk.ac.in',
  'Rohan Gupta (Y22)': 'rohang22@iitk.ac.in',
  'Sneha Patel (Y22)': 'snehap22@iitk.ac.in',
  'Ananya Roy (Y22)': 'ananr22@iitk.ac.in',
};

function buildChatThreads(userMap, productMap) {
  const threads = [];

  const coolerProduct = productMap['Symphony Diet 3D Tower Air Cooler 55L'];
  const aman = userMap['amans22@iitk.ac.in'];
  const rohan = userMap['rohang22@iitk.ac.in'];

  if (coolerProduct && aman && rohan) {
    const convId = [rohan._id.toString(), aman._id.toString()].sort().join('_') + `_${coolerProduct._id.toString()}`;
    const baseTime = new Date('2026-08-06T14:30:00Z');

    threads.push(
      {
        conversationId: convId,
        senderId: rohan._id.toString(),
        senderName: 'Rohan Gupta',
        receiverId: aman._id.toString(),
        productId: coolerProduct._id.toString(),
        text: 'Hey Aman! Is the Symphony cooler still available? I just got allotted Hall 3 and desperately need one before classes start.',
        read: true,
        createdAt: baseTime,
      },
      {
        conversationId: convId,
        senderId: aman._id.toString(),
        senderName: 'Aman Sharma',
        receiverId: rohan._id.toString(),
        productId: coolerProduct._id.toString(),
        text: 'Hi Rohan! Yes it is available. It cools really well — survived 3 Kanpur summers. I\'m in Hall 12 Room 214, you can come check it anytime after 6 PM today.',
        read: true,
        createdAt: new Date(baseTime.getTime() + 5 * 60000),
      },
      {
        conversationId: convId,
        senderId: rohan._id.toString(),
        senderName: 'Rohan Gupta',
        receiverId: aman._id.toString(),
        productId: coolerProduct._id.toString(),
        text: 'Awesome! Can you do ₹3800? I can pick it up today evening and pay via UPI. Also, does it come with the castor wheels?',
        read: true,
        createdAt: new Date(baseTime.getTime() + 12 * 60000),
      },
      {
        conversationId: convId,
        senderId: aman._id.toString(),
        senderName: 'Aman Sharma',
        receiverId: rohan._id.toString(),
        productId: coolerProduct._id.toString(),
        text: '₹4000 is my final price since it includes the original castor wheels and a spare honeycomb pad. UPI works perfectly — I\'ll share my number when you come.',
        read: false,
        createdAt: new Date(baseTime.getTime() + 18 * 60000),
      }
    );
  }

  const firefoxProduct = productMap['Firefox Target 21-Speed Gear Cycle'];
  const sneha = userMap['snehap22@iitk.ac.in'];
  const priya = userMap['priyav22@iitk.ac.in'];

  if (firefoxProduct && sneha && priya) {
    const convId = [priya._id.toString(), sneha._id.toString()].sort().join('_') + `_${firefoxProduct._id.toString()}`;
    const baseTime = new Date('2026-08-07T10:00:00Z');

    threads.push(
      {
        conversationId: convId,
        senderId: priya._id.toString(),
        senderName: 'Priya Verma',
        receiverId: sneha._id.toString(),
        productId: firefoxProduct._id.toString(),
        text: 'Hi Sneha! The Firefox Target looks great. I need a cycle for my Hall 5 to IME commute. Are the Shimano gears smooth? Any chain skip issues?',
        read: true,
        createdAt: baseTime,
      },
      {
        conversationId: convId,
        senderId: sneha._id.toString(),
        senderName: 'Sneha Patel',
        receiverId: priya._id.toString(),
        productId: firefoxProduct._id.toString(),
        text: 'Hey Priya! Zero chain skip — just got full service done at the Nankari cycle shop. All 21 gears shift cleanly. Disc brakes are responsive. I also have a Godrej cycle lock I can throw in for free!',
        read: true,
        createdAt: new Date(baseTime.getTime() + 8 * 60000),
      },
      {
        conversationId: convId,
        senderId: priya._id.toString(),
        senderName: 'Priya Verma',
        receiverId: sneha._id.toString(),
        productId: firefoxProduct._id.toString(),
        text: 'Perfect! I can come to Hall 13 this weekend. Would Saturday 4 PM work for a test ride? I\'ll bring ₹5500 cash.',
        read: false,
        createdAt: new Date(baseTime.getTime() + 15 * 60000),
      }
    );
  }

  const textbookProduct = productMap['Thomas Calculus 14th Ed + Griffiths Electrodynamics '];
  const ananya = userMap['ananr22@iitk.ac.in'];

  if (textbookProduct && ananya && sneha) {
    const convId = [ananya._id.toString(), sneha._id.toString()].sort().join('_') + `_${textbookProduct._id.toString()}`;
    const baseTime = new Date('2026-08-07T18:30:00Z');

    threads.push(
      {
        conversationId: convId,
        senderId: ananya._id.toString(),
        senderName: 'Ananya Roy',
        receiverId: sneha._id.toString(),
        productId: textbookProduct._id.toString(),
        text: 'Hey Sneha! I saw your listing for the MTH101/PHY103 books. Are the handwritten PYQ notes still included? Those would be super helpful for my upcoming midsems.',
        read: true,
        createdAt: baseTime,
      },
      {
        conversationId: convId,
        senderId: sneha._id.toString(),
        senderName: 'Sneha Patel',
        receiverId: ananya._id.toString(),
        productId: textbookProduct._id.toString(),
        text: 'Yes! 180 pages of spiral-bound notes covering all important PYQs from 2023-25 semesters. The Thomas Calculus is hardcover and in great shape. Griffiths has some pencil marks in chapters 3-5 but nothing major.',
        read: true,
        createdAt: new Date(baseTime.getTime() + 10 * 60000),
      },
      {
        conversationId: convId,
        senderId: ananya._id.toString(),
        senderName: 'Ananya Roy',
        receiverId: sneha._id.toString(),
        productId: textbookProduct._id.toString(),
        text: 'Sold! Can I come to Hall 13 tomorrow after my ESC101 lab? Around 5 PM? I\'ll pay ₹900 via PhonePe.',
        read: true,
        createdAt: new Date(baseTime.getTime() + 20 * 60000),
      },
      {
        conversationId: convId,
        senderId: sneha._id.toString(),
        senderName: 'Sneha Patel',
        receiverId: ananya._id.toString(),
        productId: textbookProduct._id.toString(),
        text: 'Done! Hall 13, Room 105. 5 PM works. I\'ll also give you my ESO207 notes for free since I\'m graduating. Good luck with midsems!',
        read: false,
        createdAt: new Date(baseTime.getTime() + 25 * 60000),
      }
    );
  }

  return threads;
}

async function seed() {
  if (!MONGO_URI || MONGO_URI.includes('<username>') || MONGO_URI.includes('YOUR_')) {
    console.error('Error: MONGO_URI is not set or properly configured in process.env.');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to database host: ${mongoose.connection.host}`);

    if (RESET_FLAG) {
      console.log('Reset flag passed. Clearing existing collections...');
      await User.deleteMany({});
      await Product.deleteMany({});
      await Message.deleteMany({});
      console.log('Collections cleared successfully.');
    }

    console.log('Seeding student profiles...');
    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);
    const userMap = {};

    for (const userData of seedUsersData) {
      let user = await User.findOne({ email: userData.email });
      if (!user) {
        user = await User.create({
          ...userData,
          password: hashedPassword,
          isOnline: false,
          lastSeen: new Date(),
        });
        console.log(`Created user: ${userData.name} (${userData.email})`);
      } else {
        console.log(`User already exists: ${userData.name}`);
      }
      userMap[userData.email] = user;
    }

    console.log('Seeding products...');
    const existingCount = await Product.countDocuments();
    const productMap = {};

    if (existingCount > 0 && !RESET_FLAG) {
      console.log(`${existingCount} products already exist in database.`);
      const existing = await Product.find({});
      existing.forEach((p) => {
        productMap[p.name] = p;
      });
    } else {
      const productsWithIds = seedProducts.map((product) => {
        const sellerEmail = sellerNameToEmail[product.sellerName];
        const sellerUser = sellerEmail ? userMap[sellerEmail] : null;
        return {
          ...product,
          sellerId: sellerUser ? sellerUser._id.toString() : 'demo-seller',
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        };
      });

      const inserted = await Product.insertMany(productsWithIds);
      inserted.forEach((p) => {
        productMap[p.name] = p;
      });
      console.log(`Inserted ${inserted.length} products.`);
    }

    console.log('Seeding chat messages...');
    const existingMessages = await Message.countDocuments();

    if (existingMessages > 0 && !RESET_FLAG) {
      console.log(`${existingMessages} messages already exist in database.`);
    } else {
      const chatMessages = buildChatThreads(userMap, productMap);
      if (chatMessages.length > 0) {
        await Message.insertMany(chatMessages);
        console.log(`Inserted ${chatMessages.length} chat messages.`);
      } else {
        console.log('Warning: No chat messages created. Check product mapping.');
      }
    }

    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalMessages = await Message.countDocuments();

    console.log('--- Seed Summary ---');
    console.log(`Users: ${totalUsers}`);
    console.log(`Products: ${totalProducts}`);
    console.log(`Messages: ${totalMessages}`);
    console.log(`Default password for demo accounts: ${DEFAULT_PASSWORD}`);
  } catch (error) {
    console.error(`Database seeding failed: ${error.message}`);
    if (error.code === 11000) {
      console.error('Duplicate entry found. Use --reset to overwrite existing data.');
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();