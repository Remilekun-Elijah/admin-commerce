// jshint esversion:8
const path = require("path");
fs = require("fs").promises;
const { deleteFileFrom, getFileSize } = require(path.resolve("utils/helper"));
const helper = require(path.resolve("utils/helper"));

module.exports = function(uploadedFiles, expectedFileTypes, fileSize) {
    try {
        let img = [],
            pdfs = [],
            mp4 = [],
            mp3 = [],
            fileType = [],
            zips = [],
            docs = [],
            others = [],
            err = {},
            srts = [],
            xlsx = [],
            bin = [];

        const init = () => {

            /** Check if no file was uploaded **/
            if (uploadedFiles == undefined || uploadedFiles.length == 0) {
                /** Populate the error array with a message **/
                err.type = "EMPTY_FILE";
                err.message = "Error: You must upload a file";
            } else {

                /** find expected file in uploaded file **/
                uploadedFiles.find((file, uploadedFileindex) => {

                    /* gets the file type */
                    const type = path.extname(file.originalname).slice(1);

                    /* sets the file name */
                    if (type == "png" || type == "jpg" || type == "jpeg") file.type = "img";
                    else file.type = type;

                    getFileSize({ bytes: fileSize, previewInConsole: true });
                    getFileSize({ bytes: file.size, previewInConsole: true });
                    if (fileSize < file.size) {

                        err.type = "UNACCCEPTABLE_FILE_SIZE";
                        err.message = "Error: file is too large.";
                        helper.deleteFileFrom(file.path, () => console.log("file deleted"));
                    }

                    /** Check if uploaded file matches expectcted file **/
                    else if (expectedFileTypes.indexOf(file.type) != -1) {
                        /** Populate the fileType array with the uploaded file type **/
                        fileType.push(file.type);

                        /** check the uploaded file type and then split *
                         the file(s) in their respective array **/
                        switch (file.type) {
                            case 'pdf':
                                pdfs.push(file);
                                break;
                            case 'mp4':
                                mp4.push(file);
                                break;
                            case 'mp3':
                                mp3.push(file);
                                break;
                            case 'zip':
                                zips.push(file);
                                break;
                            case 'docx':
                                docs.push(file);
                                break;
                            case 'srt':
                                srts.push(file);
                                break;
                            case 'xlsx':
                                xlsx.push(file);
                                break;
                            case 'img':
                                img.push(file);
                                break;
                                /** Populate the error array with a message if 
                                 the uploaded file isnt supported by this module **/
                            default:
                                err.type = "UNSUPPORTED_FILE";
                                err.message = `${uploadedFiles[uploadedFileindex].type} file is not supported`;

                                /** If file exist in the temp folder, push it to the bin array**/
                                bin.push(file);
                                break;
                        }
                        /** Populate the others array with the uploaded file **/
                        if (file.type !== 'img') others.push(file);
                    } else {

                        /** Populate the error array with a message **/
                        err.type = "UNACCEPTABLE_FILE";
                        err.message = `${file.type} file is not acceptable`;

                        /** If file exist in the temp folder, push it to the bin array **/
                        if (file.path) bin.push(file);
                    }

                });

                /** If the bin is not empty **/
                if (bin.length != 0) {
                    /** Loop through it **/
                    bin.forEach(files => {
                        /** Read the files in it **/
                        fs.readFile(files.path).then(file => {
                            /** Check if its there **/
                            if (file) {
                                /** Then delete it **/
                                deleteFileFrom(files.path, () => console.log("file deleted"));
                            }
                        }).catch(e => console.log("file not deleted because", e.message));
                    });
                }
            }

        };
        /** call the file processing function **/
        init();

        getTypes = () => {
            /**
             * PS: This returns the uploaded file(s) type(s) in our fileType array
             * only if it matches our expected file 
             * else it returns an empty array **/
            return fileType;
        };

        /**
         * @param {Array} Array - Array of files 
         * @returns {Object} Object containing path and name of the file and lastly the file itself as an object of a single file or an array of the amount of the files uploaded
         */
        const file = arr => {
            /** Return the first data of the passed array i.e the first file 
             * with the path, filename and the file itself *Ref Multer req.file object **/
            return {
                path: arr[0] ? arr[0].path : undefined,
                name: arr[0] ? arr[0].filename : undefined,
                file: arr
            };
        };

        const image = () => file(img);

        const docx = () => file(docs);

        const video = () => file(mp4);

        const audio = () => file(mp3);

        const pdf = () => file(pdfs);

        const zip = () => file(zips);

        const srt = () => file(srts);

        const excel = () => file(xlsx);

        const other = () => file(others);

        /** This data returns true if only the file we are expecting is what was uploaded **/
        const exist = () => getTypes().length > 0 ? true : false;
        /** returns the err object **/
        const error = () => err;

        return { getTypes, image, docx, zip, video, audio, other, exist, excel, srt, pdf, error };
    } catch (e) {
        console.log(e);
    }
};