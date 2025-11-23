# SalesFlow AI - Multi-Agent Sales Automation System

> **Transform 15 minutes of post-call admin work into 2 minutes** with AI-powered automation

SalesFlow AI is a comprehensive sales automation platform built for the IBM watsonx Orchestrate Hackathon. It uses a multi-agent AI system to automatically process sales meeting transcripts, extract key information, update CRM systems, and generate follow-up communications.

## 🎯 Project Overview

SalesFlow AI leverages IBM watsonx Orchestrate's multi-agent architecture to automate the entire post-meeting workflow:

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
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │   Home   │  │  Results │  │  Agents  │              │
│  │   Page   │  │   Page   │  │ Selector │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│       │              │              │                    │
│       └──────────────┼──────────────┘                    │
│                      │                                    │
│              Watson Chat Widget                          │
│         (watsonx Orchestrate)                            │
└──────────────────────┼────────────────────────────────────┘
                       │
┌──────────────────────┼────────────────────────────────────┐
│              Backend API (FastAPI/Express)                │
│                      │                                    │
│       ┌──────────────┼──────────────┐                    │
│       │              │              │                    │
│  ┌────▼────┐   ┌────▼────┐   ┌────▼────┐               │
│  │ Watsonx │   │   CRM   │   │  Email  │               │
│  │   AI    │   │ Service │   │ Service │               │
│  └─────────┘   └─────────┘   └─────────┘               │
└──────────────────────────────────────────────────────────┘
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
├── backend-python/          # Python FastAPI backend
│   ├── main.py              # FastAPI application
│   ├── services/
│   │   ├── watsonx_service.py    # Watsonx AI integration
│   │   └── crm_service.py        # Salesforce CRM integration
│   └── requirements.txt
│
├── backend-nodejs/          # Node.js Express backend (alternative)
│   ├── server.js           # Express application
│   ├── services/
│   │   ├── watsonxService.js
│   │   └── crmService.js
│   └── package.json
│
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ and npm
- **Python** 3.9+ (for Python backend)
- **IBM watsonx Orchestrate** account and API key
- **IBM watsonx AI** credentials (optional, for data extraction)

### 1. Clone the Repository

```bash
git clone https://github.com/huiwenxue122/MeetingFlowAI.git
cd MeetingFlowAI
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### 3. Backend Setup (Choose Python or Node.js)

#### Option A: Python Backend (Recommended)

```bash
cd backend-python

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Run server
python main.py
```

Backend will run on `http://localhost:3000`

#### Option B: Node.js Backend

```bash
cd backend-nodejs
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Run server
npm start
```

### 4. Environment Variables

Create a `.env` file in the backend directory:

```env
# Watsonx AI (for data extraction)
WATSONX_AI_APIKEY=your_api_key
WATSONX_AI_URL=https://us-south.ml.cloud.ibm.com
WATSONX_AI_PROJECT_ID=your_project_id

# Salesforce (optional - uses mock if not provided)
SALESFORCE_USERNAME=your_username
SALESFORCE_PASSWORD=your_password
SALESFORCE_SECURITY_TOKEN=your_token

# Server
PORT=3000
CORS_ORIGIN=http://localhost:5173
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

## 🔌 API Endpoints

### Backend API (Python/Node.js)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/meeting/process` | Process meeting transcript |
| GET | `/api/meetings` | Get all processed meetings |
| GET | `/api/meeting/{id}` | Get specific meeting details |
| GET | `/api/stats` | Get dashboard statistics |

### Example Request

```bash
POST /api/meeting/process
Content-Type: application/json

{
  "meeting_text": "Meeting with Sarah Johnson, VP Operations at TechCorp Inc. Discussed their manual data entry challenges, $50,000 budget, Q1 2026 timeline..."
}
```

### Example Response

```json
{
  "success": true,
  "meeting_id": "uuid",
  "extracted_data": {
    "customer_name": "Sarah Johnson",
    "company": "TechCorp Inc",
    "role": "VP Operations",
    "pain_points": ["Manual data entry", "High costs"],
    "budget": "$50,000",
    "timeline": "Q1 2026",
    "decision_makers": ["Sarah Johnson"],
    "next_steps": ["Send proposal", "Schedule demo"]
  },
  "crm_updated": true,
  "crm_record_id": "003...",
  "action_plan": [...],
  "time_saved": 13,
  "message": "Meeting processed successfully!"
}
```

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

### Backend (Python)
- **FastAPI** - Web framework
- **IBM watsonx AI** - AI data extraction (Granite-13b-chat-v2)
- **Simple Salesforce** - CRM integration
- **Uvicorn** - ASGI server

### Backend (Node.js - Alternative)
- **Express** - Web framework
- **@ibm-cloud/watsonx-ai** - AI integration
- **jsforce** - Salesforce integration

## 📊 Workflow

1. **User Input** - Sales rep pastes meeting transcript on Home page
2. **AI Processing** - SalesFlow Orchestrator coordinates:
   - Agent 1: Extracts customer info, pain points, budget, timeline
   - Agent 2: Updates Salesforce CRM with extracted data
   - Agent 3: Generates personalized follow-up email
3. **Results Display** - All extracted data shown in organized tabs
4. **Time Saved** - System calculates and displays time saved (typically 13 minutes)

## 🔐 Security Notes

- API keys should be stored in `.env` files (not committed to git)
- CORS is configured for development (update for production)
- Salesforce credentials are optional (system uses mock CRM if not provided)

## 🧪 Testing

### Test Watsonx AI Integration

**Python:**
```bash
cd backend-python
python test_watsonx.py
```

**Node.js:**
```bash
cd backend-nodejs
npm test
```

### Test Frontend

```bash
cd frontend
npm run dev
# Open http://localhost:5173
```

## 📝 Development Notes

### Current Status

- ✅ Frontend fully implemented with all pages
- ✅ Backend API endpoints working
- ✅ Watsonx AI integration for data extraction
- ✅ Watsonx Orchestrate Chat Widget integrated
- ✅ CRM integration (Salesforce + mock fallback)
- ⚠️ Frontend calls `/api/orchestrate` but backend has `/api/meeting/process`
  - **Note**: Frontend will fallback to mock data if API call fails

### Known Limitations

1. **API Endpoint Mismatch**: Frontend expects `/api/orchestrate` but backend provides `/api/meeting/process`
   - **Workaround**: Frontend gracefully falls back to mock data
   - **Future**: Implement `/api/orchestrate` endpoint that uses watsonx Orchestrate API

2. **Data Persistence**: Currently uses in-memory storage
   - **Future**: Add database (PostgreSQL/SQLite)

3. **Watsonx Orchestrate Backend Integration**: Chat widget works, but backend orchestration API not yet implemented
   - **Future**: Add backend endpoint that calls watsonx Orchestrate API for multi-agent coordination

## 🚀 Deployment

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render/Heroku)

```bash
# Python
cd backend-python
# Set environment variables
# Deploy with uvicorn

# Node.js
cd backend-nodejs
# Set environment variables
# Deploy with npm start
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

- **Claire** - AI Engineer and Frontend Developer 
- **Abdullah** - Backend Developer 
- **goodgame#069** - Backend Developer 

## 🙏 Acknowledgments

- IBM watsonx Orchestrate team
- IBM watsonx AI for Granite models
- FastAPI and React communities

---

**Built with ❤️ for the IBM watsonx Orchestrate Hackathon**
