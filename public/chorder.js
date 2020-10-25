function log(msg) {
    console.log(msg);
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


var modes = [];
modes.push({"mode":"Double Harm Major","intervals":"1,b2,3,4,5,b6,7","semitones":"1,1,0,0,1,1,0,1,1,0,0,1","desc":"desc"});
modes.push({"mode":"Ionian","intervals":"1,2,3,4,5,6,7","semitones":"1,0,1,0,1,1,0,1,0,1,0,1","desc":"desc"});
modes.push({"mode":"Dorian","intervals":"1,2,b3,4,5,6,b7","semitones":"1,0,1,1,0,1,0,1,0,1,1,0","desc":"desc"});
modes.push({"mode":"Lydian","intervals":"1,2,3,#4,5,6,7","semitones":"1,0,1,0,1,0,1,1,0,1,0,1","desc":"desc"});
modes.push({"mode":"Ultraphrygian","intervals":"1,b2,b3,3,5,b6,6","semitones":"1,1,1,1,1,0,0,1,1,1,0,0","desc":"desc"});
modes.push({"mode":"Hungarian Minor","intervals":"1,2,b3,b5,5,b6,7","semitones":"1,0,1,1,0,0,1,1,1,0,0,1","desc":"desc"});
modes.push({"mode":"Oriental","intervals":"1,b2,3,4,b5,6,b7","semitones":"1,1,0,0,1,1,1,0,0,1,1,0","desc":"desc"});
modes.push({"mode":"Minor (Aeolian)","intervals":"1,2,b3,4,5,b6,b7","semitones":"1,0,1,1,0,1,0,1,1,0,1,0","desc":"desc"});
modes.push({"mode":"Harmonic Minor","intervals":"1,2,b3,4,5,b6,7","semitones":"1,0,1,1,0,1,0,1,1,0,0,1","desc":"desc"});
modes.push({"mode":"Melodic Minor (up)","intervals":"1,2,b3,4,5,6,7","semitones":"1,0,1,1,0,1,0,1,0,1,0,1","desc":"desc"});
modes.push({"mode":"Quartal","intervals":"1,b2,b3,4,b5,b6,b7","semitones":"1,1,1,1,0,1,1,0,1,0,1,0","desc":"desc"});
modes.push({"mode":"Phrygian Dominant","intervals":"1,b2,3,4,5,b6,b7","semitones":"1,1,0,0,1,1,0,1,1,0,1,0","desc":"The Phrygian dominant scale is the fifth mode of the harmonic minor scale, the fifth being the dominant."});

var degrees = [];
degrees.push({"pos":0, "val":1});
degrees.push({"pos":1, "val":"b9"});
degrees.push({"pos":2, "val":"9"});
degrees.push({"pos":3, "val":"#9"});
degrees.push({"pos":4, "val":"3"});
degrees.push({"pos":5, "val":"4"});
degrees.push({"pos":6, "val":"b5"});
degrees.push({"pos":7, "val":"5"});
degrees.push({"pos":8, "val":"#5"});
degrees.push({"pos":9, "val":"13"});
degrees.push({"pos":10, "val":"b7"});
degrees.push({"pos":11, "val":"7"});

var chords = {};
chords["1m35M7"]="min M7";
chords["1m3b55M7"]="min M7";
chords["1m357"]="min 7th";
chords["1m3357"]="min 7 7th";
chords["1m35"]="min";
chords["1m33b557M7"]="maj, min, dim";
chords["1m335"]="maj, min";
chords["135M7"]="maj 7th";
chords["13b55M7"]="maj 7th";
chords["135"]="maj";
chords["1m3b5"]="dim";
chords["1m3b57"]="dim";
chords["1m3b56"]="dim";
chords["1m33B57M7"]="dim";
chords["1357"]="7th";
chords["1m3b557"]="min 7th";
chords["1m33b55M7"]="maj, min";
chords["1m33b5"]="dim";
chords["1347"]="sus";
chords["147"]="sus";
chords["1m347"]="msus";

var Chorder = {
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
    setup: function setup() {
        // load mode options
        log('chorder setup');
        var sel = document.getElementById("mode-select");
        modes.forEach(function(el) {
          var option = document.createElement("option");
          option.text = el.mode;
          sel.add(option);
        });


    },
    getChordName: function(frm) {
      if(chords[frm]== undefined) {
        return 'n/a';
      } else {
        return chords[frm];
      }
    },
    getChords : function(mode) {
      var r = 'Chords here: ';
      var mx = 'selected mode';
      $( "#mode-select option:selected" ).each(function() {
          mx = $( this ).text();
        });

        var modeX;
      modes.forEach(function(el) {
        if (el.mode == mx) {
          modeX = el;
          r += modeX.mode;
        }
      });  
          
      r = "<div class=\"row\"><h2>"+modeX.mode+"</h2></div>";
      r += "<div class=\"row\">";
      r += "<div class=\"col-sm\">Degree</div>";
      r += "<div class=\"col-sm\">Interval</div>";
      r += "<div class=\"col-sm\">Chord Name</div>";
      r += "<div class=\"col-med\">Formula</div>";

      //r += "<div class=\"col-sm\">Sus Chords</div>";
      //r += "<div class=\"col-sm\">Knot Chords</div>";
      r+= "</div>";

      var intervals = modeX.intervals.split(",");
      var stones = modeX.semitones.split(",");
      var cnt = 1;
      log("ST" + stones);
      var formulas = [];
      [0, 1, 2, 3, 4, 5, 6, 7,8,9,10,11,].forEach(function(x) {
        // shift the semitones as needed
        if (x > 0) {
          var ff = stones.shift();
          stones.push(ff);
        }
        // identify intervals
        if (stones[0]==1) {
          var fd = [];
          fd.push("1");
          if (stones[1]== 1) fd.push("b9");
          if (stones[2]== 1) fd.push("9");
          if (stones[3]== 1) fd.push("m3");
          if (stones[4]== 1) fd.push("3");
          if (stones[5]== 1) fd.push("4");
          if (stones[6]== 1) fd.push("b5");
          if (stones[7]== 1) fd.push("5");
          if (stones[8]== 1) fd.push("b6");
          if (stones[9]== 1) fd.push("6");
          if (stones[10]== 1) fd.push("7");
          if (stones[11]== 1) fd.push("M7");
          var frm = fd[0]+ fd[2]+ fd[4]+ fd[6];
          formulas.push(frm);
          } else { 
          // do nothing
        }

      });















      for (i=0; i<7; i++) {
        r += "<div class=\"row\">";
        r += "<div class=\"col-sm\">" + i + "</div>";
        r += "<div class=\"col-sm\">" + intervals[i] + "</div>";
        r += "<div class=\"col-sm\">" + Chorder.getChordName(formulas[i]) + "</div>";
        r += "<div class=\"col-sm\">" + formulas[i] + "</div>";
        //r += "<div class=\"col-sm\"> sus cho </div>";
        //r += "<div class=\"col-sm\"> knot cho </div>";
        r+= "</div>";
      }

      $("#chord-grid").html(r);
      }
}

