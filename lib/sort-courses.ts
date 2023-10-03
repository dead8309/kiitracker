import { CourseWithId } from "@/hooks/useCourses";

declare global {
    interface Array<T> {
      sortByTime(): CourseWithId[];
    }
  }
  
  Array.prototype.sortByTime = function () {
    return this.sort((a: CourseWithId, b: CourseWithId) => {
      // Extract the start time from the time slot string
      const aStartTime = new Date(`01/01/2000 ${a.timeSlot.split(' - ')[0]}`);
      const bStartTime = new Date(`01/01/2000 ${b.timeSlot.split(' - ')[0]}`);
  
      // Compare the start times
      if (aStartTime < bStartTime) {
        return -1;
      } else if (aStartTime > bStartTime) {
        return 1;
      } else {
        return 0;
      }
    });
  };