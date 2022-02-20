exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("permissions")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("permissions").insert({
        sid: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        name: "super_admin",
      });
    });
};
