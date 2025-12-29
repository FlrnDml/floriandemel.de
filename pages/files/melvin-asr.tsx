import type { NextPage } from "next";
import Section from "../../components/Section";
import { FaCode } from "react-icons/fa";

const MelvinASR: NextPage = () => {
  return (
    <div className="editor-buffer">
      <h1>melvin-asr.md</h1>
      <p>
        Contributor to Melvin ASR, a scientific approach to Automatic Speech
        Recognition. Project developed as part of university research combining
        artificial intelligence and voice technology.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <a
          href="https://github.com/shuffle-project/melvin-asr"
          className="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaCode style={{ marginRight: "0.5rem" }} /> git checkout repo
        </a>
      </div>
    </div>
  );
};

export default MelvinASR;
