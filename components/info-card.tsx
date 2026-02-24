"use client";

import Link from "next/link";

interface InfoCardProps {
  title: string;
  count: number;
  href: string;
  icon: React.ReactNode;
}

const InfoCard = ({ title, count, href, icon }: InfoCardProps) => {
  return (
    <Link
      href={href}
      className="border border-border rounded-lg p-6 hover:shadow-lg transition w-full max-w-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-gray-500">{title}</span>
          <span className="text-4xl font-bold">{count}</span>
        </div>
        {icon}
      </div>
    </Link>
  );
};

export default InfoCard;
