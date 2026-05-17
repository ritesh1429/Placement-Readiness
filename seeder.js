import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import connectDB from './backend/utils/db.js';
import User from './backend/models/User.js';
import Company from './backend/models/Company.js';

// Load default data by reading the file and parsing it
// Since defaultCompanyQuestions is exported from a frontend JS file, we'll just read it dynamically or define it.
// Actually, it's easier to just import the module since Node supports ES modules.
import { defaultCompanyQuestions } from './frontend/src/data/companyQuestions.js';

dotenv.config({ path: './backend/.env' });

const seedDatabase = async () => {
  await connectDB();

  try {
    // 1. Create Master Admin
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'admin123';
    
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await User.create({
        name: 'Master Admin',
        email: adminEmail,
        password_hash: passwordHash,
        role: 'admin'
      });
      console.log(`✓ Master Admin created (email: ${adminEmail}, password: ${adminPassword})`);
    } else {
      console.log('✓ Master Admin already exists.');
    }

    // 2. Seed Companies
    const companyCount = await Company.countDocuments();
    if (companyCount === 0) {
      await Company.insertMany(defaultCompanyQuestions);
      console.log(`✓ Seeded ${defaultCompanyQuestions.length} companies from default data.`);
    } else {
      console.log(`✓ Companies already seeded (${companyCount} found).`);
    }

    console.log('Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
