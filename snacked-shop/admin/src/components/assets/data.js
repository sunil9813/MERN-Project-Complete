import { AiFillFileText, AiFillHome, AiFillWechat, AiTwotoneSetting } from "react-icons/ai"
import { BsFillDropletFill, BsFillBasket2Fill, BsTrophyFill, BsFillCreditCard2FrontFill, BsBookHalf, BsFillCalendarCheckFill, BsFillBasket3Fill } from "react-icons/bs"
import { IoBagAddSharp } from "react-icons/io5"
import { CgProfile } from "react-icons/cg"
import { BiCategoryAlt, BiMap } from "react-icons/bi"
import { MdDashboard, MdLocalShipping, MdOutlineModeNight } from "react-icons/md"
import { HiCurrencyDollar, HiUsers } from "react-icons/hi"
import { FaCloudDownloadAlt, FaPhotoVideo, FaRegUserCircle, FaUserAlt, FaUserEdit, FaUserInjured, FaUsers } from "react-icons/fa"

export const sideNav = [
  {
    icon: <AiFillHome />,
    path: "/dashboard",
    link: "home",
  },
  {
    icon: <BsFillDropletFill />,
    path: "/widgets",
    link: "Widgets",
  },
  {
    icon: <BsFillBasket2Fill />,
    link: "Product",
    childrens: [
      {
        icon: <BsFillBasket3Fill />,
        path: "/admin/products",
        link: "All Product",
      },
      {
        icon: <BsFillBasket2Fill />,
        path: "/product",
        link: "Product List",
      },
      {
        icon: <IoBagAddSharp />,
        path: "/newProduct",
        link: "Add Product",
      },
    ],
  },
  {
    icon: <BiCategoryAlt />,
    path: "/categories",
    link: "Categories",
  },
  {
    icon: <MdLocalShipping />,
    path: "/order",
    link: "Order",
  },
  {
    icon: <FaUserInjured />,
    link: "User",
    childrens: [
      {
        icon: <FaUsers />,
        path: "/admin/getalluser",
        link: "All User",
      },
      {
        icon: <CgProfile />,
        path: "/profile",
        link: "User Profile",
      },
      {
        icon: <FaUserEdit />,
        path: "/edit-profile",
        link: "Edit Profile",
      },
    ],
  },
]

