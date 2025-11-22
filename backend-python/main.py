import os
import uuid
from datetime import datetime
from typing import List, Optional
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from services.watsonx_service import extract_meeting_data, generate_follow_up_email
from services.crm_service import update_crm

load_dotenv()

app = FastAPI(
    title="MeetingFlowAI API",
    description="Backend API for MeetingFlowAI - IBM Watsonx Hackathon",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("CORS_ORIGIN", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (replace with database in production)
meetings = []


# Pydantic models
class MeetingInput(BaseModel):
    meeting_text: str = Field(..., min_length=100, description="Meeting transcript (min 100 characters)")


class ExtractedData(BaseModel):
    customer_name: str
    company: str
    role: str
    pain_points: List[str]
    budget: str
    timeline: str
    decision_makers: List[str]
    next_steps: List[str]


class ActionItem(BaseModel):
    id: int
    task: str
    priority: str
    status: str


class MeetingResponse(BaseModel):
    success: bool
    meeting_id: str
    extracted_data: ExtractedData
    crm_updated: bool
    crm_record_id: str
    action_plan: List[ActionItem]
    time_saved: int
    message: str


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "message": "MeetingFlowAI Backend is running",
        "watsonx_configured": bool(os.getenv("WATSONX_AI_APIKEY"))
    }


@app.post("/api/meeting/process", response_model=MeetingResponse)
async def process_meeting(meeting_input: MeetingInput):
    """
    Process meeting transcript - MAIN FEATURE
    Extracts data using Watsonx AI and updates CRM
    """
    try:
        meeting_text = meeting_input.meeting_text

        print("📝 Processing meeting transcript...")

        # Step 1: Extract data using Watsonx AI
        print("🤖 Calling Watsonx AI for extraction...")
        extracted_data = await extract_meeting_data(meeting_text)
        print(f"✅ Extraction complete: {extracted_data}")

        # Step 2: Update CRM
        print("📊 Updating CRM...")
        crm_record_id = await update_crm(extracted_data)
        print(f"✅ CRM updated: {crm_record_id}")

        # Step 3: Generate action plan
        action_plan = generate_action_plan(extracted_data)

        # Step 4: Calculate time saved (assuming 15 min manual work)
        time_saved = 15

        # Step 5: Store meeting record
        meeting_record = {
            "id": str(uuid.uuid4()),
            "timestamp": datetime.now().isoformat(),
            "raw_text": meeting_text,
            "extracted_data": extracted_data,
            "crm_record_id": crm_record_id,
            "action_plan": action_plan,
            "time_saved": time_saved,
            "status": "processed"
        }

        meetings.append(meeting_record)

        # Return success response
        return MeetingResponse(
            success=True,
            meeting_id=meeting_record["id"],
            extracted_data=ExtractedData(**extracted_data),
            crm_updated=True,
            crm_record_id=crm_record_id,
            action_plan=action_plan,
            time_saved=time_saved,
            message="Meeting processed successfully!"
        )

    except Exception as e:
        print(f"❌ Error processing meeting: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process meeting: {str(e)}"
        )


@app.get("/api/meetings")
async def get_meetings():
    """Get all processed meetings"""
    try:
        meetings_summary = [
            {
                "id": m["id"],
                "timestamp": m["timestamp"],
                "customer": m["extracted_data"]["customer_name"],
                "company": m["extracted_data"]["company"],
                "status": m["status"],
                "time_saved": m["time_saved"]
            }
            for m in meetings
        ]

        return {
            "success": True,
            "count": len(meetings),
            "total_time_saved": sum(m["time_saved"] for m in meetings),
            "meetings": meetings_summary
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/meeting/{meeting_id}")
async def get_meeting(meeting_id: str):
    """Get specific meeting details"""
    try:
        meeting = next((m for m in meetings if m["id"] == meeting_id), None)

        if not meeting:
            raise HTTPException(status_code=404, detail="Meeting not found")

        return {
            "success": True,
            "meeting": meeting
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/stats")
async def get_stats():
    """Dashboard statistics"""
    try:
        total_meetings = len(meetings)
        total_time_saved = sum(m["time_saved"] for m in meetings)
        avg_time_saved = round(total_time_saved / total_meetings) if total_meetings > 0 else 0

        return {
            "success": True,
            "stats": {
                "total_meetings": total_meetings,
                "total_time_saved_minutes": total_time_saved,
                "total_time_saved_hours": round(total_time_saved / 60, 1),
                "avg_time_saved_per_meeting": avg_time_saved,
                "crm_updates": total_meetings
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def generate_action_plan(extracted_data: dict) -> List[ActionItem]:
    """Generate action plan from extracted data"""
    actions = []

    # Add follow-up tasks based on extracted data
    if extracted_data["next_steps"]:
        for i, step in enumerate(extracted_data["next_steps"]):
            actions.append(ActionItem(
                id=i + 1,
                task=step,
                priority="high" if i == 0 else "medium",
                status="pending"
            ))

    # Add default follow-up email task
    actions.append(ActionItem(
        id=len(actions) + 1,
        task=f"Send follow-up email to {extracted_data['customer_name']}",
        priority="high",
        status="pending"
    ))

    # Add CRM update confirmation
    actions.append(ActionItem(
        id=len(actions) + 1,
        task="CRM record updated with meeting notes",
        priority="low",
        status="completed"
    ))

    return actions


if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 3000))
    
    print("\n🚀 MeetingFlowAI Backend Server")
    print(f"📡 Running on port {port}")
    print(f"🔗 API: http://localhost:{port}/api")
    print(f"📚 Docs: http://localhost:{port}/docs")
    print(f"🤖 Watsonx configured: {bool(os.getenv('WATSONX_AI_APIKEY'))}")
    print("\n✅ Ready to process meetings!\n")
    
    uvicorn.run(app, host="0.0.0.0", port=port)
