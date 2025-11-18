require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const connectDB = require('./config/database');

// Import Models
const Project = require('./models/Project');
const Client = require('./models/Client');
const Contact = require('./models/Contact');
const Subscription = require('./models/Subscription');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to check database connection
const checkDatabaseConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    console.error('❌ Database not connected. Connection state:', mongoose.connection.readyState);
    return res.status(503).json({ 
      message: 'Database not connected', 
      error: 'Please check your MongoDB connection' 
    });
  }
  next();
};

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Start server only after database connection
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();
    
    // Verify connection before starting server
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection failed');
    }
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 Database: ${mongoose.connection.name}`);
      console.log(`✅ Ready to accept requests`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Projects API
app.get('/api/projects', checkDatabaseConnection, async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    // Convert _id to id for frontend compatibility
    const formattedProjects = projects.map(project => ({
      id: project._id.toString(),
      name: project.name,
      description: project.description,
      image: project.image,
      createdAt: project.createdAt
    }));
    res.json(formattedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

app.post('/api/projects', checkDatabaseConnection, upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    
    const project = new Project({
      name,
      description,
      image
    });
    
    const savedProject = await project.save();
    
    res.json({
      id: savedProject._id.toString(),
      name: savedProject.name,
      description: savedProject.description,
      image: savedProject.image,
      createdAt: savedProject.createdAt
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
});

app.put('/api/projects/:id', checkDatabaseConnection, upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Update fields (only if provided)
    if (name !== undefined && name !== null) {
      project.name = name;
    }
    if (description !== undefined && description !== null) {
      project.description = description;
    }
    
    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (project.image) {
        const oldImagePath = path.join(__dirname, project.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      project.image = `/uploads/${req.file.filename}`;
    }
    
    const updatedProject = await project.save();
    
    res.json({
      id: updatedProject._id.toString(),
      name: updatedProject.name,
      description: updatedProject.description,
      image: updatedProject.image,
      createdAt: updatedProject.createdAt
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
});

app.delete('/api/projects/:id', checkDatabaseConnection, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Delete image file if exists
    if (project.image) {
      const imagePath = path.join(__dirname, project.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

// Clients API
app.get('/api/clients', checkDatabaseConnection, async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    // Convert _id to id for frontend compatibility
    const formattedClients = clients.map(client => ({
      id: client._id.toString(),
      name: client.name,
      description: client.description,
      designation: client.designation,
      image: client.image,
      createdAt: client.createdAt
    }));
    res.json(formattedClients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Error fetching clients', error: error.message });
  }
});

app.post('/api/clients', checkDatabaseConnection, upload.single('image'), async (req, res) => {
  try {
    const { name, description, designation } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    
    const client = new Client({
      name,
      description,
      designation,
      image
    });
    
    const savedClient = await client.save();
    
    res.json({
      id: savedClient._id.toString(),
      name: savedClient.name,
      description: savedClient.description,
      designation: savedClient.designation,
      image: savedClient.image,
      createdAt: savedClient.createdAt
    });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ message: 'Error creating client', error: error.message });
  }
});

app.put('/api/clients/:id', checkDatabaseConnection, upload.single('image'), async (req, res) => {
  try {
    const { name, description, designation } = req.body;
    
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Update fields (only if provided)
    if (name !== undefined && name !== null) {
      client.name = name;
    }
    if (description !== undefined && description !== null) {
      client.description = description;
    }
    if (designation !== undefined && designation !== null) {
      client.designation = designation;
    }
    
    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (client.image) {
        const oldImagePath = path.join(__dirname, client.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      client.image = `/uploads/${req.file.filename}`;
    }
    
    const updatedClient = await client.save();
    
    res.json({
      id: updatedClient._id.toString(),
      name: updatedClient.name,
      description: updatedClient.description,
      designation: updatedClient.designation,
      image: updatedClient.image,
      createdAt: updatedClient.createdAt
    });
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ message: 'Error updating client', error: error.message });
  }
});

app.delete('/api/clients/:id', checkDatabaseConnection, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Delete image file if exists
    if (client.image) {
      const imagePath = path.join(__dirname, client.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: 'Error deleting client', error: error.message });
  }
});

// Contact Form API
app.post('/api/contact', checkDatabaseConnection, async (req, res) => {
  try {
    const { fullName, email, mobileNumber, city } = req.body;
    
    const contact = new Contact({
      fullName,
      email,
      mobileNumber,
      city
    });
    
    const savedContact = await contact.save();
    
    res.json({ 
      message: 'Contact form submitted successfully', 
      submission: {
        id: savedContact._id.toString(),
        fullName: savedContact.fullName,
        email: savedContact.email,
        mobileNumber: savedContact.mobileNumber,
        city: savedContact.city,
        createdAt: savedContact.createdAt
      }
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Error submitting contact form', error: error.message });
  }
});

app.get('/api/contact', checkDatabaseConnection, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    // Convert _id to id for frontend compatibility
    const formattedContacts = contacts.map(contact => ({
      id: contact._id.toString(),
      fullName: contact.fullName,
      email: contact.email,
      mobileNumber: contact.mobileNumber,
      city: contact.city,
      createdAt: contact.createdAt
    }));
    res.json(formattedContacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// Newsletter Subscription API
app.post('/api/subscribe', checkDatabaseConnection, async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // Check if email already exists
    const existingSubscription = await Subscription.findOne({ email: email.toLowerCase() });
    if (existingSubscription) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    
    const subscription = new Subscription({
      email: email.toLowerCase()
    });
    
    const savedSubscription = await subscription.save();
    
    res.json({ 
      message: 'Subscribed successfully', 
      subscription: {
        id: savedSubscription._id.toString(),
        email: savedSubscription.email,
        createdAt: savedSubscription.createdAt
      }
    });
  } catch (error) {
    console.error('Error subscribing:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    res.status(500).json({ message: 'Error subscribing', error: error.message });
  }
});

app.get('/api/subscribe', checkDatabaseConnection, async (req, res) => {
  try {
    const subscriptions = await Subscription.find().sort({ createdAt: -1 });
    // Convert _id to id for frontend compatibility
    const formattedSubscriptions = subscriptions.map(subscription => ({
      id: subscription._id.toString(),
      email: subscription.email,
      createdAt: subscription.createdAt
    }));
    res.json(formattedSubscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ message: 'Error fetching subscriptions', error: error.message });
  }
});

// Database Status API
app.get('/api/database/status', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    
    const stats = {
      connected: mongoose.connection.readyState === 1,
      database: mongoose.connection.name,
      host: mongoose.connection.host,
      collections: {}
    };
    
    // Get counts for each collection
    stats.collections.projects = await Project.countDocuments();
    stats.collections.clients = await Client.countDocuments();
    stats.collections.contacts = await Contact.countDocuments();
    stats.collections.subscriptions = await Subscription.countDocuments();
    
    // Get all collection names
    const collections = await db.listCollections().toArray();
    stats.collectionNames = collections.map(col => col.name);
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching database status:', error);
    res.status(500).json({ message: 'Error fetching database status', error: error.message });
  }
});

// Start the server
startServer();

