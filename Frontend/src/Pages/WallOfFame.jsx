import { useState, useEffect, useRef } from "react";
import {
    FaLinkedin,
    FaGithub,
    FaTwitter,
    FaInstagram,
    FaTrophy,
    FaGraduationCap,
    FaQuoteLeft,
    FaStar,
    FaChevronDown,
    FaCalendarAlt,
    FaUsers,
    FaAward,
    FaSpinner,
} from "react-icons/fa";
import {
    googleColors,
    googleBgColors,
} from "../data/wallOfFameData";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/wof`;

const socialIcons = {
    linkedin: FaLinkedin,
    github: FaGithub,
    twitter: FaTwitter,
    instagram: FaInstagram,
};

// Year Selector - Horizontal tabs for desktop, dropdown for mobile
const YearSelector = ({ selectedYear, onYearChange, availableYears }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            {/* Desktop: Horizontal tabs */}
            <div className="hidden md:flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-100">
                {availableYears.map((year, index) => (
                    <button
                        key={year}
                        onClick={() => onYearChange(year)}
                        className={`relative px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${selectedYear === year
                            ? "text-white shadow-lg scale-105"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            }`}
                        style={{
                            background:
                                selectedYear === year
                                    ? `linear-gradient(135deg, ${Object.values(googleColors)[index % 4]}, ${Object.values(googleColors)[(index + 1) % 4]})`
                                    : "transparent",
                        }}
                    >
                        {year}
                    </button>
                ))}
            </div>

            {/* Mobile: Dropdown - opens upward */}
            <div className="md:hidden relative z-50" ref={dropdownRef}>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsOpen(!isOpen);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-md border border-gray-200 active:scale-95 transition-transform"
                >
                    <FaCalendarAlt className="text-blue-500 text-sm" />
                    <span className="font-bold text-gray-800">{selectedYear}</span>
                    <FaChevronDown
                        className={`text-gray-400 text-xs transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {isOpen && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden min-w-[160px]">
                        {availableYears.map((year, index) => (
                            <button
                                key={year}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onYearChange(year);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-3 text-sm text-left font-medium transition-all flex items-center gap-2 active:bg-gray-100 ${selectedYear === year
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-700"
                                    }`}
                            >
                                <span
                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                    style={{
                                        backgroundColor: Object.values(googleColors)[index % 4],
                                    }}
                                />
                                {year}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

// Premium Member Card
const MemberCard = ({ member, index, isVisible }) => {
    const color = googleColors[member.color] || googleColors.blue;
    const bgColor = googleBgColors[member.color] || googleBgColors.blue;
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(true); // Default true to show content immediately

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // On mobile, always show cards immediately
    const shouldShow = isMobile || isVisible;

    // Build social object for rendering
    const socialEntries = member.social
        ? Object.entries(member.social).filter(([, url]) => url)
        : [];

    return (
        <div
            className={`transform transition-all duration-500 ease-out ${shouldShow
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
            style={{ transitionDelay: isMobile ? "0ms" : `${index * 60}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-500 ${isHovered ? "shadow-2xl scale-[1.02]" : "shadow-lg"
                    }`}
            >
                {/* Top colored bar */}
                <div
                    className="h-1.5 transition-all duration-300"
                    style={{
                        background: `linear-gradient(90deg, ${color}, ${Object.values(googleColors)[
                            (Object.keys(googleColors).indexOf(member.color) + 1) % 4
                        ]
                            })`,
                    }}
                />

                {/* Hover glow effect */}
                <div
                    className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        background: `radial-gradient(circle at 50% 0%, ${bgColor} 0%, transparent 60%)`,
                    }}
                />

                <div className="relative p-5 md:p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                        {/* Profile Image with glow */}
                        <div className="relative shrink-0 group">
                            <div
                                className={`absolute -inset-1 rounded-2xl blur-md transition-opacity duration-300 ${isHovered ? "opacity-60" : "opacity-0"
                                    }`}
                                style={{ backgroundColor: color }}
                            />
                            {member.image ? (
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <div
                                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 border-white shadow-lg flex items-center justify-center text-white text-2xl font-bold"
                                    style={{ backgroundColor: color }}
                                >
                                    {member.name?.charAt(0)}
                                </div>
                            )}
                            {/* Position badge */}
                            <div
                                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg flex items-center justify-center shadow-lg"
                                style={{ backgroundColor: color }}
                            >
                                <FaStar className="text-white text-xs" />
                            </div>
                        </div>

                        {/* Name and Position */}
                        <div className="flex-1 min-w-0 pt-1">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate mb-1">
                                {member.name}
                            </h3>
                            <p
                                className="text-xs md:text-sm font-bold uppercase tracking-wider"
                                style={{ color }}
                            >
                                {member.position}
                            </p>
                            {member.badge && (
                                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                                    <FaAward className="text-yellow-500" />
                                    {member.badge}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {member.bio}
                    </p>

                    {/* Skills */}
                    {member.skills && member.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {member.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-300"
                                    style={{
                                        backgroundColor: isHovered ? color : bgColor,
                                        color: isHovered ? "white" : color,
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Social Links */}
                    {socialEntries.length > 0 && (
                        <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                            {socialEntries.map(([platform, url]) => {
                                const Icon = socialIcons[platform];
                                if (!Icon) return null;
                                return (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-xl bg-gray-100 text-gray-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = color;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = "";
                                        }}
                                    >
                                        <Icon size={16} />
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Animated Timeline Path for Desktop
const TimelinePath = ({ progress }) => {
    return (
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 hidden lg:block">
            {/* Background line */}
            <div className="absolute inset-0 w-full bg-gray-200 rounded-full" />
            {/* Progress line */}
            <div
                className="absolute top-0 left-0 w-full rounded-full transition-all duration-300"
                style={{
                    height: `${progress}%`,
                    background: "linear-gradient(180deg, #4285f4, #ea4335, #f9ab00, #34a853)",
                }}
            />
            {/* Animated ball at progress point */}
            <div
                className="absolute left-1/2 -translate-x-1/2 w-6 h-6 transition-all duration-100"
                style={{ top: `${progress}%` }}
            >
                <div className="absolute inset-0 rounded-full bg-white shadow-xl border-4 border-blue-500 animate-pulse" />
                <div className="absolute -inset-2 rounded-full bg-blue-500/20 animate-ping" />
            </div>
        </div>
    );
};

// Main Wall of Fame Page
const WallOfFame = () => {
    const [wallOfFameData, setWallOfFameData] = useState({});
    const [availableYears, setAvailableYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [visibleCards, setVisibleCards] = useState(new Set());
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    // Fetch data from backend
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(API_URL);
                const data = await res.json();
                if (data.success && data.data) {
                    const { grouped, availableYears: years } = data.data;
                    setWallOfFameData(grouped || {});
                    setAvailableYears(years || []);
                    if (years && years.length > 0) {
                        setSelectedYear(years[0]);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch Wall of Fame data:", err);
                setError("Failed to load data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const currentMembers = wallOfFameData[selectedYear] || [];

    const handleYearChange = (year) => {
        if (year === selectedYear) return;
        setIsTransitioning(true);
        setVisibleCards(new Set());

        setTimeout(() => {
            setSelectedYear(year);
            setIsTransitioning(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 300);
    };

    // Scroll progress tracking
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const scrolled = windowHeight - rect.top;
            const total = rect.height + windowHeight;
            const progress = Math.max(0, Math.min(100, (scrolled / total) * 100));
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [selectedYear]);

    // Intersection observer
    useEffect(() => {
        // Reset refs array when year changes
        cardsRef.current = [];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = parseInt(entry.target.dataset.index);
                    if (entry.isIntersecting) {
                        setVisibleCards((prev) => new Set([...prev, index]));
                    }
                });
            },
            { threshold: 0.05, rootMargin: "50px" }
        );

        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            cardsRef.current.forEach((card) => {
                if (card) observer.observe(card);
            });
        }, 100);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [selectedYear]);

    // Split members for alternating layout on desktop
    const leftMembers = currentMembers.filter((_, i) => i % 2 === 0);
    const rightMembers = currentMembers.filter((_, i) => i % 2 === 1);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Loading Wall of Fame...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 font-medium mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Empty state
    if (availableYears.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <FaTrophy className="text-5xl text-yellow-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Wall of Fame</h2>
                    <p className="text-gray-500">No entries yet. Check back later!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            {/* Hero Section */}
            <section className="relative py-12 md:py-20 lg:py-28 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    {/* Gradient mesh */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-red-50" />

                    {/* Floating shapes */}
                    <div className="absolute top-20 left-[10%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" />
                    <div className="absolute top-40 right-[10%] w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-float-delayed" />
                    <div className="absolute bottom-20 left-[30%] w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-10 right-[20%] w-56 h-56 bg-green-500/10 rounded-full blur-3xl animate-float-delayed" />

                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage:
                                "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                            backgroundSize: "50px 50px",
                        }}
                    />
                </div>

                <div className="relative max-w-6xl mx-auto px-4 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border border-gray-100 mb-6 md:mb-8 animate-fadeIn">
                        <FaTrophy className="text-yellow-500" />
                        <span className="text-sm font-semibold text-gray-700">
                            Celebrating Our Alumni
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 mb-4 md:mb-6 animate-fadeIn animation-delay-100">
                        Wall of{" "}
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                                Fame
                            </span>
                            <svg
                                className="absolute -bottom-2 left-0 w-full"
                                viewBox="0 0 200 12"
                                fill="none"
                            >
                                <path
                                    d="M2 10C50 2 150 2 198 10"
                                    stroke="url(#underline)"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="underline" x1="0" y1="0" x2="200" y2="0">
                                        <stop offset="0%" stopColor="#4285f4" />
                                        <stop offset="50%" stopColor="#ea4335" />
                                        <stop offset="100%" stopColor="#f9ab00" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12 animate-fadeIn animation-delay-200">
                        Honoring the legends who built, led, and inspired our GDG community.
                        Their legacy continues to guide us forward.
                    </p>

                    {/* Year Selector */}
                    <div className="mb-8 md:mb-12 animate-fadeIn animation-delay-300">
                        <YearSelector
                            selectedYear={selectedYear}
                            onYearChange={handleYearChange}
                            availableYears={availableYears}
                        />
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 animate-fadeIn animation-delay-400">
                        {[
                            { icon: FaUsers, value: currentMembers.length, label: "Team Members", color: googleColors.blue },
                            {
                                icon: FaAward,
                                value: currentMembers.filter((m) => m.position.includes("Lead") || m.position.includes("Head")).length,
                                label: "Leadership",
                                color: googleColors.red,
                            },
                            {
                                icon: FaStar,
                                value: currentMembers.filter((m) => m.position.includes("Core")).length,
                                label: "Core Team",
                                color: googleColors.green,
                            },
                        ].map((stat, i) => (
                            <div key={i} className="text-center group cursor-default">
                                <div
                                    className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl mb-2 shadow-lg transition-transform duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: stat.color }}
                                >
                                    <stat.icon className="text-white text-lg md:text-2xl" />
                                </div>
                                <div className="text-2xl md:text-4xl font-black text-gray-900">
                                    {stat.value}
                                </div>
                                <div className="text-xs md:text-sm text-gray-500 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cards Section */}
            <section className="relative py-12 md:py-20" ref={containerRef}>
                {/* Year Badge */}
                <div className="flex justify-center mb-8 md:mb-12">
                    <div className="px-6 py-2 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 rounded-full text-white font-bold shadow-xl text-sm md:text-base">
                        🎓 Class of {selectedYear}
                    </div>
                </div>

                {/* Mobile: Single column */}
                <div
                    className={`md:hidden max-w-lg mx-auto px-4 space-y-4 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"
                        }`}
                >
                    {currentMembers.map((member, index) => (
                        <div
                            key={member._id || index}
                            data-index={index}
                            ref={(el) => (cardsRef.current[index] = el)}
                        >
                            <MemberCard
                                member={member}
                                index={index}
                                isVisible={visibleCards.has(index)}
                            />
                        </div>
                    ))}
                </div>

                {/* Desktop: Two columns with timeline */}
                <div
                    className={`hidden md:block max-w-6xl mx-auto px-4 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"
                        }`}
                >
                    <div className="relative">
                        {/* Timeline */}
                        <TimelinePath progress={scrollProgress} />

                        {/* Grid */}
                        <div className="grid grid-cols-2 gap-x-24 lg:gap-x-32">
                            {/* Left Column */}
                            <div className="space-y-8 pt-0">
                                {leftMembers.map((member, i) => {
                                    const originalIndex = i * 2;
                                    return (
                                        <div
                                            key={member._id || originalIndex}
                                            data-index={originalIndex}
                                            ref={(el) => (cardsRef.current[originalIndex] = el)}
                                        >
                                            <MemberCard
                                                member={member}
                                                index={originalIndex}
                                                isVisible={visibleCards.has(originalIndex)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Right Column - offset for timeline effect */}
                            <div className="space-y-8 pt-24">
                                {rightMembers.map((member, i) => {
                                    const originalIndex = i * 2 + 1;
                                    return (
                                        <div
                                            key={member._id || originalIndex}
                                            data-index={originalIndex}
                                            ref={(el) => (cardsRef.current[originalIndex] = el)}
                                        >
                                            <MemberCard
                                                member={member}
                                                index={originalIndex}
                                                isVisible={visibleCards.has(originalIndex)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="relative py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-red-500 to-yellow-500" />
                <div className="absolute inset-0 bg-black/10" />

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

                <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
                    <FaQuoteLeft className="text-3xl md:text-5xl opacity-30 mx-auto mb-6" />
                    <blockquote className="text-xl md:text-3xl lg:text-4xl font-bold leading-relaxed mb-6">
                        "The best way to predict the future is to create it."
                    </blockquote>
                    <p className="text-base md:text-lg opacity-90 mb-8">
                        These alumni didn't just witness change — they led it.
                    </p>
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
                        <FaGraduationCap className="text-xl" />
                        <span className="font-bold">GDG-QU Community</span>
                    </div>
                </div>
            </section>

            {/* CSS Animations */}
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-3deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animation-delay-100 { animation-delay: 0.1s; opacity: 0; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-300 { animation-delay: 0.3s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
};

export default WallOfFame;
