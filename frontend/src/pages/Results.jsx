import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transcript } = location.state || {};
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 检查是否有数据
    if (!transcript) {
      navigate('/');
      return;
    }

    // 模拟加载完成
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [transcript, navigate]);

  // Mock data
  const results = {
    meetingAnalysis: {
      customer_name: "Sarah Johnson",
      company: "TechCorp Inc",
      role: "VP Operations",
      pain_points: [
        "Manual data entry takes 20 hours/week",
        "$50,000 annual cost in labor",
        "$30K errors and rework"
      ],
      budget: "$150,000",
      timeline: "Q1 2026",
      decision_makers: ["Sarah Johnson (VP Operations)", "Michael Chen (CEO)", "James Park (IT Director)"],
      next_steps: [
        "Send demo video by Friday",
        "CEO presentation next Tuesday 2pm",
        "Provide case study from similar manufacturing company"
      ]
    },
    crmUpdate: {
      status: "✅ Updated",
      actions: [
        "Created new contact: Sarah Johnson",
        "Updated company: TechCorp Inc",
        "Added meeting notes to activity log",
        "Updated deal stage: Qualification → Discovery",
        "Set follow-up tasks"
      ],
      dealScore: "8/10 - High potential"
    },
    followUpEmail: {
      subject: "Re: AI-Powered Data Automation for TechCorp",
      body: `Hi Sarah,

Thank you for the productive conversation today about TechCorp's data entry challenges.

Key Points from Our Discussion:
- Current manual process costs ~$50K annually in labor + $30K in errors
- Team of 5 spending 20 hours/week on data entry
- Decision needed by Q1 2026

Next Steps:
1. Demo video - sending by Friday
2. CEO presentation - Tuesday 2pm (I'll prepare slides)
3. Case study - similar manufacturing company

Looking forward to showing how our AI solution can reduce your processing time from 15 minutes to 2 minutes per record.

Best regards,
[Your Name]`
    },
    timeSaved: 13
  };

  const handleCopyEmail = () => {
    const emailText = `Subject: ${results.followUpEmail.subject}\n\n${results.followUpEmail.body}`;
    navigator.clipboard.writeText(emailText);
    alert('✅ Email copied to clipboard!');
  };

  // Loading 状态
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">🤖</div>
          <div className="text-2xl font-bold text-gray-900 mb-2">Processing with AI Agents...</div>
          <div className="text-gray-600">SalesFlow Orchestrator is analyzing your meeting</div>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          ← Back to Home
        </button>

        {/* Success Banner */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">✅ Multi-Agent Processing Complete!</h1>
              <p className="text-gray-600">All 3 AI agents have successfully processed your meeting</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-blue-600">⏱️ {results.timeSaved} min</div>
              <div className="text-gray-600">Time Saved</div>
            </div>
          </div>
        </div>

        {/* Workflow Visualization */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">🔄 Agent Workflow</h2>
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mb-2">✓</div>
              <div className="font-semibold">Meeting Analyzed</div>
              <div className="text-sm text-gray-500">Agent 1</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mb-2">✓</div>
              <div className="font-semibold">CRM Updated</div>
              <div className="text-sm text-gray-500">Agent 2</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mb-2">✓</div>
              <div className="font-semibold">Email Generated</div>
              <div className="text-sm text-gray-500">Agent 3</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b flex">
            {['overview', 'meeting', 'crm', 'email'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab === 'overview' && '📊 Overview'}
                {tab === 'meeting' && '🔍 Meeting Analysis'}
                {tab === 'crm' && '💼 CRM Update'}
                {tab === 'email' && '📧 Follow-up Email'}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-4">👤 Customer Info</h3>
                  <p><strong>Name:</strong> {results.meetingAnalysis.customer_name}</p>
                  <p><strong>Company:</strong> {results.meetingAnalysis.company}</p>
                  <p><strong>Role:</strong> {results.meetingAnalysis.role}</p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-4">💰 Deal Info</h3>
                  <p><strong>Budget:</strong> {results.meetingAnalysis.budget}</p>
                  <p><strong>Timeline:</strong> {results.meetingAnalysis.timeline}</p>
                  <p><strong>Score:</strong> {results.crmUpdate.dealScore}</p>
                </div>

                <div className="col-span-2 bg-yellow-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-4">📋 Next Steps</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {results.meetingAnalysis.next_steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Meeting Analysis Tab */}
            {activeTab === 'meeting' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">🎯 Pain Points</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {results.meetingAnalysis.pain_points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">👥 Decision Makers</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {results.meetingAnalysis.decision_makers.map((person, i) => (
                      <li key={i}>{person}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* CRM Update Tab */}
            {activeTab === 'crm' && (
              <div>
                <div className="mb-4 text-xl font-bold text-green-600">{results.crmUpdate.status}</div>
                <ul className="space-y-2">
                  {results.crmUpdate.actions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Follow-up Email Tab */}
            {activeTab === 'email' && (
              <div>
                <div className="mb-4">
                  <strong>Subject:</strong> {results.followUpEmail.subject}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap font-mono text-sm">
                  {results.followUpEmail.body}
                </div>
                <button 
                  onClick={handleCopyEmail}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  📋 Copy Email
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;