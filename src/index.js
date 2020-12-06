const axios = require("axios").default;
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const PDFDocument = require('pdf-lib').PDFDocument;

const { cookie, indexId } = require("../data/config");
const assets = require("../data/assets.json");

const filesFolder = path.resolve(__dirname, "..", ".files");
if (!fs.existsSync(filesFolder)) fs.mkdirSync(filesFolder);

var items = {};
var parseChildren = (children) => {
    for (var c of children) {
        if (c.uri && c.playOrder) items[c.playOrder] = c.uri;
        if (c.children) parseChildren(c.children);
    }
};
parseChildren(assets.slates);

const downloadFile = async (url, filepath, headers = {}) => {  
    const response = await axios.get(url, { responseType: "stream", headers });
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);
  
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

(async () => {
    var i = 0;
    for (var no in items) {
        const uri = items[no];
        const downloadedPath = path.join(filesFolder, `${no}.pdf`);
        if (!fs.existsSync(downloadedPath)) {
            console.log(`[${i.toLocaleString()}/${Object.keys(items).length.toLocaleString()}] Downloading ${uri} as ${no}.pdf`);
            await downloadFile(`https://etext-ise.pearson.com/eplayer/ebookassets/prod1/ebook${indexId}/${uri}`, downloadedPath, { cookie });
        }
        i++;
    }
    console.log("All pages downloaded! Loading into memory...");
    const individualPDFBuffers = Object.keys(items).map(no => fs.readFileSync(path.join(filesFolder, `${no}.pdf`)));
    console.log("All pages in memory! Merging into one file...");

    const mergedPDF = await PDFDocument.create(); 
    for (const pdfBytes of individualPDFBuffers) { 
        const pdf = await PDFDocument.load(pdfBytes); 
        const copiedPages = await mergedPDF.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(p => mergedPDF.addPage(p));
    }
    const mergedPDFBuffer = await mergedPDF.save();
    console.log("Merged PDF created! Saving to disk...");
    const finalPath = path.resolve(__dirname, "..", "Merged.pdf");
    fs.writeFileSync(finalPath, mergedPDFBuffer);
    console.log("Saved to disk! Cleaning up individual pages...");
    rimraf.sync(filesFolder);
    console.log(`Done! Your file is at ${finalPath}.`);
})();