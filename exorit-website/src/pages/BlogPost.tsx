import { motion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import BookingButton from '../components/BookingButton'
import Section, { cardClass, fadeUp } from '../components/Section'
import { blogPosts, getBlogPost } from '../config/blog'
import { site } from '../config/site'
import { useSeo } from '../hooks/useSeo'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getBlogPost(slug) : undefined

  const url = post ? `${site.url}/blog/${post.slug}` : `${site.url}/blog`
  const authorUrl = post?.author.sameAs?.[0]

  useSeo({
    title: post ? post.title : 'Post not found',
    description: post ? post.description : 'This blog post could not be found.',
    path: post ? `/blog/${post.slug}` : '/blog',
    type: 'article',
    noindex: !post,
    jsonLd: post
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            image: `${site.url}/og-image.jpg`,
            datePublished: post.date,
            dateModified: post.date,
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
            author: {
              '@type': 'Person',
              name: post.author.name,
              jobTitle: post.author.role,
              ...(authorUrl ? { url: authorUrl } : {}),
              ...(post.author.sameAs ? { sameAs: post.author.sameAs } : {}),
            },
            publisher: {
              '@type': 'Organization',
              name: 'EXORIT',
              url: site.url,
              logo: { '@type': 'ImageObject', url: `${site.url}/images/logo.svg` },
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: post.faqs.map(faq => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site.url}/blog` },
              { '@type': 'ListItem', position: 3, name: post.title, item: url },
            ],
          },
        ]
      : undefined,
  })

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const otherPosts = blogPosts.filter(p => p.slug !== post.slug)

  return (
    <>
      <article className="border-b border-gray-200 bg-slate-50 pb-16 pt-36 dark:border-white/10 dark:bg-gray-950 md:pb-20 md:pt-44">
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500">
            <Link to="/blog" className="transition-colors hover:text-primary">
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-primary">{post.tag}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl"
          >
            <h1 className="font-display text-3xl font-bold tracking-tightest text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{post.description}</p>

            <div className="mt-8 flex items-center gap-4 border-t border-gray-200 pt-6 dark:border-white/10">
              <img
                src={post.author.image}
                alt={post.author.name}
                loading="lazy"
                className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {post.author.name}
                  <span className="font-normal text-gray-500 dark:text-gray-500"> — {post.author.role}</span>
                </p>
                <p className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500">
                  {formatDate(post.date)} · {post.readingTime}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      <Section divider={false}>
        <div className="mx-auto max-w-3xl text-left">
          {/* Key takeaways — written for the reader skimming and for an AI answer engine looking for a self-contained summary. */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8"
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-primary">Key takeaways</p>
            <ul className="space-y-3">
              {post.keyTakeaways.map(item => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="prose-content space-y-6">
            {post.content.map((block, i) => {
              if (block.type === 'h2') {
                return (
                  <h2
                    key={block.id}
                    id={block.id}
                    className="!mt-14 font-display text-2xl font-bold tracking-tightest text-gray-900 dark:text-gray-100"
                  >
                    {block.text}
                  </h2>
                )
              }
              if (block.type === 'ul') {
                return (
                  <ul key={i} className="list-disc space-y-2 pl-5 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    {block.items.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )
              }
              return (
                <p key={i} className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                  {block.text}
                </p>
              )
            })}
          </div>

          {/* Author bio */}
          <div className={`mt-14 flex flex-col gap-5 sm:flex-row ${cardClass}`}>
            <img
              src={post.author.image}
              alt={post.author.name}
              loading="lazy"
              className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
            />
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary">Written by</p>
              <h3 className="mt-1 font-display text-lg font-semibold text-gray-900 dark:text-gray-100">
                {post.author.name} · {post.author.role}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{post.author.bio}</p>
              {post.author.sameAs && (
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {post.author.sameAs.map(href => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-primary underline underline-offset-4 hover:text-primary/80"
                    >
                      {href.replace(/^https?:\/\//, '')}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* FAQ, wired to FAQPage schema above */}
          <div className="mt-14">
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-primary">Questions</p>
            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10">
              {post.faqs.map((faq, index) => (
                <details
                  key={faq.q}
                  className={`group px-6 py-5 sm:px-8 ${index > 0 ? 'border-t border-gray-200 dark:border-white/10' : ''}`}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-base font-medium text-gray-900 dark:text-gray-100">
                    {faq.q}
                    <svg
                      className="mt-1 h-4 w-4 flex-shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* More from the blog */}
      <Section>
        <p className="mb-8 text-center font-mono text-xs uppercase tracking-widest text-primary">More from the blog</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {otherPosts.map(other => (
            <Link
              key={other.slug}
              to={`/blog/${other.slug}`}
              className={`block ${cardClass}`}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-primary">{other.tag}</p>
              <h3 className="mt-3 font-display text-lg font-semibold text-gray-900 dark:text-gray-100">{other.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{other.excerpt}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="overflow-hidden pb-24 pt-4">
        <div className="container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gray-900 px-8 py-16 text-center sm:px-16 dark:bg-white/[0.04] dark:ring-1 dark:ring-white/10"
          >
            <div
              className="absolute inset-0 opacity-90"
              style={{
                backgroundImage:
                  'radial-gradient(40rem 20rem at 15% -20%, rgba(0,123,255,0.45) 0%, transparent 60%), radial-gradient(30rem 18rem at 90% 120%, rgba(0,123,255,0.28) 0%, transparent 55%)',
              }}
              aria-hidden="true"
            ></div>
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tightest text-white md:text-4xl">
                Tell us what you are trying to build
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-300">
                Twenty minutes is usually enough to know whether it is a fit.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <BookingButton location="blog_post_cta" variant="light" />
                <Button
                  to="/contact"
                  variant="outline"
                  size="lg"
                  className="!border-white/30 !text-white hover:!border-white hover:!bg-white/10 hover:!text-white"
                >
                  Send a message instead
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default BlogPostPage
