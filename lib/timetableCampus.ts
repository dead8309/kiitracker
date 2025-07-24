// TimetableCampus.ts

export function TimetableCampus(classRoom: string): string {
  if (classRoom.includes("C25")) {
    return "Campus 25";
  } 
  else if (classRoom.includes("C13")) {
    return "Campus 13";
  } 
  else if (classRoom.includes("C14")) {
    return "Campus 14";
  } 
  else if (classRoom.includes("C15")) {
    return "Campus 15";
  } 
  else if (classRoom.includes("C16")) {
    return "Campus 16";
  } 
  else {
    return "";
  }
}
