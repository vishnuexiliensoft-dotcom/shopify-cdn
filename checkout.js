/* ----------------------------------------------------
   SHOPIFY SAFE – GLOBAL JS KILL SWITCH
   Load this file via GitHub CDN to disable all JS
   Remove the <script> tag to restore full functionality
----------------------------------------------------- */

(function () {
    try {
        console.log("🚫 SHOPIFY JS LOCK MODE ENABLED");

        /* ------------------------------------
           1. Disable Core JS Execution Methods
        ------------------------------------ */
        window.setTimeout = () => {};
        window.setInterval = () => {};
        window.requestAnimationFrame = () => {};
        window.fetch = () => new Promise(() => {});
        window.XMLHttpRequest = function () {
            return {
                open() {},
                send() {},
                setRequestHeader() {}
            };
        };

        /* ------------------------------------
           2. Disable Existing Event Listeners
        ------------------------------------ */
        const blockEvent = e => {
            e.stopImmediatePropagation();
        };

        [
            "click", "submit", "change", "input",
            "mouseover", "mouseout",
            "scroll", "resize",
            "focus", "blur"
        ].forEach(eventName => {
            window.addEventListener(eventName, blockEvent, true);
            document.addEventListener(eventName, blockEvent, true);
        });

        /* ------------------------------------
           3. Block NEW event listeners
        ------------------------------------ */
        const noOp = () => {};

        // Block addEventListener for all new attachments
        const originalAdd = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function () {
            // Do NOT attach any new events
            return;
        };

        window.addEventListener = noOp;
        document.addEventListener = noOp;

        /* ------------------------------------
           4. Shopify Safety:
           Prevent theme.js or app scripts from running
        ------------------------------------ */
        window.Shopify = window.Shopify || {};
        window.Shopify.loadFeatures = () => {}; // disable theme feature loading
        window.Shopify.designMode = false;

        // Prevent apps → customer accounts → analytics
        window.ShopifyAnalytics = {};
        window.ShopifyAnalytics.lib = {};

        console.log("✔ All JS functionality disabled safely.");

    } catch (err) {
        console.error("Kill-switch failed safely:", err);
    }
})();
