import * as three from "./three.js"
import * as cannon from "./cannon-es.js"
import { GLTFLoader } from "./GLTFLoader.js"
// import { TransformControls } from "./TransformControls.js"
import { Water } from "./Water.js"
document.getElementById("jdt").style.width="20%"
import { XRButton } from "./XRButton.js"
import { XRControllerModelFactory } from "./XRControllerModelFactory.js"
//配置
let scene,camera,renderer,world,directlight,bg,plane,player,ps,dr,xr
scene = new three.Scene();
camera = new three.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.y=0
var camerag=new three.Group()
camerag.add(camera)
scene.add(camerag)
renderer = new three.WebGLRenderer({antialias:true});
xr=renderer.xr
eval("outxr=camerag")
xr.enabled=true
document.body.appendChild(XRButton.createButton(renderer, {
	'optionalFeatures': ['depth-sensing'],
	'depthSensing': { 'usagePreference': ['gpu-optimized'], 'dataFormatPreference': [] },
	sessionMode: 'immersive-vr',
	referenceSpaceType: 'local-floor'
}));

const controllerModelFactory = new XRControllerModelFactory();
var controller1 = xr.getController(0);
var gamepad1,gamepad2
controller1.addEventListener('selectstart',(e)=>{player.velocity.y=5});
controller1.addEventListener("connected", (e) => { gamepad1 = e.data.gamepad })

var controller2 = xr.getController(1);
controller2.addEventListener("connected", (e) => { gamepad2 = e.data.gamepad})

renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById("content").appendChild( renderer.domElement );
renderer.domElement.style.position="fixed"
renderer.domElement.style.pointEvents="none"
renderer.domElement.dataset.engine="地图编辑器"
window.addEventListener("resize", () => {renderer.setSize(window.innerWidth, window.innerHeight);camera.aspect = window.innerWidth / window.innerHeight;camera.updateProjectionMatrix();});
renderer.shadowMap.enabled=true
var diff,nor,arm
diff=new three.TextureLoader().load("diff.jpg")
nor=new three.TextureLoader().load("nor.jpg")
arm=new three.TextureLoader().load("arm.jpg")
diff.wrapS=three.RepeatWrapping
diff.wrapT=three.RepeatWrapping
nor.wrapS=three.RepeatWrapping
nor.wrapT=three.RepeatWrapping
arm.wrapS=three.RepeatWrapping
arm.wrapT=three.RepeatWrapping
var geo=new three.PlaneGeometry(100,100)
geo.attributes.uv.ge
//console.log(geo.attributes.uv.array[2])
geo.attributes.uv.array[1]=100
geo.attributes.uv.array[2]=100
geo.attributes.uv.array[3]=100
geo.attributes.uv.array[6]=100
ps=new three.Mesh(geo,new three.MeshStandardMaterial({map:diff,normalMap:nor,aoMap:arm,roughnessMap:arm,metalnessMap:arm}))
world = new cannon.World({gravity: new cannon.Vec3(0, -9.82, 0)})
scene.add(new three.AmbientLight(0xffffff,2))
directlight=new three.DirectionalLight(0xffffff,3)
directlight.castShadow=true
directlight.position.y=20
directlight.position.x=20
directlight.position.z=40
directlight.target.position.z=20
directlight.target.updateWorldMatrix(true,true)
scene.add(directlight)
bg = new three.TextureLoader().load("1.png");
bg.mapping=three.EquirectangularReflectionMapping
scene.background=bg
scene.environment=bg
plane=new cannon.Body({mass:0,shape:new cannon.Plane(),material:new cannon.Material({friction:1,restitution:0})})
plane.quaternion.setFromEuler(-Math.PI / 2, 0,0)
world.addBody(plane)
//ps=new three.Mesh(new three.PlaneGeometry(100,100),new three.MeshStandardMaterial({color:"red"}))
ps.rotation.x=-Math.PI/2
ps.castShadow=true
ps.receiveShadow=true
scene.add(ps)
player=new cannon.Body({mass:1,shape:new cannon.Cylinder(0.5,0.5,1.5),material:new cannon.Material({friction:1,restitution:0})})
player.addShape(new cannon.Sphere(0.5),new cannon.Vec3(0,-0.75,0))
player.position.y=3
world.addBody(player)
dr=document.createElement("img")
dr.src="tiao.png"
dr.style.position="fixed"
dr.style.right="50px"
dr.style.bottom="50px"

