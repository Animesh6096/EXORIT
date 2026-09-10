import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Section, { fadeUp } from '../components/Section'
import { blogPosts } from '../config/blog'
import { site } from '../config/site'
import { useSeo } from '../hooks/useSeo'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const BlogIndexPage = () => {
  useSeo({
    title: 'Blog',
    description:
      'Notes on custom software development and applied AI, written by the people who build EXORIT — not a content team.',
    path: '/blog',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'EXORIT Blog',
        url: `${site.url}/blog`,
        description: 'Notes on custom software development and applied AI from the EXORIT founders.',
        publisher: { '@type': 'Organization', name: 'EXORIT', url: site.url },
        blogPost: blogPosts.map(post => ({
          '@type': 'BlogPosting',
          headline: post.title,
          url: `${site.url}/blog/${post.slug}`,
          datePublished: post.date,
          author: { '@type': 'Person', name: post.author.name },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site.url}/blog` },
        ],
      },
    ],
  })

  return (
    <>
      <PageHero
        eyebrow="Writing"
        title="Notes on building software"
        lead="Custom software and applied AI, written by the three of us — not a content team writing on our behalf."
      />

      <Section divider={false}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative flex flex-col rounded-2xl border border-gray-200 p-8 text-left transition-colors duration-200 hover:border-primary/40 dark:border-white/10"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-primary">{post.tag}</p>
              <h2 className="mt-3 font-display text-xl font-semibold text-gray-900 transition-colors group-hover:text-primary dark:text-gray-100">
                <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 flex-grow text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-gray-200 pt-5 dark:border-white/10">
                <img
                  src={post.author.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-9 w-9 flex-shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{post.author.name}</p>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-500">
                    {formatDate(post.date)} · {post.readingTime}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>
    </>
  )
}

export default BlogIndexPage
