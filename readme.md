# FastCss-js NPM Package
>Note: This is a beta version of FastCSS, and it will continue to receive updates and improvements. Please stay tuned for the latest features and enhancements.
>
FastCSS is a simple and lightweight NPM package that allows you to dynamically generate and manage CSS styles in your web applications. It provides functions for writing CSS styles to the `<head>` of your HTML document and updating existing styles. With FastCSS, you can easily generate CSS styles from JavaScript objects and apply them to your web pages.

## Installation
You can install FastCSS using npm
```bash
npm install fastcss-js        
```

## Usage
To use FastCSS in your project, you can import it as follows:
```javascript
import fastCss from 'fastcss-js';
```
## `write(selector, styles)`
This function allows you to write or update CSS styles for a specific selector. It takes a selector (string) and a styles object as arguments. If the selector already exists, it will update the existing styles; otherwise, it will create a new entry.
```javascript
fastCss.write('.my-element', {
  backgroundColor: 'blue',
  fontSize: '16px',
}); 
```

## `init()`
The `init` function initializes the FastCSS library by combining all the CSS styles previously written using the write function into a single CSS file and adding it to the `<head>` of your HTML document.
```javascript
fastCss.init();
```
## Example
Here's an example of how you can use FastCSS in your project:
```javascript
import fastCss from 'fastcss-js';

// Write CSS styles for a selector
fastCss.write('.my-element1', {
  backgroundColor: 'blue',
  fontSize: '16px',
});
fastCss.write('.my-element2', {
  'box-shadow': 'rgba(0,0,0,0.5)',
fontSize: '16px',
});

fastCss.init();

``` 
## React Example
```javascript
import {useEffect} from 'react'
import fastCss from 'fastcss-js'
export default function Home(){
useEffect(()=>{
    fastCss.write('.my-element1', {
  backgroundColor: 'blue',
  fontSize: '16px',
});
fastCss.init()
  },[])
  return(
    <>
    <div className='my-element1'> This div background is blue</div>
    </>
  )
}
```