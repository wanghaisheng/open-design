import { DatabaseManager } from '../database-manager.js';
import { rmSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const testDbPath = join(__dirname, '.rams', 'test_execution_history');
const testDir = join(__dirname, '.rams');

// Clean up before running tests
if (existsSync(testDir)) {
  rmSync(testDir, { recursive: true, force: true });
}

async function testDatabaseManager() {
  console.log('Testing DatabaseManager...');
  
  // Create test directory
  mkdirSync(testDir, { recursive: true });
  
  // Test 1: Initialize database
  console.log('Test 1: Initialize database with schema');
  const dbManager = new DatabaseManager(testDbPath);
  await dbManager.initialize();
  console.log('✓ Database initialized');
  
  // Test 2: Check tables exist
  console.log('Test 2: Check all required tables exist');
  const client = dbManager.getClient();
  const tables = ['commits', 'output_data', 'branches', 'tags', 'stashes', 'reflog', 'remotes', 'merge_state'];
  
  for (const table of tables) {
    const result = await client.execute(`SELECT name FROM sqlite_master WHERE type='table' AND name='${table}'`);
    if (result.rows.length === 0) {
      throw new Error(`Table ${table} not found`);
    }
  }
  console.log('✓ All tables created');
  
  // Test 3: Close connection
  console.log('Test 3: Close database connection');
  await dbManager.close();
  console.log('✓ Connection closed');
  
  // Cleanup (may fail on Windows due to file locks, but tests already passed)
  try {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  } catch (e) {
    console.log('Note: Cleanup failed (file locked), but tests passed');
  }
  
  console.log('All DatabaseManager tests passed!');
}

testDatabaseManager().catch(console.error);
