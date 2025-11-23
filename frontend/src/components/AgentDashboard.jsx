import { WATSON_AGENTS } from '../config/watson';

const AgentDashboard = ({ onClose }) => {
  return (
    <div className="my-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-2xl max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Meet Your AI Team
          </h1>
          <p className="text-xl text-gray-600">
            Discover the specialized agents in the SalesFlow AI ecosystem.
          </p>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {Object.entries(WATSON_AGENTS).map(([key, agent]) => (
            <div
              key={key}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
            >
              <div className="text-6xl mb-4">{agent.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{agent.name}</h3>
              <p className="text-gray-600">{agent.description}</p>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700"
          >
            ← Hide
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
