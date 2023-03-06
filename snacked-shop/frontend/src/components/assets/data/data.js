import { BsHandbag, BsQuestionDiamond } from "react-icons/bs"
import { GrFavorite, GrUser } from "react-icons/gr"
import { MdOutlineModeNight, MdSportsKabaddi } from "react-icons/md"
import { FaRegUser } from "react-icons/fa"
import { RiMenLine, RiWomenLine } from "react-icons/ri"
import { AiOutlineCrown, AiOutlineUser } from "react-icons/ai"
import { GiJewelCrown } from "react-icons/gi"

export const navList = [
  { id: 1, name: "home", path: "/" },
  { id: 2, name: "women", path: "/women" },
  { id: 3, name: "men", path: "/men" },
  { id: 4, name: "beauty", path: "/beauty" },
  { id: 5, name: "sport", path: "/sport" },
]
export const carts = [
  { img: "../images/product/p1.png", name: "Rey Nylon Backpack", size: "XL", Qty: 1, price: 74 },
  { img: "../images/product/p2.png", name: "Round Buckle 1 Belt", size: "XL", Qty: 1, price: 74 },
  { img: "../images/product/p3.png", name: "Waffle Knit Beanie", size: "XL", Qty: 1, price: 74 },
  { img: "../images/product/p1.png", name: "Waffle Knit Beanie", size: "XL", Qty: 1, price: 74 },
]
export const profile = [
  { icon: <FaRegUser size={17} />, name: "profile" },
  { icon: <BsHandbag size={17} />, name: "my order" },
  { icon: <GrFavorite size={17} />, name: "wishlist" },
  { icon: <MdOutlineModeNight size={17} />, name: "Dark" },
  { icon: <BsQuestionDiamond />, name: "help" },
]
export const hero = [
  { id: 1, title: "Exclusive collection for everyone", desc: "In this season, find the best 🔥", image: "../images/home/h1.png" },
  { id: 2, title: "Exclusive collection for everyone", desc: "In this season, find the best 🔥", image: "../images/home/h2.png" },
  { id: 3, title: "Exclusive collection for everyone", desc: "In this season, find the best 🔥", image: "../images/home/h1.png" },
]
export const discover = [
  { id: 1, title: "shop the latest from top brands", desc: "explore new arrivals", cover: "../images/discover/d1.png", bgcolor: "bgcolor1" },
  { id: 2, title: "give the gift of choice", desc: "digital gift cards", cover: "../images/discover/d2.png", bgcolor: "bgcolor2" },
  { id: 3, title: "up to 80% of retail", desc: "sale collection", cover: "../images/discover/d3.png", bgcolor: "bgcolor3" },
  { id: 4, title: "up to 80% of retail", desc: "sale collection", cover: "../images/discover/d4.png", bgcolor: "bgcolor4" },
]
export const newProduct = [
  {
    id: 1,
    title: "leather gloves",
    subtitle: "perfect mint green",
    price: 30,
    colors: [{ color: "#A78BFA" }, { color: "#FACC15" }, { color: "#FB923C" }, { color: "#38BDF8" }, { color: "#4ADE80" }, { color: "purple" }],
    sizes: [{ size: "xs" }, { size: "s" }, { size: "m" }, { size: "l" }, { size: "2xl" }],
    images: ["../images/product/p4.png", "../images/product/d1.jpg", "../images/product/d2.jpg", "../images/product/d3.jpg"],
    desc: "Fashion is a form of self-expression and autonomy at a particular period and place and in a specific context, of clothing, footwear, lifestyle, accessories, makeup, hairstyle, and body posture.",
    fetaures: [
      {
        text: "Material: 43% Sorona Yarn + 57% Stretch Polyester",
      },
      { text: "Casual pants waist with elastic elastic inside" },
      { text: "The pants are a bit tight so you always feel comfortable" },
      { text: "Excool technology application 4-way stretch" },
    ],
    details: [
      {
        para: "The patented eighteen-inch hardwood Arrowhead deck --- finely mortised in, makes this the strongest and most rigid canoe ever built. You cannot buy a canoe that will afford greater satisfaction.",
      },
      {
        para: "The St. Louis Meramec Canoe Company was founded by Alfred Wickett in 1922. Wickett had previously worked for the Old Town Canoe Co from 1900 to 1914. Manufacturing of the classic wooden canoes in Valley Park, Missouri ceased in 1978.",
      },
    ],
    detail: [
      {
        text: "Regular fit, mid-weight t-shirt",
      },
      { text: "Natural color, 100% premium combed organic cotton" },
      { text: "Quality cotton grown without the use of herbicides or pesticides - GOTS certified" },
      { text: "Soft touch water based printed in the USA" },
    ],
    reviews: [
      {
        users: [{ image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png", name: "Cody Fisher", data: "May 20,2022" }],
        desc: "Very nice feeling sweater. I like it better than a regular hoody because it is tailored to be a slimmer fit. Perfect for going out when you want to stay comfy. The head opening is a little tight which makes it a little.",
      },
      {
        users: [{ image: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png", name: "Stiven hokinhs", data: "Jun 20,2022" }],
        desc: "I love the charcoal heavyweight hoodie. Still looks new after plenty of washes. If you’re unsure which hoodie to pick.",
      },
      {
        users: [{ image: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png", name: "Gropishat keo", data: "Aug 30,2022" }],
        desc: "The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie. Now that it’s colder, my husband wears his all the time. I wear hoodies all the time.",
      },
      {
        users: [{ image: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png", name: "Dahon Stiven", data: "Dece 30,2022" }],
        desc: "Before buying this, I didn't really know how I would tell a high quality sweatshirt, but after opening, I was very impressed. The material is super soft and comfortable and the sweatshirt also has a good weight to it.",
      },
    ],
  },
  {
    id: 2,
    title: "manhattan toy WRT",
    subtitle: "new design 2023",
    price: 40,
    colors: [{ color: "#A78BFA" }, { color: "#FACC15" }, { color: "#FB923C" }, { color: "#38BDF8" }, { color: "#4ADE80" }, { color: "purple" }],
    sizes: [{ size: "xs" }, { size: "s" }, { size: "m" }, { size: "l" }, { size: "2xl" }],
    images: ["../images/product/p5.png", "../images/product/d1.jpg", "../images/product/d2.jpg", "../images/product/d3.jpg"],
    desc: "Fashion is a form of self-expression and autonomy at a particular period and place and in a specific context, of clothing, footwear, lifestyle, accessories, makeup, hairstyle, and body posture.",
    fetaures: [
      {
        text: "Material: 43% Sorona Yarn + 57% Stretch Polyester",
      },
      { text: "Casual pants waist with elastic elastic inside" },
      { text: "The pants are a bit tight so you always feel comfortable" },
      { text: "Excool technology application 4-way stretch" },
    ],
    details: [
      {
        para: "The patented eighteen-inch hardwood Arrowhead deck --- finely mortised in, makes this the strongest and most rigid canoe ever built. You cannot buy a canoe that will afford greater satisfaction.",
      },
      {
        para: "The St. Louis Meramec Canoe Company was founded by Alfred Wickett in 1922. Wickett had previously worked for the Old Town Canoe Co from 1900 to 1914. Manufacturing of the classic wooden canoes in Valley Park, Missouri ceased in 1978.",
      },
    ],
    detail: [
      {
        text: "Regular fit, mid-weight t-shirt",
      },
      { text: "Natural color, 100% premium combed organic cotton" },
      { text: "Quality cotton grown without the use of herbicides or pesticides - GOTS certified" },
      { text: "Soft touch water based printed in the USA" },
    ],
    reviews: [
      {
        users: [{ image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png", name: "Cody Fisher", data: "May 20,2022" }],
        desc: "Very nice feeling sweater. I like it better than a regular hoody because it is tailored to be a slimmer fit. Perfect for going out when you want to stay comfy. The head opening is a little tight which makes it a little.",
      },
      {
        users: [{ image: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png", name: "Stiven hokinhs", data: "Jun 20,2022" }],
        desc: "I love the charcoal heavyweight hoodie. Still looks new after plenty of washes. If you’re unsure which hoodie to pick.",
      },
      {
        users: [{ image: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png", name: "Gropishat keo", data: "Aug 30,2022" }],
        desc: "The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie. Now that it’s colder, my husband wears his all the time. I wear hoodies all the time.",
      },
      {
        users: [{ image: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png", name: "Dahon Stiven", data: "Dece 30,2022" }],
        desc: "Before buying this, I didn't really know how I would tell a high quality sweatshirt, but after opening, I was very impressed. The material is super soft and comfortable and the sweatshirt also has a good weight to it.",
      },
    ],
  },
  {
    id: 3,
    title: "ella leather tote",
    subtitle: "cream pink",
    price: 140,
    discount: 50,
    colors: [{ color: "#A78BFA" }, { color: "#FACC15" }, { color: "#FB923C" }, { color: "#38BDF8" }, { color: "#4ADE80" }, { color: "purple" }],
    sizes: [{ size: "xs" }, { size: "s" }, { size: "m" }, { size: "l" }, { size: "2xl" }],
    images: ["../images/product/p6.png", "../images/product/d1.jpg", "../images/product/d2.jpg", "../images/product/d3.jpg"],
    desc: "Fashion is a form of self-expression and autonomy at a particular period and place and in a specific context, of clothing, footwear, lifestyle, accessories, makeup, hairstyle, and body posture.",
    fetaures: [
      {
        text: "Material: 43% Sorona Yarn + 57% Stretch Polyester",
      },
      { text: "Casual pants waist with elastic elastic inside" },
      { text: "The pants are a bit tight so you always feel comfortable" },
      { text: "Excool technology application 4-way stretch" },
    ],
    details: [
      {
        para: "The patented eighteen-inch hardwood Arrowhead deck --- finely mortised in, makes this the strongest and most rigid canoe ever built. You cannot buy a canoe that will afford greater satisfaction.",
      },
      {
        para: "The St. Louis Meramec Canoe Company was founded by Alfred Wickett in 1922. Wickett had previously worked for the Old Town Canoe Co from 1900 to 1914. Manufacturing of the classic wooden canoes in Valley Park, Missouri ceased in 1978.",
      },
    ],
    detail: [
      {
        text: "Regular fit, mid-weight t-shirt",
      },
      { text: "Natural color, 100% premium combed organic cotton" },
      { text: "Quality cotton grown without the use of herbicides or pesticides - GOTS certified" },
      { text: "Soft touch water based printed in the USA" },
    ],
    reviews: [
      {
        users: [{ image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png", name: "Cody Fisher", data: "May 20,2022" }],
        desc: "Very nice feeling sweater. I like it better than a regular hoody because it is tailored to be a slimmer fit. Perfect for going out when you want to stay comfy. The head opening is a little tight which makes it a little.",
      },
      {
        users: [{ image: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png", name: "Stiven hokinhs", data: "Jun 20,2022" }],
        desc: "I love the charcoal heavyweight hoodie. Still looks new after plenty of washes. If you’re unsure which hoodie to pick.",
      },
      {
        users: [{ image: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png", name: "Gropishat keo", data: "Aug 30,2022" }],
        desc: "The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie. Now that it’s colder, my husband wears his all the time. I wear hoodies all the time.",
      },
      {
        users: [{ image: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png", name: "Dahon Stiven", data: "Dece 30,2022" }],
        desc: "Before buying this, I didn't really know how I would tell a high quality sweatshirt, but after opening, I was very impressed. The material is super soft and comfortable and the sweatshirt also has a good weight to it.",
      },
    ],
  },
  {
    id: 4,
    title: "jump rope kids",
    subtitle: "classic green",
    price: 68,
    discount: 50,
    colors: [{ color: "#A78BFA" }, { color: "#FACC15" }, { color: "#FB923C" }, { color: "#38BDF8" }, { color: "#4ADE80" }, { color: "purple" }],
    sizes: [{ size: "xs" }, { size: "s" }, { size: "m" }, { size: "l" }, { size: "2xl" }],
    images: ["../images/product/p7.png", "../images/product/d1.jpg", "../images/product/d2.jpg", "../images/product/d3.jpg"],
    desc: "Fashion is a form of self-expression and autonomy at a particular period and place and in a specific context, of clothing, footwear, lifestyle, accessories, makeup, hairstyle, and body posture.",
    fetaures: [
      {
        text: "Material: 43% Sorona Yarn + 57% Stretch Polyester",
      },
      { text: "Casual pants waist with elastic elastic inside" },
      { text: "The pants are a bit tight so you always feel comfortable" },
      { text: "Excool technology application 4-way stretch" },
    ],
    details: [
      {
        para: "The patented eighteen-inch hardwood Arrowhead deck --- finely mortised in, makes this the strongest and most rigid canoe ever built. You cannot buy a canoe that will afford greater satisfaction.",
      },
      {
        para: "The St. Louis Meramec Canoe Company was founded by Alfred Wickett in 1922. Wickett had previously worked for the Old Town Canoe Co from 1900 to 1914. Manufacturing of the classic wooden canoes in Valley Park, Missouri ceased in 1978.",
      },
    ],
    detail: [
      {
        text: "Regular fit, mid-weight t-shirt",
      },
      { text: "Natural color, 100% premium combed organic cotton" },
      { text: "Quality cotton grown without the use of herbicides or pesticides - GOTS certified" },
      { text: "Soft touch water based printed in the USA" },
    ],
    reviews: [
      {
        users: [{ image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png", name: "Cody Fisher", data: "May 20,2022" }],
        desc: "Very nice feeling sweater. I like it better than a regular hoody because it is tailored to be a slimmer fit. Perfect for going out when you want to stay comfy. The head opening is a little tight which makes it a little.",
      },
      {
        users: [{ image: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png", name: "Stiven hokinhs", data: "Jun 20,2022" }],
        desc: "I love the charcoal heavyweight hoodie. Still looks new after plenty of washes. If you’re unsure which hoodie to pick.",
      },
      {
        users: [{ image: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png", name: "Gropishat keo", data: "Aug 30,2022" }],
        desc: "The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie. Now that it’s colder, my husband wears his all the time. I wear hoodies all the time.",
      },
      {
        users: [{ image: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png", name: "Dahon Stiven", data: "Dece 30,2022" }],
        desc: "Before buying this, I didn't really know how I would tell a high quality sweatshirt, but after opening, I was very impressed. The material is super soft and comfortable and the sweatshirt also has a good weight to it.",
      },
    ],
  },
]
export const steps = [
  { id: 1, cover: "../images/steps/s1.png", title: "Filter & Discover", desc: "Smart filtering and suggestions make it easy to find" },
  { id: 2, cover: "../images/steps/s2.png", title: "Add to bag", desc: "Easily select the correct items and add them to the cart" },
  { id: 3, cover: "../images/steps/s3.png", title: "Fast shipping", desc: "The carrier will confirm and ship quickly to you" },
  { id: 4, cover: "../images/steps/s4.png", title: "Enjoy the product", desc: "Have fun and enjoy your 5-star quality products" },
]
export const explore = [
  {
    id: 1,
    catgeory: "women",
    icon: <RiWomenLine size={16} />,
    totalProduct: 203,
    images: "../images/explore/e1.png",
    cover: "../images/explore/e1.svg",
    desc: "manufactuara",
    title: "backpack",
  },
  {
    id: 2,
    catgeory: "men",
    icon: <RiMenLine size={16} />,
    totalProduct: 203,
    images: "../images/explore/e2.png",
    cover: "../images/explore/e2.svg",
    desc: "manufactuara",
    title: "shoes",
  },
  {
    id: 3,
    catgeory: "kids",
    icon: <AiOutlineUser size={16} />,
    totalProduct: 203,
    images: "../images/explore/e3.png",
    cover: "../images/explore/e3.svg",
    desc: "manufactuara",
    title: "recycled blanket",
  },
  {
    id: 4,
    catgeory: "sports",
    icon: <MdSportsKabaddi size={16} />,
    totalProduct: 203,
    images: "../images/explore/e3.png",
    cover: "../images/explore/e4.svg",
    desc: "manufactuara",
    title: "cycling shorts",
  },
  {
    id: 5,
    catgeory: "beauty",
    icon: <AiOutlineCrown size={16} />,
    totalProduct: 112,
    images: "../images/explore/e5.png",
    cover: "../images/explore/e5.svg",
    desc: "manufactuara",
    title: "cycling jersey",
  },
  {
    id: 6,
    catgeory: "jewelry",
    icon: <GiJewelCrown size={16} />,
    totalProduct: 199,
    images: "../images/explore/e6.png",
    cover: "../images/explore/e6.svg",
    desc: "manufactuara",
    title: "car coat",
  },
]
export const footer = [
  {
    title: "Getting started",
    content: ["Release Notes", "Upgrade Guide", "Browser Support", "Dark Mode"],
  },
  {
    title: "Explore",
    content: ["Prototyping", "Design systems", "Pricing", "Security"],
  },
  {
    title: "Resources",
    content: ["Best practices", "Support", "Developers", "Learn design"],
  },
  {
    title: "Community",
    content: ["Discussion Forums", "Contributing", "API Reference", "Code  of Conduct"],
  },
]
