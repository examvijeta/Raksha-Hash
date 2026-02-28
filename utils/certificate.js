// Protection Certificate Generator
// Generates a printable/downloadable PDF-style certificate

export const generateCertificate = (caseData, items) => {
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const mediaCount = items?.length || 0;
    const imageCount = items?.filter(i => i.type === 'image').length || 0;
    const videoCount = items?.filter(i => i.type === 'video').length || 0;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Raksha Hash — Protection Certificate ${caseData.id}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #fff; color: #0f172a; }

  .page { max-width: 800px; margin: 0 auto; padding: 60px 48px; }

  .stripe { height: 8px; background: linear-gradient(90deg, #FF9933 33%, #fff 33%, #fff 66%, #138808 66%); margin-bottom: 48px; }

  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px; }
  .brand { font-size: 28px; font-weight: 900; letter-spacing: -1px; }
  .brand .r { color: #FF9933; }
  .brand .h { color: #1e3a5f; }
  .watermark { font-size: 11px; color: #94a3b8; font-weight: 600; text-align: right; line-height: 1.6; }

  .title-block { text-align: center; margin-bottom: 48px; }
  .cert-label { font-size: 11px; font-weight: 700; letter-spacing: 0.25em; color: #64748b; text-transform: uppercase; margin-bottom: 12px; }
  .cert-title { font-size: 40px; font-weight: 900; color: #1e3a5f; line-height: 1.1; margin-bottom: 8px; }
  .cert-sub { font-size: 16px; color: #64748b; font-weight: 500; }

  .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 40px; }
  .detail-card { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 20px; padding: 24px; }
  .detail-label { font-size: 10px; font-weight: 800; letter-spacing: 0.15em; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px; }
  .detail-value { font-size: 22px; font-weight: 900; color: #1e3a5f; font-family: monospace; }
  .detail-value.pin { color: #FF9933; }

  .status-bar { background: #138808; color: white; border-radius: 16px; padding: 20px 32px; text-align: center; margin-bottom: 40px; }
  .status-bar p { font-size: 18px; font-weight: 700; }
  .status-bar span { font-size: 13px; opacity: 0.8; }

  .info-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 40px; }
  .info-card { border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; text-align: center; }
  .info-card .value { font-size: 28px; font-weight: 900; color: #1e3a5f; }
  .info-card .label { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; margin-top: 4px; }

  .warning { background: #fef2f2; border: 2px solid #fecaca; border-radius: 16px; padding: 20px; margin-bottom: 40px; }
  .warning p { color: #dc2626; font-weight: 700; font-size: 14px; }

  .legal { border-top: 2px solid #f1f5f9; padding-top: 32px; margin-bottom: 40px; }
  .legal p { font-size: 12px; color: #94a3b8; line-height: 1.8; font-weight: 500; }

  .footer-bar { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1px solid #e2e8f0; }
  .footer-bar p { font-size: 11px; color: #94a3b8; font-weight: 600; }

  .stripe-bottom { height: 8px; background: linear-gradient(90deg, #FF9933 33%, #fff 33%, #fff 66%, #138808 66%); margin-top: 48px; }

  @media print { .page { padding: 40px; } }
</style>
</head>
<body>
<div class="page">
  <div class="stripe"></div>

  <div class="header">
    <div class="brand"><span class="r">Raksha</span><span class="h">Hash</span></div>
    <div class="watermark">
      NCII Protection Certificate<br>
      Document ID: RKCERT-${caseData.id}<br>
      Issued: ${timestamp} IST
    </div>
  </div>

  <div class="title-block">
    <p class="cert-label">Official Document</p>
    <h1 class="cert-title">Protection Certificate</h1>
    <p class="cert-sub">This certifies that the following media fingerprints are registered for NCII protection</p>
  </div>

  <div class="status-bar">
    <p>🛡️ PROTECTION ACTIVE</p>
    <span>Digital fingerprints registered and active across partner platforms</span>
  </div>

  <div class="details-grid">
    <div class="detail-card">
      <div class="detail-label">Case ID</div>
      <div class="detail-value">${caseData.id}</div>
    </div>
    <div class="detail-card">
      <div class="detail-label">Private PIN</div>
      <div class="detail-value pin">${caseData.pin}</div>
    </div>
    <div class="detail-card">
      <div class="detail-label">Registration Date</div>
      <div class="detail-value" style="font-size:14px;margin-top:4px">${timestamp}</div>
    </div>
    <div class="detail-card">
      <div class="detail-label">Technology</div>
      <div class="detail-value" style="font-size:14px;margin-top:4px">PDQ Perceptual Hash</div>
    </div>
  </div>

  <div class="info-grid">
    <div class="info-card">
      <div class="value" style="color:#FF9933">${mediaCount}</div>
      <div class="label">Total Files</div>
    </div>
    <div class="info-card">
      <div class="value">${imageCount}</div>
      <div class="label">Images</div>
    </div>
    <div class="info-card">
      <div class="value">${videoCount}</div>
      <div class="label">Videos</div>
    </div>
  </div>

  <div class="warning">
    <p>⚠️ Keep your Case ID and PIN private and secure. You will need them to manage or revoke your case. Do not share this certificate with the perpetrator. This document may be used as evidence of your protective intent in legal proceedings.</p>
  </div>

  <div class="legal">
    <p>
      <strong>What this certificate confirms:</strong> That you have registered perceptual hashes (mathematical fingerprints) of your private images/videos with Raksha Hash. No image data was transmitted. Only cryptographic fingerprints were stored. This registration enables partner platforms to detect and block these specific images from being re-uploaded.
      <br><br>
      This certificate does not constitute legal advice. For legal action, also file a complaint at <strong>cybercrime.gov.in</strong> (Report → Other Cyber Crime) and contact NCW (7827170170).
    </p>
  </div>

  <div class="footer-bar">
    <p>© ${new Date().getFullYear()} Raksha Hash | rakshahash.in</p>
    <p>Verify this certificate: dashboard.rakshahash.in/${caseData.id}</p>
  </div>

  <div class="stripe-bottom"></div>
</div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, '_blank');
    if (w) {
        w.addEventListener('load', () => {
            setTimeout(() => w.print(), 500);
        });
    }
};
