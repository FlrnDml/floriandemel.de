import Link from "next/link";
import React, { ReactNode } from "react";

interface FooterProps {}

/**
 * A component of the index page,
 * Displays options to the side
 **/
const Footer: React.FC<FooterProps> = () => {
  return (
    <div className={`footer`}>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Florian Demel. All rights reserved.</p>
        <p>
          <Link
            href="/impressum"
            style={{ marginRight: "1rem", color: "var(--text-secondary)" }}
          >
            Impressum
          </Link>
          <Link href="/datenschutz" style={{ color: "var(--text-secondary)" }}>
            Datenschutz
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
