import React from "react";

// Three vertical bars (all filled) for High priority
const PriorityHighIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3.5" y="9.5" width="2.2" height="3" rx="0.5" fill="currentColor" />
    <rect x="6.9" y="7.5" width="2.2" height="5" rx="0.5" fill="currentColor" />
    <rect x="10.3" y="5.5" width="2.2" height="7" rx="0.5" fill="currentColor" />
  </svg>
);

export default PriorityHighIcon;


