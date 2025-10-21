import { Scorm12API } from 'scorm-again';

declare global {
  interface Window {
    API: Scorm12API;
  }
}

export {};
