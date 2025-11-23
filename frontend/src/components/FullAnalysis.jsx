import { useEffect, useState } from 'react';

const FullAnalysis = ({ transcript }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (transcript) {
      const parsed = parseTranscript(transcript);
      setResults(parsed);
    }
  }, [transcript]);

  const parseTranscript = (text) => {
    const getSection = (start, end) => {
      const startIndex = text.indexOf(start);
      if (startIndex === -1) return '';
      const endIndex = end ? text.indexOf(end, startIndex) : text.length;
      return text.substring(startIndex + start.length, endIndex).trim();
    };

    const extractValue = (section, key) => {
      const regex = new RegExp(`^${key}:\\s*(.+)`, 'm');
      const match = section.match(regex);
      return match ? match[1].trim() : 'N/A';
    };

    const extractList = (section, heading) => {
      const block = getSection(heading, '===');
      if (!block) return [];
      return block.split(/\n\d+\.\s*/).filter(Boolean).map(item => item.trim());
    };

    const extractEmailBody = (section) => {
      const bodyStart = section.indexOf('**Email Body:**');
      if (bodyStart === -1) return 'N/A';
      const bodyText = section.substring(bodyStart + '**Email Body:**'.length);
      const bodyEnd = bodyText.indexOf('**Email Personalization Notes:**');
      return bodyText.substring(0, bodyEnd !== -1 ? bodyEnd : undefined).trim();
    };

    const meetingAnalysisText = getSection('STEP 1: MEETING INTELLIGENCE', 'STEP 2: CRM ASSESSMENT');
    const crmAssessmentText = getSection('STEP 2: CRM ASSESSMENT', 'STEP 3: ENGAGEMENT STRATEGY');
    const engagementStrategyText = getSection('STEP 3: ENGAGEMENT STRATEGY');

    const crmActions = [];
    const contactName = extractValue(crmAssessmentText, "Full Name");
    if (contactName !== 'N/A') crmActions.push(`Create new contact: ${contactName}`);
    const oppName = extractValue(crmAssessmentText, "Opportunity Name");
    if (oppName !== 'N/A') crmActions.push(`Create new opportunity: ${oppName}`);
    crmActions.push("Set follow-up tasks based on action plan");

    return {
      meetingAnalysis: {
        customer_name: extractValue(meetingAnalysisText, "Name"),
        company: extractValue(meetingAnalysisText, "Company"),
        role: extractValue(meetingAnalysisText, "Role"),
        pain_points: [extractValue(meetingAnalysisText, "Primary Pain Point")],
        budget: extractValue(meetingAnalysisText, "Budget"),
        timeline: extractValue(meetingAnalysisText, "Timeline"),
        decision_makers: [extractValue(meetingAnalysisText, "Decision Makers")],
        next_steps: extractList(meetingAnalysisText, '=== NEXT STEPS MENTIONED ===')
      },
      crmUpdate: {
        status: "✅ Update Instructions Generated",
        actions: crmActions,
        dealScore: extractValue(crmAssessmentText, "Opportunity Strength")
      },
      followUpEmail: {
        subject: extractValue(engagementStrategyText, "Subject Line"),
        body: extractEmailBody(engagementStrategyText)
      },
      timeSaved: 13 // Mocked
    };
  };

  const handleCopyEmail = () => {
    if (results) {
      const emailText = `Subject: ${results.followUpEmail.subject}\n\n${results.followUpEmail.body}`;
      navigator.clipboard.writeText(emailText);
      alert('✅ Email copied to clipboard!');
    }
  };

  if (!results) {
    return (
      <div className="text-center p-8">
        <p>Parsing analysis...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 my-8">
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
  );
};

export default FullAnalysis;
