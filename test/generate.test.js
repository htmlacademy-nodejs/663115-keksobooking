'use strict';

const assert = require(`assert`);
const fs = require(`fs`);
const {generate} = require(`../src/commands/generate`);

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

describe(`Generate JSON command`, function () {
  it(`should fail on non existing folder`, function (done) {
    const entitiesCount = 1;
    const tempFileName = `${__dirname}/folder/testfile.json`;
    generate(entitiesCount, tempFileName)
      .then(() => assert.fail(`Path ${tempFileName} should not be available`))
      .catch(() => done());
  });

  it(`should create new file`, function (done) {
    const entitiesCount = 1;
    const tempFileName = `${__dirname}/testfile.json`;
    generate(entitiesCount, tempFileName)
      .then(() => {
        return checkAndDelete(tempFileName, done);
      })
      .catch((error) => assert.fail(error));
  });
});
