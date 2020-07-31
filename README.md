# ReactTutorial
following the react tutorial from their website

https://reactjs.org/tutorial/tutorial.html


# Notes:
- React is declarative, and builds UI from componenets, which seems like a struct or object with properties that returns a description that should be rendered via the `render()`
- `render()` returns a React element, which is the description to render
- JSX is the special syntax style React uses, looks like `return React.createElement('div',{..},{..},.., React.createElement('h1',{},.));`
- JSX basically lets you put any and all valid JS inside braces so you can 'chain' stuff, notice how the second React is within the first ^^
- So we can then do `return ( <h1>Hi</h1>);` instead of doing the whole React.createElement thing
- kinda lambda looking function in the React tutorial, on the `onClick=` part, it says instead of doing function()..., you can put `onClick={() => alert(1)}`
- from tutorial "In JS classes, you always need to call super when defining constructor for subclass, since the classes extend React components"
- "To collect data from multiple children, or have them communicate, you need to declare a shared state in their parent component"
- We can pass functions down to children, look at the Board class and the handleClick() function
- In React, convention is to use `on[Events]` for props that represent events, and `handle[Events]` for methods that handle the event, like if we need it to do mulitple things, pass the function down and let the children do wat they want
- Immutiability good, kinda seems weird to make a whole new board with only one value changed and replace the whole last one but the documentation says it makes things easier for more complex stuff, easier to detect state changes, determining when to re-render, I guess we just gotta believe them for now

# TODO:
- Display the location for each move in the format (col, row) in the move history list.
- Bold the currently selected item in the move list.
- Rewrite Board to use two loops to make the squares instead of hardcoding them.
- Add a toggle button that lets you sort the moves in either ascending or descending order.
- fix centering
- ~~When someone wins, highlight the three squares that caused the win.~~ <b>Done</b>
- ~~When no one wins, display a message about the result being a draw.~~ <b>Done</b>
