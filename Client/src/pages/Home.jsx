import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCode, AiOutlineDatabase } from "react-icons/ai";
import { BiServer, BiTime, BiCodeAlt } from "react-icons/bi";
import { HiSparkles, HiLightningBolt, HiShieldCheck } from "react-icons/hi";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Frontend Generator",
      description: "Describe your UI and let AI generate fully responsive, clean, and modern frontend code instantly, compatible with React, Vue, or Angular.",
      icon: <AiOutlineCode className="w-12 h-12" />,
      route: "/frontend",
      gradient: "from-blue-500 to-cyan-500",
      hoverGradient: "from-blue-600 to-cyan-600",
    },
    {
      title: "Backend Generator",
      description: "Paste your frontend code and automatically generate APIs, controllers, models, and full backend logic using best practices in Node.js, Django, Flask, FastAPI, or Spring Boot.",
      icon: <BiServer className="w-12 h-12" />,
      route: "/backend",
      gradient: "from-purple-500 to-pink-500",
      hoverGradient: "from-purple-600 to-pink-600",
    },
    {
      title: "Database Generator",
      description: "Automatically generate database schemas, tables, relationships, and SQL/NoSQL queries that seamlessly integrate with your backend.",
      icon: <AiOutlineDatabase className="w-12 h-12" />,
      route: "/database",
      gradient: "from-indigo-500 to-purple-500",
      hoverGradient: "from-indigo-600 to-purple-600",
    },
  ];

  const benefits = [
    {
      icon: <BiTime className="w-8 h-8" />,
      title: "Save Time",
      description: "Automate repetitive coding tasks and accelerate development cycles significantly.",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: <HiShieldCheck className="w-8 h-8" />,
      title: "Best Practices",
      description: "All generated code follows industry best practices: clean, modular, and maintainable.",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: <BiCodeAlt className="w-8 h-8" />,
      title: "Full Integration",
      description: "Seamlessly integrate frontend, backend, and database code into a single cohesive project.",
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Describe Your UI",
      description: "Provide a description of your desired UI or paste existing frontend code. Our AI prepares it for backend and database integration.",
    },
    {
      number: "02",
      title: "Generate Backend",
      description: "Paste your frontend code and let AI generate backend logic, APIs, and controllers using best practices.",
    },
    {
      number: "03",
      title: "Database Integration",
      description: "Automatically create database schemas, tables, relationships, and queries that fully integrate with your backend logic.",
    },
  ];

  return (
    <>
      <Navbar minimal={true} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8">
                <HiSparkles className="w-4 h-4" />
                AI-Powered Code Generation
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                TitanAx Labs
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                Generate <span className="font-semibold text-gray-900 dark:text-white">frontend, backend, and database code</span> instantly with AI.
                Streamline development and focus on building amazing products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {features.map((feature, index) => (
                  <motion.button
                    key={index}
                    onClick={() => navigate(feature.route)}
                    className={`group relative px-8 py-4 bg-gradient-to-r ${feature.gradient} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">{feature.title}</span>
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Three simple steps to generate your code
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600">
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Platform Features
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Everything you need to accelerate development
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => navigate(feature.route)}
                  className={`group relative bg-gradient-to-br ${feature.gradient} rounded-2xl p-8 text-white cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                  <div className="relative z-10">
                    <div className="mb-6 flex justify-center">
                      <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-center text-white/90 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose TitanAx Labs?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Built for developers, by developers
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 group"
                >
                  <div className={`${benefit.color} mb-4`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <HiLightningBolt className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Accelerate Your Development?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Start generating code instantly. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(feature.route)}
                    className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Try {feature.title.split(" ")[0]}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Get In Touch
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Have questions? We'd love to hear from you.
              </p>
            </motion.div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <ContactForm />
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

export default Home;
