const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'public', 'data', 'places.json');

const TYPE_MAP = {
  'Alojamientos': 'Alojamientos',
  'Restaurantes': 'Restaurantes',
  'Cafeterías': 'Cafeterías',
  'Coffee Tours': 'Experiencias',
  'Experiencias': 'Experiencias',
  'Camping': 'Experiencias',
  'Artesanías': 'Comercio',
  'Tiendas': 'Comercio',
  'Turístico': 'Sitios Turísticos',
  'Cultural': 'Sitios Turísticos',
  'Servicios': 'Servicios',
  'Eventos': 'Eventos',
};

const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
let changed = 0;

for (const p of data.places) {
  const mapped = TYPE_MAP[p.type];
  if (mapped && mapped !== p.type) {
    p.type = mapped;
    changed++;
  }
  if (!p.tags) p.tags = [];
  if (!p.contact) p.contact = {};
  if (!p.location) p.location = { lat: 0, lng: 0 };
  if (typeof p.verified !== 'boolean') p.verified = false;
  if (typeof p.active !== 'boolean') p.active = true;
  if (typeof p.isPautante !== 'boolean') p.isPautante = false;
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
console.log(`Normalized ${changed} place types`);
console.log('Categories:', [...new Set(data.places.map(p => p.type))].join(', '));
