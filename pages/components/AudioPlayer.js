import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaPlay, FaPause, FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from "/styles/AudioPlayer.module.css";
import tracks from "./tracks";
// import win from "../assets/bigwin-logo.png";

const AudioPlayer = () => {
  //state
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const { title, artist, audioSrc, coverArt } = tracks[trackIndex];

  const chapters = [
    {
      start: 0,
      end: 25
    },
    {
      start: 26,
      end: 30
    },
    {
      start: 31,
      end: 35
    },

  ]

  // console.log(tracks);
  //references
  // const audioPlayer = useRef(); // audio component
  // const audioPlayer = useRef(new Audio(require(".//../assets/war.mp3")));
  const progressBar = useRef(); // progress bar
  const animationRef = useRef(); // reference the animation
  const audioPlayer = useRef();


  // effect
  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    console.log(prevValue);
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const forwardThirty = () => {

    progressBar.current.value = Number(progressBar.current.value) + 30;
    console.log(progressBar.current.value);
    changeRange();
  };

  const backwardThirty = () => {

    progressBar.current.value = Number(progressBar.current.value) - 30;

    changeRange();
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  return (
    <div className={styles.audioPlayer}>
      <div className={styles.imgContainer}>
        <Image layout="intrinsic" src={coverArt} alt="big win" className={styles.img} />
      </div>

      <h2 className={styles.title}>{title}</h2>
      <h4 className={styles.artist}>{artist}</h4>

      <audio ref={audioPlayer} src={audioSrc} preload="metadata"></audio>
      {/* progress bar time */}
      <div className={styles.progressBarContainer}>
        <input
          className={styles.progressBar}
          type="range"
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
        {chapters.map((chapter, i) => {
          const leftStyle = chapter.start / duration * 100;
          const widthStyle = (chapter.end - chapter.start) / duration * 100;
          console.table({ i, leftStyle, widthStyle });
          return (<div
            key={i}
            className={`${styles.chapter} ${chapter.start == 0 && styles.start} ${chapter.end == 0 && styles.end}`}
            style={{
              '--left': `${leftStyle}%`,
              '--width': `${widthStyle}%`,
            }}
          ></div>
          )
        })}
      </div>

      <div className={styles.progressBarTop}>
        {/* current time */}
        <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
        {/* duration */}
        <div className={styles.duration}>{calculateTime(duration)}</div>
      </div>
      <div className={styles.playersButton} >
        <button className={styles.forwardBackward} >
          <FaAngleDoubleLeft />{" "}
        </button>
        <button className={styles.forwardBackward} onClick={backwardThirty}>
          <FaAngleLeft />{" "}
        </button>
        <button className={styles.playPause} onClick={togglePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className={styles.forwardBackward} onClick={forwardThirty}>
          <FaAngleRight />
        </button>
        <button className={styles.forwardBackward}>
          <FaAngleDoubleRight />{" "}
        </button>
      </div>
    </div >
  );
};

export { AudioPlayer };
