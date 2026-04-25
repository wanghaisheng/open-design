# Skill Execution Git-like Versioning System Design

设计类似Git的技能执行历史管理系统，支持版本管理、分支、Undo/Redo功能，让终端用户可以回退到之前的执行状态。

---

## 概述

角色实例化后依赖每个skill执行，每次执行产生输入输出。参考Git的worktree机制，实现技能执行的版本管理，支持：
- 执行历史记录（commit）
- 分支管理（branch）
- 回退功能（undo/checkout）
- 重做功能（redo）
- 历史查看（log）
- 分支切换（switch）

## 核心概念

### Execution Commit（执行提交）
每次skill执行生成一个commit，包含：
- commit_id: 唯一标识
- skill_name: 执行的技能名称
- input_hash: 输入数据哈希
- output_data: 输出数据
- timestamp: 执行时间
- parent_commit: 父提交ID
- metadata: 元数据（实现方式、执行时间等）

### Execution Branch（执行分支）
分支管理不同的执行路径：
- main: 主分支
- feature/*: 功能分支
- experiment/*: 实验分支

### Execution Worktree（执行工作树）
每个分支对应一个工作树，包含当前状态的输入输出文件。

## 存储结构

### 目录结构
```
.rams/
  execution_history/
    {role_instance_id}/
      .git/  # Git-like元数据
        HEAD
        refs/
          heads/
            main
            feature-x
        objects/
          commits/
          trees/
        logs/
      worktrees/
        main/
          current_state/
            skill_outputs/
              creative-discovery/
                output_20260425.md
              topic-validation/
                output_20260425.md
        feature-x/
          current_state/
            skill_outputs/
              ...
```

### Commit对象格式
```yaml
commit_id: "abc123"
skill_name: "creative-discovery"
input_hash: "sha256:..."
output_data:
  type: "markdown"
  path: "skill_outputs/creative-discovery/output_20260425.md"
  content_hash: "sha256:..."
timestamp: "2026-04-25T12:53:00Z"
parent_commit: "def456"
metadata:
  implementation: "ai-model"
  model: "claude-3-opus"
  execution_time: 2.5
  tokens_used: 1500
```

## 功能设计

### 1. 执行记录（Commit）

每次skill执行后自动创建commit：

```python
class ExecutionCommitManager:
    def create_commit(self, skill_name: str, input_data: dict, output_data: dict, parent_id: str = None):
        commit = {
            'commit_id': self._generate_commit_id(),
            'skill_name': skill_name,
            'input_hash': self._hash_input(input_data),
            'output_data': self._store_output(output_data),
            'timestamp': datetime.now().isoformat(),
            'parent_commit': parent_id,
            'metadata': self._collect_metadata()
        }
        self._store_commit(commit)
        return commit['commit_id']
```

### 2. 分支管理

创建和切换分支：

```python
class ExecutionBranchManager:
    def create_branch(self, branch_name: str, from_commit: str = None):
        """创建新分支"""
        base_commit = from_commit or self._get_current_commit()
        self._update_ref(f'refs/heads/{branch_name}', base_commit)
        self._create_worktree(branch_name, base_commit)
    
    def switch_branch(self, branch_name: str):
        """切换分支"""
        commit_id = self._get_ref(f'refs/heads/{branch_name}')
        self._update_head(commit_id)
        self._restore_worktree(branch_name, commit_id)
    
    def list_branches(self):
        """列出所有分支"""
        return self._list_refs('refs/heads/')
```

### 3. Undo/Redo

回退和重做：

```python
class ExecutionUndoRedo:
    def undo(self, steps: int = 1):
        """回退N步"""
        current_commit = self._get_current_commit()
        target_commit = self._traverse_back(current_commit, steps)
        self._checkout(target_commit)
    
    def redo(self, steps: int = 1):
        """重做N步"""
        # 从reflog中找到forward的commit
        forward_commit = self._get_forward_commit(steps)
        if forward_commit:
            self._checkout(forward_commit)
    
    def checkout(self, commit_id: str):
        """切换到指定commit"""
        self._update_head(commit_id)
        self._restore_state(commit_id)
```

### 4. 历史查看

查看执行历史：

```python
class ExecutionHistoryViewer:
    def log(self, skill_name: str = None, limit: int = 10):
        """查看执行历史"""
        commits = self._get_commits(skill_name, limit)
        return self._format_log(commits)
    
    def show(self, commit_id: str):
        """查看指定commit详情"""
        commit = self._get_commit(commit_id)
        return self._format_commit_detail(commit)
    
    def diff(self, commit_a: str, commit_b: str):
        """比较两个commit的差异"""
        output_a = self._get_output(commit_a)
        output_b = self._get_output(commit_b)
        return self._diff_outputs(output_a, output_b)
```

### 5. 分支合并

合并分支：

```python
class ExecutionMerger:
    def merge(self, source_branch: str, target_branch: str):
        """合并分支"""
        source_commit = self._get_ref(f'refs/heads/{source_branch}')
        target_commit = self._get_ref(f'refs/heads/{target_branch}')
        
        # 检查冲突
        conflicts = self._detect_conflicts(source_commit, target_commit)
        if conflicts:
            return {'status': 'conflict', 'conflicts': conflicts}
        
        # 执行合并
        merge_commit = self._create_merge_commit(source_commit, target_commit)
        self._update_ref(f'refs/heads/{target_branch}', merge_commit)
        return {'status': 'success', 'commit_id': merge_commit}
```

## 集成到角色实例

### RoleInstance扩展

```python
class VersionedRoleInstance(RoleInstance):
    """支持版本管理的角色实例"""
    
    def __init__(self, role_instance_config: Dict[str, Any]):
        super().__init__(role_instance_config)
        self.commit_manager = ExecutionCommitManager(self.config['instance_id'])
        self.branch_manager = ExecutionBranchManager(self.config['instance_id'])
        self.undo_redo = ExecutionUndoRedo(self.config['instance_id'])
        self.history_viewer = ExecutionHistoryViewer(self.config['instance_id'])
        self.merger = ExecutionMerger(self.config['instance_id'])
    
    def execute_skill(self, skill_name: str, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """执行技能（带版本记录）"""
        # 获取当前commit作为parent
        parent_commit = self.commit_manager.get_current_commit()
        
        # 执行技能
        result = super().execute_skill(skill_name, input_data)
        
        # 创建commit
        commit_id = self.commit_manager.create_commit(
            skill_name, input_data, result, parent_commit
        )
        
        return result
```

## 用户界面

### CLI命令

```bash
# 查看执行历史
rams execution log --instance {instance_id}

# 回退N步
rams execution undo --instance {instance_id} --steps 1

# 重做N步
rams execution redo --instance {instance_id} --steps 1

# 切换到指定commit
rams execution checkout --instance {instance_id} --commit {commit_id}

# 创建分支
rams execution branch create --instance {instance_id} --name feature-x

# 切换分支
rams execution branch switch --instance {instance_id} --name feature-x

# 查看分支列表
rams execution branch list --instance {instance_id}

# 合并分支
rams execution merge --instance {instance_id} --source feature-x --target main

# 查看commit详情
rams execution show --instance {instance_id} --commit {commit_id}

# 比较两个commit
rams execution diff --instance {instance_id} --commit-a {commit_a} --commit-b {commit_b}
```

### API接口

```python
# 执行技能（自动记录）
result = role_instance.execute_skill('creative-discovery', input_data)

# 查看历史
history = role_instance.history_viewer.log(limit=10)

# 回退
role_instance.undo_redo.undo(steps=1)

# 重做
role_instance.undo_redo.redo(steps=1)

# 切换分支
role_instance.branch_manager.switch_branch('feature-x')

# 创建分支
role_instance.branch_manager.create_branch('feature-x')
```

## 存储优化

### 大文件存储策略

#### 文件分类存储

**小文件（<10MB）**
- 存储在Git仓库中
- 使用内容寻址存储
- 支持版本控制

**大文件（≥10MB）**
- 存储在对象存储（S3/Cloudflare R2）
- 在Git中存储引用（URL/路径）
- 支持CDN加速

#### 支持的对象存储

```yaml
storage_backends:
  s3:
    enabled: true
    bucket: rams-execution-large-files
    region: us-east-1
    access_key: ${AWS_ACCESS_KEY}
    secret_key: ${AWS_SECRET_KEY}
  
  r2:
    enabled: true
    bucket: rams-execution-large-files
    account_id: ${CLOUDFLARE_ACCOUNT_ID}
    access_key: ${R2_ACCESS_KEY}
    secret_key: ${R2_SECRET_KEY}
```

#### 大文件处理流程

```python
class LargeFileStorageManager:
    def __init__(self, backend: str = 'r2'):
        self.backend = backend
        self.config = self._load_backend_config()
        self.threshold = 10 * 1024 * 1024  # 10MB
        self.local_storage = self._init_local_storage()
    
    def store_file(self, file_path: str, skill_name: str, commit_id: str) -> str:
        """存储文件"""
        file_size = os.path.getsize(file_path)
        
        if file_size < self.threshold:
            # 小文件：存储在Git中
            return self._store_in_git(file_path)
        else:
            # 大文件：存储到对象存储或本地
            if self._has_backend_configured():
                return self._store_in_object_storage(file_path, skill_name, commit_id)
            else:
                # Fallback：本地存储
                return self._store_locally(file_path, skill_name, commit_id)
    
    def _has_backend_configured(self) -> bool:
        """检查是否配置了对象存储后端"""
        return bool(self.config.get('backends', {}).get(self.backend))
    
    def _store_locally(self, file_path: str, skill_name: str, commit_id: str) -> str:
        """本地存储（fallback）"""
        local_dir = f".rams/large_files/{skill_name}/{commit_id}"
        os.makedirs(local_dir, exist_ok=True)
        
        file_hash = self._calculate_hash(file_path)
        file_ext = os.path.splitext(file_path)[1]
        local_path = f"{local_dir}/{file_hash}{file_ext}"
        
        # 复制文件到本地
        shutil.copy2(file_path, local_path)
        
        # 警告用户
        print(f"⚠️  警告：大文件存储在本地（{local_path}）")
        print("   重启后可能会丢失数据")
        print("   建议配置S3或Cloudflare R2以实现持久化存储")
        print("   配置方法：rams storage configure")
        
        return f"local://{local_path}"
    
    def _store_in_object_storage(self, file_path: str, skill_name: str, commit_id: str) -> str:
        """存储到对象存储"""
        # 生成唯一key
        file_hash = self._calculate_hash(file_path)
        file_ext = os.path.splitext(file_path)[1]
        storage_key = f"{skill_name}/{commit_id}/{file_hash}{file_ext}"
        
        # 上传到对象存储
        if self.backend == 's3':
            url = self._upload_to_s3(file_path, storage_key)
        elif self.backend == 'r2':
            url = self._upload_to_r2(file_path, storage_key)
        
        # 返回引用URL
        return url
    
    def _upload_to_s3(self, file_path: str, key: str) -> str:
        """上传到S3"""
        import boto3
        s3 = boto3.client('s3', **self.config)
        s3.upload_file(file_path, self.config['bucket'], key)
        return f"s3://{self.config['bucket']}/{key}"
    
    def _upload_to_r2(self, file_path: str, key: str) -> str:
        """上传到Cloudflare R2"""
        import boto3
        # R2兼容S3 API
        s3 = boto3.client('s3', 
                         endpoint_url=f"https://{self.config['account_id']}.r2.cloudflarestorage.com",
                         **self.config)
        s3.upload_file(file_path, self.config['bucket'], key)
        return f"r2://{self.config['bucket']}/{key}"
    
    def retrieve_file(self, reference: str, local_path: str):
        """检索文件"""
        if reference.startswith('s3://'):
            self._download_from_s3(reference, local_path)
        elif reference.startswith('r2://'):
            self._download_from_r2(reference, local_path)
        elif reference.startswith('local://'):
            self._restore_from_local(reference, local_path)
        else:
            # Git中的文件
            self._restore_from_git(reference, local_path)
    
    def _restore_from_local(self, reference: str, local_path: str):
        """从本地存储恢复文件"""
        local_storage_path = reference.replace('local://', '')
        if os.path.exists(local_storage_path):
            shutil.copy2(local_storage_path, local_path)
        else:
            raise FileNotFoundError(f"本地文件不存在：{local_storage_path}")
```

#### Commit中的大文件引用

```yaml
commit_id: "abc123"
skill_name: "creative-discovery"
output_data:
  type: "markdown"
  path: "skill_outputs/creative-discovery/output_20260425.md"
  content_hash: "sha256:..."
  
  # 大文件引用
  large_files:
    - type: "image"
      original_path: "concept_art.png"
      size: 15728640  # 15MB
      storage: "r2"
      reference: "r2://rams-execution-large-files/creative-discovery/abc123/concept_art.png"
      cdn_url: "https://cdn.example.com/creative-discovery/abc123/concept_art.png"
    
    - type: "video"
      original_path: "demo_video.mp4"
      size: 52428800  # 50MB
      storage: "s3"
      reference: "s3://rams-execution-large-files/creative-discovery/abc123/demo_video.mp4"
```

#### 配置文件

```yaml
# .rams/storage_config.yaml
large_file_storage:
  enabled: true
  threshold: 10485760  # 10MB
  preferred_backend: r2  # r2 or s3
  cdn_enabled: true
  cdn_domain: cdn.example.com
  
  backends:
    r2:
      account_id: ${CLOUDFLARE_ACCOUNT_ID}
      access_key: ${R2_ACCESS_KEY}
      secret_key: ${R2_SECRET_KEY}
      bucket: rams-execution-large-files
    
    s3:
      region: us-east-1
      access_key: ${AWS_ACCESS_KEY}
      secret_key: ${AWS_SECRET_KEY}
      bucket: rams-execution-large-files
```

### 增量存储
- 相同输入使用相同commit
- 输出文件使用内容寻址存储
- 大文件使用对象存储引用

### 压缩
- 历史commit定期打包压缩
- 旧历史归档到冷存储
- 大文件自动压缩（如果支持）

### 清理
- 定期清理未引用的commit
- 清理对象存储中的孤立文件
- 保留最近N个版本

## 实现步骤

### Phase 1: 核心存储结构
1. 设计commit对象格式
2. 设计存储目录结构
3. 实现commit存储和读取

### Phase 2: 版本管理功能
1. 实现commit创建
2. 实现commit查询
3. 实现parent链遍历

### Phase 3: 分支管理
1. 实现分支创建
2. 实现分支切换
3. 实现worktree管理

### Phase 4: Undo/Redo
1. 实现回退功能
2. 实现重做功能
3. 实现reflog

### Phase 5: 历史查看
1. 实现log命令
2. 实现show命令
3. 实现diff命令

### Phase 6: 分支合并
1. 实现冲突检测
2. 实现合并逻辑
3. 实现冲突解决

### Phase 7: 集成到角色实例
1. 扩展RoleInstance类
2. 集成commit管理
3. 自动记录执行历史

### Phase 8: 用户界面
1. 实现CLI命令
2. 实现API接口
3. 实现可视化界面

### Phase 9: 优化和清理
1. 实现增量存储
2. 实现压缩和归档
3. 实现清理策略

### Phase 10: 文档和测试
1. 编写使用文档
2. 编写API文档
3. 编写测试用例

## 用户决策

1. **远程仓库（remote）**：是
2. **协作（collaboration）**：是
3. **标签（tag）**：是
4. **stash（暂存）**：是
5. **rebase（变基）**：是

## 扩展功能设计

### 6. 远程仓库（Remote）

#### 仓库粒度设计

**推荐方案：整个任务一个repo**

- **repo范围**：一个角色实例（role_instance）对应一个repo
- **包含内容**：该角色实例执行的所有skill的commit历史
- **分支含义**：不同的执行路径/实验方案
- **标签含义**：重要的里程碑版本

**理由：**
1. 统一的执行历史，可以看到完整的任务演进过程
2. 分支可以包含多个skill的执行路径，支持整体方案对比
3. 协作时可以看到整个项目的进展
4. Undo/Redo操作针对整个任务状态，更符合"悔棋"需求

**不推荐每个skill一个repo：**
- 无法看到任务的整体演进
- 协作时需要同步多个repo
- 分支管理复杂
- Undo/Redo只能针对单个skill，无法回退整个任务状态

#### Remote配置
```yaml
remotes:
  origin:
    url: https://github.com/user/rams-execution-history.git
    type: git
  backup:
    url: s3://bucket/rams-execution-history/
    type: s3
```

#### Remote操作
```python
class ExecutionRemoteManager:
    def add_remote(self, name: str, url: str):
        """添加远程仓库"""
        self._update_config('remotes', name, {'url': url})
    
    def push(self, remote: str, branch: str):
        """推送到远程仓库"""
        remote_url = self._get_remote_url(remote)
        commits = self._get_commits_to_push(remote, branch)
        self._push_commits(remote_url, commits)
    
    def pull(self, remote: str, branch: str):
        """从远程仓库拉取"""
        remote_url = self._get_remote_url(remote)
        commits = self._fetch_commits(remote_url, branch)
        self._merge_commits(commits)
    
    def fetch(self, remote: str):
        """获取远程更新"""
        remote_url = self._get_remote_url(remote)
        self._fetch_all_remotes(remote_url)
```

### 7. 协作（Collaboration）

#### 协作功能
```python
class ExecutionCollaborationManager:
    def share_branch(self, branch: str, collaborators: list):
        """分享分支给协作者"""
        # 设置分支权限
        self._set_branch_permission(branch, collaborators)
    
    def request_review(self, commit_id: str, reviewers: list):
        """请求代码审查"""
        review_request = {
            'commit_id': commit_id,
            'reviewers': reviewers,
            'status': 'pending',
            'created_at': datetime.now().isoformat()
        }
        self._create_review_request(review_request)
    
    def submit_review(self, review_id: str, approval: bool, comments: str):
        """提交审查结果"""
        self._update_review_request(review_id, {
            'approval': approval,
            'comments': comments,
            'status': 'completed',
            'reviewed_at': datetime.now().isoformat()
        })
    
    def resolve_conflict(self, conflict_id: str, resolution: dict):
        """解决冲突"""
        self._apply_resolution(conflict_id, resolution)
```

### 8. 标签（Tag）

#### Tag管理
```python
class ExecutionTagManager:
    def create_tag(self, tag_name: str, commit_id: str, message: str = ""):
        """创建标签"""
        tag = {
            'tag_name': tag_name,
            'commit_id': commit_id,
            'message': message,
            'created_at': datetime.now().isoformat()
        }
        self._store_tag(tag)
    
    def delete_tag(self, tag_name: str):
        """删除标签"""
        self._remove_tag(tag_name)
    
    def list_tags(self, pattern: str = None):
        """列出标签"""
        tags = self._get_all_tags()
        if pattern:
            tags = [t for t in tags if fnmatch.fnmatch(t['tag_name'], pattern)]
        return tags
    
    def checkout_tag(self, tag_name: str):
        """切换到标签"""
        tag = self._get_tag(tag_name)
        self._checkout(tag['commit_id'])
```

### 9. Stash（暂存）

#### Stash管理
```python
class ExecutionStashManager:
    def stash(self, message: str = ""):
        """暂存当前工作状态"""
        current_state = self._get_current_state()
        stash_entry = {
            'stash_id': self._generate_stash_id(),
            'message': message,
            'state': current_state,
            'created_at': datetime.now().isoformat()
        }
        self._store_stash(stash_entry)
        self._reset_to_head()
    
    def stash_list(self):
        """列出暂存列表"""
        return self._get_all_stashes()
    
    def stash_pop(self, stash_id: str):
        """弹出并应用暂存"""
        stash = self._get_stash(stash_id)
        self._apply_state(stash['state'])
        self._remove_stash(stash_id)
    
    def stash_apply(self, stash_id: str):
        """应用暂存（不删除）"""
        stash = self._get_stash(stash_id)
        self._apply_state(stash['state'])
    
    def stash_drop(self, stash_id: str):
        """删除暂存"""
        self._remove_stash(stash_id)
```

### 10. Rebase（变基）

#### Rebase操作
```python
class ExecutionRebaseManager:
    def rebase(self, upstream: str, branch: str = None):
        """变基到upstream"""
        current_branch = branch or self._get_current_branch()
        current_commit = self._get_ref(f'refs/heads/{current_branch}')
        upstream_commit = self._get_ref(f'refs/heads/{upstream}')
        
        # 找到分叉点
        fork_point = self._find_fork_point(current_commit, upstream_commit)
        
        # 收集需要rebase的commits
        commits_to_rebase = self._get_commits_between(fork_point, current_commit)
        
        # 逐个应用到upstream
        new_commits = []
        for commit in commits_to_rebase:
            new_commit = self._replay_commit(commit, upstream_commit)
            new_commits.append(new_commit)
            upstream_commit = new_commit
        
        # 更新分支引用
        self._update_ref(f'refs/heads/{current_branch}', new_commits[-1])
    
    def rebase_interactive(self, upstream: str):
        """交互式rebase"""
        # 显示commits列表，允许用户选择操作
        commits = self._get_commits_to_rebase(upstream)
        # 用户可以选择：pick, drop, edit, squash, fixup
        pass
    
    def rebase_continue(self):
        """继续中断的rebase"""
        pass
    
    def rebase_abort(self):
        """中止rebase"""
        self._restore_pre_rebase_state()
```

## 更新后的实现步骤

### Phase 1: 核心存储结构
1. 设计commit对象格式
2. 设计存储目录结构
3. 实现commit存储和读取

### Phase 2: 版本管理功能
1. 实现commit创建
2. 实现commit查询
3. 实现parent链遍历

### Phase 3: 分支管理
1. 实现分支创建
2. 实现分支切换
3. 实现worktree管理

### Phase 4: Undo/Redo
1. 实现回退功能
2. 实现重做功能
3. 实现reflog

### Phase 5: 历史查看
1. 实现log命令
2. 实现show命令
3. 实现diff命令

### Phase 6: 分支合并
1. 实现冲突检测
2. 实现合并逻辑
3. 实现冲突解决

### Phase 7: 远程仓库
1. 实现remote配置
2. 实现push操作
3. 实现pull操作
4. 实现fetch操作

### Phase 8: 协作功能
1. 实现分支权限管理
2. 实现审查请求
3. 实现冲突协作解决

### Phase 9: 标签管理
1. 实现标签创建
2. 实现标签查询
3. 实现标签切换

### Phase 10: Stash功能
1. 实现状态暂存
2. 实现暂存列表
3. 实现暂存应用

### Phase 11: Rebase功能
1. 实现基础rebase
2. 实现交互式rebase
3. 实现rebase恢复

### Phase 12: 集成到角色实例
1. 扩展RoleInstance类
2. 集成所有版本管理功能
3. 自动记录执行历史
4. 添加远程仓库绑定提示流程

#### 远程仓库绑定提示流程

```python
class VersionedRoleInstance(RoleInstance):
    def __init__(self, role_instance_config: Dict[str, Any]):
        super().__init__(role_instance_config)
        # ... 初始化版本管理组件
        
        # 检查是否已绑定远程仓库
        if not self._has_remote_configured():
            self._prompt_remote_binding()
    
    def _has_remote_configured(self) -> bool:
        """检查是否已配置远程仓库"""
        remotes = self.remote_manager.list_remotes()
        return len(remotes) > 0
    
    def _prompt_remote_binding(self):
        """提示用户绑定远程仓库"""
        print("=" * 60)
        print("任务规划完成，准备开始执行")
        print("=" * 60)
        print("\n建议绑定GitHub远程仓库以备份执行历史：")
        print("  - 支持版本管理和Undo/Redo")
        print("  - 支持团队协作")
        print("  - 支持远程备份")
        print("\n是否现在绑定GitHub仓库？(y/n)")
        
        choice = input().strip().lower()
        if choice == 'y':
            self._guide_remote_binding()
        else:
            print("\n跳过远程仓库绑定")
            print("稍后可使用以下命令绑定：")
            print("  rams remote add origin <repo-url>")
    
    def _guide_remote_binding(self):
        """引导用户绑定远程仓库"""
        print("\n请输入GitHub仓库URL：")
        print("示例：https://github.com/username/rams-execution-history.git")
        repo_url = input().strip()
        
        if not repo_url:
            print("无效的仓库URL")
            return
        
        # 添加远程仓库
        self.remote_manager.add_remote('origin', repo_url)
        
        # 初始化远程仓库
        print("\n正在初始化远程仓库...")
        self.remote_manager.push('origin', 'main')
        
        print("✓ 远程仓库绑定成功")
        print(f"  仓库地址：{repo_url}")
```

#### CLI集成

```bash
# 任务规划完成后
rams task plan complete

# 自动提示
============================================
任务规划完成，准备开始执行
============================================

建议绑定GitHub远程仓库以备份执行历史：
  - 支持版本管理和Undo/Redo
  - 支持团队协作
  - 支持远程备份

是否现在绑定GitHub仓库？(y/n)

# 用户选择y后
请输入GitHub仓库URL：
示例：https://github.com/username/rams-execution-history.git
> https://github.com/myuser/my-project-rams.git

正在初始化远程仓库...
✓ 远程仓库绑定成功
  仓库地址：https://github.com/myuser/my-project-rams.git

# 继续执行任务
```

### Phase 13: 用户界面
1. 实现CLI命令（所有功能）
2. 实现API接口
3. 实现可视化界面

### Phase 14: 优化和清理
1. 实现增量存储
2. 实现压缩和归档
3. 实现清理策略

### Phase 15: 文档和测试
1. 编写使用文档
2. 编写API文档
3. 编写测试用例
