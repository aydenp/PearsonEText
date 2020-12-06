# Pearson eText PDF Downloader

Are you tired of using Pearson's slow and featureless eText website to read those overpriced textbooks you paid for? Great! So was I.

Study how you want, when you want, and on whichever device you want. Download it as a PDF!

(The code's bad, but I also wrote it while procrastinating, so it works!)

## How to use

1. Clone this repository. If git scares you, [click here to download the code as a ZIP](https://github.com/aydenp/PearsonEText/archive/master.zip).

2. Navigate to the textbook you want to download on Pearson's website. Once you're there, the URL in your browser should start with **etext-ise.pearson.com**.

3. Open the web inspector of your browser. If you don't know how to do that, try Googling to find more information for your specific browser.

4. Go to the Network tab of the web inspector, and select **XHR**. It should look something like this:

![Screenshot of Step 4](/images/step4.png)

5. You'll notice that there isn't much in there yet. That's because most of the content loaded before we opened it. You can fix it by reloading the page. It should now look like this:

![Screenshot of Step 5](/images/step5.png)

6. Find the item called "assets" and click on it. You should see a bunch of code-looking text that starts with a `{` character. If you don't try clicking around until you are in the "Preview" or "Body" tab. Once you find it, copy it to your clipboard.

7. Make a file called `assets.json` in the *data* folder of the repository folder you cloned or downloaded, and paste the contents in there.

8. In that data folder, copy the `config.example.js` file and name it `config.js`.

8. Back in the web inspector, find a file named "glossary". When you open it, it should look like this:

9. Copy the highlighted field and paste it in the `config.js` document you just copied to, following the instructions in there.

![Screenshot of Step 9](/images/step9.png)

10. Back in the web inspector, search for ".pdf" to filter down the list.

11. Some PDFs that the website loaded will be shown in the list with random-looking names. Choose one, and click on the "Headers" tab. Scroll down until you see `Cookie:`.

12. Copy everything after `Cookie:` and paste it into your `config.js` file, following the instructions specified there.

![Screenshot of Step 12](/images/step12.png)

13. Run the script in a terminal by typing `node .` in the directory of this repository. It will download the pages of your textbook and merge them into one big PDF!

## Reporting Issues

If you find a bug or code issue, report it on the [issues page](https://github.com/aydenp/PearsonEText/issues). Keep in mind that this is for actual bugs in the code. If you need help getting started and the above tutorial isn't helping, reach out to me using the email on [my website](https://ayden.dev)!

## License

This project is licensed under the [MIT license](/LICENSE). Please make sure you comply with its terms while using it in any way.
