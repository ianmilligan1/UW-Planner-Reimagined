import { useState, useCallback } from "react";
import { INITIAL_INITIATIVES } from "../constants";

const STORAGE_KEY = "uw-planner-initiatives";

function loadInitiatives() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Fall through to default
  }
  return INITIAL_INITIATIVES;
}

function save(initiatives) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initiatives));
}

export function useInitiatives() {
  const [initiatives, setInitiatives] = useState(loadInitiatives);

  const addInitiative = useCallback((initiative) => {
    setInitiatives((prev) => {
      const next = [...prev, { ...initiative, id: initiative.id || Date.now() }];
      save(next);
      return next;
    });
  }, []);

  const updateInitiative = useCallback((updated) => {
    setInitiatives((prev) => {
      const next = prev.map((i) => (i.id === updated.id ? updated : i));
      save(next);
      return next;
    });
  }, []);

  const deleteInitiative = useCallback((id) => {
    setInitiatives((prev) => {
      const next = prev.filter((i) => i.id !== id);
      save(next);
      return next;
    });
  }, []);

  const resetInitiatives = useCallback(() => {
    save(INITIAL_INITIATIVES);
    setInitiatives(INITIAL_INITIATIVES);
  }, []);

  return { initiatives, addInitiative, updateInitiative, deleteInitiative, resetInitiatives };
}
