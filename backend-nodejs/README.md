# MeetingFlowAI Backend (Node.js)

Backend API for MeetingFlowAI - IBM Watsonx Hackathon Project

## Quick Start

### 1. Install Dependencies
```bash
cd backend-nodejs
npm install
```

### 2. Configure Environment
```bash
# Copy the example file
cp ../.env.example .env

# Edit .env and add your credentials:
# - WATSONX_AI_APIKEY
# - WATSONX_AI_PROJECT_ID
# - WATSONX_AI_URL
```

### 3. Test Watsonx Integration
```bash
npm test
```

This will run a test extraction on a sample meeting transcript.

### 4. Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:3000`

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
backend-nodejs/
├── server.js                 # Main Express server
├── services/
│   ├── watsonxService.js    # Watsonx AI integration
│   └── crmService.js        # Salesforce/CRM integration
├── test-watsonx.js          # Test script
├── package.json
└── .env                     # Your credentials (not committed)
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

### "Unauthorized" error
- Check that `WATSONX_AI_APIKEY` is correct in `.env`
- Verify your IBM Cloud account is active

### "Project not found" error
- Verify `WATSONX_AI_PROJECT_ID` matches your watsonx.ai project
- Get Project ID from IBM Cloud Console > watsonx.ai

### "Model not found" error
- Default model: `ibm/granite-13b-chat-v2`
- Check available models in your watsonx.ai project

### SSL Certificate errors
Add to `.env`:
```bash
WATSONX_AI_DISABLE_SSL=true
WATSONX_AI_AUTH_DISABLE_SSL=true
```

## Next Steps

1. ✅ Test the extraction with sample data
2. ✅ Verify CRM integration (or use mock mode)
3. ✅ Connect frontend to these APIs
4. ✅ Add error handling for edge cases
5. ✅ Deploy to production (Railway/Render/Heroku)

## Resources

- [Watsonx.ai Node.js SDK Docs](https://ibm.github.io/watsonx-ai-node-sdk/)
- [Watsonx Developer Hub](https://www.ibm.com/watsonx/developer/)
- [Express.js Documentation](https://expressjs.com/)

## Support

For issues or questions, contact your team:
- Abdullah (Backend)
- Claire (AI Engineer)
- goodgame#069 (Frontend)
