# clappe

[Install to Google Chrome](https://chrome.google.com/webstore/detail/gfmcijindndhaflgmmkkcihndcclaled)

> Clap like the whole crowd. Make your claps be heard on Medium.
<div align="center">
<img src="https://i.imgur.com/kl1cBJk.png" width="500">
</div>

Tiny extension to make your claps be heard on Medium. Also providing super clap functionality if you want to be really supportive as a crowd.

### How to use

The extenstion itself is created to be the easiest as possible but still you can check it out [this video](https://www.youtube.com/watch?v=vSXIfH3N8Cc).

Basically, every time (when you are allowed to clap) when you hover a clap button an another special button "super-clapp" appears. If you press this button, the article what you are currently reading will gain up to 50 claps.

This extension also has settings. You can disable sounds of claps or you can set your own – personal one. Don't worry, it's not uploaded anywhere, this part of settings is completely private and saved localy. 🤓

## Development

    npm install
    npm run dev
  
And load the `dist`-directory into chrome.

## Entryfiles (bundles)

There are two kinds of entryfiles that create bundles.

1. All js-files in the root of the `./app/scripts` directory
2. All css-,scss- and less-files in the root of the `./app/styles` directory


    $ gulp


| Option         | Description                                                                                                                                           |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--watch`      | Starts a livereload server and watches all assets. <br>To reload the extension on change include `livereload.js` in your bundle.                      |
| `--production` | Minifies all assets                                                                                                                                   |
| `--verbose`    | Log additional data to the console.                                                                                                                   |
| `--vendor`     | Compile the extension for different vendors (chrome, firefox, opera, edge)  Default: chrome                                                                 |
| `--sourcemaps` | Force the creation of sourcemaps. Default: !production                                                                                                |





