import { defineCommand } from 'citty';
import { CommitManager, BranchManager, UndoRedoManager } from '../rams/version-manager/index.js';

export default defineCommand({
  meta: {
    name: 'execution',
    description: 'Manage skill execution history with Git-like version control',
  },
  subCommands: {
    log: defineCommand({
      meta: {
        name: 'log',
        description: 'View execution history',
      },
      args: {
        instance: {
          type: 'string',
          description: 'Role instance ID',
          required: true,
        },
        skill: {
          type: 'string',
          description: 'Filter by skill name',
          required: false,
        },
        limit: {
          type: 'string',
          description: 'Number of commits to show',
          default: '10',
        },
      },
      async run({ args }) {
        const commitManager = new CommitManager(args.instance as string);
        await commitManager.initialize();
        
        const commits = await commitManager.getCommits(
          args.skill as string | undefined,
          parseInt(args.limit as string)
        );
        
        console.log('Execution History:');
        console.log('==================');
        for (const commit of commits) {
          console.log(`Commit: ${commit.commit_id}`);
          console.log(`Skill: ${commit.skill_name}`);
          console.log(`Time: ${commit.timestamp}`);
          console.log(`Parent: ${commit.parent_commit || 'none'}`);
          console.log('---');
        }
      },
    }),
    
    undo: defineCommand({
      meta: {
        name: 'undo',
        description: 'Undo N steps',
      },
      args: {
        instance: {
          type: 'string',
          description: 'Role instance ID',
          required: true,
        },
        steps: {
          type: 'string',
          description: 'Number of steps to undo',
          default: '1',
        },
      },
      async run({ args }) {
        const commitManager = new CommitManager(args.instance as string);
        const undoRedoManager = new UndoRedoManager(args.instance as string, commitManager);
        
        await commitManager.initialize();
        await undoRedoManager.initialize();
        
        const targetCommit = await undoRedoManager.undo(parseInt(args.steps as string));
        console.log(`Undid to commit: ${targetCommit}`);
      },
    }),
    
    redo: defineCommand({
      meta: {
        name: 'redo',
        description: 'Redo N steps',
      },
      args: {
        instance: {
          type: 'string',
          description: 'Role instance ID',
          required: true,
        },
        steps: {
          type: 'string',
          description: 'Number of steps to redo',
          default: '1',
        },
      },
      async run({ args }) {
        const commitManager = new CommitManager(args.instance as string);
        const undoRedoManager = new UndoRedoManager(args.instance as string, commitManager);
        
        await commitManager.initialize();
        await undoRedoManager.initialize();
        
        const targetCommit = await undoRedoManager.redo(parseInt(args.steps as string));
        if (targetCommit) {
          console.log(`Redid to commit: ${targetCommit}`);
        }
      },
    }),
    
    checkout: defineCommand({
      meta: {
        name: 'checkout',
        description: 'Checkout to a specific commit',
      },
      args: {
        instance: {
          type: 'string',
          description: 'Role instance ID',
          required: true,
        },
        commit: {
          type: 'string',
          description: 'Commit ID',
          required: true,
        },
      },
      async run({ args }) {
        const commitManager = new CommitManager(args.instance as string);
        const undoRedoManager = new UndoRedoManager(args.instance as string, commitManager);
        
        await commitManager.initialize();
        await undoRedoManager.initialize();
        
        await undoRedoManager.checkout(args.commit as string);
        console.log(`Checked out to commit: ${args.commit}`);
      },
    }),
    
    branch: defineCommand({
      meta: {
        name: 'branch',
        description: 'Branch management',
      },
      subCommands: {
        create: defineCommand({
          meta: {
            name: 'create',
            description: 'Create a new branch',
          },
          args: {
            instance: {
              type: 'string',
              description: 'Role instance ID',
              required: true,
            },
            name: {
              type: 'string',
              description: 'Branch name',
              required: true,
            },
            from: {
              type: 'string',
              description: 'Base commit ID',
              required: false,
            },
          },
          async run({ args }) {
            const commitManager = new CommitManager(args.instance as string);
            const branchManager = new BranchManager(args.instance as string);
            
            await commitManager.initialize();
            await branchManager.initialize();
            
            const fromCommit = (args.from as string | undefined) || await commitManager.getCurrentCommit();
            if (!fromCommit) {
              console.error('No current commit found');
              return;
            }
            
            await branchManager.createBranch(args.name as string, fromCommit);
            console.log(`Created branch: ${args.name} from commit: ${fromCommit}`);
          },
        }),
        
        switch: defineCommand({
          meta: {
            name: 'switch',
            description: 'Switch to a branch',
          },
          args: {
            instance: {
              type: 'string',
              description: 'Role instance ID',
              required: true,
            },
            name: {
              type: 'string',
              description: 'Branch name',
              required: true,
            },
          },
          async run({ args }) {
            const branchManager = new BranchManager(args.instance as string);
            await branchManager.initialize();
            
            await branchManager.switchBranch(args.name as string);
            console.log(`Switched to branch: ${args.name}`);
          },
        }),
        
        list: defineCommand({
          meta: {
            name: 'list',
            description: 'List all branches',
          },
          args: {
            instance: {
              type: 'string',
              description: 'Role instance ID',
              required: true,
            },
          },
          async run({ args }) {
            const branchManager = new BranchManager(args.instance as string);
            await branchManager.initialize();
            
            const branches = await branchManager.listBranches();
            console.log('Branches:');
            console.log('========');
            for (const branch of branches) {
              console.log(`${branch.name} -> ${branch.commit_id} (${branch.created_at})`);
            }
          },
        }),
        
        delete: defineCommand({
          meta: {
            name: 'delete',
            description: 'Delete a branch',
          },
          args: {
            instance: {
              type: 'string',
              description: 'Role instance ID',
              required: true,
            },
            name: {
              type: 'string',
              description: 'Branch name',
              required: true,
            },
          },
          async run({ args }) {
            const branchManager = new BranchManager(args.instance as string);
            await branchManager.initialize();
            
            await branchManager.deleteBranch(args.name as string);
            console.log(`Deleted branch: ${args.name}`);
          },
        }),
      },
    }),
  },
});
