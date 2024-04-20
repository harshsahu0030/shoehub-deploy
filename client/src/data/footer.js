import { TbShoe } from "react-icons/tb";
import { LuBadgePercent } from "react-icons/lu";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { TbTruckDelivery } from "react-icons/tb";
import Footer_Coupen from "../assets/footer_coupon.png";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiPhoneCallLight } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";
import { SlHandbag } from "react-icons/sl";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";

export const footer_data = {
  subscribe: {
    subHeading: "$20 discount for your first order",
    heading: "Join our newsletter and get...",
    desc: "Join our email subscription now to get updates on promotions and coupons.",
    button: "Subscribe",
    imgUrl: Footer_Coupen,
  },

  contact: {
    icon: PiPhoneCallLight,
    number: "+1800 444444 8080",
  },

  working: "Working 10:00AM - 06:00PM",

  copyRights:
    "Copyright 2024 © Shoehub. All rights reserved. Powered by Harsh.",

  features: [
    {
      icon: TbShoe,
      desc: "Everyday fresh products",
    },
    {
      icon: TbTruckDelivery,
      desc: "Free delivery for order over $70",
    },
    {
      icon: LuBadgePercent,
      desc: "Daily Mega Discounts",
    },
    {
      icon: HiOutlineCurrencyRupee,
      desc: "Best price on the market",
    },
  ],

  social: [
    {
      icon: FaXTwitter,
      url: "#",
    },
    {
      icon: FaInstagram,
      url: "#",
    },
    {
      icon: FaFacebookF,
      url: "#",
    },
  ],

  policies: [
    {
      name: "Privacy Policy",
      url: "#",
    },
    {
      name: "Terms and Conditions",
      url: "#",
    },
    {
      name: "Cookie",
      url: "#",
    },
  ],

  navigations: [
    {
      icon: IoHomeOutline,
      url: "/",
    },
    {
      icon: SlHandbag,
      url: "/cart",
    },
    {
      icon: RiSearch2Line,
      url: "/search",
    },
    {
      icon: AiOutlineHeart,
      url: "/wishlist",
    },
    {
      icon: AiOutlineUser,
      url: "/my-account/dashboard",
    },
  ],
};
