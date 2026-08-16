const BASE_PATH = "/tennis-club";

export const IMAGES = {
  hero: `${BASE_PATH}/images/hero/hero-court.webp`,
  one: `${BASE_PATH}/images/1.webp`,
  two: `${BASE_PATH}/images/2.webp`,
  three: `${BASE_PATH}/images/3.webp`,
  four: `${BASE_PATH}/images/4.webp`,
  five: `${BASE_PATH}/images/5.webp`,
};

export const AVATAR_DOTS = ["#5790e6", "#c2e029", "#0b6e97", "#ffffff"];

export const COLLECTION_SLIDES = [
  {
    img: IMAGES.two,
    brand: "Baseline Pro",
    title: "Featured Gear",
    cta: "Shop the kit",
    alt: "Player driving a backhand on a hard court",
  },
  {
    img: IMAGES.three,
    brand: "Court Series",
    title: "Summer Drop",
    cta: "View the line",
    alt: "Player stretching for a forehand on clay",
  },
  {
    img: IMAGES.five,
    brand: "Academy Kit",
    title: "Junior Range",
    cta: "Browse juniors",
    alt: "Player set in a ready stance on clay",
  },
];

export const TRUST_SLIDES = [
  {
    headline: ["Expert", "Result-", "Driven", "Coaching"],
    img: IMAGES.five,
    name: "Marco Vidal",
    role: "Head Coach",
    alt: "Head coach set in a ready stance on clay",
  },
  {
    headline: ["Sharper", "Faster", "Stronger", "Player"],
    img: IMAGES.four,
    name: "Elena Sokolova",
    role: "Performance Coach",
    alt: "Performance coach following through on a serve",
  },
  {
    headline: ["Future", "Champions", "Start", "Here"],
    img: IMAGES.one,
    name: "James Okoro",
    role: "Juniors Lead",
    alt: "Juniors lead waiting to return on clay",
  },
];

export const PROGRAMS = [
  {
    index: "01",
    name: "Junior Development",
    desc: "Fundamentals, footwork, and match play for ages 6\u201314.",
    href: "#junior",
  },
  {
    index: "02",
    name: "Performance Squad",
    desc: "High-volume training for competitive and ranked players.",
    href: "#performance",
  },
  {
    index: "03",
    name: "Adult Clinics",
    desc: "Small-group sessions to sharpen technique and fitness.",
    href: "#adult",
  },
  {
    index: "04",
    name: "Private Coaching",
    desc: "One-to-one sessions tailored to your goals and schedule.",
    href: "#private",
  },
];

export const COURT_TILES = [
  {
    tone: "clay",
    img: IMAGES.one,
    name: "Redline Clay",
    desc: "A fast outdoor clay court tuned for long, physical rallies.",
    alt: "Player on the baseline of an outdoor clay court",
  },
  {
    tone: "blue",
    img: IMAGES.four,
    name: "Harbor Court",
    desc: "A sheltered hard court built for precision and night play.",
    alt: "Player following through on a blue hard court",
  },
];

export const STATS = [
  { value: "24", label: "Certified coaches" },
  { value: "12", label: "Championship courts" },
  { value: "9K+", label: "Members training" },
  { value: "15", label: "Years on the baseline" },
];

export const TESTIMONIALS = [
  {
    quote:
      "I added a level to my serve in one season. The coaching is detailed and it actually sticks.",
    name: "Priya Anand",
    role: "Performance Squad",
  },
  {
    quote:
      "Best courts in the city and a team that treats every member like a competitor.",
    name: "Lukas Brenner",
    role: "Adult Clinics",
  },
  {
    quote:
      "My daughter went from shy beginner to club champion. Worth every minute.",
    name: "Dana Okafor",
    role: "Parent, Junior Development",
  },
];

export const FOOTER_NAVS = [
  {
    title: "Programs",
    links: [
      { label: "Junior Development", href: "#junior" },
      { label: "Performance Squad", href: "#performance" },
      { label: "Adult Clinics", href: "#adult" },
      { label: "Private Coaching", href: "#private" },
    ],
  },
  {
    title: "Club",
    links: [
      { label: "Membership", href: "#membership" },
      { label: "Facilities", href: "#facilities" },
      { label: "Events", href: "#club" },
      { label: "Pro Shop", href: "#shop" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Coaches", href: "#programs" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "#instagram" },
  { label: "X", href: "#x" },
  { label: "YouTube", href: "#youtube" },
  { label: "LinkedIn", href: "#linkedin" },
];

export const LEGAL_LINKS = [
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
];

export const MENU_LINKS = [
  { label: "Programs", href: "#programs" },
  { label: "Facilities", href: "#facilities" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const CONTACT = {
  email: "play@baseline.club",
  phoneLabel: "+1 (212) 555-0148",
  phoneHref: "tel:+12125550148",
  address: "120 Court Lane, New York",
};

export const FONT_BASE = 16;
export const BASE_W = 1920;
export const COEF = 0.6666;

export const MIN_VISIBLE_MS = 1400;
export const MAX_VISIBLE_MS = 2600;
export const EXIT_MS = 850;