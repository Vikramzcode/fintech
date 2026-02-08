import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { OurJourney } from "@/components/sections/OurJourney";
import { StartSmartInvestBetter } from "@/components/sections/StartSmartInvestBetter";
import { OurCertificates } from "@/components/sections/OurCertificates";
import { TradingBackground } from "@/components/sections/TradingBackground";

export default function Landing() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["intro", "portfolio", "services", "about", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Intro", id: "intro" },
    { label: "Portfolio", id: "portfolio" },
    { label: "What We Do", id: "services" },
    { label: "About Us", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  const bgClasses = isDarkMode
    ? "bg-slate-950 text-slate-50"
    : "bg-white text-slate-900";

  const cardClasses = isDarkMode
    ? "bg-slate-900/60 border-slate-700/30 text-slate-50"
    : "bg-slate-100/60 border-slate-300/30 text-slate-900";

  const mutedClasses = isDarkMode ? "text-slate-400" : "text-slate-600";

  return (
    <div
      className={`w-full ${bgClasses} transition-colors duration-300 relative`}
    >
      {/* Global Trading Background Layer */}
      <TradingBackground isDarkMode={isDarkMode} />

      {/* Content Wrapper */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav
          className={`fixed top-0 left-0 right-0 ${isDarkMode ? "bg-slate-950/80" : "bg-white/80"} backdrop-blur-md ${isDarkMode ? "border-slate-700/30" : "border-slate-300/30"} border-b z-50 transition-colors duration-300`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent">
                TradePro
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      activeSection === link.id
                        ? "text-emerald-500"
                        : isDarkMode
                          ? "text-slate-400 hover:text-slate-200"
                          : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode ? "bg-slate-800 text-amber-400" : "bg-slate-200 text-slate-900"}`}
                  title="Toggle dark mode"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  Login
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-3">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode ? "bg-slate-800 text-amber-400" : "bg-slate-200 text-slate-900"}`}
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
                <button
                  className="md:hidden p-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div
                className={`md:hidden pb-4 ${isDarkMode ? "border-slate-700/30" : "border-slate-300/30"} border-t`}
              >
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      activeSection === link.id
                        ? "text-emerald-500"
                        : isDarkMode
                          ? "text-slate-400"
                          : "text-slate-600"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => navigate("/login")}
                  className="block w-full text-left px-4 py-2 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
       

       
     <section
  id="intro"
  className={`pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
    isDarkMode
      ? "bg-gradient-to-br from-[#050b18] via-[#0a192f] to-[#112240]"
      : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
  }`}
>
  {/* Glassy Grid Overlay - Retained & Re-colored to Blue */}
  <motion.div
    className="absolute inset-0 opacity-[0.1] pointer-events-none"
    animate={{
      backgroundPosition: ["0% 0%", "100% 100%"],
    }}
    transition={{
      duration: 40,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "linear",
    }}
    style={{
      backgroundImage: `linear-gradient(0deg, ${isDarkMode ? "rgba(56, 189, 248, 0.2)" : "rgba(37, 99, 235, 0.1)"} 1px, transparent 1px), 
                       linear-gradient(90deg, ${isDarkMode ? "rgba(56, 189, 248, 0.2)" : "rgba(37, 99, 235, 0.1)"} 1px, transparent 1px)`,
      backgroundSize: "80px 80px",
    }}
  />

  {/* Animated Glassy Orbs - Refined for Navy Theme */}
  <div
    className={`absolute inset-0 overflow-hidden pointer-events-none ${isDarkMode ? "opacity-40" : "opacity-20"}`}
  >
    <motion.div
      className="absolute top-20 left-10 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px]"
      animate={{
        y: [0, -40, 0],
        x: [0, 30, 0],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute -bottom-8 right-10 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[140px]"
      animate={{
        y: [0, 40, 0],
        x: [0, -30, 0],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    />
  </div>

  {/* Candlestick Pattern - Blue/Indigo Rebrand */}
  <motion.svg
    className="absolute bottom-1/4 left-12 w-40 h-40 opacity-20 pointer-events-none hidden md:block"
    viewBox="0 0 160 160"
    animate={{ y: [0, -15, 0], opacity: [0.15, 0.25, 0.15] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  >
    {[20, 50, 80, 110, 140].map((x, i) => (
      <g key={x}>
        <line x1={x} y1={20 + (i*10)} x2={x} y2={90 + (i*5)} stroke={i % 2 === 0 ? "#38bdf8" : "#6366f1"} strokeWidth="2" />
        <rect x={x-8} y={35 + (i*5)} width="16" height={30 + (i*2)} fill={i % 2 === 0 ? "#38bdf8" : "#6366f1"} opacity="0.4" />
      </g>
    ))}
  </motion.svg>

  {/* Uptrend Line - Cyan Rebrand */}
  <motion.svg
    className="absolute top-1/3 right-20 w-48 h-32 opacity-20 pointer-events-none hidden lg:block"
    viewBox="0 0 200 120"
    animate={{ x: [0, 10, 0], opacity: [0.1, 0.2, 0.1] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
  >
    <polyline
      points="10,100 35,85 60,70 85,55 110,45 135,35 160,20 185,15"
      fill="none"
      stroke={isDarkMode ? "#0ea5e9" : "#2563eb"}
      strokeWidth="2.5"
      strokeDasharray="4 2"
    />
    <circle cx="185" cy="15" r="4" fill="#38bdf8" className="animate-pulse" />
  </motion.svg>

  {/* Main Content */}
  <div className="max-w-4xl mx-auto text-center relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1
        className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent"
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        Professional Trading Platform
      </motion.h1>

      <motion.p
        className={`text-xl sm:text-2xl ${isDarkMode ? "text-slate-400" : "text-slate-600"} mb-8 max-w-2xl mx-auto`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        Grow your wealth with our secure, transparent, and user-friendly
        investment platform. Trusted by thousands of traders worldwide.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        {/* Primary Button: Electric Blue */}
        <motion.button
          onClick={() => navigate("/login")}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all duration-300 text-lg shadow-lg shadow-blue-900/40"
          whileHover={{
            y: -4,
            boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>

        {/* Secondary Button: Glassy Outlined */}
        <motion.button
          onClick={() => scrollToSection("services")}
          className={`px-8 py-4 border-2 backdrop-blur-sm ${
            isDarkMode 
              ? "border-blue-500/50 hover:border-blue-400 text-blue-400 bg-blue-500/5" 
              : "border-blue-600 hover:border-blue-700 text-blue-600"
          } font-bold rounded-lg transition-all duration-300 text-lg`}
          whileHover={{
            y: -4,
            backgroundColor: isDarkMode ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </motion.div>
    </motion.div>
  </div>

  {/* Scroll Indicator - Blue Accent */}
  <motion.div
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    <ChevronDown
      className={`w-6 h-6 ${isDarkMode ? "text-blue-500/50" : "text-blue-600/50"}`}
    />
  </motion.div>
</section>


        {/* Portfolio / Stats Section */}
      <section
          id="portfolio"
          className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
              : "bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h2
                className={`text-4xl sm:text-5xl font-bold mb-4 ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
              >
                Our Platform{" "}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  in Numbers
                </span>
              </h2>
              <p className={`${mutedClasses} text-lg`}>
                Join thousands of successful traders managing their investments
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Active Customers",
                  value: "15,000+",
                  icon: "👥",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  title: "Funds Managed",
                  value: "$250M+",
                  icon: "💰",
                  color: "from-emerald-500 to-green-500",
                },
                {
                  title: "Daily Growth",
                  value: "2.5%",
                  icon: "📈",
                  color: "from-amber-500 to-orange-500",
                },
                {
                  title: "Years of Trust",
                  value: "5+",
                  icon: "🏆",
                  color: "from-purple-500 to-pink-500",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`group relative p-8 rounded-xl border backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer ${
                    isDarkMode
                      ? "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60"
                      : "bg-white/40 border-slate-300/50 hover:bg-white/60"
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>
                  <div className="relative z-10 text-center">
                    <div
                      className="text-4xl mb-4 animate-bounce"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {stat.icon}
                    </div>
                    <p className={`${mutedClasses} text-sm mb-2`}>
                      {stat.title}
                    </p>
                    <h3
                      className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>  

        {/* Start Smart, Invest Better Section */}
        <StartSmartInvestBetter isDarkMode={isDarkMode} />

        {/* Services / Pricing Section */}
        <section
          id="services"
          className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-950"
              : "bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h2
                className={`text-4xl sm:text-5xl font-bold mb-4 ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
              >
                Flexible Investment{" "}
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Plans
                </span>
              </h2>
              <p className={`${mutedClasses} text-lg`}>
                Choose the perfect plan for your investment goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Plan A */}
              <div
                className={`relative p-8 rounded-xl overflow-hidden group transition-all duration-300 hover:scale-105 border ${
                  isDarkMode
                    ? "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60"
                    : "bg-white/40 border-slate-300/50 hover:bg-white/60"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <h3
                    className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
                  >
                    Starter Plan
                  </h3>
                  <p className={`${mutedClasses} mb-4`}>
                    Perfect for beginners
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                      5%
                    </span>
                    <span className={`${mutedClasses} ml-2`}>
                      Annual Interest
                    </span>
                  </div>
                  <div
                    className={`rounded-lg p-4 mb-6 ${isDarkMode ? "bg-slate-900/50" : "bg-slate-200/30"}`}
                  >
                    <p
                      className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                    >
                      For investments{" "}
                      <span className="font-semibold">&lt; $99</span>
                    </p>
                  </div>
                  <ul
                    className={`space-y-3 mb-8 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span> Low minimum
                      deposit
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span> Easy to get
                      started
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span> 24/7 customer
                      support
                    </li>
                  </ul>
                  <button
                    onClick={() => navigate("/login")}
                    className={`w-full px-6 py-3 font-semibold rounded-lg transition-all duration-200 border-2 ${
                      isDarkMode
                        ? "border-blue-500 text-blue-400 hover:bg-blue-500/10"
                        : "border-blue-600 text-blue-600 hover:bg-blue-500/10"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>

              {/* Plan B */}
              <div
                className={`relative p-8 rounded-xl overflow-hidden group transition-all duration-300 hover:scale-105 border-2 md:scale-105 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/50 hover:bg-gradient-to-br hover:from-amber-500/20 hover:to-orange-500/20"
                    : "bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/50 hover:bg-gradient-to-br hover:from-amber-500/20 hover:to-orange-500/20"
                }`}
              >
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ⭐ POPULAR
                </div>
                <div className="relative z-10">
                  <h3
                    className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
                  >
                    Premium Plan
                  </h3>
                  <p className={`${mutedClasses} mb-4`}>
                    For serious investors
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                      7%
                    </span>
                    <span className={`${mutedClasses} ml-2`}>
                      Annual Interest
                    </span>
                  </div>
                  <div
                    className={`rounded-lg p-4 mb-6 ${isDarkMode ? "bg-slate-900/50" : "bg-slate-200/30"}`}
                  >
                    <p
                      className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                    >
                      For investments{" "}
                      <span className="font-semibold">≥ $100</span>
                    </p>
                  </div>
                  <ul
                    className={`space-y-3 mb-8 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">✓</span> Higher returns
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">✓</span> Priority support
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">✓</span> Advanced
                      analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">✓</span> Personal advisor
                    </li>
                  </ul>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-amber-500/50"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gradient-to-b from-slate-900 via-blue-950/30 to-slate-900"
              : "bg-gradient-to-b from-slate-100 via-purple-50/30 to-slate-100"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: About Text */}
              <div className="animate-slide-up">
                <h2
                  className={`text-4xl sm:text-5xl font-bold mb-6 ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
                >
                  About{" "}
                  <span className="bg-gradient-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent">
                    TradePro
                  </span>
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                      Our Story
                    </h3>
                    <p className={`${mutedClasses} leading-relaxed`}>
                      Founded in 2019, TradePro emerged from a vision to
                      democratize wealth management. We built a platform where
                      both beginners and experienced traders could grow their
                      investments safely and transparently. Today, we've helped
                      thousands achieve their financial dreams.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 bg-gradient-to-r  from-blue-500 to-blue-300 bg-clip-text text-transparent">
                      Our Mission
                    </h3>
                    <p className={`${mutedClasses} leading-relaxed`}>
                      To empower individuals to take control of their financial
                      future through accessible, secure, and transparent
                      investment solutions that everyone can trust and
                      understand.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 bg-gradient-to-r  from-blue-500 to-blue-300 bg-clip-text text-transparent">
                      Our Vision
                    </h3>
                    <p className={`${mutedClasses} leading-relaxed`}>
                      To become the world's most trusted investment platform,
                      enabling millions to build lasting wealth and achieve
                      their financial goals.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Team Overview */}
              <div className="animate-fade-in">
                <h3
                  className={`text-2xl font-bold mb-8 text-center lg:text-left ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
                >
                  Leadership Team
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "Sarah Johnson",
                      role: "Chief Executive Officer",
                      bio: "15+ years in fintech with proven track record",
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      name: "Michael Chen",
                      role: "Chief Technology Officer",
                      bio: "Expert in blockchain and secure trading systems",
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      name: "Emma Williams",
                      role: "Head of Customer Relations",
                      bio: "Dedicated to exceptional user experiences",
                      color: "from-emerald-500 to-green-500",
                    },
                    {
                      name: "David Rodriguez",
                      role: "Chief Financial Officer",
                      bio: "Strategic financial planning and compliance expert",
                      color: "from-amber-500 to-orange-500",
                    },
                  ].map((member, index) => (
                    <div
                      key={index}
                      className={`group relative p-5 rounded-lg border backdrop-blur-sm hover:scale-105 transition-all duration-300 ${
                        isDarkMode
                          ? "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60"
                          : "bg-white/40 border-slate-300/50 hover:bg-white/60"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 rounded-lg bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      ></div>
                      <div className="relative z-10">
                        <h4
                          className={`font-bold mb-1 bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}
                        >
                          {member.name}
                        </h4>
                        <p className={`text-sm ${mutedClasses} mb-2`}>
                          {member.role}
                        </p>
                        <p
                          className={`text-xs ${isDarkMode ? "text-slate-500" : "text-slate-600"}`}
                        >
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Journey Section */}
        <OurJourney isDarkMode={isDarkMode} />

        {/* Our Certificates Section */}
        <OurCertificates isDarkMode={isDarkMode} />

        {/* Contact Section */}
        <section
          id="contact"
          className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gradient-to-b from-slate-950 via-green-950/30 to-slate-950"
              : "bg-gradient-to-b from-slate-50 via-green-50/30 to-slate-50"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h2
                className={`text-4xl sm:text-5xl font-bold mb-4 ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
              >
                Get in{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
                  Touch
                </span>
              </h2>
              <p className={`${mutedClasses} text-lg`}>
                Have questions? We'd love to hear from you. Our team is ready to
                help 24/7.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Contact Info */}
              {[
                {
                  icon: "📧",
                  label: "Email",
                  value: "support@tradepro.com",
                  color: "from-emerald-500 to-green-500",
                },
                {
                  icon: "📱",
                  label: "Phone",
                  value: "+1 (800) 123-4567",
                  color: "from-emerald-500 to-green-500",
                },
                {
                  icon: "📍",
                  label: "Address",
                  value: "123 Finance Street, New York, NY 10001",
                  color: "from-emerald-500 to-green-500",
                },
              ].map((contact, index) => (
                <div
                  key={index}
                  className={`group relative p-8 rounded-xl border backdrop-blur-sm hover:scale-105 transition-all duration-300 text-center ${
                    isDarkMode
                      ? "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60"
                      : "bg-white/40 border-slate-300/50 hover:bg-white/60"
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>
                  <div className="relative z-10">
                    <div
                      className="text-4xl mb-4 animate-bounce"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {contact.icon}
                    </div>
                    <p className={`${mutedClasses} text-sm mb-2`}>
                      {contact.label}
                    </p>
                    <p
                      className={`text-lg font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
                    >
                      {contact.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div
              className={`max-w-2xl mx-auto rounded-xl overflow-hidden border backdrop-blur-sm ${
                isDarkMode
                  ? "bg-slate-800/40 border-slate-700/50"
                  : "bg-white/40 border-slate-300/50"
              } p-8 sm:p-12 animate-fade-in`}
            >
              <form className="space-y-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className={`w-full px-4 py-3 rounded-lg border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${
                      isDarkMode
                        ? "bg-slate-900/50 border-slate-700/50 text-slate-100 placeholder-slate-500"
                        : "bg-white/50 border-slate-300/50 text-slate-900 placeholder-slate-500"
                    }`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 rounded-lg border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${
                      isDarkMode
                        ? "bg-slate-900/50 border-slate-700/50 text-slate-100 placeholder-slate-500"
                        : "bg-white/50 border-slate-300/50 text-slate-900 placeholder-slate-500"
                    }`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us how we can help..."
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 resize-none ${
                      isDarkMode
                        ? "bg-slate-900/50 border-slate-700/50 text-slate-100 placeholder-slate-500"
                        : "bg-white/50 border-slate-300/50 text-slate-900 placeholder-slate-500"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-emerald-500/50"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`border-t transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-8 ${
            isDarkMode
              ? "border-slate-700/30 bg-slate-900/50"
              : "border-slate-300/30 bg-slate-100/50"
          }`}
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className={`${mutedClasses} text-sm`}>
              © 2024 TradePro. All rights reserved. Secure. Transparent.
              Trusted.
            </div>
            <div className="flex gap-6">
              <a
                href="#intro"
                className={`${mutedClasses} hover:text-emerald-500 text-sm transition-colors`}
              >
                Privacy
              </a>
              <a
                href="#intro"
                className={`${mutedClasses} hover:text-emerald-500 text-sm transition-colors`}
              >
                Terms
              </a>
              <a
                href="#intro"
                className={`${mutedClasses} hover:text-emerald-500 text-sm transition-colors`}
              >
                Cookies
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
