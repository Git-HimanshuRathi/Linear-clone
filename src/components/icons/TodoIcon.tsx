import React from "react";

// Hollow circle status icon (Todo)
const TodoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

export default TodoIcon;


