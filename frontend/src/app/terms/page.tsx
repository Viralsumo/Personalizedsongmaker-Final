import React from 'react';

const TermsPage = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800">Terms of Service</h1>
        <p className="text-gray-500 mt-2">Last updated: October 03, 2025</p>

        <div className="prose lg:prose-lg mt-8 max-w-none text-slate-700">
          <p>Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;) carefully before using the Personalized Song Maker website (the &quot;Service&quot;) operated by us.</p>

          <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">1. Description of Service</h4>
          <p>Personalized Song Maker is a web-based application that uses artificial intelligence to generate personalized songs based on user-provided text prompts. The Service provides users with audio files of the generated songs upon successful payment.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">2. User-Generated Content</h4>
          <p>You are solely responsible for the text and prompts you provide to the Service. You agree not to use the Service to create any content that is unlawful, harmful, defamatory, or otherwise objectionable.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">3. Payments and Refunds</h4>
          <p>All purchases of generated songs are processed through our third-party payment processor, PayPal. By making a purchase, you agree to their terms of service. Due to the digital nature of our product, all sales are final and non-refundable once the song has been generated and delivered.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">4. Intellectual Property</h4>
          <p>You retain ownership of the original prompts you submit. Upon purchase, you are granted a perpetual, worldwide, non-exclusive, royalty-free license to use the generated audio files for personal, non-commercial purposes. You may not resell, sublicense, or otherwise commercially exploit the generated songs without our express written permission.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">5. Disclaimer of Warranties</h4>
          <p>The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We make no warranties, express or implied, that the Service will be uninterrupted, error-free, or that the generated content will meet your expectations.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">6. Limitation of Liability</h4>
          <p>In no event shall Personalized Song Maker, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">7. Changes</h4>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">8. Contact Us</h4>
          <p>If you have any questions about these Terms, please contact us at support@personalizedsongmaker.com.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
