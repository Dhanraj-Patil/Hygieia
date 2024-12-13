class CreateExpertDTO {
  firstName;
  middleName;
  lastName;
  bio;
  dob;
  email;
  gender;
  prefix;
  phone;
  country;
  state;
  languages;
  expertType;
  qualifications;
  certifications;
  workExp;
  workHistory;

  constructor(data) {
    Object.assign(this, data);
  }
}

module.exports = CreateExpertDTO;
