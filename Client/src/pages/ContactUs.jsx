import React from "react";
import Navbar from "../components/Navbar";
import ownerImage from "../assets/owner.jpg";
import coOwnerImage from "../assets/co-owner.jpg";
import ContactForm from "../components/ContactForm";
import { HiMail, HiPhone, HiLocationMarker, HiUser, HiBriefcase } from "react-icons/hi";
import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Get In Touch
              </h1>
              <p className="text-xl text-white/90">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Meet The Team
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                The passionate developers behind TitanAx Labs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Founder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <a
                    href="https://www.linkedin.com/in/jaskaran-joshi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mb-6"
                  >
                    <div className="relative">
                      <img
                        src={ownerImage}
                        alt="Founder"
                        className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border-4 border-indigo-500 dark:border-indigo-400 transform transition-transform duration-300 group-hover:scale-110 shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </div>
                  </a>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Mr. Jaskaran Joshi
                  </h3>
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-4">
                    <HiBriefcase className="w-5 h-5" />
                    <p className="font-semibold">Founder & Lead Architect</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    The mind behind <strong className="text-gray-900 dark:text-white">TitanAx Labs</strong>, from concept to
                    execution. Designed and built the entire system architecture
                    including frontend, backend, UI animations, and database
                    structure.
                  </p>
                </div>
              </motion.div>

              {/* Co-Founder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <a
                    href="https://www.linkedin.com/in/mukulmalik23/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mb-6"
                  >
                    <div className="relative">
                      <img
                        src={coOwnerImage}
                        alt="Co-Founder"
                        className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border-4 border-purple-500 dark:border-purple-400 transform transition-transform duration-300 group-hover:scale-110 shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </div>
                  </a>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Mr. Mukul Malik
                  </h3>
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-4">
                    <HiBriefcase className="w-5 h-5" />
                    <p className="font-semibold">Co-Founder</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Assisted in the deployment process, helping ensure that{" "}
                    <strong className="text-gray-900 dark:text-white">TitanAx Labs</strong> successfully launched and went live
                    with a stable, production-ready environment.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 md:p-12 text-center border border-indigo-200 dark:border-indigo-800"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                About Us
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                At <strong className="text-indigo-600 dark:text-indigo-400">TitanAx Labs</strong>, we are dedicated to empowering
                developers with cutting-edge AI tools that instantly generate
                high-quality frontend, backend, and database code. Our mission is to
                accelerate your project timelines by providing reliable, efficient,
                and best-practice-compliant code solutions, allowing you to focus on
                innovation and creativity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Have a question or want to work together?
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Get In Touch
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HiPhone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">Phone</p>
                      <a
                        href="tel:+918000260019"
                        className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        +91 80002 60019
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HiMail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">Email</p>
                      <a
                        href="mailto:support@titanaxlabs.com"
                        className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-all"
                      >
                        support@titanaxlabs.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HiLocationMarker className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">Address</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        42 Innovator Street, Pratap Nagar Tech Zone,<br />
                        Jaipur, Rajasthan 302033, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send Us a Message
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 dark:bg-black border-t border-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} TitanAx Labs. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ContactUs;
