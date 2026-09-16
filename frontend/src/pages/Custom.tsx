import { useState } from "react";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

import {
  createCustomWhatsAppOrder,
  type CustomOrderDetails,
} from "../utils/whatsapp";

function Custom() {
  const [formData, setFormData] = useState<CustomOrderDetails>({
    name: "",
    phone: "",
    email: "",
    productType: "",
    quantity: 1,
    colors: "",
    customization: "",
    deliveryDate: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    budget: "",
  });

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        name === "quantity" ? Number(value) : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a valid 10-digit Indian phone number";
    }

    if (!formData.productType) {
      newErrors.productType =
        "Please select a product type";
    }

    if (!formData.customization.trim()) {
      newErrors.customization =
        "Please describe what you want";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode =
        "Enter a valid 6-digit PIN code";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    createCustomWhatsAppOrder(formData);

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-[75vh] bg-[#f8f5ef] px-6 py-24 text-[#241d19]">
        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#7a8b72] text-white">
            <Check size={30} />
          </div>

          <p className="mt-8 text-[10px] uppercase tracking-[0.35em] text-[#756b63]">
            Custom request
          </p>

          <h1 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
            Your request is ready.
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-[#756b63]">
            We've prepared your custom order details.
            Continue the conversation on WhatsApp so we
            can discuss your design, pricing and delivery.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              to="/shop"
              className="rounded-full border border-[#2b211c]/15 px-7 py-4 text-sm font-medium transition hover:bg-white"
            >
              Continue shopping
            </Link>

            <button
              type="button"
              onClick={() => {
                createCustomWhatsAppOrder(formData);
              }}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#2b211c] px-7 py-4 text-sm font-medium text-white transition hover:-translate-y-1 hover:bg-[#7a8b72]"
            >
              <MessageCircle size={18} />
              Open WhatsApp
            </button>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 py-12 text-[#241d19] sm:px-10 lg:px-16 lg:py-20">

      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[#756b63] transition hover:text-[#2b211c]"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        {/* Header */}
        <header className="mt-12 max-w-3xl">

          <p className="text-[10px] uppercase tracking-[0.4em] text-[#756b63]">
            Custom orders
          </p>

          <h1 className="mt-5 text-5xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Make something
            <br />
            <span className="font-normal italic text-[#7a8b72]">
              personal.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-[#756b63] sm:text-lg">
            Tell us what you have in mind. Names, dates,
            colors, memories or completely new ideas —
            we'll help turn them into a handmade resin piece.
          </p>

        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-16 grid gap-12 lg:grid-cols-[1fr_360px]"
        >

          {/* LEFT */}
          <div className="space-y-12">

            {/* Customer */}
            <section>

              <h2 className="text-xl font-medium">
                Your details
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="name"
                    className="text-sm"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-xl border border-[#2b211c]/10 bg-white/60 px-4 py-3.5 outline-none transition focus:border-[#7a8b72]"
                  />

                  {errors.name && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="mt-2 w-full rounded-xl border border-[#2b211c]/10 bg-white/60 px-4 py-3.5 outline-none transition focus:border-[#7a8b72]"
                  />

                  {errors.phone && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="text-sm"
                  >
                    Email
                    <span className="ml-2 text-[#756b63]/50">
                      Optional
                    </span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-[#2b211c]/10 bg-white/60 px-4 py-3.5 outline-none transition focus:border-[#7a8b72]"
                  />
                </div>

              </div>

            </section>

            {/* Product */}
            <section>

              <h2 className="text-xl font-medium">
                Your custom piece
              </h2>

              <div className="mt-6 space-y-5">

                <div>
                  <label
                    htmlFor="productType"
                    className="text-sm"
                  >
                    What would you like?
                  </label>

                  <select
                    id="productType"
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-[#2b211c]/10 bg-white/60 px-4 py-3.5 outline-none transition focus:border-[#7a8b72]"
                  >
                    <option value="">
                      Select a product
                    </option>
                    <option value="Keychain">
                      Keychain
                    </option>
                    <option value="Coaster">
                      Coaster
                    </option>
                    <option value="Tray">
                      Tray
                    </option>
                    <option value="Bookmark">
                      Bookmark
                    </option>
                    <option value="Plaque">
                      Plaque
                    </option>
                    <option value="Custom Gift">
                      Custom Gift
                    </option>
                    <option value="Something else">
                      Something else
                    </option>
                  </select>

                  {errors.productType && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.productType}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="quantity"
                      className="text-sm"
                    >
                      Quantity
                    </label>

                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min={1}
                      max={100}
                      value={formData.quantity}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-[#2b211c]/10 bg-white/60 px-4 py-3.5 outline-none transition focus:border-[#7a8b72]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="budget"
                      className="text-sm"
                    >
                      Approx. budget
                      <span className="ml-2 text-[#756b63]/50">
                        Optional
                      </span>
                    </label>

                    <input
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="₹1,000"
                      className="mt-2 w-full rounded-xl border border-[#2b211c]/10 bg-white/60 px-4 py-3.5 outline-none transition focus:border-[#7a8b72]"
                    />
                  </div>

                </div>

                <div>
                  <label
                    htmlFor="colors"
                    className="text-sm"
                  >
                    Preferred colors
                    <span className="ml-2 text-[#756b63]/50">
                      Optional
                    </span>
                  </label>

                  <input
                    id="colors"
                    name="colors"
                    value={formData.colors}
                    onChange={handleChange}
                    placeholder="For example: white, gold and transparent"
                    className="mt-2 w-full rounded-xl border border-[#2b211c]/10 bg-white/60 px-4 py-3.5 outline-none transition focus:border-[#7a8b72]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="customization"
                    className="text-sm"
                  >
                    Tell us your idea
                  </label>

                  <textarea
                    id="customization"
                    name="customization"
                    rows={6}
                    value={formData.customization}
                    onChange={handleChange}
                    placeholder="Tell us the name, date, design, flowers, colors or anything else you'd like..."
                    className="mt-2 w-full resize-none rounded-xl border border-[#2b211c]/10 bg-white/60 px-4 py-3.5 outline-none transition focus:border-[#7a8b72]"
                  />

                  {errors.customization && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.customization}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="deliveryDate"
                    className="text-sm"
                  >
                    Preferred delivery date
                    <span className="ml-2 text-[#756b63]/50">
                      Optional
                    </span>
                  </label>

                  <input
                    id="deliveryDate"
                    name="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-[#2b211c]/10 bg-white/60 px-4 py-3.5 outline-none transition focus:border-[#7a8b72]"
                  />
                </div>

              </div>

            </section>

            {/* Address */}
            <section>

              <h2 className="text-xl font-medium">
                Delivery details
              </h2>

              <div className="mt-6 space-y-5">

                <div>
                  <label
                    htmlFor="address"
                    className="text-sm"
                  >
                    Address
                  </label>

                  <input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House / building / street"
                    className="mt-2 w-full rounded-xl border border-[#2b211c]/10 bg-white/60 px-4 py-3.5 outline-none transition focus:border-[#7a8b72]"
                  />

                  {errors.address && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="city"
                      className="text-sm"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Kottayam"
                      className="mt-2 w-full rounded-xl border border-[#2b211c]/10 bg-white/60 px-4 py-3.5 outline-none transition focus:border-[#7a8b72]"
                    />

                    {errors.city && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="text-sm"
                    >
                      State
                    </label>

                    <input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Kerala"
                      className="mt-2 w-full rounded-xl border border-[#2b211c]/10 bg-white/60 px-4 py-3.5 outline-none transition focus:border-[#7a8b72]"
                    />

                    {errors.state && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.state}
                      </p>
                    )}
                  </div>

                </div>

                <div className="max-w-xs">
                  <label
                    htmlFor="pincode"
                    className="text-sm"
                  >
                    PIN code
                  </label>

                  <input
                    id="pincode"
                    name="pincode"
                    inputMode="numeric"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="686001"
                    className="mt-2 w-full rounded-xl border border-[#2b211c]/10 bg-white/60 px-4 py-3.5 outline-none transition focus:border-[#7a8b72]"
                  />

                  {errors.pincode && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.pincode}
                    </p>
                  )}
                </div>

              </div>

            </section>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#2b211c] px-7 py-4 text-sm font-medium text-white transition hover:-translate-y-1 hover:bg-[#7a8b72] hover:shadow-xl"
            >
              <MessageCircle size={18} />
              Send custom request on WhatsApp
            </button>

          </div>

          {/* RIGHT INFO */}
          <aside className="h-fit rounded-[2rem] bg-[#2b211c] p-7 text-white sm:p-8 lg:sticky lg:top-28">

            <p className="text-[10px] uppercase tracking-[0.35em] text-[#d6b77a]">
              How it works
            </p>

            <div className="mt-8 space-y-8">

              <div>
                <span className="text-xs text-white/40">
                  01
                </span>

                <h3 className="mt-2 text-lg font-medium">
                  Tell us your idea
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/55">
                  Describe the piece you want and include
                  any names, dates, colors or memories.
                </p>
              </div>

              <div>
                <span className="text-xs text-white/40">
                  02
                </span>

                <h3 className="mt-2 text-lg font-medium">
                  Discuss the design
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/55">
                  We'll contact you through WhatsApp to
                  discuss the design and final price.
                </p>
              </div>

              <div>
                <span className="text-xs text-white/40">
                  03
                </span>

                <h3 className="mt-2 text-lg font-medium">
                  We make it
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/55">
                  Once everything is confirmed, we'll
                  carefully create your handmade piece.
                </p>
              </div>

            </div>

            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="text-xs leading-5 text-white/45">
                Custom orders are handmade individually,
                so production time can vary depending on
                the design.
              </p>
            </div>

          </aside>

        </form>

      </div>

    </main>
  );
}

export default Custom;