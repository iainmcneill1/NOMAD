document.addEventListener('DOMContentLoaded', () => {

  const trips = [
    {
      location: "NYE,Leiden, Netherlands",
      date: "12/2025",
      notes: "New Years Eve and the long journey home",
      photosFolder: "DATA/IMAGES/Netherlands_2025NYE",
      photoCount: 2,
      photoNotes: [
        "Shibuya crossing at night.",         // photo 1
        "Asakusa temple visit."               // photo 2
      ]
    },
    {
      location: "Menaam/Edinburgh, Netherlands/Scotland",
      date: "12/2025",
      notes: "A little winter getaway to an Airbnb Tiny house, plus some time in the Capital",
      photosFolder: "DATA/IMAGES/Netherlands_Scotland_2025",
      photoCount: 2,
      photoNotes: [
        "",         // photo 1
        ""               // photo 2
      ]
    },
    {
      location: "Leiden/Nijmegen, Netherlands",
      date: "10/2025",
      notes: "Visited friend at her student accomodation in Leiden",
      photosFolder: "DATA/IMAGES/Netherlands_2025_10",
      photoCount: 36,
      photoNotes: [
        "",         // photo 1
        ""               // photo 2
      ]
    },
    {
      location: "Ironman Trip, Germany/France",
      date: "09/2025",
      notes: "Ironman 70.3 + Catching up with old friends",
      photosFolder: "DATA/IMAGES/Ironman_2025_09",
      photoCount: 2,
      photoNotes: [
        "",         // photo 1
        ""               // photo 2
      ]
    },
    {
      location: "Porto/Lisbon, Portugal",
      date: "08/2025",
      notes: "An amazing August adventure in Portugal! Explored the charming streets of Porto and Lisbon, indulged in some amazing food, soaked up the sun, and maybe had one too many drinks along the way. Best of all, I met some incredible people from all around the glove who made the trip truly unforgettable.",
      photosFolder: "DATA/IMAGES/Portugal_2025_08",
      photoCount: 30,
      photoNotes: [
        "Lisbon: A view of the narrow streets with the iconic Lisbon trams.", // photo 1
        "Lisbon: The South fountain of Rossio from the Elevador de Santa Justa",    // photo 2
        "Lisbon: Rua de Santa Justa from the Elevador de Santa Justa",      // photo 3
        "Lisbon: Calçada do Carmo view if the Praça Dom Pedro IV",      // photo 4
        "Lisbon: A view of the narrow streets with the iconic Lisbon trams.", // photo 5
        "Lisbon: A hot day at Praça do Comércio",    // photo 6
        "Lisbon: Old school selfie from the Musuem of Art,Architecture and Technology",      // photo 7
        "Lisbon: Ponte 25 de Abril Bridge", // photo 8
        "Lisbon: Friendly Senegalese tourist took my photo in front of the 25 de Abril",    // photo 9
        "Lisbon: Friendly Senegalese tourist took my photo in front of the 25 de Abril",      // photo 10
        "Lisbon: Sunset walk with some new friends from the Hostel",      // photo 11
        "Lisbon: Day out to Praia De Caxais Beach",      // photo 12
        "Lisbon: São Jorge Castle",      // photo 13
        "Porto: Porto Airport",      // photo 14
        "Lisbon: Some new friends (Me, Cleo, Victoria, Bella, Nathan)",      // photo 15
        "Lisbon: Some new friends (Me, Cleo, Victoria, Bella, Nathan)",      // photo 16
        "Lisbon: Intricate Cement tiles found throughout the city ",      // photo 17
        "Lisbon: Modern graffiti mixed with traditional azulejos",      // photo 18
        "Porto: First views from the Jardim Do Morro",      // photo 19
        "Porto: Start of the Porot walking tour at Câmara Municipal do Porto (City Hall)",      // photo 20
        "Porto: A stroll past the Church of Saint Ildefonso",      // photo 21
        "Porto: Looking down the Douro River at the Ponte Maria Pia",      // photo 22
        "Porto: A view of the iconic Ponte Luís I in the Distance",      // photo 23
        "Porto: South side of Porto viewing a tram crossing the Ponte Luís I",      // photo 24
        "Porto: São Bento square",      // photo 25
        "Porto: Jardins do Palácio de Cristal",      // photo 26
        "Porto: Palácio da Bolsa",      // photo 27
        "Porto: Capela de Santa Catarina",      // photo 28
        "Porto: Livraria Lello book store, yes it's as busy as it looks :)",      // photo 29
        "Porto: My favourite photo from Portugal, a simple back street behind São Bento train station",      // photo 30
      ]
    },
    {
      location: "Ontario, Canada",
      date: "2023",
      notes: "Second summer doing Camp Canada",
      photosFolder: "DATA/IMAGES/Canada_2023",
      photoCount: 34,
      photoNotes: [
        "Shibuya crossing at night.",         // photo 1
        "Asakusa temple visit."               // photo 2
      ]
    },
    {
      location: "Ontario, Canada",
      date: "2022",
      notes: "First summer doing Camp Canada",
      photosFolder: "DATA/IMAGES/Canada_2022",
      photoCount: 2,
      photoNotes: [
        "Shibuya crossing at night.",         // photo 1
        "Asakusa temple visit."               // photo 2
      ]
    },
    // Add more trips here with photoNotes array
  ];

  const travelSelect = document.getElementById('travelSelect');
  const travelNotes = document.getElementById('travelNotes');
  const travelPhotoNotes = document.getElementById('travelPhotoNotes');
  const carouselPhoto = document.getElementById('carouselPhoto');
  const prevBtn = document.getElementById('prevPhoto');
  const nextBtn = document.getElementById('nextPhoto');

  let currentTripIndex = 0;
  let currentPhotoIndex = 1;

  // Populate dropdown
  trips.forEach((trip, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${trip.location} (${trip.date})`;
    travelSelect.appendChild(option);
  });

  // Load a trip
  function loadTrip(index) {
    currentTripIndex = Number(index);
    currentPhotoIndex = 1;
    const trip = trips[currentTripIndex];

    // Trip notes
    travelNotes.textContent = trip.notes;

    // First photo
    carouselPhoto.src = `${trip.photosFolder}/${currentPhotoIndex}.jpg`;
    carouselPhoto.alt = `${trip.location} photo ${currentPhotoIndex}`;

    // Photo note
    travelPhotoNotes.textContent = trip.photoNotes?.[currentPhotoIndex - 1] || "";
  }

  // Next photo
  function nextPhoto() {
    const trip = trips[currentTripIndex];
    currentPhotoIndex = currentPhotoIndex < trip.photoCount ? currentPhotoIndex + 1 : 1;

    carouselPhoto.src = `${trip.photosFolder}/${currentPhotoIndex}.jpg`;
    carouselPhoto.alt = `${trip.location} photo ${currentPhotoIndex}`;

    travelPhotoNotes.textContent = trip.photoNotes?.[currentPhotoIndex - 1] || "";
  }

  // Previous photo
  function prevPhoto() {
    const trip = trips[currentTripIndex];
    currentPhotoIndex = currentPhotoIndex > 1 ? currentPhotoIndex - 1 : trip.photoCount;

    carouselPhoto.src = `${trip.photosFolder}/${currentPhotoIndex}.jpg`;
    carouselPhoto.alt = `${trip.location} photo ${currentPhotoIndex}`;

    travelPhotoNotes.textContent = trip.photoNotes?.[currentPhotoIndex - 1] || "";
  }

  // Event listeners
  travelSelect.addEventListener('change', (e) => loadTrip(e.target.value));
  nextBtn.addEventListener('click', nextPhoto);
  prevBtn.addEventListener('click', prevPhoto);

  // Load first trip by default
  if(trips.length) loadTrip(0);

});