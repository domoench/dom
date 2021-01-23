// Consts
const numMovements = 50;
const DEBUG = false;

// Flags
let nameDrawn = false;
let overlayVisible = false;

// truePercent(0.5) returns true 50% of the time
const truePercent = p => Math.random() < p;

// Iterative Euclid algorithm for GCD
const gcd = (inA, inB) => {
  // Make input numbers positive.
  let a = Math.abs(inA);
  let b = Math.abs(inB);

  // Subtract one number from another until both numbers would become the same.
  // This will be out GCD. Also quit the loop if one of the numbers is zero.
  while (a && b && a !== b) {
    [a, b] = a > b ? [a - b, b] : [a, b - a];
  }

  // Return the number that is not equal to zero since the last subtraction (it will be a GCD).
  return a || b;
};

// Return a CSS string defining varied CSS keyframe animations
const moveStyles = () => {
  let result = '';
  for (let i = 0; i < numMovements; i += 1) {
    const dir = truePercent(0.5) ? 'X' : 'Y';
    const dist = (Math.floor(Math.random() * 80)) - 40;
    const slideTime = Math.floor(Math.random() * 3);
    const fadeTime = Math.max(1, Math.floor(Math.random() * 3));
    result += `
      @keyframes slideIn${i} {
        from {
          transform:translate${dir}(${dist}rem);
        }
        to {
          transform:none;
        }
      }
      @keyframes fadeIn${i} {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .mover${i} {
        animation:
          slideIn${i} ${slideTime}s,
          fadeIn${i} ${fadeTime}s;
      }
    `;
  }
  return result;
};

const calculateDimensions = () => {
  // Calculate grid dimensions from screen size
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    // Pick target cell width based on screen dimensions
  // XS: [0px,575px] => 75px
  // SM: [576px,767px] => 85
  // MD: [768px,991px] => 100px
  // LG: [992px,1199] => 120px
  // XL: [1200px,∞px] => 120px
  const breakpoints = [
    { screen: 576, target: 75 },
    { screen: 768, target: 85 },
    { screen: 992, target: 100 },
    { screen: 1200, target: 120 },
  ];

  let cellW = 140;
  for (let i = 0; i < breakpoints.length; i += 1) {
    const bp = breakpoints[i];
    if (width < bp.screen) {
      cellW = bp.target;
      break;
    }
  }

  // Round width and height to nearest multiples of target cell width
  const viewW = width - (width % cellW);
  const viewH = height - (height % cellW);

  // Calculate vertical and horizontal padding needed to center drawing in viewport
  const padW = Math.floor((width - viewW) / 2);
  const padH = Math.floor((height - viewH) / 2);

  return {
    viewW,
    viewH,
    padW,
    padH,
    cellW,
  };
}

