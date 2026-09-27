import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} Florian Demel</span>
      <nav>
        <Link href="/impressum">Impressum</Link>
        <Link href="/datenschutz">Datenschutz</Link>
      </nav>
    </footer>
  );
};

export default Footer;
