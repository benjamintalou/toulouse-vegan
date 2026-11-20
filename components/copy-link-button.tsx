"use client";

import { useState } from "react";

type CopyLinkButtonProps = {
  url: string;
  label: string;
  /** Shown for a moment once the link is in the clipboard. */
  copiedLabel: string;
  /**
   * When set, the device's share sheet is tried first (that is the only way to
   * hand a link to apps like Instagram); copying is the fallback.
   */
  share?: { title: string; text: string };
  className?: string;
  /** Icon shown before the label. */
  children?: React.ReactNode;
};

export function CopyLinkButton({ url, label, copiedLabel, share, className, children }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    if (share && navigator.share) {
      // Rejects when the visitor closes the sheet: nothing to report.
      await navigator.share({ ...share, url }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