const draw = ({ viewW, viewH, cellW }) => {
  console.log('draw()');
  const svg = document.getElementById('splash-svg');

  const isSingleCell = (w, h) => w === 1 && h === 1;
  const isSquare = (x, y) => x === y;

  // Return a random movement class
  const randomMoveClass = () => `mover${Math.floor(Math.random() * numMovements)}`;
  const randomColor = (noWhite) => {
    let colors = ['#2F4FA2', '#F6F3F4', '#FE0000', '#229446', '#FDD316'];
    colors = noWhite ? colors : [...colors, '#FFF'];
    const i = Math.floor(Math.random() * colors.length);
    return colors[i];
  };

  // fill the square defined by upper left hand corner (x,y) and width
  // with a square SVG. Units in pixels.
  const fillSquare = (x, y, width, noBorder) => {
    let w = width;
    let trans = 0;

    const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    const fillColor = randomColor();
    let borderColor = fillColor;
    r.setAttribute('fill', fillColor);
    // Maybe draw a border
    let strokeWidth = 0;
    if (!noBorder && truePercent(0.5)) {
      borderColor = randomColor(true);
      strokeWidth = Math.floor(Math.random() * w * 0.1);
      r.setAttribute('stroke', borderColor);
      r.setAttribute('stroke-width', strokeWidth);
      w -= strokeWidth;
      trans = strokeWidth / 2;
    }
    r.setAttribute('x', x + trans);
    r.setAttribute('y', y + trans);
    r.setAttribute('width', w);
    r.setAttribute('height', w);
    r.className.baseVal = randomMoveClass();
    svg.appendChild(r);

    // TODO make the return values more consistent once you figure out what you're trying to do
    return {
      innerX: x + strokeWidth,
      innerY: y + strokeWidth,
      innerW: width - 2 * strokeWidth,
      fillColor,
      borderColor,
    };
  };

  // fill the square defined by upper left hand corner (x,y) and width w
  // with a circle SVG. Units in pixels.
  const fillCircle = (x, y, w) => {
    let r = w / 2;
    const cx = x + r;
    const cy = y + r;
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    if (truePercent(0.7)) {
      // Circle border most likely to be thin
      let strokeWidth = Math.floor(Math.random() * r * 0.1);
      strokeWidth = truePercent(0.1) ? Math.floor(Math.random() * r * 0.75) : strokeWidth;
      c.setAttribute('stroke', randomColor());
      c.setAttribute('stroke-width', strokeWidth);
      r -= strokeWidth / 2;
    }
    c.setAttribute('cx', cx);
    c.setAttribute('cy', cy);
    c.setAttribute('r', r);
    c.setAttribute('fill', randomColor());
    c.className.baseVal = randomMoveClass();
    svg.appendChild(c);
  };

  // Units in pixels
  const fillText = (x, y, w) => {
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const textWidth = 0.6 * w;
    t.setAttribute('x', x + w / 2);
    t.setAttribute('y', y + w / 2);
    t.setAttribute('textLength', textWidth);
    t.setAttribute('lengthAdjust', 'spacingAndGlyphs');
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('dominant-baseline', 'central');
    t.setAttribute('style', `font-size:${0.12 * w}px`);
    t.className.baseVal = 'text';
    const textNode = document.createTextNode('david ouyang moench');
    t.appendChild(textNode);
    svg.appendChild(t);
  };

  // fillRandom draws shapes in the square defined by x, y, and w. Units in pixels.
  const fillRandom = (x, y, w, basePercent) => {
    let squareResults = null;
    if (truePercent(0.85 * basePercent)) {
      squareResults = fillSquare(x, y, w, false);
    }

    // Make it rare for a circle to exist on its own (should mostly be inside squares)
    const circlePercent = squareResults ? 0.5 : 0.03;
    const notWhiteSquare = !squareResults || (squareResults && squareResults.fillColor !== '#FFF');
    if (truePercent(circlePercent) && notWhiteSquare) {
      let [cx, cy, cw] = [x, y, w];
      if (squareResults) {
        const { innerX, innerY, innerW } = squareResults;
        [cx, cy, cw] = [innerX, innerY, innerW];
      }
      fillCircle(cx, cy, cw);
    }
  };

  // Recursive function to partition up space and draw shapes
  // x, y: top left corner coords of rectangular area
  // w: width (in grid cells)
  // h: height (in grid cells)
  // depth: recursion depth for debug logging
  const partition = (x, y, w, h, depth) => {
    if (DEBUG) {
      let indent = '';
      for (let i = 0; i < depth; i += 1) {
        indent += '  ';
      }
      console.debug(`${indent}[D${depth}] partition(x:${x}, y:${y}, w:${w}, h:${h})`);
    }

    // Convert grid cell dimensions to pixel dimensions
    const [xPx, yPx, wPx, hPx] = [x, y, w, h].map(e => e * cellW);

    // Base Cases I: empty cell
    if (w === 0 || h === 0) {
      return;
    }
    // Base Case II: single cell
    if (isSingleCell(w, h)) {
      fillRandom(xPx, yPx, wPx, 0.15);
      return;
    }
    // Base Case III: multi-cell square
    if (depth > 1 && isSquare(w, h)) {
      // III.A: Fill it with a single shape
      if (truePercent(0.8)) {
        fillRandom(xPx, yPx, wPx, 0.6);
        if (depth > 2 && !nameDrawn) {
          fillText(xPx, yPx, wPx);
          nameDrawn = true;
        }
      // III.B: Dense fill
      } else if (depth > 2) {
        // Divide the space into squares
        const divisor = truePercent(0.8) ? 2 : 4;
        const tileW = Math.max(gcd(wPx, hPx) / divisor, 1);
        // Draw in every square
        for (let i = 0; i < wPx / tileW; i += 1) {
          for (let j = 0; j < hPx / tileW; j += 1) {
            const [currX, currY] = [xPx + i * tileW, yPx + j * tileW];
            fillSquare(currX, currY, tileW, true);
          }
        }
      }
      return;
    }

    // Recursive: Partition and recurse
    // Randomly partition rectangle into 4 rectangles
    const xPart = Math.floor(Math.random() * w);
    const yPart = Math.floor(Math.random() * h);

    // Top left quadrant
    partition(x, y, xPart, yPart, depth + 1);
    // Top right quadrant
    partition(x + xPart, y, w - xPart, yPart, depth + 1);
    // Bottom left quadrant
    partition(x, y + yPart, xPart, h - yPart, depth + 1);
    // Bottom right quadrant
    partition(x + xPart, y + yPart, w - xPart, h - yPart, depth + 1);
  };

  partition(0, 0, viewW / cellW, viewH / cellW, 0);
}

