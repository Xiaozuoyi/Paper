export const THEME_CONFIG: App.Locals['config'] = {
  /** blog title */
  title: "聴雨书社",
  /** your name */
  author: "Evans Musk",
  /** website description */
  desc: "Evans, a personal blog site",
  /** your deployed domain */
  website: "https://paper-eta.vercel.app/",
  /** your locale */
  locale: "zh-cn",
  /** theme style */
  themeStyle: "light",
  /** your socials */
  socials: [
    {
      name: "github",
      href: "https://github.com/EvansMusk",
    },
    {
      name: "rss",
      href: "/atom.xml",
    },
    {
      name: "twitter",
      href: "https://twitter.com/Tsing_Danny",
    },
    {
      name: "mastodon",
      href: "https://github.com/moeyua/astro-theme-typography",
    }
  ],
  /** your header info */
  header: {
    twitter: "@Tsing_Danny",
  },
  /** your navigation links */
  navs: [
    {
      name: "Posts",
      href: "/posts/page/1",
    },
    {
      name: "Archive",
      href: "/archive",
    },
    {
      name: "Categories",
      href: "/categories"
    },
    {
      name: "About",
      href: "/about",
    },
  ],
  /** your category name mapping, which the `path` will be shown in the url */
  category_map: [
    // {name: "胡适", path: "hu-shi"},
  ]
}

