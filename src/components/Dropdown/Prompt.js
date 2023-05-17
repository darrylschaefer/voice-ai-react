import React, { useState, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import dialogStyles from "@/styles/Dialog.module.css";

const Prompt = ({
  selectedPrompt: selectedPrompt,
  promptOpen: promptOpen,
  setPromptOpen: setPromptOpen,
  rerender: rerender,
  setRerender: setRerender,
}) => {

  function exitPrompt() {
    setPromptOpen(false);
  }

  return (
    <Dialog.Root open={promptOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogStyles.DialogOverlay} />
        <Dialog.Content className={dialogStyles.DialogContent}>
          <Dialog.Title className={dialogStyles.DialogTitle}>
            Prompt
          </Dialog.Title>
          <Dialog.Description className={dialogStyles.DialogDescription}>
            Insert or edit the below prompt.
          </Dialog.Description>

          <fieldset className={dialogStyles.Fieldset}>
            <textarea
              className={dialogStyles.Input}
              id="sysprompt"
              value={selectedPrompt.current}
              onChange={(event) => {
                selectedPrompt.current = event.target.value;
                setRerender(rerender + 1);
              }}
            />
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button
                onClick={() => exitPrompt()}
                className={dialogStyles.Button}
              >
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild onClick={() => setPromptOpen(false)}>
            <button className={dialogStyles.IconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Prompt;
