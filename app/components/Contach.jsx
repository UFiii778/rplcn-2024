"use client";

import { assets } from "@/assets/assets";
import React, { useState } from "react";
import Image from "next/image";
import { sendEmail } from "@/app/actions/sendEmail";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MessageSquare, MapPin, Phone, Loader2, CheckCircle2 } from "lucide-react";

const Contact = () => {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setResult("Sending message via server...");

    const formData = new FormData(event.target);

    const response = await sendEmail(formData);

    if (response.success) {
      setResult(response.message);
      setIsSuccess(true);
      event.target.reset();


      setTimeout(() => {
        setIsSuccess(false);
        setResult("");
      }, 4000);
    } else {
      setResult(response.message);
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="w-full bg-white text-black py-20 px-[5%] sm:px-[10%] min-h-screen flex flex-col items-center justify-center relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 z-10 mt-10">


        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="text-sm font-semibold text-sky-600 mb-4 block tracking-wider uppercase">
            Contact us
          </span>

          <div className="mb-6 flex justify-start">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-sky-400 shadow-md">
              <Image
                src={assets.profile || "https://picsum.photos/200"}
                alt="Profile"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-Ovo tracking-tight mb-4 text-sky-600 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            Get in Touch
          </h2>

          <p className="text-gray-600 mb-12 mt-3 max-w-md font-light">
            Have a project in mind, a question, or just want to say hi? Drop a message below, and it will land straight in my inbox!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
            {/* Email */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Email</h4>
                <p className="text-sm text-gray-500 mb-1">Our friendly team is here to help.</p>
                <a href="mailto:kuraoshen@gmail.com" className="text-sm font-medium text-sky-600 hover:underline">kuraoshen@gmail.com</a>
              </div>
            </div>

            {/* Live Chat */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Live chat</h4>
                <p className="text-sm text-gray-500 mb-1">Our friendly team is here to help.</p>
                <span className="text-sm font-medium text-sky-600 cursor-pointer hover:underline">Start new chat</span>
              </div>
            </div>

            {/* Office */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Office</h4>
                <p className="text-sm text-gray-500 mb-1">Come say hello at our office HQ.</p>
                <p className="text-sm font-medium text-gray-700 leading-relaxed">Bandung, West Java, Indonesia</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Phone</h4>
                <p className="text-sm text-gray-500 mb-1">Mon-Fri from 8am to 5pm.</p>
                <a href="tel:+12345678" className="text-sm font-medium text-sky-600 hover:underline">+62 898-9232-829</a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full bg-white/70 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-6 sm:p-8 min-h-[450px] flex flex-col justify-center relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  onSubmit={onSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">First name *</label>
                      <input name="firstName" type="text" placeholder="First name" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-white/80" required />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Last name *</label>
                      <input name="lastName" type="text" placeholder="Last name" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-white/80" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
                    <input name="email" type="email" placeholder="you@company.com" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-white/80" required />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Message *</label>
                    <textarea name="message" rows={4} placeholder="Leave us a message..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-white/80 resize-none" required></textarea>
                  </div>

                  <div className="flex items-start gap-2 py-1">
                    <input type="checkbox" id="privacy" className="mt-0.5 rounded text-sky-600 focus:ring-sky-500 border-gray-300" required />
                    <label htmlFor="privacy" className="text-xs text-gray-500 leading-tight">
                      You agree to our friendly <span className="underline cursor-pointer text-gray-700 font-medium">privacy policy</span>.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl text-white font-medium text-sm bg-gradient-to-r from-sky-500 to-slate-600 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-sky-500/20 disabled:opacity-75 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send message"
                    )}
                  </button>

                  {result && !isSuccess && (
                    <p className="text-xs text-center text-gray-500 mt-2">{result}</p>
                  )}
                </motion.form>
              ) : (

                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center space-y-4 py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 drop-shadow" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-bold text-gray-800"
                  >
                    Message Sent Successfully!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm text-gray-500 max-w-xs"
                  >
                    {result || "Thank you! Our team will get back to you as soon as possible."}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </motion.div>

    </section>
  );
};

export default Contact;