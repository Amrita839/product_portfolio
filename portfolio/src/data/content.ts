// Everything on the site that is "content" lives here. Edit this file to update
// the portfolio - the pages read from it.

export const profile = {
  name: "Amrita Kumari",
  role: "Product Engineer",
  tagline:
    "I find the user problem, read the data, and build the AI-powered prototype that proves the fix.",
  summary:
    "Computer Science undergraduate at VIT Vellore working across product discovery, product analytics, AI products, growth and go-to-market. I've worked with founders and cross-functional teams to identify user problems, analyse product behaviour and drive initiatives from research to execution.",
  email: "sharma.amrita15416736@gmail.com",
  github: "https://github.com/Amrita839",
  linkedin: "https://www.linkedin.com/in/amrita-kumari-9026712b7/",
  resume: "/Amrita_Kumari_Resume.pdf",
};

export type CaseStudy = {
  slug: string;
  title: string;
  company: string;
  kind: string;
  image: string;
  pdf: string;
  summary: string;
  problems: { title: string; detail: string }[];
  ideas: string[];
  metrics: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "zepto",
    title: "Zepto",
    company: "Zepto",
    kind: "Product teardown",
    image: "/case-studies/zepto.jpg",
    pdf: "/case-studies/Zepto_Teardown_by_Amrita.pdf",
    summary:
      "A teardown of Zepto's 10-minute grocery app focused on product discovery and search - and the dead ends that push users to a competitor's app.",
    problems: [
      {
        title: "Out-of-stock search is a dead end",
        detail:
          "When a searched product is out of stock, similar items only show on the product page - so most users drop before ever opening it.",
      },
      {
        title: "Out-of-stock in cart leaves only 'OK'",
        detail:
          "An item that goes out of stock after being added gives the user no way forward except back.",
      },
      {
        title: "Product suggestions are unstructured",
        detail:
          "The 'suggest a product' box on empty searches is plain text, so the signal is hard to use for inventory or recommendations.",
      },
    ],
    ideas: [
      "Show top alternatives to an out-of-stock item right in the search results' 'Suggested for you' slot.",
      "Replace the cart dead-end with a 'View similar products' CTA into the item's sub-category.",
      "Add a category dropdown to product suggestions to feed inventory planning and personalisation.",
    ],
    metrics: ["Search-to-cart conversion", "Search drop-off rate", "Order value"],
  },
  {
    slug: "meesho",
    title: "Meesho",
    company: "Meesho",
    kind: "Product teardown",
    image: "/case-studies/meesho.jpg",
    pdf: "/case-studies/Meesho_Teardown_by_Amrita.pdf",
    summary:
      "Finding the right product, and trusting the product you receive - a persona-led teardown of Meesho for first-time, Tier 2/3 shoppers.",
    problems: [
      {
        title: "Users struggle to find the product they want",
        detail:
          "Searches get rephrased again and again; the 'high quality' filter ranks a 4★ item with 230 ratings above one with 3,063, and colour filters don't surface the matching image.",
      },
      {
        title: "What arrives doesn't match what was expected",
        detail:
          "Colour names are missing, photos and reviews aren't trusted, and there's no signal on the quality a buyer will actually get.",
      },
    ],
    ideas: [
      "A 'View similar' option that uses the image to pull matching products from other sellers.",
      "A 'Top rated' filter that weighs rating count against the category average.",
      "Show the image that matches the applied filter, and tag each item with its colour name.",
      "'Ratings by feature' and a product FAQ - the questions you'd ask in an offline store.",
    ],
    metrics: ["Conversion rate", "Time spent on search", "Search repetitions", "Return rate"],
  },
  {
    slug: "mobikwik-zip-snpl",
    title: "MobiKwik Zip SNPL",
    company: "MobiKwik",
    kind: "Product case study",
    image: "/case-studies/mobikwik.jpg",
    pdf: "/case-studies/MobiKwik_Zip_SNPL_by_Amrita.pdf",
    summary:
      "Zip SNPL - Save Now, Pay Later: a goal-based savings feature that helps users afford big-ticket purchases by combining MobiKwik's Xtra and Zip EMI.",
    problems: [
      {
        title: "Big-ticket purchases take too long to save for",
        detail:
          "Survey (15 respondents, 4 interviews): 67% of people earning under ₹50K need 12–18 months to fund a big purchase, and half default to FDs or savings accounts.",
      },
      {
        title: "Users don't know low-risk, good-return options",
        detail:
          "There's an unmet need to educate users on goal-based saving through low-risk instruments, instead of loans with interest.",
      },
    ],
    ideas: [
      "Goal setting and tracking: name the goal, set the amount and the time window.",
      "SIP-style investment frequency the user is comfortable with.",
      "Investment calculation across Xtra (P2P) and Zip EMI credit limit.",
      "Guardrails: warn when the periodic investment exceeds spending capacity.",
    ],
    metrics: [
      "North Star: total investment through Zip SNPL",
      "Goals set per week",
      "% repeat SNPL goals",
      "Early goal cancellations",
    ],
  },
];

