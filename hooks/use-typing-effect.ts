"use client";

import { useEffect, useMemo, useState } from "react";

export function useTypingEffect(items: string[], speed = 90, pause = 1200) {
  const values = useMemo(() => items.filter(Boolean), [items]);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!values.length) return;
    const current = values[index % values.length];
    const timeout = setTimeout(
      () => {
        if (!deleting && text === current) {
          setDeleting(true);
          return;
        }
        if (deleting && text === "") {
          setDeleting(false);
          setIndex((prev) => prev + 1);
          return;
        }
        setText((prev) =>
          deleting ? prev.slice(0, Math.max(prev.length - 1, 0)) : current.slice(0, prev.length + 1),
        );
      },
      text === current && !deleting ? pause : speed,
    );
    return () => clearTimeout(timeout);
  }, [deleting, index, pause, speed, text, values]);

  return text;
}
