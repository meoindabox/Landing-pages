import React, { useState, useEffect, useRef } from 'react';

// Main App component
const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projects, setProjects] = useState([
    {
      title: 'Heavy Parcel Delivery – BBS',
      shortDescription: 'BBS is GHTK’s large-parcel delivery service for items over 20kg. After more than four years of persistence and continuous improvement, BBS has become one of GHTK’s two core logistics services. My team consistently ranked among the top 3 in sales performance, contributing to service enhancement and significant revenue growth.',
      imageUrl: 'https://placehold.co/600x400/fef9d7/000000?text=Project+BBS',
      techStack: ['Logistics Service', 'B2C Sales'],
      liveLink: 'https://ghtk.vn/dich-vu-giao-hang-cong-kenh-hang-nang-ghtk/',
      githubLink: '#',
      isExpanded: false,
      detailedDescription: '',
      isLoading: false
    },
    {
      title: 'SMEs – B2B Heavy Goods Delivery',
      shortDescription: 'SMEs is GHTK’s delivery service for bulky shipments over 200kg, targeting distribution businesses with tailored last-mile solutions. Since its launch, my team has consistently been in the top 3 for sales, contributing nearly VND 1 billion (~USD 40,000) in revenue within the first three months.',
      imageUrl: 'https://placehold.co/600x400/d299c2/FFFFFF?text=Project+SMEs',
      techStack: ['Logistics Service', 'B2B Sales'],
      liveLink: 'https://ghtk.vn/for-business/',
      githubLink: '#',
      isExpanded: false,
      detailedDescription: '',
      isLoading: false
    }
  ]);

  const otherProjects = [
      {
          title: 'OCOP Partnership (One Commune One Product)',
          description: 'Partnered with local agricultural producers through the OCOP program to offer tailored last-mile delivery services, helping to commercialize regional products and expand logistics coverage in rural areas.'
      },
      {
          title: 'GAM Solution',
          description: 'Supported the implementation of GAM, a specialized delivery solution designed for various product types.'
      },
      {
          title: 'Fulfillment Service Development',
          description: 'Assisted in launching GHTK’s warehouse and fulfillment service, providing inventory storage and customized packing solutions for diverse product lines across industries.'
      }
  ];

  // Data for Working Experience
  const [experience, setExperience] = useState([
    {
      company: 'GIAO HANG TIET KIEM JOINT STOCK COMPANY',
      location: 'Ho Chi Minh City, Vietnam',
      logo: 'https://placehold.co/100x100/d299c2/FFFFFF?text=GHTK', // Placeholder logo for GHTK
      positions: [
        {
          title: 'Regional Sales Manager',
          duration: 'Nov 2023 - Present',
          description: [
            'Led B2C e-commerce sales expansion through OCOP, SME, and Cross-border logistics projects, consistently maintaining top performance across all initiatives',
            'Provided regular market updates to the Executive Board, highlighting key trends, identifying promising client segments, and proposing step-by-step plans to improve service rollout',
            'Consistently entrusted with new company projects, taking charge of designing service flows, reporting progress, and suggesting improvements to fix pain points',
            'Built and updated standardized processes and SOPs, resulting in smoother team workflows and more efficient coordination with other departments',
            'Took an active role in training and mentoring new Sales staff, developing onboarding materials, and contributing to internal talent reviews. One team member was promoted to Leader after strong performance'
          ]
        },
        {
          title: 'Business Development Leader',
          duration: 'May 2023 - Oct 2023',
          description: [
            'Scaled wholesale client sales across key categories, increasing team revenue by 150% year-over-year',
            'Built and developed a high-performing sales team, with two members awarded Best Sales of the Year at GHTK Awards 2023'
          ]
        },
        {
          title: 'Senior Growth Specialist',
          duration: 'Mar 2023 - May 2023',
          description: [
            'Contributed to the launch of Xfast (2-4 hours urban delivery service in HCMC), helping to grow the fresh-food client base'
          ]
        },
        {
          title: 'Business Development Executive',
          duration: 'Jan 2021 - Feb 2023',
          description: [
            'Sourced and secured B2C logistics contracts via social media, telesales, and field sales, with peak monthly revenue reaching USD 55,000.',
            'Managed 5 new hires independently, with 2 becoming top performers and 1 awarded Most Promising Employee of 2022'
          ]
        }
      ]
    }
  ]);

  // Data for Education Background
  const [education, setEducation] = useState([
    {
      institution: 'UNIVERSITY OF ECONOMICS HO CHI MINH CITY (UEH)',
      degree: 'Bachelor\'s Degree in Finance and Banking',
      duration: '2017 - 2021',
      gpa: '3.0/4.0',
      details: [
        'Positions Held: Class Representative, Standing Committee Member of Faculty Youth Union, Secretary of DC024 Youth Union.'
      ]
    }
  ]);

  // Data for Key Achievements
  const [achievements, setAchievements] = useState({
    university: [
      {
        title: 'Certificate of Merit from the University Youth Union',
        description: 'For outstanding performance in Youth Union activities and student movements at the faculty level (Term 2017–2019).'
      },
      {
        title: 'Certificate of Merit from the University Youth Union',
        description: 'For outstanding contribution during Youth Month 2019.'
      }
    ],
    work: [
      {
        title: 'Top 100 Outstanding Individuals 2024 (Outstanding Leader)',
        description: 'Selected from 30,000+ staff company-wide, across all levels at GHTK.'
      },
      {
        title: 'Leader of the Year, GHTK Awards 2023',
        description: 'Recognized for outstanding leadership contribution at GHTK.'
      },
      {
        title: 'One of two winners in GHTK\'s 2023 Leadership Program',
        description: 'Selected from 36 leaders; promoted to Regional Sales Manager.'
      }
    ]
  });

  // State for content visibility (for fade-in animation)
  const [isAboutContentVisible, setIsAboutContentVisible] = useState(false);
  const [isSkillsContentVisible, setIsSkillsContentVisible] = useState(false);
  const [isExperienceContentVisible, setIsExperienceContentVisible] = useState(false);
  const [isEducationContentVisible, setIsEducationContentVisible] = useState(false);
  const [isAchievementsContentVisible, setIsAchievementsContentVisible] = useState(false);
  const [isProjectsContentVisible, setIsProjectsContentVisible] = useState(false);
  const [isContactContentVisible, setIsContactContentVisible] = useState(false);

  // Refs for content containers to observe intersection
  const aboutContentRef = useRef(null);
  const skillsContentRef = useRef(null);
  const experienceContentRef = useRef(null);
  const educationContentRef = useRef(null);
  const achievementsContentRef = useRef(null);
  const projectsContentRef = useRef(null);
  const contactContentRef = useRef(null);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Effect to update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'education', 'achievements', 'projects', 'contact'];
      let currentActive = 'home';
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentActive = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generic IntersectionObserver setup for content visibility
  const setupIntersectionObserver = (ref, setVisibility) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibility(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  };

  useEffect(() => setupIntersectionObserver(aboutContentRef, setIsAboutContentVisible), []);
  useEffect(() => setupIntersectionObserver(skillsContentRef, setIsSkillsContentVisible), []);
  useEffect(() => setupIntersectionObserver(experienceContentRef, setIsExperienceContentVisible), []);
  useEffect(() => setupIntersectionObserver(educationContentRef, setIsEducationContentVisible), []);
  useEffect(() => setupIntersectionObserver(achievementsContentRef, setIsAchievementsContentVisible), []);
  useEffect(() => setupIntersectionObserver(projectsContentRef, setIsProjectsContentVisible), []);
  useEffect(() => setupIntersectionObserver(contactContentRef, setIsContactContentVisible), []);

  // Function to toggle detailed description visibility
  const toggleProjectDetails = (projectIndex) => {
    setProjects(prevProjects =>
      prevProjects.map((proj, idx) =>
        idx === projectIndex ? { ...proj, isExpanded: !proj.isExpanded } : proj
      )
    );
  };

  // Function to generate detailed description using Gemini API
  const handleGenerateDescription = async (projectIndex, projectTitle, shortDescription) => {
    setProjects(prevProjects =>
      prevProjects.map((proj, idx) =>
        idx === projectIndex ? { ...proj, isLoading: true, detailedDescription: '' } : proj
      )
    );

    try {
      const prompt = `Write a detailed and engaging description for a project titled "${projectTitle}" with the following short description: "${shortDescription}". Make it professional and highlight the project's value.`;
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will automatically provide the API key
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setProjects(prevProjects =>
          prevProjects.map((proj, idx) =>
            idx === projectIndex ? { ...proj, detailedDescription: text, isExpanded: true } : proj
          )
        );
      } else {
        console.error("Gemini API response structure is unexpected:", result);
        setProjects(prevProjects =>
          prevProjects.map((proj, idx) =>
            idx === projectIndex ? { ...proj, detailedDescription: 'Could not generate detailed description. Please try again.', isExpanded: true } : proj
          )
        );
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setProjects(prevProjects =>
        prevProjects.map((proj, idx) =>
          idx === projectIndex ? { ...proj, detailedDescription: 'An error occurred while generating the description. Please try again.', isExpanded: true } : proj
        )
      );
    } finally {
      setProjects(prevProjects =>
        prevProjects.map((proj, idx) =>
          idx === projectIndex ? { ...proj, isLoading: false } : proj
        )
      );
    }
  };
  
  const navLinks = ['home', 'about', 'skills', 'experience', 'education', 'achievements', 'projects', 'contact'];
  const getNavLinkName = (section) => {
      const names = {
          home: 'Home',
          about: 'About Me',
          skills: 'My Skills',
          experience: 'Experience',
          education: 'Education',
          achievements: 'Achievements',
          projects: 'Project Experience',
          contact: 'Contact'
      };
      return names[section] || section;
  }

  return (
    <div className="bg-gradient-to-br from-[#d299c2] via-[#e8cce9] to-[#fef9d7] text-gray-800 antialiased">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#fef9d7] to-[#d299c2] bg-opacity-95 shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <a href="#home" className="text-2xl font-bold rounded-md p-2 drop-shadow-sm hover:bg-white transition-colors duration-300">
            <span className="text-[#d299c2]">TRAN LE XUAN</span>
          </a>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`px-4 py-2 rounded-md text-lg font-bold drop-shadow-sm transition-all duration-300
                  ${activeSection === section ? 'bg-gradient-to-r from-[#d299c2] to-[#fef9d7] text-white shadow-lg' : 'text-gray-700 hover:bg-white hover:text-[#d299c2]'}`}
              >
                {getNavLinkName(section)}
              </button>
            ))}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white bg-opacity-95">
            {navLinks.map((section) => (
              <button
                key={section}
                onClick={() => {
                  scrollToSection(section);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 text-lg font-bold
                  ${activeSection === section ? 'bg-[#d299c2] text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                {getNavLinkName(section)}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="relative z-10 text-center p-8 bg-black bg-opacity-20 rounded-xl shadow-2xl backdrop-blur-sm transform transition-all duration-500 hover:scale-105">
          <h1 className="text-5xl font-extrabold mb-4 opacity-0 animate-fade-in-rise delay-100">
            Hi there, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d299c2] to-[#fef9d7]">TRAN LE XUAN</span>
          </h1>
          <p className="text-3xl font-light mb-8 opacity-0 animate-fade-in-rise delay-200">
            BUSINESS DEVELOPMENT MANAGER
          </p>
          <button
            onClick={() => scrollToSection('projects')}
            className="bg-white text-[#d299c2] hover:bg-[#ffe0f0] px-8 py-4 rounded-full text-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 opacity-0 animate-fade-in-rise delay-300"
          >
            View My Projects
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 text-gray-800">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className={`text-5xl font-extrabold text-center mb-12 text-white drop-shadow-lg opacity-0 ${isAboutContentVisible ? 'animate-fade-in-rise' : ''}`}>
            About Me
          </h2>
          <div ref={aboutContentRef} className={`bg-white p-8 rounded-xl shadow-xl border border-gray-200 opacity-0 ${isAboutContentVisible ? 'animate-fade-in-rise' : ''}`}>
            <div className="flex flex-col md:flex-row items-center md:space-x-12">
              <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
                <img
                  src="https://i.postimg.cc/CRqqBcN6/214356931-180112110860829-8422441968532442858-n.jpg"
                  alt="Your portrait photo"
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-xl border-4 border-[#d299c2] transform transition-all duration-500 hover:scale-105"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x300/fef9d7/000000?text=Your+Photo"; }}
                />
              </div>
              <div className="md:w-2/3 text-lg leading-relaxed text-gray-700">
                <p className="mb-4">
                  After several years at GHTK, one of Vietnam’s major logistics platforms, I’ve learned that driving results means more than just hitting sales targets. It also means building systems that empower people, simplify complexity, and prepare teams to grow with purpose.
                </p>
                <p className="mb-4">
                  My work principle is rooted in honesty, responsibility, and a focus on sustainability. I care deeply about the core values of both the business and the people I work with.
                </p>
                <p className="mb-4">
                  I’m currently a Regional Manager in the Business Development Department at GHTK, where I lead teams to drive revenue growth across various projects. My main focus is on B2C and B2B logistics, and I’ve consistently maintained strong performance, often ranking from upper-middle to top across all assigned projects.
                </p>
                <p>
                  In addition to business analysis and planning, I specialize in identifying bottlenecks and proactively proposing solutions to improve workflows. This process-driven mindset has led me to design standardized operating procedures, develop internal training programs, and directly support the capability-building of team members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 text-gray-800">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className={`text-5xl font-extrabold text-center mb-12 text-white drop-shadow-lg opacity-0 ${isSkillsContentVisible ? 'animate-fade-in-rise' : ''}`}>
            My Skills
          </h2>
          <div ref={skillsContentRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: 'Strategic Planning', icon: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' },
              { name: 'Market Analysis', icon: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' },
              { name: 'Competitive Positioning', icon: 'M12 3L2 12h3v8h14v-8h3L12 3zm0 2.83L17.17 11H6.83L12 5.83z' },
              { name: 'Customer Insight', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
              { name: 'Data-Driven Decisions', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-4v-2h4v2zm0-4h-4V7h4v6z' },
              { name: 'Business Acumen', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
              { name: 'Logical Thinking', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' },
              { name: 'Team Coaching', icon: 'M15 6H9V4h6v2zm-3 12c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z' },
              { name: 'Talent Development', icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
              { name: 'Stakeholder Communication', icon: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z' },
            ].map((skill, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center transform hover:scale-105 hover:shadow-lg border border-gray-200 opacity-0 ${isSkillsContentVisible ? 'animate-fade-in-rise' : ''}`}
                style={{ animationDelay: isSkillsContentVisible ? `${100 + index * 50}ms` : '0ms' }}
              >
                <svg
                  className="w-16 h-16 text-[#d299c2] mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={skill.icon} />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Experience Section */}
      <section id="experience" className="py-20 text-gray-800">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className={`text-5xl font-extrabold text-center mb-12 text-white drop-shadow-lg opacity-0 ${isExperienceContentVisible ? 'animate-fade-in-rise' : ''}`}>
            Working Experience
          </h2>
          <div ref={experienceContentRef} className="space-y-12">
            {experience.map((company, companyIndex) => (
              <div key={companyIndex} className={`bg-white p-8 rounded-xl shadow-xl border border-gray-200 opacity-0 ${isExperienceContentVisible ? 'animate-fade-in-rise' : ''}`}
                   style={{ animationDelay: isExperienceContentVisible ? `${100 + companyIndex * 100}ms` : '0ms' }}>
                <div className="flex items-center mb-6">
                  <img
                    src={company.logo}
                    alt={`${company.company} Logo`}
                    className="w-20 h-20 rounded-full object-cover mr-6 shadow-md"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/fef9d7/000000?text=Logo"; }}
                  />
                  <div>
                    <h3 className="text-3xl font-bold text-[#d299c2]">{company.company}</h3>
                    <p className="text-gray-600 text-lg">{company.location}</p>
                  </div>
                </div>
                <div className="space-y-8">
                  {company.positions.map((position, positionIndex) => (
                    <div key={positionIndex} className={`border-l-4 border-[#fef9d7] pl-6 py-2 opacity-0 ${isExperienceContentVisible ? 'animate-fade-in-rise' : ''}`}
                         style={{ animationDelay: isExperienceContentVisible ? `${200 + positionIndex * 150}ms` : '0ms' }}>
                      <h4 className="text-xl font-semibold text-gray-800">{position.title}</h4>
                      <p className="text-gray-600 italic mb-3">{position.duration}</p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        {position.description.map((item, itemIndex) => (
                           <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Background Section */}
      <section id="education" className="py-20 text-gray-800">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className={`text-5xl font-extrabold text-center mb-12 text-white drop-shadow-lg opacity-0 ${isEducationContentVisible ? 'animate-fade-in-rise' : ''}`}>
            Education Background
          </h2>
          <div ref={educationContentRef} className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className={`bg-white p-8 rounded-xl shadow-xl border border-gray-200 opacity-0 ${isEducationContentVisible ? 'animate-fade-in-rise' : ''}`}
                   style={{ animationDelay: isEducationContentVisible ? `${100 + index * 100}ms` : '0ms' }}>
                <h3 className={`text-3xl font-bold text-[#d299c2] mb-2`}>{edu.institution}</h3>
                <h4 className={`text-xl font-semibold text-gray-800 mb-1`}>{edu.degree}</h4>
                <p className={`text-gray-600 italic mb-3`}>{edu.duration} | GPA: {edu.gpa}</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {edu.details.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements Section */}
      <section id="achievements" className="py-20 text-gray-800">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className={`text-5xl font-extrabold text-center mb-12 text-white drop-shadow-lg opacity-0 ${isAchievementsContentVisible ? 'animate-fade-in-rise' : ''}`}>
            Key Achievements
          </h2>
          <div ref={achievementsContentRef} className={`bg-white p-8 rounded-xl shadow-xl border border-gray-200 opacity-0 ${isAchievementsContentVisible ? 'animate-fade-in-rise' : ''}`}>
            <div>
              <h3 className="text-3xl font-bold text-[#d299c2] mb-4">University Awards & Recognition</h3>
              <div className="space-y-6">
                {achievements.university.map((achievement, index) => (
                  <div key={`uni-achieve-${index}`}>
                    <h4 className="text-xl font-semibold text-gray-800">{achievement.title}</h4>
                    <p className="text-gray-700">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <hr className="my-8 border-t border-gray-200" />
            <div>
              <h3 className="text-3xl font-bold text-[#d299c2] mb-4">Work Accomplishments</h3>
              <div className="space-y-6">
                {achievements.work.map((achievement, index) => (
                  <div key={`work-achieve-${index}`}>
                    <h4 className="text-xl font-semibold text-gray-800">{achievement.title}</h4>
                    <p className="text-gray-700">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 text-gray-800">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className={`text-5xl font-extrabold text-center mb-12 text-white drop-shadow-lg opacity-0 ${isProjectsContentVisible ? 'animate-fade-in-rise' : ''}`}>
            Project Experience
          </h2>
          <div ref={projectsContentRef} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl border border-gray-200 transition-transform duration-300 opacity-0 ${isProjectsContentVisible ? 'animate-fade-in-rise' : ''}`}
                   style={{ animationDelay: isProjectsContentVisible ? `${200 + index * 100}ms` : '0ms' }}>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/fef9d7/000000?text=Project"; }}
                />
                <div className="p-6">
                  <h3 className="text-3xl font-bold text-[#d299c2] mb-3">{project.title}</h3>
                  <p className="text-gray-700 mb-4">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-[#fef9d7] text-gray-800 text-sm font-medium px-3 py-1 rounded-full">{tech}</span>
                    ))}
                  </div>
                  <div className="flex space-x-4 mb-4">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-[#d299c2] text-white px-5 py-2 rounded-md hover:bg-[#b880a4] transition-colors duration-300 shadow-md"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                      View Live
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-gray-700 text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 shadow-md"
                    >
                       <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.084-.729.084-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.493.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.387 24 16.807 24 12 24 5.373 18.627 0 12 0z"></path></svg>
                      GitHub
                    </a>
                  </div>

                  <button
                    onClick={() => project.isExpanded ? toggleProjectDetails(index) : handleGenerateDescription(index, project.title, project.shortDescription)}
                    className="w-full flex items-center justify-center bg-gradient-to-r from-[#fef9d7] to-[#d299c2] text-gray-800 px-5 py-2 rounded-md hover:from-[#e0f0f0] hover:to-[#b880a4] transition-colors duration-300 shadow-md"
                    disabled={project.isLoading}
                  >
                    {project.isLoading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>
                        ✨ {project.isExpanded ? 'Collapse Description' : 'Generate Detailed Description'}
                      </>
                    )}
                  </button>

                  {project.isExpanded && project.detailedDescription && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 animate-fade-in-rise">
                      <h4 className="font-bold mb-2 text-[#d299c2]">Detailed Description:</h4>
                      <p>{project.detailedDescription}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <h3 className={`text-4xl font-extrabold text-center mb-8 text-white drop-shadow-lg opacity-0 ${isProjectsContentVisible ? 'animate-fade-in-rise' : ''}`}
                style={{ animationDelay: isProjectsContentVisible ? '400ms' : '0ms' }}>
                Other Notable Projects
            </h3>
            <div className="max-w-3xl mx-auto space-y-6">
                {otherProjects.map((project, index) => (
                    <div key={index} className={`bg-white p-6 rounded-lg shadow-lg border border-gray-200 opacity-0 ${isProjectsContentVisible ? 'animate-fade-in-rise' : ''}`}
                         style={{ animationDelay: isProjectsContentVisible ? `${500 + index * 100}ms` : '0ms' }}>
                        <h4 className="text-xl font-semibold text-[#d299c2] mb-2">{project.title}</h4>
                        <p className="text-gray-700">{project.description}</p>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 text-gray-800">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className={`text-5xl font-extrabold text-center mb-12 text-white drop-shadow-lg opacity-0 ${isContactContentVisible ? 'animate-fade-in-rise' : ''}`}>
            Contact Me
          </h2>
          <div ref={contactContentRef} className={`bg-white p-8 rounded-xl shadow-xl border border-gray-200 opacity-0 ${isContactContentVisible ? 'animate-fade-in-rise delay-100' : ''}`}>
            <p className={`text-lg text-gray-700 text-center mb-8`}>
              You can reach me through the following channels:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              <div className="flex flex-col items-center">
                <a
                  href="mailto:tranlexuan.bh99@gmail.com"
                  className="bg-[#d299c2] text-white p-4 rounded-full shadow-lg hover:bg-[#b880a4] transition-colors duration-300 mb-3"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
                </a>
                <p className="text-lg font-semibold text-gray-800">Email</p>
                <a href="mailto:tranlexuan.bh99@gmail.com" className="text-[#d299c2] hover:underline">
                  tranlexuan.bh99@gmail.com
                </a>
              </div>
              <div className="flex flex-col items-center">
                <a
                  href="tel:+84775427856"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fef9d7] text-gray-800 p-4 rounded-full shadow-lg hover:bg-[#e0f0f0] transition-colors duration-300 mb-3"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.57.12.35.03.75-.24 1.02l-2.2 2.2z"></path></svg>
                </a>
                <p className="text-lg font-semibold text-gray-800">Phone</p>
                <a href="tel:+84775427856" className="text-[#d299c2] hover:underline">
                  +84 775 427 856
                </a>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg text-gray-700">
                Or download my CV here:
              </p>
              <a
                href="https://drive.google.com/file/d/16h10HXoC8nRoMqbYheyvFv4KpvK6kM93/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-4 bg-[#d299c2] text-white px-8 py-3 rounded-full text-xl font-semibold shadow-lg hover:bg-[#b880a4] transition-colors duration-300 transform hover:scale-105"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></svg>
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#fef9d7] to-[#d299c2] text-gray-800 py-8 text-center">
        <div className="container mx-auto px-6">
          <p>&copy; {new Date().getFullYear()} TRAN LE XUAN. All rights reserved.</p>
        </div>
      </footer>

      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
          body {
            font-family: 'Poppins', sans-serif;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
          }
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');

          @keyframes fadeInRise {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-rise {
            animation: fadeInRise 1s ease-out forwards;
          }
          
          /* Delay utilities for animation-delay */
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-500 { animation-delay: 0.5s; }
          .delay-600 { animation-delay: 0.6s; }
          .delay-700 { animation-delay: 0.7s; }
        `}
      </style>
    </div>
  );
};

export default App;