import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getInviteHtml = (data: any, templateFile: string = 'wedding_royal.html', customizations: any = {}) => {
  // Robust path resolution for Vercel
  const possiblePaths = [
    path.join(process.cwd(), 'apps/api/src/templates', templateFile),
    path.join(process.cwd(), 'src/templates', templateFile),
    path.join(__dirname, `../templates/${templateFile}`),
    path.join(__dirname, `../../src/templates/${templateFile}`)
  ];

  let templatePath = '';
  for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
          templatePath = p;
          break;
      }
  }

  if (!templatePath) {
    return `<h1>Template ${templateFile} not found</h1> <p>Search paths tried: ${possiblePaths.join(', ')}</p>`;
  }
  let html = fs.readFileSync(templatePath, 'utf-8');
  
  // Helper for hex to rgb
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
  };

  // Inject Customizations (Colors, etc.)
  let customStyle = '<style>:root {';
  if (customizations.primaryColor) {
      customStyle += `--primary: ${customizations.primaryColor};`;
      const rgb = hexToRgb(customizations.primaryColor);
      if (rgb) customStyle += `--primary-rgb: ${rgb};`;
  }
  if (customizations.secondaryColor) customStyle += `--secondary: ${customizations.secondaryColor};`;
  if (customizations.accentColor) customStyle += `--accent: ${customizations.accentColor};`;
  if (customizations.textColor) customStyle += `--text: ${customizations.textColor};`;
  if (customizations.bgOpacity) customStyle += `--bg-opacity: ${customizations.bgOpacity};`;
  customStyle += '}</style>';

  html = html.replace('</head>', `${customStyle}</head>`);
  
  // Generic replacements
  html = html.replace(/{{DATE}}/g, data.date || 'To be announced');
  html = html.replace(/{{TIME}}/g, data.time || '7:00 PM onwards');
  html = html.replace(/{{VENUE}}/g, data.venue || 'TBA');
  html = html.replace(/{{HOST_NAME}}/g, data.hostName || 'The Family');
  html = html.replace(/{{PHONE}}/g, data.phone || '');
  html = html.replace(/{{MAPS_LINK}}/g, data.mapsLink || '');
  html = html.replace(/{{RSVP_DATE}}/g, data.rsvpDate || 'one week before');

  // Wedding replacements
  html = html.replace(/{{NAME_A}}/g, data.nameA || 'Groom');
  html = html.replace(/{{NAME_B}}/g, data.nameB || 'Bride');

  // Mundan replacements
  html = html.replace(/{{KID_NAME}}/g, data.kidName || 'Little One');

  // Birthday replacements
  html = html.replace(/{{NAME}}/g, data.name || 'Birthday Star');
  html = html.replace(/{{AGE}}/g, data.age || '1st');
  
  return html;
};
