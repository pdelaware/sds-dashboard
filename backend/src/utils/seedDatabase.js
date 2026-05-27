const { db } = require('../config/firebase');

/**
 * Seed database with initial data from existing SDS Library spreadsheet
 */
const seedDatabase = async () => {
  console.log('🌱 Starting database seeding...');

  try {
    // Define offices based on spreadsheet sheets
    const offices = [
      {
        name: 'Amsterdam - Edge Stadium',
        region: 'EMEA',
        country: 'Netherlands',
        city: 'Amsterdam',
        address: 'Edge Stadium',
        timezone: 'Europe/Amsterdam'
      },
      {
        name: 'Atlanta Tower',
        region: 'Americas',
        country: 'United States',
        city: 'Atlanta',
        address: 'Atlanta Tower',
        timezone: 'America/New_York'
      },
      {
        name: 'Boston',
        region: 'Americas',
        country: 'United States',
        city: 'Boston',
        address: '',
        timezone: 'America/New_York'
      },
      {
        name: 'Chicago',
        region: 'Americas',
        country: 'United States',
        city: 'Chicago',
        address: '',
        timezone: 'America/Chicago'
      },
      {
        name: 'Dallas',
        region: 'Americas',
        country: 'United States',
        city: 'Dallas',
        address: '',
        timezone: 'America/Chicago'
      },
      {
        name: 'Irvine',
        region: 'Americas',
        country: 'United States',
        city: 'Irvine',
        address: '',
        timezone: 'America/Los_Angeles'
      },
      {
        name: 'New York',
        region: 'Americas',
        country: 'United States',
        city: 'New York',
        address: '',
        timezone: 'America/New_York'
      },
      {
        name: 'San Francisco',
        region: 'Americas',
        country: 'United States',
        city: 'San Francisco',
        address: '',
        timezone: 'America/Los_Angeles'
      },
      {
        name: 'Toronto',
        region: 'Americas',
        country: 'Canada',
        city: 'Toronto',
        address: '',
        timezone: 'America/Toronto'
      }
    ];

    // Define categories based on spreadsheet data
    const categories = [
      { name: 'Cleaning Agents', description: 'General purpose cleaning products', icon: 'spray' },
      { name: 'Detergent', description: 'Dishwashing and laundry detergents', icon: 'droplet' },
      { name: 'Sanitizer', description: 'Disinfectants and sanitizing products', icon: 'shield' },
      { name: 'Floor Care', description: 'Floor cleaning and maintenance products', icon: 'floor' },
      { name: 'Metal Polish', description: 'Metal cleaning and polishing products', icon: 'star' },
      { name: 'Restroom Cleaner', description: 'Bathroom and restroom cleaning products', icon: 'toilet' },
      { name: 'Aerosol', description: 'Aerosol spray products', icon: 'spray-can' },
      { name: 'Common Goods', description: 'Hand sanitizers and common supplies', icon: 'hand' },
      { name: 'Delimer', description: 'Descaling and deliming products', icon: 'wrench' },
      { name: 'Polishing', description: 'Surface polishing products', icon: 'sparkles' },
      { name: 'Presoak', description: 'Pre-soaking cleaning products', icon: 'bucket' },
      { name: 'All Purpose Cleaner', description: 'Multi-surface cleaning products', icon: 'cleaning' },
      { name: 'Kitchen & Hospitality', description: 'Kitchen and food service products', icon: 'restaurant' },
      { name: 'Janitorial Services', description: 'Professional janitorial products', icon: 'broom' },
      { name: 'HVAC & Building Systems', description: 'Building maintenance products', icon: 'building' },
      { name: 'Laboratory Chemicals', description: 'Lab and scientific chemicals', icon: 'science' },
      { name: 'Maintenance Products', description: 'General maintenance supplies', icon: 'tools' }
    ];

    // Seed offices
    console.log('📍 Seeding offices...');
    const officeRefs = {};
    for (const office of offices) {
      const officeData = {
        ...office,
        documentCount: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await db.collection('offices').add(officeData);
      officeRefs[office.name] = docRef.id;
      console.log(`  ✓ Created office: ${office.name} (${docRef.id})`);
    }

    // Seed categories
    console.log('📂 Seeding categories...');
    const categoryRefs = {};
    for (const category of categories) {
      const categoryData = {
        ...category,
        documentCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await db.collection('categories').add(categoryData);
      categoryRefs[category.name] = docRef.id;
      console.log(`  ✓ Created category: ${category.name} (${docRef.id})`);
    }

    // Sample documents from spreadsheet (subset for demo)
    console.log('📄 Seeding sample documents...');
    const sampleDocuments = [
      {
        productName: 'CSU Universele Ontkalker',
        manufacturer: 'CSU',
        office: 'Amsterdam - Edge Stadium',
        location: 'Janitorial closet',
        category: 'Cleaning Agents'
      },
      {
        productName: 'SMARTPOWER Dishmachine Detergent',
        manufacturer: 'Ecolab',
        office: 'Atlanta Tower',
        location: 'Ohana Floor Kitchen',
        category: 'Detergent'
      },
      {
        productName: 'LIME-A-WAY',
        manufacturer: 'Reckitt Benckiser',
        office: 'Atlanta Tower',
        location: 'Ohana Floor Kitchen',
        category: 'Delimer'
      },
      {
        productName: 'Purell Hand Sanitizer',
        manufacturer: 'GOJO Industries',
        office: 'Atlanta Tower',
        location: 'General Office',
        category: 'Common Goods'
      },
      {
        productName: 'Green Earth Natural All Purpose Cleaner',
        manufacturer: 'Green Earth',
        office: 'Atlanta Tower',
        location: 'Janitorial Services',
        category: 'All Purpose Cleaner'
      }
    ];

    for (const doc of sampleDocuments) {
      const officeId = officeRefs[doc.office];
      const revisionDate = new Date();
      revisionDate.setMonth(revisionDate.getMonth() - 6); // 6 months ago

      const expirationDate = new Date(revisionDate);
      expirationDate.setFullYear(expirationDate.getFullYear() + 3); // 3 years from revision

      const documentData = {
        productName: doc.productName,
        manufacturer: doc.manufacturer,
        casNumber: null,
        language: 'EN',
        documentType: 'SDS',
        fileUrl: null, // Placeholder - would be Cloud Storage URL
        fileStoragePath: null,
        fileSize: 0,
        uploadDate: new Date(),
        uploadedBy: 'seed-script',
        revisionDate,
        expirationDate,
        status: 'active',
        version: 1,
        offices: [officeId],
        specificLocations: [doc.location],
        category: doc.category,
        tags: [],
        viewCount: 0,
        downloadCount: 0,
        searchKeywords: [
          doc.productName.toLowerCase(),
          doc.manufacturer.toLowerCase(),
          doc.category.toLowerCase()
        ],
        notes: 'Sample document from spreadsheet migration',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await db.collection('documents').add(documentData);
      console.log(`  ✓ Created document: ${doc.productName} (${docRef.id})`);
    }

    // Create sample admin user
    console.log('👤 Creating sample admin user...');
    const adminUserId = 'sample-admin-uid';
    const adminUserData = {
      email: 'pdelaware@salesforce.com',
      name: 'SDS Administrator',
      role: 'admin',
      assignedOffices: Object.values(officeRefs),
      department: 'Workplace Services',
      title: 'H&S Manager',
      notificationPreferences: {
        emailAlerts: true,
        expirationWarnings: true
      },
      createdAt: new Date(),
      lastLogin: new Date()
    };

    await db.collection('users').doc(adminUserId).set(adminUserData);
    console.log(`  ✓ Created admin user: ${adminUserData.email}`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`  - Offices: ${offices.length}`);
    console.log(`  - Categories: ${categories.length}`);
    console.log(`  - Sample Documents: ${sampleDocuments.length}`);
    console.log(`  - Users: 1`);

    return {
      success: true,
      officeRefs,
      categoryRefs
    };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('\n🎉 Seeding complete! Exiting...');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedDatabase };
