const hasWindow = typeof window !== 'undefined' && window

export const iOSSafari = (userAgent) => {
  return userAgent?.match(/(iPod|iPhone|iPad)/) && userAgent?.match(/AppleWebKit/)
}

  /**
   * Handles posting a message to the parent window.
   *
   * @param method (String): name of the method to call inside the player. For api calls
   * this is the name of the api method (api_play or api_pause) while for events this method
   * is api_addEventListener.
   * @param params (Object or Array): List of parameters to submit to the method. Can be either
   * a single param or an array list of parameters.
   * @param target (HTMLElement): Target iframe to post the message to.
   */
  function postMessage(method, params, target) {
    if (!target.contentWindow.postMessage) {
      return false
    }

    var url = target.getAttribute('src').split('?')[0],
      data = JSON.stringify({
        method: method,
        value: params,
      })

    target.contentWindow.postMessage(data, url)
  }

  /**
   * Event that fires whenever the window receives a message from its parent
   * via window.postMessage.
   */
  function onMessageReceived(event) {
    var data, method

    try {
      data = JSON.parse(event.data)
      method = data.event || data.method
    } catch (e) {
      //fail silently... like a ninja!
    }

    if (method == 'ready' && !isReady) {
      isReady = true
    }

    // Handles messages from moogaloop only
    if (event.origin != playerDomain) {
      return false
    }

    var value = data.value,
      eventData = data.data,
      target_id = target_id === '' ? null : data.player_id,
      callback = getCallback(method, target_id),
      params = []

    if (!callback) {
      return false
    }

    if (value !== undefined) {
      params.push(value)
    }

    if (eventData) {
      params.push(eventData)
    }

    if (target_id) {
      params.push(target_id)
    }

    return params.length > 0 ? callback.apply(null, params) : callback.call()
  }

  /**
   * Stores submitted callbacks for each iframe being tracked and each
   * event for that iframe.
   *
   * @param eventName (String): Name of the event. Eg. api_onPlay
   * @param callback (Function): Function that should get executed when the
   * event is fired.
   * @param target_id (String) [Optional]: If handling more than one iframe then
   * it stores the different callbacks for different iframes based on the iframe's
   * id.
   */
  function storeCallback(eventName, callback, target_id) {
    if (target_id) {
      if (!eventCallbacks[target_id]) {
        eventCallbacks[target_id] = {}
      }
      eventCallbacks[target_id][eventName] = callback
    } else {
      eventCallbacks[eventName] = callback
    }
  }

  /**
   * Retrieves stored callbacks.
   */
  function getCallback(eventName, target_id) {
    if (target_id) {
      return eventCallbacks[target_id][eventName]
    } else {
      return eventCallbacks[eventName]
    }
  }

  function removeCallback(eventName, target_id) {
    if (target_id && eventCallbacks[target_id]) {
      if (!eventCallbacks[target_id][eventName]) {
        return false
      }
      eventCallbacks[target_id][eventName] = null
    } else {
      if (!eventCallbacks[eventName]) {
        return false
      }
      eventCallbacks[eventName] = null
    }

    return true
  }

  /**
   * Returns a domain's root domain.
   * Eg. returns http://vimeo.com when http://vimeo.com/channels is sbumitted
   *
   * @param url (String): Url to test against.
   * @return url (String): Root domain of submitted url
   */
  function getDomainFromUrl(url) {
    var url_pieces = url.split('/'),
      domain_str = ''

    for (var i = 0, length = url_pieces.length; i < length; i++) {
      if (i < 3) {
        domain_str += url_pieces[i]
      } else {
        break
      }
      if (i < 2) {
        domain_str += '/'
      }
    }

    return domain_str
  }

  function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply)
  }

  function isArray(obj) {
    return toString.call(obj) === '[object Array]'
  }
