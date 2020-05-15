import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import path from 'path';
import app from '../../src/app';

chai.use(chaiHttp);
chai.should();

const uploadDir = path.join(__dirname, '../../upload');

describe('UploadHandler', () => {
  describe('Upload directory', () => {
    it('should exist', (done) => {
      fs.access(uploadDir, fs.constants.F_OK, (err: NodeJS.ErrnoException | null) => {
        (err === null).should.equal(true);
        done();
      });
    });

    it('should be readable', (done) => {
      fs.access(uploadDir, fs.constants.R_OK, (err: NodeJS.ErrnoException | null) => {
        (err === null).should.equal(true);
        done();
      });
    });

    it('should be writeable', (done) => {
      fs.access(uploadDir, fs.constants.W_OK, (err: NodeJS.ErrnoException | null) => {
        (err === null).should.equal(true);
        done();
      });
    });
  });

  it('should upload a photo', async () => {
    const photo = path.join(__dirname, '../assets/test.jpg');
    const response = await chai.request(app)
      .post('/api/v1/upload')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .attach('photo', fs.readFileSync(photo), 'test.jpg');

    response.status.should.equal(201);
    response.body.should.be.a('object');
    response.body.should.have.property('success');
    response.body.success.should.equal(true);
  });
});
