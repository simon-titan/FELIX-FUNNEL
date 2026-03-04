"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Text,
  Card,
  Button,
  Stack,
  Box,
  HStack,
  VStack,
  Badge,
  Spinner,
  Alert,
  Textarea,
  Accordion,
} from "@chakra-ui/react";
import { Link } from "@/components/ui/link";
import {
  Play,
  CheckCircle,
  ArrowLeft,
} from "@phosphor-icons/react";
import { useAuth } from "@/components/provider/auth-provider";
import type { CourseModule, CourseVideo } from "@/app/api/course/modules/route";
import { CircularProgressChart } from "@/components/ui/circular-progress-chart";
import { BucketVideoPlayer } from "@/components/ui/mainpage/bucket-video-player";
import { CtaBetreuungBanner } from "@/components/cta-betreuung-banner";
import { formatDuration } from "@/utils/format";
import { getVideoUrl } from "../../data";

export default function VideoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getAccessToken } = useAuth();

  const [currentVideo, setCurrentVideo] = useState<CourseVideo | null>(null);
  const [module, setModule] = useState<CourseModule | null>(null);
  const [allModules, setAllModules] = useState<CourseModule[]>([]);
  const [progress, setProgress] = useState<Record<string, { watched_seconds: number; completed: boolean; last_watched_at: string }>>({});
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  // Notizen und Kommentare State
  const [notes, setNotes] = useState<{ id: string; content: string; timestamp_seconds: number | null; created_at: string }[]>([]);
  const [comments, setComments] = useState<{ id: string; content: string; created_at: string }[]>([]);
  const [noteContent, setNoteContent] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);

  const videoId = params.videoId as string;
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Lade alle Module und finde das aktuelle Video
  useEffect(() => {
    fetch("/api/course/modules")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load modules");
        return res.json();
      })
      .then((data: { modules: CourseModule[] }) => {
        setAllModules(data.modules ?? []);

        // Finde das aktuelle Video und sein Modul
        let foundVideo: CourseVideo | null = null;
        let foundModule: CourseModule | null = null;

        for (const mod of data.modules ?? []) {
          const video = mod.videos.find((v) => v.id === videoId);
          if (video) {
            foundVideo = video;
            foundModule = mod;
            break;
          }
        }

        if (foundVideo && foundModule) {
          setCurrentVideo(foundVideo);
          setModule(foundModule);
        } else {
          setError("Video nicht gefunden");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("[video-detail] modules error:", err);
        setError("Fehler beim Laden des Videos");
        setLoading(false);
      });
  }, [videoId]);

  // Lade Fortschritt
  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setLoadingProgress(false);
      return;
    }

    fetch("/api/course/progress", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load progress");
        return res.json();
      })
      .then((data: { progress: { video_id: string; watched_seconds: number; completed: boolean; last_watched_at: string }[] }) => {
        const progressMap: Record<string, { watched_seconds: number; completed: boolean; last_watched_at: string }> = {};
        (data.progress ?? []).forEach((p) => {
          progressMap[p.video_id] = {
            watched_seconds: p.watched_seconds,
            completed: p.completed,
            last_watched_at: p.last_watched_at,
          };
        });
        setProgress(progressMap);
        setLoadingProgress(false);
      })
      .catch((err) => {
        console.error("[video-detail] progress error:", err);
        setLoadingProgress(false);
      });
  }, [getAccessToken]);

  // Lade Notizen
  useEffect(() => {
    const token = getAccessToken();
    if (!token || !currentVideo) return;

    setLoadingNotes(true);
    fetch(`/api/course/notes?videoId=${currentVideo.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load notes");
        return res.json();
      })
      .then((data: { notes: { id: string; content: string; timestamp_seconds: number | null; created_at: string }[] }) => {
        setNotes(data.notes ?? []);
        setLoadingNotes(false);
      })
      .catch((err) => {
        console.error("[video-detail] notes error:", err);
        setLoadingNotes(false);
      });
  }, [getAccessToken, currentVideo]);

  // Lade Kommentare
  useEffect(() => {
    const token = getAccessToken();
    if (!token || !currentVideo) return;

    setLoadingComments(true);
    fetch(`/api/course/questions?videoId=${currentVideo.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load comments");
        return res.json();
      })
      .then((data: { questions: { id: string; content: string; created_at: string }[] }) => {
        setComments(data.questions ?? []);
        setLoadingComments(false);
      })
      .catch((err) => {
        console.error("[video-detail] comments error:", err);
        setLoadingComments(false);
      });
  }, [getAccessToken, currentVideo]);

  // Debounced Progress-Speicherung
  const saveProgressToApi = useCallback(async (videoId: string, watchedSeconds: number, completed: boolean) => {
    const token = getAccessToken();
    if (!token) return;

    try {
      console.log(`[video-detail] Saving progress for video: ${videoId} seconds: ${watchedSeconds} completed: ${completed}`);

      const response = await fetch("/api/course/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          videoId,
          watchedSeconds,
          completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save progress");
      }

      // Update local progress state
      setProgress(prev => ({
        ...prev,
        [videoId]: {
          watched_seconds: watchedSeconds,
          completed,
          last_watched_at: new Date().toISOString(),
        },
      }));
    } catch (error) {
      console.error("[video-detail] Error saving progress:", error);
    }
  }, [getAccessToken]);

  const scheduleSaveProgress = useCallback((videoId: string, watchedSeconds: number) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      const isCompleted = watchedSeconds >= (currentVideo?.duration ?? 0) * 60 * 0.9; // 90% als completed
      saveProgressToApi(videoId, watchedSeconds, isCompleted);
    }, 5000); // 5 Sekunden Delay
  }, [saveProgressToApi, currentVideo?.duration]);

  // Video Time Update Handler
  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
    if (currentVideo) {
      scheduleSaveProgress(currentVideo.id, time);
    }
  }, [currentVideo, scheduleSaveProgress]);

  // Notiz speichern
  const handleSaveNote = useCallback(async () => {
    if (!noteContent.trim() || !currentVideo) return;

    const token = getAccessToken();
    if (!token) return;

    try {
      const response = await fetch("/api/course/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          videoId: currentVideo.id,
          content: noteContent,
          timestampSeconds: Math.floor(currentTime),
        }),
      });

      if (!response.ok) throw new Error("Failed to save note");

      const data = await response.json();
      setNotes(prev => [data.note, ...prev]);
      setNoteContent("");
    } catch (error) {
      console.error("[video-detail] save note error:", error);
    }
  }, [noteContent, currentVideo, currentTime, getAccessToken]);

  // Kommentar posten
  const handleSaveComment = useCallback(async () => {
    if (!commentContent.trim() || !currentVideo) return;

    const token = getAccessToken();
    if (!token) return;

    try {
      const response = await fetch("/api/course/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          videoId: currentVideo.id,
          content: commentContent,
        }),
      });

      if (!response.ok) throw new Error("Failed to save comment");

      const data = await response.json();
      setComments(prev => [data.question, ...prev]);
      setCommentContent("");
    } catch (error) {
      console.error("[video-detail] save comment error:", error);
    }
  }, [commentContent, currentVideo, getAccessToken]);

  // Zeitstempel in Notiz übernehmen
  const handleAddTimestamp = useCallback(() => {
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const timestamp = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    setNoteContent(prev => prev + (prev ? '\n\n' : '') + `Bei ${timestamp}: `);
  }, [currentTime]);

  // Berechne Modul-Fortschritt basierend auf Video-Fortschritten
  const moduleProgress = useMemo(() => {
    if (!module || module.videos.length === 0) return 0;

    const videoProgresses = module.videos.map(video => {
      const videoProgress = progress[video.id];
      if (!videoProgress) return 0; // Video noch nicht angesehen

      const watchedSeconds = videoProgress.watched_seconds;
      const totalSeconds = video.duration * 60; // duration ist in Minuten
      const videoProgressPercent = Math.min(Math.round((watchedSeconds / totalSeconds) * 100), 100);

      return videoProgressPercent;
    });

    // Durchschnitt aller Video-Fortschritte
    const totalProgress = videoProgresses.reduce((sum, progress) => sum + progress, 0);
    return Math.round(totalProgress / module.videos.length);
  }, [module, progress]);

  // Berechne Video-Fortschritt in Prozent
  const currentVideoProgress = useMemo(() => {
    if (!currentVideo || !progress[currentVideo.id]) return 0;
    const watchedSeconds = progress[currentVideo.id].watched_seconds;
    const totalSeconds = currentVideo.duration * 60;
    return Math.min(Math.round((watchedSeconds / totalSeconds) * 100), 100);
  }, [currentVideo, progress]);

  if (loading) {
    return (
      <Box py="12">
        <Stack align="center">
          <Spinner size="lg" color="green.500" />
          <Text color="gray.600">Lade Video...</Text>
        </Stack>
      </Box>
    );
  }

  if (error || !currentVideo || !module) {
    return (
      <Box py="12">
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Fehler</Alert.Title>
            <Alert.Description>
              {error || "Video konnte nicht geladen werden."}
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Box>
    );
  }

  return (
    <Box>
      <Stack gap="6">
        {/* Header: Zurück zum Modul */}
        <HStack gap="4" align="center">
          <Link href="/app/free/lerne-die-grundlagen">
            <Button size="sm" variant="ghost" colorPalette="green">
              <ArrowLeft size={16} />
              Zurück zur Übersicht
            </Button>
          </Link>
        </HStack>

        {/* 1:1 Betreuung CTA Banner */}
        <CtaBetreuungBanner />

        {/* Video-Player in grünem Glassmorph-Kasten */}
        <Box
          w="full"
          bg="green.50"
            backdropFilter="blur(12px)"
            borderRadius="xl"
            p="3"
            borderWidth="1px"
            borderColor="green.200"
          shadow="md"
        >
          <BucketVideoPlayer
            src={getVideoUrl(currentVideo.video_key)}
            onTimeUpdate={handleTimeUpdate}
            maxWidth="full"
            durationMinutes={currentVideo.duration}
            initialSeekSeconds={progress[currentVideo.id]?.watched_seconds ?? 0}
          />
        </Box>

        {/* Kurs-Übersicht: volle Breite, kompakt in einer Reihe pro Video */}
        <Card.Root
          w="full"
          overflow="hidden"
          bg="green.50"
          borderWidth="1px"
          borderColor="green.200"
          shadow="sm"
        >
          <Card.Header py="2" px="3">
            <HStack justify="space-between" align="center" w="full">
              <Text fontSize="sm" fontWeight="600" color="gray.800">
                {module.title} · {module.videos.length} Lektionen
              </Text>
              <CircularProgressChart progress={moduleProgress} size={88} color="#059669" strokeWidth={5} />
            </HStack>
          </Card.Header>
          <Card.Body p="0">
            <Stack gap="0">
              {module.videos.map((video) => {
                const isActive = video.id === currentVideo.id;
                const videoProgressData = progress[video.id];
                const isCompleted = videoProgressData?.completed || false;
                const progressPercent = videoProgressData
                  ? Math.min(Math.round((videoProgressData.watched_seconds / (video.duration * 60)) * 100), 100)
                  : 0;

                return (
                  <Link key={video.id} href={`/app/free/lerne-die-grundlagen/video/${video.id}`}>
                    <HStack
                      gap="2"
                      align="center"
                      w="full"
                      px="3"
                      py="2"
                      borderBottom="1px solid"
                      borderColor="green.100"
                      bg={isActive ? "green.50" : "transparent"}
                      _hover={{ bg: "green.50" }}
                      transition="all 0.2s"
                    >
                      <Box
                        w="36px"
                        h="22px"
                        borderRadius="sm"
                        flexShrink="0"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg={isActive ? "green.200" : "gray.100"}
                      >
                        {isCompleted ? (
                          <CheckCircle size={12} color="#059669" weight="fill" />
                        ) : (
                          <Play size={10} color="#6b7280" />
                        )}
                      </Box>
                      <Badge colorPalette={isActive ? "green" : isCompleted ? "green" : "gray"} size="sm" variant="subtle" flexShrink="0">
                        {video.sort_order}
                      </Badge>
                      <Text
                        fontSize="xs"
                        fontWeight={isActive ? "600" : "normal"}
                        color={isActive ? "green.800" : "gray.700"}
                        flex="1"
                        minW="0"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {video.title}
                      </Text>
                      {progressPercent > 0 && (
                        <Text fontSize="xs" color="green.600" fontWeight="500" flexShrink="0">
                          {progressPercent}%
                        </Text>
                      )}
                    </HStack>
                  </Link>
                );
              })}
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Kommentare & Notizen: gebündelt, aufklappbar, dezent */}
        <Card.Root
          w="full"
          bg="gray.50"
          borderWidth="1px"
          borderColor="gray.200"
          shadow="sm"
        >
          <Card.Body p="0">
            <Accordion.Root collapsible multiple defaultValue={[]}>
              <Accordion.Item value="comments">
                <Accordion.ItemTrigger
                  py="2"
                  px="3"
                  fontSize="sm"
                  fontWeight="500"
                  color="gray.700"
                  _hover={{ bg: "gray.100" }}
                >
                  Kommentare {comments.length > 0 && `(${comments.length})`}
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Box px="3" pb="3" pt="1">
                    <VStack gap="2" align="stretch">
                      <Textarea
                        placeholder="Frage oder Gedanke..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        size="sm"
                        minH="64px"
                        resize="vertical"
                        bg="white"
                      />
                      <HStack justify="flex-end">
                        <Button size="xs" colorPalette="green" onClick={handleSaveComment} disabled={!commentContent.trim()}>
                          Posten
                        </Button>
                      </HStack>
                    </VStack>
                    {loadingComments ? (
                      <HStack justify="center" py="3">
                        <Spinner size="sm" color="green.500" />
                      </HStack>
                    ) : comments.length > 0 ? (
                      <Stack gap="2" mt="2">
                        {comments.map((comment) => (
                          <Box key={comment.id} p="2" bg="white" borderRadius="md" borderWidth="1px" borderColor="gray.200">
                            <Text fontSize="xs" color="gray.800" whiteSpace="pre-wrap">
                              {comment.content}
                            </Text>
                            <Text fontSize="2xs" color="gray.400" mt="1">
                              {new Date(comment.created_at).toLocaleDateString("de-DE")}
                            </Text>
                          </Box>
                        ))}
                      </Stack>
                    ) : (
                      <Text fontSize="xs" color="gray.500" py="2">Noch keine Kommentare.</Text>
                    )}
                  </Box>
                </Accordion.ItemContent>
              </Accordion.Item>
              <Accordion.Item value="notes">
                <Accordion.ItemTrigger
                  py="2"
                  px="3"
                  fontSize="sm"
                  fontWeight="500"
                  color="gray.700"
                  borderTop="1px solid"
                  borderColor="gray.200"
                  _hover={{ bg: "gray.100" }}
                >
                  Notizen {notes.length > 0 && `(${notes.length})`}
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Box px="3" pb="3" pt="1">
                    <VStack gap="2" align="stretch">
                      <Textarea
                        placeholder="Persönliche Notiz..."
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        size="sm"
                        minH="64px"
                        resize="vertical"
                        bg="white"
                      />
                      <HStack gap="2" flexWrap="wrap">
                        <Button
                          size="xs"
                          variant="outline"
                          colorPalette="green"
                          onClick={handleAddTimestamp}
                          disabled={!currentVideo}
                        >
                          Zeit {Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, "0")}
                        </Button>
                        <Button size="xs" colorPalette="green" onClick={handleSaveNote} disabled={!noteContent.trim()}>
                          Speichern
                        </Button>
                      </HStack>
                    </VStack>
                    {loadingNotes ? (
                      <HStack justify="center" py="3">
                        <Spinner size="sm" color="green.500" />
                      </HStack>
                    ) : notes.length > 0 ? (
                      <Stack gap="2" mt="2">
                        {notes.map((note) => (
                          <Box key={note.id} p="2" bg="white" borderRadius="md" borderWidth="1px" borderColor="gray.200">
                            <Text fontSize="xs" color="gray.800" whiteSpace="pre-wrap">
                              {note.content}
                            </Text>
                            <HStack gap="2" mt="1" justify="space-between">
                              {note.timestamp_seconds && (
                                <Text fontSize="2xs" color="green.600">
                                  {Math.floor(note.timestamp_seconds / 60)}:{(note.timestamp_seconds % 60).toString().padStart(2, "0")}
                                </Text>
                              )}
                              <Text fontSize="2xs" color="gray.400">
                                {new Date(note.created_at).toLocaleDateString("de-DE")}
                              </Text>
                            </HStack>
                          </Box>
                        ))}
                      </Stack>
                    ) : (
                      <Text fontSize="xs" color="gray.500" py="2">Noch keine Notizen.</Text>
                    )}
                  </Box>
                </Accordion.ItemContent>
              </Accordion.Item>
            </Accordion.Root>
          </Card.Body>
        </Card.Root>
      </Stack>
    </Box>
  );
}