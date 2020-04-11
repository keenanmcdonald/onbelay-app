const FileService = {
    readFile(file){
        return new Promise((resolve, reject) => {
            let fr = new FileReader()
            fr.onload = () => {
                resolve(fr.result)
            }
            fr.readAsDataURL(file)
        })
    },
    blobToFile(theBlob, fileName){
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    },
}

export default FileService