import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Web Development",
      icon: "🌐",
      skills: [
        {
          name: "Frontend",
          tools: [
            { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
            { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
            { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
            { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
            { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
          ]
        },
        {
          name: "Styling",
          tools: [
            { name: "Tailwind", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
            { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
            { name: "SASS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
          ]
        }
      ]
    },
    {
      title: "Mobile Development",
      icon: "📱",
      skills: [
        {
          name: "Cross Platform",
          tools: [
            { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
            { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
          ]
        },
        {
          name: "Native",
          tools: [
            { name: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
            { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
          ]
        }
      ]
    },
    {
      title: "Backend & Cloud/BaaS",
      icon: "☁️",
      skills: [
        {
          name: "Backend",
          tools: [
            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
            { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
          ]
        },
        {
          name: "Cloud Services",
          tools: [
            { name: "AWS", icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
            { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
            { name: "Supabase", icon: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png" },
            { name: "MongoDB Atlas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
          ]
        }
      ]
    },
    {
      title: "AI & Tools",
      icon: "🔧",
      skills: [
        {
          name: "AI/ML",
          tools: [
            { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
            { name: "YOLO", icon: "https://cdn.prod.website-files.com/646dd1f1a3703e451ba81ecc/64994922cf2a6385a4bf4489_UltralyticsYOLO_mark_blue.svg" },
            { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
          ]
        },
        {
          name: "Development",
          tools: [
            { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
            { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
            { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
            { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
          ]
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Increased delay between children
        delayChildren: 0.5    // Delay start of children animations
      }
    }
  };

  const skillGroupVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Slower stagger between icons
      }
    }
  };

  const dropletVariants = {
    hidden: { 
      opacity: 0,
      scale: 0,
      y: -30,
    },
    show: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,    // Reduced stiffness for smoother motion
        damping: 15,       // Adjusted damping for more bounce
        mass: 1.2,         // Increased mass for heavier feel
        duration: 1.2      // Longer duration
      }
    }
  };

  const rippleVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.3,
    },
    show: { 
      opacity: [0, 0.3, 0],
      scale: [1, 1.4, 1.8],
      transition: {
        duration: 1.5,
        times: [0, 0.5, 1],
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="w-full py-24 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header section */}
        <div className="text-center mb-20 relative">
          <div className="relative h-24 mb-8">
            <img 
              src="/assets/startrail.png" 
              alt="Star trail decoration" 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-16 object-contain opacity-80"
            />
          </div>
          <h2 className="text-4xl font-bold text-white relative z-10">Technology Stack</h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => {
            const sectionRef = useRef(null);
            const isInView = useInView(sectionRef, { 
              margin: "-100px",
              amount: 0.3, // Only trigger when 30% of the element is in view
              once: false  // Allow re-animation
            });

            return (
              <motion.div
                key={idx}
                ref={sectionRef}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: idx * 0.2 }}
                className="relative group"
              >
                {/* Card background effect */}
                <motion.div 
                  className="absolute inset-0 bg-white/5 rounded-2xl blur-xl transition-all duration-300"
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Card Content */}
                <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                  </div>

                  <motion.div 
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                  >
                    {category.skills.map((skillGroup, groupIdx) => (
                      <motion.div 
                        key={groupIdx}
                        variants={skillGroupVariants}
                      >
                        <h4 className="text-sm text-white/70 mb-3">{skillGroup.name}</h4>
                        <div className="flex flex-wrap gap-4">
                          {skillGroup.tools.map((tool, toolIdx) => (
                            <motion.div
                              key={toolIdx}
                              className="group/icon relative"
                              variants={dropletVariants}
                              whileHover={{ 
                                scale: 1.15,
                                transition: { duration: 0.3, ease: "easeOut" }
                              }}
                            >
                              {/* Ripple effect */}
                              <motion.div
                                className="absolute inset-0 bg-white/10 rounded-lg z-0"
                                variants={rippleVariants}
                              />
                              
                              {/* Icon container */}
                              <div className="w-10 h-10 rounded-lg bg-white/5 p-2 flex items-center justify-center group-hover/icon:bg-white/10 transition-all duration-300 relative z-10">
                                <motion.img 
                                  src={tool.icon} 
                                  alt={tool.name}
                                  className="w-full h-full object-contain"
                                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                                  transition={{ duration: 0.5, delay: toolIdx * 0.1 }}
                                />
                              </div>
                              
                              {/* Tooltip */}
                              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/80 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                {tool.name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;