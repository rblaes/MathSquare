/**
 * Created by bauer on 12.09.14.
 * @constructor
 */
//cordova
var savedFS;
function gotFS(a) {
    savedFS = a;
    a.root.getFile("data.json", null, gotFileEntry, fail);
}
function gotFileEntry(a) {
    a.file(gotFile, fail);
}
function gotFileEntryWriter(a) {
    a.createWriter(gotFileWriter, fail);
}
function gotFile(a) {
    readAsText(a);
}
function gotFileWriter(a) {
    a.write(game.getLevelData());
    a.onwriteend = function(a) {
    };
}
function readAsText(a) {
    var b = new FileReader;
    b.onloadend = function(a) {
        doneReading(a.target.result);
    };
    b.readAsText(a);
}
function fail(a) {
    doneReading(void 0);
}

//cordova


var dataContent = {};
var game = {};
var isInitialized = false;
var customvalue = 0;
refeshHeader = function () {

};


doneReading = function (savedData) {

    $("#loadingScreen").fadeOut(function() {
        $("#mainMenu").fadeIn();
    });

    game = new SquareGame(savedData, function(a, b, c) {
        //timeLeft, triesLeft, badMove

        !0 === c && $("#gme").effect("bounce", {}, 500);

        void 0 != a &&
            void 0 != b &&
        (document.getElementById("header_inner_tries").innerHTML = b,
            document.getElementById("header_inner_time").innerHTML = a);

        1 == game.isPaused ? document.getElementById("cellgoal").style.opacity = "0.0" : document.getElementById("cellgoal").style.opacity = "1.0";

        for (a = a = 0;24 > a;a++) {
            b = game.getSquareBoard().getSquareNumbers()["cell" + a],
                c = document.getElementById("cell" + a),
                    1 == game.isPaused ? c.innerHTML = "" : "" == c.innerHTML
                        && (c.innerHTML = b.getNumberValue()), 1 == b.isNumberAvailable() ? 0 == b.isNumberSelected() &&
                (jQuery("#cell" + a).removeClass("selected"), b.deselect_noEvent()) : jQuery("#cell" + a).animate({opacity:"0.0"});

        }
        document.getElementById("cellgoal").innerHTML = game.getSquareBoard().getGoal().getGoalValue();

        $("#cellgoal").inflateText({maxFontSize:.7 * customvalue, minFontSize:12, scale:1});

    }, function(a) {
        //a=isSuccess
        1 == a ?
            (
                document.getElementById("content2").innerHTML = game.getCurrentLevel(),
                document.getElementById("nextLevelIs").innerHTML = game.getCurrentLevel(),
                document.getElementById("wincontent1").style.fontSize = .35 * sizeContent * .2 + "px",
                document.getElementById("wincontent2").style.fontSize = .35 * sizeContent * .2 + "px",
                document.getElementById("nextLevelIs").style.fontSize = .175 * sizeContent + "px",
                $("#gameMenu").fadeOut(function() {$("#winMenu").fadeIn();}),
                savedFS.root.getFile("data.json", {create:!0, exclusive:!1}, gotFileEntryWriter, fail)
            )
        :
            (
                 document.getElementById("losecontent1").style.fontSize = .35 * sizeContent * .2 + "px",
                 document.getElementById("losecontent2").style.fontSize = .35 * sizeContent * .2 + "px",
                 $("#gameMenu").fadeOut(function() {$("#loseMenu").fadeIn();})
            );
    });
    document.getElementById("content2").innerHTML = game.getCurrentLevel();



};

