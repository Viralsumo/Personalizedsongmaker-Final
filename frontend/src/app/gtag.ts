declare global {
  interface Window {
    gtag: (
      command: 'config',
      targetId: string,
      config?: { [key: string]: unknown }
    ) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'function' || !GA_MEASUREMENT_ID) {
    return;
  }
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// You can add other event tracking functions here
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
// export const event = ({ action, category, label, value }) => { ... };