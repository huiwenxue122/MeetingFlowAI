import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import WatsonChat from '../components/WatsonChat';
import { WATSON_AGENTS } from '../config/watson';
import ExtractedDataCard from '../components/ExtractedDataCard';
import ProcessingLoader from '../components/ProcessingLoader';

const SAMPLES = {
  AGENT_1: `Meeting with Sarah Johnson, VP Operations at TechCorp Inc. Sarah's email: sjohnson@techcorp.com Sarah's phone: (555) 123-4567 Budget: $150,000 approved for this fiscal year - Sarah has sign-off authority up to $200K Timeline: Need to decide by end of Q1 (March 31st) - they have a board meeting April 1st where they need to show progress Pain point: Current manual data entry takes 20 hours/week across their operations team of 5 people. This is costing approximately $50,000 annually in labor, plus another $30K in errors and rework. Sarah said: "This is our top priority for Q1. We're hemorrhaging money on manual processes." Impressed with our automation features, especially the AI-powered data extraction. Asked detailed questions about implementation timeline and ROI calculation. Will schedule demo for CEO next week - CEO name is Michael Chen, he's the final decision maker for purchases over $100K. Also mentioned they're currently using Salesforce but very dissatisfied with automation capabilities. Quote: "Salesforce is great for CRM but terrible for actual workflow automation." Decision process: Sarah will present to CEO with IT Director (James Park) next week. If approved, can start implementation immediately. Next steps agreed: 1. Send demo video by Friday 2. CEO presentation next Tuesday 2pm 3. Provide case study from similar manufacturing company Industry: Manufacturing, specifically automotive parts Company size: 250 employees, $50M annual revenue`,
  AGENT_2: 'Update the CRM for TechCorp Inc. Contact is Sarah Johnson (sjohnson@techcorp.com). Set the deal stage to "Proposal Sent" and create a follow-up task to schedule a demo with the CEO, Michael Chen, for next Tuesday at 2 PM.',
  AGENT_3: 'Draft a follow-up email to Sarah Johnson at TechCorp Inc. Reference our recent meeting, attach the demo video and the manufacturing case study we discussed, and confirm the presentation with her CEO, Michael Chen, for next Tuesday at 2 PM.',
};

