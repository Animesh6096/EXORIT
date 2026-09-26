import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'
import BookingButton from '../components/BookingButton'
import PageHero from '../components/PageHero'
import { fadeUp } from '../components/Section'
import { useSeo } from '../hooks/useSeo'
import { site } from '../config/site'
import { projects as projectsData } from '../config/projects'

const ProjectsPage = () => {
  useSeo({
    title: 'Projects',
    description:
      'Systems EXORIT has designed, built and shipped — a recruiting platform, an encrypted publishing tool, and a book community app. All three are running and open to view.',
    path: '/projects',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: projectsData.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: project.title,
            description: project.description,
            url: project.link,
            image: `${site.url}${project.image}`,
          },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${site.url}/projects` },
        ],
      },
    ],
  })

  const categories = ['All', 'SaaS', 'Security']
  const [activeFilter, setActiveFilter] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const [selectedProject, setSelectedProject] = useState<null | typeof projectsData[0]>(null)
  
  // Filter projects using useEffect to ensure it runs whenever activeFilter changes
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projectsData)
    } else {
      setFilteredProjects(projectsData.filter(project => project.category === activeFilter))
    }
  }, [activeFilter])
  
  // Handle filter click
  const handleFilterClick = (category: string) => {
    setActiveFilter(category)
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }
  
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Projects"
        lead="Systems we have designed, built and shipped. Every one of these is running — open them and judge for yourself."
      />

      {/* Filter Section */}
      <section className="pt-16">
        <div className="container">
          <div className="flex flex-wrap justify-center">
            <div className="inline-flex flex-wrap justify-center gap-2 rounded-xl border border-gray-200 p-1.5 dark:border-white/10">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleFilterClick(category)}
                  className={`rounded-lg px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeFilter === category
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:text-primary dark:text-gray-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 pt-12">
        <div className="container">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map(project => (
                <motion.div
                  layout
                  key={project.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 10 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 transition-colors duration-200 hover:border-primary/40 dark:border-white/10"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-xs bg-primary/80 text-white px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-white/90 line-clamp-2">{project.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 font-display text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary dark:text-gray-100">
                      {project.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs uppercase tracking-widest text-primary">{project.category}</span>
                      <span className="font-mono text-xs text-gray-500 dark:text-gray-400">{project.year}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl text-gray-600 dark:text-gray-300">No projects found in this category.</h3>
              <Button 
                onClick={() => handleFilterClick('All')} 
                variant="secondary" 
                className="mt-4"
              >
                Show All Projects
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-gray-900"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-72 md:h-96">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/70 text-white flex items-center justify-center"
                  onClick={() => setSelectedProject(null)}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="mb-3 font-display text-2xl font-bold tracking-tightest text-gray-900 dark:text-gray-100 md:text-3xl">
                  {selectedProject.title}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{selectedProject.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">Client</h4>
                    <p className="text-gray-900 dark:text-gray-100">{selectedProject.client}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">Year</h4>
                    <p className="text-gray-900 dark:text-gray-100">{selectedProject.year}</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button href={selectedProject.link}>
                    View Project
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="overflow-hidden pb-24">
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
                Ready to build something like this?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-300">
                Tell us what you have in mind. Twenty minutes is usually enough to know whether it is a fit.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <BookingButton location="projects_cta" variant="light" />
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

export default ProjectsPage
