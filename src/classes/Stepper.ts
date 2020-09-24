export const StepEvent = new CustomEvent('sysStep');

// TODO: move to external file
const manifest = {
    version: '0.0.2',
    appName: 'RPG3d Demo app',
};

export class Stepper {
    constructor() {
        document.title = `${manifest.appName} (${manifest.version}) Runtime`;
        document.addEventListener('sysStep', () => console.info('Step done'));
    }
}