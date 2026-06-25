const USER_KEY = 'italy-trip-2026:user';
const DATA_PREFIX = 'italy-trip-2026:data:';

interface StorageData {
  reviewedDays: string[];
  doneItems: string[];
  favoritePlaces: string[];
  favoriteFood: string[];
}

const EMPTY: StorageData = { reviewedDays: [], doneItems: [], favoritePlaces: [], favoriteFood: [] };

export function getUser(): string | null {
  return localStorage.getItem(USER_KEY);
}

export function setUser(name: string) {
  localStorage.setItem(USER_KEY, name);
}

function dataKey(): string {
  const user = getUser() ?? '__anon__';
  return DATA_PREFIX + user;
}

function load(): StorageData {
  try {
    const raw = localStorage.getItem(dataKey());
    if (!raw) return { ...EMPTY };
    return JSON.parse(raw) as StorageData;
  } catch {
    return { ...EMPTY };
  }
}

function save(data: StorageData) {
  localStorage.setItem(dataKey(), JSON.stringify(data));
}

function toggle(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
}

export function isReviewed(dayId: string): boolean {
  return load().reviewedDays.includes(dayId);
}

export function toggleReviewed(dayId: string): boolean {
  const data = load();
  data.reviewedDays = toggle(data.reviewedDays, dayId);
  save(data);
  return data.reviewedDays.includes(dayId);
}

export function isDone(itemKey: string): boolean {
  return load().doneItems.includes(itemKey);
}

export function toggleDone(itemKey: string): boolean {
  const data = load();
  data.doneItems = toggle(data.doneItems, itemKey);
  save(data);
  return data.doneItems.includes(itemKey);
}

export function isFavoritePlace(key: string): boolean {
  return load().favoritePlaces.includes(key);
}

export function toggleFavoritePlace(key: string): boolean {
  const data = load();
  data.favoritePlaces = toggle(data.favoritePlaces, key);
  save(data);
  return data.favoritePlaces.includes(key);
}

export function isFavoriteFood(key: string): boolean {
  return load().favoriteFood.includes(key);
}

export function toggleFavoriteFood(key: string): boolean {
  const data = load();
  data.favoriteFood = toggle(data.favoriteFood, key);
  save(data);
  return data.favoriteFood.includes(key);
}
