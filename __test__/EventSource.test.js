// @flow
import EventSource from '../src/EventSource';

const URL = 'https://example.com/events';
const EVENT_NAME = 'EVENT_NAME';
const messageEvent = {
  data: 'message event data',
};

describe('constructor', () => {
  let eventSource;
  beforeAll(() => {
    eventSource = new EventSource(URL);
  });

  it(`should set the url to ${URL}`, () => {
    expect(eventSource.url).toBe(URL);
  });

  it('should set withCredentials to false', () => {
    expect(eventSource.withCredentials).toBe(false);
  });
});

describe('add a listener', () => {
  let eventSource;
  let listener;
  let emitter;

  beforeAll(() => {
    listener = jest.fn();
    eventSource = new EventSource(URL);
    emitter = eventSource.__emitter;
    eventSource.addEventListener(EVENT_NAME, listener);
  });

  it('should add an event listener', () => {
    expect(emitter.listeners(EVENT_NAME)).toEqual([listener]);
  });

  it('should call the listener', () => {
    eventSource.emit(EVENT_NAME, messageEvent);
    expect(listener).toHaveBeenCalledWith(messageEvent.data);
  });
});

describe('close', () => {
  let eventSource;
  beforeAll(() => {
    eventSource = new EventSource(URL);
  });

  it('should set readyState to 2 (CLOSED)', () => {
    eventSource.close();
    expect(eventSource.readyState).toBe(2);
  });
});