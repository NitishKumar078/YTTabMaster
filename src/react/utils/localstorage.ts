export function setlocalstorage(key: string, value: any) {
  localStorage.setItem(key, value);
}

export function getlocalstorage<T>(key: string): string | null {
  return localStorage.getItem(key);
  // return item ? JSON.parse(item) as T : null;
}
