import React, { useState, useEffect } from "react";
import "../Styles/contactme.css";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    emailjs.init('SfJ8zIH-hftRoyB0a'); // Initialize EmailJS with your public key
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_c9gz9gh', 'template_cbezi4s', e.target)
      .then((result) => {
          console.log(result.text);
          alert("Form submitted successfully!");
      }, (error) => {
          console.error("EmailJS Error:", error); // Log the full error object
          alert("An error occurred, please try again.");
      });

    e.target.reset();
    setShowForm(false);
  };

  return (
    <section className="contact-us">
      <h1>Jagadeesh Boya</h1>
      <div className="contact-container">
        <div className="contact-item">
          <i className="fas fa-desktop"></i>
          <h3>Connect With Me</h3>
          <button onClick={() => setShowForm(true)}>Click here to submit your details</button>
        </div>
        <div className="contact-item">
          <i className="fas fa-envelope"></i>
          <h3>Email Me</h3>
          <p>
            Email:{" "}
            <a href="mailto:jagadeeshboya27@gmail.com">
              jagadeeshboya27@gmail.com
            </a>
          </p>
        </div>
        <div className="contact-item">
          <i className="fab fa-facebook"></i>
          <h3>Follow Me</h3>
          <a href="https://www.linkedin.com/in/jagadeesh-boya-68122b262" target="_blank" rel="noopener noreferrer">
  Click Here To Visit My LinkedIn
</a>
        </div>
        <div className="contact-item">
          <i className="fas fa-building"></i>
          <h3>MY ADDRESS</h3>
          <p>
            Penakacherla(V), Garladinne(M), Anantapur Dist<br />
            Andhara Pradesh, 515731.
          </p>
        </div>
        <div className="contact-item">
          <i className="fas fa-phone-alt"></i>
          <h3>MY PHONE NUMBER</h3>
          <p>+91 9121585417</p>
        </div>
        <div className="contact-item">
          <i className="fas fa-fax"></i>
          <h3>MY FAX</h3>
          <p>+66 2 5724044 Ext.1</p>
        </div>
      </div>

      {showForm && (
        <div className="form-popup">
          <form onSubmit={handleFormSubmit}>
            <h2>Submit Your Details</h2>
            <label>
              Name:
              <input type="text" name="from_name" required />
            </label>
            <label>
              Phone:
              <input type="tel" name="phone" required />
            </label>
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
            <label>
              Purpose:
              <textarea name="message" required></textarea>
            </label>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(false)}>Close</button>
          </form>
        </div>
      )}
    </section>
  );
};

export default ContactUs;