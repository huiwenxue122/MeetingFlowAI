import os
import re
import json
from dotenv import load_dotenv
from ibm_watsonx_ai.foundation_models import Model
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames as GenParams

load_dotenv()

# Initialize Watsonx credentials
credentials = {
    "url": os.getenv("WATSONX_AI_URL", "https://us-south.ml.cloud.ibm.com"),
    "apikey": os.getenv("WATSONX_AI_APIKEY")
}

project_id = os.getenv("WATSONX_AI_PROJECT_ID")

async def extract_meeting_data(meeting_text: str) -> dict:
    """
    Extract structured data from meeting transcript using IBM Watsonx AI
    
    Args:
        meeting_text: Raw meeting transcript
    
    Returns:
        dict: Extracted structured data
    """
    
    # Construct detailed prompt
    prompt = f"""You are an expert AI assistant specializing in extracting structured information from sales meeting transcripts.

Your task is to analyze the following meeting transcript and extract key information. Return ONLY a valid JSON object with these exact fields:

{{
  "customer_name": "Full name of the customer (e.g., 'John Smith')",
  "company": "Company name",
  "role": "Job title or role",
  "pain_points": ["List of specific pain points or challenges mentioned", "Each pain point as a separate item"],
  "budget": "Budget amount mentioned or 'Not mentioned'",
  "timeline": "Timeline or urgency mentioned (e.g., 'Need by Q1 2026') or 'Not mentioned'",
  "decision_makers": ["List of people involved in decision making"],
  "next_steps": ["Action items", "Follow-up tasks"]
}}

IMPORTANT RULES:
- Extract information ONLY from the text provided
- Do not make up or infer information that isn't clearly stated
- If a field cannot be determined from the text, use "Not mentioned" or empty array []
- Return ONLY the JSON object, no additional text
- Ensure the JSON is valid and properly formatted

MEETING TRANSCRIPT:
{meeting_text}

JSON OUTPUT:"""

    # Initialize model
    model = Model(
        model_id="ibm/granite-13b-chat-v2",  # Using IBM Granite model
        params={
            GenParams.MAX_NEW_TOKENS: 600,
            GenParams.TEMPERATURE: 0.2,  # Low temperature for deterministic output
            GenParams.TOP_P: 0.9,
            GenParams.TOP_K: 50,
        },
        credentials=credentials,
        project_id=project_id
    )

    try:
        print("🤖 Sending request to Watsonx AI...")
        
        # Generate response
        response = model.generate_text(prompt=prompt)
        
        print(f"📄 Raw AI Response: {response}")

        # Extract JSON from response
        json_match = re.search(r'\{[\s\S]*\}', response)
        
        if not json_match:
            raise ValueError("No valid JSON found in AI response")
        
        extracted_data = json.loads(json_match.group(0))

        # Validate required fields
        required_fields = ['customer_name', 'company', 'role', 'pain_points', 'next_steps']
        for field in required_fields:
            if field not in extracted_data:
                raise ValueError(f"Missing required field: {field}")

        # Clean up data
        cleaned_data = {
            "customer_name": extracted_data.get("customer_name", "Not mentioned"),
            "company": extracted_data.get("company", "Not mentioned"),
            "role": extracted_data.get("role", "Not mentioned"),
            "pain_points": extracted_data.get("pain_points", []) if isinstance(extracted_data.get("pain_points"), list) else [],
            "budget": extracted_data.get("budget", "Not mentioned"),
            "timeline": extracted_data.get("timeline", "Not mentioned"),
            "decision_makers": extracted_data.get("decision_makers", []) if isinstance(extracted_data.get("decision_makers"), list) else [],
            "next_steps": extracted_data.get("next_steps", []) if isinstance(extracted_data.get("next_steps"), list) else []
        }

        print("✅ Data extraction successful!")
        return cleaned_data

    except json.JSONDecodeError as e:
        print(f"❌ JSON parsing error: {e}")
        print("⚠️ Using fallback extraction...")
        return fallback_extraction(meeting_text)
    
    except Exception as e:
        print(f"❌ Watsonx AI Error: {str(e)}")
        raise Exception(f"Failed to extract meeting data: {str(e)}")


def fallback_extraction(meeting_text: str) -> dict:
    """
    Fallback extraction using simple heuristics if AI extraction fails
    """
    print("🔄 Using fallback extraction method...")
    
    return {
        "customer_name": "Not mentioned",
        "company": "Not mentioned",
        "role": "Not mentioned",
        "pain_points": ["Unable to extract automatically"],
        "budget": "Not mentioned",
        "timeline": "Not mentioned",
        "decision_makers": [],
        "next_steps": ["Review meeting manually", "Follow up with customer"]
    }


async def generate_follow_up_email(extracted_data: dict) -> str:
    """
    Generate a follow-up email using Watsonx AI (optional enhancement)
    
    Args:
        extracted_data: Extracted meeting data
    
    Returns:
        str: Generated email content
    """
    
    prompt = f"""Generate a professional follow-up email based on this meeting information:

Customer: {extracted_data['customer_name']}
Company: {extracted_data['company']}
Pain Points: {', '.join(extracted_data['pain_points'])}
Next Steps: {', '.join(extracted_data['next_steps'])}

Write a concise, professional email (max 200 words) that:
1. Thanks them for their time
2. Summarizes key pain points discussed
3. Confirms next steps
4. Suggests a follow-up time

Email:"""

    model = Model(
        model_id="ibm/granite-13b-chat-v2",
        params={
            GenParams.MAX_NEW_TOKENS: 300,
            GenParams.TEMPERATURE: 0.7,  # Higher temperature for creative writing
        },
        credentials=credentials,
        project_id=project_id
    )

    try:
        response = model.generate_text(prompt=prompt)
        return response.strip()
    except Exception as e:
        print(f"❌ Email generation error: {e}")
        return "Error generating email. Please compose manually."