const setCSS = ({ viewH, padH, padW }) => {
  // Clear pre-existing styles
  const prevStyles = document.getElementById('dynamic-styles')
  if (prevStyles) {
    prevStyles.remove(prevStyles);
  }

  // Set new styles
  const styles = document.createElement('style');
  styles.id = 'dynamic-styles';
  styles.innerHTML = `
    ${moveStyles()}
    #splash {
      width: 100vw;
      height: ${viewH}px;
    }
    #splash-svg {
      margin-top: ${padH}px;
    }
  `;
  document.head.appendChild(styles);
};

// Ripped debounce function off of underscore js. Inlining the function
// here rather than dealing with including all of underscore or messing with
// webpack and modules.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const toggleNavModal = () => {
  // Toggle modal visibility
  overlayVisible = !overlayVisible;
  modalOpacity = overlayVisible ? 1.0 : 0.0;
  document.querySelector(".overlay-content").style.opacity = modalOpacity;

  // Toggle visibility of SVG animated name
  svgText = document.querySelector('#splash-svg text')
  if (svgText) {
    svgText.style.opacity = 1.0 - modalOpacity;
  }
}

// MAIN
window.onload = () => {
  const dimensions = calculateDimensions();
  setCSS(dimensions);
  draw(dimensions);

  // Show nav modal after a pausee if it's not already visible
  setTimeout(() => {
    if (!overlayVisible) {
      toggleNavModal();
    }
  }, 3 * 1000);
}

window.onresize = debounce(() => {
  const dimensions = calculateDimensions();
  setCSS(dimensions);

  // Clear the existing SVGs
  const svg = document.querySelector("#splash-svg");
  while (svg.lastElementChild) {
    svg.removeChild(svg.lastElementChild);
  }

  // Reset flags
  nameDrawn = false;

  draw(dimensions);
}, 200);

// Toggle nav menu modal visibility
window.onclick = (e) => {
  // Determine if click is inside nav modal. If so we'll assume user is trying
  // to interact with modal, so we won't want to toggle its visibility.
  const clickedInsideModal = e.target.closest('.overlay-content');

  if (!overlayVisible || !clickedInsideModal) {
    toggleNavModal();
  }
}
