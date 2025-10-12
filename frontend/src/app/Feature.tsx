import React from 'react';

export default function Feature({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="relative pl-16">
      <dt className="text-base font-semibold leading-7 text-slate-900">
        <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-lg bg-secondary-accent">
          {icon}
        </div>
        {title}
      </dt>
      <dd className="mt-2 text-base leading-7 text-slate-700">{desc}</dd>
    </div>
  );
}