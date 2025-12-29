import React from "react";
import Link from "next/link";
import {
  FaRegFolderOpen,
  FaRegFileCode,
  FaRegFilePdf,
  FaHome,
} from "react-icons/fa";

const Explorer: React.FC = () => {
  return (
    <div className="explorer">
      <div className="explorer-header">
        <span>EXPLORER</span>
      </div>

      <div className="explorer-section">
        <div className="explorer-item folder">
          <FaRegFolderOpen className="icon" />
          <span>floriandemel.de</span>
        </div>

        <div className="explorer-tree">
          <Link href="/" className="explorer-item file">
            <FaHome className="icon home-icon" />
            <span>index.tsx</span>
          </Link>

          <div className="explorer-item folder-sub">
            <FaRegFolderOpen className="icon" />
            <span>projects</span>
          </div>

          <div className="explorer-tree-sub">
            <Link href="/files/melvin-asr" className="explorer-item file">
              <FaRegFileCode className="icon code-icon" />
              <span>melvin-asr.md</span>
            </Link>

            <Link
              href="/files/maintainability-study"
              className="explorer-item file"
            >
              <FaRegFilePdf className="icon pdf-icon" />
              <span>maintainability.pdf</span>
            </Link>

            <Link href="/files/blog" className="explorer-item file">
              <FaRegFilePdf className="icon pdf-icon" />
              <span>BLOG.md</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;

