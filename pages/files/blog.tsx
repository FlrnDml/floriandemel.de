import type { NextPage } from "next";
import { FaLink } from "react-icons/fa";

const Blog: NextPage = () => {
  return (
    <div className="editor-buffer">
      <h1>BLOG.md</h1>
      <p>
        On my personal blog, I document and structure my latest technical
        discoveries. My goal is to break down complex topics into clear,
        actionable guides that help others navigate issues I already solved.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <a
          href="https://dev.to/flrndml"
          className="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLink style={{ marginRight: "0.5rem" }} /> curl dev.to
        </a>
      </div>
    </div>
  );
};

export default Blog;
