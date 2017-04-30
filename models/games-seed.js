var Game = require('./games');

Game.find(function (err, games) {

    if (games.length) return;

    new Game({
        title: 'Galactic Warrior',
        description: "Galactic Warrior is a spin-off of the classic game Asteroids.  Fly around in this 8-bit adventure through the stars!",
        externalUrl: "http://www.miniclip.com/games/galactic-warrior/",
        dataName: "galactic-warrior",
        height: 400,
        width: 400
    }).save();

    new Game({
        title: 'Splix.io',
        description: "In Splix.io you must conquer as much land as possible and try to become biggest Splix.io of all!",
        externalUrl: "http://www.miniclip.com/games/splixio/",
        dataName: "splixio",
        height: 800,
        width: 1010
    }).save();

    new Game({
        title: 'Flip Diving',
        description: "Pull off Frontflips, Backflips & Gainers from high cliffs, rickety platforms, trees, castles, and trampolines!",
        externalUrl: "http://www.miniclip.com/games/flip-diving/",
        dataName: "flip-diving",
        height: 670,
        width: 488
    }).save();

    new Game({
        title: 'Twisted Lines',
        description: "Cross the lines to swap colors and collect all hollow squares to solve the puzzle.",
        externalUrl: "http://www.miniclip.com/games/twisted-lines/",
        dataName: "twisted-lines",
        height: 660,
        width: 500
    }).save();

});