type Rectangle = {x: number, y: number, width: number, height: number, name: string}

const rectangles : Rectangle[]  = [
    {name: "A", x: 1, y: 2, width: 1, height: 1}, //A
    {name: "B", x: 2, y: 2, width: 1, height: 1}, //B

    {name: "C", x: 2, y: 4, width: 1, height: 1}, //C
    {name: "D", x: 3, y: 4, width: 2, height: 1}, //D
    {name: "E", x: 5, y: 4, width: 1, height: 1}, //E
    {name: "F", x: 3, y: 5, width: 1, height: 1}, //F

    {name: "G", x: 5, y: 8, width: 1, height: 1}, //G
    {name: "H", x: 6, y: 6, width: 1, height: 3}, //H
    {name: "I", x: 6, y: 6, width: 1, height: 1}, //I

    {name: "J", x: 0, y: 0, width: 20, height: 20}, //J
]



console.log(groupRectangles(rectangles))

function groupRectangles(rectangles: Rectangle[]): Rectangle[][] {
    const groups: Rectangle[][] = [];
    for (const rect of rectangles) {
        let foundGroup = false;
        for (const group of groups) {
            if (group.some(groupRect => areRectanglesBordersTouching(groupRect, rect) || areRectanglesAdjacent(groupRect, rect)) ) {
                group.push(rect);
                foundGroup = true;
                break;
            }
        }
        if (!foundGroup) {
            groups.push([rect]);
        }
    }
    return groups;
}


function areRectanglesAdjacent(rect1: Rectangle, rect2: Rectangle): boolean {
    const isLeft = rect1.x + rect1.width === rect2.x && rect1.y <= rect2.y + rect2.height && rect1.y + rect1.height >= rect2.y;
    const isRight = rect1.x === rect2.x + rect2.width && rect1.y <= rect2.y + rect2.height && rect1.y + rect1.height >= rect2.y;
    const isTop = rect1.y + rect1.height === rect2.y && rect1.x <= rect2.x + rect2.width && rect1.x + rect1.width >= rect2.x;
    const isBottom = rect1.y === rect2.y + rect2.height && rect1.x <= rect2.x + rect2.width && rect1.x + rect1.width >= rect2.x;
    if(isLeft || isRight || isTop || isBottom) {
        console.log(rect1.name + " is adjacent with " + rect2.name)
    }
    return isLeft || isRight || isTop || isBottom;
}


function areRectanglesBordersTouching(rect1: Rectangle, rect2: Rectangle): boolean {
  const rect1Right = rect1.x + rect1.width;
  const rect1Bottom = rect1.y + rect1.height;
  const rect2Right = rect2.x + rect2.width;
  const rect2Bottom = rect2.y + rect2.height;

  if ((rect1.x === rect2.x || rect1Right === rect2Right) &&
      (rect1.y <= rect2Bottom && rect1Bottom >= rect2.y)) {
    console.log(`${rect1.name} is touching ${rect2.name} on left/right side`);
    return true;
  }

  if ((rect1.y === rect2.y || rect1Bottom === rect2Bottom) &&
      (rect1.x <= rect2Right && rect1Right >= rect2.x)) {
    console.log(`${rect1.name} is touching ${rect2.name} on top/bottom side`);
    return true;
  }

  return false;
}