initBoard = function () {
    if (1 == isInitialized) {
        return;
    }
    customvalue = ($(window).width() - 40 - 10 - 20) / 5;

    heightleft = .3 * ($(window).height() - $(window).width() - Math.floor($(window).width() / 4 * .15));

    0 > heightleft && (heightleft = 0);

    document.getElementById("gme").style.marginTop = heightleft + "px";

    elementArray = document.getElementsByClassName("header_desc");
    for (i = i = 0;i < elementArray.length;i++) {
        elementArray[i].style.setProperty("font-size", Math.floor($(window).width() / 4 * .15) + "px");
    }
    elementArray = document.getElementsByClassName("header_val");
    for (i = i = 0;i < elementArray.length;i++) {
        elementArray[i].style.setProperty("font-size", Math.floor(.3 * Math.floor($(window).width() / 4)) + "px");
    }
    elementArray = document.getElementsByClassName("header_inner");
    for (i = i = 0;i < elementArray.length;i++) {
        elementArray[i].style.setProperty("width", "30%");
    }
    document.getElementById("header_inner_c").style.setProperty("left", Math.floor($(window).width() / 2 - $(window).width() / 4 / 2) + "px");
    document.getElementById("header_inner_c").style.setProperty("width", Math.floor($(window).width() / 4) + "px");
    document.getElementById("header_inner_l").style.setProperty("margin-left", .08 * $(window).width() + "px");
    document.getElementById("header_inner_r").style.setProperty("margin-right", .08 * $(window).width() + "px");

    for (i = 0;24 > i;i++) {
        document.getElementById("cell" + i).style.setProperty("width", customvalue + "px"),
        document.getElementById("cell" + i).style.setProperty("height", customvalue + "px"),
        document.getElementById("cell" + i).style.setProperty("max-width", customvalue + "px"),
        document.getElementById("cell" + i).style.setProperty("max-height", customvalue + "px");
    }

    document.getElementById("cellgoal").style.setProperty("width", customvalue + "px");
    document.getElementById("cellgoal").style.setProperty("height", customvalue + "px");
    document.getElementById("cellgoal").style.setProperty("max-width", customvalue + "px");
    document.getElementById("cellgoal").style.setProperty("max-height", customvalue + "px");



    $('#cellgoal').inflateText({
        maxFontSize: customvalue * .7, //(px)
        minFontSize: 12, //(px)
        scale: 1
    });


    $('#header_inner_c').inflateText({
        maxFontSize: customvalue * .7, //(px)
        minFontSize: 12, //(px)
        scale: 0.8
    });

    $('.cell').inflateText({
        maxFontSize: customvalue * .7, //(px)
        minFontSize: 12, //(px)
        scale: 0.8
    });
    document.getElementById("gme")

};
restBoard = function () {
    initBoard();
    for (var i = 0;24 > i;i++) {
        var item = game.getSquareBoard().getSquareNumbers()["cell" + i];
        document.getElementById("cell" + i).innerHTML = item.getNumberValue();
        document.getElementById("cell" + i).style.opacity = "1.0";
        document.getElementById("cell" + i).style.setProperty("color", item.getItemColor());
    }
    document.getElementById("cellgoal").innerHTML = game.getSquareBoard().getGoal().getGoalValue();

    $('#cellgoal').inflateText({
        maxFontSize: customvalue * .7, //(px)
        minFontSize: 12, //(px)
        scale: 1
    });


    $('#header_inner_c').inflateText({
        maxFontSize: customvalue * .7, //(px)
        minFontSize: 12, //(px)
        scale: 0.8
    });

    $('.cell').inflateText({
        maxFontSize: customvalue * .7, //(px)
        minFontSize: 12, //(px)
        scale: 0.8
    });

};

//$("div.cell").touchstart(function () {
$("div.cell").click(function () {
    var item = game.getSquareBoard().getSquareNumbers()[$(this).attr("id")];
    if (item == undefined) {
        return;
    }
    if (item.isNumberAvailable() == true) {
        if (item.isNumberSelected() == true) {
            $(this).removeClass("selected");
            item.deselectNumber();


        } else {

            $(this).addClass("selected");
            item.selectNumber();


        }

    }


});


jQuery("#pauseMenu_continue").click(function () {

    $("#pauseMenu").fadeOut(function () {
        $("#gameMenu").fadeIn();
    });

    refeshHeader();
    game.startGame();

});




jQuery("#pauseMenu_restart").click(function () {

    game.redrawBoard();
    restBoard();
    $("#pauseMenu").fadeOut(function () {
        $("#gameMenu").fadeIn();
    });


    refeshHeader();

    game.startGame();

});




jQuery("#mainMenu_reset_yes").click(function () {
    $("#mainMenu_reset_confirm").fadeOut( function() {
        $("#mainMenu_reset").fadeIn();

    });


    game.resetConfiguration();
    document.getElementById("content2").innerHTML = game.getCurrentLevel();

    savedFS.root.getFile("data.json", {create: true, exclusive: false}, gotFileEntryWriter, fail);
    game.redrawBoard();
    restBoard();




});


jQuery("#mainMenu_reset_no").click(function () {
    game.redrawBoard();
    restBoard();


    $("#mainMenu_reset_confirm").fadeOut( function() {
        $("#mainMenu_reset").fadeIn();

    });

});


jQuery("#mainMenu_reset").click(function () {
    game.redrawBoard();
    restBoard();
    $("#mainMenu_reset").fadeOut( function() {
        $("#mainMenu_reset_confirm").fadeIn();
        setTimeout( function() {

            $("#mainMenu_reset_confirm").fadeOut( function() {
                $("#mainMenu_reset").fadeIn();

            });
        },5000)
    });

    game.startGame();


});

jQuery("#mainMenu_play").click(function () {
    game.redrawBoard();
    restBoard();
    $("#mainMenu").fadeOut(function () {
        $("#gameMenu").fadeIn();
    });

    refeshHeader();

    game.startGame();


});


jQuery("#loseMenu_mainMenu").click(function () {
    game.redrawBoard();
    $("#loseMenu").fadeOut(function () {
        $("#mainMenu").fadeIn();
    });

    refeshHeader();


});

