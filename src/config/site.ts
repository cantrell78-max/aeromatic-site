/** Site-wide settings. Override with .env — see env.example in project root. */
export const site = {
  name: "Aeromatic",
  tagline: "Drone services & aerial photography",
  url: "https://aeromaticdrone.com",
  location: "Bend, Oregon",
  /** Formspree form id — public in form action; override via PUBLIC_FORMSPREE_ID */
  formspreeId: import.meta.env.PUBLIC_FORMSPREE_ID ?? "mrevblgq",
  /** Google Maps iframe src from Business Profile → Share → Embed */
  mapsEmbedSrc:
    import.meta.env.PUBLIC_MAPS_EMBED_SRC ??
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194346.7751788!2d-121.3776854!3d44.0581728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54b6c7b87f5b0c0f%3A0x9d6c833fe6e54c51!2sBend%2C%20OR!5e0!3m2!1sen!2sus!4v1749000000000!5m2!1sen!2sus",
  /** Optional: https://www.youtube.com/@YourChannel */
  youtubeUrl: import.meta.env.PUBLIC_YOUTUBE_URL ?? "",
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL ?? "",
} as const;

export const formspreeAction = site.formspreeId
  ? `https://formspree.io/f/${site.formspreeId}`
  : null;