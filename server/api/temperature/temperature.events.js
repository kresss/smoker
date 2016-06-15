/**
 * Temperature model events
 */

'use strict';

import {EventEmitter} from 'events';
import Temperature from './temperature.model';
var TemperatureEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TemperatureEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Temperature.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TemperatureEvents.emit(event + ':' + doc._id, doc);
    TemperatureEvents.emit(event, doc);
  }
}

export default TemperatureEvents;
