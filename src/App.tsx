import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Heart, Users, BookOpen, Shield, Briefcase, 
  Building2, Scale, Calendar, MapPin, Mail, Phone, 
  Facebook, Twitter, Instagram, ArrowRight, CheckCircle2,
  ChevronRight, DollarSign, Newspaper, ChevronDown, Sprout
} from 'lucide-react';
import { getCampaignUpdates, getNearbyOffices } from './services/geminiService';

// --- Components ---

const OfficeFinder = () => {
  const [offices, setOffices] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const findOffices = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        getNearbyOffices(coords.lat, coords.lng).then(res => {
          setOffices(res);
          setLoading(false);
        });
      },
      (err) => {
        console.error(err);
        setLoading(false);
        setOffices("Please enable location services to find nearby offices.");
      }
    );
  };

  return (
    <div className="bg-ga-navy/5 p-8 rounded-3xl border border-ga-navy/10 mt-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">Find a Campaign Office</h3>
          <p className="text-ga-navy/60">Locate the nearest community center or campaign hub to get involved locally.</p>
        </div>
        <button 
          onClick={findOffices}
          disabled={loading}
          className="btn-secondary whitespace-nowrap flex items-center"
        >
          {loading ? "Searching..." : <><MapPin size={18} className="mr-2" /> Find Near Me</>}
        </button>
      </div>
      {offices && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 bg-white rounded-2xl border border-ga-navy/10 text-sm leading-relaxed"
        >
          <div className="prose prose-sm max-w-none text-ga-navy/80">
            {offices.split('\n').map((line, i) => (
              <p key={i} className="mb-2">{line.replace(/[*#]/g, '')}</p>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Issues', href: '#issues' },
    { name: 'Events', href: '#events' },
    { name: 'Volunteer', href: '#volunteer' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="flex flex-col">
              <span className={`text-2xl font-display font-black tracking-tighter ${scrolled ? 'text-ga-navy' : 'text-white'}`}>
                RYAN<span className="text-ga-red">FOR</span>GA
              </span>
              <span className={`text-[10px] uppercase tracking-widest sm:tracking-[0.2em] font-bold ${scrolled ? 'text-ga-navy/60' : 'text-white/80'}`}>
                For State House • District 176
              </span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`font-semibold hover:text-ga-red transition-colors ${scrolled ? 'text-ga-navy' : 'text-white'}`}
              >
                {link.name}
              </a>
            ))}
            <a href="#donate" className="btn-primary">Donate</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`${scrolled ? 'text-ga-navy' : 'text-white'} p-2`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-ga-navy/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-semibold text-ga-navy hover:bg-ga-navy/5 rounded-lg"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                <a 
                  href="#donate" 
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center btn-primary"
                >
                  Donate Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const AccordionItem = ({ title, icon: Icon, children, isOpen, onClick }: any) => {
  return (
    <div className="border-b border-white/10 last:border-none">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left hover:text-ga-gold transition-colors group"
      >
        <div className="flex flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-ga-gold/20 transition-colors">
            <Icon size={24} className="text-ga-gold" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-16 text-white/70 leading-relaxed text-lg">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Section = ({ id, title, subtitle, children, className = "", dark = false }: any) => (
  <section id={id} className={`py-20 px-4 sm:px-6 lg:px-8 ${dark ? 'bg-ga-navy text-white' : 'bg-ga-cream'} ${className}`}>
    <div className="max-w-7xl mx-auto">
      {(title || subtitle) && (
        <div className="text-center mb-16">
          {subtitle && <p className={`uppercase tracking-widest font-bold text-sm mb-2 ${dark ? 'text-ga-gold' : 'text-ga-red'}`}>{subtitle}</p>}
          {title && <h2 className="text-4xl md:text-5xl font-display mb-4">{title}</h2>}
          <div className={`h-1.5 w-24 mx-auto rounded-full ${dark ? 'bg-ga-gold' : 'bg-ga-red'}`}></div>
        </div>
      )}
      {children}
    </div>
  </section>
);

const EventCard = ({ title, date, time, location, rsvpLink }: any) => (
  <div className="card-hover p-6 rounded-2xl flex flex-col h-full">
    <div className="flex items-center text-ga-red font-bold text-sm mb-4">
      <Calendar size={16} className="mr-2" />
      {date} • {time}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="flex items-start text-ga-navy/60 text-sm mb-6 flex-grow">
      <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
      {location}
    </div>
    <button className="btn-outline w-full py-2 text-sm">RSVP Now</button>
  </div>
);

// --- Main App ---

export default function App() {
  const [donationAmount, setDonationAmount] = useState<number | string>(25);
  const [customAmount, setCustomAmount] = useState('');
  const [news, setNews] = useState<string | null>(null);
  const [openIssue, setOpenIssue] = useState<string | null>('families');

  const upcomingEvents = [
    { title: "Official Campaign Launch", date: "Mar 28, 2026", location: "7 South Highway, Lakeland, GA" },
    { title: "Democratic Party Meet Up", date: "Apr 11, 2026", location: "Atlanta, Georgia" },
    { title: "Election Day", date: "Nov 03, 2026", location: "District 176" }
  ];

  useEffect(() => {
    getCampaignUpdates().then(setNews);
  }, []);

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customAmount || donationAmount;
    window.open(`https://secure.actblue.com/donate/placeholder-ryan-ga?amount=${amount}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dkolptikx/image/upload/v1772765601/Georgia-state-capitol-scaled_coc8io.avif" 
            alt="Georgia State Capitol" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-ga-navy/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-ga-navy via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="uppercase tracking-[0.4em] font-bold text-ga-gold mb-4">Leadership. Action. Results.</p>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black mb-6 leading-tight">
              MARCUS RYAN <br />
              <span className="text-ga-red block sm:inline">FOR STATE HOUSE</span>
              <span className="block text-2xl sm:text-3xl md:text-5xl text-white mt-4 tracking-widest">DISTRICT 176</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-white/90 font-light leading-relaxed">
              Real leadership Real results
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#donate" className="btn-primary px-10 py-4 text-lg w-full sm:w-auto">Donate Now</a>
              <a href="#volunteer" className="btn-secondary px-10 py-4 text-lg w-full sm:w-auto">Volunteer</a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Rolling Events Marquee */}
      <section className="bg-ga-gold py-3 px-0 border-y border-ga-navy/10 overflow-hidden relative">
        <div className="flex items-center">
          <div className="bg-ga-gold z-20 px-6 flex items-center font-bold uppercase tracking-wider text-sm border-r border-ga-navy/10 py-1 shadow-[10px_0_15px_-5px_rgba(0,0,0,0.1)]">
            <Calendar size={18} className="mr-2 text-ga-red" />
            Latest Updates:
          </div>
          <div className="flex-1 overflow-hidden">
            <motion.div 
              animate={{ x: [0, -1500] }}
              transition={{ 
                repeat: Infinity, 
                duration: 40, 
                ease: "linear" 
              }}
              className="flex whitespace-nowrap gap-12 items-center"
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-12 items-center">
                  {upcomingEvents.map((event, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <span className="font-bold uppercase tracking-tighter text-[10px] bg-ga-navy text-white px-2 py-0.5 rounded">
                        {event.date}
                      </span>
                      <span className="font-bold text-ga-navy uppercase text-xs tracking-wider">{event.title}</span>
                      <span className="text-ga-navy/60 text-xs font-medium">• {event.location}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-ga-red mx-4"></div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" subtitle="Meet Marcus" title="A Lifetime of Service">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://www.dropbox.com/scl/fi/9lp9hzqq5wp05bweo4km3/MarcusT.Ryan.png?rlkey=avd5m0741opf5bb0mt5jbisvq&st=5wlljzps&raw=1" 
                alt="Marcus Ryan" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-ga-red text-white p-8 rounded-2xl shadow-xl hidden lg:block">
              <p className="text-4xl font-display font-black">2026</p>
              <p className="uppercase tracking-widest text-xs font-bold">Election Year</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6 text-ga-navy">A Leader Fighting for Georgia's Future</h3>
            <div className="space-y-6 text-ga-navy/80 leading-relaxed text-lg">
              <p>
                Marcus Ryan is a US Marine Veteran, community leader, and lifelong Georgian. 
                Raised with the values of hard work and integrity, Marcus has spent his career building 
                solutions that work for people, not special interests.
              </p>
              <p>
                With a background in community development and economic strategy, Marcus understands 
                the challenges facing our state. He's running for Georgia State House, District 176 to ensure 
                that every family has a seat at the table and every child has a path to success.
              </p>
              <div className="pt-4 grid grid-cols-2 gap-6">
                <div className="flex items-start">
                  <CheckCircle2 className="text-ga-red mr-3 mt-1" size={20} />
                  <div>
                    <p className="font-bold">Local Roots</p>
                    <p className="text-sm">Born and raised in Georgia</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="text-ga-red mr-3 mt-1" size={20} />
                  <div>
                    <p className="font-bold">US Marine Veteran</p>
                    <p className="text-sm">Served with honor and distinction</p>
                  </div>
                </div>
              </div>
              <div className="pt-8">
                <a href="#volunteer" className="btn-secondary inline-flex items-center">
                  Join the Campaign <ArrowRight className="ml-2" size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Issues Section */}
      <Section id="issues" subtitle="The Plan" title="Priorities for Georgia" dark>
        <div className="max-w-4xl mx-auto bg-white/5 rounded-3xl p-4 md:p-8 backdrop-blur-sm border border-white/10">
          <AccordionItem 
            title="Families" 
            icon={Users} 
            isOpen={openIssue === 'families'} 
            onClick={() => setOpenIssue(openIssue === 'families' ? null : 'families')}
          >
            <p>
              Supporting Georgia's families by expanding access to affordable childcare, 
              strengthening community resources, and ensuring every household has the 
              opportunity to thrive. We believe that strong families are the foundation 
              of a strong Georgia.
            </p>
          </AccordionItem>
          
          <AccordionItem 
            title="Farming and Agriculture" 
            icon={Sprout} 
            isOpen={openIssue === 'farming'} 
            onClick={() => setOpenIssue(openIssue === 'farming' ? null : 'farming')}
          >
            <p>
              Protecting our state's agricultural heritage by supporting local farmers, 
              investing in sustainable practices, and ensuring Georgia remains a leader 
              in global food production. We will fight for the resources our rural 
              communities need to prosper.
            </p>
          </AccordionItem>
          
          <AccordionItem 
            title="Fiscal Responsibility" 
            icon={Scale} 
            isOpen={openIssue === 'fiscal'} 
            onClick={() => setOpenIssue(openIssue === 'fiscal' ? null : 'fiscal')}
          >
            <p>
              Bringing transparency and accountability to state spending. We will cut 
              wasteful expenditures and ensure that every tax dollar is invested 
              wisely in our state's future. Marcus Ryan is committed to a balanced 
              budget that works for you.
            </p>
          </AccordionItem>
          
          <AccordionItem 
            title="Education" 
            icon={BookOpen} 
            isOpen={openIssue === 'education'} 
            onClick={() => setOpenIssue(openIssue === 'education' ? null : 'education')}
          >
            <p>
              Empowering the next generation by investing in our schools, supporting 
              our teachers, and ensuring every student in District 176 has access to 
              a world-class education. Education is the key to expanding opportunity 
              for all Georgians.
            </p>
          </AccordionItem>
        </div>
      </Section>

      {/* Donation Section */}
      <Section id="donate" subtitle="Support" title="Fuel the Movement">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-ga-navy/5">
          <div className="grid md:grid-cols-2">
            <div className="p-10 bg-ga-navy text-white flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-4">Your Support Matters</h3>
              <p className="text-white/70 mb-8">
                Every contribution, no matter the size, helps us reach more voters and share our vision for a better Georgia.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-ga-gold/20 flex items-center justify-center mr-4 text-ga-gold">
                    <CheckCircle2 size={20} />
                  </div>
                  <p className="text-sm font-medium">100% Local Grassroots Funding</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-ga-gold/20 flex items-center justify-center mr-4 text-ga-gold">
                    <CheckCircle2 size={20} />
                  </div>
                  <p className="text-sm font-medium">Secure & Transparent Processing</p>
                </div>
              </div>
            </div>
            
            <div className="p-10">
              <form onSubmit={handleDonation}>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[10, 25, 50, 100, 250, 500].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => { setDonationAmount(amount); setCustomAmount(''); }}
                      className={`py-3 rounded-xl font-bold transition-all border-2 ${
                        donationAmount === amount && !customAmount 
                          ? 'bg-ga-red border-ga-red text-white shadow-lg' 
                          : 'border-ga-navy/10 text-ga-navy hover:border-ga-red/50'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                
                <div className="relative mb-8">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ga-navy/40">
                    <DollarSign size={20} />
                  </div>
                  <input
                    type="number"
                    placeholder="Custom Amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-ga-navy/5 border-none rounded-xl focus:ring-2 focus:ring-ga-red outline-none font-bold text-ga-navy"
                  />
                </div>

                <button type="submit" className="btn-primary w-full py-4 text-lg mb-4">
                  Donate ${customAmount || donationAmount}
                </button>
                
                <p className="text-[10px] text-ga-navy/40 text-center leading-tight">
                  Paid for by Marcus Ryan for Georgia. Contributions are not tax deductible for federal income tax purposes. 
                  Georgia law requires us to use our best efforts to collect and report the name, mailing address, 
                  occupation and name of employer of individuals whose contributions exceed $100 per election cycle.
                </p>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* Events Section */}
      <Section id="events" subtitle="Connect" title="Upcoming Events">
        <div className="grid md:grid-cols-3 max-w-6xl mx-auto gap-8">
          <EventCard 
            title="Official Campaign Launch" 
            date="Mar 28, 2026" 
            time="4:30 PM" 
            location="7 South Highway, Lakeland, GA"
          />
          <EventCard 
            title="Democratic Party Meet Up" 
            date="Apr 11, 2026" 
            time="6:00 PM - 8:00 PM" 
            location="Atlanta, Georgia"
          />
          <EventCard 
            title="Election Day" 
            date="Nov 03, 2026" 
            time="7:00 AM - 7:00 PM" 
            location="Your Local Polling Place, District 176"
          />
        </div>
        <OfficeFinder />
        <div className="mt-12 text-center">
          <button className="btn-outline">View All Events</button>
        </div>
      </Section>

      {/* Volunteer Section */}
      <Section id="volunteer" subtitle="Get Involved" title="Join the Team" className="bg-ga-navy text-white">
        <div className="max-w-3xl mx-auto">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-ga-gold uppercase tracking-wider">Full Name</label>
                <input type="text" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-ga-gold transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-ga-gold uppercase tracking-wider">Email Address</label>
                <input type="email" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-ga-gold transition-colors" placeholder="john@example.com" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-ga-gold uppercase tracking-wider">Phone Number</label>
                <input type="tel" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-ga-gold transition-colors" placeholder="(404) 555-0123" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-ga-gold uppercase tracking-wider">City</label>
                <input type="text" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-ga-gold transition-colors" placeholder="Atlanta" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-4 text-ga-gold uppercase tracking-wider">Areas of Interest</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'Door Knocking', 
                  'Phone Banking', 
                  'Social Media Support', 
                  'Data Entry', 
                  'Event Planning', 
                  'Community Outreach',
                  'Yard Sign Delivery',
                  'Fundraising',
                  'Translation Services'
                ].map((opt) => (
                  <label key={opt} className="flex items-center space-x-3 cursor-pointer group bg-white/5 p-3 rounded-xl border border-white/10 hover:border-ga-gold/50 transition-all">
                    <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-white/10 text-ga-gold focus:ring-ga-gold focus:ring-offset-ga-navy" />
                    <span className="text-sm font-medium">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-ga-gold uppercase tracking-wider">Message (Optional)</label>
              <textarea rows={4} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-ga-gold transition-colors" placeholder="Tell us why you're joining..."></textarea>
            </div>

            <button type="submit" className="btn-primary w-full py-4 text-lg !bg-ga-gold !text-ga-navy hover:!bg-white">
              Sign Up to Volunteer
            </button>
          </form>
        </div>
      </Section>

      {/* Testimonial Strip */}
      <div className="bg-ga-red py-12 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-around gap-8 text-white">
          <div className="text-center md:text-left max-w-sm">
            <p className="italic text-xl mb-2">"Marcus Ryan is exactly the kind of leader Georgia needs—principled, hardworking, and focused on results."</p>
            <p className="font-bold uppercase tracking-widest text-xs">— Sarah J., Small Business Owner</p>
          </div>
          <div className="h-12 w-px bg-white/20 hidden md:block"></div>
          <div className="text-center md:text-left max-w-sm">
            <p className="italic text-xl mb-2">"I've seen Marcus in action. He doesn't just talk about problems; he rolls up his sleeves and fixes them."</p>
            <p className="font-bold uppercase tracking-widest text-xs">— David M., Community Leader</p>
          </div>
        </div>
      </div>

      {/* Voting Reminder Strip */}
      <div className="bg-ga-gold py-8 px-4 text-center border-b border-ga-navy/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl font-bold text-ga-navy">
            Vote FOR Marcus Ryan for State House election in 2026 district 176 November 3, 2026. A leader we can trust.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-ga-navy text-white pt-20 pb-10 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <a href="#" className="flex flex-col mb-6">
                <span className="text-3xl font-display font-black tracking-tighter">
                  RYAN<span className="text-ga-red">FOR</span>GA
                </span>
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-ga-gold">
                  For State House • District 176
                </span>
              </a>
              <p className="text-white/60 max-w-md mb-8 leading-relaxed">
                Real leadership Real results
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-ga-red transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-ga-red transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-ga-red transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-ga-gold">Quick Links</h4>
              <ul className="space-y-4 text-white/70">
                <li><a href="#about" className="hover:text-white transition-colors">About Marcus</a></li>
                <li><a href="#issues" className="hover:text-white transition-colors">The Issues</a></li>
                <li><a href="#events" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#volunteer" className="hover:text-white transition-colors">Volunteer</a></li>
                <li><a href="#donate" className="hover:text-white transition-colors">Donate</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-ga-gold">Newsletter</h4>
              <p className="text-xs text-white/50 mb-4 italic">Stay updated with the latest campaign news.</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-white/10 border-none rounded-l-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-ga-gold w-full"
                />
                <button className="bg-ga-red px-4 rounded-r-xl hover:bg-ga-red/80 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="inline-block border-2 border-white/30 px-6 py-2 mb-4">
                <p className="text-[10px] uppercase font-bold tracking-[0.2em]">Paid for by Marcus Ryan for Georgia</p>
              </div>
              <p className="text-[10px] text-white/30 uppercase tracking-widest">
                © 2026 RyanForGeorgia.com. All Rights Reserved.
              </p>
            </div>
            
            <div className="flex space-x-8 text-[10px] uppercase tracking-widest font-bold text-white/40">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Use</a>
              <a href="#" className="hover:text-white">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
