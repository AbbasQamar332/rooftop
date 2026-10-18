export const hotelConfig = {
  name: 'Rooftop Resort Skardu',
  shortName: 'Rooftop Resort',
  address: 'Shigari Bala, 411 Chowk, Skardu, Gilgit-Baltistan, Pakistan.',
  roomCount: 14,
  email: 'rooftopresort99@gmail.com',
  phone: '0316-1871928 / 0355-5217615',
  whatsappNumber: '923161871928',
  whatsappLabel: 'WhatsApp: 0316-1871928',
  alternatePhone: '0355-5217615',
  metaDescription:
    'Premium mountain-view hotel website for Skardu, Gilgit-Baltistan with elegant rooms, dining, gallery, and booking enquiry information.',
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Dining', href: '#dining' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

const hotelPhoto = (filename) => `/hotel_image/${encodeURIComponent(filename)}`;

export const hotelPhotos = {
  fullExterior: hotelPhoto('homepage-courtyard.jpeg'),
  exterior: hotelPhoto('WhatsApp Image 2026-08-22 at 11.26.00 AM.jpeg'),
  twinRoom: hotelPhoto('WhatsApp Image 2026-10-12 at 7.29.46 PM.jpeg'),
  mountainViewRoom: hotelPhoto('WhatsApp Image 2026-08-22 at 11.26.01 AM.jpeg'),
  brightRoom: hotelPhoto('bright-guest-room.jpeg'),
  guestRoom: hotelPhoto('WhatsApp Image 2026-10-12 at 7.33.34 PM.jpeg'),
  classicRoom: hotelPhoto('WhatsApp Image 2026-10-12 at 7.29.45 PM.jpeg'),
  garden: hotelPhoto('WhatsApp Image 2026-10-12 at 7.33.34 PM.jpeg'),
};

export const roomData = [
  {
    title: 'Bright guest room',
    image: hotelPhotos.brightRoom,
    description: 'A light-filled bedroom photographed at the property.',
  },
  {
    title: 'Mountain-view room',
    image: hotelPhotos.mountainViewRoom,
    description: 'A guest room with mountain scenery visible through the windows.',
  },
  {
    title: 'Twin-bed room',
    image: hotelPhotos.twinRoom,
    description: 'A guest room with two beds and a comfortable seating area.',
  },
  {
    title: 'Classic guest room',
    image: hotelPhotos.classicRoom,
    description: 'A spacious guest room with a mountain view.',
  },
  {
    title: 'Guest room',
    image: hotelPhotos.guestRoom,
    description: 'A comfortable guest room with a bed and seating area.',
  },
];

export const highlights = [
  '14-room property',
  'Mountain-view rooms',
  'Mountain-view dining',
  'Scenic mountain setting',
  'Location in Shigari Bala, Skardu',
];

export const diningInfo = {
  title: 'Dining with a Mountain View',
  description:
    'Enjoy your dining experience surrounded by the scenic beauty of Skardu in a calm, elevated setting designed for relaxed moments.',
  note: 'The hotel exterior and outdoor seating are shown here; add a dedicated dining photo when available.',
};

export const experiences = [
  {
    title: 'Scenic sunrise viewpoints',
    text: 'Start the day with dramatic mountain light and quiet landscapes around Skardu.',
  },
  {
    title: 'Valley walks',
    text: 'Take in the fresh air and natural beauty with peaceful strolls near the hotel area.',
  },
  {
    title: 'Local culture',
    text: 'Explore the traditions and hospitality that define life in Gilgit-Baltistan.',
  },
  {
    title: 'Mountain dining moments',
    text: 'Share relaxed meals while enjoying panoramic views over the surrounding peaks.',
  },
];

export const galleryImages = [];

export const amenities = [
  '14-room property',
  'Mountain-view rooms',
  'Mountain-view dining',
  'Scenic mountain setting',
  'Shigari Bala location',
  'Editable amenities placeholder',
];
