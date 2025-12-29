/**
 * GitHub Pages Deployment Script
 * 
 * This script automates the process of building and deploying a Next.js site to GitHub Pages.
 * It runs the build process, creates necessary files for GitHub Pages, and deploys to the gh-pages branch.
 */

import { publish } from 'gh-pages';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import fs from 'fs/promises';
import { existsSync } from 'fs';

// Constants and configuration
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT_DIR, 'out');
const CNAME_VALUE = 'floriandemel.de'; // Set your domain here

// GitHub Pages deployment options
const deployOptions = {
  branch: 'gh-pages',
  repo: undefined, // Uses the current repository's URL from git config
  message: `Automated deployment [${new Date().toISOString()}]`,
  dotfiles: true, // Include files like .nojekyll
  user: {
    name: 'GitHub Actions',
    email: 'actions@github.com'
  }
};

/**
 * Executes a shell command and returns its output
 * @param {string} command - The command to execute
 * @param {object} options - Options for execution
 * @returns {string} - Command output
 */
function executeCommand(command, options = {}) {
  console.log(`Executing: ${command}`);
  
  try {
    return execSync(command, {
      cwd: ROOT_DIR,
      stdio: ['pipe', 'pipe', 'inherit'], // Pipe stdout, inherit stderr
      encoding: 'utf-8',
      ...options
    }).trim();
  } catch (error) {
    console.error(`Command failed: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

/**
 * Creates a file with specified content
 * @param {string} path - Path to create the file
 * @param {string} content - Content to write to the file
 * @returns {Promise<void>}
 */
async function createFile(path, content = '') {
  try {
    await fs.writeFile(path, content);
    console.log(`Created file: ${path}`);
  } catch (error) {
    console.error(`Failed to create file ${path}:`, error);
    throw error;
  }
}

/**
 * Main deployment process
 */
async function deploy() {
  try {
    console.log('=== 🚀 Starting deployment process ===');
    
    // Step 1: Check if Git repository is clean
    console.log('\n📋 Checking Git status...');
    const statusOutput = executeCommand('git status --porcelain');
    if (statusOutput) {
      console.warn('⚠️  Warning: Git repository has uncommitted changes.');
      console.warn('These changes won\'t be included in the deployment.');
    }

    // Step 2: Build the Next.js application
    console.log('\n🏗️  Building Next.js application...');
    executeCommand('next build');

    // Step 2.1: Generate Sitemap
    console.log('\n🗺️  Generating Sitemap...');
    executeCommand('npx next-sitemap');
    
    // Make sure the output directory exists
    if (!existsSync(OUTPUT_DIR)) {
      console.error('❌ Build output directory not found. Build may have failed.');
      process.exit(1);
    }
    
    // Step 3: Create required GitHub Pages files
    console.log('\n📝 Creating GitHub Pages specific files...');
    
    // Create .nojekyll file to disable Jekyll processing
    await createFile(join(OUTPUT_DIR, '.nojekyll'));
    
    // Create CNAME file for custom domain
    await createFile(join(OUTPUT_DIR, 'CNAME'), CNAME_VALUE);
    
    // Step 4: Deploy to GitHub Pages
    console.log('\n🚀 Deploying to GitHub Pages...');
    await new Promise((resolve, reject) => {
      publish(OUTPUT_DIR, deployOptions, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    
    console.log('\n✅ Successfully deployed to GitHub Pages!');
    console.log(`🌐 Your site should be available at https://${CNAME_VALUE} shortly.`);
    
  } catch (error) {
    console.error('\n❌ Deployment failed:', error);
    process.exit(1);
  }
}

// Execute the deployment
deploy();