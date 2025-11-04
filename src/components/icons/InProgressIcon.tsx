import React from "react";

// In Progress: neutral outer ring, inside RIGHT HALF filled yellow
const InProgressIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* base outer ring (yellow as requested) */}
    <circle cx="7" cy="7" r="5.25" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
    {/* inner right-half fill clipped to inner circle */}
    <defs>
      <clipPath id="inprogress-inner">
        <circle cx="7" cy="7" r="4" />
      </clipPath>
    </defs>
    <rect x="7" y="3" width="4" height="8" fill="#F59E0B" clipPath="url(#inprogress-inner)" />
  </svg>
);

export default InProgressIcon;


