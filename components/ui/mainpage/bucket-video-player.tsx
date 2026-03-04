"use client";

import { Box, AspectRatio, Slider as ChakraSlider } from "@chakra-ui/react";
import { useRef, useEffect, useState, useCallback } from "react";
import { Play, Pause, SpeakerHigh, SpeakerSlash, ArrowsOut } from "@phosphor-icons/react";
import { PopoverRoot, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface BucketVideoPlayerProps {
  /** Vollständige URL zum MP4 (z. B. Hetzner Object Storage) */
  src: string;
  /** Optional: Callback mit aktueller Abspielposition in Sekunden (für Notizen-Zeitstempel) */
  onTimeUpdate?: (currentTime: number) => void;
  /** Maximale Breite (z. B. "4xl", "6xl", "full") – "full" für großen Player */
  maxWidth?: string;
  /** Dauer in Minuten (für Timeline-Anzeige) */
  durationMinutes?: number;
  /** Startposition in Sekunden (z. B. aus gespeichertem Fortschritt) */
  initialSeekSeconds?: number;
}

const videoBoxStyles = {
  borderRadius: "l3",
  boxShadow:
    "0 1px 12px -2px rgba(0, 0, 0, 0.06), 0 2px 24px -4px rgba(0, 0, 0, 0.04), 0 0 0 0.5px rgba(255, 255, 255, 0.04) inset, 0 0 24px -4px rgba(34, 197, 94, 0.12)",
  border: "1px solid",
  borderColor: "border.emphasized/50",
  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  _hover: {
    boxShadow:
      "0 2px 16px -2px rgba(0, 0, 0, 0.08), 0 4px 32px -4px rgba(0, 0, 0, 0.06), 0 0 0 0.5px rgba(255, 255, 255, 0.05) inset, 0 0 28px -4px rgba(34, 197, 94, 0.15)",
  },
  overflow: "hidden",
  bg: "black",
};

/** Brand green – entspricht theme green.600 (#059669) */
const BRAND_GREEN = "#059669";

export const BucketVideoPlayer = ({
  src,
  onTimeUpdate,
  maxWidth = "4xl",
  durationMinutes,
  initialSeekSeconds = 0,
}: BucketVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [initialSeekDone, setInitialSeekDone] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSeconds = duration > 0 ? duration : (durationMinutes ?? 0) * 60;
  const progressPercent = totalSeconds > 0 ? Math.min((currentTime / totalSeconds) * 100, 100) : 0;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onTimeUpdate) return;
    const handleTimeUpdate = () => {
      const t = Math.floor(video.currentTime);
      setCurrentTime(video.currentTime);
      onTimeUpdate(t);
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [onTimeUpdate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      if (initialSeekSeconds > 0 && !initialSeekDone) {
        video.currentTime = initialSeekSeconds;
        setCurrentTime(initialSeekSeconds);
        setInitialSeekDone(true);
      }
    };
    const handleDurationChange = () => setDuration(video.duration);
    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [initialSeekSeconds, initialSeekDone]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = muted ? 0 : volume;
  }, [volume, muted]);

  const handleVolumeChange = useCallback((details: { value: number[] }) => {
    const v = details.value[0] ?? 0;
    setVolume(v);
    setMuted(v === 0);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const handleTimelineClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const video = videoRef.current;
      if (!video || totalSeconds <= 0) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const ratio = x / rect.width;
      const seekTo = ratio * totalSeconds;
      video.currentTime = seekTo;
      setCurrentTime(seekTo);
    },
    [totalSeconds]
  );

  const ratioBoxProps = { ratio: 16 / 9, w: "full" as const, mx: "auto" as const, ...(maxWidth !== "full" ? { maxW: maxWidth } : {}) };

  if (!src) {
    return (
      <AspectRatio {...ratioBoxProps}>
        <Box {...videoBoxStyles} display="flex" alignItems="center" justifyContent="center" color="white">
          Kein Video
        </Box>
      </AspectRatio>
    );
  }

  return (
    <AspectRatio {...ratioBoxProps}>
      <Box
        ref={containerRef}
        {...videoBoxStyles}
        w="full"
        h="full"
        position="relative"
        sx={{
          "&:fullscreen": {
            width: "100vw",
            height: "100vh",
            background: "black",
          },
          "&:fullscreen video": {
            objectFit: "contain",
          },
        }}
      >
        <video
          ref={videoRef}
          src={src}
          controls={false}
          controlsList="nodownload"
          preload="auto"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            imageRendering: "auto",
          }}
          playsInline
          onClick={togglePlay}
        />
        {/* Custom Control Bar: Play, Timeline, Volume, Vollbild */}
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          bg="linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
          pt="6"
          pb="2"
          px="2"
          display="flex"
          flexDirection="column"
          gap="2"
        >
          <Box
            display="flex"
            alignItems="center"
            gap="2"
            onClick={(e) => e.stopPropagation()}
          >
            <Box
              as="button"
              type="button"
              onClick={togglePlay}
              color="white"
              p="0.5"
              borderRadius="sm"
              _hover={{ bg: "white/15" }}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
            </Box>
            {/* Grüne Timeline – klickbar zum Suchen */}
            <Box
              flex="1"
              h="4px"
              borderRadius="full"
              bg="rgba(255,255,255,0.3)"
              cursor="pointer"
              position="relative"
              overflow="hidden"
              onClick={handleTimelineClick}
            >
              <Box
                position="absolute"
                left="0"
                top="0"
                bottom="0"
                w={`${progressPercent}%`}
                bg={BRAND_GREEN}
                borderRadius="full"
                transition="width 0.1s linear"
                pointerEvents="none"
              />
            </Box>
            {/* Volume – Klick öffnet dezenten Slider direkt über dem Icon */}
            <PopoverRoot positioning={{ placement: "top", gutter: 4 }}>
              <PopoverTrigger asChild>
                <Box
                  as="button"
                  type="button"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  color="white"
                  p="0.5"
                  borderRadius="sm"
                  _hover={{ bg: "white/15" }}
                  aria-label="Lautstärke"
                >
                  {muted || volume === 0 ? (
                    <SpeakerSlash size={14} weight="fill" />
                  ) : (
                    <SpeakerHigh size={14} weight="fill" />
                  )}
                </Box>
              </PopoverTrigger>
              <PopoverContent
                p="1.5"
                w="auto"
                minW="unset"
                maxW="unset"
                bg="rgba(0,0,0,0.75)"
                backdropFilter="blur(8px)"
                borderWidth="1px"
                borderColor="white/15"
                shadow="sm"
                borderRadius="md"
                _focusVisible={{ outline: "none" }}
                onClick={(e) => e.stopPropagation()}
              >
                <ChakraSlider.Root
                  min={0}
                  max={1}
                  step={0.05}
                  value={[muted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  orientation="vertical"
                  colorPalette="green"
                  size="sm"
                  h="52px"
                  aria-label="Lautstärke"
                  sx={{
                    "& [data-part=track]": { w: "4px", borderRadius: "full" },
                    "& [data-part=thumb]": { w: "10px", h: "10px" },
                  }}
                >
                  <ChakraSlider.Control>
                    <ChakraSlider.Track>
                      <ChakraSlider.Range />
                    </ChakraSlider.Track>
                    <ChakraSlider.Thumb index={0}>
                      <ChakraSlider.HiddenInput />
                    </ChakraSlider.Thumb>
                  </ChakraSlider.Control>
                </ChakraSlider.Root>
              </PopoverContent>
            </PopoverRoot>
            {/* Vollbild */}
            <Box
              as="button"
              type="button"
              onClick={toggleFullscreen}
              color="white"
              p="0.5"
              borderRadius="sm"
              _hover={{ bg: "white/15" }}
              aria-label={isFullscreen ? "Vollbild beenden" : "Vollbild"}
            >
              <ArrowsOut size={14} weight="bold" />
            </Box>
          </Box>
        </Box>
      </Box>
    </AspectRatio>
  );
};
