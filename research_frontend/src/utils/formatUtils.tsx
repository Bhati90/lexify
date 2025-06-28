import React from "react";
import { Typography } from "@mui/material";

export const formatChatContent = (rawContent: string): React.ReactNode => {
  // Remove citation references like [2504.19997v1]
  const cleaned = rawContent;

  // Split into lines (if any), or manually chunk bullets
  const bulletRegex = /\*\*\s*(.+?)\s*\*\*:\s*/g;
  const result: React.ReactNode[] = [];

  // Get intro paragraph before first bullet
  const firstBulletIndex = cleaned.search(bulletRegex);
  const intro = firstBulletIndex !== -1 ? cleaned.slice(0, firstBulletIndex).trim() : cleaned;

  if (intro) {
    result.push(
      <Typography variant="body1" paragraph key="intro">
        {intro}
      </Typography>
    );
  }

  // Extract all bullet sections
  let match;
//   let lastIndex = firstBulletIndex;
  bulletRegex.lastIndex = firstBulletIndex;

  while ((match = bulletRegex.exec(cleaned)) !== null) {
    const title = match[1];
    const start = bulletRegex.lastIndex;
    const nextMatch = bulletRegex.exec(cleaned);
    const end = nextMatch ? nextMatch.index : cleaned.length;
    const content = cleaned.slice(start, end).trim();
    bulletRegex.lastIndex = start;

    result.push(
      <Typography variant="body1" paragraph key={title}>
        <strong>{title}:</strong> {content}
      </Typography>
    );

    if (nextMatch) {
      bulletRegex.lastIndex = nextMatch.index;
    }
  }

  return <div>{result}</div>;
};
