exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("profiles")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("profiles").insert([
        {
          sid: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
          full_name: "Remilekun Elijah",
          display_name: "Remilekun Jnr",
          email: "Remilekunelijah21997@gmail.com",
          number: "+2347048322031",
          dob: "13/04/1997",
          address:
            '[{"street": "14 ademola oshinowo ikosi ketu", "state": "Lagos", "country": "Nigeria"}, {"street": "196B ajsoe adeogun VI", "state": "Lagos", "country": "Nigeria"}]',
        },
      ]);
    });
};
