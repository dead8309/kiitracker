import { DM_Sans as FontDm } from "next/font/google"

export const fontDmSans = FontDm({
  subsets: ['latin'],
  weight: ['500', "600", "700"],
  variable: '--font-dm'
})