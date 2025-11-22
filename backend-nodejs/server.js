require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Import services
const { extractMeetingData } = require('./services/watsonxService');
const { updateCRM } = require('./services/crmService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage (replace with database in production)
const meetings = [];

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'MeetingFlowAI Backend is running',
        watsonx_configured: !!process.env.WATSONX_AI_APIKEY
    });
});

// Process meeting endpoint - MAIN FEATURE
app.post('/api/meeting/process', async (req, res) => {
    try {
        const { meeting_text } = req.body;

        // Validation
        if (!meeting_text || meeting_text.trim().length < 100) {
            return res.status(400).json({
                success: false,
                error: 'Meeting text must be at least 100 characters'
            });
        }

        console.log('📝 Processing meeting transcript...');
        
        // Step 1: Extract data using Watsonx AI
        console.log('🤖 Calling Watsonx AI for extraction...');
        const extractedData = await extractMeetingData(meeting_text);
        console.log('✅ Extraction complete:', extractedData);

        // Step 2: Update CRM (Salesforce or mock)
        console.log('📊 Updating CRM...');
        const crmRecordId = await updateCRM(extractedData);
        console.log('✅ CRM updated:', crmRecordId);

        // Step 3: Generate action plan
        const actionPlan = generateActionPlan(extractedData);

        // Step 4: Calculate time saved (assuming 15 min manual work)
        const timeSaved = 15;

        // Step 5: Store meeting record
        const meetingRecord = {
            id: uuidv4(),
            timestamp: new Date().toISOString(),
            raw_text: meeting_text,
            extracted_data: extractedData,
            crm_record_id: crmRecordId,
            action_plan: actionPlan,
            time_saved: timeSaved,
            status: 'processed'
        };

        meetings.push(meetingRecord);

        // Return success response
        res.json({
            success: true,
            meeting_id: meetingRecord.id,
            extracted_data: extractedData,
            crm_updated: true,
            crm_record_id: crmRecordId,
            action_plan: actionPlan,
            time_saved: timeSaved,
            message: 'Meeting processed successfully!'
        });

    } catch (error) {
        console.error('❌ Error processing meeting:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Get all meetings
app.get('/api/meetings', (req, res) => {
    try {
        const meetingsSummary = meetings.map(m => ({
            id: m.id,
            timestamp: m.timestamp,
            customer: m.extracted_data.customer_name,
            company: m.extracted_data.company,
            status: m.status,
            time_saved: m.time_saved
        }));

        res.json({
            success: true,
            count: meetings.length,
            total_time_saved: meetings.reduce((sum, m) => sum + m.time_saved, 0),
            meetings: meetingsSummary
        });
    } catch (error) {
        console.error('❌ Error fetching meetings:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get specific meeting details
app.get('/api/meeting/:id', (req, res) => {
    try {
        const meeting = meetings.find(m => m.id === req.params.id);
        
        if (!meeting) {
            return res.status(404).json({
                success: false,
                error: 'Meeting not found'
            });
        }

        res.json({
            success: true,
            meeting: meeting
        });
    } catch (error) {
        console.error('❌ Error fetching meeting:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Dashboard stats
app.get('/api/stats', (req, res) => {
    try {
        const totalMeetings = meetings.length;
        const totalTimeSaved = meetings.reduce((sum, m) => sum + m.time_saved, 0);
        const avgTimeSaved = totalMeetings > 0 ? Math.round(totalTimeSaved / totalMeetings) : 0;

        res.json({
            success: true,
            stats: {
                total_meetings: totalMeetings,
                total_time_saved_minutes: totalTimeSaved,
                total_time_saved_hours: Math.round(totalTimeSaved / 60 * 10) / 10,
                avg_time_saved_per_meeting: avgTimeSaved,
                crm_updates: totalMeetings // Assuming 1:1 for demo
            }
        });
    } catch (error) {
        console.error('❌ Error fetching stats:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Helper function to generate action plan
function generateActionPlan(extractedData) {
    const actions = [];

    // Add follow-up tasks based on extracted data
    if (extractedData.next_steps && extractedData.next_steps.length > 0) {
        extractedData.next_steps.forEach((step, index) => {
            actions.push({
                id: index + 1,
                task: step,
                priority: index === 0 ? 'high' : 'medium',
                status: 'pending'
            });
        });
    }

    // Add default follow-up email task
    actions.push({
        id: actions.length + 1,
        task: `Send follow-up email to ${extractedData.customer_name}`,
        priority: 'high',
        status: 'pending'
    });

    // Add CRM update confirmation
    actions.push({
        id: actions.length + 1,
        task: 'CRM record updated with meeting notes',
        priority: 'low',
        status: 'completed'
    });

    return actions;
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('💥 Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 MeetingFlowAI Backend Server`);
    console.log(`📡 Running on port ${PORT}`);
    console.log(`🔗 API: http://localhost:${PORT}/api`);
    console.log(`🤖 Watsonx configured: ${!!process.env.WATSONX_AI_APIKEY}`);
    console.log(`\n✅ Ready to process meetings!\n`);
});

module.exports = app;
