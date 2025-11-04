import React from "react";

// Filled circle with check (Done)
const DoneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7" cy="7" r="5.25" fill="currentColor" />
    <path d="M4.5 7l1.7 1.8L9.8 5.2" stroke="#111113" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default DoneIcon;


