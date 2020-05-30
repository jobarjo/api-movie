module.exports = ({ name, url }) => (req, res) => {
  res.charSet('utf-8');
  res.json({
    version: process.env.npm_package_version,
    server: { name, url },
  });
};
