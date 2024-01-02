export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "KIITracker",
  description:
    "A simple route tracker for KIIT University students to track their routine.",
  mainNav: [
    {
      title: "Features",
      href: "/#features",
    },
    {
      title: "Process",
      href: "/#our-process",
    },
    {
      title: "Faq",
      href: "/#faq",
    },
    {
      title: "Download",
      href: "/#download",
    },
  ],
  youtube: "https://www.youtube.com/channel/UCh-zsCv66gwHCIbMKLMJmaw",
  github: "https://github.com/dead8309/kiitracker",
  privacyPolicy: "/",
  termsAndConditions: "/",
  footerLinks: [
    {
      title: "About us",
      links: [
        {
          name: "Privacy Policy",
          href: "/privacy",
        },
        {
          name: "Terms of Service",
          href: "/terms",
        },
        {
          name: "Features",
          href: "#features",
        },
      ],
    },
    {
      title: "Useful Links",
      links: [
        {
          name: "Developer",
          href: "https://github.com/dead8309",
          external: true,
        },
        {
          name: "GitHub",
          href: "https://github.com/dead8309/kiitracker",
          external: true,
        },
        {
          name: "Faq",
          href: "#faq",
        },
      ],
    },
  ],
}
