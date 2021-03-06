function log(msg) {
    console.log(msg);
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


var modes = [];

modes.push({"mode":"Altered","group":"Jazz","intervals":"1,b2,b3,3,b5,b6,b7","semitones":"1,1,0,1,1,0,1,0,1,0,1,0","desc":"How to sound 'jazzy'. This is actually the 7th mode of the Melodic Minor. Lots of fun over the dominant 7th chords and minor 7th chords too."});
modes.push({"mode":"Diminished","group":"Advanced, Metal","intervals":"1,2,b3,4,b5,b6,6,7","semitones":"1,0,1,1,0,1,1,0,1,1,0,1","desc":"A symmetrical scale that is built by alternating whole steps and half steps. Alternately, it is stacked two diminished chords."});
modes.push({"mode":"Dorian","group":"Basic","intervals":"1,2,b3,4,5,6,b7","semitones":"1,0,1,1,0,1,0,1,0,1,1,0","desc":"2nd mode of the Major Scale"});
modes.push({"mode":"Double Diminished","group":"Jazz","intervals":"1,b2,b3,3,b5,5,6,b7","semitones":"1,1,0,1,1,0,1,1,0,1,1,0","desc":"Same as the diminished scale, starting on the 2nd degree. Alternatively, Stack two diminished chords. Very similar to Altered scale. Jazzy."});
modes.push({"mode":"Double Harm Major","group":"Advanced","intervals":"1,b2,3,4,5,b6,7","semitones":"1,1,0,0,1,1,0,1,1,0,0,1","desc":"Double Harmonic Major. Very Interesting scale. Radially symmetric around the root. See: The Beato Mug."});
modes.push({"mode":"Harmonic Minor","group":"Advanced","intervals":"1,2,b3,4,5,b6,7","semitones":"1,0,1,1,0,1,0,1,1,0,0,1","desc":"Not sure where this comes from, but it's fun to combine the minor 3rd and a major 7."});
modes.push({"mode":"Hungarian Minor","group":"Advanced, Metal","intervals":"1,2,b3,b5,5,b6,7","semitones":"1,0,1,1,0,0,1,1,1,0,0,1","desc":"4th mode of Dbl Harmonic Major"});
modes.push({"mode":"Locrian","group":"Basic","intervals":"1,b2,b3,4,b5,b6,b7","semitones":"1,1,0,1,0,1,1,0,1,0,1,0","desc":"7th mode of the Major Scale"});
modes.push({"mode":"Lydian","group":"Basic, Metal","intervals":"1,2,3,#4,5,6,7","semitones":"1,0,1,0,1,0,1,1,0,1,0,1","desc":"4th mode (subdominant) of the Major Scale"});
modes.push({"mode":"Lydian Dominant","group":"Jazz, Metal","intervals":"1,2,3,#4,5,6,b7","semitones":"1,0,1,0,1,0,1,1,0,1,1,0","desc":"4th mode (subdominant) of the Melodic Minor Scale"});
modes.push({"mode":"Major (Ionian)","group":"Basic","intervals":"1,2,3,4,5,6,7","semitones":"1,0,1,0,1,1,0,1,0,1,0,1","desc":"Major Scale"});
modes.push({"mode":"Melodic Minor (up)","group":"Advanced","intervals":"1,2,b3,4,5,6,7","semitones":"1,0,1,1,0,1,0,1,0,1,0,1","desc":"I've never understood the ascending/desceding concept."});
modes.push({"mode":"Minor (Aeolian)","group":"Advanced","intervals":"1,2,b3,4,5,b6,b7","semitones":"1,0,1,1,0,1,0,1,1,0,1,0","desc":"6th mode of the Major Scale. "});
modes.push({"mode":"Mixolydian","group":"Basic","intervals":"1,2,3,4,5,6,b7","semitones":"1,0,1,0,1,1,0,1,0,1,1,0","desc":"5th mode (dominant) of the Major Scale"});
modes.push({"mode":"Phrygian Dominant","group":"Metal","intervals":"1,b2,3,4,5,b6,b7","semitones":"1,1,0,0,1,1,0,1,1,0,1,0","desc":"5th mode of Harmonic Minor."});
modes.push({"mode":"Phrygian","group":"Basic","intervals":"1,b2,b3,4,5,b6,b7","semitones":"1,1,0,1,0,1,0,1,1,0,1,0","desc":"3rd mode of the Major Scale"});
//modes.push({"mode":"Quartal","group":"DIY","intervals":"1,b2,b3,4,b5,b6,b7","semitones":"1,1,1,1,0,1,1,0,1,0,1,0","desc":"I made this up by stacking 7 intervals of 4ths. Turns out it is same as Locrian."});
//modes.push({"mode":"Whole Tone","group":"Jazz","intervals":"1,2,3,#4,#5,b7","semitones":"1,0,1,0,1,0,1,0,1,0,1,0","desc":"Whole tones. Lots of fun over altered chords."});

var degrees = {};
degrees["1"]={"pos":0, "val":"1", "note":"C"};
degrees["b2"]={"pos":1, "val":"b2", "note":"Db"};
degrees["2"]={"pos":2, "val":"#9", "note":"D"};
degrees["#9"]={"pos":3, "val":"", "note":"Eb"};
degrees["b3"]={"pos":3, "val":"b3", "note":"Eb"};
degrees["3"]={"pos":4, "val":"3", "note":"E"};
degrees["4"]={"pos":5, "val":"4", "note":"F"};
degrees["#4"]={"pos":6, "val":"#4", "note":"Gb"};
degrees["b5"]={"pos":6, "val":"b5", "note":"Gb"};
degrees["5"]={"pos":7, "val":"5", "note":"G"};
degrees["#5"]={"pos":8, "val":"#5", "note":"Ab"};
degrees["b6"]={"pos":8, "val":"b6", "note":"Ab"};
degrees["6"]={"pos":9, "val":"6", "note":"A"};
degrees["b7"]={"pos":10, "val":"b7", "note":"Bb"};
degrees["7"]={"pos":11, "val":"7", "note":"B"};










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
chords["13479"]="sus";
chords["1479"]="sus";
chords["1m3479"]="msus";
chords["1b3b5M7"]="dim";

var cn = [];
cn.push["C"];
cn.push["Db"];
cn.push["D"];
cn.push["Eb"];
cn.push["E"];
cn.push["F"];
cn.push["Gb"];
cn.push["G"];
cn.push["Ab"];
cn.push["A"];
cn.push["Bb"];
cn.push["B"];

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
        var grps = {};
        modes.forEach(function(el) {
          var option = document.createElement("option");
          option.text = el.mode;
          sel.add(option);
          var g = el.group.split(",");
          g.forEach(function(x){
            grps[x]='mode group';
          })
        });


    },
    getChordName: function(int, frm) {
      log(int);
      log(frm);
      if(frm.length== 0) {
        return 'n/a';
      }
      if (Chorder.getValidForms(frm) == "--") {
        return 'n/a';
      }
        frm.forEach(function(x){log(x.trim()); log("" + chords[x.trim()] + " " + x.trim());});
        var chrds = "";
        frm.forEach(function(x){if (chords[x.trim()] != undefined) chrds += "" + chords[x.trim()] + "<br/>";});
        return degrees[int].note + " " + chrds;
      
    },
    getValidForms: function(frm) {

      var validforms = "";
      frm.forEach(function(x) {
        if (chords[x] != undefined) validforms += x + "<br/>";
      });
      if (validforms == "") {
        return "--";
      } else {
        return validforms;
      }
    },
    getChords : function(mode) {
      var r = 'Chords here: ';
      var mx = 'selected mode';
      var sus;
      $( "#mode-select option:selected" ).each(function() {
        mx = $( this ).text();
      });
      if ($( "#sus-select" ).is(":checked")) {
        sus = true;
      }
      log ("sus " + sus);
      var modeX;
      var groups = {};
      modes.forEach(function(el) {
        if (el.mode == mx) {
          modeX = el;
          r += modeX.mode;
        }
      });  
          
      r = "<div class=\"row, border-top, border-bottom\"><div class=\"col-12\"><h2>"+modeX.mode+"</h2></div></div>";
      
      r += "<div class=\"row,border-bottom\"><div class=\"col-12\"><table class=\"table table-bordered table-striped chorder-table\">";
      //r += "<table class=\"table table-bordered table-striped chorder-center\">";
      r += "<thead class=\"thead-dark\"><tr>";
      r += "<th scope=\"col\">Degree</div>";
      r += "<th scope=\"col\">Interval</td>";
      r += "<th scope=\"col\">Chord Name</td>";
      r += "<th scope=\"col\">Formula</td>";

      //r += "<div class=\"col-sm\">Sus Chords</div>";
      //r += "<div class=\"col-sm\">Knot Chords</div>";
      r+= "</tr></thead>";
      r+= "<tbody>";
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
        var cn = [];
        if (stones[0]==1) {
          var fd3 = [];
          //fd.push("1");
          //if (stones[1]== 1) fd.push("b9");
          if (stones[4]== 1) fd3.push("13");
          if (stones[3]== 1) fd3.push("1m3");
          var fd5 = [];
          if (sus == true) {
            if (stones[5]== 1) {
              fd3.forEach(function(x) {
                fd5.push(x+"4");
              });
            }

          } else {
            if (stones[7]== 1) {
              fd3.forEach(function(x) {
                fd5.push(x+"5");
              });
            }
            if (stones[6]== 1) {
              fd3.forEach(function(x) {
                fd5.push(x+"b5");
              });
            }
  
          }
          //if (stones[8]== 1) fd.push("b6");
          //if (stones[9]== 1) fd.push("6");
          var fd7 = [];
          if (stones[10]== 1) {
            fd5.forEach(function(x) {
              fd7.push(x+"7");
            });
          }
          if (stones[11]== 1) {
            fd5.forEach(function(x) {
              if (x.indexOf("35") > 0) fd7.push(x+"M7");
            });
          }

          //if (stones[2]== 1) fd.push("9");
          var fd9 = [];
          if (sus == true) {
            for (var i = 0; i < fd7.length; i++) {
              if (stones[2]== 1) {
                fd7[i] = fd7[i] + "9";
              }
            }

          }

          var frm = '';// fd[0]+ fd[2]+ fd[3]+ fd[4]+ fd[5]+ fd[6]+ fd[7];
          log(fd7);

          if (fd7.length > 0) {
            formulas.push(fd7);
          } else {
            formulas.push(fd5);
          }
          } else { 
          // do nothing
        }

      });















      for (i=0; i<7; i++) {
        r += "<tr>";
        var j = i+1;
        if (j==1) {
          r += "<td>root</td>";
        } else {
          r += "<td>" + j + "</td>";
        }
        r += "<td>" + intervals[i] + "</td>";

        r += "<td>" + Chorder.getChordName(intervals[i], formulas[i]) + "</td>";

        r += "<td>" + Chorder.getValidForms(formulas[i]) + "</td>";
        
        //r += "<div class=\"col-sm\"> sus cho </div>";
        //r += "<div class=\"col-sm\"> knot cho </div>";
        r+= "</tr>";
      }
      r += "</tbody></table></div></div>";
      r += "<div class=\"row, chorder-margin\"><div class=\"col-12\">"+modeX.desc+"</div></div>";

      $("#chord-grid").html(r);
    }
}

