/* Runtime for docs/landing: renders the design template without dependencies.
   Generated into docs/assets/js/landing.js by scripts/build_landing.py. */
(function () {
  'use strict';

  var pending = false;
  var handlers = [];

  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () { pending = false; render(); });
  }

  class DCLogic {
    constructor(props) { this.props = props || {}; this.state = {}; }
    setState(patch) {
      var next = typeof patch === 'function' ? patch(this.state) : patch;
      this.state = Object.assign({}, this.state, next);
      schedule();
    }
    forceUpdate() { schedule(); }
  }

  /*COMPONENT*/

  var WHOLE = /^\{\{([^}]+)\}\}$/;
  var VOID = { area: 1, base: 1, br: 1, col: 1, embed: 1, hr: 1, img: 1, input: 1, link: 1, meta: 1, source: 1, track: 1, wbr: 1 };

  function lookup(scope, path) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, scope);
  }

  function escape(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function interpolate(text, scope) {
    return text.replace(/\{\{([^}]+)\}\}/g, function (_, path) {
      var v = lookup(scope, path);
      return v == null ? '' : String(v);
    });
  }

  function renderNode(node, scope, out) {
    if (node.nodeType === 3) { out.push(escape(interpolate(node.nodeValue, scope))); return; }
    if (node.nodeType !== 1) return;
    var tag = node.localName;
    if (tag === 'sc-for') {
      var list = lookup(scope, node.getAttribute('list').match(WHOLE)[1]) || [];
      var as = node.getAttribute('as');
      list.forEach(function (item, i) {
        var inner = Object.create(scope);
        inner[as] = item;
        inner.$index = i;
        node.childNodes.forEach(function (c) { renderNode(c, inner, out); });
      });
      return;
    }
    if (tag === 'sc-if') {
      if (lookup(scope, node.getAttribute('value').match(WHOLE)[1])) node.childNodes.forEach(function (c) { renderNode(c, scope, out); });
      return;
    }
    var attrs = '';
    Array.prototype.forEach.call(node.attributes, function (at) {
      var name = at.name;
      if (name === 'key' || name.indexOf('hint-') === 0) return;
      var m = at.value.match(WHOLE);
      if (m) {
        var v = lookup(scope, m[1]);
        if (typeof v === 'function') {
          attrs += ' data-on-' + name.slice(2).toLowerCase() + '="' + handlers.length + '"';
          handlers.push(v);
          return;
        }
        if (v == null) return;
        attrs += ' ' + name + '="' + escape(v) + '"';
        return;
      }
      attrs += ' ' + name + '="' + escape(interpolate(at.value, scope)) + '"';
    });
    out.push('<' + tag + attrs + '>');
    if (VOID[tag]) return;
    node.childNodes.forEach(function (c) { renderNode(c, scope, out); });
    out.push('</' + tag + '>');
  }

  function syncAttributes(from, to) {
    Array.prototype.slice.call(from.attributes).forEach(function (a) {
      if (!to.hasAttribute(a.name)) from.removeAttribute(a.name);
    });
    Array.prototype.forEach.call(to.attributes, function (a) {
      if (from.getAttribute(a.name) !== a.value) from.setAttribute(a.name, a.value);
    });
  }

  // Keeps existing elements so CSS transitions run between states.
  function morph(from, to) {
    var next = Array.prototype.slice.call(to.childNodes);
    for (var i = 0; i < next.length; i++) {
      var n = next[i], o = from.childNodes[i];
      if (!o) { from.appendChild(n); continue; }
      if (o.nodeType !== n.nodeType || o.nodeName !== n.nodeName) { from.replaceChild(n, o); continue; }
      if (n.nodeType === 3) { if (o.nodeValue !== n.nodeValue) o.nodeValue = n.nodeValue; continue; }
      if (n.nodeType === 1) { syncAttributes(o, n); morph(o, n); }
    }
    while (from.childNodes.length > next.length) from.removeChild(from.lastChild);
  }

  var template = document.getElementById('landing-template');
  var root = document.getElementById('landing');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var component = new Component({ motion: !reduce, startLang: 'fr' });

  function render() {
    handlers = [];
    var out = [];
    var vals = component.renderVals();
    template.content.childNodes.forEach(function (c) { renderNode(c, vals, out); });
    var box = document.createElement('div');
    box.innerHTML = out.join('');
    morph(root, box);
    if (component.state.lang) document.documentElement.lang = component.state.lang;
  }

  ['click', 'change', 'input'].forEach(function (type) {
    root.addEventListener(type, function (event) {
      var target = event.target.closest('[data-on-' + type + ']');
      if (!target || !root.contains(target)) return;
      var handler = handlers[Number(target.getAttribute('data-on-' + type))];
      if (handler) handler(event);
    });
  });

  render();
  document.documentElement.classList.add('js');
  if (component.componentDidMount) component.componentDidMount();
})();
