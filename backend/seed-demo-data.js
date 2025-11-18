require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');

// Import Models
const Project = require('./models/Project');
const Client = require('./models/Client');
const Contact = require('./models/Contact');
const Subscription = require('./models/Subscription');

// Demo Projects Data
const demoProjects = [
  {
    name: 'Luxury Villa Project',
    description: 'Modern luxury villa with 5 bedrooms, swimming pool, and garden. Located in prime residential area.',
    image: null
  },
  {
    name: 'Urban Apartment Complex',
    description: 'Contemporary apartment complex with 50 units, rooftop garden, and modern amenities.',
    image: null
  },
  {
    name: 'Beachfront Condominium',
    description: 'Premium beachfront condominium with ocean views, private beach access, and luxury finishes.',
    image: null
  },
  {
    name: 'Suburban Family Home',
    description: 'Spacious 4-bedroom family home with large backyard, garage, and modern kitchen.',
    image: null
  },
  {
    name: 'Commercial Office Space',
    description: 'Modern office building with 20 floors, parking facilities, and state-of-the-art infrastructure.',
    image: null
  },
  {
    name: 'Eco-Friendly Housing',
    description: 'Sustainable housing project with solar panels, rainwater harvesting, and green building materials.',
    image: null
  },
  {
    name: 'Penthouse Suite',
    description: 'Luxury penthouse with panoramic city views, private terrace, and premium finishes.',
    image: null
  },
  {
    name: 'Townhouse Development',
    description: 'Modern townhouse community with 30 units, community center, and landscaped gardens.',
    image: null
  }
];

// Demo Clients Data
const demoClients = [
  {
    name: 'John Smith',
    designation: 'CEO, Tech Solutions Inc.',
    description: 'Real Trust helped us find the perfect office space. Their expertise and professionalism made the entire process smooth and stress-free. Highly recommended!',
    image: null
  },
  {
    name: 'Sarah Johnson',
    designation: 'Real Estate Investor',
    description: 'I\'ve worked with many realtors, but Real Trust stands out. They understand the market and always find the best deals. Excellent service!',
    image: null
  },
  {
    name: 'Michael Chen',
    designation: 'Business Owner',
    description: 'The team at Real Trust made buying our dream home a reality. Their attention to detail and customer service is unmatched.',
    image: null
  },
  {
    name: 'Emily Rodriguez',
    designation: 'Marketing Director',
    description: 'Real Trust helped us sell our property quickly and at a great price. Their marketing strategies and negotiation skills are top-notch.',
    image: null
  },
  {
    name: 'David Williams',
    designation: 'Software Engineer',
    description: 'As a first-time homebuyer, I was nervous about the process. Real Trust guided me through every step and made it easy. Thank you!',
    image: null
  },
  {
    name: 'Lisa Anderson',
    designation: 'Interior Designer',
    description: 'I\'ve recommended Real Trust to all my clients. They have an eye for properties with great potential and always deliver results.',
    image: null
  },
  {
    name: 'Robert Taylor',
    designation: 'Retired Executive',
    description: 'Real Trust helped us downsize to a perfect retirement home. They understood our needs and found exactly what we were looking for.',
    image: null
  },
  {
    name: 'Jennifer Martinez',
    designation: 'Entrepreneur',
    description: 'The Real Trust team is professional, knowledgeable, and always available. They made our property investment journey smooth and profitable.',
    image: null
  }
];

