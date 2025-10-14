'use client';

import { EnvelopeIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { useState, FormEvent } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    // In a real app, you'd send this to a backend service.
    // For example:
    // try {
    //   const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
    //   if (!response.ok) throw new Error('Something went wrong.');
    //   setStatus('Thank you for your message! We will get back to you shortly.');
    //   setFormData({ name: '', email: '', message: '' });
    // } catch (error) {
    //   setStatus('Failed to send message. Please try again later.');
    // } finally {
    //   setIsLoading(false);
    // }

    // For this example, we'll just simulate a success message.
    console.log('Form submitted:', formData);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    setStatus('Thank you for your message! We will get back to you shortly.');
    setFormData({ name: '', email: '', message: '' });
    setIsLoading(false);
  };

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold leading-7 text-pink-600">Get In Touch</h2>
          <div className="mt-2 flex items-center justify-center gap-x-3">
            <EnvelopeIcon className="h-8 w-8 text-pink-600" />
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Contact Us
            </h1>
          </div>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            Have a question, feedback, or a special request? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="mt-12 p-8 bg-slate-50 rounded-2xl shadow-sm border border-slate-200">
          {status ? (
            <div className="text-center p-8 bg-green-100 text-green-800 rounded-lg">
              <p>{status}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold leading-6 text-slate-800">Your Name</label>
                  <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6" placeholder="Your Name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold leading-6 text-slate-800">Your Email</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6" placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold leading-6 text-slate-800">Message</label>
                <textarea name="message" id="message" value={formData.message} onChange={handleInputChange} rows={5} className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6" placeholder="How can we help?" required />
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-pink-500 hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 disabled:bg-pink-300 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        <div className="mt-12 text-center text-slate-600">
          <p>You can also email us directly at <a href="mailto:support@personalizedsongmaker.com" className="font-semibold text-pink-600 hover:underline">support@personalizedsongmaker.com</a>.</p>
          <p className="mt-4 flex items-center justify-center gap-x-1.5">
            For common questions, check out our
            <Link href="/#faq" className="inline-flex items-center gap-x-1 font-semibold text-pink-600 hover:underline">
              <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
              <span>FAQ section</span>
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;