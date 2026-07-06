interface ScoreRingProps {
  score: number;
  size?: number;
  stroke?: number;
  label?: string;
  textSizeClass?: string;
}

function colorFor(score: number) {
  if (score >= 90) return "var(--chart-3)";
  if (score >= 70) return "var(--chart-4)";
  if (score >= 50) return "var(--chart-5)";
  return "var(--destructive)";
}

export function ScoreRing({
  score,
  size = 160,
  stroke = 12,
  label,
  textSizeClass,
}: ScoreRingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, score)) / 100) * c;
  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={colorFor(score)}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`${textSizeClass || "text-4xl"} font-bold tracking-tight`}>{score}</span>
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
    </div>
  );
}
