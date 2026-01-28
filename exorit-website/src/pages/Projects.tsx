import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'

// Project data
const projectsData = [
  {
    id: 1,
    title: 'Hire Me',
    category: 'SaaS',
    tags: ['Flask', 'React', 'Recruiting', 'Realtime'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    description: 'Full-stack recruiting platform with job posting, search, application tracking, and real-time messaging for candidates and recruiters.',
    client: 'Internal Product',
    year: '2025',
    link: 'https://github.com/Animesh6096/Hire_me'
  },
  {
    id: 2,
    title: 'SecureBlogVault',
    category: 'Security',
    tags: ['React', 'TypeScript', 'Express', 'AES'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    description: 'Secure blog platform with AES encryption, Scrypt hashing, and hardened authentication flows for protected content.',
    client: 'Internal Product',
    year: '2025',
    link: 'https://github.com/Animesh6096/SecureBlogVault'
  },
  {
    id: 3,
    title: 'ReadVenture',
    category: 'SaaS',
    tags: ['Next.js 15', 'TypeScript', 'MongoDB', 'Tailwind'],
    image: '/images/readventure.png',
    description: 'Book community platform with exchange matching, marketplace, writing tools, and community features built on a full-stack Next.js + Express architecture.',
    client: 'ReadVenture',
    year: '2025',
    link: 'https://readventure001.vercel.app/'
  }
]

const ProjectsPage = () => {
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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Our Projects</h1>
            <div className="h-1 w-24 bg-primary mb-8 mx-auto"></div>
            <p className="text-xl md:text-2xl text-gray-200">
              Showcasing our innovative solutions across various industries. From web and mobile applications to AI-powered systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg inline-flex flex-wrap gap-2 justify-center shadow-sm">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleFilterClick(category)}
                  className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 shadow'
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
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer group"
                >
                  <div className="relative overflow-hidden h-64">
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{project.category}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{project.year}</span>
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
              className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">{selectedProject.title}</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{selectedProject.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Client</h4>
                    <p className="text-gray-900 dark:text-gray-100">{selectedProject.client}</p>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Year</h4>
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

      {/* CTA Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              Ready to Build Something Amazing?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-700 dark:text-gray-300 mb-10"
            >
              Let's turn your vision into reality with our experienced team and cutting-edge technology.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button to="/contact" size="lg">
                Start Your Project
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProjectsPage
