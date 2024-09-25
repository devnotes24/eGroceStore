const { connectCollegeDB, connectGlobalDB } = require('./db');

const multiTenantMiddleware = async (req, res, next) => {
  const collegeName = req.get('host').split('.')[0];

  try {
    // req.collegeDB = await connectCollegeDB(collegeName);
    req.globalDB = await connectGlobalDB();
  } catch (error) {
    console.error(
      `Failed to connect to the database}`,
      error,
    );
    if (error.message.includes('does not exist or is empty')) {
      return res
        .status(404)
        .send(`Database for college '${collegeName}' not found`);
    }
    return res.status(500).send(error.message);
  }

  next();
};
module.exports = multiTenantMiddleware;
