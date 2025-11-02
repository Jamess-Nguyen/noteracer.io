import { DEFAULT_USERNAME } from "@/app/features/gameplay/constants";

export function processName(userName: string){
  if (userName === DEFAULT_USERNAME){
    return userName
  }
  const nameAry = userName.split(" ");
  return nameAry[0];
}

export function formatSecondsMillis(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const millis = ms % 1000;
  const timeLabel = `${String(totalSeconds).padStart(2, "0")}.${String(millis).padStart(3, "0")}`;
  return { totalSeconds, millis, timeLabel };
}