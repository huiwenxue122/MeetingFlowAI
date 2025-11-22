require('dotenv').config();
const { extractMeetingData } = require('./services/watsonxService');

// Sample meeting transcript for testing
const sampleMeeting = `
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
`;

console.log('🧪 Testing Watsonx AI Integration\n');
console.log('=' .repeat(50));
console.log('Sample Meeting Transcript:');
console.log('=' .repeat(50));
console.log(sampleMeeting);
console.log('=' .repeat(50));
console.log('\n🤖 Calling Watsonx AI for extraction...\n');

// Run the extraction
extractMeetingData(sampleMeeting)
    .then(result => {
        console.log('\n' + '='.repeat(50));
        console.log('✅ EXTRACTION SUCCESSFUL!');
        console.log('='.repeat(50));
        console.log('\n📊 Extracted Data:');
        console.log(JSON.stringify(result, null, 2));
        console.log('\n' + '='.repeat(50));
        console.log('✅ Test completed successfully!');
        console.log('='.repeat(50));
        process.exit(0);
    })
    .catch(error => {
        console.error('\n' + '='.repeat(50));
        console.error('❌ TEST FAILED');
        console.error('='.repeat(50));
        console.error('\nError:', error.message);
        console.error('\nStack:', error.stack);
        console.error('\n' + '='.repeat(50));
        process.exit(1);
    });
