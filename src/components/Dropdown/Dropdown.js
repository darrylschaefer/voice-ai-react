import React, { useState, useEffect, useRef } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon } from "@radix-ui/react-icons";

import styles from "@/styles/DropdownMenu.module.css";
import ThresholdSlider from "/src/components/Dropdown/ThresholdSlider";
import MicQuietSlider from "./MicQuietSlider";
import { Settings } from "react-feather";
import promptOptions from "/src/promptOptions.js"

const Dropdown = ({
  currentSession: currentSession,
  detectionSettings: detectionSettings,
  voiceNames: voiceNames,
  voiceId: voiceId,
  rerender: rerender,
  setRerender: setRerender,
  sessionMessages: sessionMessages,
  setActivityDetection: setActivityDetection,
  micQuiet: micQuiet,
  resetPlaceholderPrompt: resetPlaceholderPrompt,
  promptSettings: promptSettings,
  selectedPrompt: selectedPrompt,
}) => {
  
  
  function abandonSession() {
    setActivityDetection(0);
      if (currentSession.current == null) {
        sessionMessages.current.push({
          role: "system",
          content: "No session.",
        });
        setRerender(rerender + 1);
        return;
      } else {
     resetPlaceholderPrompt();
    currentSession.current.stop();
    currentSession.current = null;
}
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.IconButton} aria-label="Customise options">
          <Settings size={24} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.DropdownMenuContent}
          sideOffset={5}
        >
          <DropdownMenu.Item
            onSelect={abandonSession}
            className={styles.DropdownMenuItem}
          >
            Abandon Session
          </DropdownMenu.Item>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={styles.DropdownMenuSubTrigger}>
              Voices
              <div className={styles.RightSlot}>
                <ChevronRightIcon />
              </div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className={styles.DropdownMenuSubContent}
                sideOffset={2}
                alignOffset={-5}
              >
                <DropdownMenu.Label className={styles.DropdownMenuLabel}>
                  Amazon Polly
                </DropdownMenu.Label>

                {voiceNames.options.map((name, i) => (
                  <DropdownMenu.CheckboxItem
                    key={i}
                    className={styles.DropdownMenuItem}
                    checked={name.label === voiceId.current}
                    onSelect={() => {
                      voiceId.current = name.label;
                      setRerender(rerender + 1);
                    }}
                  >
                    <DropdownMenu.ItemIndicator
                      className={styles.DropdownMenuItemIndicator}
                    >
                      <CheckIcon />
                    </DropdownMenu.ItemIndicator>
                    {name.label}
                  </DropdownMenu.CheckboxItem>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator className={styles.Separator} />

          
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={styles.DropdownMenuSubTrigger}>
              Prompt Selection
              <div className={styles.RightSlot}>
                <ChevronRightIcon />
              </div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className={styles.DropdownMenuSubContent}
                sideOffset={2}
                alignOffset={-5}
              >
                <DropdownMenu.Label className={styles.DropdownMenuLabel}>
                  Prompts
                </DropdownMenu.Label>
                {promptOptions.map((prompt, i) => (
                  <DropdownMenu.CheckboxItem
                    key={i}
                    className={styles.DropdownMenuItem}
                    checked={prompt.prompt === selectedPrompt.current}
                    onSelect={() => {
                      abandonSession();
                      selectedPrompt.current = prompt.prompt;
                      resetPlaceholderPrompt();
                    }}
                  >
                    <DropdownMenu.ItemIndicator
                      className={styles.DropdownMenuItemIndicator}
                    >
                      <CheckIcon />
                    </DropdownMenu.ItemIndicator>
                    {prompt.label}
                  </DropdownMenu.CheckboxItem>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator className={styles.Separator} />


          <DropdownMenu.Label className={styles.DropdownMenuLabel}>
            Personality
          </DropdownMenu.Label>

          {promptSettings.current.personalityOptions.map((type, i) => (
            <DropdownMenu.CheckboxItem
              key={i}
              className={styles.DropdownMenuCheckboxItem}
              checked={type.enabled}
              onCheckedChange={(value) => {
                // set all personality options to false
                promptSettings.current.personalityOptions.forEach(
                  (option) => {
                    option.enabled = false;
                  }
                );
                // set the selected personality option to true
                promptSettings.current.personalityOptions[i].enabled = true;
                setRerender(rerender + 1);
              }}
            >
              <DropdownMenu.ItemIndicator
                className={styles.DropdownMenuItemIndicator}
              >
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              {type.label}
            </DropdownMenu.CheckboxItem>
          ))}

          <DropdownMenu.Separator className={styles.Separator} />

          <DropdownMenu.CheckboxItem
            className={styles.DropdownMenuCheckboxItem}
            checked={detectionSettings.current.activityDetection}
            onCheckedChange={(value) => {
              detectionSettings.current.activityDetection = value;
              console.log(value);
              setRerender(rerender + 1);
            }}
          >
            <DropdownMenu.ItemIndicator
              className={styles.DropdownMenuItemIndicator}
            >
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            Automatic Detection
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Separator className={styles.Separator} />

          <DropdownMenu.Label className={styles.DropdownMenuLabel}>
            Voice Threshold (
            {detectionSettings.current.activityDetectionThreshold})
            <ThresholdSlider
              detectionSettings={detectionSettings}
              setRerender={setRerender}
              rerender={rerender}
            ></ThresholdSlider>
          </DropdownMenu.Label>
          <DropdownMenu.Separator className={styles.Separator} />

          <DropdownMenu.Label className={styles.DropdownMenuLabel}>
            Mic Pause Timer ({micQuiet.current}ms)
            <MicQuietSlider
              setRerender={setRerender}
              rerender={rerender}
              micQuiet={micQuiet}
            ></MicQuietSlider>
          </DropdownMenu.Label>

          <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
