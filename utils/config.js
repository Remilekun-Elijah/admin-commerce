require("dotenv").config();

const environments = {};

module.exports = {
  port: process.env.PORT || 4000,
  host: `http://localhost:${process.env.PORT || 4000}/api/v1`,
  secret: "ZPUyxiyqGiYyXutHJfG3jTrpnDsh0XqK",
  application_name: "Eshop",

  // database details
  database: "eshop",
  database_user: "remilekunelijah",
  database_password: "09023007389",
  database_host: "localhost",
  database_port: 5432,

  mongodb_uri: process.env.mongodb_uri || "",

  googleSecret: process.env.googleSecret || "oYfcgXL6T3qx6FN6NwyPZu49",
  googleClientId:
    process.env.googleClientId ||
    "564502548161-hcu0gfkg1ailgv2aj44m0mvava9f7jln.apps.googleusercontent.com",
  googleRedirectUri:
    process.env.googleRedirectUri ||
    "http://localhost:3000/api/v1/google/callback",

  facebookSecret:
    process.env.facebookSecret || "2c175c8b0fe700a3fa7b18878cd8dbd3",
  facebookClientId: process.env.facebookClientId || "398196765245698",
  facebookRedirectUri:
    process.env.facebookRedirectUri ||
    "https://28c9-102-67-21-240.ngrok.io/facebook/callback",

  githubSecret:
    process.env.githubSecret || "3edecef08dc83bad0acd37476e82fc67de3240d2",
  githubClientId: process.env.githubClientId || "0d54e2af06ca11f24b3e",
  githubRedirectUri:
    process.env.githubRedirectUri || "http://localhost:3000/github/callback",

  linkedinSecret: process.env.linkedinSecret || "2eCvYEcWhKJvzTd8",
  linkedinClientId: process.env.linkedinClientId || "78r3v6035ajwhx",
  linkedinRedirectUri:
    process.env.linkedinRedirectUri ||
    "http://localhost:3000/linkedin/callback",
  COOKIE_SECRET: "ZPUyxiyqGiYyXutHJfG3jTrpnDsh0XqK",

  cloudinary_api_secret:
    process.env.cloudinary_api_secret || "CSTLasPM7kL5c2JQuoplitK65xI",
  cloudinary_cloud_name: process.cloudinary_cloud_name || "remilekunelijah",
  cloudinary_apiKey: process.env.cloudinary_apiKey || "467886654622314",

  gmailSecret: process.env.gmailSecret || "snxoicpuaiusfdad",
  gmailUser: "Remilekunelijah21997@gmail.com",

  paystack_secret: process.env.PAYSTACK_SECRET || "",
  mongodb_uri:
    "mongodb+srv://admin:UZjo2BMg27VxBEiK@order-me.wbpmr.mongodb.net/orderMe_v1?retryWrites=true&w=majority" ||
    "",
  local_mongodb_uri: "mongodb://127.0.0.1:27017/orderMe_v1",
};
// environments.production = {};
// module.exports =  environments.staging;
