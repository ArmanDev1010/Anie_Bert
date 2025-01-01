import React from "react";
import { Contact, Navbar } from "../components";

const ContactPage = () => {
  return (
    <div className="h-screen bg-secondary flex flex-col">
      <Navbar />
      <div className="w-full h-[120px] mb-[10px]"></div>
      <div className="flex-[1_1_auto]">
        <Contact is_contact_page={true} />
      </div>
    </div>
  );
};

export default ContactPage;
