const Logo = ({ darkMode }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="glow-dark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff0000ff" />
        <stop offset="50%" stopColor="#ffcc00ff" />
        <stop offset="100%" stopColor="#ff9500ff" />
      </linearGradient>

      <linearGradient id="glow-light" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#222222" />
        <stop offset="50%" stopColor="#2e2f6a" />
        <stop offset="100%" stopColor="#3b40a5" />
      </linearGradient>
    </defs>

    <circle
      className="glow-stroke"
      cx="32"
      cy="32"
      r="30"
      stroke={`url(#${darkMode ? "glow-dark" : "glow-light"})`}
      strokeWidth="3"
      fill="none"
    />

    <g id="spin">
      <text
        x="32"
        y="36"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Segoe UI, sans-serif"
        fontSize="32"
        fontWeight="bold"
        fill={`url(#${darkMode ? "glow-dark" : "glow-light"})`}
      >
        Tx
      </text>
    </g>

    <style>
      {`
        #spin {
          transform-origin: 32px 32px;
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}
    </style>
  </svg>
);

export default Logo;
