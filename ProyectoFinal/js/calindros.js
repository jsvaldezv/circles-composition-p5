//distancia de sonido selecionables
//color gui
import * as THREE from '../js/three.module.js';
import { GUI } from '../jsm/libs/dat.gui.module.js';
import { FirstPersonControls } from '../jsm/controls/FirstPersonControls.js';

//three variables
var camera, controls, scene, renderer, ground;
//var materialCil, materialCar, materialTorre;
var clock = new THREE.Clock();
var audioLoader, audioListener;
var gui;

//calindrosData
var audiovisualObjects = [];
var listPosition = [];
var matrixSizePerSide;
var matrixTotalSize;
var soundsURL = "https://solo2d.calindros.site/sounds/";
var soundsURL2 = "https://solo2d.calindros.site/sounds2/";
var isRunning = false;

var AMOUNT_STATIC_SOUNDS = 46;
var DISTANCE_BETWEEN_OBJECTS = 500;
var OBJECT_RADIO_SIZE = 20;
var OBJECT_DENSITY_FACTOR = 5;
var AMOUNT = 1000;
var SKY_COLOR = 0x72645b;

var INIT_SETTINGS = {
  "volumen_general": 1.0,
  "sound_density": 0.4,
  "fog": false,
};

//html variables
var startButton = document.getElementById( 'startButton');
startButton.addEventListener( 'click', init);

var instructionButton = document.getElementById( 'InstructionButton');
instructionButton.addEventListener( 'click', openInstructions );

function openInstructions(){
  var overlay = document.getElementById( 'blocker');
  overlay.style.display = "block";

  var overlay2 = document.getElementById( 'blocker2');
  overlay2.style.display = "none";

  var startTime = new Date().getTime();
  var interval = setInterval(function(){
    var normalizeVal = (new Date().getTime() - startTime) / 1000;
    audioListener.setMasterVolume(INIT_SETTINGS.volumen_general * (1 - normalizeVal));
    if(new Date().getTime() - startTime > 1000){
      clearInterval(interval);
      return;
    }
  }, 10);

  gui.hide();
}

function init() {
  var overlay = document.getElementById('blocker');
  overlay.style.display = "none";

  var overlay2 = document.getElementById('blocker2');
  overlay2.style.display = "block";

  if(gui)gui.show();
  if(audioListener){
    var startTime = new Date().getTime();
    var interval = setInterval(function(){
      var normalizeVal = (new Date().getTime() - startTime) / 1000;
      audioListener.setMasterVolume(INIT_SETTINGS.volumen_general * normalizeVal);
      if(new Date().getTime() - startTime > 1000){
        clearInterval(interval);
        return;
      }
    }, 10);
  }

  if(!isRunning){
    initMeat();
    isRunning = true;
  }
}

