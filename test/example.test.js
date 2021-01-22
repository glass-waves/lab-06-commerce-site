// IMPORT MODULES under test here:
// import { example } from '../example.js';
import { renderModules } from '../products/render.js';
import { calcCartTotal, calcSubTotal, findById } from '../cart/utils.js';
import { renderTableRows } from '../cart/render-table-row.js';
import { 
    getCart,
    clearCart,
    setCart } from '../cart/cart-utils.js';

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


//FIND BY ID TEST
test('should receive an id and an array and return an object in the array with a matching id if it exists', (expect) => {
    //Arrange
    const staticModules = [
        {
            id: 'chord',
            brand: 'Qu-Bit',
            moduleName: 'Chord V2',
            image: 'chord.jpg',
            category: 'Oscillator',
            size: 14,
            description: 'Chord v2 is a long-awaited update to the Qu-Bit’s original polyphonic oscillator. While gaining a tremendous reduction in HP size, the module kept all the beloved functionality of its predecessor and even attained a few new tricks up its sleeve.',
            price: 299
        },
        {
            id: 'ikarie',
            brand: 'BASTL',
            moduleName: 'Ikarie Stereo Filter',
            image: 'ikarie.jpg',
            category: 'Filter',
            size: 8,
            description: 'The next collaboration between Bastl and Casper Electronics has landed, and the Ikarie Stereo Filter is ready for spacey resonances and interstellar spatial modulation. Rather than offering discrete outputs for lowpass and highpass like most state-variable filter designs, Ikarie will continuously morph between the two, and depending on how it is patched, an array of resonant bandpass or stereo notch filtering will be heard.',
            price: 259
        },
        {
            id: 'zadar',
            brand: 'XAOC Devices',
            moduleName: 'Zadar Quad Envelope',
            image: 'zadar.jpg',
            category: 'Envelope',
            size: 10,
            description: 'The XAOC Zadar is a widely configurable function generator which redefines the very notion of the modulation envelope. It consists of four independent channels which can be assigned functions made of up to 1000 segments and which can be warped, reversed, and stretched using the simple and intuitive menu system or via each channel’s assignable CV input. Each channel can output functions ranging in time from 0.08 milliseconds to 30 minutes and supports looping and chaining of waveforms, allowing for use as a complex FM source and LFO as well! With all this functionality and more in a mere 10hp, the Zadar is sure to breathe new life into any setup.',
            price: 330
        },
        {
            id: 'maths',
            brand: 'Make Noise',
            moduleName: 'Maths',
            image: 'maths.jpg',
            category: 'Envelope',
            size: 20,
            description: "Make Noise Maths is a Control Voltage Generator and Processor indebted to the classic designs of Don Buchla in his Model 257 and Model 281 function generators. The design of Buchla's envelopes allowed them to easily switch between cycling and triggered envelopes, providing LFOs as well, and at high enough speeds, Oscillators. This design was then appropriated for the Serge Dual Universal Slope Generator, which is an apt name as it can basically create any kind of rising and falling voltage. Maths continues in this great tradition of versatile and function-packed modules.",
            price: 290
        },
        {
            id: 'quad-vca',
            brand: 'Intellijel',
            moduleName: 'Quad VCA',
            image: 'quad-vca.jpg',
            category: 'VCA',
            size: 12,
            description: `Intellijel’s brand new Quad VCA can be used as a four individual VCAs, or as a four-channel mixer. The module offers users the ability to route each individual channel to a separate destination in their system, or use the Mix out for a sum of all four signals. The module features a continually adjustable linear to exponential response curve, and a Boost switch that adds up to 6dB of gain to each channel. `,
            price: 189
        },
        {
            id: 'ripples',
            brand: 'Mutable Instruments',
            moduleName: 'Ripples V2 Liquid Filter',
            image: 'ripples.jpg',
            category: 'Filter',
            size: 8,
            description: 'Ripples from Mutable Instruments is an analog multi-mode filter that sounds huge and features two cutoff slopes. Ripples offers two inputs, one transparent and clean, and one with a drive control that can saturate and distort incoming signals. It even adds enough gain to bring line-level signals into your modular. Ripples includes a high pass, low pass, and band pass filter outputs. The band pass and low pass outputs are switchable between two and four-pole operation, giving two flavors of cutoff slope. The resonance setting sets the slope of the high pass filter.',
            price: 199
        }   
    ];
    // Set up your arguments and expectations
    const expected = {
        id: 'quad-vca',
        brand: 'Intellijel',
        moduleName: 'Quad VCA',
        image: 'quad-vca.jpg',
        category: 'VCA',
        size: 12,
        description: `Intellijel’s brand new Quad VCA can be used as a four individual VCAs, or as a four-channel mixer. The module offers users the ability to route each individual channel to a separate destination in their system, or use the Mix out for a sum of all four signals. The module features a continually adjustable linear to exponential response curve, and a Boost switch that adds up to 6dB of gain to each channel. `,
        price: 189
    };
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = findById('quad-vca', staticModules);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.deepEqual(actual, expected);
});


