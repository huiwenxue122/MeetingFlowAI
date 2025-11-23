# 🚀 MeetingFlowAI - AI-Powered Post-Call Automation

**Powered by IBM Watsonx.ai**

Reduce post-meeting admin work from 15 minutes to 2 minutes using AI-powered automation.

---

## 🎯 Project Overview

**Team:** Claire (AI Engineer), Abdullah (Backend), goodgame#069 (Frontend)  
**Timeline:** Nov 21-23, 2025 (48 hours)  
**Hackathon:** IBM watsonx Orchestrate

### The Problem
Sales reps spend 15-20 minutes after every call on manual admin work:
- CRM data entry
- Note-taking and organization  
- Follow-up task planning
- Email composition

### Our Solution
AI-powered automation that:
- ✅ Extracts structured data from meeting transcripts using IBM Granite models
- ✅ Automatically updates CRM (Salesforce)
- ✅ Generates action plans and follow-up tasks
- ✅ Saves 13+ minutes per meeting

---

## 🚀 Quick Start

### Prerequisites
- IBM Cloud account with Watsonx.ai access
- Node.js 14+ OR Python 3.9+
- Git

### Setup Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd MeetingFlowAI
```

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your IBM Watsonx credentials
```

3. **Choose your backend**

**Option A: Node.js**
```bash
cd backend-nodejs
npm install
npm test  # Test Watsonx integration
npm run dev  # Start server
```

**Option B: Python**
```bash
cd backend-python
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python test_watsonx.py  # Test Watsonx integration
python main.py  # Start server
```

