import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsArrowRight } from "react-icons/bs";

import { fadeIn } from "@/variants";
import Decoration from "@/components/Decoration";
import { personalData } from "@/data/portfolio";

const ContactForm = () => {
  const messageRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useLayoutEffect(() => {
    const el = messageRef.current;
    if (!el) return;

    el.style.overflowY = "hidden";
    el.style.height = "auto";

    const nextHeight = el.scrollHeight;
    const maxHeight = Number.parseFloat(getComputedStyle(el).maxHeight);

    if (Number.isFinite(maxHeight) && nextHeight >= maxHeight) {
      el.style.height = `${maxHeight}px`;
      el.style.overflowY = "auto";
      return;
    }

    el.style.height = `${nextHeight}px`;
  }, [form.message]);

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Since there's no backend, fallback to mailto
    const mailtoLink = `mailto:${personalData.contact.email}?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )}`;

    window.location.href = mailtoLink;
    toast.success("Opening your email client...");
    
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <motion.form
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="flex-1 flex flex-col gap-6 w-full mx-auto"
      onSubmit={handleSubmit}
      autoComplete="off"
      autoCapitalize="off"
    >
      <div className="flex flex-col sm:flex-row gap-6 w-full">
        <div className="flex-1 min-w-0">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input"
            value={form.name}
            onChange={handleChange}
            maxLength={200}
            required
          />
        </div>
        <div className="flex-1 min-w-0">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className="input"
            value={form.email}
            onChange={handleChange}
            maxLength={100}
            required
          />
        </div>
      </div>
      <div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="input"
          value={form.subject}
          onChange={handleChange}
          maxLength={200}
          required
        />
      </div>
      <div>
        <textarea
          ref={messageRef}
          name="message"
          placeholder="Message..."
          className="textarea"
          rows={4}
          value={form.message}
          onChange={handleChange}
          maxLength={500}
          required
        />
      </div>
      <button
        type="submit"
        className="btn relative self-center sm:self-start w-fit min-w-42.5 whitespace-nowrap rounded-full border border-white/50 px-8 transition-colors duration-300 flex items-center justify-center overflow-hidden hover:border-accent group disabled:pointer-events-none"
      >
        <span className="group-hover:translate-y-[-120%] group-hover:opacity-0 transition-all duration-500">
          Send Message
        </span>
        <BsArrowRight
          className="translate-y-[-120%] opacity-0 group-hover:flex group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]"
          aria-hidden
        />
      </button>
    </motion.form>
  );
};

const Contact = () => {
  return (
    <div className="relative min-h-screen bg-primary/30 pb-24 xl:pb-0">
      <Decoration
        src="/rocket.webp"
        width={520}
        height={604}
        delay="1s"
        className="hidden lg:block lg:left-4 xl:left-[4%] lg:top-80 lg:w-[calc((100vw_-_700px)/2_-_40px)] lg:max-w-52"
      />
      <div className="relative z-10 container mx-auto pt-40 sm:pt-44 pb-12 lg:pt-36 xl:py-32 text-center xl:text-left flex items-center justify-center h-full">
        <div className="relative flex flex-col w-full max-w-175">
          <motion.h1
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-center mb-8"
          >
            Let's Build Something <span className="text-accent">Together.</span>
          </motion.h1>
          <motion.p
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-center mb-12 text-white/60"
          >
            Have a website idea, a web application to build, or a development project in mind? Feel free to reach out. I'm always open to discussing interesting projects, freelance opportunities and new ideas.
          </motion.p>
          {/* Phones & tablets: sits beside the Send button, in the free space */}
          <Decoration
            src="/rocket.webp"
            width={520}
            height={604}
            delay="1s"
            className="bottom-0 right-2 w-12 sm:w-14 lg:hidden"
          />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
