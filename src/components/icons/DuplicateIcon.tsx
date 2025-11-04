import React from "react";

// Circle with X (Duplicate) - same geometry as canceled; color will differ by class
const DuplicateIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M5 5l4 4M9 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default DuplicateIcon;


