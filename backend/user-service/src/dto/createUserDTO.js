class CreateUserDTO {
  firstNname;
  middleName;
  lastName;
  dob;
  gender;
  email;
  prefix;
  phone;
  country;
  state;
  languages;

  constructor(data) {
    Object.assign(this, data);
  }
}

module.exports = CreateUserDTO;
