import { useState, useCallback } from 'react';
import WatsonChat from '../components/WatsonChat';
import { WATSON_AGENTS } from '../config/watson';
import ProcessingLoader from '../components/ProcessingLoader';
import FullAnalysis from '../components/FullAnalysis';
import AgentDashboard from '../components/AgentDashboard';

const SAMPLE_TEXT = `Meeting with Sarah Johnson, VP Operations at TechCorp Inc. Sarah's email: sjohnson@techcorp.com Sarah's phone: (555) 123-4567 Budget: $150,000 approved for this fiscal year - Sarah has sign-off authority up to $200K Timeline: Need to decide by end of Q1 (March 31st) - they have a board meeting April 1st where they need to show progress Pain point: Current manual data entry takes 20 hours/week across their operations team of 5 people. This is costing approximately $50,000 annually in labor, plus another $30K in errors and rework. Sarah said: "This is our top priority for Q1. We're hemorrhaging money on manual processes." Impressed with our automation features, especially the AI-powered data extraction. Asked detailed questions about implementation timeline and ROI calculation. Will schedule demo for CEO next week - CEO name is Michael Chen, he's the final decision maker for purchases over $100K. Also mentioned they're currently using Salesforce but very dissatisfied with automation capabilities. Quote: "Salesforce is great for CRM but terrible for actual workflow automation." Decision process: Sarah will present to CEO with IT Director (James Park) next week. If approved, can start implementation immediately. Next steps agreed: 1. Send demo video by Friday 2. CEO presentation next Tuesday 2pm 3. Provide case study from similar manufacturing company Industry: Manufacturing, specifically automotive parts Company size: 250 employees, $50M annual revenue`;

const Home = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [processingStatus, setProcessingStatus] = useState(null);
  const [analysisTranscript, setAnalysisTranscript] = useState(null);
  const [showAgentDashboard, setShowAgentDashboard] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(SAMPLE_TEXT);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  const handleChatLoad = useCallback((instance) => {
    console.log("🚀 Watson Chat instance loaded!");

    instance.on('chat:ready', (event) => {
      console.log("🤖 Chat is ready for input.", event);
    });

    instance.on('pre:send', (event) => {
      console.log('⬆️ pre:send', event);
      setProcessingStatus('Sending your message to the AI...');
      setAnalysisTranscript(null); // Clear previous analysis
    });

    instance.on('send', (event) => {
      console.log('✅ send', event);
    });

    instance.on('pre:receive', (event) => {
      console.log('⬇️ pre:receive', event);
      const message = event.message?.content?.[0];

      if (message && message.response_type === 'text') {
        const text = message.text;
        if (
          text.includes('STEP 1: MEETING INTELLIGENCE') &&
          text.includes('STEP 2: CRM ASSESSMENT') &&
          text.includes('STEP 3: ENGAGEMENT STRATEGY')
        ) {
          // This is the final analysis, so set the transcript
          setAnalysisTranscript(text);
          setProcessingStatus(null);
        } else {
          // This is a conversational message, so hide the loader
          setProcessingStatus(null);
        }
      } else {
        setProcessingStatus('AI is processing the information...');
      }
    });
    
    instance.on('receive', (event) => {
      // Clear the loader when any message is fully rendered in the chat.
      console.log('✅ receive', event);
      setProcessingStatus(null);
    });
  }, []);

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
        <div className="max-w-4xl mx-auto my-12 bg-white rounded-2xl shadow-xl p-8">
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
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl text-center border-2 border-green-400 shadow-md">
                <div className="text-4xl mb-2">🔍</div>
                <div className="font-bold text-gray-900">Agent 1</div>
                <div className="text-sm text-gray-700 font-medium">Sales Intelligence</div>
                <div className="text-xs text-gray-600 mt-1">Analyzes meetings</div>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl text-center border-2 border-purple-400 shadow-md">
                <div className="text-4xl mb-2">💼</div>
                <div className="font-bold text-gray-900">Agent 2</div>
                <div className="text-sm text-gray-700 font-medium">CRM Intelligence</div>
                <div className="text-xs text-gray-600 mt-1">Updates Salesforce</div>
              </div>

              <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-xl text-center border-2 border-pink-400 shadow-md">
                <div className="text-4xl mb-2">📧</div>
                <div className="font-bold text-gray-900">Agent 3</div>
                <div className="text-sm text-gray-700 font-medium">Engagement Automation</div>
                <div className="text-xs text-gray-600 mt-1">Generates follow-ups</div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="max-w-4xl mx-auto my-12 bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Use the Agents</h2>
          <div className="flex items-center justify-center gap-4">
            <p className="text-gray-600">
              Click the button below to copy a sample meeting summary, then paste it into the chat window
              at the bottom-right to see the AI agents in action!
            </p>
            <img src="/chat-button.png" alt="Chat button" className="w-16 h-16" />
          </div>
          <button
            onClick={handleCopyClick}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
          >
            {isCopied ? 'Copied!' : '📋 Copy Sample Text'}
          </button>
        </div>
        
        {/* Value Proposition */}
        <div className="max-w-4xl mx-auto my-12 bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-3 gap-4">
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
            onClick={() => setShowAgentDashboard(prev => !prev)}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            {showAgentDashboard ? '🤖 Hide Agent Dashboard' : '🤖 Explore the Agents'}
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
      {analysisTranscript && <FullAnalysis transcript={analysisTranscript} />}

      {/* Agent Dashboard Modal */}
      {showAgentDashboard && <AgentDashboard onClose={() => setShowAgentDashboard(false)} />}
    </div>
  );
};

export default Home;
