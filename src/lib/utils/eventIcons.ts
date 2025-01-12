export const eventKeywords = {
  // Social Events
  meeting: "🤝",
  party: "🎊",
  birthday: "🎂",
  wedding: "💒",
  celebration: "🎉",
  gathering: "👥",

  // Food & Drinks
  lunch: "🥗",
  dinner: "🍽️",
  breakfast: "☕",
  brunch: "🥂",
  coffee: "☕",
  drinks: "🍻",

  // Activities
  workout: "🏋️‍♂️",
  yoga: "🧘‍♀️",
  running: "🏃‍♂️",
  swimming: "🏊‍♂️",
  hiking: "🏔️",
  gym: "💪",

  // Education & Work
  study: "📚",
  class: "📝",
  lecture: "👨‍🏫",
  exam: "✍️",
  interview: "💼",
  presentation: "📊",
  workshop: "🛠️",

  // Entertainment
  game: "🎮",
  movie: "🎬",
  concert: "🎵",
  theatre: "🎭",
  show: "🎪",
  music: "🎼",

  // Travel & Places
  travel: "✈️",
  vacation: "🏖️",
  trip: "🗺️",
  flight: "✈️",
  hotel: "🏨",

  // Health
  doctor: "👨‍⚕️",
  dentist: "🦷",
  appointment: "🏥",
  checkup: "🩺",

  // Special
  holiday: "🎄",
  christmas: "🎅",
  halloween: "🎃",
  "new year": "🎆",

  // Default
  default: "📅",
} as const;
export function getEventEmoji(title: string): string {
  const lowercaseTitle = title.toLowerCase();
  for (const [keyword, emoji] of Object.entries(eventKeywords)) {
    if (lowercaseTitle.includes(keyword)) {
      return emoji;
    }
  }
  return eventKeywords.default;
}
