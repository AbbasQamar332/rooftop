import { useEffect, useMemo, useState } from 'react';
import './App.css';
import {
  hotelConfig,
  navLinks,
  roomData,
  highlights,
  diningInfo,
  experiences,
  galleryImages,
  hotelPhotos,
} from './hotelConfig';

const heroImage = hotelPhotos.fullExterior;
const diningImage = hotelPhotos.exterior;
const aboutImage = hotelPhotos.garden;
const locationImage = hotelPhotos.garden;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneOrEmail: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    roomType: '',
    requests: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const contactMessage = useMemo(() => {
    return `Hello, I am interested in booking a room at ${hotelConfig.name} in Skardu. Please share the room options, rates, and availability for my requested dates.`;
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  const openWhatsapp = () => {
    if (!hotelConfig.whatsappNumber) {
      window.alert('WhatsApp number is not configured yet. Please add the official hotel number in the configuration file.');
      return;
    }
    const url = `https://wa.me/${hotelConfig.whatsappNumber}?text=${encodeURIComponent(contactMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const whatsappIcon = (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M20.52 3.48A11.76 11.76 0 0 0 12.05 0C5.52 0 .25 5.27.25 11.8c0 2.08.54 4.12 1.57 5.9L.2 23.8l6.36-1.64A11.8 11.8 0 0 0 12.05 24c6.53 0 11.8-5.27 11.8-11.8 0-3.15-1.23-6.12-3.33-8.32ZM12.05 21.6c-1.83 0-3.62-.5-5.17-1.44l-.37-.22-3.77.97 1.01-3.68-.24-.38a9.78 9.78 0 0 1-1.49-5.05c0-5.4 4.39-9.79 9.8-9.79 2.61 0 5.07 1.02 6.92 2.87a9.72 9.72 0 0 1 2.86 6.92c0 5.4-4.39 9.8-9.8 9.8Zm5.37-7.34c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.77.95-.94 1.14-.17.2-.35.22-.64.07-.29-.15-1.22-.45-2.32-1.44-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.66-1.59-.9-2.17-.24-.57-.49-.49-.66-.49h-.57c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.08 3.2 5.04 4.48.7.3 1.25.49 1.67.63.71.23 1.35.2 1.86.12.56-.08 1.72-.7 1.96-1.38.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.56-.35Z" fill="currentColor"/>
    </svg>
  );

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!formData.phoneOrEmail.trim()) {
      nextErrors.phoneOrEmail = 'Please add your phone number or email.';
    }
    if (!formData.checkIn) nextErrors.checkIn = 'Please choose a check-in date.';
    if (!formData.checkOut) nextErrors.checkOut = 'Please choose a check-out date.';
    if (formData.checkIn && formData.checkOut && formData.checkOut <= formData.checkIn) {
      nextErrors.checkOut = 'Check-out must be after check-in.';
    }
    if (!formData.guests || Number(formData.guests) < 1) {
      nextErrors.guests = 'Please enter at least 1 guest.';
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (formData.checkIn && new Date(formData.checkIn) < today) {
      nextErrors.checkIn = 'Check-in date cannot be in the past.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(false);

    if (!validateForm()) return;

    const summary = {
      guest: formData.name,
      contact: formData.phoneOrEmail,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests,
      roomType: formData.roomType || 'Flexible based on availability',
      requests: formData.requests || 'No special requests',
    };

    console.log('Hotel enquiry submitted:', summary);
    setSubmitted(true);
    setFormData({
      name: '',
      phoneOrEmail: '',
      checkIn: '',
      checkOut: '',
      guests: '2',
      roomType: '',
      requests: '',
    });
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  return (
    <div className="page-shell">
      <header className={`topbar ${scrolled ? 'solid' : ''}`}>
        <nav className="navbar container" aria-label="Main navigation">
          <a href="#home" className="brand" aria-label="Rooftop Resort Skardu home">
            <span className="brand-mark">RR</span>
            <span>{hotelConfig.shortName}</span>
          </a>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`nav-panel ${menuOpen ? 'open' : ''}`} id="mobile-menu">
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={handleNavClick}>{link.label}</a>
                </li>
              ))}
            </ul>
            <a className="button primary small" href="#contact">
              Book Your Stay
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" style={{ backgroundImage: `url("${heroImage}")` }} />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <p className="eyebrow">SHIGARI BALA · SKARDU · GILGIT-BALTISTAN</p>
            <h1>Wake Up to the Beauty of the Mountains</h1>
            <p className="hero-subtitle">
              Discover a peaceful mountain-view stay in Shigari Bala, Skardu, where scenic surroundings and welcoming hospitality create a memorable experience.
            </p>
            <div className="cta-row">
              <a className="button primary" href="#rooms">
                Explore Our Rooms
              </a>
              <a className="button secondary" href="#contact">
                Enquire About Your Stay
              </a>
            </div>
          </div>
        </section>

        <section className="section rooms" id="rooms">
          <div className="container section-heading">
            <p className="eyebrow dark">Mountain stay</p>
            <h2>Stay Closer to Nature</h2>
            <p>
              Experience the comfort of a mountain-view stay in Skardu, surrounded by remarkable scenery and peaceful surroundings.
            </p>
          </div>

          <div className="container room-summary-row">
            <div className="summary-box">
              <span className="summary-number">14</span>
              <span className="summary-label">rooms</span>
            </div>
            <div className="summary-box">
              <span className="summary-copy">Mountain-view accommodation</span>
            </div>
            <div className="summary-box">
              <span className="summary-copy">Scenic and tranquil surroundings</span>
            </div>
          </div>

          <div className="container room-grid">
            {roomData.map((room, index) => (
              <article className="room-card reveal" key={room.title + index}>
                <div className="room-image-wrap">
                  <img src={room.image} alt={room.title} />
                </div>
                <div className="room-content">
                  <div className="room-header">
                    <h3>{room.title}</h3>
                    <span className="room-tag">Mountain view</span>
                  </div>
                  <p>{room.description}</p>
                  <a
                    href="#contact"
                    className="text-link"
                    onClick={() => setFormData((current) => ({ ...current, roomType: room.title }))}
                  >
                    Enquire about this room
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section dining" id="dining">
          <div className="container dining-layout">
            <div className="dining-image reveal">
              <img src={diningImage} alt="Hotel outdoor seating with mountain scenery" />
            </div>
            <div className="dining-copy reveal">
              <p className="eyebrow dark">Dining</p>
              <h2>{diningInfo.title}</h2>
              <p>{diningInfo.description}</p>
              <p className="dining-note">{diningInfo.note}</p>
              <div className="cta-row secondary-row">
                <a className="button primary" href="#gallery">
                  View Gallery
                </a>
                <button className="button secondary" type="button" onClick={openWhatsapp}>
                  Enquire by WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="container about-layout">
            <div className="about-copy reveal">
              <p className="eyebrow dark">About the hotel</p>
              <h2>A Peaceful Escape in the Mountains of Skardu</h2>
              <p>
                Set in the scenic surroundings of Shigari Bala, the hotel offers a tranquil mountain-view stay in Skardu, with comfortable accommodation and a dining experience shaped by the region’s natural beauty.
              </p>
              <p>
                Guests are welcomed to a quiet setting that balances relaxed hospitality with the stunning landscape of Gilgit-Baltistan.
              </p>
            </div>
            <div className="about-image reveal">
              <img src={aboutImage} alt="Hotel garden walkway and outdoor surroundings" />
            </div>
          </div>
        </section>

        <section className="section highlights" id="experiences">
          <div className="container section-heading">
            <p className="eyebrow dark">Moments to enjoy</p>
            <h2>Hotel Highlights</h2>
          </div>

          <div className="container feature-grid">
            {highlights.map((item, index) => (
              <div className="feature-card reveal" key={item + index}>
                <span className="feature-icon">✦</span>
                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className="container experiences-grid">
            {experiences.map((experience) => (
              <article className="experience-card reveal" key={experience.title}>
                <h3>{experience.title}</h3>
                <p>{experience.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section gallery" id="gallery">
          <div className="container section-heading">
            <p className="eyebrow dark">Gallery</p>
            <h2>Moments from the Mountain View</h2>
          </div>
          <div className="container gallery-grid">
            {galleryImages.map((image, index) => (
              <button
                type="button"
                className="gallery-item reveal"
                key={image.src + index}
                onClick={() => setSelectedImage(image)}
                aria-label={`Open gallery image ${index + 1}`}
              >
                <img src={image.src} alt={image.alt} />
              </button>
            ))}
          </div>
        </section>

        <section className="section booking" id="contact">
          <div className="container booking-layout">
            <div className="booking-copy reveal">
              <p className="eyebrow dark">Enquire</p>
              <h2>Plan Your Stay</h2>
              <p>
                Share your desired dates and preferences and the hotel team can respond with room options, rates, and availability.
              </p>
              <div className="contact-list">
                <div>
                  <span className="label">Address</span>
                  <p>{hotelConfig.address}</p>
                </div>
                <div>
                  <span className="label">WhatsApp</span>
                  <p>{hotelConfig.whatsappLabel}</p>
                  <button type="button" className="whatsapp-pill" onClick={openWhatsapp}>
                    {whatsappIcon}
                    WhatsApp
                  </button>
                </div>
                <div>
                  <span className="label">Email</span>
                  <p className="phone-links">
                    <a href="mailto:rooftopresort99@gmail.com">rooftopresort99@gmail.com</a>
                  </p>
                </div>
                <div>
                  <span className="label">Phone</span>
                  <p className="phone-links">
                    <a href="tel:+923161871928">0316-1871928</a>
                    <a href="tel:+923555217615">0355-5217615</a>
                  </p>
                </div>
              </div>
            </div>

            <form className="enquiry-form reveal" onSubmit={handleSubmit} noValidate>
              <div className="field-grid">
                <div className="field">
                  <label htmlFor="name">Guest name</label>
                  <input id="name" name="name" type="text" value={formData.name} onChange={onChange} />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="phoneOrEmail">Phone or email</label>
                  <input id="phoneOrEmail" name="phoneOrEmail" type="text" value={formData.phoneOrEmail} onChange={onChange} />
                  {errors.phoneOrEmail && <span className="error-message">{errors.phoneOrEmail}</span>}
                </div>
                <div className="field">
                  <label htmlFor="checkIn">Check-in date</label>
                  <input id="checkIn" name="checkIn" type="date" value={formData.checkIn} onChange={onChange} />
                  {errors.checkIn && <span className="error-message">{errors.checkIn}</span>}
                </div>
                <div className="field">
                  <label htmlFor="checkOut">Check-out date</label>
                  <input id="checkOut" name="checkOut" type="date" value={formData.checkOut} onChange={onChange} />
                  {errors.checkOut && <span className="error-message">{errors.checkOut}</span>}
                </div>
                <div className="field">
                  <label htmlFor="guests">Guests</label>
                  <input id="guests" name="guests" type="number" min="1" value={formData.guests} onChange={onChange} />
                  {errors.guests && <span className="error-message">{errors.guests}</span>}
                </div>
                <div className="field">
                  <label htmlFor="roomType">Preferred room</label>
                  <input id="roomType" name="roomType" type="text" value={formData.roomType} onChange={onChange} placeholder="Optional" />
                </div>
              </div>
              <div className="field field-full">
                <label htmlFor="requests">Special requests</label>
                <textarea id="requests" name="requests" rows="4" value={formData.requests} onChange={onChange} placeholder="Optional details" />
              </div>

              {submitted && <p className="success-message">Your enquiry details were prepared successfully.</p>}

              <div className="form-actions">
                <button className="button primary" type="submit">Send enquiry</button>
                <button className="button secondary" type="button" onClick={openWhatsapp}>WhatsApp</button>
              </div>
            </form>
          </div>
        </section>

        <section className="section location" id="location">
          <div className="container location-layout">
            <div className="location-image reveal">
              <img src={locationImage} alt="Scenic location around Skardu" />
            </div>
            <div className="location-copy reveal">
              <p className="eyebrow dark">Location</p>
              <h2>Find Your Way to the Mountains</h2>
              <p>{hotelConfig.address}</p>
              <div className="location-actions">
                <a className="button primary" href="https://maps.google.com/?q=Shigari+Bala+Skardu" target="_blank" rel="noreferrer">
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact-footer">
        <div className="container footer-grid">
          <div>
            <a href="#home" className="brand footer-brand">
              <span className="brand-mark">MV</span>
              <span>{hotelConfig.shortName}</span>
            </a>
            <p>{hotelConfig.address}</p>
          </div>
          <div>
            <h3>Navigation</h3>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li>
                <a href="#contact">Room enquiry</a>
              </li>
              <li>
                <button type="button" className="footer-link whatsapp-link" onClick={openWhatsapp}>
                  {whatsappIcon}
                  {hotelConfig.whatsappLabel}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} {hotelConfig.name}. All rights reserved.</p>
        </div>
      </footer>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)} role="dialog" aria-modal="true">
          <button type="button" className="lightbox-close" onClick={() => setSelectedImage(null)} aria-label="Close image viewer">
            ×
          </button>
          <img src={selectedImage.src} alt={selectedImage.alt} onClick={(event) => event.stopPropagation()} />
        </div>
      )}

      <a
        className="floating-whatsapp"
        href={`https://wa.me/${hotelConfig.whatsappNumber}?text=${encodeURIComponent(contactMessage)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Rooftop Resort on WhatsApp"
      >
        {whatsappIcon}
        <span>WhatsApp</span>
      </a>
    </div>
  );
}

export default App;
