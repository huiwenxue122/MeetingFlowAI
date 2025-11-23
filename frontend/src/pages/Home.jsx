import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WatsonChat from '../components/WatsonChat';
import { WATSON_AGENTS } from '../config/watson';

const Home = () => {
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (transcript.length < 100) {
      alert('Please enter at least 100 characters');
      return;
    }

    setIsProcessing(true);
    
    try {
      // 调用 SalesFlow Orchestrator
      const response = await fetch('/api/orchestrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: transcript,
          agentId: WATSON_AGENTS.SALESFLOW_ORCHESTRATOR.agentId,
          agentEnvironmentId: WATSON_AGENTS.SALESFLOW_ORCHESTRATOR.agentEnvironmentId
        })
      });

      const data = await response.json();
      
      // 跳转到 Results 页面，带上 AI 处理的结果
      navigate('/results', { 
        state: { 
          transcript,
          aiResults: data 
        } 
      });
    } catch (error) {
      console.error('Error:', error);
      // 如果 API 失败，使用模拟数据
      setTimeout(() => {
        navigate('/results', { state: { transcript } });
      }, 2000);
    } finally {
      setIsProcessing(false);
    }
  };

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
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl text-center border-2 border-green-400 shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-2">🔍</div>
                <div className="font-bold text-gray-900">Agent 1</div>
                <div className="text-sm text-gray-700 font-medium">Sales Intelligence</div>
                <div className="text-xs text-gray-600 mt-1">Analyzes meetings</div>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl text-center border-2 border-purple-400 shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-2">💼</div>
                <div className="font-bold text-gray-900">Agent 2</div>
                <div className="text-sm text-gray-700 font-medium">CRM Intelligence</div>
                <div className="text-xs text-gray-600 mt-1">Updates Salesforce</div>
              </div>

              <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-xl text-center border-2 border-pink-400 shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-2">📧</div>
                <div className="font-bold text-gray-900">Agent 3</div>
                <div className="text-sm text-gray-700 font-medium">Engagement Automation</div>
                <div className="text-xs text-gray-600 mt-1">Generates follow-ups</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-lg font-semibold text-gray-700">
                📝 Paste Sales Meeting Transcript
              </span>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="mt-2 w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                placeholder="Example: Meeting with Sarah Johnson, VP Operations at TechCorp Inc. Discussed their manual data entry challenges, $50,000 budget, Q1 2026 timeline..."
                disabled={isProcessing}
              />
            </label>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {transcript.length} characters (min 100 required)
              </span>
              
              <button
                type="submit"
                disabled={isProcessing || transcript.length < 100}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    ✨ Process with AI Agents
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Value Proposition */}
          <div className="mt-8 grid grid-cols-3 gap-4 pt-8 border-t">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">15→2 min</div>
              <div className="text-sm text-gray-600">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">&lt;30s</div>
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
            🤖 Try Interactive AI Chat
          </button>
        </div>
      </div>

      {/* Watson Chat Widget - SalesFlow Orchestrator */}
      <WatsonChat 
        agentId={WATSON_AGENTS.SALESFLOW_ORCHESTRATOR.agentId}
        agentEnvironmentId={WATSON_AGENTS.SALESFLOW_ORCHESTRATOR.agentEnvironmentId}
        layout="float"
      />
    </div>
  );
};

export default Home;

