import React from "react";

// Backlog status icon: circular ring made of evenly spaced dots (Linear-like)
// Matches 16x16 sizing used across the app icons
export const BacklogIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 12 evenly spaced dots around a circle */}
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * Math.PI * 2) / 12;
      const cx = 7 + Math.cos(angle) * 5.2;
      const cy = 7 + Math.sin(angle) * 5.2;
      const r = i === 0 ? 1.4 : 1; // slightly brighter/different leading dot look
      return <circle key={i} cx={cx} cy={cy} r={r} fill="currentColor" />;
    })}
  </svg>
);

export default BacklogIcon;


