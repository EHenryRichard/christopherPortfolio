'use client';

import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import {
  IoContract,
  IoExpand,
  IoPause,
  IoPlay,
  IoVolumeHigh,
  IoVolumeMute,
} from 'react-icons/io5';
import './CustomVideoPlayer.css';

type CustomVideoPlayerProps = {
  src: string;
  poster?: string;
  title: string;
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) {
    return '0:00';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');

  return `${minutes}:${remainingSeconds}`;
};

const SKIP_SECONDS = 10;

const CustomVideoPlayer = ({ src, poster, title }: CustomVideoPlayerProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === wrapperRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      video.muted = false;
      video.volume = volume > 0 ? volume : 1;
      setIsMuted(false);
      setVolume(video.volume);

      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.error(error);
      }

      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  const handleSeek = (value: string) => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const nextTime = Number(value);
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const skipVideo = (seconds: number) => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const nextTime = Math.min(Math.max(video.currentTime + seconds, 0), video.duration || 0);
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const isRangeInput = target.tagName === 'INPUT';

    if (isRangeInput) {
      return;
    }

    if (event.code === 'Space') {
      event.preventDefault();
      togglePlay();
    }

    if (event.code === 'ArrowLeft') {
      event.preventDefault();
      skipVideo(-SKIP_SECONDS);
    }

    if (event.code === 'ArrowRight') {
      event.preventDefault();
      skipVideo(SKIP_SECONDS);
    }
  };

  const handleVolumeChange = (value: string) => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const nextVolume = Number(value);
    video.volume = nextVolume;
    video.muted = nextVolume === 0;
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const nextMuted = !video.muted;
    video.muted = nextMuted;

    if (!nextMuted && video.volume === 0) {
      video.volume = 1;
      setVolume(1);
    }

    setIsMuted(nextMuted);
  };

  const toggleFullscreen = async () => {
    if (!wrapperRef.current) {
      return;
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await wrapperRef.current.requestFullscreen();
  };

  return (
    <div
      ref={wrapperRef}
      className={`custom-video-player ${isPortrait ? 'is-portrait' : ''}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="custom-video-stage">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="custom-video-element"
          playsInline
          preload="metadata"
          onClick={togglePlay}
          onLoadStart={() => setIsBuffering(true)}
          onLoadedMetadata={(event) => {
            const video = event.currentTarget;
            video.muted = false;
            video.volume = 1;
            setDuration(video.duration);
            setIsMuted(false);
            setVolume(1);
            setIsPortrait(video.videoHeight > video.videoWidth);
          }}
          onCanPlay={() => setIsBuffering(false)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onVolumeChange={(event) => {
            setIsMuted(event.currentTarget.muted);
            setVolume(event.currentTarget.volume);
          }}
          onWaiting={() => setIsBuffering(true)}
          onSeeking={() => setIsBuffering(true)}
          onSeeked={() => setIsBuffering(false)}
          onPlaying={() => {
            setIsPlaying(true);
            setIsBuffering(false);
          }}
          onPlay={() => {
            setIsPlaying(true);
            setIsBuffering(false);
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
        {isBuffering && !isPlaying && <span className="custom-video-loader" />}

        {!isPlaying && !isBuffering && (
          <button
            type="button"
            className="custom-video-big-play"
            onClick={togglePlay}
            aria-label={`Play ${title}`}
          >
            <IoPlay />
          </button>
        )}

        <div className="custom-video-controls">
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={(event) => handleSeek(event.target.value)}
            className="custom-video-progress"
            aria-label="Seek video"
          />

          <div className="custom-video-control-row">
            <button
              type="button"
              onClick={togglePlay}
              className="custom-video-icon-button"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <IoPause /> : <IoPlay />}
            </button>

            <span className="custom-video-time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="custom-video-spacer" />

            <button
              type="button"
              onClick={toggleMute}
              className="custom-video-icon-button"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted || volume === 0 ? <IoVolumeMute /> : <IoVolumeHigh />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(event) => handleVolumeChange(event.target.value)}
              className="custom-video-volume"
              aria-label="Video volume"
            />

            <button
              type="button"
              onClick={toggleFullscreen}
              className="custom-video-icon-button"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? <IoContract /> : <IoExpand />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