// Demo Contacts Data
const demoContacts = [
  {
    fullName: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    mobileNumber: '+1-555-0101',
    city: 'New York'
  },
  {
    fullName: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    mobileNumber: '+1-555-0102',
    city: 'Los Angeles'
  },
  {
    fullName: 'James Wilson',
    email: 'james.wilson@email.com',
    mobileNumber: '+1-555-0103',
    city: 'Chicago'
  },
  {
    fullName: 'Sophie Brown',
    email: 'sophie.brown@email.com',
    mobileNumber: '+1-555-0104',
    city: 'Houston'
  },
  {
    fullName: 'Daniel Lee',
    email: 'daniel.lee@email.com',
    mobileNumber: '+1-555-0105',
    city: 'Phoenix'
  },
  {
    fullName: 'Olivia Davis',
    email: 'olivia.davis@email.com',
    mobileNumber: '+1-555-0106',
    city: 'Philadelphia'
  },
  {
    fullName: 'William Miller',
    email: 'william.miller@email.com',
    mobileNumber: '+1-555-0107',
    city: 'San Antonio'
  },
  {
    fullName: 'Emma White',
    email: 'emma.white@email.com',
    mobileNumber: '+1-555-0108',
    city: 'San Diego'
  }
];

// Demo Subscriptions Data
const demoSubscriptions = [
  'newsletter@example.com',
  'subscriber1@email.com',
  'subscriber2@email.com',
  'subscriber3@email.com',
  'subscriber4@email.com',
  'subscriber5@email.com',
  'subscriber6@email.com',
  'subscriber7@email.com',
  'subscriber8@email.com',
  'subscriber9@email.com'
];

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await connectDB();
    
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection failed');
    }
    
    console.log('\n✅ Database connected successfully!');
    console.log(`📊 Database Name: ${mongoose.connection.name}\n`);
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...');
    await Project.deleteMany({});
    await Client.deleteMany({});
    await Contact.deleteMany({});
    await Subscription.deleteMany({});
    console.log('✅ Existing data cleared\n');
    
    // Seed Projects
    console.log('📁 Seeding Projects...');
    const projects = await Project.insertMany(demoProjects);
    console.log(`✅ Created ${projects.length} projects`);
    projects.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.name}`);
    });
    console.log('');
    
    // Seed Clients
    console.log('👥 Seeding Clients...');
    const clients = await Client.insertMany(demoClients);
    console.log(`✅ Created ${clients.length} clients`);
    clients.forEach((c, i) => {
      console.log(`   ${i + 1}. ${c.name} - ${c.designation}`);
    });
    console.log('');
    
    // Seed Contacts
    console.log('📧 Seeding Contact Forms...');
    const contacts = await Contact.insertMany(demoContacts);
    console.log(`✅ Created ${contacts.length} contact submissions`);
    contacts.forEach((c, i) => {
      console.log(`   ${i + 1}. ${c.fullName} - ${c.email} (${c.city})`);
    });
    console.log('');
    
    // Seed Subscriptions
    console.log('📬 Seeding Subscriptions...');
    const subscriptions = [];
    for (const email of demoSubscriptions) {
      try {
        // Check if email already exists
        const existing = await Subscription.findOne({ email: email.toLowerCase() });
        if (!existing) {
          const sub = await Subscription.create({ email: email.toLowerCase() });
          subscriptions.push(sub);
        }
      } catch (error) {
        if (error.code !== 11000) { // Ignore duplicate key errors
          console.error(`   Error creating subscription for ${email}:`, error.message);
        }
      }
    }
    console.log(`✅ Created ${subscriptions.length} subscriptions`);
    subscriptions.forEach((s, i) => {
      console.log(`   ${i + 1}. ${s.email}`);
    });
    console.log('');
    
    // Summary
    console.log('═══════════════════════════════════════════════════════');
    console.log('📊 SEEDING SUMMARY');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`📁 Projects:      ${await Project.countDocuments()}`);
    console.log(`👥 Clients:       ${await Client.countDocuments()}`);
    console.log(`📧 Contacts:     ${await Contact.countDocuments()}`);
    console.log(`📬 Subscriptions: ${await Subscription.countDocuments()}`);
    console.log('═══════════════════════════════════════════════════════');
    console.log('\n✅ Demo data seeded successfully!');
    console.log('🌐 You can now view the data on your website or admin panel.\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    console.error('Full error:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();

