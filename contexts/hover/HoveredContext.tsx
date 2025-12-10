import React, { createContext, useContext, useState, ReactNode, useCallback, Dispatch, SetStateAction } from 'react';

// Only allow string | number | null for value
export type HoverableValue = string | number | null;

/**
 * HoveredContext is a simple context for hovered/selected/index state.
 * - Value is always `string | number | null`.
 * - If you need a more complex or non-nullable key, customize this file.
 */
type HoveredContextValue = {
  hovered: HoverableValue;
  setHovered: Dispatch<SetStateAction<HoverableValue>>;
};

const HoveredContext = createContext<HoveredContextValue | undefined>(undefined);

export function HoveredProvider({
  children,
  initialHovered = null,
}: {
  children: ReactNode;
  initialHovered?: HoverableValue;
}) {
  const [hovered, setHovered] = useState<HoverableValue>(initialHovered);
  return (
    <HoveredContext.Provider value={{ hovered, setHovered }}>
      {children}
    </HoveredContext.Provider>
  );
}

export function useHovered() {
  const ctx = useContext(HoveredContext);
  if (!ctx) {
    throw new Error('useHovered must be used within a HoveredProvider');
  }
  return ctx;
}

/**
 * Hoverable - Render-props for isHovered + setHovered.
 * @param hoveredValue: value to match for hover (number, string, null)
 */
export function Hoverable({
  hoveredValue,
  children,
  fallback,
}: {
  hoveredValue: HoverableValue;
  children: (isHovered: boolean, setHovered: (v: boolean) => void) => ReactNode;
  fallback?: ReactNode;
}) {
  const { hovered, setHovered } = useHovered();
  const isHovered = hovered === hoveredValue;
  
  const set = useCallback(
    (val: boolean) => setHovered(val ? hoveredValue : null),
    [hoveredValue, setHovered]
  );
  return <>{children(isHovered, set) ?? (!isHovered && fallback ? fallback : null)}</>;
}

export { HoveredContext };
