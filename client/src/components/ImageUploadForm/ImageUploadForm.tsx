import React, { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { getOrientation } from 'get-orientation/browser';
import {
  Paper, InputBase, IconButton, Button, Typography,
} from '@material-ui/core';
import { FaImage, FaCamera } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import { useDropzone } from 'react-dropzone';
import { getRotatedImage } from './RotateImage';
import { ImageUploadFormStyle } from './style';

interface Props {
  onSelectFile?: any;
}

const ORIENTATION_TO_ANGLE: any = {
  3: 180,
  6: 90,
  8: -90,
};

const MIN_HEIGHT = 800;
const MIN_WIDTH = 640;
const MAX_SIZE = 25 * (1024 * 1024);

export const ImageUploadForm: React.FC = () => {
  const classes = ImageUploadFormStyle();
  const { formatMessage } = useIntl();
  const [crop, setCrop] = useState<any>({ x: 0, y: 0 });
  const [cropAreaPixels, setCropAreaPixels] = useState<any>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [aspect, setAspect] = useState<number>(4 / 5);
  const [fileData, setFileData] = useState<any>({});
  const [imageSrc, setImageSrc] = useState<string>();

  const onCropChange = (croppedArea: any) => {
    setCrop(croppedArea);
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea, croppedAreaPixels);
    setCropAreaPixels(croppedAreaPixels);
  };

  const onZoomChange = (newZoom: any) => {
    setZoom(newZoom);
  };

  const onMediaLoaded = (mediaSize: any) => {
    // Adapt zoom based on media size to fit max height
    onZoomChange(800 / mediaSize.naturalHeight);
  };

  const getImageDimensions = async (file: any): Promise<any> => {
    const promise: Promise<any> = new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => {
        resolve({ width: image.width, height: image.height });
      });
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
      image.src = URL.createObjectURL(file);
    });

    return promise;
  };

  const readFile = async (file: any): Promise<string> => new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result as string), false);
    reader.readAsDataURL(file);
  });

  const onFileChange = useCallback(async (file: any) => {
    if (file) {
      let imageDataUrl: string = await readFile(file);

      // Apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setFileData({ name: file.name, path: file.path });
      setImageSrc(imageDataUrl);

      // Reset
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    }
  }, []);

  // File has been dropped
  const onDrop = useCallback(async (acceptedFiles: any) => {
    if (!acceptedFiles[0]) return false;

    const file = acceptedFiles[0];

    const dimensions = await getImageDimensions(file);
    if (dimensions.width > MIN_WIDTH && dimensions.height > MIN_HEIGHT) {
      onFileChange(file);
      return true;
    }

    return false;
  }, [onFileChange]);

  const {
    getRootProps, getInputProps, isDragActive, open,
  } = useDropzone({
    multiple: false,
    maxSize: MAX_SIZE,
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const urlToFile = (url: string): Promise<Blob> => {
    const response = fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new Blob([buf], { type: 'image/jpeg' }));

    return response;
  };

  const uploadImage = async () => {
    if (!imageSrc || !fileData) return;

    const file = await urlToFile(imageSrc);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', fileData.name);
    formData.append('path', fileData.path);
    formData.append('cropInfo', cropAreaPixels);

    // try {
    //   const response = await axios.post(
    //     '/upload',
    //     {
    //       crop: cropAreaPixels,
    //       file,
    //     },
    //     {
    //       headers: {
    //         contentType: 'multipart/form-data',
    //       },
    //     },
    //   );
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Paper className={classes.root} component="form" elevation={0} square>
      {!imageSrc && (
        <div className={classes.dropArea} {...getRootProps()}>
          <input {...getInputProps()} />
          <>
            {isDragActive && (
              <Typography variant="h2" className={classes.dropMessage}>
                <span>{formatMessage({ id: 'Upload.dropImage' })}</span>
              </Typography>
            )}
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              endIcon={<FaImage size="60" />}
              onClick={open}
            >
              <div className={classes.buttonTextContainer}>
                {formatMessage(
                  { id: 'Upload.uploadFromGallery' },
                  {
                    b: (...chunks) => <b>{chunks}</b>,
                  },
                )}
              </div>
            </Button>
            <Button
              className={classes.button}
              color="secondary"
              variant="contained"
              endIcon={<FaCamera size="60" />}
            >
              <div className={classes.buttonTextContainer}>
                {formatMessage(
                  { id: 'Upload.captureFromCamera' },
                  { b: (...chunks) => <b>{chunks}</b> },
                )}
              </div>
            </Button>
          </>
        </div>
      )}
      {imageSrc && (
        <>
          <Button
            variant="contained"
            onClick={(): void => setImageSrc(undefined)}
          >
            Back
          </Button>
          <Button variant="contained" onClick={() => uploadImage()}>
            Crop
          </Button>
          <div className={classes.container}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              zoomSpeed={0.5}
              aspect={aspect}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChange}
              onMediaLoaded={onMediaLoaded}
            />
          </div>
        </>
      )}
    </Paper>
  );
};
