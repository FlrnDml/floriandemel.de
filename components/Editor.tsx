import React, { ReactNode } from "react";
import { useRouter } from "next/router";

interface EditorProps {
  children: ReactNode;
}

const Editor: React.FC<EditorProps> = ({ children }) => {
  const router = useRouter();

  const getBufferName = (path: string) => {
    switch (path) {
      case "/":
        return "index.tsx";
      case "/files/melvin-asr":
        return "melvin-asr.md";
      case "/files/maintainability-study":
        return "maintainability.pdf";
      default:
        return path.split("/").pop() || "buffer";
    }
  };

  return (
    <div className="editor">
      <div className="editor-header">
        <div className="tab active">
          <span>{getBufferName(router.pathname)}</span>
        </div>
      </div>
      <div className="editor-content">{children}</div>
    </div>
  );
};

export default Editor;

