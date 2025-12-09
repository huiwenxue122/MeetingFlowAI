# MeetingFlowAI - Multi-Agent Sales Automation System

> **Transform 15 minutes of post-call admin work into 2 minutes** with AI-powered automation

MeetingFlowAI is a comprehensive sales automation platform built for the IBM watsonx Orchestrate Hackathon. It uses a multi-agent AI system to automatically process sales meeting transcripts, extract key information, update CRM systems, and generate follow-up communications.**📺 [Click here to watch the full demo on YouTube](https://youtu.be/Oo2z6eTNao8)**  

## 🎯 Project Overview

MeetingFlowAI leverages IBM watsonx Orchestrate's multi-agent architecture to automate the entire post-meeting workflow:

1. **SalesFlow AI Orchestrator** (Master Agent) - Coordinates all sub-agents
2. **Sales Intelligence Agent** - Analyzes meeting transcripts and extracts key information
3. **CRM Intelligence Engine** - Updates Salesforce CRM with extracted data
4. **Engagement Automation Specialist** - Generates personalized follow-up emails and action plans

### Key Features

- ✅ **Multi-Agent AI Workflow** - Orchestrated by watsonx Orchestrate
- ✅ **Intelligent Data Extraction** - Uses IBM Granite models to extract structured data
- ✅ **CRM Integration** - Automatic Salesforce updates (with mock fallback)
- ✅ **Email Generation** - AI-powered follow-up email creation
- ✅ **Interactive Chat** - Direct interaction with AI agents via Watson Chat Widget
- ✅ **Beautiful UI** - Modern React frontend with Tailwind CSS
- ✅ **Real-time Processing** - Fast AI processing (< 30 seconds)

## 🏗️ Architecture
```
┌─────────────────────────────────────────────┐
│           Frontend (React)                  │
│  - User Interface                           │
│  - Watson Chat Widget                       │
│  - Event Listeners                          │
└──────────────┬──────────────────────────────┘
               │
               │ HTTPS/WebSocket
               │
┌──────────────▼──────────────────────────────┐
│   IBM Watson Orchestrate Platform           │
│  ┌──────────────────────────────────────┐   │
│  │  SalesFlow AI Orchestrator Agent     │   │
│  │  - Receives user input               │   │
│  │  - Routes to sub-agents              │   │
│  │  - Aggregates responses              │   │
│  └──────────────────────────────────────┘   │
│            ↓         ↓         ↓             │
│  ┌─────────┐  ┌──────────┐  ┌──────────┐   │
│  │Agent 1  │  │Agent 2   │  │Agent 3   │   │
│  │Sales    │  │CRM       │  │Engagement│   │
│  │Intel    │  │Engine    │  │Auto      │   │
│  └─────────┘  └──────────┘  └──────────┘   │
│       ↓            ↓              ↓          │
└───────┼────────────┼──────────────┼──────────┘
        │            │              │
        ↓            ↓              ↓
┌────────────┐ ┌────────────┐ ┌────────────┐
│IBM Granite │ │Salesforce  │ │Email/      │
│13B Model   │ │CRM API     │ │Calendar API│
└────────────┘ └────────────┘ └────────────┘
```

## 📁 Project Structure
```
MeetingFlowAI/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Main meeting input page
│   │   │   ├── Results.jsx       # Results dashboard
│   │   │   └── AgentSelector.jsx # Agent selection page
│   │   ├── components/
│   │   │   └── WatsonChat.jsx     # Watson Chat Widget integration
│   │   ├── config/
│   │   │   └── watson.js          # Watson configuration
│   │   └── App.jsx               # Main app with routing
│   └── package.json
│
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- ✅ Node.js 18+
- ✅ IBM Cloud account with watsonx Orchestrate access
- ✅ Watson Orchestrate agents deployed
- ✅ Salesforce developer account (optional, uses mock mode if not configured)

### Frontend Setup

```bash
# Clone repository
git clone https://github.com/huiwenxue122/MeetingFlowAI.git
cd MeetingFlowAI/frontend

# Install dependencies
npm install

# Configure Watson (already done in watson.js)
# Update agent IDs and environment IDs if needed

# Start development server
npm run dev

# Frontend runs at: http://localhost:5173
```

## 🎨 Frontend Features

### Home Page (`/`)
- **Meeting Input Form** - Paste sales meeting transcripts
- **Multi-Agent Architecture Visualization** - See how agents work together
- **Real-time Character Count** - Minimum 100 characters required
- **Watson Chat Widget** - Interactive chat with SalesFlow Orchestrator
- **Statistics Display** - Time saved, processing speed, accuracy

### Results Page (`/results`)
- **Multi-Agent Processing Status** - Visual workflow of all 3 agents
- **Tabbed Interface**:
  - **Overview** - Customer and deal information
  - **Meeting Analysis** - Extracted pain points and decision makers
  - **CRM Update** - Salesforce update status and actions
  - **Follow-up Email** - Generated email with copy functionality
- **Time Saved Metric** - Shows minutes saved per meeting

### Agent Selector Page (`/agents`)
- **Interactive Agent Dashboard** - Select and chat with different AI agents
- **4 Available Agents**:
  - SalesFlow AI Orchestrator (Master)
  - Sales Intelligence Agent
  - CRM Intelligence Engine
  - Engagement Automation Specialist


## 🤖 AI Agents Configuration

The system uses IBM watsonx Orchestrate with the following agents:

```javascript
// frontend/src/config/watson.js
export const WATSON_AGENTS = {
  SALESFLOW_ORCHESTRATOR: {
    agentId: "bb753301-6502-4670-85a7-cb368b1e9dcb",
    agentEnvironmentId: "6ad60b90-69b9-4cf5-8285-59e5b3874eea",
    name: "SalesFlow AI Orchestrator",
    description: "Master orchestrator that controls all other 3 agents"
  },
  SALES_INTELLIGENCE_AGENT: {
    agentId: "8176364b-a514-45b8-a303-8f2cc56e4443",
    agentEnvironmentId: "17c4ff54-a306-467d-8181-64612aaf097b",
    name: "Sales Intelligence Agent",
    description: "Analyzes sales meeting notes and extracts key information"
  },
  CRM_INTELLIGENCE_ENGINE: {
    agentId: "deaecff4-c279-49bd-b1f8-f933b746cdac",
    agentEnvironmentId: "20be2637-dce3-4f54-b5f4-a997c680da5a",
    name: "CRM Intelligence Engine",
    description: "Updates CRM and manages customer data"
  },
  ENGAGEMENT_AUTOMATION_SPECIALIST: {
    agentId: "513420e1-b3fc-492a-8db1-74bb39be218a",
    agentEnvironmentId: "433a5adb-4589-4ec4-bdab-e511692755ee",
    name: "Engagement Automation Specialist",
    description: "Generates follow-up emails and action plans"
  }
};
```

## 🛠️ Technology Stack

### Frontend
- **React** 19.2.0 - UI framework
- **Vite** 7.2.4 - Build tool
- **React Router** 7.9.6 - Routing
- **Tailwind CSS** 3.4.18 - Styling
- **watsonx Orchestrate** - Multi-agent chat widget


## 📊 Workflow

1. **User Input** - Sales rep pastes meeting transcript on Home page
2. **AI Processing** - SalesFlow Orchestrator coordinates:
   - Agent 1: Extracts customer info, pain points, budget, timeline
   - Agent 2: Updates Salesforce CRM with extracted data
   - Agent 3: Generates personalized follow-up email
3. **Results Display** - All extracted data shown in organized tabs
4. **Time Saved** - System calculates and displays time saved (typically 13 minutes)

## 🔐 Security Notes

- All communication is handled by the Watson Orchestrate widget, which provides a secure connection.
- No backend is needed, reducing the attack surface.
- Salesforce integration is handled within Watson Orchestrate, ensuring enterprise-grade security.

## 📝 Development Notes
The project is a frontend-only application that communicates directly with the IBM watsonx Orchestrate platform via the embedded chat widget. This simplifies the architecture and deployment, as no backend is required. All state management is handled client-side in React.

## 🚀 Deployment
The frontend can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

## 📚 Documentation

- [Watsonx Setup Guide](./WATSONX_SETUP_GUIDE.md)
- [Frontend Setup Guide](./FRONTEND_SETUP_README.md)
- [Project Requirements](./PROJECT_REQUIREMENTS.md)
- [Project Structure](./PROJECT_STRUCTURE.md)

## 🤝 Contributing

This project was built for the IBM watsonx Orchestrate Hackathon. Contributions are welcome!

## 📄 License

MIT License

## 👥 Team

- **Claire** - AI Engineer and  Product Manager - [huiwenxue122](https://github.com/huiwenxue122)
- **Abdullah** - Full-stack Developer - [MajorAbdullah](https://github.com/MajorAbdullah)
- **808vita** - Full-stack Developer - [808vita](https://github.com/808vita)

## 🙏 Acknowledgments

- IBM watsonx Orchestrate team
- IBM watsonx AI for Granite models

---

**Built with ❤️ for the IBM watsonx Orchestrate Hackathon**
