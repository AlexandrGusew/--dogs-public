const BLACKLIST_KEY = 'blacklist';

export const addToBlacklist = (imageUrl: string): void => {
  const blacklist = getBlacklist();
  if (!blacklist.includes(imageUrl)) {
    blacklist.push(imageUrl);
    localStorage.setItem(BLACKLIST_KEY, JSON.stringify(blacklist));
  }
};

export const getBlacklist = (): string[] => {
  const stored = localStorage.getItem(BLACKLIST_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const isInBlacklist = (imageUrl: string): boolean => {
  const blacklist = getBlacklist();
  return blacklist.includes(imageUrl);
};