export const widget = [
  {
    id: 1,
    icon: <BsFillBasket2Fill />,
    name: "Orders",
    link: "orders",
    class: "widget-1",
  },
  {
    id: 2,
    icon: <HiUsers />,
    name: "Users",
    link: "users",
    class: "widget-2",
  },
  {
    id: 3,
    icon: <BsTrophyFill />,
    name: "Products",
    link: "products",
    class: "widget-3",
  },
  {
    id: 4,
    icon: <FaPhotoVideo />,
    name: "Media",
    link: "media",
    class: "widget-4",
  },
  {
    id: 5,
    icon: <FaRegUserCircle />,
    name: "Account",
    link: "account",
    class: "widget-5",
  },
  {
    id: 6,
    icon: <AiFillFileText />,
    name: "Docs",
    link: "docs",
    class: "widget-6",
  },
  {
    id: 7,
    icon: <BsFillCreditCard2FrontFill />,
    name: "Payment",
    link: "payment",
    class: "widget-7",
  },
  {
    id: 8,
    icon: <BsFillCalendarCheckFill />,
    name: "Events",
    link: "events",
    class: "widget-8",
  },
  {
    id: 9,
    icon: <BsBookHalf />,
    name: "Story",
    link: "story",
    class: "widget-9",
  },
]
export const chat = [
  {
    name: "Amelia joly",
    desc: "Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.",
    profile: "./images/hchat/avatar-1.png",
    time: "1 m",
  },
  {
    name: "Althea Cabardo ",
    desc: "Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.",
    profile: "./images/hchat/avatar-2.png",
    time: "7 m",
  },
  {
    name: "Katherine Pechon",
    desc: "Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.",
    profile: "./images/hchat/avatar-3.png",
    time: "2 h",
  },
  {
    name: "Peter Costanzo ",
    desc: "Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.",
    profile: "./images/hchat/avatar-4.png",
    time: "3 h",
  },
  {
    name: "Thomas Wheeler",
    desc: "The standard chunk of lorem...",
    profile: "./images/hchat/avatar-5.png",
    time: "1 d",
  },
  {
    name: "Johnny Seitz",
    desc: "The standard chunk of lorem...",
    profile: "./images/hchat/avatar-6.png",
    time: "2 w",
  },
]
export const notification = [
  {
    name: "New Orders",
    desc: "The standard chunk of lorem...",
    icon: <BsFillBasket2Fill />,
    time: "1 m",
    class: "notif_1",
  },
  {
    name: "New Customer",
    desc: "The standard chunk of lorem...",
    icon: <FaRegUserCircle />,
    time: "7 m",
    class: "notif_2",
  },
  {
    name: "24 PDF File",
    desc: "The standard chunk of lorem...",
    icon: <AiFillFileText />,
    time: "2 h",
    class: "notif_3",
  },
  {
    name: "Time Response",
    desc: "The standard chunk  ",
    icon: <FaPhotoVideo />,
    time: "3 h",
    class: "notif_4",
  },
  {
    name: "New Product Approved",
    desc: "The standard chunk of lorem...",
    icon: <BiMap />,
    profile: "./images/hchat/avatar-5.png",
    time: "1 d",
    class: "notif_5",
  },
  {
    name: "New Comments",
    desc: "The standard chunk of lorem...",
    icon: <AiFillWechat />,
    time: "2 w",
    class: "notif_6",
  },
]
export const profiles = [
  {
    icon: <FaUserAlt />,
    name: "profile",
  },
  {
    icon: <AiTwotoneSetting />,
    name: "setting",
  },
  {
    icon: <MdDashboard />,
    name: "dashboard",
  },
  {
    icon: <HiCurrencyDollar />,
    name: "ernings",
  },
  {
    icon: <FaCloudDownloadAlt />,
    name: "download",
  },
  {
    icon: <MdOutlineModeNight />,
    name: "Dark",
  },
]
export const topNavLeftLink = [
  {
    name: "home",
    link: "/",
  },
  { name: "about", link: "about" },
  { name: "services", link: "services" },
  { name: "contact", link: "contact" },
]
export const product = [
  {
    id: 1,
    name: "Men White Polo T-shirt",
    images: "./images/product/p1.png",
    price: 18,
    date: "5-31-2022",
    status: "active",
  },
  {
    id: 2,
    name: "iPhone 11 - A24512",
    images: "./images/product/p2.png",
    price: 188,
    date: "5-31-2022",
    status: "pending",
  },
  {
    id: 3,
    name: "Formal Black Coat Pant",
    images: "./images/product/p3.png",
    price: 18,
    date: "5-31-2022",
    status: "complete",
  },
  {
    id: 4,
    name: "Blue Shade Jeans",
    images: "./images/product/p4.png",
    price: 18,
    date: "5-31-2022",
    status: "active",
  },
  {
    id: 5,
    name: "Yellow Winter Jacket for Men",
    images: "./images/product/p5.png",
    price: 18,
    date: "5-31-2022",
    status: "complete",
  },
  {
    id: 6,
    name: "Fancy Home Sofa",
    images: "./images/product/p6.png",
    price: 20,
    date: "5-31-2022",
    status: "active",
  },
  {
    id: 7,
    name: "Sports Time Watch ",
    images: "./images/product/p7.png",
    price: 30,
    date: "5-31-2022",
    status: "pending",
  },
  {
    id: 8,
    name: "Women Blue Heals",
    images: "./images/product/p8.png",
    price: 30,
    date: "5-31-2022",
    status: "pending",
  },
  {
    id: 9,
    name: "Men Sport Hat Nike",
    images: "./images/product/p9.png",
    price: 30,
    date: "5-31-2022",
    status: "pending",
  },
]
export const category = [
  {
    id: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem non necessitatibus laborum corrupti temporibus, omnis nostrum! Aliquid, iusto dignissimos provident fugiat harum labore atque corporis, possimus voluptates corrupti delectus quisquam.",
    name: "fashion",
    slug: "/fashion",
  },
  {
    id: 2,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem non necessitatibus laborum corrupti temporibus, omnis nostrum! Aliquid, iusto dignissimos provident fugiat harum labore atque corporis, possimus voluptates corrupti delectus quisquam.",
    name: "jeans",
    slug: "/jeans",
  },
  {
    id: 3,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem non necessitatibus laborum corrupti temporibus, omnis nostrum! Aliquid, iusto dignissimos provident fugiat harum labore atque corporis, possimus voluptates corrupti delectus quisquam.",
    name: "shoes",
    slug: "/shoes",
  },
  {
    id: 4,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem non necessitatibus laborum corrupti temporibus, omnis nostrum! Aliquid, iusto dignissimos provident fugiat harum labore atque corporis, possimus voluptates corrupti delectus quisquam.",
    name: "electronic",
    slug: "/electronic",
  },
  {
    id: 5,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem non necessitatibus laborum corrupti temporibus, omnis nostrum! Aliquid, iusto dignissimos provident fugiat harum labore atque corporis, possimus voluptates corrupti delectus quisquam.",
    name: "furniture",
    slug: "/furniture",
  },
  {
    id: 6,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem non necessitatibus laborum corrupti temporibus, omnis nostrum! Aliquid, iusto dignissimos provident fugiat harum labore atque corporis, possimus voluptates corrupti delectus quisquam.",
    name: "mobiles",
    slug: "/mobiles",
  },
  {
    id: 7,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem non necessitatibus laborum corrupti temporibus, omnis nostrum! Aliquid, iusto dignissimos provident fugiat harum labore atque corporis, possimus voluptates corrupti delectus quisquam.",
    name: "women",
    slug: "/women",
  },
  {
    id: 8,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem non necessitatibus laborum corrupti temporibus, omnis nostrum! Aliquid, iusto dignissimos provident fugiat harum labore atque corporis, possimus voluptates corrupti delectus quisquam.",
    name: "kids cloths",
    slug: "/kidcloths",
  },
  {
    id: 9,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem non necessitatibus laborum corrupti temporibus, omnis nostrum! Aliquid, iusto dignissimos provident fugiat harum labore atque corporis, possimus voluptates corrupti delectus quisquam.",
    name: "sport",
    slug: "/sport",
  },
]
