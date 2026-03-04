"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Heading,
  Text,
  Card,
  Button,
  Stack,
  Box,
  HStack,
  SimpleGrid,
  Input,
  NumberInput,
} from "@chakra-ui/react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
} from "@/components/ui/dialog";
import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/ui/empty-state";
import { Link } from "@/components/ui/link";
import { Calendar, Plus, Pencil, X, CalendarBlank, Lock } from "@phosphor-icons/react";
import { useAuth } from "@/components/provider/auth-provider";
// Define types for API response
interface TrainingPlan {
  id: string;
  slug: string;
  name: string;
  gender: string | null;
  description: string;
  structure: any; // JSON structure with days and exercises
  /** z.B. "12 Wochen" – optional, für createTrainingSchedule */
  duration?: string;
  /** z.B. "Anfänger" | "Fortgeschritten" – optional */
  difficulty?: string;
  /** Übungen als Strings (z.B. "Kniebeugen (3x12)") – optional */
  exercises?: string[];
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

interface TrainingDay {
  date: string; // YYYY-MM-DD
  exercises: Exercise[];
}

const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

const formatDateDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" });
};

// Erstelle Trainingstage aus Plan-Struktur
const createTrainingDaysFromPlan = (plan: TrainingPlan): TrainingDay[] => {
  if (!plan.structure || !plan.structure.days) return [];

  const days: TrainingDay[] = [];
  const startDate = new Date();

  // Für jeden Tag in der Woche
  plan.structure.days.forEach((day: any, index: number) => {
    // Erstelle Datum für diesen Wochentag (z.B. Montag = 1, Dienstag = 2, etc.)
    const dayOffset = (day.key === "montag" ? 1 :
                      day.key === "dienstag" ? 2 :
                      day.key === "mittwoch" ? 3 :
                      day.key === "donnerstag" ? 4 :
                      day.key === "freitag" ? 5 :
                      day.key === "samstag" ? 6 : 0) - startDate.getDay();

    const workoutDate = new Date(startDate);
    workoutDate.setDate(startDate.getDate() + (dayOffset >= 0 ? dayOffset : dayOffset + 7));

    // Parse exercises from structure
    const exercises: Exercise[] = day.exercises.map((ex: any) => ({
      id: `${day.key}-${ex.name}`.toLowerCase().replace(/\s+/g, '-'),
      name: ex.name,
      sets: ex.sets.length, // Number of sets
      reps: parseInt(ex.sets[0].reps.split('–')[0] || ex.sets[0].reps), // First rep range or single value
      weight: 0,
    }));

    days.push({
      date: formatDate(workoutDate),
      exercises,
    });
  });

  return days;
};

const getDaysInMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];

  // Leere Tage am Anfang
  const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  for (let i = 0; i < startDay; i++) {
    days.push(new Date(year, month, -startDay + i + 1));
  }

  // Tage des Monats
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day));
  }

  return days;
};

// Parse Übung aus String (z.B. "Kniebeugen (3x12)" -> { name: "Kniebeugen", sets: 3, reps: 12 })
const parseExercise = (exerciseString: string): Exercise => {
  const match = exerciseString.match(/^(.+?)\s*\((\d+)x(\d+)\)/);
  if (match) {
    return {
      id: Date.now().toString() + Math.random(),
      name: match[1].trim(),
      sets: parseInt(match[2]),
      reps: parseInt(match[3]),
      weight: 0,
    };
  }
  return {
    id: Date.now().toString() + Math.random(),
    name: exerciseString,
    sets: 3,
    reps: 10,
    weight: 0,
  };
};

// Erstelle automatisch Trainingstage basierend auf Plan (falls duration/difficulty/exercises vorhanden)
const createTrainingSchedule = (plan: TrainingPlan, startDate: Date = new Date()): TrainingDay[] => {
  if (!plan.duration || !plan.exercises?.length) return [];
  const days: TrainingDay[] = [];
  const weeks = parseInt(plan.duration.split(" ")[0], 10) || 4;
  const trainingDaysPerWeek = plan.difficulty === "Anfänger" ? 3 : plan.difficulty === "Fortgeschritten" ? 4 : 5;

  // Trainingstage: Mo, Mi, Fr für Anfänger; Mo, Di, Do, Fr für Fortgeschritten; etc.
  const dayOffsets = plan.difficulty === "Anfänger"
    ? [1, 3, 5] // Mo, Mi, Fr
    : plan.difficulty === "Fortgeschritten"
    ? [1, 2, 4, 5] // Mo, Di, Do, Fr
    : [1, 2, 3, 4, 5]; // Mo-Fr

  for (let week = 0; week < weeks; week++) {
    for (const dayOffset of dayOffsets) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + week * 7 + dayOffset - startDate.getDay());

      const exercises = plan.exercises.map(parseExercise);
      days.push({
        date: formatDate(date),
        exercises,
      });
    }
  }

  return days;
};

