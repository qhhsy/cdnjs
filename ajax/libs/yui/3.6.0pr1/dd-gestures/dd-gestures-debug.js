YUI.add('dd-gestures', function(Y) {


    /*
    * This module is the conditional loaded DD file to support gesture events.
    * In the event that DD is loaded onto a device that support touch based events
    * This module is loaded and over rides 2 key methods on DD.Drag and DD.DDM to
    * attach the gesture events.
    */
    Y.log('Drag gesture support loaded', 'info', 'drag-gestures');

    Y.DD.Drag.START_EVENT = 'gesturemovestart';

    Y.DD.Drag.prototype._prep = function() {
        Y.log('Using DD override prep to attach gesture events', 'info', 'drag-gestures');
        this._dragThreshMet = false;
        var node = this.get('node'), DDM = Y.DD.DDM;

        node.addClass(DDM.CSS_PREFIX + '-draggable');

        node.on(Y.DD.Drag.START_EVENT, Y.bind(this._handleMouseDownEvent, this), {
            minDistance: 0,
            minTime: 0
        });

        node.on('gesturemoveend', Y.bind(this._handleMouseUp, this), { standAlone: true });
        node.on('dragstart', Y.bind(this._fixDragStart, this));

    };

    Y.DD.DDM._setupListeners = function() {
        var DDM = Y.DD.DDM;

        this._createPG();
        this._active = true;
        Y.one(Y.config.doc).on('gesturemove', Y.throttle(Y.bind(DDM._move, DDM), DDM.get('throttleTime')), { standAlone: true });
    };



}, '@VERSION@' ,{requires:['dd-drag', 'event-synthetic', 'event-gestures'], skinnable:false});
