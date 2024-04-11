const fs = require("fs");
const path = require("path");

class UpdateDeploymentDatePlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync("UpdateDeploymentDatePlugin", (compilation, callback) => {
      const htmlFilePath = path.join(compilation.outputOptions.path, "index.html");
      fs.readFile(htmlFilePath, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          callback();
          return;
        }

        const author = "uzitrake";

        const currentDate = new Date().toUTCString();
        const deploymentDateCommentRegex = /<!--\s*Hypercritical Last Published: .* -->\n?/;
        const deploymentDateComment = `<!-- Hypercritical Last Published: ${currentDate} by ${author} -->\n`;

        if (deploymentDateCommentRegex.test(data)) {
          const updatedData = data.replace(deploymentDateCommentRegex, deploymentDateComment);
          fs.writeFile(htmlFilePath, updatedData, "utf8", (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("Deployment date updated successfully.");
            }
            callback();
          });
        } else {
          const updatedData = deploymentDateComment + data;

          fs.writeFile(htmlFilePath, updatedData, "utf8", (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("Deployment date added newly.");
            }
            callback();
          });
        }
      });
    });
  }
}

module.exports = UpdateDeploymentDatePlugin;