function initMeat() {
  console.log("V20181247");
  var overlay3 = document.getElementById('blocker3');
  overlay3.style.display = "block";

  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set( 0, 25, 0 );

  scene = new THREE.Scene();

  scene.background = new THREE.Color( SKY_COLOR );
  //scene.fog = new THREE.FogExp2( 0x000000, 0.0025 );
  //scene.fog = new THREE.Fog( SKY_COLOR, DISTANCE_BETWEEN_OBJECTS * 0, DISTANCE_BETWEEN_OBJECTS * 2 );

  // Ground
  ground = new THREE.Mesh(
    new THREE.PlaneBufferGeometry( 1, 1 ),
    new THREE.MeshPhongMaterial( { color: 0xAAAAAA, specular: 0x101010 } )
  );
  ground.rotation.x = - Math.PI / 2;
  scene.add( ground );
  ground.receiveShadow = true;

  scene.add( new THREE.AmbientLight( 0x333333));

  //
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  //
  controls = new FirstPersonControls( camera, renderer.domElement );
  controls.movementSpeed = 80;
  controls.lookSpeed = 0.05;
  controls.noFly = true;
  controls.lookVertical = false;

  //
  audioListener = new THREE.AudioListener();
  camera.add(audioListener);
  audioListener.setMasterVolume(INIT_SETTINGS.volumen_general);

  audioLoader = new THREE.AudioLoader();

  //
  window.addEventListener( 'resize', onWindowResize, false );
  animate();

  //
  var seed = Math.floor(Math.random() * 100);
  getJSON('https://solo2d.calindros.site/brain?seed=' + seed.toString() + '&amount=' + AMOUNT.toString(), function(err, data) {
    if (err !== null) {
      alert('Something went wrong: ' + err);
    } else {
      //
      //update acoording to new info. importa section since here happens may stuff
      //

      //sort the array by euclidiean distance
      data.sort(function(a, b) {
        var keyA = a.euclideanDistance,
        keyB = b.euclideanDistance;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      //section for order one carrilon one cilindrero, one one, one one
      var startingGroup = data[0].soundgroup;
      var carrillones = data.filter(da => da.soundgroup == "carrillon");
      var cilindros = data.filter(da => da.soundgroup == "cilindro");
      //carrillones.reverse();
      //cilindros.reverse();
      var tmpData = [];
      while(carrillones.length && cilindros.length){
        if(startingGroup == "carrillon"){
          tmpData.push(carrillones.shift());
          tmpData.push(cilindros.shift());
        }
        if(startingGroup == "cilindro"){
          tmpData.push(cilindros.shift());
          tmpData.push(carrillones.shift());
        }
      }
      if(startingGroup == "carrillon"){
        if(!carrillones.length) tmpData = tmpData.concat(carrillones);
        if(!cilindros.length) tmpData = tmpData.concat(cilindros);
      }
      if(startingGroup == "cilindro"){
        if(!cilindros.length) tmpData = tmpData.concat(cilindros);
        if(!carrillones.length) tmpData = tmpData.concat(carrillones);
      }
      data = tmpData;

      buildAllObjects(data); //A LOT OF STUFF

      //general audio
      var convolver = audioListener.context.createConvolver();
      audioLoader.load(
      'audio/Large Long Echo Hall.wav',
      function(audioBuffer) {
          console.log("audio loeade");
          convolver.buffer = audioBuffer;
        }
      );
      audioListener.setFilter(convolver);

      buildGraphicsForObjects();
      buildLinesConections();

      //resize floor
      ground.scale.x = DISTANCE_BETWEEN_OBJECTS * matrixSizePerSide * 2;
      ground.scale.y = DISTANCE_BETWEEN_OBJECTS * matrixSizePerSide * 2;
      ground.position.x = (DISTANCE_BETWEEN_OBJECTS * matrixSizePerSide) / 2 * 1;
      ground.position.z = (DISTANCE_BETWEEN_OBJECTS * matrixSizePerSide) / 2 * 1;

      //place camera
      var randomXcamerastart = (Math.random() * DISTANCE_BETWEEN_OBJECTS * matrixSizePerSide * 0.5) + (DISTANCE_BETWEEN_OBJECTS * matrixSizePerSide * 0.25);
      var randomZcamerastart = (Math.random() * DISTANCE_BETWEEN_OBJECTS * matrixSizePerSide * 0.5) + (DISTANCE_BETWEEN_OBJECTS * matrixSizePerSide * 0.25);
      camera.position.set(randomXcamerastart,25,randomZcamerastart);

      //place lights
      addLight(-DISTANCE_BETWEEN_OBJECTS,200,-DISTANCE_BETWEEN_OBJECTS);
      addLight(-DISTANCE_BETWEEN_OBJECTS,200,DISTANCE_BETWEEN_OBJECTS * matrixSizePerSide + DISTANCE_BETWEEN_OBJECTS);
      addLight(DISTANCE_BETWEEN_OBJECTS * matrixSizePerSide + DISTANCE_BETWEEN_OBJECTS,200,DISTANCE_BETWEEN_OBJECTS * matrixSizePerSide + DISTANCE_BETWEEN_OBJECTS);
      addLight(DISTANCE_BETWEEN_OBJECTS * matrixSizePerSide + DISTANCE_BETWEEN_OBJECTS,	200,-DISTANCE_BETWEEN_OBJECTS);

      //GUI
      gui = new GUI();
      gui.add(INIT_SETTINGS, 'volumen_general', 0, 1 , 0.01).name("Volumen").listen().onChange( function (vol) {
        audioListener.setMasterVolume(vol);
      });
      gui.add(INIT_SETTINGS, 'sound_density', 0.2, 1 , 0.05).name("Densidad sonora").listen().onChange( function (soundd) {
        audiovisualObjects.forEach(function(avObject){
          if(avObject.sound)
            avObject.sound.setRefDistance(OBJECT_RADIO_SIZE * OBJECT_DENSITY_FACTOR * soundd);
        });
      });
      gui.add(INIT_SETTINGS, 'fog').name("Niebla").listen().onChange( function (fogStatus) {
        if(fogStatus) scene.fog = new THREE.Fog( SKY_COLOR, DISTANCE_BETWEEN_OBJECTS * 0, DISTANCE_BETWEEN_OBJECTS * 2 );
        else scene.fog = null;
      });
      gui.close();

      //turn of html loading message
      var overlay3 = document.getElementById( 'blocker3' );
      overlay3.style.display = "none";

      //fade in audio
      var startTime = new Date().getTime();
      var interval = setInterval(function(){
        var normalizeVal = (new Date().getTime() - startTime) / 1000;
        audioListener.setMasterVolume(INIT_SETTINGS.volumen_general * normalizeVal);
        if(new Date().getTime() - startTime > 1000){
          clearInterval(interval);
          return;
        }
      }, 10);
    }
  });
}

function addLight(x,y,z){
  var light = new THREE.PointLight( 0xffffff,0.3, 0, 2 );
  light.position.set(x,y,z);
  scene.add( light );
  //var helper = new THREE.PointLightHelper( light, 50 );
  //scene.add(helper);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  controls.handleResize();
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  audiovisualObjects.forEach(function(avObject){
    var dis = avObject.mesh.position.distanceTo(camera.position);
    if(dis < OBJECT_RADIO_SIZE * 2 * 20){
      if(avObject.audio_status == "empty"){
        avObject.audio_status = "downloading";
        settingAudio(avObject);
        //console.log("downloading");
      }
      else if(avObject.audio_status == "downloading"){}
      else if(avObject.audio_status == "stoped"){
        avObject.sound.play();
        avObject.audio_status = "playing";
        //console.log("play");
      }
      else if(avObject.audio_status == "playing"){}

    } else { //if faraway
      if(avObject.audio_status == "empty"){}
      else if(avObject.audio_status == "downloading"){}
      else if(avObject.audio_status == "stoped"){}
      else if(avObject.audio_status == "playing"){
        avObject.sound.pause();
        avObject.audio_status = "stoped";
        //console.log("stop");
      }
    }
  });

  //limit positions
  var maxTotalDistance = DISTANCE_BETWEEN_OBJECTS * matrixSizePerSide + DISTANCE_BETWEEN_OBJECTS;
  if(camera.position.x < -DISTANCE_BETWEEN_OBJECTS) camera.position.x = -DISTANCE_BETWEEN_OBJECTS;
  if(camera.position.x > maxTotalDistance) camera.position.x = maxTotalDistance;
  if(camera.position.z < -DISTANCE_BETWEEN_OBJECTS) camera.position.z = -DISTANCE_BETWEEN_OBJECTS;
  if(camera.position.z > maxTotalDistance) camera.position.z = maxTotalDistance;

  var delta = clock.getDelta();
  controls.update( delta );
  renderer.render( scene, camera );
}

function index2matrix(lp){
  var x = Math.floor(lp / matrixSizePerSide);
  var y = lp % matrixSizePerSide;
  return [x,y];
}

function matrix2index(x,y){
  return (x  * matrixSizePerSide) + y;
}

function getPosiblePoints(point){
  var pointMTX = index2matrix(point);
  var possiblePoints = [];
  if(pointMTX[0] > 0){
    var leftPoint = matrix2index(pointMTX[0]-1,pointMTX[1]);
    if(listPosition[leftPoint] == -1)possiblePoints.push(leftPoint);
  }
  if(pointMTX[0] < matrixSizePerSide){
    var rigthPoint = matrix2index(pointMTX[0]+1,pointMTX[1]);
    if(listPosition[rigthPoint] == -1)possiblePoints.push(rigthPoint);
  }
  if(pointMTX[1] > 0){
    var topPoint = matrix2index(pointMTX[0],pointMTX[1]-1);
    if(listPosition[topPoint] == -1)possiblePoints.push(topPoint);
  }
  if(pointMTX[1] < matrixSizePerSide){
    var buttomPoint = matrix2index(pointMTX[0],pointMTX[1]+1);
    if(listPosition[buttomPoint] == -1)possiblePoints.push(buttomPoint);
  }
  return possiblePoints;
}

function buildMap(){
  //we dont want objects in the same location so we set a coonectin map
  for (var i = 0; i < matrixTotalSize; i++) {
    listPosition.push(-1);
  }
  var currentPoint = 0;
  var initialRandomPoint = Math.floor(Math.random() * matrixTotalSize);
  listPosition[initialRandomPoint] = currentPoint;
  currentPoint +=1;
  recursiveBuildingMap(initialRandomPoint,currentPoint);
  //fill the rest with counters
  while(listPosition.indexOf(-1) != -1){
    listPosition[listPosition.indexOf(-1)] = currentPoint;
    currentPoint +=1;
  }
}

function recursiveBuildingMap(point,currentPoint){
  var posibleRoutes = getPosiblePoints(point);
  if(posibleRoutes.length){
    var selectedIndexRoute = Math.floor(Math.random() * posibleRoutes.length);
    var newRute = posibleRoutes[selectedIndexRoute];
    listPosition[newRute] = currentPoint;
    currentPoint +=1;
    if(currentPoint < AMOUNT)recursiveBuildingMap(newRute,currentPoint);
  }
  else {
    var newIndex = listPosition.indexOf(-1);
    listPosition[newIndex] = currentPoint;
    currentPoint +=1;
    if(currentPoint < AMOUNT)recursiveBuildingMap(newIndex,currentPoint);
  }
}

function buildAllObjects(audioCollectionData){
  //for position
  //the objects will be spread in a square area
  matrixSizePerSide = Math.ceil(Math.sqrt(audioCollectionData.length + AMOUNT_STATIC_SOUNDS));
  matrixTotalSize = matrixSizePerSide * matrixSizePerSide;

  //shuffle(listPosition);
  buildMap();
  //console.log(matrixSizePerSide);
  //console.log(listPosition);

  //integrate all objets from db
  audioCollectionData.forEach(function(jsonData, index){
    var newObject = {};
    newObject.position = listPosition[index];
    newObject.audio_data = jsonData;
    newObject.audio_status = "empty";
    audiovisualObjects.push(newObject);
  });

  //integrate all objets froms static
  var contcounter = audiovisualObjects.length;
  for(var i = 0; i < AMOUNT_STATIC_SOUNDS; i++){
    var index = i + contcounter;
    var newObject = {};
    newObject.position = listPosition[index];
    newObject.audio_status = "empty";
    newObject.audio_data = {};
    newObject.audio_data.soundgroup = "torre";
    newObject.audio_data.file_name = "NR__EL__" + i.toString();
    audiovisualObjects.push(newObject);
  }
  //console.log("total amount of" + audiovisualObjects.length.toString());
}

function buildGraphicsForObjects(){
  //geometries
  var sphere = new THREE.DodecahedronBufferGeometry( OBJECT_RADIO_SIZE*0.75, 0 );
  var cone = new THREE.ConeBufferGeometry( OBJECT_RADIO_SIZE, 32, 32 );
  var cilindro = new THREE.CylinderBufferGeometry( OBJECT_RADIO_SIZE, OBJECT_RADIO_SIZE, 32, 32 );

  var	materialTorre = new THREE.MeshPhongMaterial( {color: 0xa52222, flatShading: false,
    transparent: true, opacity: 0.6, emissive: 0x505050, specular: 0x0, shininess: 50}
  );

  var pitch_min = 99999999;
  var pitch_max = -1;
  audiovisualObjects.forEach(function(avObj){
    if(avObj.audio_data.soundgroup != "torre"){
      if(avObj.audio_data.pitch_mean < pitch_min) pitch_min = avObj.audio_data.pitch_mean;
      if(avObj.audio_data.pitch_mean > pitch_max) pitch_max = avObj.audio_data.pitch_mean;
    }
  });

  audiovisualObjects.forEach(function(avObj, index){
    var posY = OBJECT_RADIO_SIZE;
    var mesh;
    if(avObj.audio_data.soundgroup == "cilindro"){
      var colorPitch = new THREE.Color();
      colorPitch.setHSL(pitch2hue(avObj.audio_data.pitch_mean,pitch_min,pitch_max,0.0,0.2),0.95,0.5);
      mesh = new THREE.Mesh( sphere, new THREE.MeshPhongMaterial( { color: colorPitch, flatShading: false,
        transparent: true, opacity: 0.6, emissive: 0x353535, specular: 0x5e5e5e, shininess: 30}
      ));
      posY = OBJECT_RADIO_SIZE*0.3;
    }

    else if(avObj.audio_data.soundgroup == "carrillon"){
      var colorPitch = new THREE.Color();
      colorPitch.setHSL(pitch2hue(avObj.audio_data.pitch_mean,pitch_min,pitch_max,0.0,0.2),0.95,0.5);
      mesh = new THREE.Mesh( cone, new THREE.MeshPhongMaterial( { color: colorPitch, flatShading: false,
        transparent: true, opacity: 0.6, emissive: 0x353535, specular: 0x5e5e5e, shininess: 30}
      ));
    }

    else if(avObj.audio_data.soundgroup == "torre"){
      mesh = new THREE.Mesh( cilindro, materialTorre);
    }

    var posZ = (Math.floor(listPosition[index] / matrixSizePerSide) * DISTANCE_BETWEEN_OBJECTS) + (Math.random() * (DISTANCE_BETWEEN_OBJECTS-(OBJECT_RADIO_SIZE*2)));
    var posX = (Math.floor(listPosition[index] % matrixSizePerSide) * DISTANCE_BETWEEN_OBJECTS) + (Math.random() * (DISTANCE_BETWEEN_OBJECTS-(OBJECT_RADIO_SIZE*2)));
    mesh.position.set(posX, posY, posZ);
    scene.add(mesh);
    avObj.mesh = mesh;
  });
}

function buildLinesConections(){
  var material = new THREE.LineDashedMaterial( {
    color: 0x844125,
    transparent: true,
    opacity: 0.5,
    linewidth: 1,
    scale: 1,
    dashSize: 2,
    gapSize: 2,
  });
  var points = [];
  audiovisualObjects.forEach(function(avObj){
    points.push( new THREE.Vector3(avObj.mesh.position.x, 0.1, avObj.mesh.position.z));
  });
  var geometry = new THREE.BufferGeometry().setFromPoints( points );
  var line = new THREE.Line( geometry, material );
  line.computeLineDistances();
  scene.add( line );
}

function settingAudio(avObject){
  var sound = new THREE.PositionalAudio(audioListener);
  if(avObject.audio_data.soundgroup != "torre")
  var sURL = soundsURL + avObject.audio_data.file_name + ".ogg";
  else
  var sURL = soundsURL2 + avObject.audio_data.file_name + ".ogg";
  audioLoader.load(sURL, function (buffer) {
    var nowBuffering = buffer.getChannelData(0);
    var maxVal=0;
    for (var i = 0; i < nowBuffering.length; i++) {
      if(Math.abs(nowBuffering[i]) > maxVal) maxVal = Math.abs(nowBuffering[i]);
    }
    var normalizationVal = 1.0 - maxVal;
    for (var i = 0; i < nowBuffering.length; i++) {
      nowBuffering[i] = nowBuffering[i] * normalizationVal;
    }
    if(buffer.length > 44100/10){
      for (var i = 0; i < 44100/20; i++) {
        nowBuffering[i] = nowBuffering[i] * (i / 44100/20);
        nowBuffering[buffer.length - (i-1)] = nowBuffering[buffer.length - (i-1)] * (i / 44100/20);
      }
    } else {
      for (var i = 0; i < 44100/100; i++) {
        nowBuffering[i] = nowBuffering[i] * (i / 44100/200);
        nowBuffering[buffer.length - (i-1)] = nowBuffering[buffer.length - (i-1)] * (i / 44100/200);
      }
    }
    sound.setBuffer(buffer);
    avObject.audio_status = "stoped";
    sound.setLoop(true);
    sound.setVolume(2.0);
    sound.detune =Math.random() * 4800 - 2400;
    sound.setRefDistance(OBJECT_RADIO_SIZE * OBJECT_DENSITY_FACTOR * INIT_SETTINGS.sound_density);
    avObject.sound = sound;
  });
  avObject.mesh.add(sound);
}