export default function textCutter(text: string, limit: number) {
  if (text.length > limit) {
    let newText = text.slice(0, limit - 1);
    return newText + '...';
  }
  return text;
}
