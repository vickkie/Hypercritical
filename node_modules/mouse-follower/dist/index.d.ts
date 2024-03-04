/*!
 * Cuberto Mouse Follower
 * https://cuberto.com/
 *
 * @version 1.1.2
 * @author Cuberto, Artem Dordzhiev (Draft)
 */
export default class MouseFollower {
    /**
     * @typedef {Object} MouseFollowerOptions
     * @property {string|HTMLElement|null} [el] Existed cursor element.
     * @property {string|HTMLElement|null} [container] Cursor container.
     * @property {string} [className] Cursor root element class name.
     * @property {string} [innerClassName] Inner element class name.
     * @property {string} [textClassName] Text element class name.
     * @property {string} [mediaClassName] Media element class name.
     * @property {string} [mediaBoxClassName] Media inner element class name.
     * @property {string} [iconSvgClassName] SVG sprite class name.
     * @property {string} [iconSvgNamePrefix] SVG sprite icon class name prefix.
     * @property {string} [iconSvgSrc] SVG sprite source.
     * @property {string|null} [dataAttr] Name of data attribute for changing cursor state directly in HTML.
     * @property {string} [hiddenState] Hidden state name.
     * @property {string} [textState] Text state name.
     * @property {string} [iconState] Icon state name.
     * @property {string|null} [activeState] Active (mousedown) state name. Set false to disable.
     * @property {string} [mediaState] Media (image/video) state name.
     * @property {Object} [stateDetection] State detection rules.
     * @property {boolean} [visible] Is cursor visible by default.
     * @property {boolean} [visibleOnState] Automatically show/hide cursor when state added.
     * @property {number} [speed] Cursor movement speed.
     * @property {string} [ease] Timing function of cursor movement.
     * @property {boolean} [overwrite] Overwrite or remain cursor position when `mousemove` event happens.
     * @property {number} [skewing] Default skewing factor.
     * @property {number} [skewingText] Skewing effect factor in a text state.
     * @property {number} [skewingIcon] Skewing effect factor in a icon state.
     * @property {number} [skewingMedia] Skewing effect factor in a media (image/video) state.
     * @property {number} [skewingDelta] Skewing effect base delta.
     * @property {number} [skewingDeltaMax] Skew effect max delta.
     * @property {number} [stickDelta] Stick effect delta.
     * @property {number} [showTimeout] Delay before show.
     * @property {boolean} [hideOnLeave] Hide the cursor when mouse leave container.
     * @property {number} [hideTimeout] Delay before hiding. It should be equal to the CSS hide animation time.
     * @property {number[]} [initialPos] Array (x, y) of initial cursor position.
     */
    /**
     * Register GSAP animation library.
     *
     * @param {gsap} gsap GSAP library.
     */
    static registerGSAP(gsap: any): void;
    /**
     * Create cursor instance.
     *
     * @param {MouseFollowerOptions} [options] Cursor options.
     */
    constructor(options?: {
        /**
         * Existed cursor element.
         */
        el?: string | HTMLElement | null;
        /**
         * Cursor container.
         */
        container?: string | HTMLElement | null;
        /**
         * Cursor root element class name.
         */
        className?: string;
        /**
         * Inner element class name.
         */
        innerClassName?: string;
        /**
         * Text element class name.
         */
        textClassName?: string;
        /**
         * Media element class name.
         */
        mediaClassName?: string;
        /**
         * Media inner element class name.
         */
        mediaBoxClassName?: string;
        /**
         * SVG sprite class name.
         */
        iconSvgClassName?: string;
        /**
         * SVG sprite icon class name prefix.
         */
        iconSvgNamePrefix?: string;
        /**
         * SVG sprite source.
         */
        iconSvgSrc?: string;
        /**
         * Name of data attribute for changing cursor state directly in HTML.
         */
        dataAttr?: string | null;
        /**
         * Hidden state name.
         */
        hiddenState?: string;
        /**
         * Text state name.
         */
        textState?: string;
        /**
         * Icon state name.
         */
        iconState?: string;
        /**
         * Active (mousedown) state name. Set false to disable.
         */
        activeState?: string | null;
        /**
         * Media (image/video) state name.
         */
        mediaState?: string;
        /**
         * State detection rules.
         */
        stateDetection?: any;
        /**
         * Is cursor visible by default.
         */
        visible?: boolean;
        /**
         * Automatically show/hide cursor when state added.
         */
        visibleOnState?: boolean;
        /**
         * Cursor movement speed.
         */
        speed?: number;
        /**
         * Timing function of cursor movement.
         */
        ease?: string;
        /**
         * Overwrite or remain cursor position when `mousemove` event happens.
         */
        overwrite?: boolean;
        /**
         * Default skewing factor.
         */
        skewing?: number;
        /**
         * Skewing effect factor in a text state.
         */
        skewingText?: number;
        /**
         * Skewing effect factor in a icon state.
         */
        skewingIcon?: number;
        /**
         * Skewing effect factor in a media (image/video) state.
         */
        skewingMedia?: number;
        /**
         * Skewing effect base delta.
         */
        skewingDelta?: number;
        /**
         * Skew effect max delta.
         */
        skewingDeltaMax?: number;
        /**
         * Stick effect delta.
         */
        stickDelta?: number;
        /**
         * Delay before show.
         */
        showTimeout?: number;
        /**
         * Hide the cursor when mouse leave container.
         */
        hideOnLeave?: boolean;
        /**
         * Delay before hiding. It should be equal to the CSS hide animation time.
         */
        hideTimeout?: number;
        /**
         * Array (x, y) of initial cursor position.
         */
        initialPos?: number[];
    });
    /** @type {MouseFollowerOptions} **/
    options: {
        /**
         * Existed cursor element.
         */
        el?: string | HTMLElement | null;
        /**
         * Cursor container.
         */
        container?: string | HTMLElement | null;
        /**
         * Cursor root element class name.
         */
        className?: string;
        /**
         * Inner element class name.
         */
        innerClassName?: string;
        /**
         * Text element class name.
         */
        textClassName?: string;
        /**
         * Media element class name.
         */
        mediaClassName?: string;
        /**
         * Media inner element class name.
         */
        mediaBoxClassName?: string;
        /**
         * SVG sprite class name.
         */
        iconSvgClassName?: string;
        /**
         * SVG sprite icon class name prefix.
         */
        iconSvgNamePrefix?: string;
        /**
         * SVG sprite source.
         */
        iconSvgSrc?: string;
        /**
         * Name of data attribute for changing cursor state directly in HTML.
         */
        dataAttr?: string | null;
        /**
         * Hidden state name.
         */
        hiddenState?: string;
        /**
         * Text state name.
         */
        textState?: string;
        /**
         * Icon state name.
         */
        iconState?: string;
        /**
         * Active (mousedown) state name. Set false to disable.
         */
        activeState?: string | null;
        /**
         * Media (image/video) state name.
         */
        mediaState?: string;
        /**
         * State detection rules.
         */
        stateDetection?: any;
        /**
         * Is cursor visible by default.
         */
        visible?: boolean;
        /**
         * Automatically show/hide cursor when state added.
         */
        visibleOnState?: boolean;
        /**
         * Cursor movement speed.
         */
        speed?: number;
        /**
         * Timing function of cursor movement.
         */
        ease?: string;
        /**
         * Overwrite or remain cursor position when `mousemove` event happens.
         */
        overwrite?: boolean;
        /**
         * Default skewing factor.
         */
        skewing?: number;
        /**
         * Skewing effect factor in a text state.
         */
        skewingText?: number;
        /**
         * Skewing effect factor in a icon state.
         */
        skewingIcon?: number;
        /**
         * Skewing effect factor in a media (image/video) state.
         */
        skewingMedia?: number;
        /**
         * Skewing effect base delta.
         */
        skewingDelta?: number;
        /**
         * Skew effect max delta.
         */
        skewingDeltaMax?: number;
        /**
         * Stick effect delta.
         */
        stickDelta?: number;
        /**
         * Delay before show.
         */
        showTimeout?: number;
        /**
         * Hide the cursor when mouse leave container.
         */
        hideOnLeave?: boolean;
        /**
         * Delay before hiding. It should be equal to the CSS hide animation time.
         */
        hideTimeout?: number;
        /**
         * Array (x, y) of initial cursor position.
         */
        initialPos?: number[];
    };
    gsap: any;
    el: Element;
    container: Element;
    skewing: number;
    pos: {
        x: number;
        y: number;
    };
    vel: {
        x: number;
        y: number;
    };
    event: {};
    events: any[];
    /**
     * Init cursor.
     */
    init(): void;
    ticker: any;
    /**
     * Create cursor DOM element and append to container.
     */
    create(): void;
    inner: HTMLDivElement;
    text: HTMLDivElement;
    media: HTMLDivElement;
    mediaBox: HTMLDivElement;
    /**
     * Create GSAP setters.
     */
    createSetter(): void;
    setter: {
        x: any;
        y: any;
        rotation: any;
        scaleX: any;
        scaleY: any;
        wc: any;
        inner: {
            rotation: any;
        };
    };
    /**
     * Create and attach events.
     */
    bind(): void;
    /**
     * Render the cursor in a new position.
     *
     * @param {boolean} [force=false] Force render.
     */
    render(force?: boolean): void;
    /**
     * Show cursor.
     */
    show(): void;
    visibleInt: NodeJS.Timeout;
    visible: boolean;
    /**
     * Hide cursor.
     */
    hide(): void;
    /**
     * Toggle cursor.
     *
     * @param {boolean} [force] Force state.
     */
    toggle(force?: boolean): void;
    /**
     * Add state/states to the cursor.
     *
     * @param {string} state State name.
     */
    addState(state: string): void;
    /**
     * Remove state/states from cursor.
     *
     * @param {string} state State name.
     */
    removeState(state: string): void;
    /**
     * Toggle cursor state.
     *
     * @param {string} state State name.
     * @param {boolean} [force] Force state.
     */
    toggleState(state: string, force?: boolean): void;
    /**
     * Set factor of skewing effect.
     *
     * @param {number} value Skewing factor.
     */
    setSkewing(value: number): void;
    /**
     * Reverts skewing factor to default.
     */
    removeSkewing(): void;
    /**
     * Stick cursor to the element.
     *
     * @param {string|HTMLElement} element Element or selector.
     */
    setStick(element: string | HTMLElement): void;
    stick: boolean | {
        y: number;
        x: number;
    };
    /**
     * Unstick cursor from the element.
     */
    removeStick(): void;
    /**
     * Transform cursor to text mode with a given string.
     *
     * @param {string} text Text.
     */
    setText(text: string): void;
    /**
     * Reverts cursor from text mode.
     */
    removeText(): void;
    /**
     * Transform cursor to svg icon mode.
     *
     * @param {string} name Icon identifier.
     * @param {string} [style=""] Additional SVG styles.
     */
    setIcon(name: string, style?: string): void;
    /**
     * Reverts cursor from icon mode.
     */
    removeIcon(): void;
    /**
     * Transform cursor to media mode with a given element.
     *
     * @param {HTMLElement} element Element.
     */
    setMedia(element: HTMLElement): void;
    mediaInt: NodeJS.Timeout;
    /**
     * Revert cursor from media mode.
     */
    removeMedia(): void;
    /**
     * Transform cursor to image mode.
     *
     * @param {string} url Image url.
     */
    setImg(url: string): void;
    mediaImg: HTMLImageElement;
    /**
     * Reverts cursor from image mode.
     */
    removeImg(): void;
    /**
     * Transform cursor to video mode.
     *
     * @param {string} url Video url.
     */
    setVideo(url: string): void;
    mediaVideo: HTMLVideoElement;
    /**
     * Reverts cursor from video mode.
     */
    removeVideo(): void;
    /**
     * Attach an event handler function.
     *
     * @param {string} event Event name.
     * @param {function} callback Callback.
     */
    on(event: string, callback: Function): void;
    /**
     * Remove an event handler.
     *
     * @param {string} event Event name.
     * @param {function} [callback] Callback.
     */
    off(event: string, callback?: Function): void;
    /**
     * Execute all handlers for the given event type.
     *
     * @param {string} event Event name.
     * @param params Extra parameters.
     */
    trigger(event: string, ...params: any[]): void;
    /**
     * Get cursor options from data attribute of a given element.
     *
     * @param {HTMLElement} element Element.
     * @return {Object} Options.
     */
    getFromDataset(element: HTMLElement): any;
    /**
     * Destroy cursor instance.
     */
    destroy(): void;
}
//# sourceMappingURL=index.d.ts.map