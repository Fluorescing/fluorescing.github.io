var audioContext = false;
var oscillator;
var volume;

//var notes = [440.0, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99];
var notes = [523.25, 523.25, 783.99, 783.99, 880.0, 880.0, 783.99, 698.46, 698.46, 659.25, 659.25, 587.33, 587.33, 523.25];
var index = 0;
var mul = 0;


var sines = [0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var cosines = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

var Node = (function() {
    function Node(object) {
        this.parent = false;
        this.child = false;
        this.value = object; 
    }

    Node.prototype.after = function(object) {
        var temp = new Node(object);
        temp.parent = this;
        temp.child = this.child;
        this.child = temp;
        return temp;
    }

    Node.prototype.before = function(object) {
        var temp = new Node(object);
        temp.parent = this.parent;
        this.parent = temp;
        temp.child = this;
        return temp;
    }

    Node.prototype.root = function() {
        var iter = this;
        while (iter.parent) {
            iter = iter.parent;
        }
        return iter;
    }

    Node.prototype.remove = function() {
        if (this.parent) {
            this.parent.child = this.child;
        }

        if (this.child) {
            this.child.parent = this.parent;
        }
    }

    return Node;
})();

var root, next;
next = new Node([0.0, 0.0]);
next = next.after([1.0, 0.05]);
next = next.after([0.2, 0.3]);
next = next.after([0.2, 0.5]);
next = next.after([0.0, 0.8]);
root = next.root();

for (var iter = root; iter; iter = iter.child) {
    console.log(iter.value);
}

function main() {
    var waveCanvas = $( '#wave-canvas' );
    var envelopeCanvas = $( '#envelope-canvas' );

    // setup audio context
    if ('AudioContext' in window) {
        audioContext = new AudioContext();
    }
    else if ('webkitAudioContext' in window) {
        audioContext = new webkitAudioContext();
    }

    // Voltage Controlled Oscillator Class
    var VCO = (function(context) {
        function VCO() {
            this.oscillator = context.createOscillator();
            this.oscillator.type = 'sawtooth';
            this.setFrequency(440);
            this.oscillator.start(0);

            this.input = this.oscillator;
            this.output = this.oscillator;

            // callback for setting the frequency
            var that = this;
            $(document).bind('frequency', function(_, frequency) {
                that.setFrequency(frequency);
            });
        }

        VCO.prototype.setPeriodicWave = function(waveTable) {
            this.oscillator.setPeriodicWave(waveTable);
        };

        VCO.prototype.setFrequency = function(frequency) {
            this.oscillator.frequency.setValueAtTime(frequency, context.currentTime);
        };

        VCO.prototype.connect = function(node){
            if (node.hasOwnProperty('input')) {
                this.output.connect(node.input);
            }
            else {
                this.output.connect(node);    
            }
        };

        return VCO;
    })(audioContext);

    var now = audioContext.currentTime;

    oscillator = new VCO();

    volume = audioContext.createGain();
    volume.gain.linearRampToValueAtTime(0.0, now);
    
    oscillator.connect(volume);
    volume.connect(audioContext.destination);

    // sliders
    $( "#sines > span" ).each(function() {
        var value = parseFloat($( this ).text());
        $( this ).empty().slider({
            value: value,
            animate: true,
            min: 0.0,
            max: 100.0,
            orientation: "vertical",
            slide: function( event, ui ) {
                for (var i = 1; i <= 11; i++) {
                    if (ui.handle.parentNode.id == "sine" + i) {
                        sines[i] = ui.value / 100.0;
                    }
                }
                redrawWaveCanvas(waveCanvas);
            }
        });
    });

    // play button
    $( '#play' )
        .button()
        .click(function(event) {
            event.preventDefault();
            playNote();
            redrawEnvelopeCanvas(envelopeCanvas);
        });

    // clear the canvas
    clearCanvas(waveCanvas, "black");
    clearCanvas(envelopeCanvas, "black");

    // Add event listeners
    envelopeCanvas.mousedown(doMouseDown);
    envelopeCanvas.mousemove(doMouseMove);
    envelopeCanvas.mouseup(doMouseUp);

    redrawWaveCanvas(waveCanvas);
    redrawEnvelopeCanvas(envelopeCanvas);
}

function redrawWaveCanvas(canvas) {
    clearCanvas(canvas, "black");

    var ctx = canvas[0].getContext("2d");

    ctx.strokeStyle = "#80FF80";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(240, 0);
    ctx.lineTo(240, 180);
    ctx.moveTo(480, 0);
    ctx.lineTo(480, 180);
    ctx.stroke();

    ctx.strokeStyle = "#808080";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 90);
    ctx.lineTo(720, 90);
    ctx.moveTo(360, 0);
    ctx.lineTo(360, 180);
    ctx.stroke();

    drawFourierSeries(canvas, sines, cosines);
}