renderer.domElement.style.touchAction="none"


dr.addEventListener("touchstart",function(){
	player.velocity.y=5
})
let x,y,x2,y2,id,id2
renderer.domElement.addEventListener("touchstart",(e)=>{
	x=e.touches[e.touches.length-1].clientX
	y=e.touches[e.touches.length-1].clientY
	id=e.touches[e.touches.length-1].identifier
	
})
function dicfinder(ider,list){
    for (let i=0;i<list.length;i+=1){
        if (list[i].identifier==ider){
			return i
		}
	}
	
}
renderer.domElement.addEventListener("touchmove",(e)=>{
    let n=dicfinder(id,e.touches)
    let dx=e.touches[n].clientX-x
	let dy=e.touches[n].clientY-y
	x=e.touches[e.touches.length-1].clientX
	y=e.touches[e.touches.length-1].clientY
	camera.rotation.x-=(dy)/200;
	camera.rotation.y-=(dx)/200;
	if(camera.rotation.x<-1.57){camera.rotation.x=-1.57}
	if(camera.rotation.x>1.57){camera.rotation.x=1.57}
	//consoleface.innerText+=(" "+e.touches[e.touches.length-1].identifier+" "+e.touches[e.touches.length-1].clientX+" "+e.touches[e.touches.length-1].clientY)
})


let s=new three.Group()
document.addEventListener("keydown",(e)=>{if (e.code=="Space"){player.velocity.y=5}else if(e.code=="KeyW"){}})



let umb=[new three.Group(),new three.Group(),new three.Group(),new three.Group(),new three.Group()]
let zz=new three.Group()
let flower=new three.Group()
let hp=new three.Group()
let flower2=[new three.Group(),new three.Group(),undefined,undefined,undefined,undefined]
function a(){new GLTFLoader().load("s1.glb",(sc)=>{umb[0].copy(sc.scene);b()})}
function b(){new GLTFLoader().load("s2.glb",(sc)=>{umb[1].copy(sc.scene);c()})}
function c(){new GLTFLoader().load("s3.glb",(sc)=>{umb[2].copy(sc.scene);d();document.getElementById("jdt").style.width="40%"})}
function d(){new GLTFLoader().load("s4.glb",(sc)=>{umb[3].copy(sc.scene);e()})}
function e(){new GLTFLoader().load("light.glb",(sc)=>{scene.add(sc.scene);sc.scene.position.set(0,5,+4);sc.scene.rotation.y=1.573;f()})}
function f(){new GLTFLoader().load("s5.glb",(sc)=>{umb[4].copy(sc.scene);i()})}
function i(){new GLTFLoader().load("q.glb",(sc)=>{scene.add(sc.scene);sc.scene.position.set(1.5,-0.2,21);sc.scene.scale.y=0.5;j()})}
function j(){new GLTFLoader().load("hh.glb",(sc)=>{flower.copy(sc.scene);k()})}
function k(){new GLTFLoader().load("hp.glb",(sc)=>{hp.copy(sc.scene);m()})}
function m(){new GLTFLoader().load("flower1.glb",(sc)=>{flower2[0].copy(sc.scene);n()})}
function n(){new GLTFLoader().load("flower2.glb",(sc)=>{flower2[1].copy(sc.scene);o()})}
function l(){new GLTFLoader().load("dgd.glb",(sc)=>{scene.add(sc.scene);sc.scene.position.set(1.5,2,35);h()})}
function o(){new GLTFLoader().load("mt.glb",(sc)=>{scene.add(sc.scene);sc.scene.position.set(-11,0,+4);sc.scene.rotation.y=0.3;document.getElementById("jdt").style.width="60%";l()})}
function h(){new GLTFLoader().load("zz.glb",(sc)=>{zz.copy(sc.scene);p()})}
function p(){new GLTFLoader().load("zhuozi.glb",(sc)=>{scene.add(sc.scene);sc.scene.position.set(5,0,2.5);r()})}
function r(){new GLTFLoader().load("yy.glb",(sc)=>{scene.add(sc.scene);sc.scene.position.set(5,0.9,2.5);q()})}
function q(){new GLTFLoader().load("tz2.glb",(sc)=>{scene.add(sc.scene);sc.scene.position.set(5.7,1,7.5);sc.scene.rotation.y=-1.57;;sc.scene.scale.set(0.5,0.5,0.5);document.getElementById("jdt").style.width="80%";finish()})}


