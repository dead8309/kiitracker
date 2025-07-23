// lib/loadTimetable.ts

import { Course } from "./course-schema"
import { TimetableCampus } from "./timetableCampus"

export async function loadCoursesTimetable(courseCode: string): Promise<{ [key: string]: Course[] } | null> {
  try {
    const res = await fetch('/data/data.json'); // data/data.json
    const allData = await res.json();

    const courseTimetable = allData[courseCode];

    if (!courseTimetable) return null;
    // 
    Object.keys(courseTimetable).forEach((day) => {
      courseTimetable[day].forEach((session: Course) => {
        session.campus = TimetableCampus(session.classRoom ?? "");
      });
    });

    return courseTimetable;
  } catch (error) {
    console.error("Failed to load timetable...", error);
    return null;
  }
}
