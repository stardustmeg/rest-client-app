export function formatJson(text: string, onError: () => void): string {
  try {
    return JSON.stringify(JSON.parse(text), null, 4);
  } catch {
    onError();
    return text;
  }
}
