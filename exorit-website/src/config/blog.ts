/**
 * Blog content. Each post has one EXORIT founder as author — this is genuine
 * authorship, not a byline convention, and the bio lines link back to real
 * facts on the Team page (see PLAN-2026.md, decision-adjacent founder-titles
 * entry). Written for three audiences at once: a human reading top to bottom,
 * a search engine matching a query to a heading, and an AI answer engine
 * looking for a self-contained paragraph it can quote — see the "Key
 * takeaways" list and FAQ block on every post, which exist for that third
 * reader as much as the first two.
 */

export interface BlogAuthor {
  name: string
  role: string
  image: string
  bio: string
  /** Profile URLs for Person schema `sameAs` — an E-E-A-T signal for search and AI answer engines. Only include links actually verified. */
  sameAs?: string[]
}

export interface BlogFaq {
  q: string
  a: string
}

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id: string }
  | { type: 'ul'; items: string[] }

export interface BlogPost {
  slug: string
  title: string
  /** Meta description and the dek shown under the title. Keep under ~160 characters. */
  description: string
  /** Shown on the blog index card. Can run longer than the meta description. */
  excerpt: string
  /** ISO 8601 date. */
  date: string
  readingTime: string
  tag: string
  author: BlogAuthor
  keyTakeaways: string[]
  content: ContentBlock[]
  faqs: BlogFaq[]
}

const animesh: BlogAuthor = {
  name: 'Animesh Bhattacharjee',
  role: 'Co-Founder & CEO, EXORIT',
  image: '/team/animesh.webp',
  bio: 'Owns client relationships, scope and delivery at EXORIT. CS graduate (BRAC University) focused on AI/ML and computer vision, and builder of the Hire Me recruiting platform and SecureBlogVault. More at animesh.tech.',
  sameAs: [
    'https://animesh.tech',
    'https://github.com/Animesh6096',
    'https://www.linkedin.com/in/animesh-bhattacharjee-jhalok/',
    'https://orcid.org/0009-0007-6945-902X',
  ],
}

const tawhid: BlogAuthor = {
  name: 'Golam Tawhid Fahad',
  role: 'Co-Founder & CTO, EXORIT',
  image: '/team/tawhid.webp',
  bio: 'Owns architecture, code quality and technical decisions at EXORIT. Full-stack engineer.',
  sameAs: [
    'https://github.com/Golam-Tawhid',
    'https://www.linkedin.com/in/g-t-fahad/',
    'https://www.facebook.com/gt.fahad',
  ],
}

