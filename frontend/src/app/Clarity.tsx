'use client';

import Script from 'next/script';

export default function Clarity() {
  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  if (!clarityProjectId) {
    // In development, it's helpful to know if the ID is missing.
    if (process.env.NODE_ENV === 'development') {
      console.warn('Microsoft Clarity Project ID is not set. Clarity will not be initialized.');
    }
    return null;
  }

  return (
    <Script
      id="clarity-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityProjectId}");
        `,
      }}
    />
  );
}