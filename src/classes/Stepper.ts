export const StepEvent = new CustomEvent('sysStep');

export class Stepper {
    constructor() {
        document.addEventListener('sysStep', () => console.info('Step done'));
    }
}