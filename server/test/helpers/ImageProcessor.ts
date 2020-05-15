import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';
import * as ImageProcessor from '../../src/helpers/ImageProcessor';
import * as config from '../../config/app.json';

chai.use(chaiAsPromised);
chai.should();

const photoFileName = 'test';
const photoDir = path.join(__dirname, '../assets/');
const photoPath = path.join(photoDir, `${photoFileName}.jpg`);
const uploadDir = path.join(photoDir, '../upload');
const { saveFormat } = config.uploads;
const cropOptions = {
  saveFormat,
  width: 557,
  height: 800,
  top: 300,
  left: 500,
};

describe('ImageProcessor', () => {
  describe('getImageMetadata', () => {
    it('should get image metadata', (done) => {
      const metadata = ImageProcessor.getImageMetadata(photoPath);

      // Promise should resolve
      metadata.should.be.fulfilled.then((res) => {
        res.should.be.a('object');
        res.should.have.property('format');
        res.should.have.property('width');
        res.should.have.property('height');
        res.should.have.property('space');
        res.should.have.property('channels');
        res.should.have.property('depth');
        res.should.have.property('density');
        res.should.have.property('chromaSubsampling');
        res.should.have.property('isProgressive');
        res.should.have.property('hasProfile');
        res.should.have.property('hasAlpha');
      }).should.notify(done);
    });
  });

  describe('resizeMultiple', () => {
    it('should resize an image to multiple sizes', (done) => {
      const resizeList = config.uploads.resize.map(({ width, height }) => ({
        saveFormat,
        width,
        height,
        outPath: path.join(
          uploadDir,
          `${width}x${height}_${photoFileName}.${saveFormat}`,
        ),
      }));
      const resized = Promise.all(ImageProcessor.resizeMultiple(photoPath, resizeList));

      resized.should.be.fulfilled.and.notify(done);
    });
  });

  describe('cropImage', () => {
    it('should crop an image', (done) => {
      const cropped = ImageProcessor.cropImage(
        photoPath,
        cropOptions,
        path.join(uploadDir, `cropped_${photoFileName}.${saveFormat}`),
      );

      cropped.should.be.fulfilled.and.notify(done);
    });
  });
});