new GLTFLoader().load("gjz.glb",(sc)=>{
	var k=0;for(k in sc.scene.children){
		sc.scene.children[k].castShadow = true;
		sc.scene.children[k].receiveShadow = true;
	}s.copy(sc.scene);a()})





var lst=[[-2.5,4.5,0,0],[2.5,4.5,0,0],[7.5,4.5,0,0],[7.5,-1.5,0,3.1415926],[-5.12666,0.15,0,2.059488338],[-2.79333,-4.275,0,2.059488338],[-0.46,-8.7,0,2.059488338],[4.85,-5.9,0,-1.08210422]]



//物理墙


world.addBody(new cannon.Body({mass:0,shape:new cannon.Cylinder(5,5,10,8),position:new cannon.Vec3(6,0,-10)}))
world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(0.05,10,10)),position:new cannon.Vec3(6,0,0)}))
world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(0.05,10,2.5)),position:new cannon.Vec3(-3,0,7.5)}))
world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(1,10,2.5)),position:new cannon.Vec3(3.5,0,12.5)}))
world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(1,10,2.5)),position:new cannon.Vec3(-0.5,0,12.5)}))
world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(0.5,10,6)),position:new cannon.Vec3(-1,0,20.5)}))
world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(0.5,10,6)),position:new cannon.Vec3(4,0,20.5)}))
world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(2,0.65,6)),position:new cannon.Vec3(1.5,-0.2,20.5)}))
world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(25,10,0.5)),position:new cannon.Vec3(-26,0,26)}))
world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(25,10,0.5)),position:new cannon.Vec3(29,0,26)}))
world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(25,10,0.5)),position:new cannon.Vec3(0,0,38)}))
world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(0.5,10,6)),position:new cannon.Vec3(-10,0,32)}))
world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(0.5,10,6)),position:new cannon.Vec3(14,0,32)}))
world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(1.5,10,0.5)),position:new cannon.Vec3(-1.5,0,10)}))
world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(1.5,10,0.5)),position:new cannon.Vec3(4.5,0,10)}))
world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(4.5,10,0.5)),position:new cannon.Vec3(-10,0,+4),quaternion:new cannon.Quaternion(0,0.8571672,0,0.515)}))
//var lsbl=new three.Mesh(new three.BoxGeometry(9,20,1),new three.MeshBasicMaterial({color:"purple"}))
//lsbl.position.set(-10,0,+4)
//lsbl.quaternion.set(0,0.8571672,0,0.515)
//scene.add(lsbl)




