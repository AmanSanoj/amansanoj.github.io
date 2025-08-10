const fs = require("fs");
const path = require("path");

const certDir = path.join(__dirname, "assets", "certificates");
const outputFile = path.join(certDir, "certificates.json");

// Acceptable extensions
const exts = [".png", ".jpg", ".jpeg"];

const certs = fs.readdirSync(certDir)
  .filter(file => exts.includes(path.extname(file).toLowerCase()))
  .sort((a, b) => {
    const parseDate = str => {
      const name = str.split(".")[0]; // remove extension
      const datePart = name.slice(0, 8); // DDMMYYYY
      const d = parseInt(datePart.slice(0, 2), 10);
      const m = parseInt(datePart.slice(2, 4), 10);
      const y = parseInt(datePart.slice(4, 8), 10);
      return new Date(y, m - 1, d);
    };

    const dateDiff = parseDate(b) - parseDate(a);
    if (dateDiff !== 0) return dateDiff;

    // Same date → fallback alphabetical sort
    return a.localeCompare(b);
  });

fs.writeFileSync(outputFile, JSON.stringify(certs, null, 2));
console.log(`Generated certificates.json with ${certs.length} files.`);