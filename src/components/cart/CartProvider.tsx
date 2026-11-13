"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

export type CartLine = {
  key: string;
  handle: string;
  title: string;
  variantTitle: string;
  price: number;
  qty: number;
  image: string;
  /** Shopify variant id — needed to hand off to the real checkout. */
  variantId?: number;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
};

type CartAction =
  | { type: "add"; line: CartLine }
  | { type: "remove"; key: string }
  | { type: "setQty"; key: string; qty: number }
  | { type: "open" }
  | { type: "close" }
  | { type: "toggle" }
  | { type: "hydrate"; lines: CartLine[] };

const STORAGE_KEY = "asc.cart.v1";

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const existing = state.lines.find((l) => l.key === action.line.key);
      if (existing) {
        return {
          ...state,
          isOpen: true,
          lines: state.lines.map((l) =>
            l.key === action.line.key ? { ...l, qty: l.qty + action.line.qty } : l,
          ),
        };
      }
      return { ...state, isOpen: true, lines: [...state.lines, action.line] };
    }
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.key !== action.key) };
    case "setQty":
      return {
        ...state,
        lines: state.lines
          .map((l) => (l.key === action.key ? { ...l, qty: action.qty } : l))
          .filter((l) => l.qty > 0),
      };
    case "open":
      return { ...state, isOpen: true };
    case "close":
      return { ...state, isOpen: false };
    case "toggle":
      return { ...state, isOpen: !state.isOpen };
    case "hydrate":
      return { ...state, lines: action.lines };
    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  count: number;
  subtotal: number;
  add: (line: Omit<CartLine, "key"> & { key?: string }) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], isOpen: false });
  const [hydrated, setHydrated] = useState(false);

  // Restore from localStorage after mount so SSR markup matches.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          dispatch({ type: "hydrate", lines: parsed });
        }
      }
    } catch {
      // Corrupt or unavailable storage — start empty rather than crash.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      // Private mode / quota — cart still works for the session.
    }
  }, [state.lines, hydrated]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!state.isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [state.isOpen]);

  const add = useCallback((line: Omit<CartLine, "key"> & { key?: string }) => {
    const key = line.key ?? `${line.handle}::${line.variantTitle}`;
    dispatch({ type: "add", line: { ...line, key } });
  }, []);

  const remove = useCallback((key: string) => dispatch({ type: "remove", key }), []);
  const setQty = useCallback(
    (key: string, qty: number) => dispatch({ type: "setQty", key, qty }),
    [],
  );
  const open = useCallback(() => dispatch({ type: "open" }), []);
  const close = useCallback(() => dispatch({ type: "close" }), []);
  const toggle = useCallback(() => dispatch({ type: "toggle" }), []);

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = state.lines.reduce((n, l) => n + l.qty * l.price, 0);
    return {
      lines: state.lines,
      isOpen: state.isOpen,
      count,
      subtotal,
      add,
      remove,
      setQty,
      open,
      close,
      toggle,
    };
  }, [state.lines, state.isOpen, add, remove, setQty, open, close, toggle]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
