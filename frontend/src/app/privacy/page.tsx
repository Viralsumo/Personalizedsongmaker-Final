import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Personalized Song Maker',
  description:
    'Our privacy policy explains how Personalized Song Maker protects your personal memories, photos, and payment information.',
  alternates: {
    canonical: 'https://www.personalizedsongmaker.com/privacy',
  },
};

const PrivacyPage = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800">Privacy Policy</h1>
        <p className="text-gray-500 mt-2">Last updated: October 03, 2025</p>

        <div className="prose lg:prose-lg mt-8 max-w-none text-slate-700">
          <p>Personalized Song Maker (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) operates the Personalized Song Maker website (the &quot;Service&quot;). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">1. Information Collection and Use</h4>
          <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information. This includes the details you provide in the song creation form (e.g., name, occasion, details) and your email address if you choose to receive a backup.</li>
            <li><strong>Usage Data:</strong> We automatically collect information such as your computer&apos;s Internet Protocol (IP) address, browser type, browser version, the pages of our Service that you visit, and other diagnostic data.</li>
            <li><strong>Payment Data:</strong> All payments are processed by PayPal. We do not store your credit card details. We receive a confirmation of payment and your PayPal Order ID to associate the payment with your song task.</li>
          </ul>

          <h4 className="font-semibold text-lg mt-6 mb-2">2. How We Use Your Information</h4>
          <p>We use the collected data for various purposes:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>To provide and maintain our Service.</li>
            <li>To generate personalized lyrics and songs as requested.</li>
            <li>To process your payments and transactions.</li>
            <li>To send you a backup of your song links and receipt via email, if requested.</li>
            <li>To monitor the usage of our Service and prevent fraud.</li>
          </ul>

          <h4 className="font-semibold text-lg mt-6 mb-2">3. Data Sharing and Third Parties</h4>
          <p>We do not sell your personal information. We may share your data with third-party service providers to facilitate our Service:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>OpenAI:</strong> We send your text prompts (name, occasion, details) to generate lyrics.</li>
            <li><strong>Suno:</strong> We send the generated lyrics and style information to compose the audio files.</li>
            <li><strong>PayPal:</strong> We use PayPal to process payments. Your payment information is provided directly to them.</li>
          </ul>
          <p>These third parties have their own privacy policies governing how they use such information.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">4. Data Security</h4>
          <p>The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">5. Your Rights</h4>
          <p>You have the right to access, update, or delete the information we have on you. If you wish to have your data removed from our system, please contact us.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">6. Changes to This Privacy Policy</h4>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">7. Contact Us</h4>
          <p>If you have any questions about this Privacy Policy, please contact us at support@personalizedsongmaker.com.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
