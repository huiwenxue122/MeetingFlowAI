import React from 'react';

const ExtractedDataCard = ({ results }) => {
  if (!results || !results.meetingAnalysis) {
    return null;
  }

  const { meetingAnalysis, crmUpdate } = results;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 my-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        ✅ AI Analysis Complete
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-4 text-blue-800">👤 Customer Info</h3>
          <p><strong>Name:</strong> {meetingAnalysis.customer_name}</p>
          <p><strong>Company:</strong> {meetingAnalysis.company}</p>
          <p><strong>Role:</strong> {meetingAnalysis.role}</p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-4 text-green-800">💰 Deal Info</h3>
          <p><strong>Budget:</strong> {meetingAnalysis.budget}</p>
          <p><strong>Timeline:</strong> {meetingAnalysis.timeline}</p>
          {crmUpdate?.dealScore && <p><strong>Score:</strong> {crmUpdate.dealScore}</p>}
        </div>

        <div className="md:col-span-2 bg-yellow-50 p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-4 text-yellow-800">📋 Next Steps</h3>
          {meetingAnalysis.next_steps && meetingAnalysis.next_steps.length > 0 ? (
            <ul className="list-disc list-inside space-y-2">
              {meetingAnalysis.next_steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          ) : (
            <p>No next steps identified.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtractedDataCard;
