<!DOCTYPE html>
<http>
<head>
<META HTTP-EQUIV="CACHE-CONTROL" CONTENT="PUBLIC">
<script src="/jquery-1.8.2.js"></script>
<style>
#titlebar {
    background: #339999;
    color: #ffffff;
    padding: 5px;
    text-align: center;
}
#cardgrid {
    padding: 10px;
    text-align: center;
}
.card {
    margin: 10px;
}
.card_row {
    margin: 10px;
}
#playpanel {
    padding: 1px 1px 5px 20px;
    background: #eeeeee;
    text-align: center;

}
#controlsdiv {
    margin: 10px;
}
.controls {
  text-decoration: underline;
}

.card_img {
    width: 175px;
    height: 175px;
    border: 1px solid #ddd;
}
.content {
  margin: 0 auto;
}
#ppr1 {display: none;}
#ppr2 {display: none;}
</style>
</head>
<body>
<div id="titlebar"><h1>Antler Family Concentration</h1></div>
<div id="playpanel">
  <div id="ppr1"><h2 id="statusCardA">Card A</h2></div>
  <div id="ppr2"><h2 id="statusCardB">Card B</h2></div>
  <div id="ppr3"><h2 id="statusMsg">Find the matching cards...</h2></div>
</div>
<div id="cardgrid"></div>
<div id="controlsdiv">
    <div class="controls" id="reset"><h2>Reset</h2></div>
</div>
</body>
<script>
function log(msg) {
    //console.log(msg);
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var backcard = "/antlers/border_back_of_card_mockup.jpg";
var blankcard ="/antlers/blank.jpg";

var antlers = [];
antlers.push("/antlers/antler_00.jpg");
antlers.push("/antlers/antler_01.jpg");
antlers.push("/antlers/antler_02.jpg");
antlers.push("/antlers/antler_03.jpg");
antlers.push("/antlers/antler_04.jpg");
antlers.push("/antlers/antler_05.jpg");
antlers.push("/antlers/antler_06.jpg");
antlers.push("/antlers/antler_07.jpg");
antlers.push("/antlers/antler_08.jpg");
antlers.push("/antlers/antler_09.jpg");

var antlerNames = [];
antlerNames.push('Caroline');
antlerNames.push('Corbin');
antlerNames.push('Damascus');
antlerNames.push('Fergus');
antlerNames.push('Francis');
antlerNames.push('Hilka');
antlerNames.push('Jasper');
antlerNames.push('Jean');
antlerNames.push('Pallas');
antlerNames.push('Susie');


var CardGrid = {
    width:3,
    height:4,
    state: 'run',
    stateRun: 'run',
    statePause: 'pause',
    cards:[],
    matchedcards: [],
    selectedA : -1,
    selectedB : -1,
    isNotSelectedA : function() {
        if (CardGrid.selectedA == -1) {
            return true;
        } else {
            return false;
        }
    },
    setupCards: function setupCards() {
        // get cards
        var cardcnt = (CardGrid.width * CardGrid.height);

        // build deck
        var carr = CardGrid.cards;
        var cin = 0;
        for (i = 0; i < cardcnt/2; i++) {
            carr.push('card'+cin+"_"+i);
            cin++;
            carr.push('card'+cin+"_"+i);
            cin++
        }

        // shuffle cards
        var m = carr.length, t, i;

          // While there remain elements to shuffle…
          while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = carr[m];
            carr[m] = carr[i];
            carr[i] = t;
          }
        // build dom string
        var ds = '';
        var ci = 0;
        for (x = 0; x < CardGrid.width; x++) {
            ds += '<div class="card_row">';
            for (y = 0; y < CardGrid.height; y++) {
                ds += '<span class="card" id="' + carr[ci] + '"><img class="card_img" id="img_' + carr[ci] + '" src="' + backcard + '"></span>';
                ci++;
            }
            ds+= '</div>';
        }
        $("#cardgrid").html(ds);
    },
    cardClick : function(card) {
        if (CardGrid.selectedA == card.id) {
            log('card selected');
            return;
        }
        if (CardGrid.matchedcards.indexOf(card.id) >= 0) {
            log('card already matched');
            return;
        }
        if (CardGrid.state === CardGrid.statePause) {
            log('pause state');
            return;
        }

        if (CardGrid.isNotSelectedA()) {
            CardGrid.selectedA = card.id;
            var antlerHtml = antlers[card.id.split("_")[1]];
            $('#img_' + card.id).attr('src', antlerHtml);
            $("#statusCardA").html('Card A: ' + CardGrid.selectedA);
        } else {
            CardGrid.state = CardGrid.statePause;
            CardGrid.selectedB = card.id;
            var antlerHtml = antlers[card.id.split("_")[1]];
            $('#img_' + card.id).attr('src', antlerHtml);
            $("#statusCardB").html('Card B: ' + CardGrid.selectedB);
            CardGrid.matchCards();
        }
    },
    matchCards : function() {
        var cardAval = CardGrid.selectedA.split("_")[1];
        var cardBval = CardGrid.selectedB.split("_")[1];
        if (cardAval == cardBval) {
            $("#statusMsg").html('Matched ' + antlerNames[cardAval] + '!')
          CardGrid.removeMatchedCards();
          
        } else {
            $("#statusMsg").html('No Match');
          CardGrid.resetCards();
        }
    },
    removeMatchedCards : async function() {
        var cardAval = CardGrid.selectedA.split("_")[1];
        var cardBval = CardGrid.selectedB.split("_")[1];
        if (cardAval == cardBval) {
            CardGrid.matchedcards.push(CardGrid.selectedA);
            CardGrid.matchedcards.push(CardGrid.selectedB);
        }
        log('matched cards'+ CardGrid.matchedcards);
        //await sleep(2000);
        //$('#img_' + CardGrid.selectedA).attr('src', blankcard);
        //$('#img_' + CardGrid.selectedB).attr('src', blankcard);

        CardGrid.selectedA = CardGrid.selectedB = -1;
        $("#statusCardA").html("Card A");
        $("#statusCardB").html("Card B");
        CardGrid.state = CardGrid.stateRun;

    },
    resetCards : async function() {

        await sleep(2000);
        $('#img_' + CardGrid.selectedA).attr('src', backcard);
        $('#img_' + CardGrid.selectedB).attr('src', backcard);

        CardGrid.selectedA = CardGrid.selectedB = -1;
        $("#statusCardA").html("Card A");
        $("#statusCardB").html("Card B");
        $("#statusMsg").html('Find the matching cards...');
        CardGrid.state = CardGrid.stateRun;

    },
    fullReset : function() {
        CardGrid.cards = [];
        CardGrid.matchedcards = [];
        CardGrid.selectedA = -1;
        CardGrid.selectedB = -1;
        CardGrid.setupCards(); 
        CardGrid.state = CardGrid.stateRun;
        $(".card").click(function() {CardGrid.cardClick(this);});
    }
}

function preloadImgs() {
    var images = new Array()
    for (i = 0; i < antlers.length; i++) {
        images[i] = new Image()
        images[i].src = antlers[i]
    }
}

$( document ).ready(function() {
  preloadImgs();
  CardGrid.setupCards();
  $(".card").click(function() {CardGrid.cardClick(this);});
  $("#reset").click(function() {CardGrid.fullReset();});
});


</script>
</http>