/**
 * Converts hex to rgb
 * @param {String} hex - the hex code for the color
 * @returns {Array} The array of RGB values
 */
export function hexToRgb(hex: string): any[];
/**
 * Returns the filter required to transform a black image into the desired RGB color
 * @param {Array} rgb - The array of rgb values
 * @returns {Object} - returns an object with the filter string, loss value, and array of values. Object.filter, Object.loss, Object.values
 */
export function getColorFilter(rgb: any[]): Object;
export function gradient(colors: any, canvas_id: any): Gradient;
declare class Gradient {
    constructor(colors: any);
    scrollingTimeout: NodeJS.Timeout;
    isScrolling: boolean;
    width: number;
    xSegCount: number;
    ySegCount: number;
    isMetaKey: any;
    isMouseDown: boolean;
    last: any;
    isLoadedClass: boolean;
    el: any;
    connect(): Promise<void>;
    shaderFiles: {
        vertex: string;
        noise: string;
        blend: string;
        fragment: string;
    } | undefined;
    conf: {
        presetName: string;
        wireframe: boolean;
        density: number[];
        zoom: number;
        rotation: number;
        playing: boolean;
    } | undefined;
    minigl: MiniGl | undefined;
    computedCanvasStyle: CSSStyleDeclaration | undefined;
    disconnect(): void;
    initMaterial(): any;
    uniforms: {
        u_time: any;
        u_shadow_power: any;
        u_darken_top: any;
        u_active_colors: any;
        u_global: any;
        u_vertDeform: any;
        u_baseColor: any;
        u_waveLayers: any;
    } | undefined;
    vertexShader: string | undefined;
    initMesh(): void;
    material: any;
    geometry: any;
    mesh: any;
    shouldSkipFrame(e: any): true | undefined;
    updateFrequency(e: any): void;
    toggleColor(index: any): void;
    showGradientLegend(): void;
    isGradientLegendVisible: boolean | undefined;
    hideGradientLegend(): void;
    init(): void;
    waitForCssVars(): void;
    initGradientColors(): void;
    sectionColors: any;
}
declare class MiniGl {
    constructor(canvas: any, width: any, height: any, debug?: boolean);
    canvas: any;
    gl: any;
    meshes: any[];
    debug: (e: any, ...args: any[]) => void;
    commonUniforms: {
        projectionMatrix: any;
        modelViewMatrix: any;
        resolution: any;
        aspectRatio: any;
    };
    setSize(e?: number, t?: number): void;
    width: number | undefined;
    height: number | undefined;
    setOrthographicCamera(e?: number, t?: number, n?: number, i?: number, s?: number): void;
    render(): void;
}
export {};