const maisha: BlogAuthor = {
  name: 'Maisha Iffat Chowdhury',
  role: 'Co-Founder & Chief Design Officer, EXORIT',
  image: '/team/maisha.webp',
  bio: 'Owns product design and user experience at EXORIT. Reading for a Master of Information Technology in Cyber Security at Adelaide University.',
  sameAs: [
    'https://github.com/maishahaha',
    'https://www.linkedin.com/in/maisha-iffat-chowdhury',
    'https://www.facebook.com/maishahahaha',
  ],
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'custom-software-development-guide',
    title: 'Custom Software Development: What It Is, When It Beats Off-the-Shelf, and What It Actually Costs',
    description:
      'Custom software development means building an application around how your business actually operates, instead of adapting your business to fit a product built for everyone. Here is when that trade-off is worth it.',
    excerpt:
      'Off-the-shelf software is cheap until it forces your team to work around it. Here is a plain-language guide to when custom software actually pays for itself.',
    date: '2026-08-04',
    readingTime: '7 min read',
    tag: 'Custom Software',
    author: animesh,
    keyTakeaways: [
      'Custom software is worth it when your process is the advantage, not the paperwork — if a spreadsheet or an off-the-shelf tool already does the job, keep using it.',
      'The real cost of off-the-shelf software is not the subscription fee, it is the hours your team spends working around what it cannot do.',
      'A working prototype before a full build removes most of the risk that makes custom software feel expensive.',
      'Ownership of the code and the data is the difference between a tool you use and a tool you depend on.',
    ],
    content: [
      {
        type: 'p',
        text: 'Custom software development is the practice of building an application specifically for one business’s workflow, data and constraints, rather than adopting a generic product built to serve thousands of businesses at once. The trade-off is straightforward: off-the-shelf software is cheaper on day one and custom software is cheaper over the life of the business, provided the business’s process is actually distinctive enough to justify it.',
      },
      {
        type: 'h2',
        id: 'when-off-the-shelf-stops-working',
        text: 'When off-the-shelf software stops working',
      },
      {
        type: 'p',
        text: 'Every growing business hits the same wall. A generic tool — a CRM, a booking system, an inventory spreadsheet — works fine when the business is small enough to bend around it. Then the business grows past what the tool was designed for, and the team starts building workarounds: a second spreadsheet to track what the first one cannot, a person whose whole job is re-entering data between two systems that will not talk to each other, an export-and-email routine that runs every Friday because the software has no report for what the business actually needs to know.',
      },
      {
        type: 'p',
        text: 'None of those workarounds show up on an invoice. That is what makes off-the-shelf software feel cheap long after it has stopped being cheap — the cost moved from a subscription line item to hours of skilled staff time nobody is tracking against it.',
      },
      {
        type: 'ul',
        items: [
          'The same data gets entered into two or more systems by hand.',
          'Someone on the team has an unofficial job title like "the person who knows the workaround."',
          'A core part of the business runs on a spreadsheet that one person understands.',
          'The tool has a feature request board with your request on it, unanswered, for over a year.',
        ],
      },
      {
        type: 'p',
        text: 'Any one of those on its own is normal. Two or three of them together, on the same process, is usually the point where a custom build starts paying for itself within the first year.',
      },
      {
        type: 'h2',
        id: 'what-custom-software-actually-costs',
        text: 'What custom software actually costs',
      },
      {
        type: 'p',
        text: 'The honest answer is: it depends on scope, and anyone who quotes a number before understanding the scope is guessing. What can be said in general is that a defined MVP — the smallest version of the system that replaces the worst of the manual work — is a matter of weeks, not months, when the scope is genuinely kept small. The projects that run over budget are almost always projects where the scope grew mid-build because nobody wrote it down first.',
      },
      {
        type: 'p',
        text: 'This is why a written scope before any code is written matters more than the hourly rate of whoever is writing the code. A fixed, agreed scope is what turns "custom software is risky" into "custom software is a known quantity."',
      },
      {
        type: 'h2',
        id: 'de-risking-the-decision',
        text: 'How to de-risk the decision before committing to a full build',
      },
      {
        type: 'p',
        text: 'The lowest-risk way to test whether a custom build is worth it is a short, scoped prototype — something that proves the hardest part of the idea works against real data, before anyone commits a full budget to it. If the prototype shows the core mechanic works, the full build is a known-good bet. If it does not, the business has spent two weeks finding that out instead of six months.',
      },
      {
        type: 'p',
        text: 'The second de-risking factor is ownership. Custom software should mean the business owns the repository, the infrastructure and the data from day one — not a vendor holding the keys to a system the business now depends on. Ownership is what separates a genuine asset from a long-term rental with extra steps.',
      },
      {
        type: 'h2',
        id: 'the-short-version',
        text: 'The short version',
      },
      {
        type: 'p',
        text: 'Custom software is not a status symbol and it is not always the right call — plenty of businesses are correctly served by a good off-the-shelf tool for years. It becomes the right call at the specific point where the workaround costs more than the build would, and the way to find that point is to look for a process that is genuinely core to how the business wins, not just something that happens to be inconvenient.',
      },
    ],
    faqs: [
      {
        q: 'How is custom software different from off-the-shelf software?',
        a: 'Off-the-shelf software is built once and sold to many businesses, so it has to serve the average case. Custom software is built for one business’s specific process, data and constraints, which means it fits better but costs more to build and is not free to change later without engineering time.',
      },
      {
        q: 'How long does custom software development take?',
        a: 'A scoped MVP is typically weeks rather than months when the scope is defined up front and kept small. Projects that run long almost always ran long because the scope grew after the build started, not because custom software is inherently slow.',
      },
      {
        q: 'Is custom software development worth it for a small business?',
        a: 'It is worth it when a core process is distinctive enough that no off-the-shelf tool fits it well, and the manual workarounds around that gap are already costing real staff time. It is usually not worth it for processes that are the same as everyone else’s — accounting, generic scheduling, standard e-commerce — where a good existing tool is cheaper and already mature.',
      },
    ],
  },
  {
    slug: 'ai-in-software-development',
    title: 'How AI Has Changed Software Development (And What It Has Not Changed)',
    description:
      'AI has made writing code faster, but the hard part of software was never typing it out. Here is what AI in software development is actually good at, and where it still needs an engineer holding the wheel.',
    excerpt:
      'Code generation is the visible part of AI in software development. The part that actually matters — architecture, correctness, judgment — is still a human job. Here is where the line sits.',
    date: '2026-08-18',
    readingTime: '8 min read',
    tag: 'AI Development',
    author: tawhid,
    keyTakeaways: [
      'AI has compressed the time it takes to write code, not the time it takes to decide what to build and why.',
      'The biggest real gain is in the unglamorous middle of a project — tests, boilerplate, migrations, first-draft documentation.',
      'AI-written code still needs the same code review discipline as human-written code, arguably more, because it is confident even when it is wrong.',
      'The engineers getting the most out of AI tools are the ones who already knew how to do the work without them.',
    ],
    content: [
      {
        type: 'p',
        text: 'AI has changed software development more in the last few years than any single tool change in the previous decade, but it has changed a narrower slice of the job than the marketing around it suggests. It has made writing code faster. It has not made deciding what to build, how to architect it, or whether it is correct any faster — those were never typing problems, and they still are not.',
      },
      {
        type: 'h2',
        id: 'what-got-faster',
        text: 'What actually got faster',
      },
      {
        type: 'p',
        text: 'The clearest, least controversial win is in the parts of a codebase that are necessary but not interesting: boilerplate, repetitive test cases, first-draft API clients, converting a data format from one shape to another, writing documentation for code that already works. This is real time saved, and it adds up — a meaningful share of a working day used to go to typing out things the engineer already knew how to write.',
      },
      {
        type: 'p',
        text: 'The second real win is in unfamiliar territory: reading an unfamiliar codebase, understanding an error message from a library nobody on the team has used before, getting a rough first draft of a solution to a problem the team has not solved before. AI tools are good research assistants for this, in the same way a knowledgeable colleague who has seen more codebases than any one person could is a good resource — useful for a starting point, not a final answer.',
      },
      {
        type: 'h2',
        id: 'what-did-not-change',
        text: 'What has not changed',
      },
      {
        type: 'p',
        text: 'Software projects fail for reasons that have nothing to do with typing speed. They fail because the scope was never written down clearly, because the architecture could not handle the load it actually got, because the team built the wrong thing well instead of the right thing at all, or because nobody understood the system well enough to safely change it under pressure. AI tools do not touch any of that. If anything, a team that leans on AI-generated code without understanding it deeply is more exposed to those failures, not less — the code exists, but nobody on the team can explain why it is correct.',
      },
      {
        type: 'p',
        text: 'This is the part that gets lost in the discourse: AI-generated code needs the same review discipline as human-written code, and arguably more of it, because it is fluent and confident regardless of whether it is right. A wrong answer typed by a junior engineer usually looks uncertain. A wrong answer generated by a model reads exactly like a right one.',
      },
      {
        type: 'h2',
        id: 'who-benefits-most',
        text: 'Who actually benefits from AI tools',
      },
      {
        type: 'p',
        text: 'The engineers getting the most genuine value out of AI coding tools are, almost without exception, the ones who could already do the work without them. They know what correct output looks like, so they catch the confidently wrong answer in seconds instead of shipping it. They know how to break a problem into a shape a model handles well. The tool amplifies judgment that already exists; it does not substitute for judgment that does not.',
      },
      {
        type: 'p',
        text: 'That has a direct implication for how we work: we use AI tools throughout a project, from first draft to test coverage, but every line that ships is still reviewed by an engineer who understands why it is correct — not just that it runs.',
      },
      {
        type: 'h2',
        id: 'the-practical-effect',
        text: 'The practical effect on how projects get built',
      },
      {
        type: 'p',
        text: 'For a client, the honest version of this story is: AI has shortened the distance between "we understand the requirement" and "there is working code to look at," which is why weekly demos on a fixed scope are realistic in a way they were not a few years ago. It has not shortened the distance between "there is working code" and "this is correct, secure and maintainable" — that distance is still closed by an engineer who understands the system, and it always will be.',
      },
    ],
    faqs: [
      {
        q: 'Will AI replace software developers?',
        a: 'AI has automated the typing-heavy parts of writing code, not the judgment-heavy parts: deciding what to build, architecting a system that will hold up under real load, and knowing whether generated code is actually correct. Those remain engineering skills, and they are what separates a working prototype from a system a business can depend on.',
      },
      {
        q: 'Is AI-generated code safe to use in production?',
        a: 'It can be, provided it goes through the same review process as any other code — arguably a stricter one, since AI-generated code is fluent and confident even when it is wrong. Treating it as a first draft that an engineer verifies, rather than a finished answer, is the difference between a productivity gain and a production incident.',
      },
      {
        q: 'How does EXORIT use AI in its own development process?',
        a: 'We use AI tools for the parts of a build where they measurably help — boilerplate, test coverage, first-draft documentation, exploring an unfamiliar library — but every line that ships is reviewed by an engineer who understands why it is correct, not just that it runs.',
      },
    ],
  },
  {
    slug: 'why-ai-matters-in-daily-life',
    title: 'Why AI Belongs in Your Daily Workflow, Not Just Your Product Roadmap',
    description:
      'Most people encounter AI as a feature announcement, not a daily tool. Here is why treating AI as something you use every day — not something your product has — is what actually changes how you work.',
    excerpt:
      'The gap between "our product has AI" and "I personally use AI every day" is where most of the real value gets left on the table. Here is why that gap matters and how to close it.',
    date: '2026-09-01',
    readingTime: '6 min read',
    tag: 'AI & Daily Life',
    author: maisha,
    keyTakeaways: [
      'AI is most useful as a habit you build into ordinary tasks, not a feature you occasionally reach for.',
      'The people getting real value from AI treat it like a capable junior colleague: fast, willing, and in need of a second look.',
      'Small, daily, low-stakes uses of AI build the judgment needed to use it well on high-stakes work later.',
      'Design and product decisions benefit from AI the same way engineering does: as a way to see more options faster, not as a replacement for deciding.',
    ],
    content: [
      {
        type: 'p',
        text: 'There is a specific, common gap between businesses that have added AI to their product and people who actually use AI in their own daily work. The first is a feature announcement. The second is a habit. The habit is where almost all of the real, felt benefit lives, and it is available to nearly anyone right now, regardless of whether their product roadmap mentions AI at all.',
      },
      {
        type: 'h2',
        id: 'the-feature-vs-habit-gap',
        text: 'The gap between a feature and a habit',
      },
      {
        type: 'p',
        text: 'A lot of AI adoption inside businesses stops at "we added an AI feature to our product." That is a real, useful thing to do, and it can be genuinely valuable to customers. But it is a different thing from a team using AI daily in how they actually work — drafting, reviewing, researching, designing, debugging. Teams that only ship AI as a customer-facing feature but never adopt it internally are leaving most of the available value unclaimed, because the compounding benefit of AI is in how much faster you personally get through ordinary tasks, every day, not in what you shipped once.',
      },
      {
        type: 'h2',
        id: 'treat-it-like-a-colleague',
        text: 'Treat it like a capable, fast, occasionally wrong colleague',
      },
      {
        type: 'p',
        text: 'The mental model that works best, in design work and in most knowledge work generally, is to treat AI like a very fast, very willing junior colleague who has read an enormous amount but has no actual judgment of their own yet. You would not publish a junior colleague’s first draft without reading it. You also would not refuse their help entirely because their first draft sometimes needs correction. The useful middle ground is asking for the draft, then applying your own judgment to it — which is faster than starting from a blank page, and safer than shipping the first output unread.',
      },
      {
        type: 'p',
        text: 'In design specifically, this looks like: generating several rough directions fast instead of laboring over one, getting a first pass at copy or a component structure to react to instead of staring at a blank canvas, or asking for a critique of a design decision from an angle you had not considered. None of that replaces design judgment. All of it makes exercising that judgment faster.',
      },
      {
        type: 'h2',
        id: 'start-small-daily',
        text: 'Why starting small and daily matters more than one big use case',
      },
      {
        type: 'p',
        text: 'The people who use AI well on important, high-stakes work are almost always the people who first built the habit on small, low-stakes work — drafting an email, summarizing a document, getting unstuck on a name for something. That low-stakes practice is where you learn what the tool is actually reliable at and where it confidently gets things wrong. Skipping straight to high-stakes use without that groundwork is how people either over-trust a wrong answer or dismiss the tool entirely after one bad experience.',
      },
      {
        type: 'ul',
        items: [
          'Use it to get a rough first draft of something you were about to write from scratch — an email, an outline, a description.',
          'Use it to summarize something long before deciding whether to read the whole thing.',
          'Use it to ask "what am I missing here?" on a decision you have mostly already made.',
          'Always keep the final judgment call — what ships, what gets sent, what gets decided — with a person.',
        ],
      },
      {
        type: 'h2',
        id: 'why-this-matters-for-a-business',
        text: 'Why this matters beyond personal productivity',
      },
      {
        type: 'p',
        text: 'A business whose people use AI daily, as a habit, builds better product decisions about AI than a business that only encounters it through a roadmap meeting — because the team has direct, personal, first-hand experience of where it is genuinely useful and where it is not. That experience is difficult to fake and expensive to skip. It is also, in our experience building AI features for clients, the single clearest predictor of whether an AI feature a team ships will actually be good: whether the team building it uses AI tools themselves, every day, on their own work.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between using AI and having an AI feature?',
        a: 'An AI feature is something a product offers a customer. Using AI is a personal daily habit — drafting, summarizing, reviewing, exploring options faster. Most of the felt, compounding benefit of AI comes from the habit, not from the feature, and teams that build the habit internally tend to ship better AI features as a result.',
      },
      {
        q: 'How do I start using AI daily without it going wrong?',
        a: 'Start with low-stakes tasks — first drafts, summaries, brainstorming — where a wrong or mediocre answer costs you almost nothing to catch and correct. That is how you learn what the tool is reliable at before you rely on it for anything that matters.',
      },
      {
        q: 'Does using AI daily replace professional judgment?',
        a: 'No. The useful pattern is asking AI for a fast first pass and then applying your own judgment to it, the same way you would review a capable junior colleague’s draft rather than publish it unread. The judgment call stays with a person; the tool just gets you to the point of judgment faster.',
      },
    ],
  },
]

export const getBlogPost = (slug: string) => blogPosts.find(post => post.slug === slug)
