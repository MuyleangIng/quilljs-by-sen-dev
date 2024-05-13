import { useEffect, useState, useRef } from 'react';

type ApiKey = string;
type MapComponentProps = {
    apiKey: ApiKey;
};

const MapComponent: React.FC<MapComponentProps> = ({ apiKey }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    useEffect(() => {
        if (ref.current && !map) {
            const newMap = new window.google.maps.Map(ref.current, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
            setMap(newMap);
        }
    }, [ref, map]);

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                console.log("Location retrieved: ", pos); // Log the position
                if (map) {
                    map.setCenter(pos);
                    new window.google.maps.Marker({ // Add a marker at the location
                        position: pos,
                        map: map,
                        title: "You are here!"
                    });
                }
            }, (error) => {
                console.error("Error: The Geolocation service failed. Error code: ", error.code);
                alert("Error: The Geolocation service failed. " + error.message);
            });
        } else {
            alert("Error: Your browser doesn't support geolocation.");
        }
    };
    
    return (
        <div>
            <div ref={ref} style={{ width: 400, height: 300 }} />
            <button onClick={getCurrentLocation}>Locate Me</button>
        </div>
    );
};

export default MapComponent;

// // components/MapComponent.js
// import { useEffect, useState, useRef } from 'react';

// type ApiKey = string;
// type MapComponentProps = {
//     apiKey: ApiKey;
// };

// const MapComponent: React.FC<MapComponentProps> = ({ apiKey }) => {
//     const ref = useRef(null);
//     // const [map, setMap] = useState();
//     const [map, setMap] = useState<google.maps.Map>();

//     useEffect(() => {
//         if (ref.current && !map) {
//             setMap(new window.google.maps.Map(ref.current, {
//                 center: { lat: -34.397, lng: 150.644 },
//                 zoom: 8,
//             }));
//         }
//     }, [ref, map]);


//     const getCurrentLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition((position) => {
//                 const pos = {
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude,
//                 };
//                 console.log("Location retrieved: ", pos); // Log the position
//                 map.setCenter(pos);
//                 new window.google.maps.Marker({ // Add a marker at the location
//                     position: pos,
//                     map: map,
//                     title: "You are here!"
//                 });
//             }, (error) => {
//                 console.error("Error: The Geolocation service failed. Error code: ", error.code);
//                 alert("Error: The Geolocation service failed. " + error.message);
//             });
//         } else {
//             alert("Error: Your browser doesn't support geolocation.");
//         }
//     };
    
//     return (
//         <div>
//             <div ref={ref} style={{ width: 400, height: 300 }} />
//             <button onClick={getCurrentLocation}>Locate Me</button>
//         </div>
//     );
// };

// export default MapComponent;
