import { ObjectId } from 'mongodb';
import * as dbClient from '../config/db.js';

// Get all users
export const getUsers = async (req, res) => {
  try {
    const db = dbClient.getDb();
    if (!db) {
      throw new Error('Database connection not established');
    }
    
    // Change this to the actual collection name in your database
    const users = await db.collection('users').find({}).limit(100).toArray();
    console.log(`Found ${users.length} users`);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Get a single user by id
export const getUserById = async (req, res) => {
  try {
    const db = dbClient.getDb();
    if (!db) {
      throw new Error('Database connection not established');
    }
    
    // Validate the ID format
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    const id = new ObjectId(req.params.id);
    const user = await db.collection('users').findOne({ _id: id });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const db = dbClient.getDb();
    if (!db) {
      throw new Error('Database connection not established');
    }
    
    // Validate required fields
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Name, email, and password are required fields' });
    }
    
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, 
      address: req.body.address || '',
      phone: req.body.phone || '',
      sex: req.body.sex || '',
      created_at: new Date(),
      updated_at: new Date()
    };
    
    const result = await db.collection('users').insertOne(newUser);
    console.log('User created:', result.insertedId);
    
    res.status(201).json({
      message: 'User created successfully',
      userId: result.insertedId,
      user: { ...newUser, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const db = dbClient.getDb();
    if (!db) {
      throw new Error('Database connection not established');
    }
    
    // Validate the ID format
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    const id = new ObjectId(req.params.id);
    
    // Get current user data
    const currentUser = await db.collection('users').findOne({ _id: id });
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Prepare update data - only update fields that are provided
    const updateData = {
      name: req.body.name || currentUser.name,
      email: req.body.email || currentUser.email,
      address: req.body.address !== undefined ? req.body.address : currentUser.address,
      phone: req.body.phone !== undefined ? req.body.phone : currentUser.phone,
      sex: req.body.sex !== undefined ? req.body.sex : currentUser.sex,
      updated_at: new Date()
    };
    
    const result = await db.collection('users').updateOne(
      { _id: id },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('User updated:', id);
    res.status(200).json({
      message: 'User updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const db = dbClient.getDb();
    if (!db) {
      throw new Error('Database connection not established');
    }
    
    // Validate the ID format
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    const id = new ObjectId(req.params.id);
    const result = await db.collection('users').deleteOne({ _id: id });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('User deleted:', id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};