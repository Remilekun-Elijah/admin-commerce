exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("accounts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("accounts").insert({
        id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        full_name: "Remilekun Elijah",
        email: "Remilekunelijah21997@gmail.com",
        password:
          "$2b$10$1EC6h5p3d5PlzmnRmiHuD.TJ6BgGmRN4uLS3IK7BZDpuq1.a256X.",
      });
    });
};
