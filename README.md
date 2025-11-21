# MeetingFlow AI - Project Requirements

**Team:** Claire (AI Engineer), Abdullah (Backend), goodgame#069 (Frontend)
**Timeline:** Nov 21-23, 2025 (48 hours)
**Goal:** IBM watsonx Orchestrate Hackathon submission

---

## 1. Project Overview

**Problem:** Sales reps spend 15-20 minutes after every call on manual admin work (CRM updates, note-taking, follow-up planning).

**Solution:** AI-powered automation that processes meeting notes and handles all post-call workflows automatically.

**Value Prop:** Reduce post-call admin from 15 minutes to 2 minutes.

---

## 2. Functional Requirements (MUST HAVE)

### FR1: Meeting Input
- User can upload/paste meeting transcript or notes
- Support text input (min 100 words, max 10,000 words)
- Simple text box UI

### FR2: AI Extraction
- Extract customer name, company, role
- Extract pain points discussed
- Extract budget mentioned (if any)
- Extract timeline/urgency
- Extract decision makers
- Extract next steps/action items

### FR3: CRM Integration
- Connect to Salesforce (or mock CRM for demo)
- Auto-create or update contact record
- Add meeting notes to activity log
- Update deal stage if applicable

### FR4: Action Plan Generation
- Generate follow-up task list
- Suggest optimal follow-up timing
- Draft follow-up email template

### FR5: Dashboard
- Show list of processed meetings
- Display extracted information
- Show time saved metrics
- Show AI actions taken

---

## 3. Non-Functional Requirements

### NFR1: Performance
- Process meeting transcript in < 30 seconds
- Dashboard loads in < 2 seconds

### NFR2: Accuracy
- AI extraction accuracy > 80% for key fields
- Minimal hallucination/made-up data

### NFR3: User Experience
- Clean, professional UI
- Clear visual feedback during processing
- Mobile-responsive (nice to have)

### NFR4: Security
- API keys stored in .env (not committed)
- No sensitive data logged

### NFR5: Reliability
- Graceful error handling
- Clear error messages to user

---

## 4. Technical Stack

**Frontend:**
- React 18+
- Tailwind CSS
- React Router (if needed)

**Backend:**
- Python FastAPI OR Node.js Express (Abdullah's choice)
- RESTful API design

**AI/ML:**
- watsonx Orchestrate (workflow orchestration)
- watsonx.ai / Granite models (NLP extraction)
- LangChain (optional, if helpful)

**Integrations:**
- Salesforce API (or mock for demo)
- Gmail API (optional, if time allows)

**Deployment:**
- Frontend: Vercel or Netlify
- Backend: Railway, Render, or Heroku
- Database: SQLite or PostgreSQL (if needed)

---

## 5. MVP Scope (MUST COMPLETE)

✅ **Core Demo Flow:**
1. User lands on homepage
2. User pastes meeting transcript
3. Clicks "Process Meeting"
4. AI extracts key info (show loading state)
5. Display extracted data in structured format
6. Show "CRM Updated" confirmation
7. Display generated action plan
8. Dashboard shows meeting history

✅ **Minimum Features:**
- Meeting input + processing
- AI extraction working
- At least 1 API integration (Salesforce or mock)
- Basic dashboard
- Time saved calculation

---

## 6. Nice-to-Have (IF TIME ALLOWS)

⭐ Voice input (upload audio file)
⭐ Multiple CRM support (HubSpot, Pipedrive)
⭐ Email integration (auto-send follow-up)
⭐ Team collaboration (multiple users)
⭐ Analytics dashboard (trends over time)
⭐ Calendar integration (auto-schedule follow-ups)

**RULE: Do NOT start nice-to-haves until MUST-HAVEs are 100% done!**

---

## 7. API Endpoints (Backend)

### POST /api/meeting/process
- Input: { meeting_text: string }
- Output: { extracted_data: object, actions_taken: array }

### GET /api/meetings
- Output: List of processed meetings

### GET /api/meeting/:id
- Output: Details of specific meeting

### POST /api/crm/update
- Input: { contact_data: object }
- Output: { success: boolean, crm_record_id: string }

---

## 8. Data Models

### Meeting
```json
{
  "id": "uuid",
  "timestamp": "datetime",
  "raw_text": "string",
  "extracted_data": {
    "customer_name": "string",
    "company": "string",
    "role": "string",
    "pain_points": ["string"],
    "budget": "string",
    "timeline": "string",
    "decision_makers": ["string"],
    "next_steps": ["string"]
  },
  "crm_record_id": "string",
  "time_saved": "integer (minutes)",
  "status": "processed|failed"
}
```

---

## 9. UI Components (Frontend)

### Pages:
1. Landing/Home - Meeting input
2. Processing - Loading state
3. Results - Extracted data + actions
4. Dashboard - Meeting history

### Components:
- MeetingInput.jsx
- ProcessingLoader.jsx
- ExtractedDataCard.jsx
- ActionPlanCard.jsx
- MeetingList.jsx
- TimesSavedMetric.jsx

---

## 10. Timeline & Milestones

**Day 1 (Nov 21, today):**
- Hour 0-2: Setup (repos, credentials, architecture)
- Hour 2-8: Core backend API + AI integration
- Hour 8-12: Basic frontend scaffold

**Day 2 (Nov 22):**
- Hour 12-24: Complete all MVP features
- Hour 24-30: Integration + testing
- Hour 30-36: Bug fixes + polish

**Day 3 (Nov 23):**
- Hour 36-40: Final testing
- Hour 40-44: Demo video + presentation
- Hour 44-46: Submit!

---

## 11. Success Criteria

✅ Working end-to-end demo (meeting input → AI processing → CRM update)
✅ Clean, professional UI
✅ 2-minute demo video showing clear value
✅ All code on GitHub
✅ Submitted before deadline

---

## 12. Division of Labor

 (AI Engineer):**
- watsonx integration
- AI extraction logic
- Prompt engineering
- Overall coordination

 (Backend):**
- API architecture
- Backend endpoints
- CRM integration
- Database (if needed)

 (Frontend):**
- React components
- UI/UX
- Dashboard
- Styling

---

## Questions? Comments?
Add below! 👇
```

--
