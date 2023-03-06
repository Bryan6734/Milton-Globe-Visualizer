import * as THREE from "//unpkg.com/three";
import * as THREEGLOBE from "//unpkg.com/three-globe";

const markerSvg = `<svg viewBox="-4 0 36 36">
      <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
      <circle fill="black" cx="14" cy="14" r="7"></circle>
      </svg>`;

const world = Globe({ antialias: true, alpha: true }, true, true)
  .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
  .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
  .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png");

world.controls.dampingFactor = 0.05;
world.controls.enableDamping = true;

fetch("coordinates.json")
  .then((response) => response.json())
  .then((coords) => {
    coordinates = [];

    coords.forEach((coord) => {
      let data = {
        lat: coord[0],
        lng: coord[1],
        size: 20,
        color: "pink",
      };

      coordinates.push(data);
    });

    return coordinates;
  })
  .then((coords) => {
    world.htmlElementsData(coords);
    world.htmlElement((coord) => {
      const marker = document.createElement("div");
      marker.innerHTML = markerSvg;
      marker.style.color = coord.color;
      marker.style.width = `${coord.size}px`;

      return marker;
    })(document.getElementById("globeViz"));
  });
const globeMaterial = world.globeMaterial();
globeMaterial.bumpScale = 10;
new THREE.TextureLoader().load(
  "//unpkg.com/three-globe/example/img/earth-water.png",
  (texture) => {
    globeMaterial.specularMap = texture;
    globeMaterial.specular = new THREE.Color("grey");
    globeMaterial.shininess = 15;
  }
);

setTimeout(() => {});
