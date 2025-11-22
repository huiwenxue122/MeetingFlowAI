import os
import asyncio
from dotenv import load_dotenv
from services.watsonx_service import extract_meeting_data

load_dotenv()

# Sample meeting transcript for testing
SAMPLE_MEETING = """
Meeting with Sarah Johnson from Acme Corporation on November 21, 2025

Sarah is the VP of Sales at Acme Corp, a mid-sized software company. During our conversation, she mentioned several challenges her team is facing:

1. Sales reps spend 15-20 minutes after every customer call doing manual data entry into their CRM system
2. Important details from calls are often forgotten or not properly documented
3. Follow-up tasks are inconsistently tracked, leading to missed opportunities
4. The manual process is error-prone and leads to outdated customer information

Sarah mentioned they have a budget of approximately $75,000 allocated for sales productivity tools this quarter. They need a solution implemented by the end of Q1 2026 as they're planning a major sales expansion.

The decision-making team includes Sarah (VP Sales), Michael Chen (CTO), and Jennifer Williams (CFO).

We agreed on the following next steps:
1. I will send a detailed proposal by Friday
2. Schedule a technical demo for next Tuesday at 2pm
3. Provide pricing and implementation timeline
4. Include case studies from similar companies

Sarah was particularly interested in the AI automation capabilities and time-saving potential.
"""


async def test_extraction():
    """Test the Watsonx AI extraction"""
    print("🧪 Testing Watsonx AI Integration\n")
    print("=" * 50)
    print("Sample Meeting Transcript:")
    print("=" * 50)
    print(SAMPLE_MEETING)
    print("=" * 50)
    print("\n🤖 Calling Watsonx AI for extraction...\n")

    try:
        result = await extract_meeting_data(SAMPLE_MEETING)
        
        print("\n" + "=" * 50)
        print("✅ EXTRACTION SUCCESSFUL!")
        print("=" * 50)
        print("\n📊 Extracted Data:")
        
        import json
        print(json.dumps(result, indent=2))
        
        print("\n" + "=" * 50)
        print("✅ Test completed successfully!")
        print("=" * 50)
        
    except Exception as e:
        print("\n" + "=" * 50)
        print("❌ TEST FAILED")
        print("=" * 50)
        print(f"\nError: {str(e)}")
        print("\n" + "=" * 50)


if __name__ == "__main__":
    asyncio.run(test_extraction())
