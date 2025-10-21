# SCORM Preview Application

A Next.js application designed for **customer demos** and **SCORM streaming demonstrations**. This tool helps customers understand and visualize how SCORM content can be streamed and delivered through a modern web application.

## Purpose

This application serves as a **demo platform** to showcase:
- How SCORM content can be uploaded and processed
- Real-time streaming of SCORM modules from external sources
- Modern web-based SCORM content delivery
- Customer visualization of SCORM integration capabilities

## How It Works

### 1. Upload Module
- **Drag & Drop Interface**: Users can drag and drop SCORM ZIP files directly onto the upload area
- **File Processing**: The application extracts license and module parameters from the uploaded ZIP file
- **Parameter Extraction**: Automatically parses the `index.html` file to find license and module identifiers
- **Local Storage**: Stores extracted parameters for session persistence

### 2. View Module
- **Streaming Delivery**: Content is streamed from external SCORM sources using dynamic API routes
- **SCORM 1.2 API Integration**: Full SCORM 1.2 compliance with proper API initialization
- **Responsive Viewer**: Content is displayed in a responsive iframe with proper aspect ratios
- **Real-time Loading**: Dynamic HTML generation with proper SCORM wrapper integration

### 3. Delete Module
- **One-Click Removal**: Simple delete button in the header to remove loaded modules
- **Storage Cleanup**: Automatically clears localStorage and resets application state
- **Fresh Start**: Returns to upload interface for new module testing

## Technical Features

- **Next.js 14** with App Router
- **SCORM 1.2 API** integration using `scorm-again` library
- **Dynamic API Routes** for content streaming
- **ZIP File Processing** with JSZip
- **Responsive Design** with Tailwind CSS
- **TypeScript** for type safety
- **Context-based State Management**

## Getting Started

First, install dependencies:

```bash
npm install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

1. **Upload**: Drag and drop a SCORM ZIP file onto the upload area
2. **Process**: Wait for the application to extract parameters and load the module
3. **View**: Click to start viewing the SCORM content in the integrated viewer
4. **Delete**: Use the trash icon in the header to remove the current module

## Architecture

The application uses a streaming approach where:
- SCORM content is not stored locally
- Parameters are extracted from uploaded ZIP files
- Content is dynamically streamed from external sources
- API routes generate HTML wrappers with proper SCORM integration

This approach demonstrates how modern web applications can integrate with SCORM content without traditional file storage, making it ideal for customer demonstrations and proof-of-concept scenarios.