export type Project = {
  title: string;
  year: string;
  description: string;
  stack: string[];
  href: string;
  highlight: string;
};

export const projects: Project[] = [
  {
    title: "AI Business Intelligence Copilot",
    year: "2025",
    description:
      "An AI analytics product that lets non-technical users query business data in plain language, turning questions into SQL, contextual insights and actions - with forecasting and churn prediction built in.",
    stack: ["Python", "SQL", "Flask", "Gemini", "REST APIs"],
    href: "https://github.com/Amrita839",
    highlight: "Natural language → insights",
  },
  {
    title: "WaveCmd",
    year: "2025",
    description:
      "A gesture-controlled desktop interface: real-time hand detection, classification and OS-level actions, tuned for responsive frame processing.",
    stack: ["Python", "OpenCV", "MediaPipe", "SVM", "PyAutoGUI"],
    href: "https://github.com/Amrita839",
    highlight: "92.3% accuracy · 4,200+ samples",
  },
];

export const experience = [
  {
    role: "Product Growth Intern",
    company: "Mobile Premier League (MPL)",
    period: "Sep 2026 – Present",
    points: [
      "Own growth for new games across the US and Brazil, managing 80+ creators from sourcing to publishing.",
      "Analyse market and product trends to inform product prioritisation and launch strategy.",
      "Built a performance-linked payout pipeline using creator-level view thresholds to cut inefficient spend.",
    ],
  },
  {
    role: "Founder's Office Intern",
    company: "Assessli",
    period: "Jul 2026 – Sep 2026",
    points: [
      "Launched a Pioneer Program across 9 campuses with the founders.",
      "Sourced 23 creators within a ₹40K budget; built an n8n + LLM outreach workflow.",
    ],
  },
  {
    role: "Growth Intern",
    company: "Hintro AI",
    period: "Jun 2026 – Jul 2026",
    points: [
      "Ran 200+ customer discovery calls and demos; turned pain points into onboarding improvements.",
      "Built a B2B prospecting and scoring system; Campus Ambassador experiment onboarded 23 students.",
    ],
  },
  {
    role: "Design & Product Intern",
    company: "Moon Finance",
    period: "Aug 2024 – Oct 2024",
    points: [
      "Analysed funnels and user behaviour to find onboarding drop-offs and activation opportunities.",
    ],
  },
];

export const skills = {
  Product: ["Product Strategy", "Product Analytics", "User Research", "Competitive Analysis", "Go-to-Market", "User Flows"],
  Analytics: ["SQL", "Python", "Excel", "Google Analytics", "Funnel Analysis"],
  "AI & Automation": ["LLMs", "Prompt Engineering", "n8n", "Claude", "Gemini", "APIs"],
  Tools: ["Figma", "Streamlit", "Google Sheets", "Git/GitHub"],
};

export const achievements = [
  "1st Prize, Technica'24 Hackathon – VIT Vellore",
  "Oracle Cloud Infrastructure 2025 Generative AI Professional",
  "Oracle Java Foundations – Oracle Certified",
  "E-Cell VIT – Marketing & Outreach Team",
];
