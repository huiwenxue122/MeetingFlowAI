// frontend/src/config/watson.js

export const WATSON_CONFIG = {
    orchestrationID: "a9c104df1b3f4fb5aa2e4b11e98268c2_8f02fc7a-e130-42ea-bf5a-747f185f72e6",
    hostURL: "https://au-syd.watson-orchestrate.cloud.ibm.com",
    crn: "crn:v1:bluemix:public:watsonx-orchestrate:au-syd:a/a9c104df1b3f4fb5aa2e4b11e98268c2:8f02fc7a-e130-42ea-bf5a-747f185f72e6::"
  };
  
  export const WATSON_AGENTS = {
    SALESFLOW_ORCHESTRATOR: {
      agentId: "bb753301-6502-4670-85a7-cb368b1e9dcb",
      agentEnvironmentId: "6ad60b90-69b9-4cf5-8285-59e5b3874eea",
      name: "SalesFlow AI Orchestrator",
      description: "Master orchestrator that controls all other 3 agents to work in order",
      icon: "🎯"
    },
    
    SALES_INTELLIGENCE_AGENT: {
      agentId: "8176364b-a514-45b8-a303-8f2cc56e4443",
      agentEnvironmentId: "17c4ff54-a306-467d-8181-64612aaf097b",
      name: "Sales Intelligence Agent",
      description: "Analyzes sales meeting notes and extracts key information",
      icon: "🔍"
    },
    
    CRM_INTELLIGENCE_ENGINE: {
      agentId: "deaecff4-c279-49bd-b1f8-f933b746cdac",
      agentEnvironmentId: "20be2637-dce3-4f54-b5f4-a997c680da5a",
      name: "CRM Intelligence Engine",
      description: "Updates CRM and manages customer data",
      icon: "💼"
    },
    
    ENGAGEMENT_AUTOMATION_SPECIALIST: {
      agentId: "513420e1-b3fc-492a-8db1-74bb39be218a",
      agentEnvironmentId: "433a5adb-4589-4ec4-bdab-e511692755ee",
      name: "Engagement Automation Specialist",
      description: "Generates follow-up emails and action plans",
      icon: "📧"
    }
  };