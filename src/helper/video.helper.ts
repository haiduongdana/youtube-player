export const secondsToDuration = (seconds: number): string => {
  let duration = '';
  const hours = Math.floor(seconds / 3600);
  if (hours > 0) {
    duration += hours + ':';
  }
  const minutes = Math.floor((seconds % 3600) / 60);
  duration += (minutes === 0 ? '0' : minutes) + ':';
  const secs = Math.floor(seconds % 60);
  duration += secs.toString().padStart(2, '0');
  return duration;
}