4. **Set up frontend** (goodgame#069 - to be implemented)
```bash
cd frontend
npm install
npm run dev
```

5. **Test the flow**
- Backend API: http://localhost:3000/api/health
- Test extraction with sample transcript (see test scripts)

---

## 📚 Documentation

- **[Watsonx Setup Guide](./WATSONX_SETUP_GUIDE.md)** - Complete IBM Watsonx integration guide with examples
- **[Backend Node.js README](./backend-nodejs/README.md)** - Node.js backend documentation
- **[Backend Python README](./backend-python/README.md)** - Python backend documentation
- **[Project Requirements](./PROJECT_REQUIREMENTS.md)** - Original project specifications

---

## 🏗️ Project Structure

```
MeetingFlowAI/
├── README.md                       # This file
├── WATSONX_SETUP_GUIDE.md         # IBM Watsonx integration guide
├── PROJECT_REQUIREMENTS.md         # Original requirements
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
│
├── backend-nodejs/                 # Node.js backend (Option A)
│   ├── server.js                  # Main Express server
│   ├── services/
│   │   ├── watsonxService.js      # Watsonx AI integration
│   │   └── crmService.js          # Salesforce integration
│   ├── test-watsonx.js            # Test script
│   ├── package.json
│   └── README.md
│
├── backend-python/                 # Python backend (Option B)
│   ├── main.py                    # Main FastAPI server
│   ├── services/
│   │   ├── watsonx_service.py     # Watsonx AI integration
│   │   └── crm_service.py         # Salesforce integration
│   ├── test_watsonx.py            # Test script
│   ├── requirements.txt
│   └── README.md
│
└── frontend/                       # React frontend (to be created)
    ├── src/
    ├── package.json
    └── ...
```

---

## 🔑 Key Features

### ✅ Implemented (MVP)
- [x] Meeting transcript input
- [x] AI-powered data extraction using IBM Granite models
- [x] Structured data output (customer, company, pain points, budget, timeline)
- [x] CRM integration (Salesforce + mock mode)
- [x] Action plan generation
- [x] Time saved calculation
- [x] RESTful API endpoints
- [x] Health checks and error handling
- [x] Both Node.js and Python implementations

### 🎯 To Be Completed
- [ ] React frontend UI
- [ ] Meeting history dashboard
- [ ] Real-time processing feedback
- [ ] Production deployment
- [ ] Demo video

---

## 🛠️ Tech Stack

### AI/ML
- **IBM Watsonx.ai** - Foundation model platform
- **IBM Granite 13B Chat v2** - NLP extraction model

### Backend (Choose One)
- **Node.js**: Express + Watsonx Node.js SDK + jsforce
- **Python**: FastAPI + Watsonx Python SDK + simple-salesforce

### Frontend (To Be Built)
- **React 18+**
- **Tailwind CSS**
- **React Router**

### Integrations
- **Salesforce API** - CRM updates (with mock mode fallback)

---

## 📊 API Endpoints

### `POST /api/meeting/process`
Process meeting transcript and extract data.

**Request:**
```json
{
  "meeting_text": "Meeting with John Smith from Acme Corp..."
}
```

**Response:**
```json
{
  "success": true,
  "meeting_id": "uuid",
  "extracted_data": {
    "customer_name": "John Smith",
    "company": "Acme Corp",
    "role": "VP of Sales",
    "pain_points": ["Manual data entry", "Slow reporting"],
    "budget": "$50,000",
    "timeline": "Q1 2026",
    "decision_makers": ["John Smith", "Sarah Johnson"],
    "next_steps": ["Send proposal", "Schedule demo"]
  },
  "crm_updated": true,
  "crm_record_id": "003abc...",
  "action_plan": [...],
  "time_saved": 15
}
```

### `GET /api/meetings`
Get all processed meetings.

### `GET /api/meeting/:id`
Get specific meeting details.

### `GET /api/stats`
Get dashboard statistics (total meetings, time saved, etc.).

### `GET /api/health`
Health check endpoint.

---

## 🧪 Testing

### Test Watsonx Integration

**Node.js:**
```bash
cd backend-nodejs
npm test
```

**Python:**
```bash
cd backend-python
python test_watsonx.py
```

### Test API with cURL
```bash
# Health check
curl http://localhost:3000/api/health

# Process meeting
curl -X POST http://localhost:3000/api/meeting/process \
  -H "Content-Type: application/json" \
  -d '{"meeting_text": "Meeting with Sarah Johnson from Acme Corp on Nov 21. Sarah is VP of Sales and mentioned they struggle with manual CRM updates taking 20 minutes per call. Budget: $75,000. Timeline: Q1 2026. Next steps: Send proposal Friday, schedule demo Tuesday."}'

# Get all meetings
curl http://localhost:3000/api/meetings

# Get stats
curl http://localhost:3000/api/stats
```

---

## 🔐 Environment Variables

Create a `.env` file with:

```bash
# IBM Watsonx.ai (REQUIRED)
WATSONX_AI_APIKEY=your_api_key_here
WATSONX_AI_PROJECT_ID=your_project_id_here
WATSONX_AI_URL=https://us-south.ml.cloud.ibm.com
WATSONX_AI_VERSION=2024-05-31

# Salesforce (OPTIONAL - uses mock if not provided)
SALESFORCE_USERNAME=your_username
SALESFORCE_PASSWORD=your_password
SALESFORCE_SECURITY_TOKEN=your_token

# Application
PORT=3000
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

**⚠️ NEVER commit `.env` to Git!**

See `.env.example` for template.

---

## 🎥 Demo Flow

1. User lands on homepage
2. User pastes meeting transcript (100-10,000 words)
3. Clicks "Process Meeting"
4. Loading state shows AI processing
5. Results displayed:
   - Extracted customer information
   - Pain points identified
   - Budget and timeline
   - Decision makers
   - CRM update confirmation
   - Generated action plan
   - **Time saved: 13 minutes!**
6. Dashboard shows meeting history and stats

---

## 🏆 Hackathon Submission Checklist

### Backend
- [x] IBM Watsonx.ai integration working
- [x] Node.js implementation complete
- [x] Python implementation complete
- [x] CRM integration (Salesforce + mock)
- [x] All API endpoints implemented
- [x] Error handling and validation
- [x] Test scripts working

### Documentation
- [x] Main README
- [x] Watsonx setup guide
- [x] Backend READMEs
- [x] Code comments
- [x] API documentation

### To Complete
- [ ] Frontend UI completed
- [ ] End-to-end testing
- [ ] Demo video recorded
- [ ] Deployed to production
- [ ] Final submission

---

## 👥 Team Responsibilities

### Claire (AI Engineer)
- [x] Watsonx integration research
- [x] Documentation and setup guides
- [ ] Prompt engineering optimization
- [ ] Overall project coordination

### Abdullah (Backend)
- [x] API architecture design
- [x] Node.js backend implementation
- [x] Python backend implementation
- [x] CRM integration
- [ ] Production deployment

### goodgame#069 (Frontend)
- [ ] React components
- [ ] UI/UX design
- [ ] Dashboard implementation
- [ ] Styling with Tailwind CSS

---

## 📖 Resources

### IBM Watsonx
- [Watsonx.ai Python SDK](https://ibm.github.io/watsonx-ai-python-sdk/)
- [Watsonx.ai Node.js SDK](https://ibm.github.io/watsonx-ai-node-sdk/)
- [Watsonx Orchestrate Docs](https://www.ibm.com/docs/en/watsonx/watson-orchestrate)
- [Watsonx Developer Hub](https://www.ibm.com/watsonx/developer/)
- [LangChain + Watsonx Tutorial](https://developer.ibm.com/tutorials/awb-create-langchain-ai-agent-python-watsonx)

### Frameworks & Libraries
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Salesforce API Docs](https://developer.salesforce.com/)

---

## 🐛 Troubleshooting

### "Unauthorized (401)" Error
- Verify `WATSONX_AI_APIKEY` in `.env`
- Check IBM Cloud account is active
- Ensure you have watsonx.ai service access

### "Project not found" Error
- Confirm `WATSONX_AI_PROJECT_ID` is correct
- Get Project ID from IBM Cloud Console > watsonx.ai > View all projects

### "Model not available" Error
- Default model: `ibm/granite-13b-chat-v2`
- Check available models in your watsonx.ai project
- Try alternative: `ibm/granite-3-8b-instruct`

### SSL Certificate Issues
Add to `.env`:
```bash
WATSONX_AI_DISABLE_SSL=true
WATSONX_AI_AUTH_DISABLE_SSL=true
```

### Dependencies Not Installing
**Node.js:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Python:**
```bash
deactivate  # If in virtual env
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## 📝 License

MIT License - see LICENSE file for details

---

## 🙏 Acknowledgments

- **IBM Watsonx** for providing the AI foundation and Granite models
- **lablab.ai** for hosting the hackathon
- Our amazing team for building this in 48 hours!

---

## 📧 Contact

For questions or issues:
- Open an issue on GitHub
- Contact team members via Discord/Slack

---

**Built with ❤️ for the IBM Watsonx Hackathon**

*Transforming sales productivity, one meeting at a time* 🚀
