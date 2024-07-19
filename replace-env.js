const fs = require('fs');
const path = require('path');

// Define the environment variables
const envVariables = {
  FIREBASE_API_KEY: process.env['FIREBASE_API_KEY'],
  FIREBASE_AUTH_DOMAIN: process.env['FIREBASE_AUTH_DOMAIN'],
  FIREBASE_PROJECT_ID: process.env['FIREBASE_PROJECT_ID'],
  FIREBASE_STORAGE_BUCKET: process.env['FIREBASE_STORAGE_BUCKET'],
  FIREBASE_MESSAGING_SENDER_ID: process.env['FIREBASE_MESSAGING_SENDER_ID'],
  FIREBASE_APP_ID: process.env['FIREBASE_APP_ID'],
};

// Define the path to the environment file
const envFilePath = path.join(__dirname, 'src/environments/environment.ts');

// Read the file
let fileContent = fs.readFileSync(envFilePath, 'utf8');

// Replace the placeholders
for (const [key, value] of Object.entries(envVariables)) {
  const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
  fileContent = fileContent.replace(regex, value);
}

// Write the modified file back
fs.writeFileSync(envFilePath, fileContent, 'utf8');

console.log('Environment variables have been replaced.');
