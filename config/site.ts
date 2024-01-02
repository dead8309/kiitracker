export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "KIITracker",
  description:
    "A simple route tracker for KIIT University students to track their routine.",
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Terms",
      href: "/terms",
    },
    {
      title: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      title: "Download",
      href: "/download",
    },
  ],
  youtube: "https://www.youtube.com/channel/UCh-zsCv66gwHCIbMKLMJmaw",
  github: "https://github.com/dead8309/kiitracker",
  privacyPolicy: "/privacy-policy",
  termsAndConditions: "/",
  footerLinks: [
    {
      title: "About us",
      links: [
        {
          name: "Privacy Policy",
          href: "/privacy-policy",
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