jQuery("#pauseMenu_mainMenu").click(function () {
    game.redrawBoard();
    $("#pauseMenu").fadeOut(function () {
        $("#mainMenu").fadeIn();
    });


    refeshHeader();


});


jQuery("#winMenu_play").click(function () {

    game.redrawBoard();
    restBoard();
    refeshHeader();


    $("#winMenu").fadeOut(function () {
        $("#gameMenu").fadeIn();
    });


    game.startGame();


});

jQuery("#mainMenu_help").click(function () {
    restBoard();

    $("#mainMenu").fadeOut(function () {
        $("#helpMenu").fadeIn();
    });
    $('.inflatethis').inflateText({
        maxFontSize: 200, //(px)
        minFontSize: 12, //(px)
        scale: 1
    });
    refeshHeader();


});


jQuery("#winMenu_mainMenu").click(function () {

    $("#winMenu").fadeOut(function () {
        $("#mainMenu").fadeIn();
    });
    refeshHeader();


});

jQuery("#helpMenu_mainMenu").click(function () {

    $("#helpMenu").fadeOut(function () {
        $("#mainMenu").fadeIn();
    });
    refeshHeader();


});

jQuery("#loseMenu_restart").click(function () {
    game.redrawBoard();
    restBoard();
    $("#loseMenu").fadeOut(function () {
        $("#gameMenu").fadeIn();
    });
    refeshHeader();

    game.startGame();


});


jQuery("#header_inner_c").click(function () {
    game.pauseGame();
    document.getElementById("timeLeft").innerHTML = game.getTimeLeft();
    document.getElementById("triesLeft").innerHTML = game.getTriesLeft();
    document.getElementById("numbersLeft").innerHTML = game.getNumbersLeft();
    refeshHeader();
    $("#gameMenu").fadeOut(function () {
        $("#pauseMenu").fadeIn();
    });


});
//////////////////////////
$('body').on('touchmove', function(evt) {
    evt.preventDefault();
});

//sizing
var overallHeight = $(window).height();

var sizePaddingTop = overallHeight * .05;
var sizeTitle = overallHeight * .10;
var sizeContent = overallHeight * .65;
var SizePaddingBottom = overallHeight * .05;


var elements = document.getElementsByClassName("headline");


var eleCount = 0;

for (eleCount = 0; eleCount < elements.length; eleCount++) {
    elements[eleCount].style.paddingTop = sizePaddingTop + "px";
    elements[eleCount].style.fontSize = sizeTitle * .6 + "px";
    elements[eleCount].style.height = sizeTitle + "px";
    elements[eleCount].style.lineHeight = sizeTitle + "px";
    elements[eleCount].style.paddingBottom = sizePaddingTop + "px";
}

eleCount = 0;
elements = document.getElementsByClassName("content");
for (eleCount = 0; eleCount < elements.length; eleCount++) {
    elements[eleCount].style.height = sizeContent + "px";
}

document.getElementById("helpContent").style.fontSize = .8 * sizeContent * .05 + "px";
document.getElementById("content1").style.fontSize = .35 * sizeContent * .2 + "px";
document.getElementById("content2").style.fontSize = .175 * sizeContent + "px";
document.getElementById("triesLeft").style.fontSize = .075 * sizeContent + "px";
document.getElementById("triesLeft").style.height = .075 * sizeContent + "px";
document.getElementById("triesLeft_des").style.fontSize = .045 * sizeContent + "px";
document.getElementById("triesLeft_des").style.height = .075 * sizeContent + "px";
document.getElementById("timeLeft").style.fontSize = .075 * sizeContent + "px";
document.getElementById("timeLeft").style.height = .075 * sizeContent + "px";
document.getElementById("timeLeft_des").style.fontSize = .045 * sizeContent + "px";
document.getElementById("timeLeft_des").style.height = .075 * sizeContent + "px";
document.getElementById("numbersLeft").style.fontSize = .075 * sizeContent + "px";
document.getElementById("numbersLeft").style.height = .075 * sizeContent + "px";
document.getElementById("numbersLeft_des").style.fontSize = .045 * sizeContent + "px";
document.getElementById("numbersLeft_des").style.height = .075 * sizeContent + "px";

/////////////////////



// Wait for Cordova to load
//



// Cordova is ready
//
function onDeviceReady() {

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

    document.addEventListener("pause", function() {
        if (game.isRunning()) {
            game.pauseGame();
            document.getElementById("timeLeft").innerHTML = game.getTimeLeft();
            document.getElementById("triesLeft").innerHTML = game.getTriesLeft();
            document.getElementById("numbersLeft").innerHTML = game.getNumbersLeft();
            refeshHeader();
            $("#gameMenu").fadeOut(function () {
                $("#pauseMenu").fadeIn();
            });
        }

    }, false);
}

document.addEventListener("deviceready", onDeviceReady, false);
