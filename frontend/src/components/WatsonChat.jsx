import { useEffect, useRef } from 'react';
import { WATSON_CONFIG } from '../config/watson';

const WatsonChat = ({ 
  agentId,
  agentEnvironmentId,
  layout = "float",
  showLauncher = true
}) => {
  const scriptRef = useRef(null);

  useEffect(() => {
    // 确保 DOM 已经准备好
    const timer = setTimeout(() => {
      // 配置 watsonX Orchestrate
      window.wxOConfiguration = {
        ...WATSON_CONFIG,
        rootElementID: "watson-chat-root",
        deploymentPlatform: "ibmcloud",
        showLauncher: showLauncher,
        chatOptions: {
          agentId: agentId,
          agentEnvironmentId: agentEnvironmentId,
        },
        layout: {
          form: layout,
          showOrchestrateHeader: true,
          width: "400px",
          height: "600px"
        },
        style: {
          headerColor: '#1e40af',
          userMessageBackgroundColor: '#3b82f6',
          primaryColor: '#2563eb'
        }
      };

      // 加载 watsonX chat script
      if (!scriptRef.current) {
        const script = document.createElement('script');
        script.src = `${WATSON_CONFIG.hostURL}/wxochat/wxoLoader.js?embed=true`;
        script.async = true;
        
        script.addEventListener('load', () => {
          console.log('✅ Watson Chat loaded successfully');
          if (window.wxoLoader) {
            try {
              window.wxoLoader.init();
            } catch (error) {
              console.error('Error initializing Watson Chat:', error);
            }
          }
        });
        
        script.addEventListener('error', (error) => {
          console.error('❌ Failed to load Watson Chat:', error);
        });
        
        document.head.appendChild(script);
        scriptRef.current = script;
      }
    }, 100); // 延迟 100ms 确保 DOM 准备好

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [agentId, agentEnvironmentId, layout, showLauncher]);

  return <div id="watson-chat-root" className="watson-chat-container" />;
};

export default WatsonChat;
