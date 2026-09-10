import { motion } from 'framer-motion'
import Button from '../components/Button'
import BookingButton from '../components/BookingButton'
import TrustStrip from '../components/TrustStrip'
import { engagements, faqs, icps, positioning, process } from '../config/site'
import WebAnimation from '../components/WebAnimation'
import CodingWindow from '../components/CodingWindow'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useRef } from 'react'

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for hero background
  const [backgroundRef, backgroundY] = useScrollAnimation({
    offset: [0, 1],
    outputRange: [0, 100]
  });

  // Fade effect for services
  const [servicesRef, servicesOpacity] = useScrollAnimation({
    offset: [-0.5, 0.5],
    outputRange: [0, 1]
  });

  // Scale effect for CTA
  const [ctaRef, ctaScale] = useScrollAnimation({
    offset: [-0.3, 0.3],
    outputRange: [0.95, 1]
  });

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
        <motion.div 
          ref={backgroundRef}
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-r from-gray-900 to-blue-900 opacity-80 z-0 dark:from-gray-800 dark:to-gray-700"
        ></motion.div>
        <motion.div 
          ref={backgroundRef}
          className="absolute inset-0 z-10 opacity-20 dark:opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: backgroundY
          }}
        ></motion.div>
        {/* Scrim: the hero photograph is busy, and the headline has to win. */}
        <div
          className="absolute inset-0 z-10 bg-gradient-to-b from-gray-900/85 via-gray-900/70 to-gray-900/90 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/95"
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 z-20 pointer-events-auto">
          <WebAnimation />
        </div>
        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-1/2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 dark:text-gray-100"
              >
                {positioning.headline}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg text-gray-300 mb-8 dark:text-gray-400"
              >
                {positioning.subhead}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <BookingButton location="hero">{positioning.primaryCta}</BookingButton>
                <Button to="/projects" variant="outline" size="lg">
                  {positioning.secondaryCta}
                </Button>
              </motion.div>
            </div>
            <CodingWindow />
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30"
        >
          <a 
            href="#about" 
            className="flex flex-col items-center text-white dark:text-gray-300"
            aria-label="Scroll down"
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <svg className="animate-bounce w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </a>
        </motion.div>
      </section>

      <TrustStrip />

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              About EXORIT
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 w-20 bg-primary mx-auto mb-8"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-gray-700 dark:text-gray-300 mb-8"
            >
              EXORIT is a software studio building custom web platforms, mobile applications and AI systems
              for businesses that need software shaped around how they actually work. We cover the whole build —
              design, web and iOS development, AI integration, and the data pipelines underneath it.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-gray-700 dark:text-gray-300 mb-10"
            >
              We work with clients across Australia, Europe, North America and Bangladesh, and we run every
              project the same way: a written scope before anything starts, a working demo every week, and code
              that belongs to you from the first commit.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button to="/about" variant="secondary">
                Learn More About Us
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section 
        ref={servicesRef}
        className="py-20 bg-gray-50 dark:bg-gray-800 overflow-hidden"
      >
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8"
          style={{ opacity: servicesOpacity }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-16"
          >
            What We Offer
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: 'Web Development',
                description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
                icon: (
                  <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: 'App Development',
                description: 'Cross-platform mobile applications that deliver seamless experiences across all devices.',
                icon: (
                  <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: 'iOS Development',
                description: 'Native iOS applications optimized for iPhone and iPad with exceptional performance.',
                icon: (
                  <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: 'Web Design',
                description: 'Beautiful, user-centric designs that create engaging digital experiences for your audience.',
                icon: (
                  <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                )
              },
              {
                title: 'AI Integration',
                description: 'Intelligent automation and AI-powered solutions to transform your business operations.',
                icon: (
                  <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: 'Data Collection & Preprocessing',
                description: 'Comprehensive data gathering and preparation services for ML models and analytics.',
                icon: (
                  <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                )
              }
            ].map((service, index) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-700 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-5">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-5">{service.description}</p>
                <Button to="/contact" variant="secondary" size="sm">Talk to us about this</Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>


      {/* Who We Work With */}
      <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6"
          >
            Who We Work With
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-20 bg-primary mx-auto mb-8"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 mb-16"
          >
            If your project is not one of these, we will tell you on the first call and point you somewhere better.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {icps.map((icp, index) => (
              <motion.div
                key={icp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">{icp.fit}</p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{icp.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{icp.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6"
          >
            How We Work
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-20 bg-primary mx-auto mb-8"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 mb-16"
          >
            The risk in hiring a remote team is not skill. It is silence. Here is what removes it.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                className="bg-white dark:bg-gray-700 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <span className="block text-4xl font-bold text-primary/30 mb-4">{item.step}</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagements */}
      <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6"
          >
            Ways to Work Together
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-20 bg-primary mx-auto mb-8"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 mb-16"
          >
            Every project is custom, so every project is quoted on its own. Tell us what you need and you get a
            written scope with a number attached — usually within a couple of days of the first call.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {engagements.map((engagement, index) => (
              <motion.div
                key={engagement.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="flex flex-col bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{engagement.name}</h3>
                <p className="text-sm font-medium text-primary mb-5">{engagement.duration}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{engagement.summary}</p>
                <ul className="space-y-3 mb-8 flex-grow text-left">
                  {engagement.deliverables.map(item => (
                    <li key={item} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <svg className="h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <BookingButton location={`engagement_${engagement.id}`} size="md" className="w-full">
                  Get a quote
                </BookingButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6"
          >
            Questions Clients Ask First
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-20 bg-primary mx-auto mb-12"
          ></motion.div>

          <div className="max-w-3xl mx-auto text-left divide-y divide-gray-200 dark:divide-gray-700">
            {faqs.map(faq => (
              <details key={faq.q} className="group py-6">
                <summary className="flex cursor-pointer items-start justify-between gap-4 text-lg font-semibold text-gray-900 dark:text-gray-100 list-none">
                  {faq.q}
                  <svg
                    className="h-6 w-6 flex-shrink-0 text-primary transition-transform group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-300">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="py-20 bg-primary overflow-hidden"
      >
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8"
          style={{ scale: ctaScale }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, type: "spring" }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
Tell Us What You Are Trying to Build
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-white/90 mb-10"
            >
              Twenty minutes. You leave with an honest answer on whether it is buildable, roughly what it
              involves, and whether we are the right team for it.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex flex-wrap justify-center gap-4">
                <BookingButton location="footer_cta" variant="light">
                  {positioning.primaryCta}
                </BookingButton>
                <Button 
                  to="/contact" 
                  variant="outline"
                  size="lg"
                  className="!border-white !text-white hover:!text-primary hover:!border-primary"
                >
                  Send a message instead
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default Home
