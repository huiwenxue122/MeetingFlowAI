import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WatsonChat from '../components/WatsonChat';
import { WATSON_AGENTS } from '../config/watson';

const AgentSelector = () => {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          🤖 AI Agent Dashboard
        </h1>
        <p className="text-xl text-gray-600">
          Select an AI agent to interact with
        </p>
      </div>

      {/* Agent Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {Object.entries(WATSON_AGENTS).map(([key, agent]) => (
          <div 
            key={key}
            className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-4 ${
              selectedAgent === key ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => setSelectedAgent(key)}
          >
            <div className="text-6xl mb-4">{agent.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{agent.name}</h3>
            <p className="text-gray-600 mb-4">{agent.description}</p>
            
            {selectedAgent === key && (
              <div className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-center font-semibold">
                ✓ Active
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Back to Home Button */}
      <div className="text-center">
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700"
        >
          ← Back to Meeting Input
        </button>
      </div>

      {/* Watson Chat Widget */}
      {selectedAgent && (
        <WatsonChat 
          agentId={WATSON_AGENTS[selectedAgent].agentId}
          agentEnvironmentId={WATSON_AGENTS[selectedAgent].agentEnvironmentId}
          layout="float"
        />
      )}
    </div>
  );
};

export default AgentSelector;