world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(0.05,10,2.5)),position:new cannon.Vec3(-5.2,0,+6.1736789),quaternion:new cannon.Quaternion(0,0.8571672,0,0.515)}))
world.addBody(new cannon.Body({mass:0,shape:new cannon.Box(new cannon.Vec3(0.05,10,10)),position:new cannon.Vec3(-2.8168,0,-5.297),quaternion:new cannon.Quaternion(0,0.8571672,0,0.515)}))
var lst2=[[0,4.5,-2],[-2.12255,4.5,-0.4448],[-4.7,4.5,-0.17],[-7.5,4.5,1.78],[-5.2,4.5,2.32],[-8.2,5.5,2.6],[-5.82,5.5,1.17],[-3.25,5.5,1.84],[-2,5.5,0.23],[0,5.5,0]]
var umb2=[]
var lightdown,lightdown2,water
function finish(){
    var vide=new three.Mesh(new three.PlaneGeometry(2,1.125),new three.MeshBasicMaterial({map:new three.VideoTexture(document.getElementById("3"))}))
	document.getElementById("3").play()
	scene.add(vide)
	vide.position.set(-2,1,7.5)
	vide.rotation.y=1.57
	var vide2=new three.Mesh(new three.PlaneGeometry(2,1.125),new three.MeshBasicMaterial({map:new three.TextureLoader().load("game.png")}))
	scene.add(vide2)
	vide2.position.set(5,1,-2.5)
	vide2.rotation.y=-1.57
	for (var i=0;i<=7;i+=1){
		let t=new three.Group();
		t.copy(s)
		t.position.x=lst[i][1]
		t.position.y=lst[i][2]
		t.position.z=lst[i][0]
		t.rotation.y=lst[i][3]
		scene.add(t)
	}
	player.position.x=1.5
player.position.z=0
	for (var i in umb){
		let t=new three.Group()
		t.copy(umb[i])
		t.position.y=lst2[i][1]
		t.position.x=lst2[i][0]
		t.position.z=lst2[i][2]
		t.scale.copy(new three.Vector3(0.9,0.9,0.9))
		scene.add(t)
		umb2.push(t)
	}
	for (var i in umb){
		let t=new three.Group()
		t.copy(umb[i])
		t.position.y=lst2[new Number(i)+5][1]
		t.position.x=lst2[new Number(i)+5][0]
		t.position.z=lst2[new Number(i)+5][2]
		t.scale.copy(new three.Vector3(0.9,0.9,0.9))
		t.rotation.x=3.1415926
		scene.add(t)
		umb2.push(t)
		
	}
    
    flower2[2]=flower2[0].clone()
	flower2[4]=flower2[0].clone()
	flower2[3]=flower2[1].clone()
	flower2[5]=flower2[1].clone()
	flower2[0].position.set(-9,0,4)
	    scene.add(flower2[0])
		flower2[1].position.set(-8,0,4)
	    scene.add(flower2[1])
		flower2[2].position.set(-8,0,3)
	    scene.add(flower2[2])
		flower2[3].position.set(-9,0,3)
	    scene.add(flower2[3])
		flower2[4].position.set(-10,0,2)
	    scene.add(flower2[4])
		flower2[5].position.set(-9,0,2)
	    scene.add(flower2[5])
        hp.children[0].castShadow=hp.children[1].castShadow=hp.children[2].castShadow=hp.children[0].receiveShadow=hp.children[1].receiveShadow=hp.children[2].receiveShadow=true
		scene.add(hp)
		hp.position.set(-5,-0.3,30)
		var hp2=hp.clone()
		hp.position.set(8,-0.3,30)
		hp.rotation.y=1.5732
		scene.add(hp2)
	for (var i=11;i<15;i+=1){
        var t=zz.clone()
		t.position.z=i
		t.rotation.y=Math.random()*Math.PI
		scene.add(t)
	}
    
	for (var i=11;i<15;i+=1){
        var t=zz.clone()
		t.position.x=3
		t.rotation.y=Math.random()*Math.PI
		t.position.z=i
		scene.add(t)
	}
    lightdown=new three.Mesh(new three.BoxGeometry(1,1,4),new three.MeshBasicMaterial({color:0x0000ff}))
	lightdown.position.set(0,-0.4,12.5)
	scene.add(lightdown)
	lightdown2=new three.Mesh(new three.BoxGeometry(1,1,4),new three.MeshBasicMaterial({color:0x0000ff}))
	lightdown2.position.set(3,-0.4,12.5)
	scene.add(lightdown2)
	var map1=new three.TextureLoader().load("map.jpg")
	var pas=new three.Mesh(new three.PlaneGeometry(2,2),new three.MeshBasicMaterial({map:map1,alphaMap:map1,transparent:true,side:three.DoubleSide}))
	pas.position.set(1,4,5)
	pas.rotation.x=1.57
	scene.add(pas)
    // var ts=new TransformControls(camera,document.getElementById("content"))
    // scene.add(ts)
    //ts.attach(umb2[8])
    
for (var i=16;i<24;i+=1){
	var t=flower.clone()
	t.position.z=i
	t.scale.set(2,2,2)
	t.position.x=-2
	t.rotation.y=Math.random()*Math.PI
	scene.add(t)
}

for (var i=16;i<24;i+=1){
	var t=flower.clone()
	t.position.x=5
	t.scale.set(2,2,2)
	t.rotation.y=Math.random()*Math.PI
	t.position.z=i
	scene.add(t)
}

    water=new Water(new three.PlaneGeometry(100,10),{textureWidth: 512,textureHeight: 512,waterNormals: new three.TextureLoader().load( 'waternormals.jpg', function ( texture ){texture.wrapS = texture.wrapT = three.RepeatWrapping;}),sunDirection: new three.Vector3(),sunColor: 0xffffff,waterColor: 0x0077ff,distortionScale: 3.7})
    water.position.y=0.05
	water.position.z=20
	scene.add(water)

    water.rotation.x=-1.573


	document.getElementById("content").removeChild(document.getElementById("6"))
	document.getElementById("content").removeChild(document.getElementById("bot"))

	// document.getElementById("content").appendChild(dr3)
	// document.getElementById("content").appendChild(dr2)
	// document.getElementById("content").appendChild(dr)
	// document.getElementById("content").appendChild(dr4)
	waitfunt()
	animate()
}
function atan2(x,y){
	if (x==0 && y==0){
        return 0
	}else{
		return Math.atan2(y,x)
	}
}
// let dr2=document.createElement("img")
// dr2.src="bg.png"
// dr2.style.position="fixed"
// dr2.style.left="10px"
// dr2.style.bottom="10px"
// dr2.style.width="400px"

