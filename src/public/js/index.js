const socket = io()

// Styles the map with tiles and attributions
function styleMap(map) {
    const tileURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

    const attribution = {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }

    L.tileLayer(tileURL, attribution).addTo(map);
}

// Configure map options
function configMapOptions(map) {
    // Locate map at specific coordinates (Colombia)
    map.setView([4.1156735, -72.9301367], 10)

    // Enable high accuracy location to locate where the user connected from
    map.locate({ enableHighAccuracy: true })
}

function initMap() {
    const map = L.map('mapid')
    styleMap(map)
    configMapOptions(map)
    return map
}


function generateRandomCoordinates(lat, lng) {
    // Add random distance to each new coordinate. That way each connection can appear as a different marker even if it's from the same place (useful for localhost testing)
    const distance = Math.random() * (0.2 - 0.01) + 0.01
    return [lat + distance, lng + distance]
}


// Map initialization
const map = initMap()

// Detect event 'locationFound' and print result of client's found location
map.on('locationfound', e => {
    // Add random distance to each new connection. That way each connection can appear as a different marker even if it's from the same place
    const distance = Math.random() * (0.2 - 0.01) + 0.01
    const [lat, lng] = generateRandomCoordinates(e.latlng.lat, e.latlng.lng)

    const latlng = [lat, lng]

    const marker = L.marker(latlng).addTo(map)
        .bindPopup(`You are here!\nlat:${lat}\nlng:${lng}`)
    
    map.addLayer(marker)  // Add marker to the map
    marker.openPopup()  // Open it in the map

    socket.emit('userCoordinates', latlng)
})


// Draws marker in the coordinates position for each new user connected
socket.on('newUserConnected', latlng => {
    const [lat, lng] = latlng
    const marker = L.marker(latlng).addTo(map)
        .bindPopup(`You are here!\nlat:${lat}\nlng:${lng}`)
    map.addLayer(marker)

    console.log(`New user connected from coordinates:\n\nLatitude: ${lat}\nLongitude ${lng}`)
})
