import React, { useState } from "react";
import toast from "react-hot-toast";
//INTERNAL IMPORT
import { Banner, Action, Input, Button, Notify } from "../components/index";

const contactUs = () => {
  const [count, setCount] = useState("");
  const [formInput, updateFormImput] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const notifyCustom = (image, message) =>
    toast.custom(<Notify image={image} message={message} toast={toast} />, {
      duration: 2000,
    });

  //EMAIL TEMPLATE
  const recipient = "theblockchaincoders@gmail.com";
  const subject = formInput?.subject;
  const body = `Dear Crypto King Team, \n\n\n I hope this email find you well. I am reaching out regarding [${formInput?.subject}] \n \n \n EmailID: ${formInput?.email} \n Phone: ${formInput?.phone} \n\n\n ${formInput.message}`;

  const handleClick = () => {
    const { name, email, phone, subject, message } = formInput;

    if (!name || !email || !phone || !subject || !message) {
      return notifyCustom("failed.png", "Kindly provide all the details");
    }

    notifyCustom("/email.jpg", "Kindly submit your request for details");

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div>
      <Banner
        name={
          <>
            For any help please <br /> contact us
          </>
        }
        childStyles={"md:text-4xl sm:text-2xl xs:text-xl text-left"}
        parentStyle={
          "justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded"
        }
      />

      <div className="flex justify-center sm:px-4 p-12">
        <div className="w-3/5 md:w-full">
          <Input
            inputType={"text"}
            title={"Name"}
            placeholder={"name"}
            handleClick={(e) =>
              updateFormImput({ ...formInput, name: e.target.value })
            }
          />

          <Input
            inputType={"text"}
            title={"Email"}
            placeholder={"email"}
            handleClick={(e) =>
              updateFormImput({ ...formInput, email: e.target.value })
            }
          />

          <Input
            inputType={"text"}
            title={"Number"}
            placeholder={"number"}
            handleClick={(e) =>
              updateFormImput({ ...formInput, phone: e.target.value })
            }
          />
          <Input
            inputType={"text"}
            title={"Subject"}
            placeholder={"subject"}
            handleClick={(e) =>
              updateFormImput({ ...formInput, subject: e.target.value })
            }
          />

          <Input
            inputType={"textarea"}
            title={`Message ${count}`}
            placeholder={"name"}
            handleClick={(e) => (
              setCount(e.target.value.length),
              updateFormImput({ ...formInput, message: e.target.value })
            )}
          />

          <div className="mt-7 w-full flex justify-end">
            <Button
              btnName={"Send"}
              btnType={"primary"}
              classStyle={"rounded"}
              handleClick={handleClick}
            />
          </div>
          <Action />
        </div>
      </div>
    </div>
  );
};

export default contactUs;
