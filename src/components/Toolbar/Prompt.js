import React from "react";
import styles from "@/styles/Toolbar.module.css";
import { FileText } from "react-feather";

const Prompt = ({
  setPromptOpen: setPromptOpen,
  rerender: rerender,
  setRerender: setRerender,
}) => {
  function handlePromptSubmit() {
    setPromptOpen(true);
    setRerender(rerender + 1);
  }

  return (
    <div className={styles.ToolbarButton} onClick={handlePromptSubmit}>
      <div style={{ lineHeight: 1, display: "flex" }}>
        <FileText size={24} />
      </div>
    </div>
  );
};

export default Prompt;
