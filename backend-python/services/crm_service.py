import os
import uuid
from dotenv import load_dotenv
from simple_salesforce import Salesforce

load_dotenv()


async def update_crm(extracted_data: dict) -> str:
    """
    Update Salesforce CRM with extracted meeting data
    
    Args:
        extracted_data: Extracted meeting information
    
    Returns:
        str: CRM record ID
    """
    
    # Check if Salesforce credentials are configured
    is_salesforce_configured = (
        os.getenv("SALESFORCE_USERNAME") and 
        os.getenv("SALESFORCE_PASSWORD")
    )

    if not is_salesforce_configured:
        print("⚠️ Salesforce not configured, using mock CRM update")
        return mock_crm_update(extracted_data)

    try:
        return await update_salesforce(extracted_data)
    except Exception as e:
        print(f"❌ Salesforce update failed, falling back to mock: {str(e)}")
        return mock_crm_update(extracted_data)


async def update_salesforce(extracted_data: dict) -> str:
    """
    Update Salesforce with real API
    
    Args:
        extracted_data: Meeting data to update
    
    Returns:
        str: Salesforce contact ID
    """
    print("🔗 Connecting to Salesforce...")

    # Initialize Salesforce connection
    sf = Salesforce(
        username=os.getenv('SALESFORCE_USERNAME'),
        password=os.getenv('SALESFORCE_PASSWORD'),
        security_token=os.getenv('SALESFORCE_SECURITY_TOKEN', '')
    )

    print("✅ Salesforce authenticated")

    # Parse name
    name_parts = extracted_data['customer_name'].split()
    first_name = name_parts[0] if name_parts else 'Unknown'
    last_name = ' '.join(name_parts[1:]) if len(name_parts) > 1 else 'Contact'

    # Check if contact already exists
    try:
        existing_contacts = sf.query(f"""
            SELECT Id FROM Contact 
            WHERE FirstName = '{first_name}' 
            AND LastName = '{last_name}'
            LIMIT 1
        """)

        if existing_contacts['totalSize'] > 0:
            contact_id = existing_contacts['records'][0]['Id']
            print(f"📝 Updating existing contact: {contact_id}")
            
            # Update existing contact
            update_data = {
                'Description': f"Pain Points: {', '.join(extracted_data['pain_points'])}\nBudget: {extracted_data['budget']}\nTimeline: {extracted_data['timeline']}"
            }
            
            if extracted_data['role'] != 'Not mentioned':
                update_data['Title'] = extracted_data['role']
            
            sf.Contact.update(contact_id, update_data)
        else:
            # Create new contact
            print("✨ Creating new contact")
            contact_data = {
                'FirstName': first_name,
                'LastName': last_name,
                'Description': f"Pain Points: {', '.join(extracted_data['pain_points'])}\nBudget: {extracted_data['budget']}\nTimeline: {extracted_data['timeline']}"
            }
            
            if extracted_data['role'] != 'Not mentioned':
                contact_data['Title'] = extracted_data['role']
            
            result = sf.Contact.create(contact_data)
            contact_id = result['id']

    except Exception as e:
        print(f"Error with contact: {e}")
        # Fallback: create basic contact
        result = sf.Contact.create({
            'FirstName': first_name,
            'LastName': last_name,
        })
        contact_id = result['id']

    # Add activity/note to contact
    try:
        task_description = f"""
Meeting Summary:
- Customer: {extracted_data['customer_name']}
- Company: {extracted_data['company']}
- Role: {extracted_data['role']}

Pain Points:
{chr(10).join(f"{i+1}. {p}" for i, p in enumerate(extracted_data['pain_points']))}

Budget: {extracted_data['budget']}
Timeline: {extracted_data['timeline']}

Decision Makers:
{', '.join(extracted_data['decision_makers'])}

Next Steps:
{chr(10).join(f"{i+1}. {s}" for i, s in enumerate(extracted_data['next_steps']))}
        """.strip()

        sf.Task.create({
            'WhoId': contact_id,
            'Subject': 'Meeting Notes - AI Extracted',
            'Description': task_description,
            'Status': 'Completed'
        })
        print("✅ Activity logged in Salesforce")
    except Exception as activity_error:
        print(f"⚠️ Could not create activity: {str(activity_error)}")

    print(f"✅ Salesforce updated successfully: {contact_id}")
    return contact_id


def mock_crm_update(extracted_data: dict) -> str:
    """
    Mock CRM update (for demo/testing without Salesforce)
    
    Args:
        extracted_data: Meeting data
    
    Returns:
        str: Mock record ID
    """
    print("🎭 Mock CRM Update")
    print("-------------------")
    print(f"Contact: {extracted_data['customer_name']}")
    print(f"Company: {extracted_data['company']}")
    print(f"Role: {extracted_data['role']}")
    print(f"Pain Points: {', '.join(extracted_data['pain_points'])}")
    print(f"Budget: {extracted_data['budget']}")
    print(f"Timeline: {extracted_data['timeline']}")
    print("-------------------")

    # Generate mock Salesforce-style ID
    mock_id = f"003{uuid.uuid4().hex[:15]}"
    print(f"✅ Mock CRM record created: {mock_id}")
    
    return mock_id
