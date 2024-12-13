const PackageRepository = require("../repository/package");

const create = async (package) => {
  if (
    !(await PackageRepository.getOnePackageBy(
      package.expertId,
      package.packageName,
    ))
  ) {
    await PackageRepository.create(package);
  }
};

const getPackagesBy = async (expertId) => {
  return await PackageRepository.getPackagesBy(expertId);
};

const updateBy = async (expertId, packageName, packageUpdate) => {
  await PackageRepository.updateBy(expertId, packageName, packageUpdate);
};

const deleteBy = async (expertId, packageName) => {
  await PackageRepository.deletePackageBy(expertId, packageName);
};

module.exports = { create, getPackagesBy, updateBy, deleteBy };
