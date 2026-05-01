import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";

const STORAGE_KEY = "henry-site-content-v1";
const AUTH_KEY = "henry-site-auth-v1";
const PASSWORD = "henry2026";

type ContentMap = Record<string, string>;

interface EditCtx {
  isEditing: boolean;
  enterEditing: (password: string) => boolean;
  exitEditing: () => void;
  resetAll: () => void;
  get: (key: string, fallback: string) => string;
  set: (key: string, value: string) => void;
}

const Ctx = createContext<EditCtx | null>(null);

export const EditableProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ContentMap>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setContent(JSON.parse(raw));
      if (sessionStorage.getItem(AUTH_KEY) === "1") setIsEditing(true);
    } catch {}
  }, []);

  const persist = useCallback((next: ContentMap) => {
    setContent(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  }, []);

  const enterEditing = useCallback((password: string) => {
    if (password === PASSWORD) {
      setIsEditing(true);
      try { sessionStorage.setItem(AUTH_KEY, "1"); } catch {}
      return true;
    }
    return false;
  }, []);

  const exitEditing = useCallback(() => {
    setIsEditing(false);
    try { sessionStorage.removeItem(AUTH_KEY); } catch {}
  }, []);

  const resetAll = useCallback(() => {
    persist({});
  }, [persist]);

  const get = useCallback((key: string, fallback: string) => {
    return content[key] ?? fallback;
  }, [content]);

  const set = useCallback((key: string, value: string) => {
    persist({ ...content, [key]: value });
  }, [content, persist]);

  return (
    <Ctx.Provider value={{ isEditing, enterEditing, exitEditing, resetAll, get, set }}>
      {children}
    </Ctx.Provider>
  );
};

export const useEditable = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useEditable must be used within EditableProvider");
  return ctx;
};
