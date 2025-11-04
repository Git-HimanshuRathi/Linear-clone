import React from "react";

// Three vertical bars ascending height, centered (inherits currentColor)
const PriorityBarsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="8.5" width="1.6" height="2" rx="0.4" fill="currentColor" />
    <rect x="6.2" y="7" width="1.6" height="3.5" rx="0.4" fill="currentColor" />
    <rect x="9.4" y="5.5" width="1.6" height="5" rx="0.4" fill="currentColor" />
  </svg>
);

export default PriorityBarsIcon;


