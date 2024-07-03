import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// interface LayoutContextProps {
//   doctypeStatus: obj;
//   setDocTypeStatus: Dispatch<SetStateAction<string>>;
// }

const LayoutContext = createContext<any>(undefined);

const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [doctypeStatus, setDocTypeStatus] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <LayoutContext.Provider
      value={{ doctypeStatus, setDocTypeStatus, isExpanded, setIsExpanded }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutContext, LayoutProvider };