export default function MeinTrainingsplan() {
  const { getAccessToken } = useAuth();
  const [assignedPlans, setAssignedPlans] = useState<string[]>([]);
  const [currentPlan, setCurrentPlan] = useState<TrainingPlan | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [trainingDays, setTrainingDays] = useState<TrainingDay[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [exerciseForm, setExerciseForm] = useState<Exercise>({
    id: "",
    name: "",
    sets: 3,
    reps: 10,
    weight: 0,
  });

  // Lade zugewiesenen Plan von API
  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    fetch("/api/training-plans/my", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return { plan: null };
      })
      .then((data) => {
        if (data.plan) {
          setAssignedPlans([data.plan.id]);
          setCurrentPlan(data.plan);

          // Erstelle Trainingstage basierend auf der Plan-Struktur
          const trainingDays = createTrainingDaysFromPlan(data.plan);
          setTrainingDays(trainingDays);

          // Lade bereits vorhandene Trainingstage aus localStorage (für Kompatibilität)
          const storedDays = localStorage.getItem("myTrainingDays");
          if (storedDays) {
            const existingDays = JSON.parse(storedDays) as TrainingDay[];
            // Merge: Überschreibe nur, wenn noch nicht vorhanden
            const merged = [...existingDays];
            trainingDays.forEach((day) => {
              if (!merged.find((d) => d.date === day.date)) {
                merged.push(day);
              }
            });
            setTrainingDays(merged);
          }
        } else {
          setAssignedPlans([]);
          setCurrentPlan(null);
        }
      })
      .catch((error) => {
        console.error("Error loading user's plan:", error);
        setAssignedPlans([]);
        setCurrentPlan(null);
      });
  }, [getAccessToken]);

  // Speichere Trainingstage in localStorage
  useEffect(() => {
    if (trainingDays.length > 0) {
      localStorage.setItem("myTrainingDays", JSON.stringify(trainingDays));
    }
  }, [trainingDays]);

  const daysInMonth = useMemo(() => getDaysInMonth(currentDate), [currentDate]);
  const monthYear = currentDate.toLocaleDateString("de-DE", { month: "long", year: "numeric" });

  const getTrainingDay = (dateString: string): TrainingDay | undefined => {
    return trainingDays.find((day) => day.date === dateString);
  };

  const handleDateClick = (dateString: string) => {
    // Wenn bereits ein Trainingstag ausgewählt ist und es Übungen hat, verschieben
    if (selectedDate && selectedDate !== dateString) {
      const trainingDay = getTrainingDay(selectedDate);
      if (trainingDay && trainingDay.exercises.length > 0) {
        handleMoveTraining(selectedDate, dateString);
        setSelectedDate(dateString);
        return;
      }
    }

    setSelectedDate(dateString);
    setIsDialogOpen(true);
    setEditingExercise(null);
    setExerciseForm({
      id: "",
      name: "",
      sets: 3,
      reps: 10,
      weight: 0,
    });
  };

  const handleAddExercise = () => {
    if (!selectedDate || !exerciseForm.name) return;

    const trainingDay = getTrainingDay(selectedDate);
    const newExercise: Exercise = {
      ...exerciseForm,
      id: editingExercise?.id || Date.now().toString(),
    };

    if (trainingDay) {
      if (editingExercise) {
        // Bearbeiten
        setTrainingDays(
          trainingDays.map((day) =>
            day.date === selectedDate
              ? {
                  ...day,
                  exercises: day.exercises.map((ex) =>
                    ex.id === editingExercise.id ? newExercise : ex
                  ),
                }
              : day
          )
        );
      } else {
        // Hinzufügen
        setTrainingDays(
          trainingDays.map((day) =>
            day.date === selectedDate
              ? { ...day, exercises: [...day.exercises, newExercise] }
              : day
          )
        );
      }
    } else {
      // Neuer Trainingstag
      setTrainingDays([
        ...trainingDays,
        {
          date: selectedDate,
          exercises: [newExercise],
        },
      ]);
    }

    setExerciseForm({
      id: "",
      name: "",
      sets: 3,
      reps: 10,
      weight: 0,
    });
    setEditingExercise(null);
  };

  const handleDeleteExercise = (exerciseId: string) => {
    if (!selectedDate) return;

    const trainingDay = getTrainingDay(selectedDate);
    if (trainingDay && trainingDay.exercises.length === 1) {
      // Letzte Übung - Trainingstag löschen
      setTrainingDays(trainingDays.filter((day) => day.date !== selectedDate));
    } else {
      // Übung löschen
      setTrainingDays(
        trainingDays.map((day) =>
          day.date === selectedDate
            ? {
                ...day,
                exercises: day.exercises.filter((ex) => ex.id !== exerciseId),
              }
            : day
        )
      );
    }
  };

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setExerciseForm(exercise);
  };

  const handleMoveTraining = (fromDate: string, toDate: string) => {
    const trainingDay = getTrainingDay(fromDate);
    if (!trainingDay) return;

    // Trainingstag verschieben
    setTrainingDays([
      ...trainingDays.filter((day) => day.date !== fromDate),
      {
        ...trainingDay,
        date: toDate,
      },
    ]);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  // Export zu Kalender (.ics Format)
  const exportToCalendar = (trainingDay: TrainingDay) => {
    const date = new Date(trainingDay.date);
    const startDate = new Date(date);
    startDate.setHours(18, 0, 0); // 18:00 Uhr
    const endDate = new Date(startDate);
    endDate.setHours(19, 0, 0); // 19:00 Uhr

    const formatICSDate = (d: Date): string => {
      return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const exercisesText = trainingDay.exercises
      .map((ex) => `${ex.name}: ${ex.sets}x${ex.reps}${ex.weight > 0 ? ` @ ${ex.weight}kg` : ""}`)
      .join("\\n");

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//PumpItClub//Training Plan//DE
BEGIN:VEVENT
UID:${trainingDay.date}-${Date.now()}@pumpitclub.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:Training - ${trainingDay.exercises.map((e) => e.name).join(", ")}
DESCRIPTION:${exercisesText}
LOCATION:Training
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `training-${trainingDay.date}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  // Wenn keine Pläne zugewiesen, zeige Empty State
  if (assignedPlans.length === 0) {
    return (
      <Section header>
        <EmptyState
          icon={<Lock size={48} color="var(--chakra-colors-green-500)" />}
          title="Noch kein Trainingsplan zugewiesen"
          description="Weise dir zuerst einen Trainingsplan in 'Trainingspläne' zu, um deinen persönlichen Trainingsplan zu erstellen."
        >
          <Link href="/app/free/trainingsplaene">
            <Button colorPalette="green" size="lg">
              Zu Trainingspläne
            </Button>
          </Link>
        </EmptyState>
      </Section>
    );
  }

  return (
    <Section header>
      <Stack gap={{ base: "4", md: "6" }}>
        <Stack gap="2">
          <Heading size={{ base: "lg", md: "xl" }}>Mein Trainingsplan</Heading>
          <Text color="green.700" fontSize={{ base: "sm", md: "md" }}>
            Verwalte deine Trainingstage im Kalender und trage deine Werte ein.
          </Text>
        </Stack>

        {/* Kalender */}
        <Card.Root overflow="hidden">
          <Card.Body p={{ base: "3", md: "6" }}>
            <Stack gap={{ base: "3", md: "4" }}>
              {/* Monats-Navigation */}
              <HStack justify="space-between" align="center" flexWrap="nowrap">
                <Button
                  variant="ghost"
                  colorPalette="green"
                  onClick={() => navigateMonth("prev")}
                  size={{ base: "sm", md: "md" }}
                  minW={{ base: "8", md: "10" }}
                >
                  ←
                </Button>
                <Heading size={{ base: "sm", md: "md" }} color="green.600"  textAlign="center">
                  {monthYear}
                </Heading>
                <Button
                  variant="ghost"
                  colorPalette="green"
                  onClick={() => navigateMonth("next")}
                  size={{ base: "sm", md: "md" }}
                  minW={{ base: "8", md: "10" }}
                >
                  →
                </Button>
              </HStack>

              {/* Wochentage-Header */}
              <SimpleGrid columns={7} gap={{ base: "1", md: "2" }} minW="0">
                {weekDays.map((day) => (
                  <Box
                    key={day}
                    textAlign="center"
                    fontWeight="bold"
                    color="green.700"
                    fontSize={{ base: "xs", md: "sm" }}
                    py={{ base: "1", md: "2" }}
                  >
                    {day}
                  </Box>
                ))}
              </SimpleGrid>

              {/* Kalender-Tage */}
              <SimpleGrid columns={7} gap={{ base: "1", md: "2" }} minW="0">
                {daysInMonth.map((day, index) => {
                  const dateString = formatDate(day);
                  const trainingDay = getTrainingDay(dateString);
                  const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                  const isToday = dateString === formatDate(new Date());
                  const hasTraining = trainingDay && trainingDay.exercises.length > 0;

                  return (
                    <Box
                      key={index}
                      minH={{ base: "48px", md: "80px" }}
                      p={{ base: "1", md: "2" }}
                      border="1px solid"
                      borderColor={isCurrentMonth ? "green.200" : "gray.200"}
                      borderRadius={{ base: "sm", md: "md" }}
                      bg={isCurrentMonth ? (isToday ? "green.50" : "white") : "gray.50"}
                      cursor="pointer"
                      onClick={() => handleDateClick(dateString)}
                      _hover={{
                        bg: "green.50",
                        borderColor: "green.400",
                      }}
                      position="relative"
                    >
                      <Text
                        fontSize={{ base: "xs", md: "sm" }}
                        color={isCurrentMonth ? "green.800" : "gray.400"}
                        fontWeight={isToday ? "bold" : "normal"}
                        mb={{ base: "0", md: "1" }}
                      >
                        {day.getDate()}
                      </Text>
                      {hasTraining && (
                        <>
                          {/* Mobile: nur Indikator */}
                          <Box display={{ base: "block", md: "none" }} mt="0.5">
                            <Box
                              bg="green.500"
                              color="white"
                              borderRadius="full"
                              w="6px"
                              h="6px"
                              mx="auto"
                            />
                            {trainingDay!.exercises.length > 1 && (
                              <Text fontSize="xs" color="green.600" fontWeight="medium">
                                +{trainingDay!.exercises.length - 1}
                              </Text>
                            )}
                          </Box>
                          {/* Desktop: Übungsnamen */}
                          <Stack gap="1" display={{ base: "none", md: "flex" }}>
                            {trainingDay!.exercises.slice(0, 2).map((exercise) => (
                              <Box
                                key={exercise.id}
                                bg="green.500"
                                color="white"
                                px="1"
                                py="0.5"
                                borderRadius="sm"
                                fontSize="xs"
                                fontWeight="medium"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                              >
                                {exercise.name}
                              </Box>
                            ))}
                            {trainingDay!.exercises.length > 2 && (
                              <Text fontSize="xs" color="green.600" fontWeight="medium">
                                +{trainingDay!.exercises.length - 2} weitere
                              </Text>
                            )}
                          </Stack>
                        </>
                      )}
                    </Box>
                  );
                })}
              </SimpleGrid>
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Dialog für Trainingstag */}
        <DialogRoot open={isDialogOpen} onOpenChange={(e) => !e.open && setIsDialogOpen(false)}>
          <DialogContent maxW={{ base: "100%", sm: "90vw", md: "600px" }} w={{ base: "calc(100% - 2rem)", md: "auto" }} mx="4">
            <DialogHeader>
              <DialogTitle>
                {selectedDate ? `Training am ${formatDateDisplay(selectedDate)}` : "Training"}
              </DialogTitle>
            </DialogHeader>
            <DialogBody>
              {selectedDate && (
                <Stack gap="4">
                  {/* Bestehende Übungen */}
                  {getTrainingDay(selectedDate)?.exercises.map((exercise) => (
                    <Card.Root key={exercise.id} borderColor="green.200">
                      <Card.Body p={{ base: "3", md: "4" }}>
                        <Stack gap="3">
                          <HStack justify="space-between" align="flex-start" gap="2" flexWrap="wrap">
                            <Heading size="sm" color="green.600" flex="1" minW="0" >
                              {exercise.name}
                            </Heading>
                            <HStack gap="2" flexShrink={0}>
                              <Button
                                size="sm"
                                variant="ghost"
                                colorPalette="green"
                                onClick={() => handleEditExercise(exercise)}
                              >
                                <Pencil size={16} />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                colorPalette="red"
                                onClick={() => handleDeleteExercise(exercise.id)}
                              >
                                <X size={16} />
                              </Button>
                            </HStack>
                          </HStack>
                          <HStack gap="4" fontSize="sm" color="green.700" flexWrap="wrap">
                            <Text>
                              <strong>{exercise.sets}</strong> Sätze
                            </Text>
                            <Text>
                              <strong>{exercise.reps}</strong> Wiederholungen
                            </Text>
                            <Text>
                              <strong>{exercise.weight}kg</strong> Gewicht
                            </Text>
                          </HStack>
                          <Button
                            size="sm"
                            variant="outline"
                            colorPalette="green"
                            onClick={() => exportToCalendar(getTrainingDay(selectedDate!)!)}
                            w={{ base: "full", md: "auto" }}
                          >
                            <HStack gap="2">
                              <CalendarBlank size={16} />
                              <Text>Zu Kalender hinzufügen</Text>
                            </HStack>
                          </Button>
                        </Stack>
                      </Card.Body>
                    </Card.Root>
                  ))}

                  {/* Formular für neue/bearbeitete Übung */}
                  <Card.Root borderColor="green.300" borderWidth="2px">
                    <Card.Body>
                      <Stack gap="4">
                        <Heading size="sm" color="green.600">
                          {editingExercise ? "Übung bearbeiten" : "Neue Übung hinzufügen"}
                        </Heading>

                        <Input
                          placeholder="Übungsname (z.B. Kniebeugen)"
                          value={exerciseForm.name}
                          onChange={(e) =>
                            setExerciseForm({ ...exerciseForm, name: e.target.value })
                          }
                          colorPalette="green"
                        />

                        <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
                          <Stack gap="2">
                            <Text fontSize="sm" fontWeight="medium" color="green.700">
                              Sätze
                            </Text>
                            <NumberInput.Root
                              value={exerciseForm.sets.toString()}
                              onValueChange={(e) =>
                                setExerciseForm({ ...exerciseForm, sets: parseInt(e.value) || 0 })
                              }
                              min={1}
                              max={10}
                            >
                              <NumberInput.Input />
                            </NumberInput.Root>
                          </Stack>

                          <Stack gap="2">
                            <Text fontSize="sm" fontWeight="medium" color="green.700">
                              Wiederholungen
                            </Text>
                            <NumberInput.Root
                              value={exerciseForm.reps.toString()}
                              onValueChange={(e) =>
                                setExerciseForm({ ...exerciseForm, reps: parseInt(e.value) || 0 })
                              }
                              min={1}
                              max={50}
                            >
                              <NumberInput.Input />
                            </NumberInput.Root>
                          </Stack>

                          <Stack gap="2">
                            <Text fontSize="sm" fontWeight="medium" color="green.700">
                              Gewicht (kg)
                            </Text>
                            <NumberInput.Root
                              value={exerciseForm.weight.toString()}
                              onValueChange={(e) =>
                                setExerciseForm({ ...exerciseForm, weight: parseFloat(e.value) || 0 })
                              }
                              min={0}
                              step={2.5}
                            >
                              <NumberInput.Input />
                            </NumberInput.Root>
                          </Stack>
                        </SimpleGrid>

                        <Button
                          colorPalette="green"
                          onClick={handleAddExercise}
                          disabled={!exerciseForm.name}
                          w={{ base: "full", md: "auto" }}
                        >
                          <HStack gap="2">
                            <Plus size={20} />
                            <Text>{editingExercise ? "Speichern" : "Hinzufügen"}</Text>
                          </HStack>
                        </Button>
                      </Stack>
                    </Card.Body>
                  </Card.Root>

                  {/* Verschieben-Hinweis */}
                  <Box
                    p={{ base: "2", md: "3" }}
                    bg="green.50"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="green.200"
                  >
                    <Text fontSize={{ base: "xs", md: "sm" }} color="green.700">
                      💡 Tipp: Klicke auf einen anderen Tag im Kalender, um dieses Training dorthin
                      zu verschieben.
                    </Text>
                  </Box>
                </Stack>
              )}
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" colorPalette="gray" onClick={() => setIsDialogOpen(false)}>
                Schließen
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      </Stack>
    </Section>
  );
}
