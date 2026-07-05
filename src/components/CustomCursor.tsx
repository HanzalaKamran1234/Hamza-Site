"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Expand cursor when hovering over interactive elements
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "SELECT" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer");

      if (isInteractive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-luxury-gold pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-33%",
          translateY: "-33%",
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? "rgba(197, 168, 128, 0.15)" : "rgba(197, 168, 128, 0)",
          borderColor: isHovered ? "#B8976C" : "#C5A880",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-luxury-gold rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "50%",
          translateY: "50%",
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
      />
    </>
  );
}
