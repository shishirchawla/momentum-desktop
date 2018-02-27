# momentum-desktop
Gets the latest momentum wallpaper and sets it as the desktop background.

So I found a couple of solutions to do this but they all used the Chrome plugin's local storage to fetch the daily wallpaper. I don't use Chrome as my daily web browser, so I made this project that can run completely independent of Chrome. All you need to have is a Momentum account to use this service, there is no need to have chrome or the plugin installed, although having them won't hurt.

### Setup instructions:

Install momentum-desktop using npm:
```console
$ npm install momentum-desktop
```

Install forever:
```console
$ npm install forever -g
```

Change directory to where momentum-desktop is installed, and start the service:
```console
$ cd /path/to/momentum-desktop
$ npm start .
```
