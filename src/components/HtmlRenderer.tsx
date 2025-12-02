import React, { useEffect, useRef } from 'react';

interface HtmlRendererProps {
  htmlContent: string;
}

const HtmlRenderer: React.FC<HtmlRendererProps> = ({ htmlContent }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.innerHTML = htmlContent;

      const scripts = Array.from(container.getElementsByTagName('script'));
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        
        // Copy attributes
        Array.from(oldScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        
        // Copy content
        newScript.textContent = oldScript.textContent;
        
        // Replace the old script with the new one to trigger execution
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    }
  }, [htmlContent]);

  return <div ref={containerRef} />;
};

export default HtmlRenderer;
