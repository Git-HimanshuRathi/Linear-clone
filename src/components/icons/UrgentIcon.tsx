import React from "react";

// Urgent: rounded square with exclamation mark (outline, inherits currentColor)
const UrgentIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M7 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="7" cy="9.8" r="0.8" fill="currentColor" />
  </svg>
);

export default UrgentIcon;


