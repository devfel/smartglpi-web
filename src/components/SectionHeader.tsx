import React from "react";

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="px-6 py-3 mt-2 flex justify-center border-b bg-primary text-primary-foreground">
      <h2 className="font-bold">{title}</h2>
    </div>
  );
};
