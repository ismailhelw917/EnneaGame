import React, { useEffect } from 'react';

const FooterAd: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://pl28873464.effectivegatecpm.com/bcd5304a3a6c06b0ce3e275b119df890/invoke.js";
    script.async = true;
    script.dataset.cfasync = "false";
    document.body.appendChild(script);
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="footer-ad-container my-8 flex flex-col items-center">
      <div id="container-bcd5304a3a6c06b0ce3e275b119df890"></div>
    </div>
  );
};

export default FooterAd;
