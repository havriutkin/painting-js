# painting-js

## Description
Simple painting web tool using pure JS

## Technical details
### Smoothness
HTML canvas element is used. The idea behind drawing lines is basically drawing circles close to each other.
If one tries to just put event handler on 'mousemove' event, then you will notice that circles are seperate, espacially when mouse was moved fast. In order to avoid it, I draw circles along linear mouse trajectory with small step each time. As a result, one achives an effect of 'smoothness'.
### Objects
Mouse object is used to store current mouse position and previous mouse position.
Instument object is used to store type of instument (pencil or eraser), size (i.e. circle radius) and color. 
Attributes are changed by putting corresponded event listeners. 

## Future ideas
1. Draw different shapes (s.t. circles, rectangles, etc.)
2. Add 'filling' instrument (not really obvious on first thought)
3. Allow different backgrounds

