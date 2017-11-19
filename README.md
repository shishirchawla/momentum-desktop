# momentum-desktop
Application to get latest momentum wallpapers, and set them as the desktop background.

So I found a couple of solutions to do this but they all used the Chrome plugin's local storage to fetch the daily wallpaper. I don't use Chrome as my daily web browser, so I made this project that can run completely independent of Chrome. All you need to have is a Momentum account to use this service, there is no need to have chrome or the plugin installed, although having them won't hurt.


And, goes without saying, all credit for the wallpapers goes to the original service - https://momentumdash.com . 

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
