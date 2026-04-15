type BackgroundGridProps = {
  density?: number;
  showDots?: boolean;
  showNoise?: boolean;
};

const backgroundGridVars = {
  canvas: "var(--hero-grid-canvas)",
  line: "var(--hero-grid-line)",
  glowStrong: "var(--hero-grid-glow-strong)",
  glowSoft: "var(--hero-grid-glow-soft)",
  dot: "var(--hero-grid-dot)",
  accentGlowA: "var(--hero-grid-accent-glow-a)",
  accentGlowB: "var(--hero-grid-accent-glow-b)",
  accentGlowC: "var(--hero-grid-accent-glow-c)",
  noiseDark: "var(--hero-grid-noise-dark)",
  noiseLight: "var(--hero-grid-noise-light)",
  noiseMid: "var(--hero-grid-noise-mid)",
  accent: "var(--hero-grid-accent)",
  accentRing: "var(--hero-grid-accent-ring)",
  accentShadow: "var(--hero-grid-accent-shadow)",
  clusterPrimary: "var(--hero-grid-cluster-primary)",
  clusterSecondary: "var(--hero-grid-cluster-secondary)",
  clusterShadow: "var(--hero-grid-cluster-shadow)",
};

const accentDots = [
  { left: "12%", top: "18%", size: 8, opacity: 0.85 },
  { left: "82%", top: "24%", size: 10, opacity: 0.9 },
  { left: "68%", top: "72%", size: 7, opacity: 0.8 },
  { left: "26%", top: "78%", size: 9, opacity: 0.75 },
];

const pixelClusters = [
  { left: "18%", top: "58%", scale: 1 },
  { left: "74%", top: "16%", scale: 0.9 },
  { left: "88%", top: "62%", scale: 1.1 },
];

const BackgroundGrid = ({
  density = 96,
  showDots = true,
  showNoise = true,
}: BackgroundGridProps) => {
  const clampedDensity = Math.min(120, Math.max(80, density));
  const dotSpacing = Math.max(16, Math.min(24, Math.round(clampedDensity / 5)));

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ backgroundColor: backgroundGridVars.canvas }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            `linear-gradient(to right, ${backgroundGridVars.line} 1px, transparent 1px)`,
            `linear-gradient(to bottom, ${backgroundGridVars.line} 1px, transparent 1px)`,
            `radial-gradient(circle at top left, ${backgroundGridVars.glowStrong}, transparent 38%)`,
            `radial-gradient(circle at bottom right, ${backgroundGridVars.glowSoft}, transparent 42%)`,
          ].join(","),
          backgroundSize: `${clampedDensity}px ${clampedDensity}px, ${clampedDensity}px ${clampedDensity}px, 100% 100%, 100% 100%`,
          backgroundPosition: "0 0, 0 0, 0 0, 0 0",
        }}
      />

      {showDots ? (
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.2,
            backgroundImage: `radial-gradient(circle, ${backgroundGridVars.dot} 1px, transparent 1.2px)`,
            backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
            backgroundPosition: "0 0",
          }}
        />
      ) : null}

      <div
        className="absolute inset-0"
        style={{
          background: [
            `radial-gradient(circle at 18% 20%, ${backgroundGridVars.accentGlowA}, transparent 16%)`,
            `radial-gradient(circle at 80% 22%, ${backgroundGridVars.accentGlowB}, transparent 12%)`,
            `radial-gradient(circle at 70% 70%, ${backgroundGridVars.accentGlowC}, transparent 14%)`,
          ].join(","),
        }}
      />

      {showNoise ? (
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.07,
            mixBlendMode: "soft-light",
            backgroundImage: [
              `radial-gradient(circle at 20% 20%, ${backgroundGridVars.noiseDark} 0.6px, transparent 0.8px)`,
              `radial-gradient(circle at 80% 30%, ${backgroundGridVars.noiseLight} 0.7px, transparent 0.9px)`,
              `radial-gradient(circle at 40% 70%, ${backgroundGridVars.noiseMid} 0.6px, transparent 0.8px)`,
            ].join(","),
            backgroundSize: "18px 18px, 24px 24px, 22px 22px",
            backgroundPosition: "0 0, 8px 10px, 12px 4px",
          }}
        />
      ) : null}

      <div className="absolute inset-0">
        {accentDots.map((dot) => (
          <span
            key={`${dot.left}-${dot.top}`}
            className="absolute rounded-full"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              opacity: dot.opacity,
              backgroundColor: backgroundGridVars.accent,
              boxShadow: `0 0 0 4px ${backgroundGridVars.accentRing}, 0 0 18px ${backgroundGridVars.accentShadow}`,
              filter: "blur(0.2px)",
            }}
          />
        ))}

        {pixelClusters.map((cluster) => (
          <div
            key={`${cluster.left}-${cluster.top}`}
            className="absolute grid grid-cols-3 gap-[3px]"
            style={{
              left: cluster.left,
              top: cluster.top,
              transform: `scale(${cluster.scale})`,
              filter: `drop-shadow(0 0 10px ${backgroundGridVars.clusterShadow})`,
            }}
          >
            {Array.from({ length: 9 }).map((_, index) => (
              <span
                key={index}
                className="h-[3px] w-[3px] rounded-[1px]"
                style={{
                  backgroundColor: index % 4 === 0
                    ? backgroundGridVars.clusterPrimary
                    : backgroundGridVars.clusterSecondary,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundGrid;