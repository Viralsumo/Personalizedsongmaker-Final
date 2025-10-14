import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer - Personalized Song Maker',
  description: 'Disclaimer and acceptable use policy for the Personalized Song Maker service.',
};

const DisclaimerPage = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800">Disclaimer and Acceptable Use</h1>
        <p className="text-gray-500 mt-2">Last Updated: October 03, 2025</p>

        <div className="prose lg:prose-lg mt-8 max-w-none text-slate-700">
          <p>This website, Personalized Song Maker (the &quot;Service&quot;), generates musical content using artificial intelligence based on prompts provided by you, the user. By using our Service, you acknowledge and agree to the following terms.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">1. No Responsibility for User-Generated Content</h4>
          <p>You are <strong>solely and entirely responsible</strong> for the text prompts you submit and the resulting generated songs (&quot;Content&quot;). We function as a passive conduit for the creation of this Content and do not endorse, control, or assume any liability for the Content you create or its subsequent use.</p>
          <p>You agree that you will not use the Service to create any Content that is defamatory, obscene, infringing on any intellectual property rights (including copyright and trademark), invasive of privacy, harassing, or otherwise unlawful, harmful, or objectionable.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">2. No Guarantee of Accuracy or Quality</h4>
          <p>The Service is provided on an <strong>&quot;AS IS&quot;</strong> and <strong>&quot;AS AVAILABLE&quot;</strong> basis. The AI-generated songs may contain inaccuracies, artifacts, or may not meet your expectations. We make no warranties, express or implied, regarding the quality, accuracy, reliability, or suitability of the generated Content for any purpose.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">3. Limitation of Liability</h4>
          <p>To the fullest extent permitted by applicable law, in no event shall Personalized Song Maker, its owners, or its affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service or the Content created. This includes, but is not limited to, any claims of defamation, copyright infringement, emotional distress, or financial loss resulting from the Content you create, use, or share.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">4. Indemnification</h4>
          <p>You agree to indemnify, defend, and hold harmless Personalized Song Maker, its affiliates, officers, and employees from and against any and all claims, liabilities, damages, losses, or expenses, including reasonable attorneys&apos; fees and costs, arising out of or in any way connected with your access to or use of the Service, your violation of these terms, or your creation and use of Content.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">5. Fair Usage</h4>
          <p>The Service is intended for personal, non-commercial use. Automated access, scraping, data mining, or any form of high-volume usage that places an undue burden on our systems is strictly prohibited. We reserve the right to limit or terminate access for any user who violates this policy at our sole discretion.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">6. Changes to This Disclaimer</h4>
          <p>We reserve the right to modify this disclaimer at any time. We will notify you of any changes by posting the new disclaimer on this page. You are advised to review this page periodically for any changes.</p>

          <h4 className="font-semibold text-lg mt-6 mb-2">7. Contact Us</h4>
          <p>If you have any questions about this Disclaimer, please contact us at <a href="mailto:support@personalizedsongmaker.com">support@personalizedsongmaker.com</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