const Home = () => {
  const [copiedAgent, setCopiedAgent] = useState(null);
  const [aiResults, setAiResults] = useState(null);
  const [processingStatus, setProcessingStatus] = useState(null);
  const navigate = useNavigate();

  const handleCopyClick = (agentKey) => {
    navigator.clipboard.writeText(SAMPLES[agentKey]);
    setCopiedAgent(agentKey);
    setTimeout(() => setCopiedAgent(null), 2000); // Reset after 2 seconds
  };

  const handleChatMessage = useCallback((event) => {
    try {
      if (event?.data?.output?.generic?.[0]) {
        const message = event.data.output.generic[0];
        if (message.response_type === 'text' && message.text.startsWith('{"meetingAnalysis":')) {
          console.log('📊 Received structured data from Watson Chat:', message.text);
          const parsedData = JSON.parse(message.text);
          setAiResults(parsedData);
          setProcessingStatus(null); // Clear status on final result
        }
      }
    } catch (error) {
      // It's normal for many messages not to be the final JSON data, so we don't log every error.
    }
  }, []);

  const handleChatLoad = useCallback((instance) => {
    console.log("🚀 Watson Chat instance loaded!");

    instance.on('chat:ready', (event) => {
      console.log("🤖 Chat is ready for input.", event);
    });

    instance.on('pre:send', (event) => {
      console.log('⬆️ pre:send', event);
      setProcessingStatus('Sending your message to the AI...');
      setAiResults(null); // Clear previous results
    });

    instance.on('send', (event) => {
      console.log('✅ send', event);
    });

    instance.on('pre:receive', (event) => {
      console.log('⬇️ pre:receive', event);
      setProcessingStatus('AI is processing the information...');
    });
    
    instance.on('receive', handleChatMessage);
  }, [handleChatMessage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            🚀 SalesFlow AI
          </h1>
          <p className="text-2xl text-gray-600 mb-6">
            Multi-Agent AI System for Sales Automation
          </p>
          <p className="text-lg text-gray-500">
            Powered by IBM watsonx Orchestrate
          </p>
        </div>

        {/* Multi-Agent Architecture Visualization */}
        <div className="max-w-4xl mx-auto mb-12 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">🤖 Multi-Agent AI Workflow</h2>
          
          <div className="flex flex-col items-center space-y-4">
            {/* Orchestrator */}
            <div className="w-full max-w-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl text-center shadow-lg">
              <div className="text-4xl mb-2">🎯</div>
              <div className="font-bold text-xl">SalesFlow AI Orchestrator</div>
              <div className="text-sm opacity-90">Master Agent - Controls All Sub-Agents</div>
            </div>

            {/* Arrow */}
            <div className="text-5xl text-gray-400 font-bold">↓</div>

            {/* Sub-Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl text-center border-2 border-green-400 shadow-md hover:shadow-lg transition flex flex-col justify-between">
                <div>
                  <div className="text-4xl mb-2">🔍</div>
                  <div className="font-bold text-gray-900">Agent 1</div>
                  <div className="text-sm text-gray-700 font-medium">Sales Intelligence</div>
                  <div className="text-xs text-gray-600 mt-1">Analyzes meetings</div>
                </div>
                <button
                  onClick={() => handleCopyClick('AGENT_1')}
                  className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
                >
                  {copiedAgent === 'AGENT_1' ? 'Copied!' : 'Copy Sample'}
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl text-center border-2 border-purple-400 shadow-md hover:shadow-lg transition flex flex-col justify-between">
                <div>
                  <div className="text-4xl mb-2">💼</div>
                  <div className="font-bold text-gray-900">Agent 2</div>
                  <div className="text-sm text-gray-700 font-medium">CRM Intelligence</div>
                  <div className="text-xs text-gray-600 mt-1">Updates Salesforce</div>
                </div>
                <button
                  onClick={() => handleCopyClick('AGENT_2')}
                  className="mt-4 w-full px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition"
                >
                  {copiedAgent === 'AGENT_2' ? 'Copied!' : 'Copy Sample'}
                </button>
              </div>

              <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-xl text-center border-2 border-pink-400 shadow-md hover:shadow-lg transition flex flex-col justify-between">
                <div>
                  <div className="text-4xl mb-2">📧</div>
                  <div className="font-bold text-gray-900">Agent 3</div>
                  <div className="text-sm text-gray-700 font-medium">Engagement Automation</div>
                  <div className="text-xs text-gray-600 mt-1">Generates follow-ups</div>
                </div>
                <button
                  onClick={() => handleCopyClick('AGENT_3')}
                  className="mt-4 w-full px-4 py-2 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition"
                >
                  {copiedAgent === 'AGENT_3' ? 'Copied!' : 'Copy Sample'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Use the Agents</h2>
          <p className="text-gray-600">
            Click one of the "Copy Sample" buttons above, then paste the text into the chat window
            at the bottom-right to see the AI agents in action!
          </p>
          
          {/* Value Proposition */}
          <div className="mt-8 grid grid-cols-3 gap-4 pt-8 border-t">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">15→2 min</div>
              <div className="text-sm text-gray-600">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">30s</div>
              <div className="text-sm text-gray-600">AI Processing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">3 Agents</div>
              <div className="text-sm text-gray-600">Working Together</div>
            </div>
          </div>
        </div>

        {/* Try Chat Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/agents')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            🤖 Explore the Agent Dashboard
          </button>
        </div>
      </div>

      {/* Watson Chat Widget - SalesFlow Orchestrator */}
      <WatsonChat 
        agentId={WATSON_AGENTS.SALESFLOW_ORCHESTRATOR.agentId}
        agentEnvironmentId={WATSON_AGENTS.SALESFLOW_ORCHESTRATOR.agentEnvironmentId}
        onLoad={handleChatLoad}
        layout="float"
      />

      {/* Live Results Display */}
      {processingStatus && <ProcessingLoader status={processingStatus} />}
      {!processingStatus && aiResults && <ExtractedDataCard results={aiResults} />}
    </div>
  );
};

export default Home;
