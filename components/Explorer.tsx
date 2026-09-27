import React from "react";
import Link from "next/link";
import { FaRegFolderOpen, FaHome } from "react-icons/fa";

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
        </div>
      </div>
    </div>
  );
};

export default Explorer;
