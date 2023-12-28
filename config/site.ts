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
  github: "https://github.com/dead8309",
  privacyPolicy: "/",
  termsAndConditions: "/",
  footerLinks: [
    {
      title: "About us",
      links: [
        {
          name: "Support",
          href: "#",
        },
        {
          name: "Features",
          href: "#",
        },
        {
          name: "Terms",
          href: "#",
        },
      ],
    },
    {
      title: "Useful Links",
      links: [
        {
          name: "Privacy Policy",
          href: "#",
        },
        {
          name: "Documentation",
          href: "#",
        },
        {
          name: "GitHub",
          href: "#",
        },
      ],
    },
    {
      title: "Contact",
      links: [
        {
          name: "Developer",
          href: "#",
        },
        {
          name: "Faq",
          href: "#",
        },
      ],
    },
  ],
}
