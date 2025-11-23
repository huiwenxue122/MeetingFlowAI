# Watsonx Orchestrate 环境设置指南

本文档记录了设置 Watsonx Orchestrate 开发环境的完整步骤。

## 前置要求

- Python 3.13（或兼容版本）
- pip 包管理器
- IBM Watsonx Orchestrate 实例和 API Key

## 设置步骤

### 1. 创建 Python 虚拟环境

在项目根目录下创建虚拟环境：

```bash
python -m venv .venv
```

### 2. 激活虚拟环境

**macOS/Linux:**
```bash
source ./.venv/bin/activate
```

**Windows:**
```bash
.\.venv\Scripts\activate
```

激活成功后，终端提示符前会显示 `(.venv)`。

### 3. 安装 ibm-watsonx-orchestrate

在激活的虚拟环境中安装 Watsonx Orchestrate SDK：

```bash
pip install ibm-watsonx-orchestrate
```

**安装的包版本：**
- ibm-watsonx-orchestrate: 1.15.0
- 同时会安装所有依赖包（包括 langchain-core, pydantic, httpx 等）

### 4. 升级 pip（可选但推荐）

如果提示有新版本的 pip，建议升级：

```bash
pip install --upgrade pip
```

### 5. 验证安装

检查 Watsonx Orchestrate ADK 版本：

```bash
orchestrate --version
```

**预期输出示例：**
```
ADK Version: 1.15.0
Developer Edition Image Tags (if not overridden in env file)
  SERVER_TAG: 12-11-2025-aa3be96
  WORKER_TAG: 12-11-2025-aa3be96
  AI_GATEWAY_TAG: 21-10-2025-1a2c0ba
  ...
```

### 6. 配置 Watsonx Orchestrate 环境

添加并激活 Watsonx Orchestrate 环境：

```bash
orchestrate env add -n watson \
  -u https://api.au-syd.watson-orchestrate.cloud.ibm.com/instances/8f02fc7a-e130-42ea-bf5a-747f185f72e6 \
  --type ibm_iam \
  --activate
```

**参数说明：**
- `-n watson`: 环境名称
- `-u <URL>`: Watsonx Orchestrate 实例 URL
- `--type ibm_iam`: 认证类型（IBM IAM）
- `--activate`: 立即激活该环境

**注意：** 系统会提示输入 WXO API Key，请准备好你的 API Key。

### 7. 查看已配置的代理

列出所有可用的代理：

```bash
orchestrate agents list
```

**输出示例：**
会显示一个表格，包含以下信息：
- Agent 名称
- 描述
- LLM 模型
- 协作代理
- 工具
- 知识库
- Agent ID

**当前项目中的代理包括：**
- Hello_World_Agent
- Meeting Flow_Analyzer
- SalesFlow_AI_Orchestrator_0198uU
- Engagement_Automation_Specialist_0186gM
- CRM_Intelligence_Engine_6296DG
- SalesFlow_AI_Agent_7856uD
- AskOrchestrate

## 完整命令序列

以下是完整的设置命令序列（复制粘贴即可）：

```bash
# 1. 创建虚拟环境
python -m venv .venv

# 2. 激活虚拟环境（macOS/Linux）
source ./.venv/bin/activate

# 3. 安装 Watsonx Orchestrate
pip install ibm-watsonx-orchestrate

# 4. 升级 pip（可选）
pip install --upgrade pip

# 5. 验证安装
orchestrate --version

# 6. 配置环境（需要替换为你的实例 URL 和 API Key）
orchestrate env add -n watson \
  -u https://api.au-syd.watson-orchestrate.cloud.ibm.com/instances/YOUR_INSTANCE_ID \
  --type ibm_iam \
  --activate

# 7. 查看代理列表
orchestrate agents list
```

## 常见问题

### Q: 如何退出虚拟环境？

```bash
deactivate
```

### Q: 如何更新 ibm-watsonx-orchestrate？

```bash
pip install --upgrade ibm-watsonx-orchestrate
```

### Q: 如何查看已配置的环境？

```bash
orchestrate env list
```

### Q: 如何切换环境？

```bash
orchestrate env activate <环境名称>
```

### Q: 如何删除环境？

```bash
orchestrate env remove <环境名称>
```

## 依赖包列表

安装 `ibm-watsonx-orchestrate` 时会自动安装以下主要依赖：

- **核心依赖：**
  - ibm-cloud-sdk-core (3.24.2)
  - ibm-watsonx-orchestrate-evaluation-framework (1.1.7)
  - langchain-core (0.3.63)
  - langsmith (0.3.45)
  - pydantic (2.12.4)
  - httpx (0.28.1)
  - requests (2.32.5)

- **工具和框架：**
  - typer (0.20.0)
  - rich (13.9.4)
  - python-dotenv (1.2.1)
  - pyyaml (6.0.3)
  - redis (7.1.0)

- **其他依赖：**
  - certifi, charset-normalizer, click, docstring-parser
  - pyjwt, pytz, urllib3
  - 以及更多...

## 下一步

环境设置完成后，你可以：

1. 开始使用 Watsonx Orchestrate 开发代理和工作流
2. 查看项目中的其他文档（如 `WATSONX_SETUP_GUIDE.md`）
3. 运行测试脚本验证连接

## 注意事项

- ⚠️ **API Key 安全：** 不要将 API Key 提交到版本控制系统
- ⚠️ **虚拟环境：** 建议始终在虚拟环境中工作，避免污染系统 Python 环境
- ⚠️ **实例 URL：** 确保使用正确的 Watsonx Orchestrate 实例 URL
- ⚠️ **网络连接：** 某些操作需要网络连接才能访问 IBM Cloud 服务

---

**最后更新：** 2025年1月

