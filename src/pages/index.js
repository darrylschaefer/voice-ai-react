import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState, useEffect } from "react";
import Console from "src/components/Console";

const MediaStreamWrapper = ({ children }) => {
  const [userMediaStream, setUserMediaStream] = useState(null);

  useEffect(() => {
    // Initialize getUserMedia on component mount
    const initMediaStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      setUserMediaStream(stream);
    };

    initMediaStream();
  }, []);

  return children({ userMediaStream, setUserMediaStream });
};

export default function Home() {
 
  return (
    <>
      <Head>
        <title>voice-ai react</title>
        <meta name="description" content="voice-ai react" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <MediaStreamWrapper>
            {({ userMediaStream }) => (
              <>
                <Console
                  userMediaStream={userMediaStream}
                ></Console>
              </>
            )}
          </MediaStreamWrapper>
        </div>
      </main>
    </>
  );
}
