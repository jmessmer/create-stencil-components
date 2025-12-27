import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const templatesSource = path.join(projectRoot, 'templates');
const templatesDestination = path.join(projectRoot, 'dist', 'templates');

async function copyTemplates() {
  try {
    // Ensure dist directory exists
    await fs.ensureDir(path.join(projectRoot, 'dist'));
    
    // Copy templates folder to dist
    await fs.copy(templatesSource, templatesDestination);
    
    console.log('✓ Templates copied to dist/templates');
  } catch (error) {
    console.error('Error copying templates:', error);
    process.exit(1);
  }
}

await copyTemplates();