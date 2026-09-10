import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import Button from '../components/Button'
import BookingButton from '../components/BookingButton'
import { trackEvent } from '../lib/analytics'
import { site } from '../config/site'
import PageHero from '../components/PageHero'
import Section, { SectionHeader, cardClass } from '../components/Section'
import WorldMap from '../components/WorldMap'
import { useSeo } from '../hooks/useSeo'

/**
 * Hoisted out of the JSX below so the same text backs both what a visitor
 * reads and the FAQPage structured data — one source, no risk of the two
 * drifting apart.
 */
const contactFaqs = [
  {
    question: 'What services does EXORIT offer?',
    answer:
      'EXORIT offers a comprehensive range of software development services including web development, mobile app development, UI/UX design, cloud solutions, and custom software development tailored to your business needs.',
  },
  {
    question: 'How long does a typical project take to complete?',
    answer:
      'Project timelines vary depending on scope and complexity. A simple website might take 2-4 weeks, while complex applications can take several months. We will provide you with a detailed timeline during the consultation phase.',
  },
  {
    question: 'What is your pricing model?',
    answer:
      'Every project is quoted individually, because custom software is not a product on a shelf. After a short call we send a written scope with a number attached, broken into milestones, and you decide before anything starts. Longer-running work can be arranged as a monthly retainer instead.',
  },
  {
    question: 'Do you provide maintenance and support after launch?',
    answer:
      'Yes, we offer ongoing maintenance and support services to ensure your product remains secure, up-to-date, and performs optimally. We have various support packages available to suit different needs and budgets.',
  },
  {
    question: 'Can you work with my existing team?',
    answer:
      'Absolutely! We are experienced in collaborating with in-house teams and can provide the specific expertise or additional capacity you need. Our team integrates seamlessly with your existing workflows and processes.',
  },
]

