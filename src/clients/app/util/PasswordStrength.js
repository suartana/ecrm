/**
 * @version    	$Id: PasswordStrength.js gsuartana $
 * @copyright  	Copyright (c) 2016 by Reuss Private AG, Switzerland
 *
 * @class
 * Utility to test the password strength.
 *
 * @author 		Gede Suartana <gede.suartana@reussprivate.com>
 */
Ext.define('Docucrm.util.PasswordStrength', {
    extend: 'Ext.form.TextField',
    requires: [
               'Docucrm.util.Translate'
           ],
    alias: 'widget.passwordstrength',

    inputType: 'password',

    // default settings for for `Ext.form.TextField`
    backgroundColor: "#ff4c00",

    /**
     * @cfg {String}
     * Text alignment of the strength bar text.
     */
    textAlign: 'center',

    /**
     * @cfg {String}
     * Font weight of the strength bar text.
     */
    fontweight: 'bold',

    /**
     * @cfg {String}
     * Floating location of the strength bar.
     */
    scrollAlign: 'left',

    /**
     * @cfg {String}
     * Color of the strength bar if the password is weak.
     */
    colorWeak: "#ff4c00",

    /**
     * @cfg {String}
     * Color of the strength bar if the password is poor.
     */
    colorPoor: "#ed8228",

    /**
     * @cfg {String}
     * Color of the strength bar if the password is good.
     */
    colorGood: "#83ff58",

    /**
     * @cfg {String}
     * Color of the strength bar if the password is excellent.
     */
    colorExcelent: "#07bf10",

    /**
     * @cfg {String}
     * Strength bar text if the password is weak.
     */
    textWeak: "weak",

    /**
     * @cfg {String}
     * Strength bar text if the password is poor.
     */
    textPoor:"Poor",

    /**
     * @cfg {String}
     * Strength bar text if the password is good.
     */
    textGood: "Good",

    /**
     * @cfg {String}
     * Strength bar text if the password is excellent.
     */
    textExcelent: "Excellent",

    constructor: function() {
        this.callParent(arguments);

        this.on({
            scope: this,
            /**
             * Initializes the elements and renders them.
             *
             * @param {Object} ct The component itself.
             * @param {Object} position The options object.
             */
            afterrender: function(ct, position) {
                if (this.strengthMeterId) {
                    var child = this.up('panel').down('#' + this.strengthMeterId);
                    if (!child) {
                        throw ("Can't find the meter by id");
                    }

                    if (child.rendered) {
                        this._prepareMeter(child.el);
                    } else {
                        child.on({
                            scope: this,
                            render: function(c) {
                                this._prepareMeter(child.el);
                            }
                        });
                    }
                } else {
                    this.child = this.el.down('.x-form-item-body');

                    this.objMeter = this.child.createChild({
                        tag: "div",
                        style: {
                            'height': 11,
                            'margin-top': 0,
                            'width': this.child.getWidth(),
                            'background-color': this.backgroundColor,
                            'float': this.scrollAlign,
                            'text-align': this.textAlign
                        }
                    });

                    this._setupMeter();
                }
            }
        });
    },

    /**
     * @private
     * Prepare the password meter.
     * @param  {Ext.Component} meterComponent The component of the meter.
     */
    _prepareMeter: function(meterComponent) {
        this.child = meterComponent;
        this.objMeter = this.child;
        this.objMeter.setStyle('float', this.scrollAlign);
        this.objMeter.setStyle('text-align', this.textAlgin);

        this._setupMeter();
    },

    /**
     * @private
     * Setup the prepared password meter.
     * @param  {Ext.Component} child [description]
     */
    _setupMeter: function() {
        if (!this.child) {
            throw ("Can't find the text field");
        }

        var objectWidth = this.child.getWidth();

        this.objMeter.setWidth(objectWidth);

        this.scoreBar = this.objMeter.createChild({
            tag: "div",
            style: {
                'height': 11,
                'width': objectWidth,
                'float': this.scrollAlign,
                'text-align': this.textAlign,
                'font-weight': this.fontweight
            }
        }, this.objMeter.first());
    },

    /**
     * Change the visiblity of the password strength bar.
     * @param {Boolean} visible Visibilty for the meter.
     */
    setMeterVisible: function(visible) {
        this.scoreBar.setVisible(visible);
    },

    /**
     * Initialise event listeners
     *
     * @return nothing Private function
     */
    initEvents: function() {
        var self = Docucrm.util.PasswordStrength;
        self.superclass.initEvents.call(this);
        this.el.on('keyup', this.resizeMeter, this);
    },

    /**
     * @private
     * Sets a new width, based on the size of the input field.
     *
     * @param {Ext.form.TextField} field The associated text field.
     */
    resizeMeter: function(field) {
        var objectWidth = this.child.getWidth();
        this.scoreBar.setVisible(true);
        this.objMeter.setWidth(objectWidth).setVisible(true);
        this.updateMeter(field);
    },

    /**
     * @private
     * Sets the width of the meter, based on the score
     *
     * @param {Ext.form.TextField} field The associated text field.
     */
    updateMeter: function(field) {
        //        var score = 0;
        var passwd = field.target.value,
            scoreWidth,
            maxWidth = this.objMeter.getWidth() - 5,
            nScore = this.calcStrength(passwd),
            nRound = Math.round(nScore * 2);

        if(passwd) {
            nRound = nRound > 100 ? 100 : nRound;
            scoreWidth = (maxWidth / 100) * nRound;
            this.objMeter.setVisible(true);
            this.scoreBar.setWidth(scoreWidth, true).setVisible(true);
            this.setColorOnScore(nRound);
            this.setMeterVisible(true);
        }else{
            this.setColorOnScore(0);
            this.scoreBar.setWidth('0');
            this.setMeterVisible(false);
        }
    },

    /**
     * @private
     * Set the color and text of the meter bar, based on the score
     *
     * @param {Number} score The score to visualize.
     */
    setColorOnScore: function(score) {
        var color = this.backgroundColor;
        this.scoreBar.update("&nbsp;");
        if (score > 3 && score < 30) {
            // weak
            color = this.colorWeak;
            this.scoreBar.update(this.textWeak);
        } else if (score >= 30 & score < 60) {
            // poor
            color = this.colorPoor;
            this.scoreBar.update(this.textPoor);
        } else if (score >= 60 & score < 80) {
            // good
            color = this.colorGood;
            this.scoreBar.update(this.textGood);
        } else if (score >= 80) {
            // excelent
            color = this.colorExcelent;
            this.scoreBar.update(this.textExcelent);
        }
        this.scoreBar.setStyle('background-color', color);
        console.log("color",color);
    },

    /**
     * Calculates the strength of a password.
     *
     * @param {String} passwd The password that needs to be calculated.
     *
     * @return {Number} The strength score of the password.
     */
    calcStrength: function(passwd) {
        var intScore = 0;

        // length 4 or less
        if (passwd.length > 0 && passwd.length == 4) {
            intScore += 3;
        }
        // length between 5 and 7
        else if (passwd.length >= 5 && passwd.length <= 7) {
            intScore += 6;
        }
        // length between 8 and 15
        else if (passwd.length  >= 8 && passwd.length <= 15) {
            intScore += 12;
        }
        // length 16 or more
        else if (passwd.length  >= 18){
            intScore += 18;
        }else{
            intScore += 0;
        }

        // LETTERS (Not exactly implemented as dictacted above
        if (passwd.match(/[a-z]/)) { // contains lowercase chars
            intScore += 1;
        }

        if (passwd.match(/[A-Z]/)) { // contains uppercase chars
            intScore += 5;
        }

        if (passwd.match(/\d+/)) { // contains one or more digits
            intScore += 5;
        }
        if (passwd.match(/[0-9].*[0-9].*[0-9]/)) {
            intScore += 5;
        }

        // one or more special chars
        if (passwd.match(/[^A-Za-z0-9]/)) {
            intScore += 5;
        }

        // two or more special chars
        if (passwd.match(/[^A-Za-z0-9].*[^A-Za-z0-9]/)) {
            intScore += 5;
        }

        // mixed upper and lower case
        if (passwd.match(/[a-z]/) && passwd.match(/[A-Z]+/)) {
            intScore += 2;
        }

        // contains text a at least one digit
        if (passwd.match(/[a-zA-Z]/) && passwd.match(/\d/)) {
            intScore += 2;
        }

        // specials and non-specials alternating
        if (passwd.match(/[a-zA-Z0-9]+[^A-Za-z0-9]+[a-zA-Z0-9]+/) || passwd.match(/[^a-zA-Z0-9]+[A-Za-z0-9]+[^a-zA-Z0-9]+/)) {
            intScore += 2;
        }
        // [verified] letters, numbers, and special characters
        if (passwd.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\!,@,#,$,%,\^,&,\*,\?,_,~])/)) {
            intScore += 2;
        }

        return intScore;
    }
});