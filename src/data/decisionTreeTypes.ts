// src/data/decisionTreeTypes.ts

export type ResultColor = "green" | "blue" | "orange" | "red";

export type Option = {
  label: string;
  next: string;
};

export interface Result {
  title: string;
  rights: string[];
  law: string;
  color: ResultColor;
  warning?: string | null;
}

export interface Node {
  question?: string;
  hint?: string;
  options?: Option[];
  result?: Result;
}
