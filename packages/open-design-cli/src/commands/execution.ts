import { defineCommand } from 'citty';
import { CommitManager, BranchManager, UndoRedoManager, MergeManager, RemoteManager, TagManager, StashManager, RebaseManager, DatabaseManager } from '../rams/version-manager/index.js';
import { CommitManager as CommitManagerDB } from '../rams/version-manager/commit-manager-db.js';
import { BranchManager as BranchManagerDB } from '../rams/version-manager/branch-manager-db.js';
import { UndoRedoManager as UndoRedoManagerDB } from '../rams/version-manager/undo-redo-manager-db.js';
import { TagManager as TagManagerDB } from '../rams/version-manager/tag-manager-db.js';
import { StashManager as StashManagerDB } from '../rams/version-manager/stash-manager-db.js';

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
        backend: {
          type: 'string',
          description: 'Storage backend (filesystem or libsql)',
          default: 'filesystem',
        },
        dbPath: {
          type: 'string',
          description: 'Database path for libsql backend',
          default: '.rams/execution_history',
        },
      },
      async run({ args }) {
        const backend = args.backend as string;
        const dbPath = args.dbPath as string;
        
        let commitManager: CommitManager | CommitManagerDB;
        if (backend === 'libsql') {
          const dbManager = new DatabaseManager(dbPath);
          commitManager = new CommitManagerDB(args.instance as string, dbManager);
        } else {
          commitManager = new CommitManager(args.instance as string);
        }
        
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
        backend: {
          type: 'string',
          description: 'Storage backend (filesystem or libsql)',
          default: 'filesystem',
        },
        dbPath: {
          type: 'string',
          description: 'Database path for libsql backend',
          default: '.rams/execution_history',
        },
      },
      async run({ args }) {
        const backend = args.backend as string;
        const dbPath = args.dbPath as string;
        
        let commitManager: CommitManager | CommitManagerDB;
        let undoRedoManager: UndoRedoManager | UndoRedoManagerDB;
        
        if (backend === 'libsql') {
          const dbManager = new DatabaseManager(dbPath);
          commitManager = new CommitManagerDB(args.instance as string, dbManager);
          undoRedoManager = new UndoRedoManagerDB(args.instance as string, dbManager, commitManager);
        } else {
          commitManager = new CommitManager(args.instance as string);
          undoRedoManager = new UndoRedoManager(args.instance as string, commitManager);
        }
        
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
        backend: {
          type: 'string',
          description: 'Storage backend (filesystem or libsql)',
          default: 'filesystem',
        },
        dbPath: {
          type: 'string',
          description: 'Database path for libsql backend',
          default: '.rams/execution_history',
        },
      },
      async run({ args }) {
        const backend = args.backend as string;
        const dbPath = args.dbPath as string;
        
        let commitManager: CommitManager | CommitManagerDB;
        let undoRedoManager: UndoRedoManager | UndoRedoManagerDB;
        
        if (backend === 'libsql') {
          const dbManager = new DatabaseManager(dbPath);
          commitManager = new CommitManagerDB(args.instance as string, dbManager);
          undoRedoManager = new UndoRedoManagerDB(args.instance as string, dbManager, commitManager);
        } else {
          commitManager = new CommitManager(args.instance as string);
          undoRedoManager = new UndoRedoManager(args.instance as string, commitManager);
        }
        
        await commitManager.initialize();
        await undoRedoManager.initialize();
        
        const targetCommit = await undoRedoManager.redo(parseInt(args.steps as string));
        if (targetCommit) {
          console.log(`Redid to commit: ${targetCommit}`);
        } else {
          console.log('Nothing to redo');
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
        backend: {
          type: 'string',
          description: 'Storage backend (filesystem or libsql)',
          default: 'filesystem',
        },
        dbPath: {
          type: 'string',
          description: 'Database path for libsql backend',
          default: '.rams/execution_history',
        },
      },
      async run({ args }) {
        const backend = args.backend as string;
        const dbPath = args.dbPath as string;
        
        let commitManager: CommitManager | CommitManagerDB;
        let undoRedoManager: UndoRedoManager | UndoRedoManagerDB;
        
        if (backend === 'libsql') {
          const dbManager = new DatabaseManager(dbPath);
          commitManager = new CommitManagerDB(args.instance as string, dbManager);
          undoRedoManager = new UndoRedoManagerDB(args.instance as string, dbManager, commitManager);
        } else {
          commitManager = new CommitManager(args.instance as string);
          undoRedoManager = new UndoRedoManager(args.instance as string, commitManager);
        }
        
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
            backend: {
              type: 'string',
              description: 'Storage backend (filesystem or libsql)',
              default: 'filesystem',
            },
            dbPath: {
              type: 'string',
              description: 'Database path for libsql backend',
              default: '.rams/execution_history',
            },
          },
          async run({ args }) {
            const backend = args.backend as string;
            const dbPath = args.dbPath as string;
            
            let commitManager: CommitManager | CommitManagerDB;
            let branchManager: BranchManager | BranchManagerDB;
            
            if (backend === 'libsql') {
              const dbManager = new DatabaseManager(dbPath);
              commitManager = new CommitManagerDB(args.instance as string, dbManager);
              branchManager = new BranchManagerDB(args.instance as string, dbManager);
            } else {
              commitManager = new CommitManager(args.instance as string);
              branchManager = new BranchManager(args.instance as string);
            }
            
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
            backend: {
              type: 'string',
              description: 'Storage backend (filesystem or libsql)',
              default: 'filesystem',
            },
            dbPath: {
              type: 'string',
              description: 'Database path for libsql backend',
              default: '.rams/execution_history',
            },
          },
          async run({ args }) {
            const backend = args.backend as string;
            const dbPath = args.dbPath as string;
            
            let branchManager: BranchManager | BranchManagerDB;
            
            if (backend === 'libsql') {
              const dbManager = new DatabaseManager(dbPath);
              branchManager = new BranchManagerDB(args.instance as string, dbManager);
            } else {
              branchManager = new BranchManager(args.instance as string);
            }
            
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
            backend: {
              type: 'string',
              description: 'Storage backend (filesystem or libsql)',
              default: 'filesystem',
            },
            dbPath: {
              type: 'string',
              description: 'Database path for libsql backend',
              default: '.rams/execution_history',
            },
          },
          async run({ args }) {
            const backend = args.backend as string;
            const dbPath = args.dbPath as string;
            
            let branchManager: BranchManager | BranchManagerDB;
            
            if (backend === 'libsql') {
              const dbManager = new DatabaseManager(dbPath);
              branchManager = new BranchManagerDB(args.instance as string, dbManager);
            } else {
              branchManager = new BranchManager(args.instance as string);
            }
            
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
            backend: {
              type: 'string',
              description: 'Storage backend (filesystem or libsql)',
              default: 'filesystem',
            },
            dbPath: {
              type: 'string',
              description: 'Database path for libsql backend',
              default: '.rams/execution_history',
            },
          },
          async run({ args }) {
            const backend = args.backend as string;
            const dbPath = args.dbPath as string;
            
            let branchManager: BranchManager | BranchManagerDB;
            
            if (backend === 'libsql') {
              const dbManager = new DatabaseManager(dbPath);
              branchManager = new BranchManagerDB(args.instance as string, dbManager);
            } else {
              branchManager = new BranchManager(args.instance as string);
            }
            
            await branchManager.initialize();
            
            await branchManager.deleteBranch(args.name as string);
            console.log(`Deleted branch: ${args.name}`);
          },
        }),
      },
    }),

    merge: defineCommand({
      meta: {
        name: 'merge',
        description: 'Merge branches',
      },
      args: {
        instance: {
          type: 'string',
          description: 'Role instance ID',
          required: true,
        },
        source: {
          type: 'string',
          description: 'Source branch',
          required: true,
        },
        target: {
          type: 'string',
          description: 'Target branch',
          required: true,
        },
        strategy: {
          type: 'string',
          description: 'Merge strategy (auto, manual)',
          default: 'auto',
        },
      },
      async run({ args }) {
        const commitManager = new CommitManager(args.instance as string);
        const branchManager = new BranchManager(args.instance as string);
        const mergeManager = new MergeManager(args.instance as string, commitManager, branchManager);
        
        await commitManager.initialize();
        await branchManager.initialize();
        
        const result = await mergeManager.merge(
          args.source as string,
          args.target as string,
          args.strategy as 'auto' | 'manual'
        );
        
        if (result.success) {
          console.log(result.message);
        } else {
          console.error(result.message);
          if (result.conflicts) {
            console.log('Conflicts:');
            for (const conflict of result.conflicts) {
              console.log(`  - ${conflict.skill_name}: ${conflict.conflict_type}`);
            }
          }
        }
      },
    }),

    tag: defineCommand({
      meta: {
        name: 'tag',
        description: 'Tag management',
      },
      subCommands: {
        create: defineCommand({
          meta: {
            name: 'create',
            description: 'Create a tag',
          },
          args: {
            instance: {
              type: 'string',
              description: 'Role instance ID',
              required: true,
            },
            name: {
              type: 'string',
              description: 'Tag name',
              required: true,
            },
            commit: {
              type: 'string',
              description: 'Commit ID',
              required: true,
            },
            message: {
              type: 'string',
              description: 'Tag message',
              required: false,
            },
            backend: {
              type: 'string',
              description: 'Storage backend (filesystem or libsql)',
              default: 'filesystem',
            },
            dbPath: {
              type: 'string',
              description: 'Database path for libsql backend',
              default: '.rams/execution_history',
            },
          },
          async run({ args }) {
            const backend = args.backend as string;
            const dbPath = args.dbPath as string;
            
            let tagManager: TagManager | TagManagerDB;
            
            if (backend === 'libsql') {
              const dbManager = new DatabaseManager(dbPath);
              tagManager = new TagManagerDB(args.instance as string, dbManager);
            } else {
              tagManager = new TagManager(args.instance as string);
            }
            
            await tagManager.initialize();
            
            await tagManager.createTag(
              args.name as string,
              args.commit as string,
              args.message as string || ''
            );
            console.log(`Created tag: ${args.name}`);
          },
        }),

        list: defineCommand({
          meta: {
            name: 'list',
            description: 'List all tags',
          },
          args: {
            instance: {
              type: 'string',
              description: 'Role instance ID',
              required: true,
            },
            backend: {
              type: 'string',
              description: 'Storage backend (filesystem or libsql)',
              default: 'filesystem',
            },
            dbPath: {
              type: 'string',
              description: 'Database path for libsql backend',
              default: '.rams/execution_history',
            },
          },
          async run({ args }) {
            const backend = args.backend as string;
            const dbPath = args.dbPath as string;
            
            let tagManager: TagManager | TagManagerDB;
            
            if (backend === 'libsql') {
              const dbManager = new DatabaseManager(dbPath);
              tagManager = new TagManagerDB(args.instance as string, dbManager);
            } else {
              tagManager = new TagManager(args.instance as string);
            }
            
            await tagManager.initialize();
            
            const tags = await tagManager.listTags();
            console.log('Tags:');
            for (const tag of tags) {
              console.log(`  ${tag.name} -> ${tag.commit_id} (${tag.created_at})`);
            }
          },
        }),

        delete: defineCommand({
          meta: {
            name: 'delete',
            description: 'Delete a tag',
          },
          args: {
            instance: {
              type: 'string',
              description: 'Role instance ID',
              required: true,
            },
            name: {
              type: 'string',
              description: 'Tag name',
              required: true,
            },
            backend: {
              type: 'string',
              description: 'Storage backend (filesystem or libsql)',
              default: 'filesystem',
            },
            dbPath: {
              type: 'string',
              description: 'Database path for libsql backend',
              default: '.rams/execution_history',
            },
          },
          async run({ args }) {
            const backend = args.backend as string;
            const dbPath = args.dbPath as string;
            
            let tagManager: TagManager | TagManagerDB;
            
            if (backend === 'libsql') {
              const dbManager = new DatabaseManager(dbPath);
              tagManager = new TagManagerDB(args.instance as string, dbManager);
            } else {
              tagManager = new TagManager(args.instance as string);
            }
            
            await tagManager.initialize();
            
            await tagManager.deleteTag(args.name as string);
            console.log(`Deleted tag: ${args.name}`);
          },
        }),
      },
    }),

    stash: defineCommand({
      meta: {
        name: 'stash',
        description: 'Stash management',
      },
      subCommands: {
        save: defineCommand({
          meta: {
            name: 'save',
            description: 'Save current work to stash',
          },
          args: {
            instance: {
              type: 'string',
              description: 'Role instance ID',
              required: true,
            },
            message: {
              type: 'string',
              description: 'Stash message',
              default: 'WIP',
            },
            backend: {
              type: 'string',
              description: 'Storage backend (filesystem or libsql)',
              default: 'filesystem',
            },
            dbPath: {
              type: 'string',
              description: 'Database path for libsql backend',
              default: '.rams/execution_history',
            },
          },
          async run({ args }) {
            const backend = args.backend as string;
            const dbPath = args.dbPath as string;
            
            let commitManager: CommitManager | CommitManagerDB;
            let stashManager: StashManager | StashManagerDB;
            
            if (backend === 'libsql') {
              const dbManager = new DatabaseManager(dbPath);
              commitManager = new CommitManagerDB(args.instance as string, dbManager);
              stashManager = new StashManagerDB(args.instance as string, dbManager);
            } else {
              commitManager = new CommitManager(args.instance as string);
              stashManager = new StashManager(args.instance as string);
            }
            
            await commitManager.initialize();
            await stashManager.initialize();
            
            const currentCommit = await commitManager.getCurrentCommit();
            if (!currentCommit) {
              console.error('No current commit found');
              return;
            }
            
            const stashId = await stashManager.create(currentCommit, args.message as string);
            console.log(`Stashed: ${stashId}`);
          },
        }),

        list: defineCommand({
          meta: {
            name: 'list',
            description: 'List all stashes',
          },
          args: {
            instance: {
              type: 'string',
              description: 'Role instance ID',
              required: true,
            },
            backend: {
              type: 'string',
              description: 'Storage backend (filesystem or libsql)',
              default: 'filesystem',
            },
            dbPath: {
              type: 'string',
              description: 'Database path for libsql backend',
              default: '.rams/execution_history',
            },
          },
          async run({ args }) {
            const backend = args.backend as string;
            const dbPath = args.dbPath as string;
            
            let stashManager: StashManager | StashManagerDB;
            
            if (backend === 'libsql') {
              const dbManager = new DatabaseManager(dbPath);
              stashManager = new StashManagerDB(args.instance as string, dbManager);
            } else {
              stashManager = new StashManager(args.instance as string);
            }
            
            await stashManager.initialize();
            
            const stashes = await stashManager.list();
            console.log('Stashes:');
            for (const stash of stashes) {
              console.log(`  ${stash.id}: ${stash.message} (${stash.created_at})`);
            }
          },
        }),

        apply: defineCommand({
          meta: {
            name: 'apply',
            description: 'Apply a stash',
          },
          args: {
            instance: {
              type: 'string',
              description: 'Role instance ID',
              required: true,
            },
            id: {
              type: 'string',
              description: 'Stash ID',
              required: true,
            },
            backend: {
              type: 'string',
              description: 'Storage backend (filesystem or libsql)',
              default: 'filesystem',
            },
            dbPath: {
              type: 'string',
              description: 'Database path for libsql backend',
              default: '.rams/execution_history',
            },
          },
          async run({ args }) {
            const backend = args.backend as string;
            const dbPath = args.dbPath as string;
            
            let stashManager: StashManager | StashManagerDB;
            
            if (backend === 'libsql') {
              const dbManager = new DatabaseManager(dbPath);
              stashManager = new StashManagerDB(args.instance as string, dbManager);
            } else {
              stashManager = new StashManager(args.instance as string);
            }
            
            await stashManager.initialize();
            
            await stashManager.apply(args.id as string);
            console.log(`Applied stash: ${args.id}`);
          },
        }),

        drop: defineCommand({
          meta: {
            name: 'drop',
            description: 'Drop a stash',
          },
          args: {
            instance: {
              type: 'string',
              description: 'Role instance ID',
              required: true,
            },
            id: {
              type: 'string',
              description: 'Stash ID',
              required: true,
            },
            backend: {
              type: 'string',
              description: 'Storage backend (filesystem or libsql)',
              default: 'filesystem',
            },
            dbPath: {
              type: 'string',
              description: 'Database path for libsql backend',
              default: '.rams/execution_history',
            },
          },
          async run({ args }) {
            const backend = args.backend as string;
            const dbPath = args.dbPath as string;
            
            let stashManager: StashManager | StashManagerDB;
            
            if (backend === 'libsql') {
              const dbManager = new DatabaseManager(dbPath);
              stashManager = new StashManagerDB(args.instance as string, dbManager);
            } else {
              stashManager = new StashManager(args.instance as string);
            }
            
            await stashManager.initialize();
            
            await stashManager.drop(args.id as string);
            console.log(`Dropped stash: ${args.id}`);
          },
        }),
      },
    }),

    rebase: defineCommand({
      meta: {
        name: 'rebase',
        description: 'Rebase commits',
      },
      args: {
        instance: {
          type: 'string',
          description: 'Role instance ID',
          required: true,
        },
        branch: {
          type: 'string',
          description: 'Branch to rebase',
          required: true,
        },
        onto: {
          type: 'string',
          description: 'Target commit',
          required: true,
        },
      },
      async run({ args }) {
        const commitManager = new CommitManager(args.instance as string);
        const branchManager = new BranchManager(args.instance as string);
        const rebaseManager = new RebaseManager(commitManager, branchManager);
        
        await commitManager.initialize();
        await branchManager.initialize();
        
        await rebaseManager.rebase(args.branch as string, args.onto as string);
        console.log(`Rebased ${args.branch} onto ${args.onto}`);
      },
    }),

    remote: defineCommand({
      meta: {
        name: 'remote',
        description: 'Remote repository management',
      },
      subCommands: {
        add: defineCommand({
          meta: {
            name: 'add',
            description: 'Add a remote',
          },
          args: {
            instance: {
              type: 'string',
              description: 'Role instance ID',
              required: true,
            },
            name: {
              type: 'string',
              description: 'Remote name',
              required: true,
            },
            url: {
              type: 'string',
              description: 'Remote URL',
              required: true,
            },
            type: {
              type: 'string',
              description: 'Remote type (git, s3, r2)',
              default: 'git',
            },
          },
          async run({ args }) {
            const remoteManager = new RemoteManager(args.instance as string);
            
            const config = {
              type: args.type as 'git' | 's3' | 'r2',
              url: args.url as string,
            };
            
            await remoteManager.addRemote(args.name as string, config);
            console.log(`Added remote: ${args.name}`);
          },
        }),

        list: defineCommand({
          meta: {
            name: 'list',
            description: 'List remotes',
          },
          args: {
            instance: {
              type: 'string',
              description: 'Role instance ID',
              required: true,
            },
          },
          async run({ args }) {
            const remoteManager = new RemoteManager(args.instance as string);
            const remotes = await remoteManager.listRemotes();
            console.log('Remotes:');
            for (const remote of remotes) {
              console.log(`  ${remote}`);
            }
          },
        }),

        push: defineCommand({
          meta: {
            name: 'push',
            description: 'Push to remote',
          },
          args: {
            instance: {
              type: 'string',
              description: 'Role instance ID',
              required: true,
            },
            remote: {
              type: 'string',
              description: 'Remote name',
              required: true,
            },
            branch: {
              type: 'string',
              description: 'Branch name',
              required: true,
            },
          },
          async run({ args }) {
            const remoteManager = new RemoteManager(args.instance as string);
            await remoteManager.push(args.remote as string, args.branch as string);
            console.log(`Pushed to ${args.remote}`);
          },
        }),

        pull: defineCommand({
          meta: {
            name: 'pull',
            description: 'Pull from remote',
          },
          args: {
            instance: {
              type: 'string',
              description: 'Role instance ID',
              required: true,
            },
            remote: {
              type: 'string',
              description: 'Remote name',
              required: true,
            },
            branch: {
              type: 'string',
              description: 'Branch name',
              required: true,
            },
          },
          async run({ args }) {
            const remoteManager = new RemoteManager(args.instance as string);
            await remoteManager.pull(args.remote as string, args.branch as string);
            console.log(`Pulled from ${args.remote}`);
          },
        }),
      },
    }),
  },
});
