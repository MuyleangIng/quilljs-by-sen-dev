import { useEffect, useState, useRef } from 'react';

type ApiKey = string;
type MapComponentProps = {
    apiKey: ApiKey;
};
type setMe = string;
type setSetMe = string;
const MapComponent: React.FC<MapComponentProps> = ({ apiKey }) => {
    type setMe = string;
type setSetMe = string;
type results = string;
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const geocoder = new window.google.maps.Geocoder; // Initialize geocoder
    const [setMe, setSetMe] = useState("");
    console.log("dffdf",setMe);
    
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
                    // Reverse Geocoding to get address
                    geocoder.geocode({ location: pos }, (results, status) => {
                        if (status === "OK" && results[0]) {
                            // alert("You are located at: " + results[0].formatted_address);
                            console.log("You are located at: ", results[0]);
                            console.log("You are located at: ", results[0].formatted_address);
                            setSetMe(results[0].formatted_address)
                        } else {
                            console.error("Geocode was not successful for the following reason: " + status);
                        }
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
<div className="grid items-end gap-6 mb-6 md:grid-cols-3">
    <div>
        <div className="relative z-0">
            {/* Input field */}
            <input
                type="text"
                id="standard_success"
                aria-describedby="standard_success_help"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" " 
            />
            <label
                htmlFor="standard_success"
                className="absolute text-sm text-green-600 dark:text-green-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                {setMe}  
            </label>
        </div>
    </div>
</div>


        </div>
    );
};

export default MapComponent;


// import { useEffect, useState, useRef } from 'react';

// type ApiKey = string;
// type MapComponentProps = {
//     apiKey: ApiKey;
// };

// const MapComponent: React.FC<MapComponentProps> = ({ apiKey }) => {
//     const ref = useRef<HTMLDivElement>(null);
//     const [map, setMap] = useState<google.maps.Map | null>(null);

//     useEffect(() => {
//         if (ref.current && !map) {
//             const newMap = new window.google.maps.Map(ref.current, {
//                 center: { lat: -34.397, lng: 150.644 },
//                 zoom: 8,
//             });
//             setMap(newMap);
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
//                 if (map) {
//                     map.setCenter(pos);
//                     new window.google.maps.Marker({ // Add a marker at the location
//                         position: pos,
//                         map: map,
//                         title: "You are here!"
//                     });
//                 }
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

