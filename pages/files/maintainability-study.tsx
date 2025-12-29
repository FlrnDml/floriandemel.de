import type { NextPage } from "next";
import Section from "../../components/Section";
import { FaDownload } from "react-icons/fa";

const MaintainabilityStudy: NextPage = () => {
  return (
    <div className="editor-buffer">
      <h1>maintainability-study.pdf</h1>
      <p>
        Research paper on software maintainability metrics based on my master's
        thesis. Explores innovative approaches to measuring and improving system
        maintainability through theory-driven metrics.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <a
          href="https://github.com/FlrnDml/floriandemel.de/blob/f6b9944ac48f5c2abf4fac6013b0ccdbb835b638/Case-Study-Measuring-Maintainability_Florian%20Demel.pdf"
          className="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDownload style={{ marginRight: "0.5rem" }} /> cat full-paper.pdf
        </a>
      </div>
    </div>
  );
};

export default MaintainabilityStudy;
