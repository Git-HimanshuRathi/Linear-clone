import React from "react";

// Two vertical bars (middle heights) for Medium priority
const PriorityMediumIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="6" y="8.5" width="2.2" height="4" rx="0.5" fill="currentColor" />
    <rect x="9.4" y="6.5" width="2.2" height="6" rx="0.5" fill="currentColor" />
  </svg>
);

export default PriorityMediumIcon;


