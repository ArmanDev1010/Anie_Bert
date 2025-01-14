import React from "react";
import { Contact, Navbar } from "../components";

const ContactPage = () => {
  return (
    <div className="bg-secondary flex flex-col min-h-screen">
      <Navbar />
      <div className="w-full h-[120px] mb-[30px]"></div>
      <div className="flex-grow">
        <Contact is_contact_page={true} />
      </div>
    </div>
  );
};

export default ContactPage;
