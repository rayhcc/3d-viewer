import React, {useState, useEffect, useRef, useMemo} from "react"
import * as THREE from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GenFloorModel } from "./floor_model";
import { GenAxisModel } from "./axis_model";
import { DIMENSION } from "../enum";
import { Euler } from "three";


export default function Viewer(props){

    const mountRef = useRef(null);

    const scene = useMemo(() => new THREE.Scene(), []);
    const camera = useMemo(() => new THREE.PerspectiveCamera(60, window.innerWidth/ window.innerHeight, 0.1, 1000.0), []);
    const material = useMemo(() => {
        return(
            new THREE.MeshLambertMaterial({
                color: props.modelColor,
                transparent: true,
                opacity: props.modelOpacity,
                side: THREE.DoubleSide,
                wireframe: props.display.wireframe.isChecked,
            })
        );
    }, [props.modelColor, props.modelOpacity, props.display.wireframe.isChecked]);
    const pointLight = useMemo(() => new THREE.PointLight(0xFFFFFF), []);
    const ambientLight = useMemo(() => new THREE.AmbientLight(0x444444), []);
    const renderer = useMemo(() => new THREE.WebGL1Renderer(), []);
    const loader = useMemo(() => new STLLoader(), []);
    

    useEffect(() => {

        camera.up.set(0.0, 0.0, 1.0);
        camera.position.set(100.0, 0.0, 0.0);
        camera.lookAt(0.0, 0.0, 0.0);

        pointLight.position.set(100.0, 100.0, 100.0);
        scene.add(pointLight);

        scene.add(ambientLight);

        renderer.setSize(mountRef.current.offsetWidth, mountRef.current.offsetHeight);
        renderer.setClearColor(0x3D3E42, 1.0);
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);

        const handleWindowResize = () => {
            mountRef.current.removeChild(renderer.domElement); //要先把canvas移除才行

            const {width: viewerWidth, height: viewerHeight} = mountRef.current.getBoundingClientRect();
            camera.aspect = viewerWidth / viewerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(viewerWidth, viewerHeight);

            mountRef.current.appendChild(renderer.domElement);
        }

        window.addEventListener("resize", handleWindowResize);


        function render(){
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
        
        render();

        return () => {
            mountRef.current.removeChild( renderer.domElement); //每次unmounted 時都把canvas從div移除掉，這樣才不會一直疊加上去
        }
    }, [])
    


    const modelID = useRef(undefined);
    useEffect(() => {

        if(props.fileSelected.localFile){
            const reader = new FileReader();

            const input = document.getElementById("file-input");
            const file = input.files[0];
            
            reader.onload = (e) => {
                const geom = loader.parse(e.target.result);
                const mesh = new THREE.Mesh(geom, material);
                modelID.current = mesh.id;
                scene.add(mesh);
            };

            reader.readAsArrayBuffer(file);
        }
        else{
            const selectedOnlineExampleIndex = Object.values(props.fileSelected).findIndex((item) => item === true);
            
            loader.load(`./stl-model/example-${selectedOnlineExampleIndex}.stl`, (geom) => {
                const mesh = new THREE.Mesh(geom, material);
                modelID.current = mesh.id;
                scene.add(mesh);
            });
        }

    }, []);


    useEffect(() => {

        if(modelID.current){ //要先確保 STL object 已經載入了，才能夠去改 material
            scene.getObjectById(modelID.current).material = material;
        }

    }, [props.modelColor, props.modelOpacity, props.display.wireframe.isChecked])


    useEffect(() => {

        const degToRad = (deg) => deg * Math.PI / 180.0;

        if(modelID.current){
            const model = scene.getObjectById(modelID.current);

            model.position.set(props.transform.translateX, props.transform.translateY, props.transform.translateZ);
            model.rotation.set(degToRad(props.transform.rotateX), degToRad(props.transform.rotateY), degToRad(props.transform.rotateZ));
            model.scale.set(props.transform.scaleX, props.transform.scaleY, props.transform.scaleZ);
        }

        return () => {
            if(modelID.current){
                const model = scene.getObjectById(modelID.current);
                model.position.set(new THREE.Vector3(0.0, 0.0, 0.0).toArray());
                model.rotation.set(new Euler(0.0, 0.0, 0.0, "XYZ").toArray());
                model.scale.set(new THREE.Vector3(1.0, 1.0, 1.0).toArray());
            }
        }
        
    }, [props.transform]);

    
    const floorId = useRef(undefined);
    const axesId = useRef(undefined);
    useEffect(() => {
    
        //floor
        if(props.display.floor.isChecked){
            const floorModel = GenFloorModel(DIMENSION.Z, 10.0);
            floorId.current = floorModel.id;
            scene.add(floorModel);
        }
        

        //axis (要放在 floor下面，否則會被floor 重疊的獻給蓋掉，及時axis加粗也沒看不到，好像會真的沒有畫的樣子)
        if(props.display.axis.isChecked){

            const axesModel = [
                GenAxisModel(DIMENSION.X),
                GenAxisModel(DIMENSION.Y),
                GenAxisModel(DIMENSION.Z),
            ]

            axesId.current = axesModel.map((axisModel) => axisModel.id);
            axesModel.forEach((axisModel) => scene.add(axisModel));
        }

        return () => {

            if(floorId.current){
                const floorModel = scene.getObjectById(floorId.current);
                scene.remove(floorModel);
            }
            
            if(axesId.current){
                axesId.current.forEach((axisId) => {
                    const axisModel = scene.getObjectById(axisId);
                    scene.remove(axisModel);
                })
            }
        }

    }, [props.display]);


    return (
        <div ref={mountRef} className = "viewer">

        </div>
    );
}