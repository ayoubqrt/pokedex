import { style } from "@vanilla-extract/css";

export const EvolutionStyle = style({
  ":hover": {
    transform: "scale(1.1)",
    transitionDuration: "0.2s",
  },
  cursor: "pointer",
});
