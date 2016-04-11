/**
 * By Jan-Willem Wisgerhof <j.wisgerhof@uq.edu.au>
 */
(function () {
	Polymer({
		is: 'uqlibrary-time-picker',
		properties: {
			/**
			 * Time String. 24H formatted like "HH:mm" -> "01:05", "23:12"
			 */
			time: {
				type: String,
				value: function () {
					return moment().format("HH:mm")
				},
				observer: '_timeChanged'
			},
			/**
			 * Currently selected hours
			 */
			_hours: {
				type: Number,
				observer: '_hoursChanged',
				value: 0
			},
			/**
			 * Currently selected minutes
			 */
			_minutes: {
				type: Number,
				observer: '_minutesChanged',
				value: 0
			},
			/**
			 * True if PM, False if AM
			 */
			_meridian: {
				type: Number,
				value: 0,
				observer: '_meridianChanged'
			}
		},
		ready: function () {
		},
		/**
		 * Called whenever the computed time variable is updated
		 * @private
     */
		_timeChanged: function () {
			// Make sure the current time does not match what is already broken down into
			// the sub components (hours, minutes, meridian)
			var newTime = this._buildTime();
			if (newTime !== this.time) {
				// Change sub components
				var timeSplit = this.time.split(":");
				this._hours = this._pad(timeSplit[0] > "12" ? timeSplit[0] - 12 : timeSplit[0]);
				this._minutes = this._pad(timeSplit[1]);
				this._meridian = (timeSplit[0] > "12" ? 1 : 0);
			}
		},
		/**
		 * Builds a time string from the sub components
		 * @private
     */
		_buildTime: function () {
			if (!this._hours || !this._minutes) return false;

			var hours = parseInt(this._hours);
			var minutes = parseInt(this._minutes);

			if (this._meridian == 1 && hours < 12) {
				hours += 12;
			} else if (this._meridian == 0 && hours == 12) {
				hours -= 12;
			}

			return this._pad(hours) + ":" + this._pad(minutes);
		},
		/**
		 * Called whenever the _hours variable is updated
		 * @private
     */
		_hoursChanged: function () {
			var hours = parseInt(this._hours);
			if (hours == 0) hours = 1;
			if (hours > 12) hours -= 12;

			this._hours = this._pad(hours);
			this.time = this._buildTime();
		},
		/**
		 * Called whenever the _minutes variable is updated
		 * @private
     */
		_minutesChanged: function () {
			var minutes = parseInt(this._minutes);
			if (minutes > 59) minutes = 59;

			this._minutes = this._pad(minutes);
			this.time = this._buildTime();
		},
		/**
		 * Called whenever the _meridian variable is updated
		 * @private
     */
		_meridianChanged: function () {
			this.time = this._buildTime();
		},
		/**
		 * Pads a number to always have a leading zero
		 * @param str
		 * @returns {string}
		 * @private
     */
		_pad: function (str) {
			return ("0" + str).slice(-2);
		}
	})
})();