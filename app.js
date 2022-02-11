//jshint esversion:6
const express = require("express");
const app = express();
const morgan = require("morgan");
const config = require("./utils/config");
const Database = require("./utils/database");
const cors = require("cors");
const path = require("path");

new Database().postgresql().checkConnection();
// import dotenv only in evelopment server
if (app.get("env") === "development") require("dotenv").config();
// handles public assets
app.use(express.static(path.resolve("public")));
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/orders", (req, res) => {
  res.render("orders");
});
app.get("/products", (req, res) => {
  res.render("products");
});
app.get("/customers", (req, res) => {
  res.render("customers");
});
app.get("/settings", (req, res) => {
  res.render("settings");
});
app.get("/supports", (req, res) => {
  res.render("supports");
});
app.get("/integration", (req, res) => {
  res.render("integration");
});
app.get("/customer-details", (req, res) => {
  res.render("customer-details");
});
app.get("/user-profile", (req, res) => {
  res.render("user-profile");
});
app.get("/product-details", (req, res) => {
  res.render("product-details");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/signin", (req, res) => {
  res.render("signin");
});
app.get("/reset_password", (req, res) => {
  res.render("reset_password");
});

app.use(express.json());
app.use(morgan("dev"));
/* allow cross origin requests from all origins */
app.use(cors());
// routes component
const route = (moduleName) => require(`./modules/${moduleName}/routes`);

// api version
const version = "/api/v1";
// routes -> for the modules
// app.use("/", route("sample"));
// app.use(version, route("sample"));
// app.use(version, route("user"));
// app.use(version, route("profile"));
// app.use(version, route("admin"));

// error handlers
const { notFoundErrorHandler, serverErrorHandler } = require("./utils/helper");
app.use(serverErrorHandler);
app.use(notFoundErrorHandler);

app.set("port", config.port);

app.listen(app.get("port"), (_) =>
  console.log(`app running on port ${app.get("port")}`)
);
