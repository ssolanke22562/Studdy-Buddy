const { GoogleGenerativeAI } = require('@google/generative-ai');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

console.log("===================================================");
console.log("             STUDY BUDDY DIAGNOSTIC");
console.log("===================================================\n");

console.log(`1. Node Version: ${process.version}`);
console.log(`2. Port Configured: ${process.env.PORT || 5000}`);
console.log(`3. MongoDB URI: ${process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/study-buddy'}`);
console.log(`4. Gemini API Key present: ${process.env.GEMINI_API_KEY ? 'Yes (configured)' : 'No (empty)'}`);

if (process.env.GEMINI_API_KEY) {
    const key = process.env.GEMINI_API_KEY;
    console.log(`   Key starts with: ${key.substring(0, 5)}...`);
    if (!key.startsWith("AIzaSy")) {
        console.warn(`   [WARNING] Your API key does not start with 'AIzaSy'. Standard Google AI keys usually start with 'AIzaSy'. Please verify your key.`);
    }
}

const testDatabase = async () => {
    console.log("\nTesting MongoDB connection (2 second timeout)...");
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/study-buddy', {
            serverSelectionTimeoutMS: 2000
        });
        console.log("✅ Database Connection: SUCCESS!");
        await mongoose.disconnect();
    } catch (err) {
        console.warn(`⚠️ Database Connection: FAILED (${err.message})`);
        console.log("   Info: Server will automatically fallback to local JSON database 'mock_db.json'. This is normal.");
    }
};

const testGemini = async () => {
    console.log("\nTesting Gemini API Connection...");
    if (!process.env.GEMINI_API_KEY) {
        console.error("❌ Gemini Test: FAILED (No API Key configured in .env)");
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
        const result = await model.generateContent("Hello Study Buddy! Answer in one word.");
        const response = await result.response;
        console.log(`✅ Gemini Test: SUCCESS! Response: "${response.text().trim()}"`);
    } catch (err) {
        console.error(`❌ Gemini Test: FAILED (${err.message})`);
        console.error("   Please verify that your GEMINI_API_KEY is active and valid.");
    }
};

const run = async () => {
    await testDatabase();
    await testGemini();
    console.log("\n===================================================");
    process.exit(0);
};

run();
