import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactUsForm from "./ContactUsForm";
import "./index.css";

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <Navbar white={true}></Navbar>
      <div className="bg_blob2"></div>
      <ContactUsForm />
      <Footer />
    </div>
  );
};

export default ContactUs;