// let dr3=document.createElement("img")
// dr3.src="bt.png"
// dr3.style.position="fixed"
// dr3.style.left="110px"
// dr3.style.bottom="115px"
// dr3.style.width="200px"

// let dr4=document.createElement("div")
// dr4.style.position="fixed"
// dr4.style.left="60px"
// dr4.style.bottom="60px"
// dr4.style.width="300px"
// dr4.style.height="300px"

// dr4.addEventListener("touchstart",(e)=>{
// type=true
// 	x2=e.touches[e.touches.length-1].clientX
// 	y2=e.touches[e.touches.length-1].clientY
// 	id2=e.touches[e.touches.length-1].identifier
// 	var dx=x2-210
// 	var dy=window.innerHeight-y2-210
// 	if (dx<-150){
// 		dx=-150
// 	}
// 	else if (dx>150){
// 		dx=150
// 	}
// 	if (dy<-150){
// 		dy=-150
// 	}
// 	else if (dy>150){
// 		dy=150
// 	}
// 	dr3.style.left=(110+dx)+"px"
// 	dr3.style.bottom=(115+dy)+"px"
// 	pv.z=-dx/50*Math.sin(camera.rotation.y)-dy/50*Math.cos(camera.rotation.y)
// 	pv.x=-dy/50*Math.sin(camera.rotation.y)+dx/50*Math.cos(camera.rotation.y)
    
// })
// var pv={x:0,z:0}
// dr4.addEventListener("touchmove",(e)=>{
// 	let n=dicfinder(id2,e.touches)
// 	x2=e.touches[n].clientX
// 	y2=e.touches[n].clientY
// 	var dx=x2-210
// 	var dy=window.innerHeight-y2-210
// 	if (dx<-150){
// 		dx=-150
// 	}
// 	else if (dx>150){
// 		dx=150
// 	}
// 	if (dy<-150){
// 		dy=-150
// 	}
// 	else if (dy>150){
// 		dy=150
// 	}
// 	dr3.style.left=(110+dx)+"px"
// 	dr3.style.bottom=(115+dy)+"px"
// 	pv.z=-dx/50*Math.sin(camera.rotation.y)-dy/50*Math.cos(camera.rotation.y)
// 	pv.x=-dy/50*Math.sin(camera.rotation.y)+dx/50*Math.cos(camera.rotation.y)
// })
// dr4.addEventListener("touchend",(e)=>{
// type=false
// 	dr3.style.left=(110)+"px"
// 	dr3.style.bottom=(115)+"px"
// 	pv.x=0
// 	pv.z=0
// })


