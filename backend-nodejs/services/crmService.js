require('dotenv').config();
const jsforce = require('jsforce');
const { v4: uuidv4 } = require('uuid');

/**
 * Update Salesforce CRM with extracted meeting data
 * @param {Object} extractedData - Extracted meeting information
 * @returns {Promise<string>} CRM record ID
 */
async function updateCRM(extractedData) {
    // Check if Salesforce credentials are configured
    const isSalesforceConfigured = 
        process.env.SALESFORCE_USERNAME && 
        process.env.SALESFORCE_PASSWORD;

    if (!isSalesforceConfigured) {
        console.warn('⚠️ Salesforce not configured, using mock CRM update');
        return mockCRMUpdate(extractedData);
    }

    try {
        return await updateSalesforce(extractedData);
    } catch (error) {
        console.error('❌ Salesforce update failed, falling back to mock:', error.message);
        return mockCRMUpdate(extractedData);
    }
}

/**
 * Update Salesforce with real API
 * @param {Object} extractedData 
 * @returns {Promise<string>}
 */
async function updateSalesforce(extractedData) {
    console.log('🔗 Connecting to Salesforce...');

    // Initialize Salesforce connection
    const conn = new jsforce.Connection({
        loginUrl: process.env.SALESFORCE_LOGIN_URL || 'https://login.salesforce.com'
    });

    // Login to Salesforce
    await conn.login(
        process.env.SALESFORCE_USERNAME,
        process.env.SALESFORCE_PASSWORD + (process.env.SALESFORCE_SECURITY_TOKEN || '')
    );

    console.log('✅ Salesforce authenticated');

    // Parse name
    const nameParts = extractedData.customer_name.split(' ');
    const firstName = nameParts[0] || 'Unknown';
    const lastName = nameParts.slice(1).join(' ') || 'Contact';

    // Check if contact already exists
    let contactId;
    try {
        const existingContacts = await conn.sobject('Contact').find({
            FirstName: firstName,
            LastName: lastName,
            Account: { Name: extractedData.company }
        });

        if (existingContacts.length > 0) {
            contactId = existingContacts[0].Id;
            console.log(`📝 Updating existing contact: ${contactId}`);
            
            // Update existing contact
            await conn.sobject('Contact').update({
                Id: contactId,
                Title: extractedData.role !== 'Not mentioned' ? extractedData.role : undefined,
                Description: `Pain Points: ${extractedData.pain_points.join(', ')}\nBudget: ${extractedData.budget}\nTimeline: ${extractedData.timeline}`
            });
        } else {
            // Create new contact
            console.log('✨ Creating new contact');
            const newContact = await conn.sobject('Contact').create({
                FirstName: firstName,
                LastName: lastName,
                Title: extractedData.role !== 'Not mentioned' ? extractedData.role : undefined,
                Account: { Name: extractedData.company },
                Description: `Pain Points: ${extractedData.pain_points.join(', ')}\nBudget: ${extractedData.budget}\nTimeline: ${extractedData.timeline}`
            });
            contactId = newContact.id;
        }
    } catch (error) {
        console.error('Error with contact:', error);
        // Fallback: create basic contact
        const newContact = await conn.sobject('Contact').create({
            FirstName: firstName,
            LastName: lastName,
            Title: extractedData.role !== 'Not mentioned' ? extractedData.role : undefined,
        });
        contactId = newContact.id;
    }

    // Add activity/note to contact
    try {
        await conn.sobject('Task').create({
            WhoId: contactId,
            Subject: 'Meeting Notes - AI Extracted',
            Description: `
Meeting Summary:
- Customer: ${extractedData.customer_name}
- Company: ${extractedData.company}
- Role: ${extractedData.role}

Pain Points:
${extractedData.pain_points.map((p, i) => `${i + 1}. ${p}`).join('\n')}

Budget: ${extractedData.budget}
Timeline: ${extractedData.timeline}

Decision Makers:
${extractedData.decision_makers.join(', ')}

Next Steps:
${extractedData.next_steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}
            `.trim(),
            Status: 'Completed',
            ActivityDate: new Date().toISOString().split('T')[0]
        });
        console.log('✅ Activity logged in Salesforce');
    } catch (activityError) {
        console.warn('⚠️ Could not create activity:', activityError.message);
    }

    console.log(`✅ Salesforce updated successfully: ${contactId}`);
    return contactId;
}

/**
 * Mock CRM update (for demo/testing without Salesforce)
 * @param {Object} extractedData 
 * @returns {string} Mock record ID
 */
function mockCRMUpdate(extractedData) {
    console.log('🎭 Mock CRM Update');
    console.log('-------------------');
    console.log('Contact:', extractedData.customer_name);
    console.log('Company:', extractedData.company);
    console.log('Role:', extractedData.role);
    console.log('Pain Points:', extractedData.pain_points.join(', '));
    console.log('Budget:', extractedData.budget);
    console.log('Timeline:', extractedData.timeline);
    console.log('-------------------');

    // Generate mock Salesforce-style ID
    const mockId = `003${uuidv4().replace(/-/g, '').substring(0, 15)}`;
    console.log('✅ Mock CRM record created:', mockId);
    
    return mockId;
}

module.exports = {
    updateCRM,
    updateSalesforce,
    mockCRMUpdate
};
