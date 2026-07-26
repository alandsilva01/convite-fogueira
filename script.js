const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfmGXwsv4xjPUTuBOIuuJWrHvPDCYelCngvi69Cu6l7uK4SRw/viewform?usp=publish-editor';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Fam%C3%ADlia%20P7%20Church%2C%20Av.%20Adriano%20Bertozzi%2C%20383%20-%20Itaquera%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2008265-000';

document.documentElement.classList.add('js');

const EVENT = {
  title: 'Encontro de Pais & Filhos - Família P7 Church',
  dateLabel: '15/08/2026',
  startsAt: '20260815T180000',
  location: 'Família P7 Church, Av. Adriano Bertozzi, 383 - Itaquera, São Paulo - SP, 08265-000',
  description: 'Um momento especial de interação, conexão, brincadeiras, culto e churrasquinho entre pais e filhos.'
};

document.getElementById('confirmLink').href = FORM_URL;
document.getElementById('mapLink').href = MAPS_URL;

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
}

function escapeIcs(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function downloadCalendarFile() {
  const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Familia P7 Church//Encontro de Pais e Filhos//PT-BR',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:encontro-pais-filhos-20260815@familiap7church`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=America/Sao_Paulo:${EVENT.startsAt}`,
    `SUMMARY:${escapeIcs(EVENT.title)}`,
    `LOCATION:${escapeIcs(EVENT.location)}`,
    `DESCRIPTION:${escapeIcs(EVENT.description)}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'encontro-pais-filhos-familia-p7.ics';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

document.getElementById('calendarBtn').addEventListener('click', downloadCalendarFile);