var yg=new three.Mesh(new three.PlaneGeometry(0.5,0.5),new three.MeshBasicMaterial({color:"white",side:three.DoubleSide,transparent:true,alphaMap:new three.TextureLoader().load("yg.png")}))
camerag.add(yg)
yg.position.set(0,0,0)
yg.rotation.x=Math.PI/2






var type=false
var g=new cannon.Vec3(0,1,0)
var qua=new cannon.Quaternion(0,0,0,1)
var sl=0
camera.rotation.order="YXZ"
renderer.setAnimationLoop(animate)
camerag.position.copy(player.position)
function animate() {
	// requestAnimationFrame(animate)
	world.fixedStep()
    water.material.uniforms[ 'time' ].value += 0.1 / 60
	camerag.position.copy(player.position)
	camerag.position.y-=1
	player.quaternion.copy(qua)

	if(gamepad2){
		if (gamepad2.buttons[3].pressed) {
			yg.visible=true
		}
		if (gamepad2.axes[2] != 0 || gamepad2.axes[3] != 0){
			yg.visible = true
			yg.material.color.r = 0
			player.velocity.z = -gamepad2.axes[2] * Math.sin(camera.rotation.y) * 4 + gamepad2.axes[3] * Math.cos(camera.rotation.y) * 4
			player.velocity.x = gamepad2.axes[3] * Math.sin(camera.rotation.y) * 4 + gamepad2.axes[2] * Math.cos(camera.rotation.y) * 4
			yg.position.x=player.velocity.x/16
			yg.position.z = player.velocity.z/16
		} else {
			yg.material.color.r=1
			player.velocity.x = 0
			player.velocity.z = 0
			yg.position.x=0
			yg.position.z=0
			if (!gamepad2.buttons[3].pressed){
				yg.visible = false
			}
		}
	}

    if (type){
    player.applyForce(g)
    }
	renderer.render(scene,camera)
	sl+=0.4
	if (sl>360){sl=0}
	lightdown.material.color.set(Math.max((Math.abs(sl-180)-60)/120,0),Math.max((120-Math.abs(sl-120))/120,0),Math.max((120-Math.abs(sl-240))/120,0))
	lightdown2.material.color.set(Math.max((Math.abs(sl-180)-60)/120,0),Math.max((120-Math.abs(sl-120))/120,0),Math.max((120-Math.abs(sl-240))/120,0))
	zz.children[0].material.emissive.set(Math.max((Math.abs(sl-180)-60)/120,0),Math.max((120-Math.abs(sl-120))/120,0),Math.max((120-Math.abs(sl-240))/120,0))
    gamepad1
}




const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
async function waitfunt(){
	while (true){
		await sleep(2)
		if ((player.position.x>3)&&(player.position.x<6)&&(player.position.z<0)&&(player.position.x>-5)){
			window.open("https://nemo.codemao.cn/w/254719525","_self")
			break
		}
	}
}



// dr4.style.touchAction="none"
// dr2.style.touchAction="none"
// dr3.style.touchAction="none"
// dr.style.touchAction="none"

//console.log(directlight.shadow.camera.left)
directlight.shadow.camera.left=-20
directlight.shadow.camera.right=20
directlight.shadow.camera.top=20
directlight.shadow.camera.bottom=-20
directlight.shadow.radius=2
directlight.shadow.bias=+0.00011
//scene.add(new three.CameraHelper(directlight.shadow.camera))
//scene.add(new three.DirectionalLightHelper(directlight))
//scene.add(new three.AxesHelper(100))


