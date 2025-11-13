export const releaseInfo = {
  title: "Graveyard Waltz",
  type: "Single",
  releaseDate: "Oct 31, 2025",
  ctas: [
    { label: "Stream Now", href: "#", kind: "primary" },
    { label: "Preorder Vinyl", href: "#", kind: "secondary" },
  ],
};

export const bulletins = [
  { id: 1, text: "New single drops on Halloween. Darker. Louder. Bela-er." },
  { id: 2, text: "Tour dates incoming. East Coast first. Bring earplugs." },
  { id: 3, text: "Merch restock: limited blood-red tees." },
];

export const comments = [
  { id: 1, author: "xX_VampGrrrl_Xx", body: "been here since the myspace days... oh wait 😈" },
  { id: 2, author: "tom", body: "You're in my Top 8." },
  { id: 3, author: "cryptkeeper92", body: "this slaps harder than a coffin lid" },
  { id: 4, author: "nightshift dj", body: "spin this at 2am or you're doing it wrong" },
];

export const photos = [
  { id: 1, src: "/globe.svg", title: "Bela Globe" },
  { id: 2, src: "/window.svg", title: "Window Icon" },
  { id: 3, src: "/file.svg", title: "Readme Icon" },
];

export type AimBuddy = { id: string; screenName: string; status: 'online' | 'away' | 'offline' };
export const aimBuddies: AimBuddy[] = [
  { id: 'u1', screenName: 'tomFromMyspace', status: 'online' },
  { id: 'u2', screenName: 'xX_VampGrrrl_Xx', status: 'away' },
  { id: 'u3', screenName: 'cryptkeeper92', status: 'online' },
  { id: 'u4', screenName: 'nightshiftDJ', status: 'offline' },
  { id: 'u5', screenName: 'bela_kiss_band', status: 'online' },
];

export type AimMessage = { from: string; text: string; ts: number };
export const aimSeedChats: Record<string, AimMessage[]> = {
  u1: [
    { from: 'tomFromMyspace', text: 'hey! new layout looks sick', ts: Date.now() - 600000 },
    { from: 'you', text: 'appreciate it — more coming soon', ts: Date.now() - 550000 },
  ],
  u2: [
    { from: 'xX_VampGrrrl_Xx', text: 'when is the tour??', ts: Date.now() - 720000 },
  ],
  u3: [
    { from: 'cryptkeeper92', text: 'graveyard waltz on repeat', ts: Date.now() - 300000 },
  ],
};
