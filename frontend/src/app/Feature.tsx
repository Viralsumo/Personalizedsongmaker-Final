import React from 'react';

interface FeatureProps {
  icon: React.ReactNode;
  title: React.ReactNode; // Changed from string to React.ReactNode
  desc: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, desc }) => {
  return (
    <div className="relative pl-16">
      <dt className="text-base font-semibold leading-7 text-slate-900">
        <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-fuchsia-500">
          {icon}
        </div>
        {title}
      </dt>
      <dd className="mt-2 text-base leading-7 text-slate-700">{desc}</dd>
    </div>
  );
};

export default Feature;