import React from 'react'
import { AnimatedText } from './AnimatedComponent'
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { subscribeMe } from "../../redux/actions/postAction";
// Import icons from a React icon library (e.g., react-icons)
import { FaBriefcase, FaBuilding, FaTrophy, FaStar, FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSubscriber(e) {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData);
          dispatch(subscribeMe(data));
          e.target.reset();
      }
  return (
    <>
    <div className="flex min-h-screen flex-col" style={{backgroundColor:"white", color:"black"}}>
      {/* Navigation */}
      <header className="border-b bg-white">
  <div className="container mx-auto flex h-16 items-center justify-between px-4">
    {/* Logo Section */}
    <div className="flex items-center space-x-2">
      <a href="/" className="flex items-center">
        <img
          src="https://res.cloudinary.com/dk9gvtcgx/image/upload/v1713337557/job-logo/knycmbmkqrcfzpx3r2au.png"
          alt="Xfintern Logo"
          width="120"
          className="hover:scale-105 transition-transform duration-300 ease-out cursor-pointer"
        />
      </a>
      <span className="text-2xl font-bold">Xfintern</span>
    </div>

    {/* Navigation Links */}
    <nav className="flex items-center space-x-4">
      <a
        href="#features"
        className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
      >
        Features
      </a>
      <a
        href="#pricing"
        className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
      >
        Pricing
      </a>
      <a
        href="#contact"
        className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
      >
        Contact
      </a>
    </nav>

    {/* Button (Optional: CTA) */}
    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition" onClick={() => navigate('/login')}>
      Get Started
    </button>
  </div>
</header>


      {/* Hero Section with Animated Text */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-10" />
        <div className="container mx-auto relative px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center space-x-4 mb-6">
              <span className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                3000+ Companies Listed
              </span>
              <span className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                New Jobs Daily
              </span>
            </div>
            <AnimatedText 
              staticText="Your Gateway to Top Tech"
              words={["Opportunities", "Internships", "Careers", "Startups"]}
            />
            <p className="mt-6 text-lg text-gray-600">
              Discover internships and jobs from 3000+ companies - from startups to tech giants.
              Curated opportunities from Hacker News and beyond.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700" onClick={() => navigate('/home')}>
                Find Opportunities
              </button>
              <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg text-lg hover:bg-blue-50" onClick={() => navigate('/login')}>
                Post a Job
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Why Choose Xfintern?</h2>
          <p className="mt-4 text-lg text-gray-600">
            The most comprehensive tech job platform for both companies and candidates
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: FaBuilding, title: "Curated Company Profiles", description: "Detailed profiles of 3000+ companies, including funding information, tech stack, and culture." },
            { icon: FaTrophy, title: "Featured Opportunities", description: "Premium placement for featured job posts, reaching the most qualified candidates first." },
            { icon: FaStar, title: "Top HN Listings", description: "Exclusive job opportunities from trending Hacker News `Who is hiring?` threads." }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <feature.icon className="h-10 w-10 mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-100">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the plan that works best for your company
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Starter", price: "Free", features: ["Company profile listing", "3 free job posts", "Basic analytics"], buttonText: "Get Started", disabled: false },
              { title: "Growth", price: "Coming Soon", features: ["Enhanced company profile", "Unlimited job posts", "Featured in search results", "Advanced analytics"], buttonText: "Join Waitlist", disabled: true },
              { title: "Enterprise", price: "Coming Soon", features: ["Priority featured placement", "Dedicated support", "Custom branding", "API access"], buttonText: "Contact Sales", disabled: true }
            ].map((plan, index) => (
              <div key={index} className={`bg-white p-6 rounded-lg shadow-md ${index === 1 ? 'border-2 border-blue-600' : ''}`}>
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <div className="text-3xl font-bold mb-4">{plan.price}</div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <FaCheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-2 rounded ${plan.disabled ? 'bg-gray-300 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  disabled={plan.disabled}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Trusted by Leading Companies</h2>
          <p className="mt-4 text-lg text-gray-600">
            See what companies are saying about Xfintern
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="h-4 w-4 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4">
                "Xfintern has been instrumental in helping us find top tech talent. The quality of candidates and the platform's ease of use are outstanding."
              </p>
              <div className="flex items-center">
                <img
                  src={`https://i.pravatar.cc/40?img=${i}`}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-semibold">Jane Smith</div>
                  <div className="text-sm text-gray-600">
                    Tech Recruiter, Example Corp
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100">
        <div className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="mt-4 text-lg text-gray-600">
              We are re-building this from scratch again?
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Have questions? We're here to help.
            </p>
            {/* <div className="mt-10">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700">
                Contact Us
              </button>
            </div> */}
          
            <div style={{
                        display: 'flex',
                        justifyContent: "center"
                    }}>
                        <form onSubmit={handleSubscriber}>
                            <input type="email"
                                style={{
                                    width: "300px"
                                }}
                                placeholder="example@xfintern.com"
                                name="email"
                                autoComplete='off'
                                className='btn-detail-demo hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer' 
                                />
                            <div className="mt-2">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700" type="submit">
              Join the waitlist
              </button>
            </div>
                        </form>
                    </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2">
              <a href="" className='flex items-center h-full'>
                                <img src="https://res.cloudinary.com/dk9gvtcgx/image/upload/v1713337557/job-logo/knycmbmkqrcfzpx3r2au.png" alt=""
                                    width="80px"
                                    className='hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer'
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                    width="0" height="50" viewBox="0 0 2000 1520" className='xf-logo'>
                                    <g transform="matrix(1,0,0,1,-0.820741883743267,0.6153846153847553)"><svg viewBox="0 0 325 247" data-background-color="#000000" preserveAspectRatio="xMidYMid meet" height="1520" width="2000" xmlns="http://www.w3.org/2000/svg"
                                    ><g id="tight-bounds" transform="matrix(1,0,0,1,0.1333705561082752,-0.09999999999999432)"><svg viewBox="0 0 324.73325888778345 247.2" height="247.2" width="324.73325888778345"><g><svg viewBox="0 0 324.73325888778345 247.2" height="247.2" width="324.73325888778345"><g><svg viewBox="0 0 324.73325888778345 247.2" height="247.2" width="324.73325888778345"><g id="textblocktransform"><svg viewBox="0 0 324.73325888778345 247.2" height="247.2" width="324.73325888778345" id="textblock"><g><svg viewBox="0 0 324.73325888778345 247.2" height="247.2" width="324.73325888778345"><g transform="matrix(1,0,0,1,0,0)"><svg width="324.73325888778345" viewBox="0.55 -26.172569638844998 40.95 31.172569638844998" height="247.2" data-palette-color="#ffffff"
                                    ><path d="M1.9 5L1.9 5Q1.65 5 1.45 4.8L1.45 4.8Q1 4.4 0.78 4.08 0.55 3.75 0.55 3.25L0.55 3.25Q0.55 2.7 0.95 1.65L0.95 1.65Q3.65-4.85 16.75-15.7L16.75-15.7Q15.9-17.1 14.3-18.35 12.7-19.6 10.75-20.55L10.75-20.55Q10.6-20.65 10.6-20.75L10.6-20.75Q10.6-20.9 10.7-21L10.7-21Q10.95-21.45 11.75-21.8 12.55-22.15 12.95-21.95L12.95-21.95Q16.55-20.2 18.5-16.95L18.5-16.95Q27.2-23.85 30.1-24.95L30.1-24.95Q30.55-25.15 31-25.15L31-25.15Q31.7-25.15 31.7-24.5L31.7-24.5Q31.7-24 31.25-23.38 30.8-22.75 30.4-22.65L30.4-22.65Q29.3-22.3 27.53-21.3 25.75-20.3 23.58-18.9 21.4-17.5 19.1-15.85L19.1-15.85Q20.75-12.05 20.75-7.6L20.75-7.6Q20.75-3.85 19.55-0.75L19.55-0.75Q19.35-0.15 18.75-0.15L18.75-0.15Q18.05-0.15 18.35-1L18.35-1Q19.3-3.35 19.3-6.25L19.3-6.25Q19.3-10.35 17.4-14.55L17.4-14.55Q15.15-12.85 12.83-10.8 10.5-8.75 8.45-6.6 6.4-4.45 4.83-2.4 3.25-0.35 2.5 1.45L2.5 1.45Q2.45 1.5 2.4 1.68 2.35 1.85 2.25 2.1L2.25 2.1Q2.05 2.55 1.95 3L1.95 3Q1.9 3.1 1.9 3.35L1.9 3.35Q1.9 3.7 2.1 3.9L2.1 3.9Q2.35 4.15 2.35 4.45L2.35 4.45Q2.35 5 1.9 5ZM23.75 3.3L23.75 3.3Q23.2 3.3 22.82 2.95 22.45 2.6 22.5 2.1L22.5 2.1Q22.35 1.4 22.72 0.08 23.1-1.25 23.8-2.9 24.5-4.55 25.32-6.3 26.15-8.05 26.9-9.55L26.9-9.55 23.55-8.65 23.45-8.65Q23.1-8.65 23.1-9L23.1-9Q23.1-9.5 23.52-10.18 23.95-10.85 24.45-11L24.45-11Q24.95-11.2 25.85-11.35 26.75-11.5 28.1-11.7L28.1-11.7Q36.6-25.95 38.85-26.15L38.85-26.15Q41.5-26.45 41.5-22.8L41.5-22.8Q41.5-22.35 41.42-21.73 41.35-21.1 41.25-20.25L41.25-20.25Q41.2-19.75 40.9-19.75L40.9-19.75Q40.7-19.75 40.57-20.05 40.45-20.35 40.55-20.8L40.55-20.8Q40.7-21.7 40.7-22.3L40.7-22.3Q40.7-24.25 39.55-24.25L39.55-24.25Q38.4-24.25 35.9-20.65L35.9-20.65Q34.65-18.8 33.22-16.63 31.8-14.45 30.25-11.95L30.25-11.95Q30.7-12 31.15-12.03 31.6-12.05 32-12.05L32-12.05Q32.45-12.05 33.02-12.08 33.6-12.1 34.25-12.15L34.25-12.15Q34.65-12.45 35-12.45L35-12.45Q35.65-12.45 35.65-11.75L35.65-11.75Q35.65-11 34.8-11L34.8-11Q34.55-11 34.1-11.15L34.1-11.15Q32.8-11.05 32.1-10.93 31.4-10.8 30.8-10.63 30.2-10.45 29.2-10.2L29.2-10.2Q27.95-8.15 26.85-6.13 25.75-4.1 25.02-2.4 24.3-0.7 24.3 0.4L24.3 0.4Q24.3 1.4 25.1 1.45L25.1 1.45Q25.8 1.15 26.1 1.15L26.1 1.15Q26.45 1.15 26.45 1.4L26.45 1.4Q26.45 1.85 25.4 2.65L25.4 2.65Q24.6 3.3 23.75 3.3Z" opacity="1" transform="matrix(1,0,0,1,0,0)" fill="#ffffff"
                                        data-fill-palette-color="primary" id="text-0"></path></svg></g></svg></g></svg></g></svg></g><g></g></svg></g><defs></defs></svg><rect width="324.73325888778345" height="247.2" fill="none" stroke="none" visibility="hidden"></rect></g></svg></g></svg>
                            </a>
                <span className="text-2xl font-bold">Xfintern</span>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Connecting top tech talent with innovative companies.
              </p>
            </div>
            {['Product', 'Company', 'Legal'].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4">{section}</h3>
                <ul className="space-y-2 text-sm">
                  {['Features', 'Pricing', 'For Companies', 'For Job Seekers'].map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{
                           display: "flex",
                                 justifyContent: "center",
                                 marginTop:"20px"
                                 // marginBottom: "35px"
                             }}>
         
                                 <Link to={"https://linkedin.com/company/xf2809"} style={{ margin: "0 10px", fontSize: "1.75rem" }} target="blank"><FaLinkedin /></Link>
                                 <Link to={"https://twitter.com/xfintern"} style={{ mLinkrgin: "0 10px", fontSize: "1.75rem" }} target="blank"><FaXTwitter /></Link>
                                 <Link to={"https://github.com/manzil-infinity180"} style={{ margin: "0 10px", fontSize: "1.75rem" }} target="blank"><FaGithub /></Link>
                                 <Link to={"mailto:xfintern@gmail.com"} style={{ margin: "0 10px", fontSize: "1.75rem" }} target="_top"><MdEmail /></Link>
                             </div>
                   <div className="mt-6 border-t pt-8 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Xfintern. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}

export default LandingPage

