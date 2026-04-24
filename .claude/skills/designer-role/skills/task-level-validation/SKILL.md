# Task Level Validation

## 概述
任务级校验技能专注于验证单个任务执行结果的质量，包括输出Schema校验、单元测试和用户反馈验证。

## 核心概念

### 任务级校验
对单个任务执行结果进行验证，确保输出符合预期质量和格式要求。

### 校验层次
- **Schema校验**：验证输出格式是否符合定义的Schema
- **单元测试**：运行自动化测试验证功能正确性
- **用户反馈**：收集用户对任务结果的评价

## Schema校验

### JSON Schema验证
```yaml
output_schema:
  type: "object"
  properties:
    code:
      type: "string"
      minLength: 10
    explanation:
      type: "string"
      minLength: 20
  required: ["code", "explanation"]
```

### 校验流程
1. 解析输出Schema
2. 验证输出格式
3. 检查必填字段
4. 验证字段类型和约束

## 单元测试

### 测试类型
- **功能测试**：验证功能是否正确实现
- **边界测试**：验证边界情况处理
- **性能测试**：验证性能指标

### 测试执行
```python
def test_2d_movement():
    result = execute_task("实现2D角色移动")
    assert "Vector2" in result.code
    assert "Input.GetAxis" in result.code
    assert result.explanation is not None
```

## 用户反馈验证

### 反馈收集
- 评分（1-5星）
- 文字评论
- 具体问题标记

### 反馈分析
- 识别常见问题
- 计算满意度指标
- 生成改进建议

## 校验结果

### 成功标准
- Schema校验通过
- 单元测试通过
- 用户反馈评分 >= 4

### 失败处理
- 记录失败原因
- 通知编排器
- 触发后置学习

## 最佳实践

- Schema应该清晰明确
- 测试用例应该覆盖核心功能
- 用户反馈应该及时收集
- 失败原因应该详细记录

## 常见错误

- Schema定义不完整
- 测试用例覆盖不足
- 忽视用户反馈
- 失败原因记录不清
