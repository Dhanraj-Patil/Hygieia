const { Package } = require("../config/mongo");

const create = async (package) => {
  try {
    const newPackage = new Package(package);
    await newPackage.save();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const updateBy = async (expertId, packageName, package) => {
  try {
    await Package.findOneAndUpdate(
      { expertId: expertId, packageName: packageName },
      package,
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getOnePackageBy = async (expertId, packageName) => {
  try {
    return await Package.findOne({
      expertId: expertId,
      packageName: packageName,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getPackagesBy = async (expertId) => {
  try {
    return await Package.find({ expertId: expertId });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const deletePackageBy = async (expertId, packageName) => {
  try {
    await Package.findOneAndDelete({
      expertId: expertId,
      packageName: packageName,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  create,
  updateBy,
  getPackagesBy,
  deletePackageBy,
  getOnePackageBy,
};
