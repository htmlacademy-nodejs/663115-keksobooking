'use strict';

const assert = require(`assert`);
const fs = require(`fs`);
const generateCommand = require(`../src/commands/generate`);

const checkAndDelete = (file, cb) => {
  fs.access(file, (accessorError) => {
    if (accessorError) {
      return assert.fail(accessorError.message);
    }

    return fs.unlink(file, (unlinkError) => {
      if (unlinkError) {
        return assert.fail(unlinkError.message);
      }

      return cb();
    });
  });
};

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, `utf8`, (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(JSON.parse(data));
    });
  });
};

describe(`Generate JSON command`, function () {
  it(`should fail on non existing folder`, function (done) {
    const entitiesCount = 1;
    const tempFileName = `${__dirname}/folder/testfile.json`;
    generateCommand.execute(entitiesCount, tempFileName)
      .then(() => assert.fail(`Path ${tempFileName} should not be available`))
      .catch(() => done());
  });

  it(`should create new file`, function (done) {
    const entitiesCount = 1;
    const tempFileName = `${__dirname}/testfile.json`;
    generateCommand.execute(entitiesCount, tempFileName)
      .then(() => {
        return checkAndDelete(tempFileName, done);
      })
      .catch((error) => assert.fail(error));
  });

  it(`should rewrite file`, function (done) {
    const entitiesCount = 1;
    const tempFileName = `${__dirname}/testfile.json`;
    let firstContents = ``;
    generateCommand.execute(entitiesCount, tempFileName)
      .then(() => {
        return readFile(tempFileName);
      })
      .then((data) => {
        firstContents = data;
        return generateCommand.execute(entitiesCount, tempFileName);
      }).then(() => {
        return readFile(tempFileName);
      }).then((data) => {
        if (firstContents[0].offer.title === data[0].offer.title) {
          assert.fail(`data is equal`);
        }
        return done();
      })
      .catch((error) => assert.fail(error));
  });
});
