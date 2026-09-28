// Single source of truth for SEO. Used at build time (vite.config.js → per-route HTML,
// sitemap.xml, robots.txt) and at runtime (<Seo /> updates tags on client navigation).
// Plain JS with no imports so Node can load it directly.

export const SITE_URL = "https://aniketdabhi-portfolio.vercel.app";
export const SITE_NAME = "Aniket Dabhi";
export const OG_IMAGE = {
  path: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Aniket Dabhi – Full-Stack Software Developer",
};

export const PERSON = {
  name: "Aniket Dabhi",
  givenName: "Aniket",
  familyName: "Dabhi",
  alternateName: ["Dabhi Aniket", "Aniket D", "Dabhi AJ"],
  jobTitle: "Full-Stack Software Developer",
  description:
    "Aniket Dabhi is a Full-Stack Software Developer working with React.js, Node.js, Laravel, Python FastAPI, REST APIs, microservices, MongoDB, MySQL and PostgreSQL.",
  image: "/myavatar.webp",
  email: "aniketdabhi180@gmail.com",
  sameAs: [
    "https://github.com/DabhiAniket",
    "https://linkedin.com/in/aniketdabhi",
  ],
  worksFor: "Autobits",
  alumniOf: ["Noble University", "Shree Saurabh Arts College"],
  award: [
    "Employee of the Month – Uest EdTech (Feb 2026)",
    "Runner-Up – Code Carnival National Hackathon (Oct 2025)",
  ],
  knowsAbout: [
    "React.js",
    "JavaScript",
    "Node.js",
    "Express.js",
    "Laravel",
    "PHP",
    "Python",
    "FastAPI",
    "Django",
    "REST APIs",
    "Microservices",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Tailwind CSS",
    "Full-Stack Web Development",
  ],
};

// One entry per route. `file` is the HTML file generated at build time
// (served at the clean URL by Vercel's cleanUrls).
export const ROUTES = [
  {
    path: "/",
    file: "index.html",
    pageType: "ProfilePage",
    title: "Aniket Dabhi | Full-Stack Software Developer Portfolio",
    description:
      "Portfolio of Aniket Dabhi, Full-Stack Software Developer building reliable, scalable web apps with React.js, Node.js, Laravel, Python FastAPI and databases.",
  },
  {
    path: "/about",
    file: "about.html",
    pageType: "ProfilePage",
    title: "About Aniket Dabhi | Skills, Experience & Education",
    description:
      "About Aniket Dabhi, Full-Stack Software Developer at Autobits: skills in React.js, Node.js, Laravel and FastAPI, plus experience, education and achievements.",
  },
  {
    path: "/services",
    file: "services.html",
    pageType: "WebPage",
    title: "Services by Aniket Dabhi | Full-Stack Web Development",
    description:
      "Frontend development, web development, backend REST APIs and database design services by Aniket Dabhi, focused on clean, maintainable and high-performance code.",
  },
  {
    path: "/work",
    file: "work.html",
    pageType: "CollectionPage",
    title: "Aniket Dabhi Portfolio | Projects & Work",
    description:
      "Explore projects by Aniket Dabhi, including a social media web app and a national hackathon project – full-stack apps, REST APIs and modern frontend work.",
  },
  {
    path: "/testimonials",
    file: "testimonials.html",
    pageType: "WebPage",
    title: "My Development Approach | Aniket Dabhi",
    description:
      "How Aniket Dabhi approaches software development: clean code, practical problem solving, performance-focused engineering and continuous learning.",
  },
  {
    path: "/contact",
    file: "contact.html",
    pageType: "ContactPage",
    title: "Contact Aniket Dabhi | Hire a Full-Stack Developer",
    description:
      "Get in touch with Aniket Dabhi for web development projects, freelance work or full-stack developer opportunities. Reach out by email, LinkedIn or WhatsApp.",
  },
];

export const NOT_FOUND = {
  title: "Page Not Found | Aniket Dabhi",
  description: "The page you are looking for does not exist. Visit the portfolio of Aniket Dabhi, Full-Stack Software Developer.",
};

export const absoluteUrl = (path) =>
  path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

// JSON-LD graph for a route: Person + WebSite on every page, plus the page itself.
export const buildJsonLd = (route) => {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const pageUrl = absoluteUrl(route.path);

  const page = {
    "@type": route.pageType,
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: route.title,
    description: route.description,
    isPartOf: { "@id": websiteId },
    inLanguage: "en",
    primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${OG_IMAGE.path}` },
  };
  if (route.pageType === "ProfilePage") page.mainEntity = { "@id": personId };
  else page.about = { "@id": personId };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: PERSON.name,
        givenName: PERSON.givenName,
        familyName: PERSON.familyName,
        alternateName: PERSON.alternateName,
        jobTitle: PERSON.jobTitle,
        description: PERSON.description,
        url: `${SITE_URL}/`,
        image: `${SITE_URL}${PERSON.image}`,
        email: `mailto:${PERSON.email}`,
        sameAs: PERSON.sameAs,
        worksFor: { "@type": "Organization", name: PERSON.worksFor },
        alumniOf: PERSON.alumniOf.map((name) => ({
          "@type": "CollegeOrUniversity",
          name,
        })),
        award: PERSON.award,
        knowsAbout: PERSON.knowsAbout,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${SITE_URL}/`,
        name: `${SITE_NAME} Portfolio`,
        alternateName: ["Aniket Dabhi", "Aniket Portfolio", "Dabhi Aniket Portfolio"],
        description: ROUTES[0].description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      page,
    ],
  };
};