//CAlC SUB TOTAL TEST
test('should receive a module object and corresponding cart item and return the sub-total', (expect) => {
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
    const chordCart = {
        id: 'chord',
        quantity: 2
    };


    // Set up your arguments and expectations
    const expected = 598;
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = calcSubTotal(chordCart, chord);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual, expected);
});

//RENDER ROW TEST
test('should receive a cart item and return a completed table row DOM element', (expect) => {
    const cart =
        {
            id: 'ikarie',
            quantity: 3 
        };


    // Set up your arguments and expectations
    const expected = `<tr><td><img src="../assets/ikarie.jpg"></td><td>BASTL Ikarie Stereo Filter</td><td>3</td><td>$777.00</td></tr>`;
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderTableRows(cart);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected);
});

//CALCULATE CART TOTAL TEST
test('should receive a cart and return the total', (expect) => {
    const cart = [
        {
            id: 'ikarie',
            quantity: 3 
        }];
    const productList = [
        { 
            id: 'ikarie',
            brand: 'BASTL',
            moduleName: 'Ikarie Stereo Filter',
            image: 'ikarie.jpg',
            category: 'Filter',
            size: 8,
            description: 'The next collaboration between Bastl and Casper   Electronics has landed, and the Ikarie Stereo Filter is ready for     spacey resonances and interstellar spatial modulation. Rather than  offering discrete outputs for lowpass and highpass like most     state-variable filter designs, Ikarie will continuously morph between   the two, and depending on how it is patched, an array of resonant     bandpass or stereo notch filtering will be heard.',
            price: 259
        }];

    // Set up your arguments and expectations
    const expected = 777;
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = calcCartTotal(cart, productList);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual, expected);
});

//TESTS GET CART FUNCTION
test('calling the function should return cart stored in localStorage', (expect) => {
    const cart = [{
        id: 'ikarie',
        quantity: 3 
    },
    {
        id: 'zadar',
        quantity: 4
    }];

    const stringyCart = JSON.stringify(cart);
    localStorage.setItem('CART', stringyCart);

    const actual = getCart();

    const expected = cart;

    expect.deepEqual(actual, expected);
});

//TESTS CLEAR CART FUNCTION
test('calling the function should replace the existing cart with an empty array', (expect) => {
    const cart = [{
        id: 'ikarie',
        quantity: 3 
    },
    {
        id: 'zadar',
        quantity: 4
    }];

    const stringyCart = JSON.stringify(cart);

    localStorage.setItem('CART', stringyCart);

    clearCart();
    
    const clearedCart = getCart();
    const actual = clearedCart;

    const expected = [];

    expect.deepEqual(actual, expected);
});

//TESTS SET CART FUNCTION
test('calling the function should replace the existing cart with the cart passed as an argument to function', (expect) => {
    const cart = [{
        id: 'ikarie',
        quantity: 3 
    },
    {
        id: 'zadar',
        quantity: 4
    }];

    const newCart = [{
        id: 'ikarie',
        quantity: 7 
    },
    {
        id: 'zadar',
        quantity: 9
    }];

    const stringyOldCart = JSON.stringify(cart);
    localStorage.setItem('CART', stringyOldCart);

    setCart(newCart);

    const actual = getCart();

    const expected = newCart;

    expect.deepEqual(actual, expected);
});