const ContactPage = () => {
  useSeo({
    title: 'Contact',
    description:
      'Book a 20-minute call or send a message. EXORIT works from Dhaka, Bangladesh with a co-founder in Adelaide, Australia — real overlap with AU, EU and US hours.',
    path: '/contact',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: contactFaqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: `${site.url}/contact` },
        ],
      },
    ],
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    // Honeypot. Real users never see this field; bots fill everything.
    website: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot tripped: pretend it worked, send nothing.
    if (formData.website) {
      setFormStatus('success')
      return
    }
    
    // EmailJS Configuration from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    
    // Check if EmailJS is configured
    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS is not configured. Please set up your environment variables.')
      alert(`Email service is not configured. Please contact us directly at ${site.fallbackEmail}`)
      return
    }
    
    try {
      setFormStatus('submitting')
      
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        subject: formData.subject,
        message: formData.message,
        to_email: site.fallbackEmail
      }
      
      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      trackEvent('contact_submit', { subject: formData.subject || 'unspecified' })
      
      // Reset form and show success message
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        website: ''
      })
      
      setFormStatus('success')
      
      // Reset status after a few seconds
      setTimeout(() => {
        setFormStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Error sending email:', error)
      setFormStatus('error')
      
      // Reset status after a few seconds
      setTimeout(() => {
        setFormStatus('idle')
      }, 5000)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to us"
        lead="Tell us what you are trying to build. A short call answers more than a long email thread."
      />

      {/* Contact Information Section */}
      <Section divider={false}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: 'Email Us',
                info: 'exorit.official@gmail.com',
                description: 'For general inquiries',
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: 'Call Us',
                info: '+880 178 183 6541',
                description: 'Mon-Fri, Dhaka and Australian business hours',
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.210l-2.257 1.130a11.042 11.042 0 005.516 5.516l1.130-2.257a1 1 0 011.210-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                )
              },
              {
                title: 'Visit Us',
                info: '',
                description: 'Merul Badda, Dhaka, Bangladesh',
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cardClass}
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
                {item.info && <p className="mb-1 text-sm font-medium text-primary">{item.info}</p>}
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
        </div>
      </Section>

      {/* Contact Form */}
      <Section>
          <div className="mx-auto max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10"
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Message</p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tightest text-gray-900 dark:text-gray-100 md:text-4xl">
                Send us a message
              </h2>
              <div className="mx-auto mt-6 h-px w-16 bg-primary/50" aria-hidden="true"></div>
              <p className="mt-6 text-base text-gray-600 dark:text-gray-400">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10 flex flex-col items-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center sm:flex-row sm:justify-between sm:text-left"
            >
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">Skip the back and forth</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Twenty minutes on a call answers more than ten emails. Pick any slot in your timezone.
                </p>
              </div>
              <BookingButton location="contact_page" size="md" className="flex-shrink-0" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl border border-gray-200 p-8 text-left dark:border-white/10"
            >
              {formStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-6">
                    Your message has been received. We'll get back to you shortly.
                  </p>
                  <Button onClick={() => setFormStatus('idle')} variant="secondary">
                    Send Another Message
                  </Button>
                </div>
              ) : formStatus === 'error' ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                      <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h3>
                  <p className="text-gray-600 mb-6">
                    There was an error sending your message. Please try again.
                  </p>
                  <Button onClick={() => setFormStatus('idle')} variant="secondary">
                    Try Again
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot: hidden from users and screen readers, visible to bots. */}
                  <div className="absolute left-[-9999px]" aria-hidden="true">
                    <label htmlFor="website">Leave this field empty</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-white/15 dark:text-gray-100 dark:placeholder:text-gray-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-white/15 dark:text-gray-100 dark:placeholder:text-gray-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-white/15 dark:text-gray-100 dark:placeholder:text-gray-500"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-white/15 dark:text-gray-100 dark:placeholder:text-gray-500"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Subject*
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-white/15 dark:text-gray-100 dark:placeholder:text-gray-500"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Project Consultation">Project Consultation</option>
                      <option value="Partnership Opportunity">Partnership Opportunity</option>
                      <option value="Career Information">Career Information</option>
                      <option value="Support Request">Support Request</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Your Message*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-white/15 dark:text-gray-100 dark:placeholder:text-gray-500"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="relative"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <span className="opacity-0">Send Message</span>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
      </Section>

      {/* Where we are */}
      <Section>
        <SectionHeader
          eyebrow="Coverage"
          title="Where we are, and when we overlap"
          lead="We work from Dhaka, with a co-founder in Adelaide. Dhaka is UTC+6, so the working day reaches further than most offshore teams manage."
        />
        <WorldMap
          dots={[
            { start: { lat: 23.8103, lng: 90.4125, label: 'Dhaka' }, end: { lat: -34.9285, lng: 138.6007, label: 'Adelaide' } },
            { start: { lat: 23.8103, lng: 90.4125, label: 'Dhaka' }, end: { lat: 51.5074, lng: -0.1278, label: 'London' } },
            { start: { lat: 23.8103, lng: 90.4125, label: 'Dhaka' }, end: { lat: 40.7128, lng: -74.006, label: 'New York' } },
            { start: { lat: -34.9285, lng: 138.6007, label: 'Adelaide' }, end: { lat: 37.7749, lng: -122.4194, label: 'San Francisco' } },
          ]}
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              region: 'Australia',
              body: 'Four to five hours ahead of Dhaka. A full working day of overlap, plus a co-founder in the country.',
            },
            {
              region: 'Europe',
              body: 'Our afternoon is your morning. Calls land comfortably in both working days without anyone staying up.',
            },
            {
              region: 'North America',
              body: 'Our evening is your morning. We hold scheduled slots for US and Canadian clients rather than pretending otherwise.',
            },
          ].map(item => (
            <div key={item.region} className={cardClass}>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">{item.region}</p>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          lead="If you can't find what you're looking for, ask us directly."
        />
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gray-200 text-left dark:border-white/10">
            {contactFaqs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`px-6 py-5 sm:px-8 ${index > 0 ? 'border-t border-gray-200 dark:border-white/10' : ''}`}
              >
                <h3 className="mb-3 font-display text-base font-medium text-gray-900 dark:text-gray-100">{item.question}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.answer}</p>
              </motion.div>
            ))}
          </div>
      </Section>
    </>
  )
}

export default ContactPage