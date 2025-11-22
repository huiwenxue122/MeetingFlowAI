# MeetingFlowAI Backend (Python/FastAPI)

Backend API for MeetingFlowAI - IBM Watsonx Hackathon Project

## Quick Start

### 1. Create Virtual Environment
```bash
cd backend-python
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment
```bash
# Copy the example file
cp ../.env.example .env

# Edit .env and add your credentials:
# - WATSONX_AI_APIKEY
# - WATSONX_AI_PROJECT_ID
# - WATSONX_AI_URL
```

### 4. Test Watsonx Integration
```bash
python test_watsonx.py
```

This will run a test extraction on a sample meeting transcript.

### 5. Start the Server
```bash
# Development mode
uvicorn main:app --reload --port 3000

# Production mode
python main.py
```

Server will run on `http://localhost:3000`

## API Documentation

Once the server is running, visit:
- **Swagger UI:** http://localhost:3000/docs
- **ReDoc:** http://localhost:3000/redoc

## API Endpoints

### Health Check
```bash
GET /api/health
```

### Process Meeting
```bash
POST /api/meeting/process
Content-Type: application/json

{
  "meeting_text": "Your meeting transcript here..."
}
```

**Response:**
```json
{
  "success": true,
  "meeting_id": "uuid",
  "extracted_data": {
    "customer_name": "Sarah Johnson",
    "company": "Acme Corp",
    "role": "VP of Sales",
    "pain_points": ["Manual data entry", "Missed follow-ups"],
    "budget": "$75,000",
    "timeline": "Q1 2026",
    "decision_makers": ["Sarah Johnson", "Michael Chen"],
    "next_steps": ["Send proposal", "Schedule demo"]
  },
  "crm_updated": true,
  "crm_record_id": "003abc...",
  "time_saved": 15
}
```

### Get All Meetings
```bash
GET /api/meetings
```

### Get Meeting Details
```bash
GET /api/meeting/:id
```

### Get Stats
```bash
GET /api/stats
```

## Testing with cURL

```bash
# Health check
curl http://localhost:3000/api/health

# Process a meeting
curl -X POST http://localhost:3000/api/meeting/process \
  -H "Content-Type: application/json" \
  -d '{
    "meeting_text": "Meeting with John Smith from ABC Corp. John mentioned they need help with automation..."
  }'

# Get all meetings
curl http://localhost:3000/api/meetings

# Get stats
curl http://localhost:3000/api/stats
```

## Project Structure

```
backend-python/
├── main.py                      # Main FastAPI application
├── services/
│   ├── watsonx_service.py      # Watsonx AI integration
│   └── crm_service.py          # Salesforce/CRM integration
├── test_watsonx.py             # Test script
├── requirements.txt            # Python dependencies
└── .env                        # Your credentials (not committed)
```

## Environment Variables

Required:
- `WATSONX_AI_APIKEY` - Your IBM Watsonx API key
- `WATSONX_AI_PROJECT_ID` - Your watsonx.ai project ID
- `WATSONX_AI_URL` - Watsonx service URL

Optional:
- `SALESFORCE_USERNAME` - Salesforce username (if using real CRM)
- `SALESFORCE_PASSWORD` - Salesforce password
- `SALESFORCE_SECURITY_TOKEN` - Salesforce security token
- `PORT` - Server port (default: 3000)
- `CORS_ORIGIN` - Frontend URL for CORS

## Troubleshooting

### "Module not found" errors
Make sure virtual environment is activated:
```bash
source venv/bin/activate  # macOS/Linux
```

### "Unauthorized" error
- Check that `WATSONX_AI_APIKEY` is correct in `.env`
- Verify your IBM Cloud account is active

### "Project not found" error
- Verify `WATSONX_AI_PROJECT_ID` matches your watsonx.ai project
- Get Project ID from IBM Cloud Console > watsonx.ai

### "Model not found" error
- Default model: `ibm/granite-13b-chat-v2`
- Check available models in your watsonx.ai project

## Development

### Run with auto-reload
```bash
uvicorn main:app --reload --port 3000
```

### Run tests
```bash
python test_watsonx.py
```

### Format code
```bash
pip install black
black .
```

## Deployment

### Deploy to Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Deploy to Render
1. Connect your GitHub repo
2. Set environment variables in Render dashboard
3. Deploy!

## Next Steps

1. ✅ Test the extraction with sample data
2. ✅ Verify CRM integration (or use mock mode)
3. ✅ Connect frontend to these APIs
4. ✅ Add error handling for edge cases
5. ✅ Deploy to production

## Resources

- [Watsonx.ai Python SDK Docs](https://ibm.github.io/watsonx-ai-python-sdk/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Watsonx Developer Hub](https://www.ibm.com/watsonx/developer/)

## Support

For issues or questions, contact your team:
- Abdullah (Backend)
- Claire (AI Engineer)
- goodgame#069 (Frontend)
