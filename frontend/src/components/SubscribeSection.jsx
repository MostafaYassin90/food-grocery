import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

function SubscribeSection() {
  const [value, setValue] = useState("");
  const schema = z.object({
    value: z.string({ required_error: "Email Id Is Requried" }).email({ message: "please Enter a Valid Email" })
  });

  const subscribeHandler = () => {
    const validation = schema.safeParse({ value: value });
    console.log(validation);
    if (!validation.success) {
      toast.info(validation.error.errors[0].message);
      return null;
    } else {

      setValue("");
      toast.success("Subscribe Added Successfully!");
    }

  };

  return (
    <div className="py-10 w-full md:w-[700px] mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="tetx-3xl md:text-4xl text-gray-700 font-semibold">Never Miss a Deal!</h2>
        <p className="text-base text-gray-600">Subscribe to get the latest offers, new arrivals, and exclusive discounts</p>
      </div>
      {/* Subscribe Search Form */}
      <div className="w-full border rounded-md overflow-hidden border-gray-400 rounde-md h-[50px] flex items-center gap-2">
        <input type="text" value={value} onChange={(event) => { setValue(event.target.value); }}
          placeholder="Enter Your Email ID"
          className="w-full px-3 h-[50px] outline-none" />
        <button onClick={subscribeHandler} className="text-white px-5 bg-primary h-[50px]">Subscribe</button>
      </div>
    </div>
  );
}

export default SubscribeSection;