function redrawEnvelopeCanvas(canvas) {
    clearCanvas(canvas, "black");

    var ctx = canvas[0].getContext("2d");

    ctx.strokeStyle = "#808080";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 90);
    ctx.lineTo(720, 90);
    ctx.moveTo(60, 0);
    ctx.lineTo(60, 180);
    ctx.stroke();

    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 90);
    for (var iter = root; iter; iter = iter.child) {
        var x = iter.value[1] * 360 + 60;
        var y = -iter.value[0] * 60 + 90;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(720, 90);
    ctx.stroke();
}

function drawFourierSeries(canvas, sines, cosines) {
    if (typeof sines[0] != 'number' || typeof sines.length != 'number')
        console.error("drawFourierSeries: sines is not an numerical array");
    if (typeof cosines[0] != 'number' || typeof sines.length != 'number')
        console.error("drawFourierSeries: cosines is not an numerical array");
    if (sines.length != cosines.length)
        console.error("drawFourierSeries: the length of sines and cosines must be equal");

    var ctx = canvas[0].getContext("2d");

    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    ctx.moveTo(0, 90);
    for (var i = 0; i < 720; i++) {
        var x = i - 360;
        var theta = Math.PI * (x + 1) / (120.0);

        var sum = 0.0;

        for (var n = 1; n < sines.length; n++)
        {
            sum += sines[n] * Math.sin(n * theta);
            sum += cosines[n] * Math.cos(n * theta);
        }
        ctx.lineTo(i + 1, 60.0*sum + 90.0)
    }

    ctx.stroke();
}

function clearCanvas(canvas, color) {
    var ctx = canvas[0].getContext("2d");

    ctx.fillStyle = color;
    ctx.rect(0, 0, canvas[0].width, canvas[0].height);
    ctx.fill();

    // Not sure why browsers don't clear it right the first time
    ctx.rect(0, 0, canvas[0].width, canvas[0].height);
    ctx.fill();
}

// static
var last_x = false;
var last_y = false;
function doMouseMove(event) {
    var target = $('#' + event.target.id);
    x = event.offsetX / target.width();
    y = event.offsetY / target.height();

    var ctx = target[0].getContext("2d");

    if (!last_x) last_x = x;
    if (!last_y) last_y = y;

    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(last_x * 720, last_y * 180);
    ctx.lineTo(x * 720, y * 180);
    //ctx.stroke();

    last_x = x;
    last_y = y;
}

function doMouseDown(event) {
    var target = $('#' + event.target.id);
    x = event.offsetX / target.width();
    y = event.offsetY / target.height();
}

function doMouseUp(event) {
    var target = $('#' + event.target.id);
    x = event.offsetX / target.width();
    y = event.offsetY / target.height();
}

function playNote() {
    // create wave table
    var curveCos = new Float32Array(12);
    var curveSin = new Float32Array(12);
    curveSin[0] = 0;
    curveCos[0] = 0;
    for (var i = 1; i < 12; i++) {
        curveSin[i] = sines[i];
        curveCos[i] = cosines[i];
    }

    var waveTable = audioContext.createPeriodicWave(curveCos, curveSin);
    oscillator.setPeriodicWave(waveTable);

    var now = audioContext.currentTime;

    // update frequency
    $(document).trigger("frequency", [notes[index]]);
    index = (index + 1) % notes.length;

    // setup envelope
    volume.gain.cancelScheduledValues(now);
    volume.gain.linearRampToValueAtTime(0.0, now);
    volume.gain.linearRampToValueAtTime(1.0, now + 0.05);
    volume.gain.exponentialRampToValueAtTime(0.2, now + 0.3);
    volume.gain.linearRampToValueAtTime(0.2, now + 0.5);
    volume.gain.linearRampToValueAtTime(0.0, now + 0.8);
}

$( main );