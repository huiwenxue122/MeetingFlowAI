# Watsonx Orchestrate Environment Setup Guide

This document records the complete steps for setting up the Watsonx Orchestrate development environment.

## Prerequisites

- Python 3.13 (or compatible version)
- pip package manager
- IBM Watsonx Orchestrate instance and API Key

## Setup Steps

### 1. Create Python Virtual Environment

Create a virtual environment in the project root directory:

```bash
python -m venv .venv
```

### 2. Activate Virtual Environment

**macOS/Linux:**
```bash
source ./.venv/bin/activate
```

**Windows:**
```bash
.\.venv\Scripts\activate
```

After activation, you should see `(.venv)` at the beginning of your terminal prompt.

### 3. Install ibm-watsonx-orchestrate

Install the Watsonx Orchestrate SDK in the activated virtual environment:

```bash
pip install ibm-watsonx-orchestrate
```

**Installed Package Version:**
- ibm-watsonx-orchestrate: 1.15.0
- All dependencies will be installed automatically (including langchain-core, pydantic, httpx, etc.)

### 4. Upgrade pip (Optional but Recommended)

If prompted about a new pip version, it's recommended to upgrade:

```bash
pip install --upgrade pip
```

### 5. Verify Installation

Check the Watsonx Orchestrate ADK version:

```bash
orchestrate --version
```

**Expected Output Example:**
```
ADK Version: 1.15.0
Developer Edition Image Tags (if not overridden in env file)
  SERVER_TAG: 12-11-2025-aa3be96
  WORKER_TAG: 12-11-2025-aa3be96
  AI_GATEWAY_TAG: 21-10-2025-1a2c0ba
  ...
```

### 6. Configure Watsonx Orchestrate Environment

Add and activate the Watsonx Orchestrate environment:

```bash
orchestrate env add -n watson \
  -u https://api.au-syd.watson-orchestrate.cloud.ibm.com/instances/8f02fc7a-e130-42ea-bf5a-747f185f72e6 \
  --type ibm_iam \
  --activate
```

**Parameter Description:**
- `-n watson`: Environment name
- `-u <URL>`: Watsonx Orchestrate instance URL
- `--type ibm_iam`: Authentication type (IBM IAM)
- `--activate`: Activate this environment immediately

**Note:** The system will prompt you to enter your WXO API Key. Please have your API Key ready.

### 7. View Configured Agents

List all available agents:

```bash
orchestrate agents list
```

**Output Example:**
A table will be displayed containing the following information:
- Agent name
- Description
- LLM model
- Collaborative agents
- Tools
- Knowledge base
- Agent ID

**Agents in the current project include:**
- Hello_World_Agent
- Meeting Flow_Analyzer
- SalesFlow_AI_Orchestrator_0198uU
- Engagement_Automation_Specialist_0186gM
- CRM_Intelligence_Engine_6296DG
- SalesFlow_AI_Agent_7856uD
- AskOrchestrate

## Complete Command Sequence

Below is the complete setup command sequence (copy and paste ready):

```bash
# 1. Create virtual environment
python -m venv .venv

# 2. Activate virtual environment (macOS/Linux)
source ./.venv/bin/activate

# 3. Install Watsonx Orchestrate
pip install ibm-watsonx-orchestrate

# 4. Upgrade pip (optional)
pip install --upgrade pip

# 5. Verify installation
orchestrate --version

# 6. Configure environment (replace with your instance URL and API Key)
orchestrate env add -n watson \
  -u https://api.au-syd.watson-orchestrate.cloud.ibm.com/instances/YOUR_INSTANCE_ID \
  --type ibm_iam \
  --activate

# 7. View agent list
orchestrate agents list
```

## Frequently Asked Questions

### Q: How to deactivate the virtual environment?

```bash
deactivate
```

### Q: How to update ibm-watsonx-orchestrate?

```bash
pip install --upgrade ibm-watsonx-orchestrate
```

### Q: How to view configured environments?

```bash
orchestrate env list
```

### Q: How to switch environments?

```bash
orchestrate env activate <environment-name>
```

### Q: How to remove an environment?

```bash
orchestrate env remove <environment-name>
```

## Dependency Package List

Installing `ibm-watsonx-orchestrate` will automatically install the following main dependencies:

- **Core Dependencies:**
  - ibm-cloud-sdk-core (3.24.2)
  - ibm-watsonx-orchestrate-evaluation-framework (1.1.7)
  - langchain-core (0.3.63)
  - langsmith (0.3.45)
  - pydantic (2.12.4)
  - httpx (0.28.1)
  - requests (2.32.5)

- **Tools and Frameworks:**
  - typer (0.20.0)
  - rich (13.9.4)
  - python-dotenv (1.2.1)
  - pyyaml (6.0.3)
  - redis (7.1.0)

- **Other Dependencies:**
  - certifi, charset-normalizer, click, docstring-parser
  - pyjwt, pytz, urllib3
  - and more...

## Next Steps

After completing the environment setup, you can:

1. Start developing agents and workflows with Watsonx Orchestrate
2. Review other documentation in the project (such as `WATSONX_SETUP_GUIDE.md`)
3. Run test scripts to verify the connection

## Important Notes

- ⚠️ **API Key Security:** Never commit API Keys to version control systems
- ⚠️ **Virtual Environment:** Always work within a virtual environment to avoid polluting the system Python environment
- ⚠️ **Instance URL:** Ensure you use the correct Watsonx Orchestrate instance URL
- ⚠️ **Network Connection:** Some operations require network connectivity to access IBM Cloud services

---

**Last Updated:** January 2025

