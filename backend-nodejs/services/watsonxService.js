require('dotenv').config();
const { WatsonXAI } = require('@ibm-cloud/watsonx-ai');

// Initialize Watsonx AI client
const watsonxAI = WatsonXAI.newInstance({
    version: process.env.WATSONX_AI_VERSION || '2024-05-31',
    serviceUrl: process.env.WATSONX_AI_URL || 'https://us-south.ml.cloud.ibm.com',
});

/**
 * Extract structured data from meeting transcript using IBM Watsonx AI
 * @param {string} meetingText - The raw meeting transcript
 * @returns {Promise<Object>} Extracted structured data
 */
async function extractMeetingData(meetingText) {
    // Construct detailed prompt for extraction
    const prompt = `You are an expert AI assistant specializing in extracting structured information from sales meeting transcripts.

Your task is to analyze the following meeting transcript and extract key information. Return ONLY a valid JSON object with these exact fields:

{
  "customer_name": "Full name of the customer (e.g., 'John Smith')",
  "company": "Company name",
  "role": "Job title or role",
  "pain_points": ["List of specific pain points or challenges mentioned", "Each pain point as a separate item"],
  "budget": "Budget amount mentioned or 'Not mentioned'",
  "timeline": "Timeline or urgency mentioned (e.g., 'Need by Q1 2026') or 'Not mentioned'",
  "decision_makers": ["List of people involved in decision making"],
  "next_steps": ["Action items", "Follow-up tasks"]
}

IMPORTANT RULES:
- Extract information ONLY from the text provided
- Do not make up or infer information that isn't clearly stated
- If a field cannot be determined from the text, use "Not mentioned" or empty array []
- Return ONLY the JSON object, no additional text
- Ensure the JSON is valid and properly formatted

MEETING TRANSCRIPT:
${meetingText}

JSON OUTPUT:`;

    const params = {
        input: prompt,
        modelId: 'ibm/granite-13b-chat-v2', // Using IBM Granite model
        projectId: process.env.WATSONX_AI_PROJECT_ID,
        parameters: {
            max_new_tokens: 600,
            temperature: 0.2, // Low temperature for more deterministic output
            top_p: 0.9,
            top_k: 50,
        },
    };

    try {
        console.log('🤖 Sending request to Watsonx AI...');
        const response = await watsonxAI.generateText(params);
        const generatedText = response.result.results[0].generated_text;
        
        console.log('📄 Raw AI Response:', generatedText);

        // Extract JSON from the response
        const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
        
        if (!jsonMatch) {
            throw new Error('No valid JSON found in AI response');
        }

        const extractedData = JSON.parse(jsonMatch[0]);

        // Validate required fields
        const requiredFields = ['customer_name', 'company', 'role', 'pain_points', 'next_steps'];
        for (const field of requiredFields) {
            if (!(field in extractedData)) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        // Clean up data
        const cleanedData = {
            customer_name: extractedData.customer_name || 'Not mentioned',
            company: extractedData.company || 'Not mentioned',
            role: extractedData.role || 'Not mentioned',
            pain_points: Array.isArray(extractedData.pain_points) ? extractedData.pain_points : [],
            budget: extractedData.budget || 'Not mentioned',
            timeline: extractedData.timeline || 'Not mentioned',
            decision_makers: Array.isArray(extractedData.decision_makers) ? extractedData.decision_makers : [],
            next_steps: Array.isArray(extractedData.next_steps) ? extractedData.next_steps : []
        };

        console.log('✅ Data extraction successful!');
        return cleanedData;

    } catch (error) {
        console.error('❌ Watsonx AI Error:', error.message);
        
        // If JSON parsing fails, try to extract partial data
        if (error instanceof SyntaxError) {
            console.warn('⚠️ JSON parsing failed, attempting fallback extraction...');
            return fallbackExtraction(meetingText);
        }

        throw new Error(`Failed to extract meeting data: ${error.message}`);
    }
}

/**
 * Fallback extraction using simple heuristics if AI extraction fails
 * @param {string} meetingText - The raw meeting transcript
 * @returns {Object} Basic extracted data
 */
function fallbackExtraction(meetingText) {
    console.log('🔄 Using fallback extraction method...');
    
    return {
        customer_name: 'Not mentioned',
        company: 'Not mentioned',
        role: 'Not mentioned',
        pain_points: ['Unable to extract automatically'],
        budget: 'Not mentioned',
        timeline: 'Not mentioned',
        decision_makers: [],
        next_steps: ['Review meeting manually', 'Follow up with customer']
    };
}

/**
 * Generate a follow-up email using Watsonx AI (optional enhancement)
 * @param {Object} extractedData - Extracted meeting data
 * @returns {Promise<string>} Generated email content
 */
async function generateFollowUpEmail(extractedData) {
    const prompt = `Generate a professional follow-up email based on this meeting information:

Customer: ${extractedData.customer_name}
Company: ${extractedData.company}
Pain Points: ${extractedData.pain_points.join(', ')}
Next Steps: ${extractedData.next_steps.join(', ')}

Write a concise, professional email (max 200 words) that:
1. Thanks them for their time
2. Summarizes key pain points discussed
3. Confirms next steps
4. Suggests a follow-up time

Email:`;

    const params = {
        input: prompt,
        modelId: 'ibm/granite-13b-chat-v2',
        projectId: process.env.WATSONX_AI_PROJECT_ID,
        parameters: {
            max_new_tokens: 300,
            temperature: 0.7, // Higher temperature for more creative writing
        },
    };

    try {
        const response = await watsonxAI.generateText(params);
        return response.result.results[0].generated_text.trim();
    } catch (error) {
        console.error('❌ Email generation error:', error);
        return 'Error generating email. Please compose manually.';
    }
}

module.exports = {
    extractMeetingData,
    generateFollowUpEmail
};
