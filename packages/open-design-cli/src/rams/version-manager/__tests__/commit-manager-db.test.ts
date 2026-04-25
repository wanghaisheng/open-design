import { CommitManager as CommitManagerDB } from '../commit-manager-db.js';
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

async function testCommitManagerDB() {
  console.log('Testing CommitManagerDB...');
  
  // Create test directory
  mkdirSync(testDir, { recursive: true });
  
  // Initialize database
  const dbManager = new DatabaseManager(testDbPath);
  await dbManager.initialize();
  
  const instanceId = 'test-instance';
  const commitManager = new CommitManagerDB(instanceId, dbManager);
  await commitManager.initialize();
  
  // Test 1: Create commit
  console.log('Test 1: Create commit');
  const commitId = await commitManager.createCommit(
    'test-skill',
    { input: 'data' },
    { output: 'result' },
    null
  );
  console.log(`✓ Created commit: ${commitId}`);
  
  // Test 2: Get commit
  console.log('Test 2: Get commit');
  const commit = await commitManager.getCommit(commitId);
  if (!commit) {
    throw new Error('Commit not found');
  }
  console.log(`✓ Retrieved commit: ${commit.skill_name}`);
  
  // Test 3: Get commits by skill
  console.log('Test 3: Get commits by skill');
  const commits = await commitManager.getCommits('test-skill', 10);
  if (commits.length === 0) {
    throw new Error('No commits found');
  }
  console.log(`✓ Found ${commits.length} commits`);
  
  // Test 4: Get current commit
  console.log('Test 4: Get current commit');
  const currentCommit = await commitManager.getCurrentCommit();
  if (!currentCommit) {
    throw new Error('No current commit');
  }
  console.log(`✓ Current commit: ${currentCommit}`);
  
  // Test 5: Create commit with parent
  console.log('Test 5: Create commit with parent');
  const commitId2 = await commitManager.createCommit(
    'test-skill-2',
    { input: 'data2' },
    { output: 'result2' },
    commitId
  );
  console.log(`✓ Created commit with parent: ${commitId2}`);
  
  // Test 6: Verify parent relationship
  console.log('Test 6: Verify parent relationship');
  const childCommit = await commitManager.getCommit(commitId2);
  if (childCommit?.parent_commit_id !== commitId) {
    throw new Error('Parent relationship not set correctly');
  }
  console.log(`✓ Parent relationship verified`);
  
  // Cleanup
  try {
    await dbManager.close();
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  } catch (e) {
    console.log('Note: Cleanup failed (file locked), but tests passed');
  }
  
  console.log('All CommitManagerDB tests passed!');
}

testCommitManagerDB().catch(console.error);
