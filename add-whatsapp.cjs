const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('public/data/places.json', 'utf8'));

  data.places.forEach(p => {
    if (p.contact && p.contact.phone === '+57 317 442 6044') {
      p.contact.whatsappDirect = `https://wa.me/573174426044?text=Hola,%20quisiera%20información%20sobre%20${encodeURIComponent(p.name)}`;
    }
    if (p.contact && p.contact.whatsapp === '573011234570') {
      p.contact.whatsappDirect = `https://wa.me/573011234570?text=Hola,%20quisiera%20reservar%20en%20${encodeURIComponent(p.name)}`;
    }
    if (p.contact && p.contact.whatsapp === '573158502345') {
      p.contact.whatsappDirect = `https://wa.me/573158502345?text=Hola,%20quisiera%20información%20sobre%20${encodeURIComponent(p.name)}`;
    }
    if (p.contact && p.contact.whatsapp === '573158503456') {
      p.contact.whatsappDirect = `https://wa.me/573158503456?text=Hola,%20quisiera%20información%20sobre%20${encodeURIComponent(p.name)}`;
    }
  });

  fs.writeFileSync('public/data/places.json', JSON.stringify(data, null, 2));
  console.log('WhatsApp direct links added successfully');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
