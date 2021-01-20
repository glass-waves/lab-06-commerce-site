// IMPORT MODULES under test here:
// import { example } from '../example.js';
import { renderModules } from "../products/render.js";
import { modules } from "../products/modules.js";
const test = QUnit.test;

test('should receive a module object and return a div element', (expect) => {
    //Arrange
    const chord = {
        id: 'chord',
        brand: 'Qu-Bit',
        moduleName: 'Chord V2',
        image: 'chordV2.jpg',
        category: 'Oscillator',
        size: 14,
        description: 'Chord v2 is a long-awaited update to the Qu-Bit’s original polyphonic oscillator. While gaining a tremendous reduction in HP size, the module kept all the beloved functionality of its predecessor and even attained a few new tricks up its sleeve.',
        price: 299
    };


    // Set up your arguments and expectations
    const expected = `<div class="product-box"><h2 class="title">Qu-Bit Chord V2</h2><img src="../assets/chordV2.jpg" class="module-image"><h3 class="category">Oscillator</h3><h3 class="hp">14 HP</h3><p class="description">Chord v2 is a long-awaited update to the Qu-Bit’s original polyphonic oscillator. While gaining a tremendous reduction in HP size, the module kept all the beloved functionality of its predecessor and even attained a few new tricks up its sleeve.</p><h3 class="price">$299</h3><button value="chord">Add to Cart</button></div>`;
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderModules(chord);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected);
});
