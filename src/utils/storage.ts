const KEY = 'italy-trip-2026';

interface StorageData {
  reviewedDays: string[];
  doneItems: string[];
  favoritePlaces: string[];
  favoriteFood: string[];
}

function load(): StorageData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { reviewedDays: [], doneItems: [], favoritePlaces: [], favoriteFood: [] };
    return JSON.parse(raw) as StorageData;
  } catch {
    return { reviewedDays: [], doneItems: [], favoritePlaces: [], favoriteFood: [] };
  }
}

function save(data: StorageData) {
  localStorage.setItem(KEY, JSON.stringify(data));
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
