import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const license = searchParams.get('license');
  const moduleId = searchParams.get('module');

  // Validate parameters
  if (!license || !moduleId) {
    return new NextResponse('Missing license or module parameter', { status: 400 });
  }

  // Generate dynamic HTML content
  const htmlContent = generateScormHtml(license, moduleId);

  return new NextResponse(htmlContent, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}

function generateScormHtml(license: string, moduleId: string): string {
  return `<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>SoSafe Wrapper</title>
    <link rel="stylesheet" href="https://lms.sosafe.de/v1/root/css/style.css">
    <script type="text/javascript" src="https://lms.sosafe.de/v1/root/vendor/easyxdm/easyXDM.js"></script>
    <script type="text/javascript" src="https://lms.sosafe.de/v1/root/vendor/scorm12.js"></script>
    <script type="text/javascript" src="https://lms.sosafe.de/v1/root/wrapper.js"></script>
    <script type="text/javascript" src="https://lms.sosafe.de/v1/config?license=${encodeURIComponent(license)}&module=${encodeURIComponent(moduleId)}"></script>
</head>
<body>
</body>
</html>`;
}
