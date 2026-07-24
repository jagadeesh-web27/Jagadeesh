const PDFDocument = require('pdfkit');
const fs = require('fs');

// 1 inch margin all around (72 pts = 1 inch)
const margin = 72;
const doc = new PDFDocument({ margin, size: 'A4', bufferPages: true });
doc.pipe(fs.createWriteStream('public/Jagadeesh_Boya_CV.pdf'));

// Colors
const PRIMARY_COLOR = '#1e293b';     // Dark Slate
const SECONDARY_COLOR = '#7c3aed';   // Violet
const ACCENT_COLOR = '#0ea5e9';      // Sky Blue
const TEXT_COLOR = '#334155';        // Medium Slate
const LIGHT_TEXT = '#64748b';        // Lighter Slate
const LINE_COLOR = '#cbd5e1';        // Light border

// Fonts
const FONT_REG = 'Helvetica';
const FONT_BOLD = 'Helvetica-Bold';
const FONT_ITALIC = 'Helvetica-Oblique';

const pageW = doc.page.width;
const pageH = doc.page.height;
const contentW = pageW - margin * 2;

// --- HEADER ---
doc.font(FONT_BOLD).fontSize(32).fillColor(PRIMARY_COLOR).text('JAGADEESH BOYA', { align: 'center', characterSpacing: 1 });
doc.font(FONT_REG).fontSize(14).fillColor(SECONDARY_COLOR).text('Full Stack Developer & Accessibility Engineer', { align: 'center' });
doc.moveDown(0.5);

// Contact Info
doc.font(FONT_REG).fontSize(10).fillColor(LIGHT_TEXT);
const contactInfo1 = 'Anantapur, Andhra Pradesh, India   •   +91 9121585417   •   jagadeeshboya27@gmail.com';
const contactInfo2 = 'LinkedIn: linkedin.com/in/jagadeesh-boya   •   GitHub: github.com/Jagadeesh-Boya';
doc.text(contactInfo1, { align: 'center' });
doc.text(contactInfo2, { align: 'center' });

doc.moveDown(1.5);

// Helper for Section Titles
function sectionTitle(title) {
  doc.font(FONT_BOLD).fontSize(14).fillColor(PRIMARY_COLOR).text(title.toUpperCase(), { characterSpacing: 1 });
  // Draw an accent line underneath
  doc.moveTo(margin, doc.y + 2)
     .lineTo(margin + contentW, doc.y + 2)
     .lineWidth(1.5)
     .strokeColor(SECONDARY_COLOR)
     .stroke();
  doc.moveDown(0.8);
}

// Helper for bullet points
function bulletText(text) {
  doc.rect(margin + 5, doc.y + 4, 3, 3).fill(ACCENT_COLOR);
  doc.font(FONT_REG).fontSize(10.5).fillColor(TEXT_COLOR)
     .text(text, margin + 15, doc.y, { width: contentW - 15, align: 'justify', lineGap: 3 });
}

// --- PROFESSIONAL SUMMARY ---
sectionTitle('Professional Summary');
doc.font(FONT_REG).fontSize(10.5).fillColor(TEXT_COLOR)
  .text('Passionate Full Stack Developer with expertise in building scalable, accessible, and high-performance web applications. Adept at transforming complex requirements into intuitive user interfaces, with a strong focus on inclusive design and WCAG 2.2 accessibility standards. Dedicated to delivering premium user experiences through clean code and modern architecture.', { width: contentW, align: 'justify', lineGap: 3 });
doc.moveDown(1.2);
doc.x = margin; // Reset X

// --- TECHNICAL SKILLS ---
sectionTitle('Technical Skills');
const skills = [
  { category: 'Frontend Development', items: 'HTML5, CSS3, JavaScript (ES6+), TypeScript, React.js' },
  { category: 'UI Frameworks & Tools', items: 'Bootstrap, Tailwind CSS, Material UI, Figma' },
  { category: 'Backend & Databases', items: 'Node.js, Express.js, MongoDB, MySQL' },
  { category: 'Testing & Tools', items: 'Selenium, Postman, Git, GitHub' },
  { category: 'Specializations', items: 'WCAG 2.2 Accessibility Engineering, RESTful APIs, Responsive Fluid Design' }
];

skills.forEach(skill => {
  doc.font(FONT_BOLD).fontSize(10.5).fillColor(PRIMARY_COLOR).text(`${skill.category}: `, { continued: true })
     .font(FONT_REG).fillColor(TEXT_COLOR).text(skill.items, { lineGap: 2 });
});
doc.moveDown(1.2);
doc.x = margin;

// --- FEATURED PROJECTS ---
sectionTitle('Featured Projects');

function projectItem(title, role, description, stack) {
  doc.font(FONT_BOLD).fontSize(12).fillColor(PRIMARY_COLOR).text(title, margin, doc.y, { continued: true })
     .font(FONT_ITALIC).fontSize(11).fillColor(SECONDARY_COLOR).text(`  |  ${role}`);
  doc.moveDown(0.3);
  
  // Description as a bullet
  doc.rect(margin + 5, doc.y + 4, 3, 3).fill(ACCENT_COLOR);
  doc.font(FONT_REG).fontSize(10.5).fillColor(TEXT_COLOR)
     .text(description, margin + 15, doc.y, { width: contentW - 15, align: 'justify', lineGap: 2 });
     
  doc.font(FONT_BOLD).fontSize(9.5).fillColor(LIGHT_TEXT).text(`Tech Stack: `, margin + 15, doc.y, { continued: true })
     .font(FONT_REG).text(stack);
  doc.moveDown(0.8);
  doc.x = margin;
}

projectItem(
  'GSC-DM (Global Solution Center)',
  'Frontend Developer',
  'Developed a specialized enterprise platform streamlining operational workflows. Engineered deep accessibility integrations ensuring full WCAG compliance (keyboard navigation, high contrast support).',
  'React, Tailwind CSS, Node.js, Accessibility APIs'
);

projectItem(
  'Blimey Platform',
  'Full Stack Developer',
  'Architected a comprehensive full-stack solution featuring robust RESTful API integrations and seamless cross-device compatibility with fluid layouts.',
  'React, Node.js, Express, MongoDB'
);

projectItem(
  'Interactive Web Applications Portfolio',
  'Solo Developer',
  'Designed and developed multiple robust applications including a gamified Spelling Bee learning app, a Theatre Seat Booking system with real-time capacity management, and a digital Library Catalog system.',
  'React, JavaScript, HTML/CSS, Material UI'
);

doc.moveDown(0.5);

// --- CERTIFICATIONS ---
sectionTitle('Certifications & Achievements');
bulletText('Full Stack Web Development Certification');
bulletText('Java Programming Masterclass');
bulletText('WCAG 2.2 Accessibility Testing Specialist');
bulletText('React Advanced Patterns and Architecture');

// Global operations for all pages
const range = doc.bufferedPageRange();
for (let i = range.start; i < range.start + range.count; i++) {
  doc.switchToPage(i);
  // Add 4-side visible border to every page
  const bMargin = margin - 15;
  doc.rect(bMargin, bMargin, pageW - 2 * bMargin, pageH - 2 * bMargin)
     .lineWidth(2)
     .strokeColor(PRIMARY_COLOR)
     .stroke();
}

doc.end();
console.log('Premium PDF generated successfully!');
